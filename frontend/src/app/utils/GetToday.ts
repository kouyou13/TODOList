export const GetToday = () => {
  const dt = new Date()
  const year = dt.getFullYear()
  const month = ("0"+(dt.getMonth() + 1)).slice(-2)
  const date = ("0"+(dt.getDate())).slice(-2)
  return `${year}-${month}-${date}`
}