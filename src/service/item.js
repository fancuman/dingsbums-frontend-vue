import wp from './webapi.js'
const { post, get } = wp

export default {
    create(item) {
        return post('/api/items/', item);
    },

    getAll() {
        return get('/api/items/')
    }
}