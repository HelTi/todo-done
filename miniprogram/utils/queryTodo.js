import {
    formatDate
} from './utils.js'
/**
 * 根据参数分页查询todo列表 /小程序端一次最多查20个
 */
export const queryTodo = async(collection = "test", dbParams = {}, page = 1, pageSize = 20) => {
    const db = wx.cloud.database()
    const dbCollection = db.collection(collection)
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