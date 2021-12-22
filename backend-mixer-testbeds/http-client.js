const request = require('request')
module.exports = {
    makePostJsonRequest: async (url, payload) => {
        return new Promise((resolve, reject) => {
            request.post(
                url,
                {
                    json: payload
                },
                function (error, response, body) {
                    if (!error && response.statusCode < 300) {
                        console.log('success')
                        resolve(body)
                    }
                    else {
                        console.log(error)
                        reject(error)
                    }
                }
            )
        })
    },

    makeGetRequest: async (url) => {
        return new Promise((resolve, reject) => {
            request.get(
                url,
                function (error, response, body) {
                    if (!error && response.statusCode < 300) {
                        resolve(body)
                    }
                    else {
                        console.log(error)
                        reject(error)
                    }
                }
            )
        })
    },

    makeDeleteRequest: async (url) => {
        return new Promise((resolve, reject) => {
            request.delete(
                url,
                function (error, response, body) {
                    if (!error && response.statusCode < 300) {
                        resolve(body)
                    }
                    else {
                        console.log(error)
                        reject(error)
                    }
                }
            )
        })
    }
}