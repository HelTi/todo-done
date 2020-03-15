// miniprogram/pages/todo-detail/todo-detail.js
import {
    queryTodoDetailById,
    updateTodoItem
} from '../../utils/todoDbHelper.js'

import {
    formatDate
} from '../../utils/utils.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        remark: '', //备注,
        todo: null,
        id: '1584110300209_0.0007184980774419536_33557273',
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
        this.queryItemDetail(this.data.id)
    },
    clickCheckBox(event) {
        let done = event.detail
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            done: done,
            complete_date: done ? new Date() : null
        }).then(res => {
            console.log('更新成功！', res)
        })
        this.setData({
            todo: {
                ...this.data.todo,
                done,
                complete_date: done ? new Date() : null
            }
        });
    },
    onClickTodoItemRight() {
        let todoId = this.data.todo._id
        let isImportant = !this.data.todo.isImportant
        updateTodoItem(todoId, {
            isImportant
        }).then(res => {
            console.log('更新成功！', res)
        })
        this.setData({
            todo: {
                ...this.data.todo,
                isImportant
            }
        });
    },
    editTodoToMydayHandle(e) {
        const isMyday = e.target.dataset.type
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            isMyday
        }).then(res => {
            this.queryItemDetail(todoId)
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
            this.queryItemDetail(todoId)
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
            this.queryItemDetail(todoId)
        })
    },
    queryItemDetail(id) {
        queryTodoDetailById(id).then(res => {
            if (res.data) {
                const data = res.data.map(item => {
                    return {
                        ...item,
                        due_date_format: item.due_date ? formatDate(item.due_date) : null,
                        complete_date_format: item.complete_date ? formatDate(item.complete_date) : null
                    }
                })

                this.setData({
                    currentDate: new Date(data[0].due_date).getTime(),
                    remark: data[0].remark
                })


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