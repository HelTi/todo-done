// 云函数入口文件
const cloud = require('wx-server-sdk')
const moment = require('moment')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
    // 先取出集合记录总数
    const countResult = await db.collection('todos').count()
    const isImportantResult = await db.collection('todos').where({
        isImportant: true
    }).count()
    const isImportantCount = isImportantResult.total
    const count = countResult.total
    const queryCount = event.count ? event.count : 10
    // 查询参数
    const dbParams = event.dbParams ? event.dbParams :{}
    // 我的一天条件/当天 
    if(dbParams.isMyday){
        let curDate = moment().format('YYYY-MM-DD');
        let nextDate = moment().add(1, 'days').format('YYYY-MM-DD')
        dbParams.addMydayDate = _.gte(new Date(curDate)).and(_.lte(new Date(nextDate)))
    }
    // 计算需分几次取
    const batchTimes = Math.ceil(queryCount / 100)
    // 
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('todos').where(dbParams).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
        tasks.push(promise)
    }
    // 等待所有
    let data = (await Promise.all(tasks)).reduce((acc, cur) => {
        return {
            data: acc.data.concat(cur.data),
            errMsg: acc.errMsg,
        }
    })
    return {
        data: data.data,
        count,
        isImportantCount,
        event
    }

}