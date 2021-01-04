export const loginUser = (firstName, lastName, email) => ({
        type: 'LOGIN',
        payload: {
                firstName,
                lastName,
                email
        }
})