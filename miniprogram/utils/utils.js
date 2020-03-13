export const formatDate = (val) => {
    if(!val){
        return null
    }
    const date = new Date(val)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? ('0' + month) : month
    let day = date.getDate()
    day = day < 10 ? ('0' + day) : day
   
    return `${year}-${month}-${day}`
}