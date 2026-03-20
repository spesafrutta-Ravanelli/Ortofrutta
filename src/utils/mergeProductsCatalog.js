import { deepMigrateImageUrls, migrateRasterPathToWebp } from './migrateImageUrlsToWebp.js'

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Unisce lista prodotti salvata con il template (per id): mantiene modifiche utente,
 * aggiunge righe mancanti dal codice e preserva prodotti extra non presenti nel template.
 */
function mergeProductRows(templateRows, savedRows, imageKey = 'image') {
  if (!savedRows || !Array.isArray(savedRows)) return clone(templateRows)
  const savedById = new Map(savedRows.map((p) => [p.id, p]))
  const merged = templateRows.map((t) => {
    const s = savedById.get(t.id)
    if (!s) return clone(t)
    const row = { ...t, ...s }
    const sImg = s[imageKey]
    if (typeof sImg !== 'string' || !sImg.trim()) {
      row[imageKey] = t[imageKey]
    } else {
      row[imageKey] = migrateRasterPathToWebp(sImg)
    }
    savedById.delete(t.id)
    return row
  })
  for (const p of savedById.values()) {
    merged.push(deepMigrateImageUrls(clone(p)))
  }
  return merged
}

function mergeSottocategorie(templateSubs, savedSubs) {
  if (!savedSubs || !Array.isArray(savedSubs)) return clone(templateSubs)
  const savedById = new Map(savedSubs.map((s) => [s.id, s]))
  const merged = templateSubs.map((tSub) => {
    const sSub = savedById.get(tSub.id)
    if (!sSub) return clone(tSub)
    savedById.delete(tSub.id)
    return {
      ...tSub,
      ...sSub,
      prodotti: mergeProductRows(tSub.prodotti, sSub.prodotti, 'image'),
    }
  })
  for (const orphan of savedById.values()) {
    merged.push(deepMigrateImageUrls(clone(orphan)))
  }
  return merged
}

/** Stagioni: ogni stagione ha sottocategorie[].prodotti */
export function mergeStagioni(template, saved) {
  if (!saved || !Array.isArray(saved)) return clone(template)
  const savedById = new Map(saved.map((s) => [s.id, s]))
  const merged = template.map((tSt) => {
    const sSt = savedById.get(tSt.id)
    if (!sSt) return clone(tSt)
    savedById.delete(tSt.id)
    return {
      ...tSt,
      ...sSt,
      sottocategorie: mergeSottocategorie(tSt.sottocategorie, sSt.sottocategorie),
    }
  })
  for (const orphan of savedById.values()) {
    merged.push(deepMigrateImageUrls(clone(orphan)))
  }
  return merged
}

function mergeYearRoundCategories(templateCats, savedCats) {
  if (!savedCats || !Array.isArray(savedCats)) return clone(templateCats)
  const savedById = new Map(savedCats.map((c) => [c.id, c]))
  const merged = templateCats.map((tCat) => {
    const sCat = savedById.get(tCat.id)
    if (!sCat) return clone(tCat)
    savedById.delete(tCat.id)
    return {
      ...tCat,
      ...sCat,
      products: mergeProductRows(tCat.products, sCat.products, 'image'),
    }
  })
  for (const orphan of savedById.values()) {
    merged.push(deepMigrateImageUrls(clone(orphan)))
  }
  return merged
}

/** categorieTuttoAnno: ogni categoria ha products[] */
export function mergeCategorieTuttoAnno(template, saved) {
  return mergeYearRoundCategories(template, saved)
}
