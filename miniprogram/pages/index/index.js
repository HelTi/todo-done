//index.js
import {
    formatDate
} from '../../utils/utils.js'
import {
    queryTodo
} from '../../utils/queryTodo.js'
const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: null,
        logged: false,
        takeSession: false,
        requestResult: '',
        showMenuPopup: false,
        todoList: []
    },

    onLoad: function() {
        this.checkAuth()
        this.queryTestDB()
    },
    checkAuth() {
        //获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },
    openMenuPopup() {
        this.setData({
            showMenuPopup: true
        })
    },
    closeMenuPopup() {
        this.setData({
            showMenuPopup: false
        })
    },
    onGetUserInfo: function(e) {
        console.log(e)
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo
            })
        }
    },

    onAddTodoSuccess(res) {
        console.log('res', res)
        this.queryTestDB()
    },

    onGetOpenid: function() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                wx.navigateTo({
                    url: '../userConsole/userConsole',
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
                wx.navigateTo({
                    url: '../deployFunctions/deployFunctions',
                })
            }
        })
    },

    queryTestDB() {
        queryTodo().then(res => {
            console.log('res', res)
            this.setData({
                todoList: res.data
            })
        })
    },

    // 上传图片
    doUpload: function() {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {

                wx.showLoading({
                    title: '上传中',
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../storageConsole/storageConsole'
                        })
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
                console.error(e)
            }
        })
    },

})