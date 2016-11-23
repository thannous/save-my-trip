function User(uber) {
    this._uber = uber;
    this.path = ['me', 'history'];

}

module.exports = User;

User.prototype.getHistory = function getHistory(off, lim, callback) {
    var newOffset = off || 0;
    // ensure query limit is set. Maximum is 50. Default is 5.
    var newLimit = (lim) ? Math.min(lim, 50) : 5;

    return this._uber.get({
        url: this.path[1],
        version: 'v1.2',
        params: { offset: newOffset, limit: newLimit }
    }, callback);
};

User.prototype.getProfile = function getProfile(callback) {
    return this._uber.get({ url: this.path[0]}, callback);
};