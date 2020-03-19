// components/todolist/todolist.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        todoList: {
            type: Array,
            value: []
        },
        loading: {
            type: Boolean,
            value: true
        },
        emptyText: {
            type: String,
            value: '数据是空的～'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        checkboxChange(event) {
            console.log('ev', event)
        },
        clickTodoItemHandle(event) {
            console.log(event)
        },
        clickTodoItemRight(event) {
            console.log(event)
        }
    }
})