const initialState = {
    token:localStorage.getItem('token'),
    cartList:[]
}
function tokenReducer(state=initialState,action){
    const {type,payload}= action
    switch(type){
        case 'changeToken' :
            state.token = payload
            return state
        default:
            return state
    }
}

function cartReducer(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case 'changeCartList':
            const newState = JSON.parse(JSON.stringify(state))
            const ele = newState.cartList.find(e=>e.id==payload.id)
            if(ele){
                ele.num++
            }else{
                newState.cartList.push({
                    ...payload,
                    num:1
                })
            }
            return newState
            
        default:
            return state
    }
}

export{
    tokenReducer,
    cartReducer
}