// miniprogram/pages/important/important.js
import {
    formatDate
} from '../../utils/utils.js'
import {
    queryTodo
} from '../../utils/queryTodo.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        todoList: [],
        loading: true, // 第一次加载
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onShow() {
        console.log('show')
        this.queryTodoList()
    },
    queryTodoList() {
        queryTodo({
            isImportant: true
        }).then(res => {
            console.log('res', res)
            if (res.data) {
                this.setData({
                    todoList: res.data,
                    loading: false
                })
            }
        })
    },
    onAddTodoSuccess(res) {
        console.log('res', res)
        this.queryTodoList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
})