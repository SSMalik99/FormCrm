import { configureStore } from '@reduxjs/toolkit'
import { FormsState, formReducer } from './FormsSlice';
// ...


const saveState = (state: FormsState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('formsState', serializedState);
    } catch (err) {
        console.error('Could not save state', err);
    }
};

// Middleware to save state to local storage
export const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
    const result = next(action);
    saveState(store.getState().forms);
    return result;
};



const store = configureStore({
    reducer: {
        forms: formReducer,
    },
    middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(localStorageMiddleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;