import produce from 'immer';

export const initialState = {
    logInLoading: false,
    logInDone:false,
    logInError:null,

    checkAgreementLoading: false,
    checkAgreementDone:false,
    checkAgreementError:null,

    updateAgreementLoading: false,
    updateAgreementDone:false,
    updateAgreementError:null,

    logOutLoading: false,
    logOutDone:false,
    logOutError:null,

    getMyProfileLoading: false,
    getMyProfileDone:false,
    getMyProfileError:null,

    getMyProfileDetailLoading: false,
    getMyProfileDetailDone:false,
    getMyProfileDetailError:null,

    getOtherUserLoading: false,
    getOtherUserDone:false,
    getOtherUserError:null,

    getOtherProfileLoading: false,
    getOtherProfileDone:false,
    getOtherProfileError:null,

    getOtherProfileDetailLoading: false,
    getOtherProfileDetailDone:false,
    getOtherProfileDetailError:null,

    updateMyProfileLoading: false,
    updateMyProfileDone:false,
    updateMyProfileError:null,

    updateProfileImageDefaultLoading: false,
    updateProfileImageDefaultDone:false,
    updateProfileImageDefaultError:null,

    uploadProfileImageLoading: false,
    uploadProfileImageDone:false,
    uploadProfileImageError:null,

    updateProfileImageLoading: false,
    updateProfileImageDone:false,
    updateProfileImageError:null,

    followingLoading: false,
    followingDone: false,
    followingError: null,

    unfollowingLoading: false,
    unfollowingDone: false,
    unfollowingError: null,

    reportLoading: false,
    reportDone: false,
    reportError: null,

    questionLoading: false,
    questionDone: false,
    questionError: null,

    noticeLoading: false,
    noticeDone: false,
    noticeError: null,

    frequencyLoading: false,
    frequencyDone: false,
    frequencyError: null,

    user:null,
    agreement:null,
    profile:null,
    profileDetail:null,

    otherUser:null,
    otherProfile:null,
    otherProfileDetail:null,

    imagePath:null,

    noticeList:[],
    frequencyList:[],
};

export const UPLOAD_MY_PROFILE_DONE = "UPLOAD_MY_PROFILE_DONE"

export const LOG_IN_REQUEST = "LOG_IN_REQUEST"
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS"
export const LOG_IN_FAILURE = "LOG_IN_FAILURE"

export const CHECK_AGREEMENT_REQUEST = "CHECK_AGREEMENT_REQUEST"
export const CHECK_AGREEMENT_SUCCESS = "CHECK_AGREEMENT_SUCCESS"
export const CHECK_AGREEMENT_FAILURE = "CHECK_AGREEMENT_FAILURE"

export const UPDATE_AGREEMENT_REQUEST = "UPDATE_AGREEMENT_REQUEST"
export const UPDATE_AGREEMENT_SUCCESS = "UPDATE_AGREEMENT_SUCCESS"
export const UPDATE_AGREEMENT_FAILURE = "UPDATE_AGREEMENT_FAILURE"

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST"
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS"
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE"

export const GET_MY_PROFILE_REQUEST = "GET_MY_PROFILE_REQUEST"
export const GET_MY_PROFILE_SUCCESS = "GET_MY_PROFILE_SUCCESS"
export const GET_MY_PROFILE_FAILURE = "GET_MY_PROFILE_FAILURE"

export const GET_MY_PROFILE_DETAIL_REQUEST = "GET_MY_PROFILE_DETAIL_REQUEST"
export const GET_MY_PROFILE_DETAIL_SUCCESS = "GET_MY_PROFILE_DETAIL_SUCCESS"
export const GET_MY_PROFILE_DETAIL_FAILURE = "GET_MY_PROFILE_DETAIL_FAILURE"

export const GET_OTHER_USER_REQUEST = "GET_OTHER_USER_REQUEST"
export const GET_OTHER_USER_SUCCESS = "GET_OTHER_USER_SUCCESS"
export const GET_OTHER_USER_FAILURE = "GET_OTHER_USER_FAILURE"

export const GET_OTHER_PROFILE_REQUEST = "GET_OTHER_PROFILE_REQUEST"
export const GET_OTHER_PROFILE_SUCCESS = "GET_OTHER_PROFILE_SUCCESS"
export const GET_OTHER_PROFILE_FAILURE = "GET_OTHER_PROFILE_FAILURE"

