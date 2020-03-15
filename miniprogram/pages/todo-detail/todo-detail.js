// miniprogram/pages/todo-detail/todo-detail.js
import {
    queryTodoDetailById,
    updateTodoItem
} from '../../utils/todoDbHelper.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        remark: '', //备注,
        todo: null,
        id: '1584110300209_0.0007184980774419536_33557273'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
    editTodoToMydayHandle() {
        const type = 1
        const isMyday = type === 1 ? true : false
        let todoId = this.data.todo._id
        updateTodoItem(todoId, {
            isMyday
        }).then(res => {
            console.log(res)
            this.queryItemDetail(todoId)
        })
    },
    remarkBlurHandle(e) {
        console.log(e)
        this.setData({
            remark: e.detail.value
        })
    },
    queryItemDetail(id) {
        queryTodoDetailById(id).then(res => {
            console.log('d', res)
            if (res.data) {
                this.setData({
                    todo: res.data[0]
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})