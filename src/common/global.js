/**
 * 全局变量管理
 */
const Global = {

    globalData: {},

    setGlobalData: function (key, val) {
        this.globalData[key] = val
    },

    getGlobalData: function (key) {
        return this.globalData[key]
    }
}

export default Global