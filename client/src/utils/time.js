export const getUpdateTime = function (updateTime) {
  if (updateTime === null) {
    return ''
  }
  let now = new Date().getTime()
  let second = Math.floor((now - updateTime*1000) / 1000)
  let minute = Math.floor(second / 60)
  let hour = Math.floor(minute / 60)
  let day = Math.floor(hour / 24)
  let month = Math.floor(day / 31)
  let year = Math.floor(month / 12)
  if (year > 0) {
    return year + '年前'
  } else if (month > 0) {
    return month + '月前'
  } else if (day > 0) {
    let ret = day + '天前'
    if (day >= 7 && day < 14) {
      ret = '1周前'
    } else if (day >= 14 && day < 21) {
      ret = '2周前'
    } else if (day >= 21 && day < 28) {
      ret = '3周前'
    } else if (day >= 28 && day < 31) {
      ret = '4周前'
    }
    return ret
  } else if (hour > 0) {
    return hour + '小时前'
  } else if (minute > 0) {
    return minute + '分钟前'
  } else if (second > 0) {
    return second + '秒前'
  } else {
    return '刚刚'
  }
}
