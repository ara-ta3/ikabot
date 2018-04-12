
class HttpClient {
    constructor(request, userAgent) {
        this.request = request;
        this.userAgent = userAgent;
    }

    get(url) {
        return new Promise((resolve, reject) => {
            this.request(
                {
                    url: url,
                    method: 'GET',
                    headers: {
                        'User-Agent': this.userAgent
                    }
                },
                (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }
            );
        });
    }
}

module.exports = HttpClient;
