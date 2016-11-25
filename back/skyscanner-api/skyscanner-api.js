var request = require('request');


function Skyscanner(options) {

    this.defaults = {
        apiKey: options.apiKey,
        hostname: "maps.googleapis.com",

    };
    this.baseURL = "http://partners.api.skyscanner.net/apiservices";

    this.hotelAutosuggestURL = `${this.baseURL}/hotels/autosuggest/v2`;
    this.locationAutosuggestURL = `${this.baseURL}/autosuggest/v1.0`;
    this.hotelPricingURL = `${this.baseURL}/hotels/liveprices/v2`;
    this.hotelDetailsURL = `${this.baseURL}/hotels/livedetails/v2`;

    this.hotels = {
        livePrices: {
            session: (params, promise) => {
                let url = this.hotelPricingURL;
                url += `/${params.market}`;
                url += `/${params.currency}`;
                url += `/${params.locale}`;
                url += `/${params.entityId}`;
                url += `/${params.checkindate}`;
                url += `/${params.checkoutdate}`;
                url += `/${params.guests}`;
                url += `/${params.rooms}`;
                url += `?apiKey=prtl6749387986743898559646983194`;
                console.log(url)
                return request.get(url, {
                    headers: {
                        "Accept":"application/json"
                    }
                }, function(err, data, res) {
                    if (err || data.statusCode >= 400) {
                        promise.error(err)
                    } else {
                        promise.next(res);
                    }
                });
            },

            poll: (session, params = {}) => {
                return request.get(session, {params: params});
            },
            details: {
                session: (session, params) => {
                    const url = `${this.hotelDetailsURL}/details/${session}`;
                    return request.get(url, {params: params});
                },
                poll: (session, params) => {
                    const url = `${this.hotelDetailsURL}/polldetails/${session}`;
                    return request.get(url, {params: params});
                }
            }
        },
        autosuggest: (params, promise) => {
            let url = this.hotelAutosuggestURL;
            url += `/${params.market}`;
            url += `/${params.currency}`;
            url += `/${params.locale}`;
            url += `/${params.query}`;
            url += `?apiKey=${this.defaults.apiKey}`;
            console.log(url);
            return request.get(url, {
                headers: {
                    "Accept": "application/json"
                }
            }, function(err, data, res) {
                if (err || data.statusCode >= 400) {
                    promise.error(err)
                } else {
                    promise.next(res);
                }
            });
        }
    };

    this.locationAutosuggest = (params) => {
        let url = this.locationAutosuggestURL;
        url += `/${params.market}`;
        url += `/${params.currency}`;
        url += `/${params.locale}`;

        let reqParams = {
            apiKey: apiKey
        };

        if (params.query) {
            reqParams.query = params.query;
        } else {
            reqParams.id = params.id;
        }

        return request.get(url, {
            headers: {
                "Accept": "application/json"
            },
            params: reqParams
        });
    };

    this.referral = (params) => {
        let url = this.referralURL;
        url += `/${params.market}`;
        url += `/${params.currency}`;
        url += `/${params.locale}`;
        url += `/${params.originPlace}`;
        url += `/${params.destinationPlace}`;
        url += `/${params.outboundPartialDate}`;

        if (params.inboundPartialDate) {
            url += `/${params.inboundPartialDate}`;
        }

        return request.get(url, {
            headers: {
                "X-Forwarded-For": params.ip
            },
            params: {
                apiKey: apiKey
            }
        });
    };



}


Skyscanner.prototype.get = function get(options, promise) {

    console.log(options);
    request.get({
        url: "https://maps.googleapis.com" + options.url,
        json: true
    }, function(err, data, res) {
        if (err || data.statusCode >= 400) {
            promise.error(err)
        } else {
            promise.next(res);
        }
    });

    return this;
};
module.exports  = Skyscanner;

