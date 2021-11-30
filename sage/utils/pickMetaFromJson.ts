const keys = ['title', 'short']

export const pickMetaFromJson = (json: Record<string, any>) => {
  const ret: Record<string, any> = {}
  for (const key of keys) {
    if (json.hasOwnProperty(key)) {
      ret[key] = json[key]
    }
  }
  return ret
}
