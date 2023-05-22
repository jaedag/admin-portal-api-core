export const checkIfArrayHasRepeatingValues = (array: any[]) => {
  const sortedArray = array.sort()
  for (let i = 0; i < sortedArray.length - 1; i += 1) {
    if (sortedArray[i + 1] === sortedArray[i]) {
      return true
    }
  }
  return false
}
