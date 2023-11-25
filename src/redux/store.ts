import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import productModalSlice from './product-modal/productModalSlice'
// import cartItemsSlice from './shopping-cart/cartItemSlice'
import authSlice from './authentication/authSlice'
// import userSlice from './users/userSlice'

const persistConfig = {
  key: 'root',
  storage
}
const reducer = combineReducers({
  auth: authSlice,
  // user: userSlice
})
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})
export const persistor = persistStore(store)
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

