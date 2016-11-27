var recastai = require('recastai');


function Recastai(options) {
  this.default = {
    token: options.token,
    language: options.language ? options.language : 'fr_FR',
    base_url:  "https://api.recast.ai/v2/request"
  }

  this.myConversationToken = null;
  this.client =  new recastai.Client(this.default.token, this.default.language)
}

module.exports = Recastai;


Recastai.prototype.textConverse = function (text, promise) {
  let _this = this;
  let config = {
    conversationToken: this.myConversationToken,
  }
  this.client.textConverse(text, config)
  .then(res => {
    _this.myConversationToken = res.conversationToken;
    // get the location variable set at the previous call of textConverse
    let location = res.getMemory('location');
    var data = {
      response : res
    }
    promise.next(data);
    promise.complete();

    // Do your code
  }).catch(err => {
    console.log(err)
  })
};
