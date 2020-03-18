import {
    formatDate
} from './utils.js'

import { markTodoItem } from './markTodoItem.js'
/**
 * 根据参数分页查询todo列表 /小程序端一次最多查20个
 */
export const queryTodoByPage = async(dbParams = {}, page = 1, pageSize = 20) => {
    const db = wx.cloud.database()
    const dbCollection = db.collection('todos')
    const countResult = await dbCollection.count()
    // 总条数
    const count = countResult.total
    // 按页查询
    const pageData = await dbCollection.where(dbParams).skip((page - 1) * pageSize).limit(pageSize).get()
    // 对字段添加时间格式化字段
    const data = pageData.data.map(item => {
        return {
            ...item,
            due_date_format: item.due_date ? formatDate(item.due_date) : null,
            complete_date_format: item.complete_date ? formatDate(item.complete_date) : null
        }
    })
    return new Promise((resolve, reject) => {
        resolve({
            data,
            count
        })
    })
}

/**
 * 从服务端查询
 */
export const queryTodo = (dbParams = {}) => {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'querytodolist',
            // 传给云函数的参数
            data: {
                dbParams
            },
            success: function(res) {
                let {
                    data,
                    count,
                    isImportantCount
                } = res.result
                // 对字段添加时间格式化字段
                data = data.map(item => {
                    let markResult = markTodoItem(item)
                    return {
                        ...item,
                        ...markResult,
                        due_date_format: item.due_date ? formatDate(item.due_date) : null,
                        complete_date_format: item.complete_date ? formatDate(item.complete_date) : null
                    }
                })
                resolve({
                    data,
                    count,
                    isImportantCount
                })
            }
        })
    })

}


export const queryMenuSubscript = () => {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'querymenusubscript',
            success: function(res) {
                let {
                    count,
                    isImportantCount
                } = res.result

                resolve({
                    count,
                    isImportantCount
                })
            }
        })
    })
}