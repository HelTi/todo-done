// miniprogram/pages/todo-detail/todo-detail.js
const moment = require('moment')
import {
    queryTodoDetailById,
    updateTodoItem,
    removeTodoItem
} from '../../utils/todoDbHelper.js'

import {
    formatDate
} from '../../utils/utils.js'

import {
    markTodoItem
} from '../../utils/markTodoItem.js'
moment.locale('zh-cn', {
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        m: '1 分钟',
        mm: '%d 分钟',
        h: '1 小时',
        hh: '%d 小时',
        d: '1 天',
        dd: '%d 天',
        M: '1 个月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年'
    },

})
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        remark: '', //备注,
        todo: null,
        id: null,
        datePickVisible: false, // 时间选择
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.id = options.id
        this.queryItemDetail()
    },
    clickCheckBox(event) {
        let done = event.detail
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            done: done,
            complete_date: done ? new Date() : null
        }).then(res => {
            console.log('更新成功！', res)
            this.queryItemDetail()
        })

    },
    onClickTodoItemRight() {
        let todoId = this.data.todo._id
        let isImportant = !this.data.todo.isImportant
        updateTodoItem(todoId, {
            isImportant
        }).then(res => {
            console.log('更新成功！', res)
            this.queryItemDetail()
        })

    },
    editTodoToMydayHandle(e) {
        // 添加到我的一天/ 取消我的一天
        const isMyday = e.target.dataset.type
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            isMyday,
            addMydayDate: isMyday ? new Date() : null
        }).then(res => {
            this.queryItemDetail()
        })
    },
    removeTodoItemHandle() {
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定要删除此条任务吗？',
            success(res) {
                if (res.confirm) {
                    removeTodoItem(that.data.todo._id).then(res => {
                        wx.navigateBack({

                        })
                    })
                } else if (res.cancel) {

                }
            }
        })

    },
    openDatePickPopup() {
        this.setData({
            datePickVisible: true
        })
    },
    closeDatePickPopup() {
        this.setData({
            datePickVisible: false
        })
    },
    confirmDatePick(e) {
        let due_date = new Date(e.detail)
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            due_date
        }).then(res => {
            this.queryItemDetail()
            this.setData({
                datePickVisible: false
            })
        })
    },
    cancelDatePick() {
        this.setData({
            datePickVisible: false
        })
    },

    remarkBlurHandle(e) {
        this.setData({
            remark: e.detail.value
        })
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            remark: e.detail.value
        }).then(res => {
            this.queryItemDetail()
        })
    },
    queryItemDetail() {
        queryTodoDetailById(this.data.id).then(res => {
            if (res.data) {
                const data = res.data.map(item => {
                    let markResult = markTodoItem(item)
                    return {
                        ...item,
                        ...markResult,
                        due_date_format: item.due_date ? formatDate(item.due_date) : null,
                        due_date_relative: item.due_date ? moment(item.due_date).startOf('minute').fromNow() : null,
                        complete_date_format: item.complete_date ? moment(item.complete_date).startOf('minute').fromNow() : null,
                        create_date_format: moment(item.create_date).startOf('minute').fromNow()
                    }
                })

                this.setData({
                    currentDate: new Date(data[0].due_date).getTime(),
                    remark: data[0].remark
                })
                console.log(data[0])

                this.setData({
                    todo: data[0]
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
})