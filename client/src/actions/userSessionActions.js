export const loginUser = (firstName, lastName, email, id) => ({
        type: 'LOGIN',
        payload: {
                firstName,
                lastName,
                email,
                id
        }
})

export const logoutUser = () => ({
    type: 'LOGOUT'
})