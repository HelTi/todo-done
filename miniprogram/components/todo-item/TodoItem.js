// components/todo-item/TodoItem.js
import {
    removeTodoItem
} from '../../utils/todoDbHelper'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        todo: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        checked: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            let done = event.detail
            let todoId = this.data.todo._id
            const db = wx.cloud.database()
            db.collection('todos').doc(todoId).update({
                data: {
                    done: done,
                    complete_date: done ? new Date() : null
                },
                success: function (res) {
                    console.log(res)
                }
            })
            this.setData({
                todo: {
                    ...this.data.todo,
                    done,
                    complete_date: done ? new Date() : null
                }
            });
            this.triggerEvent('checkboxchange', event.detail)
        },
        onClickTodoItem() {
            this.triggerEvent('clicktodoitem')
            wx.navigateTo({
                url: '/pages/todo-detail/todo-detail?' + this.data.todo._id,
            })
        },
        onClickTodoItemRight() {
            let todoId = this.data.todo._id
            const db = wx.cloud.database()
            let isImportant = !this.data.todo.isImportant
            db.collection('todos').doc(todoId).update({
                data: {
                    isImportant
                }
            })
            this.setData({
                todo: {
                    ...this.data.todo,
                    isImportant
                }
            });
            this.triggerEvent('clicktodoright')
        },
        remove() {
            wx.showToast({
                title: 'hi',
            })
        },
        onPress(e) {
            // 长按删除
            let todoId = this.data.todo._id
            let that = this
            wx.showModal({
                title: '提示',
                content: '确定要删除此条任务吗？',
                success(res) {
                    if (res.confirm) {
                        removeTodoItem(todoId).then(res => {
                            wx.showToast({
                                title: '删除成功！',
                            })
                            that.triggerEvent('removesuccess',todoId)
                        })
                    }
                }
            })
        }
    }
})