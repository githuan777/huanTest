function changeToken(data){
    return{
        type:'changeToken',
        payload:data
    }
}


function changeCartList(data){
    return {
        type:'changeCartList',
        payload:data
    }
}
export{
    changeToken,
    changeCartList
}