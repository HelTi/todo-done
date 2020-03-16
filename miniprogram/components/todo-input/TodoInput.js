// components/todo-input/TodoInput.js
import {
    addTodoItem
} from '../../utils/todoDbHelper.js'

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageType: {
            type: Number,
            value: 0
        } // 0我的一天 ，1重要 ，2代办列表
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
            let pageType = this.data.pageType
            console.log('pageType',pageType)
            let addParams = {
                description: todoValue,
            }
            if(pageType === 0){
                addParams.isMyday = true
                addParams.addMydayDate = new Date()
            }
            if(pageType === 1){
                addParams.isImportant = true
            }
            console.log('addParams', addParams)

            addTodoItem(addParams).then(res => {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log('插入成功', res)
                that.triggerEvent('success', res)
                that.setData({
                    todoValue: ''
                })
            })

        }
    }
})