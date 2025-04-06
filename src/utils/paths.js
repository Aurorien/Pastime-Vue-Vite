export function getAssetPath(path) {
  return `${import.meta.env.BASE_URL}${path}`
}

export function getSoundPath(filename) {
  return getAssetPath(`sounds/${filename}`)
}
