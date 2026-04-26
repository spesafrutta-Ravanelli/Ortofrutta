/**
 * Converte jpg/jpeg/png in public/ in WebP, rimuove gli originali (con retry su Windows),
 * aggiorna le estensioni nei percorsi /images/ e /prima-pagina* nel codice.
 *
 * Uso: node scripts/convert-to-webp.mjs
 *      node scripts/convert-to-webp.mjs --patch-only   (solo aggiornamento testi, nessuna conversione)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const patchOnly = process.argv.includes('--patch-only')

const RASTER = /\.(jpe?g|png)$/i

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) walk(p, acc)
    else if (RASTER.test(name)) acc.push(p)
  }
  return acc
}

function toPosixRel(abs) {
  return path.relative(publicDir, abs).split(path.sep).join('/')
}

async function unlinkWithRetry(abs, attempts = 10) {
  for (let i = 0; i < attempts; i++) {
    try {
      await fs.promises.unlink(abs)
      return true
    } catch (e) {
      if (e.code !== 'EBUSY' && e.code !== 'EPERM') throw e
      await new Promise((r) => setTimeout(r, 300 * (i + 1)))
    }
  }
  return false
}

const CODE_GLOBS = ['src']

function collectCodeFiles() {
  const files = []
  function w(dir) {
    if (!fs.existsSync(dir)) return
    for (const name of fs.readdirSync(dir)) {
      if (name === 'node_modules') continue
      const p = path.join(dir, name)
      const st = fs.statSync(p)
      if (st.isDirectory()) w(p)
      else if (/\.(vue|js|html|scss)$/i.test(name)) files.push(p)
    }
  }
  for (const g of CODE_GLOBS) w(path.join(root, g))
  const idx = path.join(root, 'index.html')
  if (fs.existsSync(idx)) files.push(idx)
  const cv = path.join(root, 'copy-volantino.js')
  if (fs.existsSync(cv)) files.push(cv)
  return [...new Set(files)]
}

function patchRasterUrlInPath(url) {
  if (!/\.(jpe?g|png)$/i.test(url)) return url
  return url.replace(/\.(jpe?g|png)$/i, '.webp')
}

/** Solo stringhe JS '...' "..." (escape-aware); ignora //, /* */, template literals `...` */
function patchJsStringLiterals(text) {
  let out = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '/' && text[i + 1] === '/') {
      let j = i
      while (j < text.length && text[j] !== '\n') j++
      out += text.slice(i, j)
      i = j
      continue
    }
    if (text[i] === '/' && text[i + 1] === '*') {
      let j = i + 2
      while (j < text.length - 1 && !(text[j] === '*' && text[j + 1] === '/')) j++
      out += text.slice(i, j + 2)
      i = j + 2
      continue
    }
    const c = text[i]
    if (c === "'" || c === '"') {
      const q = c
      let j = i + 1
      let buf = ''
      while (j < text.length) {
        if (text[j] === '\\' && j + 1 < text.length) {
          buf += text[j] + text[j + 1]
          j += 2
          continue
        }
        if (text[j] === q) break
        buf += text[j]
        j++
      }
      let inner = buf
      if (inner.startsWith('/images/') || inner.startsWith('/prima-pagina')) {
        inner = patchRasterUrlInPath(inner)
      }
      out += q + inner + q
      i = j < text.length ? j + 1 : j
      continue
    }
    if (c === '`') {
      let j = i + 1
      while (j < text.length) {
        if (text[j] === '\\') {
          j += 2
          continue
        }
        if (text[j] === '`') break
        j++
      }
      out += text.slice(i, j + 1)
      i = j + 1
      continue
    }
    out += c
    i++
  }
  return out
}

