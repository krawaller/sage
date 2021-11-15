// exported from separate file to allow mocking and/or server-side variant
export const fetch =
  typeof window !== 'undefined' ? window.fetch : () => Promise.resolve()
