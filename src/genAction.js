module.exports = function genAction(filenameWithoutExt, callback) {
  console.log(`genAction ${filenameWithoutExt}.js`);
  callback(null, `${filenameWithoutExt}.js`);
};
