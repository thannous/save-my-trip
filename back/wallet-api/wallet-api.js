
function Wallet(options) {
  this.default = {
    user: options.user,
    amount: parseInt(options.initial_amount),
    transations : [{'amount':parseInt(options.initial_amount),"label":'Credit account'}]
  }
}

module.exports = Wallet;


Wallet.prototype.update = function (amount,label, promise) {
  let _this = this;
  _this.default.amount +=parseInt(amount);
  _this.default.transations.push({'amount':parseInt(amount),"label":label})
  return _this.default;
};

Wallet.prototype.get = function () {
	return this.default;
};