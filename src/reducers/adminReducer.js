import { GET_ADMIN, GET_ADMINS } from "../actions/types"

const initialState = {
  admin: null,
  admins: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload
      }
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload
      }
    default:
      return state
  }
}
