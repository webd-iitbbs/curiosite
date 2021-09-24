const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
}

export const userReducer = (state = initialState, action) => {
    // Takes in user state and returns a new state
        switch(action.type){
                case 'LOGIN':
                                return {
                                        
                                        ...action.payload
                                }
                case 'LOGOUT':
                                return {
                                    initialState
                                }
                        
                      
                      
                default:
                        return state
        }
}