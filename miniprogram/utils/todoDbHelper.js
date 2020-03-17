const db = wx.cloud.database()
const dbCollection = db.collection('todos')

/**
 * 通过id查询单个todo详情
 */
export const queryTodoDetailById = (id) => {
    return dbCollection.where({
        _id: id
    }).get()
}

/**
 * 添加todoItem 三个地方，我的一天，重要，代办列表
 */
export const addTodoItem = (params) => {
    const defaultParams = {
        // description: description, // 描述，标题
        create_date: new Date(), // 创建时间
        isMyday: false,
        addMydayDate: null, // 添加到我的一天的时间
        due_date: null, // 结束时间
        complete_date: null, // 完成时间
        done: false, // 是否完成
        isImportant: false, // 是否重要
        remark: '', // 备注
        type: 0,
        remind: false, // 是否提醒
        remind_date: null // 提醒时间
    }
    return dbCollection.add({
        data: {
            ...defaultParams,
            ...params
        }
    })
}

/**
 * 更新todoItem
 */
export const updateTodoItem = (id, params) => {
    return dbCollection.doc(id).update({
        data: {
            ...params
        }
    })
}

/**
 * 删除todoItem
 */

export const removeTodoItem = (id) => {
    return dbCollection.doc(id).remove()
}