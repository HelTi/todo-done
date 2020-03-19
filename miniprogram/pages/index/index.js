//index.js
import {
    formatDate
} from '../../utils/utils.js'
import {
    queryTodo,
    queryMenuSubscript
} from '../../utils/queryTodo.js'
const app = getApp()

Page({
    data: {
        currentDate: '',
        userInfo: null,
        showMenuPopup: false,
        todoList: [],
        loading: true, // 第一次加载
        menuSubscript: {
            isImportantCount: '',
            count: ''
        },
    },

    onLoad: function() {
        this.checkAuth()
        this.setData({
            currentDate: formatDate(null, true)
        })
    },
    onShow() {
        this.queryTodoList()
    },

    queryTodoList() {
        queryTodo({
            isMyday: true
        }).then(res => {
            let {
                data,
                count,
                isImportantCount
            } = res
            this.setData({
                todoList: data.map(item => {
                    return {
                        ...item,
                        fromIndex: true
                    }
                }),
                menuSubscript: {
                    count,
                    isImportantCount
                },
                loading: false
            })
        }).catch(err=>{
            console.log(err)
        })
    },
    queryMenuSubscript() {
        queryMenuSubscript().then(res => {
            console.log('res', res)
            this.setData({
                menuSubscript: {
                    ...res
                }
            })
        })
    },
    clickMenuItem() {
        this.setData({
            showMenuPopup: false
        })
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
        this.queryMenuSubscript()
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
        this.queryTodoList()
    },
    onShareAppMessage(res) {
        return {
            title: '记我清单，你的效率助手',
            path: '/pages/index/index',
            imageUrl: '../../images/share.jpeg'
        }
    },

})