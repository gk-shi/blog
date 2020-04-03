const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }, function (err) {
  if (err) {
    console.log('mongodb connection is wrong, the error is:' + err)
  }
}
)
