var OAuth = require('oauth');
var util = require('util');
var request = require('request');
// var proxiedRequest = request.defaults({'proxy':'http://FLX_PILOTAGE:FLX_PILOTAGE@192.168.77.12:8080'});

var qs = require('querystring');

var resources = {
  User: require('./resources/user'),
  Estimates: require('./resources/estimate'),
};

function Uber(options) {
  this.sandbox = options.sandbox ? options.sandbox : false;
  this.jeton = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJzdWIiOiJkMTY2MDI4Yy03NzVjLTQzNTQtYWYyYy04YzM4MjhjYmY3ODEiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6IjczMjRmZTM2LWZlNGYtNDUyNy1hYTY2LWNkMDIyNTI5MTAzMSIsImV4cCI6MTQ4MjY3Mzk0MCwiaWF0IjoxNDgwMDgxOTQwLCJ1YWN0IjoiQWg4WDIwNnd4TEpDNE5qSTB3WWdJemt1a1o5YlpoIiwibmJmIjoxNDgwMDgxODUwLCJhdWQiOiItYVFuVTVBRm1ZRE8zVW1Wd3FadGluUG1OMEdkdXlwQSJ9.FC8fNL3rIlU_DIwb7mEA0idcbkfEEypqGXT8tU_1PRv1Dr17d__KqqdDd6tkTg_uX-KBH28M0VwhAEb7RBZnVkZ7gptmvtilr1wqc0GG29m26mp9wiXW4ONnLBgzZonjtVPNnfVX0gzI0aGLBqjF-fEZrjWSnTD4n7Msrhc0nXJ6GIn4mSohtEpNiZd44FjrAACdr3y_hx-b9Afk1k_0yzSoART6TXVGeYGv29KjKZzvr9EYQ6g8S6g_1-543qJFJBLxr6UWWBX6w6GG38-qLiA_g9t2pQFA5Fvt-9E7NJEcqE-SwLE9-HSzKP0EpIkDmfUmQsdqBVHJJPEOS-jfeA";
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


Uber.prototype._initResources = function () {
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
  }, function (err, access_token, refresh_token) {
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

Uber.prototype.isNumeric = function isNumeric(input) {
  return (!input || isNaN(input)) ? false : true;
};

Uber.prototype.createAccessHeader = function createAccessHeader(server_token) {
  var access_type;

  if (server_token) {
    access_type = 'Token ' + this.defaults.server_token;
  } else {
    if (this.access_token) {
      access_type = 'Bearer ' + this.access_token;
    }
  }

  return access_type;
};

Uber.prototype.getRequestURL = function getRequestURL(version, url) {
  return this.defaults.base_url + (version ? version : 'v1') + '/' + url;
};

Uber.prototype.get = function get(options, promise) {
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
  }, function (err, data, res) {
    if (err || data.statusCode >= 400) {
      promise.error(err)
    } else {
      promise.next(res);
    }
  });

  return this;
};


module.exports = Uber;
