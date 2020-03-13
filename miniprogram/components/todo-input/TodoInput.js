// components/todo-input/TodoInput.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageType: {
            type: Number,
            value: 0
        }  // 0我的一天 ，1重要 ，2代办列表
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
            let todoValue = this.data.todoValue
            console.log('todoValue',todoValue)
            const db = wx.cloud.database()
            db.collection('test').add({
                data: {
                    description: todoValue, // 描述，标题
                    create_date: new Date(), // 创建时间
                    due_date: null,  // 结束时间
                    complete_date: null, // 完成时间
                    done: false,   // 是否完成
                    isImportant: false, // 是否重要
                    remark: '',  // 备注
                    type: 0,   // 扩展类型 0:我的一天 1:代办列表
                    remind: false, // 是否提醒
                    remind_date: null // 提醒时间
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