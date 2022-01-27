import produce from 'immer';

export const initialState = {
    uploadProjectImageLoading: false,
    uploadProjectImageDone:false,
    uploadProjectImageError:null,

    uploadProjectLoading: false,
    uploadProjectDone:false,
    uploadProjectError:null,

    loadProjectLoading: false,
    loadProjectDone:false,
    loadProjectError:null,

    loadProjectDetailLoading: false,
    loadProjectDetailDone:false,
    loadProjectDetailError:null,

    addViewCountLoading: false,
    addViewCountDone:false,
    addViewCountError:null,

    deleteProjectLoading: false,
    deleteProjectDone:false,
    deleteProjectError:null,

    updateProjectLoading: false,
    updateProjectDone:false,
    updateProjectError:null,

    loadProjects:[],
    loadProjectDetail:null,

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

export const LOAD_PROJECT_REQUEST = "LOAD_PROJECT_REQUEST"
export const LOAD_PROJECT_SUCCESS = "LOAD_PROJECT_SUCCESS"
export const LOAD_PROJECT_FAILURE = "LOAD_PROJECT_FAILURE"

export const LOAD_PROJECT_DETAIL_REQUEST = "LOAD_PROJECT_DETAIL_REQUEST"
export const LOAD_PROJECT_DETAIL_SUCCESS = "LOAD_PROJECT_DETAIL_SUCCESS"
export const LOAD_PROJECT_DETAIL_FAILURE = "LOAD_PROJECT_DETAIL_FAILURE"

export const ADD_VIEW_COUNT_REQUEST = "ADD_VIEW_COUNT_REQUEST"
export const ADD_VIEW_COUNT_SUCCESS = "ADD_VIEW_COUNT_SUCCESS"
export const ADD_VIEW_COUNT_FAILURE = "ADD_VIEW_COUNT_FAILURE"

export const DELETE_PROJECT_REQUEST = "DELETE_PROJECT_REQUEST"
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS"
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE"

export const UPDATE_PROJECT_REQUEST = "UPDATE_PROJECT_REQUEST"
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS"
export const UPDATE_PROJECT_FAILURE = "UPDATE_PROJECT_FAILURE"

export const ADD_DONE_PROJECT_IMAGE = "ADD_DONE_PROJECT_IMAGE"

export const UPLOAD_PROJECT_DONE = "UPLOAD_PROJECT_DONE"

export const UPDATE_PROJECT_DONE = "UPDATE_PROJECT_DONE"

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case ADD_DONE_PROJECT_IMAGE:
            draft.uploadProjectImageLoading = false;
            draft.uploadProjectImageDone = true;
            draft.projectImagePath = null;
            break;

        case UPLOAD_PROJECT_DONE:
            draft.uploadProjectLoading = false;
            draft.uploadProjectError = null;
            draft.uploadProjectDone = false;
            break;

        case UPDATE_PROJECT_DONE:
            draft.updateProjectLoading = false;
            draft.updateProjectError = null;
            draft.updateProjectDone = false;
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

        case LOAD_PROJECT_REQUEST:
            draft.loadProjectLoading = true;
            draft.loadProjectError = null;
            draft.loadProjectDone = false;
            break;
        case LOAD_PROJECT_SUCCESS:
            draft.loadProjectLoading = false;
            draft.loadProjectDone = true;
            draft.loadProjects = action.data;
            break;
        case LOAD_PROJECT_FAILURE:
            draft.loadProjectLoading = false;
            draft.loadProjectError = action.error;
            break;

        case LOAD_PROJECT_DETAIL_REQUEST:
            draft.loadProjectDetailLoading = true;
            draft.loadProjectDetailError = null;
            draft.loadProjectDetailDone = false;
            break;
        case LOAD_PROJECT_DETAIL_SUCCESS:
            draft.loadProjectDetailLoading = false;
            draft.loadProjectDetailDone = true;
            draft.loadProjectDetail = action.data;
            break;
        case LOAD_PROJECT_DETAIL_FAILURE:
            draft.loadProjectDetailLoading = false;
            draft.loadProjectDetailError = action.error;
            break;

        case ADD_VIEW_COUNT_REQUEST:
            draft.addViewCountLoading = true;
            draft.addViewCountError = null;
            draft.addViewCountDone = false;
            break;
        case ADD_VIEW_COUNT_SUCCESS:
            draft.addViewCountLoading = false;
            draft.addViewCountDone = true;
            break;
        case ADD_VIEW_COUNT_FAILURE:
            draft.addViewCountLoading = false;
            draft.addViewCountError = action.error;
            break;

        case DELETE_PROJECT_REQUEST:
            draft.deleteProjectLoading = true;
            draft.deleteProjectError = null;
            draft.deleteProjectDone = false;
            break;
        case DELETE_PROJECT_SUCCESS:
            draft.deleteProjectLoading = false;
            draft.deleteProjectDone = true;
            break;
        case DELETE_PROJECT_FAILURE:
            draft.deleteProjectLoading = false;
            draft.deleteProjectError = action.error;
            break;

        case UPDATE_PROJECT_REQUEST:
            draft.updateProjectLoading = true;
            draft.updateProjectError = null;
            draft.updateProjectDone = false;
            break;
        case UPDATE_PROJECT_SUCCESS:
            draft.updateProjectLoading = false;
            draft.updateProjectDone = true;
            draft.loadProjects = action.data;
            break;
        case UPDATE_PROJECT_FAILURE:
            draft.updateProjectLoading = false;
            draft.updateProjectError = action.error;
            break;

        default:
            break;
    }
});
