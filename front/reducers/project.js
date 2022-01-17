import produce from 'immer';

export const initialState = {
    mainProjects:[]
};

initialState.mainProjects = initialState.mainProjects.concat();

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {

        default:
            break;
    }
});