function patchTemplateChunk(tpl) {
  let s = tpl
  s = s.replace(
    /\b(src|href)\s*=\s*"(\/(?:images|prima-pagina)[^"]+)"/gi,
    (_, a, p) => `${a}="${patchRasterUrlInPath(p)}"`,
  )
  s = s.replace(
    /\b(src|href)\s*=\s*'(\/(?:images|prima-pagina)[^']+)'/gi,
    (_, a, p) => `${a}='${patchRasterUrlInPath(p)}'`,
  )
  s = s.replace(/url\(\s*["']?(\/(?:images|prima-pagina)[^)"']+)["']?\s*\)/gi, (_, p) => {
    return `url("${patchRasterUrlInPath(p)}")`
  })
  return s
}

function patchVue(content) {
  let s = content
  s = s.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, code) => {
    if (!/\/images\/|\/prima-pagina/.test(code)) return `<script${attrs}>${code}</script>`
    return `<script${attrs}>${patchJsStringLiterals(code)}</script>`
  })
  s = s.replace(/<template\b([^>]*)>([\s\S]*?)<\/template>/gi, (_, attrs, tpl) => {
    return `<template${attrs}>${patchTemplateChunk(tpl)}</template>`
  })
  s = s.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, css) => {
    return `<style${attrs}>${patchTemplateChunk(css)}</style>`
  })
  return s
}

function patchHtmlFile(html) {
  let s = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, code) => {
    if (!/\/images\/|\/prima-pagina/.test(code)) return `<script${attrs}>${code}</script>`
    return `<script${attrs}>${patchJsStringLiterals(code)}</script>`
  })
  s = patchTemplateChunk(s)
  return s
}

function patchFileByType(filePath, text) {
  if (filePath.endsWith('.vue')) return patchVue(text)
  if (filePath.endsWith('.html')) return patchHtmlFile(text)
  if (filePath.endsWith('.js')) {
    if (!/\/images\/|\/prima-pagina/.test(text)) return text
    return patchJsStringLiterals(text)
  }
  if (filePath.endsWith('.scss')) {
    return patchTemplateChunk(text)
  }
  return text
}

async function main() {
  const unlinkFailed = []
  let converted = 0

  if (!patchOnly) {
    const inputs = walk(publicDir)
    for (const abs of inputs) {
      const rel = toPosixRel(abs)
      const parsed = path.parse(rel)
      const newRel = path.posix.join(parsed.dir === '.' ? '' : parsed.dir, parsed.name + '.webp')
      const outAbs = path.join(publicDir, ...newRel.split('/'))

      await fs.promises.mkdir(path.dirname(outAbs), { recursive: true })
      await sharp(abs).webp({ quality: 82, effort: 4 }).toFile(outAbs)
      const ok = await unlinkWithRetry(abs)
      if (!ok) unlinkFailed.push(rel)
      converted++
    }
  }

  const codeFiles = collectCodeFiles()
  let touched = 0
  for (const file of codeFiles) {
    const text = fs.readFileSync(file, 'utf8')
    const next = patchFileByType(file, text)
    if (next !== text) {
      fs.writeFileSync(file, next, 'utf8')
      touched++
    }
  }

  if (!patchOnly) {
    const placeholderDir = path.join(publicDir, 'images', 'products')
    fs.mkdirSync(placeholderDir, { recursive: true })
    const mkTiny = () =>
      sharp({
        create: {
          width: 4,
          height: 4,
          channels: 3,
          background: { r: 224, g: 224, b: 224 },
        },
      }).webp()

    const defaultPath = path.join(placeholderDir, 'default.webp')
    const placeholderPath = path.join(publicDir, 'images', 'placeholder-product.webp')
    if (!fs.existsSync(defaultPath)) await mkTiny().toFile(defaultPath)
    if (!fs.existsSync(placeholderPath)) await mkTiny().toFile(placeholderPath)
  }

  const left = walk(publicDir).length
  console.log(
    JSON.stringify(
      {
        patchOnly,
        convertedThisRun: patchOnly ? 0 : converted,
        unlinkFailed,
        rasterFilesRemainingInPublic: left,
        codeFilesUpdated: touched,
      },
      null,
      2,
    ),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