export const GET_OTHER_PROFILE_DETAIL_REQUEST = "GET_OTHER_PROFILE_DETAIL_REQUEST"
export const GET_OTHER_PROFILE_DETAIL_SUCCESS = "GET_OTHER_PROFILE_DETAIL_SUCCESS"
export const GET_OTHER_PROFILE_DETAIL_FAILURE = "GET_OTHER_PROFILE_DETAIL_FAILURE"

export const UPDATE_MY_PROFILE_REQUEST = "UPDATE_MY_PROFILE_REQUEST"
export const UPDATE_MY_PROFILE_SUCCESS = "UPDATE_MY_PROFILE_SUCCESS"
export const UPDATE_MY_PROFILE_FAILURE = "UPDATE_MY_PROFILE_FAILURE"

export const UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST = "UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST"
export const UPDATE_PROFILE_IMAGE_DEFAULT_SUCCESS = "UPDATE_PROFILE_IMAGE_DEFAULT_SUCCESS"
export const UPDATE_PROFILE_IMAGE_DEFAULT_FAILURE = "UPDATE_PROFILE_IMAGE_DEFAULT_FAILURE"

export const UPLOAD_PROFILE_IMAGE_REQUEST = "UPLOAD_PROFILE_IMAGE_REQUEST"
export const UPLOAD_PROFILE_IMAGE_SUCCESS = "UPLOAD_PROFILE_IMAGE_SUCCESS"
export const UPLOAD_PROFILE_IMAGE_FAILURE = "UPLOAD_PROFILE_IMAGE_FAILURE"

export const UPDATE_PROFILE_IMAGE_REQUEST = "UPDATE_PROFILE_IMAGE_REQUEST"
export const UPDATE_PROFILE_IMAGE_SUCCESS = "UPDATE_PROFILE_IMAGE_SUCCESS"
export const UPDATE_PROFILE_IMAGE_FAILURE = "UPDATE_PROFILE_IMAGE_FAILURE"

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REPORT_REQUEST = 'REPORT_REQUEST';
export const REPORT_SUCCESS = 'REPORT_SUCCESS';
export const REPORT_FAILURE = 'REPORT_FAILURE';

export const QUESTION_REQUEST = 'QUESTION_REQUEST';
export const QUESTION_SUCCESS = 'QUESTION_SUCCESS';
export const QUESTION_FAILURE = 'QUESTION_FAILURE';

export const NOTICE_REQUEST = 'NOTICE_REQUEST';
export const NOTICE_SUCCESS = 'NOTICE_SUCCESS';
export const NOTICE_FAILURE = 'NOTICE_FAILURE';

