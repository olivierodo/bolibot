
module.exports = {
  data : {
    'th' : [],
    'fr' : [],
    'es' : ['ea', 'es'],
    'ko' : [],
    'zh-CN' : ['cn'],
    'de' : [],
    'en' : ['gb','us', 'um']
  },

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
