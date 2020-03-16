// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
    // 先取出集合记录总数
    const countResult = await db.collection('todos').count()
    const isImportantResult = await db.collection('todos').where({
        isImportant: true
    }).count()
    const isImportantCount = isImportantResult.total
    const count = countResult.total

    return {
        count,
        isImportantCount
    }

}