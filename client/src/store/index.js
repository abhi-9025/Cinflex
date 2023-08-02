import { configureStore } from '@reduxjs/toolkit'
import cinflexReducer from './cinflicSlice'
export const store = configureStore({
    reducer: {
        cinflex:cinflexReducer
    },
  })