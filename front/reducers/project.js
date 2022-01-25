import produce from 'immer';

const card = {
    id:"1",
    imgUrl:"https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/9dEO/image/_Xi6E6YOQ22VUzRkRtyy0_6Rvak.png",
    title:"사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 쿠쿠루 삥뽕",
    profImg:"https://bit.ly/2V1ipNj",
    nickname:"2층과3층사이"
}

export const initialState = {
    uploadProjectImageLoading: false,
    uploadProjectImageDone:false,
    uploadProjectImageError:null,

    uploadProjectLoading: false,
    uploadProjectDone:false,
    uploadProjectError:null,

    mainProjects:[
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
    ],

    projectImagePath:null,
    projectThumbImagePath:null,
}

export const UPLOAD_PROJECT_IMAGE_REQUEST = "UPLOAD_PROJECT_IMAGE_REQUEST"
export const UPLOAD_PROJECT_IMAGE_SUCCESS = "UPLOAD_PROJECT_IMAGE_SUCCESS"
export const UPLOAD_PROJECT_IMAGE_FAILURE = "UPLOAD_PROJECT_IMAGE_FAILURE"

export const UPLOAD_PROJECT_THUMB_IMAGE_REQUEST = "UPLOAD_PROJECT_THUMB_IMAGE_REQUEST"
export const UPLOAD_PROJECT_THUMB_IMAGE_SUCCESS = "UPLOAD_PROJECT_THUMB_IMAGE_SUCCESS"
export const UPLOAD_PROJECT_THUMB_IMAGE_FAILURE = "UPLOAD_PROJECT_THUMB_IMAGE_FAILURE"

export const UPLOAD_PROJECT_REQUEST = "UPLOAD_PROJECT_REQUEST"
export const UPLOAD_PROJECT_SUCCESS = "UPLOAD_PROJECT_SUCCESS"
export const UPLOAD_PROJECT_FAILURE = "UPLOAD_PROJECT_FAILURE"

export const ADD_DONE_PROJECT_IMAGE = "ADD_DONE_PROJECT_IMAGE"

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case ADD_DONE_PROJECT_IMAGE:
            console.log("ADD_DONE")
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageDone = true;
            draft.projectImagePath = null;
            break;

        case UPLOAD_PROJECT_IMAGE_REQUEST:
            draft.uploadProjectImageLoading = true;
            draft.uploadProjectImageError = null;
            draft.uploadProjectImageDone = false;
            break;
        case UPLOAD_PROJECT_IMAGE_SUCCESS:
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageDone = true;
            draft.projectImagePath = action.data;
            break;
        case UPLOAD_PROJECT_IMAGE_FAILURE:
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageError = action.error;
            break;

        case UPLOAD_PROJECT_THUMB_IMAGE_REQUEST:
            draft.uploadProjectImageLoading = true;
            draft.uploadProjectImageError = null;
            draft.uploadProjectImageDone = false;
            break;
        case UPLOAD_PROJECT_THUMB_IMAGE_SUCCESS:
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageDone = true;
            draft.projectThumbImagePath = action.data;
            break;
        case UPLOAD_PROJECT_THUMB_IMAGE_FAILURE:
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageError = action.error;
            break;

        case UPLOAD_PROJECT_REQUEST:
            draft.uploadProjectLoading = true;
            draft.uploadProjectError = null;
            draft.uploadProjectDone = false;
            break;
        case UPLOAD_PROJECT_SUCCESS:
            draft.uploadProjectLoading = false;
            draft.uploadProjectDone = true;
            break;
        case UPLOAD_PROJECT_FAILURE:
            draft.uploadProjectLoading = false;
            draft.uploadProjectError = action.error;
            break;

        default:
            break;
    }
});
