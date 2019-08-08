import Taro from "@tarojs/taro"

const Util = {

    formatNumber: n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    },

    formatTime: function (date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [year, month, day].map(item => this.formatNumber(item)).join('-')
            + ' ' + [hour, minute, second].map(item => this.formatNumber(item)).join(':')
    },

    formatDate: function (date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return [year, month, day].map(item => this.formatNumber(item)).join('-')
    },

    rnd: (n = 0, m = 1) => {
        const random = Math.floor(Math.random() * (m - n + 1) + n)
        return random
    },

    rndOne: function (self = []) {
        return self.length > 0 ? self[this.rnd(0, self.length - 1)] : ''
    },

    getItem: key => {
        return Taro.getStorageSync(key)
    },

    setItem: (key, val) => {
        return Taro.setStorageSync(key, val)
    },

    removeItem: key => {
        return Taro.removeStorageSync(key)
    },

    clear: () => {
        return Taro.clearStorageSync()
    },

    getFollower: follower => {
        if (follower > 9999) {
            const number = follower / 10000
            return Math.round(number * 10) / 10 + '万'
        } else {
            return follower
        }
    },

    getWordCount: wordCount => {
        if (wordCount > 9999) {
            const number = parseInt(wordCount / 10000)
            return number + '万'
        } else {
            return wordCount
        }
    }
}

export default Util
