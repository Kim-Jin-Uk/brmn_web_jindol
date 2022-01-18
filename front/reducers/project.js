import produce from 'immer';

const card = {
    id:"1",
    imgUrl:"https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/9dEO/image/_Xi6E6YOQ22VUzRkRtyy0_6Rvak.png",
    title:"사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 쿠쿠루 삥뽕",
    profImg:"https://bit.ly/2V1ipNj",
    nickname:"2층과3층사이"
}

export const initialState = {
    mainProjects:[
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
        card,card,card,card,card,card,card,card,card,card,
    ]
};

initialState.mainProjects = initialState.mainProjects.concat();

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {

        default:
            break;
    }
});
