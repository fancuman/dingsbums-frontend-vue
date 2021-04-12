import wp from './webapi.js'
const { post } = wp

export default {
    login(user) {
        return post('/api/users/sign_in', user);
    },

    register(user) {
        return post('/api/users/register', user)
    }
}