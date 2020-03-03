// components/side-menu/SideMenu.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userInfo: {
            type: Object,
            value: null
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
        getUserInfo(e) {
            console.log('e', e)
            if (e.detail.userInfo) {
                this.triggerEvent('getuserinfo', e.detail)
            } else {
                this.triggerEvent('getuserinfo', null)
            }

        }
    }
})