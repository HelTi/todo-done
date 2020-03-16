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
        logged: false,
        takeSession: false,
        requestResult: '',
        showMenuPopup: false,
        todoList: [],
        menuSubscript: {
            isImportantCount: 2,
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
            console.log('res', res)
            let {
                data,
                count,
                isImportantCount
            } = res
            this.setData({
                todoList: res.data,
                menuSubscript: {
                    count,
                    isImportantCount
                }
            })
        })
    },
    queryMenuSubscript(){
        queryMenuSubscript().then(res=>{
            console.log('res',res)
            this.setData({
                menuSubscript:{
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

})