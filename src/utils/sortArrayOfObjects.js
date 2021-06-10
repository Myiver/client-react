export const compareObjects = (a, b, key) => {
  const obj1 = a[key].toUpperCase()
  const obj2 = b[key].toUpperCase()

  if (obj1 < obj2) {
    return -1
  }
  if (obj1 > obj2) {
    return 1
  }
  return 0
}