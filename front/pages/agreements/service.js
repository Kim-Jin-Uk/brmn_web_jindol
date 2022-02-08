import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import sideStyles from "../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import {createGlobalStyle} from "styled-components";
import styles from "../../styles/agreements.module.scss"
import Router from "next/router";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"
import {message} from "antd";

const Global = createGlobalStyle`
  body{
    background: #fafafa;
  }
`

const Service = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone,getMyProfileError,logOutError} = useSelector((state) => state.user);

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onClickIntro = () => {
        Router.push("/")
    }
    const onClickNotice = () => {
        Router.push("notice")
    }
    const onClickReport = () => {
        Router.push("report")
    }
    const onClickQuestion = () => {
        Router.push("question")
    }
    const onClickFrequency = () => {
        Router.push("frequency")
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
            <Global />
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>

            <div className={styles.service_wrapper}>
                <div className={styles.service_title}>고객센터</div>
                <div className={styles.service_content}>전화: 010-4918-3442</div>
                <div className={styles.service_content}>이메일:  official@brmnmusic.com</div>

                <div className={styles.service_btn_wrapper}>
                    {/*intro*/}
                    <div style={{cursor:"pointer"}} onClick={onClickIntro}>
                        <div className={`${styles.service_btn_icon} ${styles.service_btn_1}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>서비스 이용안내</div>
                            <div>신청 방법, 진행 순서를 안내합니다</div>
                        </div>
                    </div>
                    {/*notice*/}
                    <div style={{cursor:"pointer"}} onClick={onClickNotice}>
                        <div className={`${styles.service_btn_icon} ${styles.service_btn_2}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>공지사항</div>
                            <div>시스템 공지사항을 알려드립니다</div>
                        </div>
                    </div>
                    {/*report*/}
                    <div style={{cursor:"pointer"}} onClick={onClickReport}>
                        <div className={`${styles.service_btn_icon} ${styles.service_btn_3}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>오류신고</div>
                            <div>사이트에서 발견한 오류를 신고</div>
                        </div>
                    </div>
                    {/*question*/}
                    <div style={{cursor:"pointer"}} onClick={onClickQuestion}>
                        <div className={`${styles.service_btn_icon} ${styles.service_btn_4}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>고객 문의</div>
                            <div>서비스에 대해 직접 문의할 수 있습니다</div>
                        </div>
                    </div>
                    {/*frequency*/}
                    <div style={{cursor:"pointer"}} onClick={onClickFrequency}>
                        <div className={`${styles.service_btn_icon} ${styles.service_btn_5}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>자주 묻는 질문</div>
                            <div>사용자들의 질문 사항에 대한 답변</div>
                        </div>
                    </div>
                </div>
            </div>

            <>
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

                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={
                                                            user && user.email
                                                                ?`/profile/${user.email}`
                                                                :`/profile/1`
                                                        }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_4}></div>
                                                            <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_5}></div>
                                                            <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_6}></div>
                                                            <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                        </div>
                                                    </div>


                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div onClick={() => setOpenAble(true)} className={sideStyles.side_link_wrapper}>
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

                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                        </a></Link>
                                                    </div>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div onClick={() => setOpenAble(true)} className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>고객센터</a></Link>
                                                        </div>
                                                        <div className={sideStyles.side_sns_wrapper}>
                                                            <Link href={"https://www.instagram.com/brmn.music/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                            <Link href={"https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                            <Link href={"https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                            <Link href={"https://twitter.com/brmn_music"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
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
        </>
    )
}

export default Service
