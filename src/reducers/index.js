import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import memberReducer from "./memberReducer"
import adminReducer from "./adminReducer"
import fundsReducer from "./fundsReducer"
import fundsList from "./fundsReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  member: memberReducer,
  admin: adminReducer,
  funds: fundsReducer,
  fundsList: fundsList
})
