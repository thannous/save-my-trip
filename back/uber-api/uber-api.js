var OAuth = require('oauth');
var util = require('util');


var resources = {
    User: require('./resources/User')
};

function Uber(options) {
    this.sandbox = options.sandbox ? options.sandbox : false;
    this.defaults = {
        client_id: options.client_id,
        client_secret: options.client_secret,
        server_token: options.server_token,
        redirect_uri: options.redirect_uri,
        name: options.name,
        base_url: this.sandbox ? 'https://sandbox-api.uber.com/' : 'https://api.uber.com/',
        authorize_url: 'https://login.uber.com/oauth/authorize',
        access_token_url: 'https://login.uber.com/oauth/token',
        language: options.language ? options.language : 'fr_FR'
    };

    this.oauth2 = new OAuth.OAuth2(
        this.defaults.client_id,
        this.defaults.client_secret,
        '',
        this.defaults.authorize_url,
        this.defaults.access_token_url
    );

    this.resources = resources;
    this.access_token = options.access_token;
    this.refresh_token = options.refresh_token;

    this._initResources();
}

module.exports = Uber;

Uber.prototype._initResources = function() {
    for (var name in this.resources) {
        if ({}.hasOwnProperty.call(this.resources, name)) {
            this[name.toLowerCase()] = new resources[name](this);
        }
    }
};

Uber.prototype.getAuthorizeUrl = function getAuthorizeUrl(scope) {
    if (!Array.isArray(scope)) {
        return new Error('Scope is not an array');
    }
    if (scope.length === 0) {
        return new Error('Scope is empty');
    }

    return this.oauth2.getAuthorizeUrl({
        response_type: 'code',
        redirect_uri: this.defaults.redirect_uri,
        scope: scope.join(' ')
    });
};


Uber.prototype.authorization = function authorization(options, callback) {
    var self = this;
    var grantType = '';
    var code = '';

    if (options.hasOwnProperty('authorization_code')) {
        grantType = 'authorization_code';
        code = options.authorization_code;
    } else if (options.hasOwnProperty('refresh_token')) {
        grantType = 'refresh_token';
        code = options.refresh_token;
    } else {
        return callback(new Error('No authorization_code or refresh_token'));
    }

    this.oauth2.getOAuthAccessToken(code, {
        client_id: this.defaults.client_id,
        client_secret: this.defaults.client_secret,
        redirect_uri: this.defaults.redirect_uri,
        grant_type: grantType
    }, function(err, access_token, refresh_token) {
        if (err) {
            return callback(err);
        } else {
            self.access_token = access_token;
            self.refresh_token = refresh_token;
            return callback(null, self.access_token, self.refresh_token);
        }
    });

    return self;
};

Uber.prototype.get = function get(options, callback) {
    var access_type = this.createAccessHeader(options.server_token);
    if (!access_type) {
        return callback(new Error('Invalid access token'), 'A valid access token is required for this request');
    }
    var url = this.getRequestURL(options.version, options.url);


    // add all further option params
    if (options.params) {
        url += '?' + qs.stringify(options.params);
    }

    request.get({
        url: url,
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_type,
            'Accept-Language': this.defaults.language
        }
    }, function(err, data, res) {
        if (err || data.statusCode >= 400) {
            return callback((err ? err : data), res);
        } else {
            return callback(null, res);
        }
    });

    return this;
};
