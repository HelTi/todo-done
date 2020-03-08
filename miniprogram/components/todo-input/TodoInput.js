// components/todo-input/TodoInput.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        todoValue: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        todoInputHandle(e) {
            this.data.todoValue = e.detail.value
        },
        todoInputConfirmHandle(e) {
            let that = this
            let todoValue = this.data.value
            const db = wx.cloud.database()
            db.collection('test').add({
                data: {
                    description: todoValue,
                    createDate: new Date(),
                    due_date: null,
                    done: false,
                    isImportant: false,
                    remark: '',
                    type: 0,
                    remind: false,
                    remind_date: null
                },
                success: function(res) {
                    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                    console.log('插入成功', res)
                    that.triggerEvent('success', res)
                    that.setData({
                        todoValue: ''
                    })
                }
            })

        }
    }
})