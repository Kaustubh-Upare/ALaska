import {configureStore} from '@reduxjs/toolkit'
import api from './api/api';


const store=configureStore({
    reducer:{
        [api.reducerPath]:api.reducer,
    },
    middleware:(mid)=>[...mid(),api.middleware]
})

export default store;