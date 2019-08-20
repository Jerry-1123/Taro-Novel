import Taro from '@tarojs/taro'

const Request = {
    fetch: (url, { params = '', method = 'GET' } = {}) =>
        new Promise((resolve, reject) => {
            return Taro.request({
                url: url,
                data: params,
                method: method,
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    if (res.statusCode === 200 && res.data) {
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                },
                fail(err) {
                    reject(err)
                }
            })
        }),

    get: function (url, params) {
        return this.fetch(url, { params })
    },

    post: function (url, params) {
        return this.fetch(url, { params, method: 'POST' })
    }
}

export default Request