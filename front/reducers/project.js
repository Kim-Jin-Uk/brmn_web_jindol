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

    loadAllProjectLoading: false,
    loadAllProjectDone:false,
    loadAllProjectError:null,

    loadVocalProjectLoading: false,
    loadVocalProjectDone:false,
    loadVocalProjectError:null,

    loadEditProjectLoading: false,
    loadEditProjectDone:false,
    loadEditProjectError:null,

    loadSoundProjectLoading: false,
    loadSoundProjectDone:false,
    loadSoundProjectError:null,

    loadPlanProjectLoading: false,
    loadPlanProjectDone:false,
    loadPlanProjectError:null,

    loadDesignProjectLoading: false,
    loadDesignProjectDone:false,
    loadDesignProjectError:null,

    loadEtcProjectLoading: false,
    loadEtcProjectDone:false,
    loadEtcProjectError:null,

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

    loadAllProjects:[],
    loadVocalProjects:[],
    loadEditProjects:[],
    loadSoundProjects:[],
    loadPlanProjects:[],
    loadDesignProjects:[],
    loadEtcProjects:[],
    loadUserProjects:[],
    loadProjectDetail:null,

    projectImagePath:null,
    projectThumbImagePath:null,

    hasMoreProject: true,

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

export const LOAD_ALL_PROJECT_REQUEST = "LOAD_ALL_PROJECT_REQUEST"
export const LOAD_ALL_PROJECT_SUCCESS = "LOAD_ALL_PROJECT_SUCCESS"
export const LOAD_ALL_PROJECT_FAILURE = "LOAD_ALL_PROJECT_FAILURE"

export const LOAD_VOCAL_PROJECT_REQUEST = "LOAD_VOCAL_PROJECT_REQUEST"
export const LOAD_VOCAL_PROJECT_SUCCESS = "LOAD_VOCAL_PROJECT_SUCCESS"
export const LOAD_VOCAL_PROJECT_FAILURE = "LOAD_VOCAL_PROJECT_FAILURE"

export const LOAD_EDIT_PROJECT_REQUEST = "LOAD_EDIT_PROJECT_REQUEST"
export const LOAD_EDIT_PROJECT_SUCCESS = "LOAD_EDIT_PROJECT_SUCCESS"
export const LOAD_EDIT_PROJECT_FAILURE = "LOAD_EDIT_PROJECT_FAILURE"

export const LOAD_SOUND_PROJECT_REQUEST = "LOAD_SOUND_PROJECT_REQUEST"
export const LOAD_SOUND_PROJECT_SUCCESS = "LOAD_SOUND_PROJECT_SUCCESS"
export const LOAD_SOUND_PROJECT_FAILURE = "LOAD_SOUND_PROJECT_FAILURE"

export const LOAD_PLAN_PROJECT_REQUEST = "LOAD_PLAN_PROJECT_REQUEST"
export const LOAD_PLAN_PROJECT_SUCCESS = "LOAD_PLAN_PROJECT_SUCCESS"
export const LOAD_PLAN_PROJECT_FAILURE = "LOAD_PLAN_PROJECT_FAILURE"

export const LOAD_DESIGN_PROJECT_REQUEST = "LOAD_DESIGN_PROJECT_REQUEST"
export const LOAD_DESIGN_PROJECT_SUCCESS = "LOAD_DESIGN_PROJECT_SUCCESS"
export const LOAD_DESIGN_PROJECT_FAILURE = "LOAD_DESIGN_PROJECT_FAILURE"

export const LOAD_ETC_PROJECT_REQUEST = "LOAD_ETC_PROJECT_REQUEST"
export const LOAD_ETC_PROJECT_SUCCESS = "LOAD_ETC_PROJECT_SUCCESS"
export const LOAD_ETC_PROJECT_FAILURE = "LOAD_ETC_PROJECT_FAILURE"

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

