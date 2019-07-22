import Taro from '@tarojs/taro'

const request = ({ url, data = '' }, method = 'GET') => new Promise((resolve, reject) => {
    return Taro.request({
        url: url,
        data: data,
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
})

export const get = (url, data) => {
    return request({ url })
}

export const post = (url, data) => {
    return request({ url, data }, 'POST')
}