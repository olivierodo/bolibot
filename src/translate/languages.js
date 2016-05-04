
module.exports = {
  data : require('config').languages,

  get : function(flag) {
    var res = false;
    for(var s in this.data) {
      if (s === flag || -1 !== this.data[s].indexOf(flag)) {
        res = s;
        break;
      }
    }
    return res;
  }

};
