import { configureStore } from '@reduxjs/toolkit'
import { studentReducer } from './reducer/studentReducer'

export const store = configureStore({
    reducer: {
        students: studentReducer
    }
})