export const FREQUENCY_REQUEST = 'FREQUENCY_REQUEST';
export const FREQUENCY_SUCCESS = 'FREQUENCY_SUCCESS';
export const FREQUENCY_FAILURE = 'FREQUENCY_FAILURE';

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

        case CHECK_AGREEMENT_REQUEST:
            draft.checkAgreementLoading = true;
            draft.checkAgreementError = null;
            draft.checkAgreementDone = false;
            break;
        case CHECK_AGREEMENT_SUCCESS:
            draft.checkAgreementLoading = false;
            draft.checkAgreementDone = true;
            draft.agreement = action.data;
            break;
        case CHECK_AGREEMENT_FAILURE:
            draft.checkAgreementLoading = false;
            draft.checkAgreementError = action.error;
            break;

        case UPDATE_AGREEMENT_REQUEST:
            draft.updateAgreementLoading = true;
            draft.updateAgreementError = null;
            draft.updateAgreementDone = false;
            break;
        case UPDATE_AGREEMENT_SUCCESS:
            draft.updateAgreementLoading = false;
            draft.updateAgreementDone = true;
            draft.agreement = action.data;
            break;
        case UPDATE_AGREEMENT_FAILURE:
            draft.updateAgreementLoading = false;
            draft.updateAgreementError = action.error;
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
            draft.logInDone = false
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

        case GET_OTHER_USER_REQUEST:
            draft.getOtherUserLoading = true;
            draft.getOtherUserError = null;
            draft.getOtherUserDone = false;
            break;
        case GET_OTHER_USER_SUCCESS:
            draft.getOtherUserLoading = false;
            draft.getOtherUserDone = true;
            draft.otherUser = action.data;
            break;
        case GET_OTHER_USER_FAILURE:
            draft.getOtherUserLoading = false;
            draft.getOtherUserError = action.error;
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

        case UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST:
            draft.updateProfileImageDefaultLoading = true;
            draft.updateProfileImageDefaultError = null;
            draft.updateProfileImageDefaultDone = false;
            break;
        case UPDATE_PROFILE_IMAGE_DEFAULT_SUCCESS:
            draft.updateProfileImageDefaultLoading = false;
            draft.updateProfileImageDefaultDone = true;
            draft.otherProfile = action.data;
            break;
        case UPDATE_PROFILE_IMAGE_DEFAULT_FAILURE:
            draft.updateProfileImageDefaultLoading = false;
            draft.updateProfileImageDefaultError = action.error;
            break;

        case UPLOAD_PROFILE_IMAGE_REQUEST:
            draft.uploadProfileImageLoading = true;
            draft.uploadProfileImageError = null;
            draft.uploadProfileImageDone = false;
            break;
        case UPLOAD_PROFILE_IMAGE_SUCCESS:
            draft.uploadProfileImageLoading = false;
            draft.uploadProfileImageDone = true;
            draft.imagePath = action.data;
            break;
        case UPLOAD_PROFILE_IMAGE_FAILURE:
            draft.uploadProfileImageLoading = false;
            draft.uploadProfileImageError = action.error;
            break;

        case UPDATE_PROFILE_IMAGE_REQUEST:
            draft.updateProfileImageLoading = true;
            draft.updateProfileImageError = null;
            draft.updateProfileImageDone = false;
            break;
        case UPDATE_PROFILE_IMAGE_SUCCESS:
            draft.updateProfileImageLoading = false;
            draft.updateProfileImageDone = true;
            draft.otherProfile = action.data;
            break;
        case UPDATE_PROFILE_IMAGE_FAILURE:
            draft.updateProfileImageLoading = false;
            draft.updateProfileImageError = action.error;
            break;

        case FOLLOW_REQUEST:
            draft.followingLoading = true;
            draft.followingError = null;
            draft.followingDone = false;
            break;
        case FOLLOW_SUCCESS:
            draft.followingLoading = false;
            draft.user.Followings.push({ id: action.data.UserId });
            draft.followingDone = true;
            break;
        case FOLLOW_FAILURE:
            draft.followingLoading = false;
            draft.followingError = action.error;
            break;
        case UNFOLLOW_REQUEST:
            draft.unfollowingLoading = true;
            draft.unfollowingError = null;
            draft.unfollowingDone = false;
            break;
        case UNFOLLOW_SUCCESS:
            draft.unfollowingLoading = false;
            draft.user.Followings = draft.user.Followings.filter((v) => v.id !== action.data.UserId);
            draft.unfollowingDone = true;
            break;
        case UNFOLLOW_FAILURE:
            draft.unfollowingLoading = false;
            draft.unfollowingError = action.error;
            break;

        case REPORT_REQUEST:
            draft.reportLoading = true;
            draft.reportError = null;
            draft.reportDone = false;
            break;
        case REPORT_SUCCESS:
            draft.reportLoading = false;
            draft.reportDone = true;
            break;
        case REPORT_FAILURE:
            draft.reportLoading = false;
            draft.reportError = action.error;
            break;

        case QUESTION_REQUEST:
            draft.questionLoading = true;
            draft.questionError = null;
            draft.questionDone = false;
            break;
        case QUESTION_SUCCESS:
            draft.questionLoading = false;
            draft.questionDone = true;
            break;
        case QUESTION_FAILURE:
            draft.questionLoading = false;
            draft.questionError = action.error;
            break;

        case NOTICE_REQUEST:
            draft.noticeLoading = true;
            draft.noticeError = null;
            draft.noticeDone = false;
            break;
        case NOTICE_SUCCESS:
            draft.noticeLoading = false;
            draft.noticeDone = true;
            draft.noticeList = action.data;
            break;
        case NOTICE_FAILURE:
            draft.noticeLoading = false;
            draft.noticeError = action.error;
            break;

        case FREQUENCY_REQUEST:
            draft.frequencyLoading = true;
            draft.frequencyError = null;
            draft.frequencyDone = false;
            break;
        case FREQUENCY_SUCCESS:
            draft.frequencyLoading = false;
            draft.frequencyDone = true;
            draft.frequencyList = action.data;
            break;
        case FREQUENCY_FAILURE:
            draft.frequencyLoading = false;
            draft.frequencyError = action.error;
            break;

        default:
            break;
    }
});
