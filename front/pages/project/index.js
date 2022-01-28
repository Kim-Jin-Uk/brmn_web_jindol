import React, {useCallback, useEffect, useState} from 'react'
import Head from 'next/head'
import Header from "../../components/Header"
import styles from '../../styles/Project.module.scss'
import Button from "../../components/Button";
import Link from "next/link"
import Footer from "../../components/Footer";
import profile_image_default from "/images/default/profimg_default.svg"
import {Modal, Select} from 'antd';
import {createGlobalStyle} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../reducers/user";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import Router from "next/router";
import sideStyles from "../../styles/Project.module.scss";
import {useInView} from "react-intersection-observer";
import {
    CHANGE_CHECKER,
    LOAD_ALL_PROJECT_REQUEST, LOAD_DESIGN_PROJECT_REQUEST,
    LOAD_EDIT_PROJECT_REQUEST, LOAD_ETC_PROJECT_REQUEST, LOAD_PLAN_PROJECT_REQUEST, LOAD_SOUND_PROJECT_REQUEST,
    LOAD_VOCAL_PROJECT_REQUEST
} from "../../reducers/project";

const { Option } = Select;
const Global = createGlobalStyle`
  body{
    background: #fafafa;
  }
  
  .ant-select-selector{
    border: 1px solid #E8E8E8 !important;
    box-shadow: none !important;
    width: 118px !important;
    height: 40px !important;
  }
  
  .ant-select-arrow{
    margin-top: -5px !important;
  }
  
  .ant-select-selection-item{
    margin-top: 5px !important;
  }

  @media (min-width: 1024px){
    .ant-modal{
      width: 100% !important;
      margin: 0;
      padding: 0;
      max-width: 100%;
      height: 100%;
      top: 0;
    }
    
    .ant-modal-content{
      width: 100%;
      height: 100%;
    }
  }
  
  
`;

function MainCard(props) {
    return(
        <>
            <div className={styles.card_group}>
                <Link href={`/project/${props.card.id}`}><a>
                    <button className={styles.card_button}>
                    <div className={styles.card_main}>
                        <img src={props.card.imgUrl} className={styles.card_main_img}></img>
                        <div className={styles.card_main_background}>
                            <div className={styles.card_main_background_title}>{props.card.title}</div>
                        </div>
                    </div>
                    <div className={styles.card_meta}>
                        <div className={styles.card_meta_title}>{props.card.title}</div>
                        <div>
                            <img src={props.card.profImg} className={styles.card_meta_img}></img>
                            <div className={styles.card_meta_nickname}>{props.card.nickname}</div>
                        </div>
                    </div>
                </button>
                </a></Link>
            </div>
        </>
    )
}

