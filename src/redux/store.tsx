import {createStore} from 'redux'
import todoReducer from './todo/todoReducer'

const myStore = createStore(todoReducer)

export default myStore;