
const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
              name: action.name
            }
        default:
            return state
    }
}



const messages = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            if (state.map(m => m.name).includes(action.name)) {
                return state;
            }else{
                return [
                ...state,
                message(undefined, action)
                ]
            }
        case 'SEND_MESSAGE':
            return [
                ...state,
                message(undefined, action)
            ]
        default:
            return state
    }
};

export default messages;
