export function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

export const contains = (str, word, word2) => {
  return str.includes(word) || str.includes(word2)
}