const Index = () =>{
    const dispatch = useDispatch();
    const {user, logInDone, profile} = useSelector((state) => state.user);
    const [openAble,setOpenAble] = useState(true)
    const [navActive,setNavActive] = useState({
        "n1": true,
        "n2": false,
        "n3": false,
        "n4": false,
        "n5": false,
        "n6": false,
        "n7": false,
    })
    const [active, setActive] = useState("n1")
    useEffect(() => {
        if (navActive['n1']){
            setActive('n1')
        }
        else if (navActive['n2']){
            setActive('n2')
        }
        else if (navActive['n3']){
            setActive('n3')
        }
        else if (navActive['n4']){
            setActive('n4')
        }
        else if (navActive['n5']){
            setActive('n5')
        }
        else if (navActive['n6']){
            setActive('n6')
        }
        else if (navActive['n7']){
            setActive('n7')
        }
    },[navActive])
    const {hasMoreProject,
        loadAllProjects,loadAllProjectLoading,
        loadVocalProjects,loadVocalProjectLoading,
        loadEditProjects,loadEditProjectLoading,
        loadSoundProjects,loadSoundProjectLoading,
        loadPlanProjects,loadPlanProjectLoading,
        loadDesignProjects,loadDesignProjectLoading,
        loadEtcProjects,loadEtcProjectLoading,
    } = useSelector((state) => state.project);
    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const [ref3, inView3] = useInView();
    const [ref4, inView4] = useInView();
    const [ref5, inView5] = useInView();
    const [ref6, inView6] = useInView();
    const [ref7, inView7] = useInView();
    const [cardList,setCardList] = useState([])


    const onCLickNav = useCallback((name) => {
        const field = {}
        for ( let i in navActive ){
            if (i === name){
                field[i] = true
            }else {
                field[i] = false
            }

        }
        setNavActive({...navActive, ...field})
    },[navActive])

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user !== null){
            if (user === "not agreement"){
                Router.replace("/signin/agreements")
            }else {
                dispatch({
                    type:GET_MY_PROFILE_REQUEST,
                    data:user.email
                })
            }
        }
    },[user])

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    useEffect(() => {
        dispatch({type:CHANGE_CHECKER})
    },[active])

    useEffect(() => {
        if (active === 'n1'){
            if (inView1 && hasMoreProject && !loadAllProjectLoading && loadAllProjects) {
                const lastId = loadAllProjects[loadAllProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_ALL_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView1, hasMoreProject, loadAllProjectLoading, loadAllProjects, active]);
    useEffect(() => {
        if (active === 'n2'){
            if (inView2 && hasMoreProject && !loadVocalProjectLoading && loadVocalProjects) {
                const lastId = loadVocalProjects[loadVocalProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_VOCAL_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView2, hasMoreProject, loadVocalProjectLoading, loadVocalProjects, active]);
    useEffect(() => {
        if (active === 'n3'){
            if (inView3 && hasMoreProject && !loadEditProjectLoading && loadEditProjects) {
                const lastId = loadEditProjects[loadEditProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_EDIT_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView3, hasMoreProject, loadEditProjectLoading, loadEditProjects, active]);
    useEffect(() => {
        if (active === 'n4'){
            if (inView4 && hasMoreProject && !loadSoundProjectLoading && loadSoundProjects) {
                const lastId = loadSoundProjects[loadSoundProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_SOUND_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView4, hasMoreProject, loadSoundProjectLoading, loadSoundProjects, active]);
    useEffect(() => {
        if (active === 'n5'){
            if (inView5 && hasMoreProject && !loadPlanProjectLoading && loadPlanProjects) {
                const lastId = loadPlanProjects[loadPlanProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_PLAN_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView5, hasMoreProject, loadPlanProjectLoading, loadPlanProjects, active]);
    useEffect(() => {
        if (active === 'n6'){
            if (inView6 && hasMoreProject && !loadDesignProjectLoading && loadDesignProjects) {
                const lastId = loadDesignProjects[loadDesignProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_DESIGN_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView6, hasMoreProject, loadDesignProjectLoading, loadDesignProjects, active]);
    useEffect(() => {
        if (active === 'n7'){
            if (inView7 && hasMoreProject && !loadEtcProjectLoading && loadEtcProjects) {
                const lastId = loadEtcProjects[loadEtcProjects.length - 1]?.id;
                dispatch({
                    type: LOAD_ETC_PROJECT_REQUEST,
                    data:{
                        checker:active,
                        lastId:lastId
                    },
                });
            }
        }
    }, [inView7, hasMoreProject, loadEtcProjectLoading, loadEtcProjects, active]);

    useEffect(() => {
        if (active === 'n1'){
            if (loadAllProjects){
                setCardList(loadAllProjects)
            }
        }else if (active === 'n2'){
            if (loadVocalProjects){
                setCardList(loadVocalProjects)
            }
        }else if (active === 'n3'){
            if (loadEditProjects){
                setCardList(loadEditProjects)
            }
        }else if (active === 'n4'){
            if (loadSoundProjects){
                setCardList(loadSoundProjects)
            }
        }else if (active === 'n5'){
            if (loadPlanProjects){
                setCardList(loadPlanProjects)
            }
        }else if (active === 'n6'){
            if (loadDesignProjects){
                setCardList(loadDesignProjects)
            }
        }else if (active === 'n7'){
            if (loadEtcProjects){
                setCardList(loadEtcProjects)
            }
        }
    },[loadAllProjects,loadVocalProjects,loadEditProjects,loadSoundProjects,
        loadPlanProjects,loadDesignProjects,loadEtcProjects,active])

    return(
        <div>
            <Global />
            <Head>
                <title>brmn music | project</title>
            </Head>
            {

                <>
                    <div>
                        <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}/>

                        <div className={styles.body_color}>
                            <Select defaultValue="n1" className={styles.nav_mobile} value={active}>
                                <Option value="n1">전체</Option>
                                <Option value="n2">보컬</Option>
                                <Option value="n3">촬영편집</Option>
                                <Option value="n4">사운드</Option>
                                <Option value="n5">기획</Option>
                                <Option value="n6">디자인</Option>
                                <Option value="n7">기타</Option>
                            </Select>
                            <div className={styles.nav_desktop_wrapper}>
                                {
                                    navActive['n1']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n1')}}>
                                                <div>🌏  전체</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n1')}}>
                                                <div>🌏  전체</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n2']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n2')}}>
                                                <div>🎙  보컬</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n2')}}>
                                                <div>🎙  보컬</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n3']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n3')}}>
                                                <div>🎥  촬영편집</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n3')}}>
                                                <div>🎥  촬영편집</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n4']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n4')}}>
                                                <div>🎛  사운드</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n4')}}>
                                                <div>🎛  사운드</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n5']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n5')}}>
                                                <div>✏  기획</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n5')}}>
                                                <div>✏  기획</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n6']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n6')}}>
                                                <div>🎨  디자인</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n6')}}>
                                                <div>🎨  디자인</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n7']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n7')}}>
                                                <div>👀  기타</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n7')}}>
                                                <div>👀  기타</div>
                                            </button>
                                        )
                                }

                            </div>
                            <div className={styles.card_wrapper}>
                                {cardList.map((card, index) => (
                                    <>
                                        <MainCard card={card}></MainCard>
                                    </>
                                ))}
                                <div ref={hasMoreProject && !loadAllProjectLoading ? ref1 : undefined} />
                                <div ref={hasMoreProject && !loadVocalProjectLoading ? ref2 : undefined} />
                                <div ref={hasMoreProject && !loadEditProjectLoading ? ref3 : undefined} />
                                <div ref={hasMoreProject && !loadSoundProjectLoading ? ref4 : undefined} />
                                <div ref={hasMoreProject && !loadPlanProjectLoading ? ref5 : undefined} />
                                <div ref={hasMoreProject && !loadDesignProjectLoading ? ref6 : undefined} />
                                <div ref={hasMoreProject && !loadEtcProjectLoading ? ref7 : undefined} />
                            </div>

                        </div>
                    </div>

                    {
                        openAble
                            ?(
                                <></>
                            )
                            :(
                                <div className={sideStyles.side_menu_wrapper}>
                                    <div className={sideStyles.side_right_wrapper}></div>

                                    {
                                        logInDone
                                            ?(
                                                <>
                                                    <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>

                                                        <div className={sideStyles.side_login_top}>
                                                            <div className={sideStyles.side_login_top_img}>
                                                                <Link href={
                                                                    user && user.email
                                                                        ?`/profile/${user.email}`
                                                                        :`/profile/1`
                                                                }><a>
                                                                    <ProfileThumbnail circle size={40} image={
                                                                        profile && profile.profile_img
                                                                            ?profile.profile_img
                                                                            :profile_image_default
                                                                    }></ProfileThumbnail>
                                                                </a></Link>
                                                            </div>
                                                            <div className={sideStyles.side_login_top_info}>
                                                                {
                                                                    profile && profile.nickname
                                                                        ? <div className={sideStyles.side_login_top_nickname}>{profile.nickname}</div>
                                                                        : <div className={sideStyles.side_login_top_nickname}>{user.email}</div>
                                                                }
                                                                <div className={sideStyles.side_login_top_id}>{user.email}</div>
                                                            </div>
                                                            <button className={sideStyles.side_login_top_close} onClick={onClickClose}></button>
                                                        </div>

                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                        </a></Link>
                                                        <Link href={
                                                            user && user.email
                                                                ?`/profile/${user.email}`
                                                                :`/profile/1`
                                                        }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_4}></div>
                                                            <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                        </a></Link>
                                                        <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_5}></div>
                                                            <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                        </a></Link>
                                                        <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_6}></div>
                                                            <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                        </div>

                                                        <div
                                                            style={{
                                                                position:"absolute",
                                                                bottom: "0px",
                                                                width:"100%",
                                                                minWidth:"320px"
                                                            }}>
                                                            <div className={sideStyles.side_link_wrapper}>
                                                                <Link href={"/agreements/service"}><a>고객센터</a></Link>
                                                            </div>
                                                            <div className={sideStyles.side_sns_wrapper}>
                                                                <Link href="https://www.instagram.com/brmn.music/" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                                <Link href="https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                                <Link href="https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312/" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                                <Link href="https://twitter.com/brmn_music" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                            </div>
                                                            <div className={sideStyles.side_bottom_content}>
                                                                Copyright brmn all right reserved
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            :(
                                                <>
                                                    <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>
                                                        <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}  user={user} profile={profile}/>
                                                        <div className={sideStyles.side_title} style={{minWidth:"320px"}}>
                                                            회원가입하고 다양한 메이커들과
                                                            <br/>
                                                            프로젝트를 시작하세요!
                                                        </div>
                                                        <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                            <div style={{display:"inline-block"}}><Link href="/signin/login"><a><Button className={sideStyles.side_login}>로그인</Button></a></Link></div>
                                                            <div style={{display:"inline-block", marginLeft:"12px"}}><Link href="/signin/signup"><a><Button className={sideStyles.side_signup}>회원가입</Button></a></Link></div>
                                                        </div>

                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                        </a></Link>

                                                        <div
                                                            style={{
                                                                position:"absolute",
                                                                bottom: "0px",
                                                                width:"100%",
                                                                minWidth:"320px"
                                                            }}>
                                                            <div className={sideStyles.side_link_wrapper}>
                                                                <Link href={"/agreements/service"}><a>고객센터</a></Link>
                                                            </div>
                                                            <div className={sideStyles.side_sns_wrapper}>
                                                                <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                                <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                                <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                                <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                            </div>
                                                            <div className={sideStyles.side_bottom_content}>
                                                                Copyright brmn all right reserved
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    }


                                </div>
                            )
                    }

                </>

            }
            <Footer></Footer>
        </div>
    )
}

export default Index
