export const imageClass = (img: string) =>
  img.split('/').slice(-1)[0].replace(/\./g, '_')
