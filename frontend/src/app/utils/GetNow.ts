export const GetNow = () => {
  const dt = new Date()
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()
  const hour = dt.getHours()
  const minute = dt.getMinutes()
  const second = dt.getSeconds()
  return {
    year,
    month,
    date,
    hour,
    minute,
    second,
  }
}