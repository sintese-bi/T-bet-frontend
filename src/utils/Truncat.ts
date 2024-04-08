export const Truncate = (str: string) => {
  const maxLength = 20
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str
}
