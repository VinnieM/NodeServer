var records = [
  {
    id: 1,
    username: 'vinnie',
    password: 'TestPassword',
    displayName: 'Vineeth',
    emails: [{
      value: 'vineeth.madhu@gmail.com'
    }]
  }
];

var findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

module.exports.findByUsername = findByUsername;
