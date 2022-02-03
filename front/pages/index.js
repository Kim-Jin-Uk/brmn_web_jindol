import React, {useCallback, useEffect, useState} from "react";
import Link from 'next/link';
import Header from "../components/Header";
import styles from "../styles/MainIntro.module.scss";
import sideStyles from "../styles/Project.module.scss";
import Button from "../components/Button";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../reducers/user";
import ProfileThumbnail from "../components/ProfileThumbnail";

import profile_image_default from "/images/default/profimg_default.svg"
import Footer from "../components/Footer";
import {message} from "antd";

const Home = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone,getMyProfileError,logOutError} = useSelector((state) => state.user);

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onClickClient = () => {
        Router.push("/service/client").then((() =>window.scrollTo(0,0) ))
    }

    const onClickMaker = () => {
        Router.push("/service/maker").then((() =>window.scrollTo(0,0) ))
    }

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user !== null){
            dispatch({
                type:GET_MY_PROFILE_REQUEST,
                data:user.email
            })
        }
    },[user])

    useEffect(() => {
        if (getMyProfileError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[getMyProfileError])

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    useEffect(() => {
        if (logOutError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[logOutError])

    return(
        <>
            <Header param={"guide"} openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}/>
            <div style={{minWidth:"320px"}}>
                {/*main title*/}
                <div className={styles.main_title}></div>
                {/*intro top btn*/}
                <div className={styles.main_contents_wrapper}>
                    <div className={styles.content_1} onClick={() => onClickClient()}>
                        <a>
                            <div className={styles.content_title}>메이커 채용하기</div>
                            <div className={`${styles.content_img} ${styles.img_1}`}></div>
                            <div className={styles.content_text}>
                                당신의 콘텐츠에
                                <br/>
                                가장 적합한
                                <br/>
                                메이커를 만나보세요
                            </div>
                        </a>
                    </div>

                    <div className={styles.content_2} onClick={() => onClickMaker()}>
                        <a>
                            <div className={styles.content_title}>메이커 파트너스</div>
                            <div className={`${styles.content_img} ${styles.img_2}`}></div>
                            <div className={styles.content_text}>
                                당신의 재능을
                                <br/>
                                꽃피울 수 있는
                                <br/>
                                콘텐츠를 시작하세요
                            </div>
                        </a>
                    </div>

                    <div className={styles.content_3}>
                        <Link href={"https://melon-railway-ee2.notion.site/brmn-db4220eec1f44a5db4239e09dad53614"}
                              target="_blank" rel="noreferrer noopener"><a>
                            <div className={styles.content_title}>회사 소개</div>
                            <div className={`${styles.content_img} ${styles.img_3}`}></div>
                            <div className={styles.content_text}>
                                브레멘과 함께
                                <br/>
                                다가올 콘텐츠 제작의
                                <br/>
                                미래를 만나보세요
                            </div>
                        </a></Link>
                    </div>
                </div>
                {/*intro bottom btn*/}
                <Link href={"https://forms.gle/ccVtiCpFjYtmWs1y8"} target="_blank" rel="noreferrer noopener"><a>
                    <div className={styles.match_btn}>
                        <div className={styles.btn_text_1}></div>
                        <div className={styles.btn_text_2}></div>
                    </div>
                </a></Link>
                {/*bottom area*/}
                <div className={styles.bmcc}></div>

                <iframe
                    width="560" height="315" src="https://www.youtube.com/embed/MDB_iLkmaP4"
                    title="YouTube video player" frameBorder="0px"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen

                    className={styles.youtube}
                ></iframe>
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
            <Footer></Footer>
        </>
    )
}

export default Home
