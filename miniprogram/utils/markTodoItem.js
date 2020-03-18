const moment = require('moment')
/**
 * 标记todoitem 是否在我的一天、是否过期
 */

export const markTodoItem = (item) => {
    let result = {}
    // 是否展示我的一天标记
    if (item.isMyday) {
        let curDate = new Date(moment().format('YYYY-MM-DD'));
        let nextDate = new Date(moment().add(1, 'days').format('YYYY-MM-DD'))
        let addMydayDate = new Date(item.addMydayDate)
        let isShowMyday = (addMydayDate > curDate && addMydayDate < nextDate)
        console.log('isSHowMyday', isShowMyday)
        result.isShowMyday = isShowMyday
    }
    // 是否展示已过设定的截止日期
    if (item.due_date) {
        let curDate = new Date()
        let dueDate = new Date(item.due_date)
        let isShowDueDate = false
        if (item.done) {
            let completeDate = new Date(item.complete_date)
            if (completeDate > dueDate) {
                isShowDueDate = true
            }
        } else {
            if (curDate > dueDate) {
                isShowDueDate = true
            }
        }
        console.log('isShowDueDate', isShowDueDate)
        result.isShowDueDate = isShowDueDate

    }

    return result
}