import axios from 'axios'
const USER_URL = 'https://jsonplaceholder.typicode.com/users'
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

const getItems = (url) => axios.get(url)


export {getItems}