export const CHANGE_CHECKER = "CHANGE_CHECKER"

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case CHANGE_CHECKER:
            draft.hasMoreProject = true
            draft.loadProjectLoading = false
            break;

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
            draft.loadUserProjects = draft.loadUserProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            draft.deleteProjectDone = false;
            break;
        case LOAD_PROJECT_FAILURE:
            draft.loadProjectLoading = false;
            draft.loadProjectError = action.error;
            break;

        case LOAD_ALL_PROJECT_REQUEST:
            draft.loadAllProjectLoading = true;
            draft.loadAllProjectError = null;
            draft.loadAllProjectDone = false;
            break;
        case LOAD_ALL_PROJECT_SUCCESS:
            draft.loadAllProjectLoading = false;
            draft.loadAllProjectDone = true;
            draft.loadAllProjects = draft.loadAllProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_ALL_PROJECT_FAILURE:
            draft.loadAllProjectLoading = false;
            draft.loadAllProjectError = action.error;
            break;

        case LOAD_VOCAL_PROJECT_REQUEST:
            draft.loadVocalProjectLoading = true;
            draft.loadVocalProjectError = null;
            draft.loadVocalProjectDone = false;
            break;
        case LOAD_VOCAL_PROJECT_SUCCESS:
            draft.loadVocalProjectLoading = false;
            draft.loadVocalProjectDone = true;
            draft.loadVocalProjects = draft.loadVocalProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_VOCAL_PROJECT_FAILURE:
            draft.loadVocalProjectLoading = false;
            draft.loadVocalProjectError = action.error;
            break;

        case LOAD_EDIT_PROJECT_REQUEST:
            draft.loadEditProjectLoading = true;
            draft.loadEditProjectError = null;
            draft.loadEditProjectDone = false;
            break;
        case LOAD_EDIT_PROJECT_SUCCESS:
            draft.loadEditProjectLoading = false;
            draft.loadEditProjectDone = true;
            draft.loadEditProjects = draft.loadEditProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_EDIT_PROJECT_FAILURE:
            draft.loadEditProjectLoading = false;
            draft.loadEditProjectError = action.error;
            break;

        case LOAD_SOUND_PROJECT_REQUEST:
            draft.loadSoundProjectLoading = true;
            draft.loadSoundProjectError = null;
            draft.loadSoundProjectDone = false;
            break;
        case LOAD_SOUND_PROJECT_SUCCESS:
            draft.loadSoundProjectLoading = false;
            draft.loadSoundProjectDone = true;
            draft.loadSoundProjects = draft.loadSoundProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_SOUND_PROJECT_FAILURE:
            draft.loadSoundProjectLoading = false;
            draft.loadSoundProjectError = action.error;
            break;

        case LOAD_PLAN_PROJECT_REQUEST:
            draft.loadPlanProjectLoading = true;
            draft.loadPlanProjectError = null;
            draft.loadPlanProjectDone = false;
            break;
        case LOAD_PLAN_PROJECT_SUCCESS:
            draft.loadPlanProjectLoading = false;
            draft.loadPlanProjectDone = true;
            draft.loadPlanProjects = draft.loadPlanProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_PLAN_PROJECT_FAILURE:
            draft.loadPlanProjectLoading = false;
            draft.loadPlanProjectError = action.error;
            break;

        case LOAD_DESIGN_PROJECT_REQUEST:
            draft.loadDesignProjectLoading = true;
            draft.loadDesignProjectError = null;
            draft.loadDesignProjectDone = false;
            break;
        case LOAD_DESIGN_PROJECT_SUCCESS:
            draft.loadDesignProjectLoading = false;
            draft.loadDesignProjectDone = true;
            draft.loadDesignProjects = draft.loadDesignProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_DESIGN_PROJECT_FAILURE:
            draft.loadDesignProjectLoading = false;
            draft.loadDesignProjectError = action.error;
            break;

        case LOAD_ETC_PROJECT_REQUEST:
            draft.loadEtcProjectLoading = true;
            draft.loadEtcProjectError = null;
            draft.loadEtcProjectDone = false;
            break;
        case LOAD_ETC_PROJECT_SUCCESS:
            draft.loadEtcProjectLoading = false;
            draft.loadEtcProjectDone = true;
            draft.loadEtcProjects = draft.loadEtcProjects.concat(action.data);
            draft.hasMoreProject = action.data.length === 50;
            break;
        case LOAD_ETC_PROJECT_FAILURE:
            draft.loadEtcProjectLoading = false;
            draft.loadEtcProjectError = action.error;
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
            draft.loadUserProjects = [];
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
            draft.loadUserProjects = action.data;
            break;
        case UPDATE_PROJECT_FAILURE:
            draft.updateProjectLoading = false;
            draft.updateProjectError = action.error;
            break;

        default:
            break;
    }
});
