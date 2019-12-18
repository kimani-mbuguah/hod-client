import {
  GET_MEMBER,
  GET_MEMBERS,
  GET_SMS_MEMBERS,
  GET_RELATIONSHIP_MEMBERS,
  GET_MEMBERS_COUNT
} from "../actions/types"

const initialState = {
  member: null,
  members: null,
  smslist: null,
  count: null,
  relationshipList: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER:
      return {
        ...state,
        member: action.payload
      }
    case GET_MEMBERS:
      return {
        ...state,
        members: action.payload
      }

    case GET_SMS_MEMBERS:
      return {
        ...state,
        smslist: action.payload
      }

    case GET_RELATIONSHIP_MEMBERS:
      return {
        ...state,
        relationshipList: action.payload
      }
    case GET_MEMBERS_COUNT:
      return {
        ...state,
        count: action.payload
      }
    default:
      return state
  }
}
