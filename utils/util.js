const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeNoS = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const hourToNow = time => {
  var ms = time.getTime() - new Date().getTime();
  if (ms < 0) return 0;
  return Math.floor(ms / 1000 / 60 / 60);
}

const inArray = function(arr,a){
  if (!arr){
    return false;
  }
  var r = new RegExp(',' + a + ',');
  return (r.test(',' + arr.join(arr.S) + ','));
}

module.exports = {
  formatTime: formatTime,
  formatTimeNoS: formatTimeNoS,
  hourToNow: hourToNow,
  inArray: inArray
}
