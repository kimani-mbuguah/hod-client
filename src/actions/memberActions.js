import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  GET_ERRORS,
  GET_MEMBERS,
  GET_MEMBER,
  CLEAR_ERRORS,
  GET_SMS_MEMBERS,
  GET_RELATIONSHIP_MEMBERS,
  GET_MEMBERS_COUNT
} from "./types";

const backendApi = "http://34.68.158.39:5002/member";
//const backendApi = "http://127.0.0.1:5002/member";
// Register Member
export const registerMember = (userData, history) => dispatch => {
  return axios
    .post(`${backendApi}/register`, userData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

//Get all members
export const listMembers = history => dispatch => {
  return axios
    .get(`${backendApi}/list`)
    .then(res => {
      if (res.status == 200) {
        dispatch({
          type: GET_MEMBERS,
          payload: res.data
        });
      } else if (res.status == 403) {
        history.push("/admin/dashboard");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_MEMBERS,
        payload: {}
      });

      history.push("/auth/login");
    });
};

//Get all members
export const listSmsMembers = history => dispatch => {
  return axios
    .get(`${backendApi}/listsms`)
    .then(res => {
      if (res.status == 200) {
        dispatch({
          type: GET_SMS_MEMBERS,
          payload: res.data
        });
      } else if (res.status == 403) {
        history.push("/admin/dashboard");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_SMS_MEMBERS,
        payload: {}
      });

      history.push("/auth/login");
    });
};

//Get all members
export const listRelationshipMembers = history => dispatch => {
  return axios
    .get(`${backendApi}/listrelationship`)
    .then(res => {
      if (res.status == 200) {
        dispatch({
          type: GET_RELATIONSHIP_MEMBERS,
          payload: res.data
        });
      } else if (res.status == 403) {
        history.push("/admin/dashboard");
      }
    })
    .catch(err => {
      dispatch({
        type: GET_SMS_MEMBERS,
        payload: {}
      });

      history.push("/auth/login");
    });
};

// Get one member
export const listMember = (email, history) => dispatch => {
  axios
    .get(`${backendApi}/list/${email}`)
    .then(res => {
      dispatch({
        type: GET_MEMBER,
        payload: res.data.member
      });
      history.push("/admin/member-profile");
    })
    .catch(() => {
      dispatch({
        type: GET_MEMBER,
        payload: null
      });
      history.push("/auth/login");
    });
};

// Get one member
export const postUpdateProfile = (profileBody, history) => dispatch => {
  console.log(profileBody);
  return axios
    .post(`${backendApi}/updateprofile`, profileBody)
    .then(res => {
      dispatch({
        type: GET_MEMBER,
        payload: profileBody
      });
      history.push("/admin/member-profile");
      return res;
    })
    .catch(err =>
      dispatch({
        type: GET_MEMBER,
        payload: null
      })
    );
};

export const postUpdateProfilePic = (profilePicBody, history) => dispatch => {
  console.log(profilePicBody);
  return axios
    .post(`${backendApi}/updateprofilepic`, profilePicBody)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

// Register Member
export const sendSms = (messageBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/sendsms`, messageBody)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

// Post Relationship
export const postRelationship = (relationshipBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/addrelationship`, relationshipBody)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

export const sendMultipleSms = (messageBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/multiplesmsrecipients`, messageBody)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

export const createCustomGroup = (groupBody, history) => dispatch => {
  return axios
    .post(`${backendApi}/creategroup`, groupBody)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

export const sendGroupSms = messageBody => dispatch => {
  return axios
    .post(`${backendApi}/groupsms`, messageBody)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });

      return res;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      if (err.response) {
        return err.response;
      }
    });
};

export const getMembersCount = history => dispatch => {
  return axios
    .get(`${backendApi}/count`)
    .then(res => {
      dispatch({
        type: GET_MEMBERS_COUNT,
        payload: res.data.count
      });

      return res;
    })
    .catch(err => {
      history.push("/auth/login");
    });
};
