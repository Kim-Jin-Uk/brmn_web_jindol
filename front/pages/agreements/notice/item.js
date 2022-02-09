import React, {useCallback, useEffect, useState} from "react";
import Header from "../../../components/Header";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../../components/Button";
import styles from "../../../styles/agreements.module.scss"
import Router, {useRouter} from "next/router";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import Footer from "../../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"
import {message} from "antd";

const Notice = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {item} = router.query
    let notice = {title:"",contents:"",updatedAt:""}
    if (typeof item !== "undefined"){
        notice = JSON.parse(item)
    }
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone,getMyProfileError,logOutError} = useSelector((state) => state.user);
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
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_notice}>공지사항</div>
                <div className={styles.notice_item_title}>{notice.title}</div>
                <div className={styles.notice_item_date}>{notice.updatedAt.split("T")[0].replace(/-/gi,".")}</div>
                <pre className={styles.notice_item_content}>{notice.contents}</pre>
                <div onClick={() => Router.back()} className={styles.notice_back_btn}>
                    <div></div>
                    <div>목록으로 돌아가기</div>
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
                                                                        :"https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/profimg_default.svg"
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

export default Notice
