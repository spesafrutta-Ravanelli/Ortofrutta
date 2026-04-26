import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function walkSrc(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules') continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walkSrc(p, acc)
    else if (/\.(vue|js|scss|html)$/i.test(name)) acc.push(p)
  }
  return acc
}

/** Extract string literals (handles \\ and \\' \\" inside quotes) — use only on JS / script blocks */
function extractPathsFromContent(text) {
  const out = new Set()
  const add = (s) => {
    if (s && (s.startsWith('/images/') || s.startsWith('/prima-pagina'))) out.add(s)
  }
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === "'" || ch === '"') {
      const q = ch
      let j = i + 1
      let buf = ''
      while (j < text.length) {
        const c = text[j]
        if (c === '\\' && j + 1 < text.length) {
          buf += text[j + 1]
          j += 2
          continue
        }
        if (c === q) break
        buf += c
        j++
      }
      add(buf)
      i = j < text.length ? j + 1 : j
      continue
    }
    i++
  }
  return out
}

/** Template / style: static paths in attributes and url() */
function extractMarkupPaths(markup) {
  const out = new Set()
  const add = (s) => {
    const t = s && s.trim()
    if (t && (t.startsWith('/images/') || t.startsWith('/prima-pagina'))) out.add(t)
  }
  const patterns = [
    /(?:src|href)\s*=\s*["'](\/images\/[^"']+)["']/g,
    /(?:src|href)\s*=\s*["'](\/prima-pagina[^"']+)["']/g,
    /url\(\s*["']?(\/images\/[^"')]+)["']?\s*\)/g,
    /url\(\s*["']?(\/prima-pagina[^"')]+)["']?\s*\)/g,
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(markup)) !== null) add(m[1])
  }
  return out
}

function extractFromVue(content) {
  const paths = new Set()
  const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/gi
  let sm
  while ((sm = scriptRe.exec(content)) !== null) {
    for (const p of extractPathsFromContent(sm[1])) paths.add(p)
  }
  const tmpl = content.match(/<template[^>]*>([\s\S]*?)<\/template>/i)
  if (tmpl) {
    for (const p of extractMarkupPaths(tmpl[1])) paths.add(p)
  }
  const styles = content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)
  for (const st of styles) {
    for (const p of extractMarkupPaths(st[1])) paths.add(p)
  }
  return paths
}

function walkPublicImages(dir, rel = '') {
  const files = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const r = rel ? `${rel}/${name}` : name
    if (fs.statSync(p).isDirectory()) files.push(...walkPublicImages(p, r))
    else if (/\.(png|jpe?g|gif|webp|svg|ico|bmp)$/i.test(name)) files.push(r.replace(/\\/g, '/'))
  }
  return files
}

const srcFiles = walkSrc(path.join(root, 'src'))
const allRefs = new Set()
for (const f of srcFiles) {
  const t = fs.readFileSync(f, 'utf8')
  if (f.endsWith('.vue')) {
    for (const p of extractFromVue(t)) allRefs.add(p)
  } else {
    for (const p of extractPathsFromContent(t)) allRefs.add(p)
    for (const p of extractMarkupPaths(t)) allRefs.add(p)
  }
}

const publicDir = path.join(root, 'public')
const diskFiles = walkPublicImages(publicDir)

const urlToRel = (u) => u.replace(/^\/+/, '').replace(/\\/g, '/')
const usedRel = new Set([...allRefs].map(urlToRel))

const unused = diskFiles.filter((f) => !usedRel.has(f))

const SKIP_DELETE = new Set(['favicon.ico'])

if (process.argv.includes('--delete')) {
  let removed = 0
  for (const rel of unused) {
    if (SKIP_DELETE.has(rel)) continue
    const fp = path.join(publicDir, ...rel.split('/'))
    fs.unlinkSync(fp)
    removed++
  }
  console.log(JSON.stringify({ deleted: removed, skipped: [...SKIP_DELETE].filter((s) => unused.includes(s)) }, null, 2))
} else {
  const debug = process.argv.includes('--debug')
  if (debug) {
    const sample = [...allRefs].filter((r) => r.includes('slider') || r.includes('foto-banchi'))
    console.error('debug sample', sample)
  }
  console.log(JSON.stringify({ refCount: allRefs.size, diskCount: diskFiles.length, unusedCount: unused.length, unused }, null, 2))
}
