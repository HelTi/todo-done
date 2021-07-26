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

    onLoad: function () {
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
        }).catch(err => {
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
        // wx.getUserInfo({
        //     success: res => {
        //         console.log('getUserInfo', res)
        //         this.setData({
        //             userInfo: res.userInfo
        //         })
        //     }
        // })
        wx.getUserProfile({
            desc: '获取头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo,
                })
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
    onGetUserInfo: function (e) {
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