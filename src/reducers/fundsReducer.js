import { GET_FUNDS_DATA } from "../actions/types"
import { GET_FUNDS_LIST } from "../actions/types"

const initialState = {
  funds: null,
  fundsList: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FUNDS_DATA:
      return {
        ...state,
        funds: action.payload
      }
    case GET_FUNDS_LIST:
      return {
        ...state,
        fundsList: action.payload
      }

    default:
      return state
  }
}
