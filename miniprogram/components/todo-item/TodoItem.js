// components/todo-item/TodoItem.js
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
            console.log(event)
            this.triggerEvent('checkboxchange', event.detail)
            this.setData({
                checked: event.detail
            });
            
        },
        onClickTodoItem(){
            this.triggerEvent('clicktodoitem')
            wx.navigateTo({
                url: '/pages/todo-detail/todo-detail',
            })
        },
        onClickTodoItemRight(){
            this.triggerEvent('clicktodoright')
        }
    }
})