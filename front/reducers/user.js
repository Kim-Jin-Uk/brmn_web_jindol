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

    getMyProfileDetailLoading: false,
    getMyProfileDetailDone:false,
    getMyProfileDetailError:null,

    getOtherProfileLoading: false,
    getOtherProfileDone:false,
    getOtherProfileError:null,

    getOtherProfileDetailLoading: false,
    getOtherProfileDetailDone:false,
    getOtherProfileDetailError:null,

    updateMyProfileLoading: false,
    updateMyProfileDone:false,
    updateMyProfileError:null,

    user:null,
    profile:null,
    profileDetail:null,

    otherProfile:null,
    otherProfileDetail:null,
};

export const UPLOAD_MY_PROFILE_DONE = "UPLOAD_MY_PROFILE_DONE"


export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const GET_MY_PROFILE_REQUEST = "GET_MY_PROFILE_REQUEST"
export const GET_MY_PROFILE_SUCCESS = "GET_MY_PROFILE_SUCCESS"
export const GET_MY_PROFILE_FAILURE = "GET_MY_PROFILE_FAILURE"

export const GET_MY_PROFILE_DETAIL_REQUEST = "GET_MY_PROFILE_DETAIL_REQUEST"
export const GET_MY_PROFILE_DETAIL_SUCCESS = "GET_MY_PROFILE_DETAIL_SUCCESS"
export const GET_MY_PROFILE_DETAIL_FAILURE = "GET_MY_PROFILE_DETAIL_FAILURE"

export const GET_OTHER_PROFILE_REQUEST = "GET_OTHER_PROFILE_REQUEST"
export const GET_OTHER_PROFILE_SUCCESS = "GET_OTHER_PROFILE_SUCCESS"
export const GET_OTHER_PROFILE_FAILURE = "GET_OTHER_PROFILE_FAILURE"

export const GET_OTHER_PROFILE_DETAIL_REQUEST = "GET_OTHER_PROFILE_DETAIL_REQUEST"
export const GET_OTHER_PROFILE_DETAIL_SUCCESS = "GET_OTHER_PROFILE_DETAIL_SUCCESS"
export const GET_OTHER_PROFILE_DETAIL_FAILURE = "GET_OTHER_PROFILE_DETAIL_FAILURE"

export const UPDATE_MY_PROFILE_REQUEST = "UPDATE_MY_PROFILE_REQUEST"
export const UPDATE_MY_PROFILE_SUCCESS = "UPDATE_MY_PROFILE_SUCCESS"
export const UPDATE_MY_PROFILE_FAILURE = "UPDATE_MY_PROFILE_FAILURE"

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case UPLOAD_MY_PROFILE_DONE:
            draft.updateMyProfileLoading = false;
            draft.updateMyProfileError = null;
            draft.updateMyProfileDone = false;
            break;


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

        case GET_MY_PROFILE_DETAIL_REQUEST:
            draft.getMyProfileDetailLoading = true;
            draft.getMyProfileDetailError = null;
            draft.getMyProfileDetailDone = false;
            break;
        case GET_MY_PROFILE_DETAIL_SUCCESS:
            draft.getMyProfileDetailLoading = false;
            draft.getMyProfileDetailDone = true;
            draft.profileDetail = action.data;
            break;
        case GET_MY_PROFILE_DETAIL_FAILURE:
            draft.getMyProfileDetailLoading = false;
            draft.getMyProfileDetailError = action.error;
            break;

        case GET_OTHER_PROFILE_REQUEST:
            draft.getOtherProfileLoading = true;
            draft.getOtherProfileError = null;
            draft.getOtherProfileDone = false;
            break;
        case GET_OTHER_PROFILE_SUCCESS:
            draft.getOtherProfileLoading = false;
            draft.getOtherProfileDone = true;
            draft.otherProfile = action.data;
            break;
        case GET_OTHER_PROFILE_FAILURE:
            draft.getOtherProfileLoading = false;
            draft.getOtherProfileError = action.error;
            break;

        case GET_OTHER_PROFILE_DETAIL_REQUEST:
            draft.getOtherProfileDetailLoading = true;
            draft.getOtherProfileDetailError = null;
            draft.getOtherProfileDetailDone = false;
            break;
        case GET_OTHER_PROFILE_DETAIL_SUCCESS:
            draft.getOtherProfileDetailLoading = false;
            draft.getOtherProfileDetailDone = true;
            draft.otherProfileDetail = action.data;
            break;
        case GET_OTHER_PROFILE_DETAIL_FAILURE:
            draft.getOtherProfileDetailLoading = false;
            draft.getOtherProfileDetailError = action.error;
            break;

        case UPDATE_MY_PROFILE_REQUEST:
            draft.updateMyProfileLoading = true;
            draft.updateMyProfileError = null;
            draft.updateMyProfileDone = false;
            break;
        case UPDATE_MY_PROFILE_SUCCESS:
            draft.updateMyProfileLoading = false;
            draft.updateMyProfileDone = true;
            break;
        case UPDATE_MY_PROFILE_FAILURE:
            draft.updateMyProfileLoading = false;
            draft.updateMyProfileError = action.error;
            break;

        default:
            break;
    }
});
