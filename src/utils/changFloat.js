
export function changeNumber(value, rep = true) {
  var num = ''
  if (rep) {
    var str = value.toString().split('.')
    var a = parseInt(str[0] + str[1])
    num = (a * 100) / (Math.round(a / value))
  } else {
    num = parseFloat((value / 100).toFixed(4))
  }
  return num
}
