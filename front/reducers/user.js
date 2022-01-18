import produce from 'immer';

export const initialState = {
    logInLoading: false,
    logInDone:false,
    logInError:null,

    logOutLoading: false,
    logOutDone:false,
    logOutError:null,

    getMyProfileLoading: false,
    getMyProfileDone:false,
    getMyProfileError:null,

    user:null,
    profile:null,

    signUpData: {},
    loginData: {}
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const GET_MY_PROFILE_REQUEST = "GET_MY_PROFILE_REQUEST"
export const GET_MY_PROFILE_SUCCESS = "GET_MY_PROFILE_SUCCESS"
export const GET_MY_PROFILE_FAILURE = "GET_MY_PROFILE_FAILURE"

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.user = action.data;
            break;
        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;

        case LOG_OUT_REQUEST:
            draft.logOutLoading = true;
            draft.logOutError = null;
            draft.logOutDone = false;
            break;
        case LOG_OUT_SUCCESS:
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.user = null;
            break;
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutError = action.error;
            break;

        case GET_MY_PROFILE_REQUEST:
            draft.getMyProfileLoading = true;
            draft.getMyProfileError = null;
            draft.getMyProfileDone = false;
            break;
        case GET_MY_PROFILE_SUCCESS:
            draft.getMyProfileLoading = false;
            draft.getMyProfileDone = true;
            draft.profile = action.data;
            break;
        case GET_MY_PROFILE_FAILURE:
            draft.getMyProfileLoading = false;
            draft.getMyProfileError = action.error;
            break;

        default:
            break;
    }
});
