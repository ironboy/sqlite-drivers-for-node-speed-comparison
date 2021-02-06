module.exports = function (ms) {
  ms = ms.toFixed(2);
  ms = ms.padStart(7, ' ');
  return ms + ' ms';
}