import { createStore,applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { rootReducer } from './reducers';
import { saveToStorage } from '../services/local-storage';


export const store = createStore(rootReducer,applyMiddleware(thunk));

store.subscribe(()=>{
    saveToStorage("users", store.getState().user.users)
});