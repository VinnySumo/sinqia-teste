import { combineReducers } from "redux";
import userReducer from "./usuario/reducer";


const rootReducer = combineReducers({
    user: userReducer,
})

export default rootReducer