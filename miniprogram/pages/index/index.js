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
        hasLoadOnce: false // 是否onload一次
    },

    onLoad: function () {
        this.setData({
            currentDate: formatDate(null, true)
        })
        if (!this.data.hasLoadOnce) {
            this.queryTodoList(() => {
                this.data.hasLoadOnce = true
            })
        }
    },
    onShow() {
        if (this.data.hasLoadOnce) {
            this.queryTodoList()
        }

    },

    removesuccessHandle(e) {
        console.log('todoId', e)
        this.queryTodoList()
    },

    queryTodoList(cb) {
        queryTodo({
            isMyday: true
        }).then(res => {
            //出发回调
            cb && cb()
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