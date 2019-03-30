module.exports = {
  formatDate: function(dateString) {
    date = new Date(dateString)
    return date.toJSON().slice(0,10).replace(/-/g,'/');
  }
}
