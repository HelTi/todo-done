export const formatDate = (val=null, noYear = false) => {
    let date = new Date()
    if(val){
        date = new Date(val)
    }
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? ('0' + month) : month
    let day = date.getDate()
    day = day < 10 ? ('0' + day) : day
    let d = date.getDay(); //获取存储当前日期
    let weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    if(noYear){
        return `${month}月${day} ${weekday[d]}`
    }else{
        return `${year}年${month}月${day} ${weekday[d]}`
    }

}