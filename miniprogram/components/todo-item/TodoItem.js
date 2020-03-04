// components/todo-item/TodoItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        checked: {
            type: Boolean,
            value: false
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
        onChange(event) {
            console.log(event)
            this.triggerEvent('checkboxchange', event.detail)
            this.setData({
                checked: event.detail
            });
            
        },
        onClickTodoItem(){
            this.triggerEvent('clicktodoitem')
        },
        onClickTodoItemRight(){
            this.triggerEvent('clicktodoright')
        }
    }
})