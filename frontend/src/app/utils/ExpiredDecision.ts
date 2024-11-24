import dayJs from "dayjs"

/**
 * @description
 * この関数は、引数に与えられた期限が過ぎているかどうかを判定する。
 * @param {string} limitDate - 期限の日付
 * @return {boolean} - 期限が過ぎているかどうか
 */
const expiredDecision = (limitDate: string) => {
  const targetDate = dayJs(limitDate)
  if(targetDate.isBefore(dayJs())) {
    return true
  } else {
    return false
  }
}
export default expiredDecision