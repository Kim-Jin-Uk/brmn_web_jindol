import React, {useCallback, useState} from "react";
import Header from "../../components/Header";
import sideStyles from "../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import {createGlobalStyle} from "styled-components";
import styles from "../../styles/agreements.module.scss"
import Router from "next/router";

const Global = createGlobalStyle`
  body{
    background: #fafafa;
  }
`

const Service = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onClickIntro = () => {
        Router.push("/")
    }
    const onClickNotice = () => {
        Router.replace("notice")
    }
    const onClickReport = () => {
        Router.replace("report")
    }
    const onClickQuestion = () => {
        Router.replace("question")
    }
    const onClickFrequency = () => {
        Router.replace("frequency")
    }

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
                    <div>
                        <div onClick={onClickIntro} className={`${styles.service_btn_icon} ${styles.service_btn_1}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>서비스 이용안내</div>
                            <div>신청 방법, 진행 순서를 안내합니다</div>
                        </div>
                    </div>
                    {/*notice*/}
                    <div>
                        <div onClick={onClickNotice} className={`${styles.service_btn_icon} ${styles.service_btn_2}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>공지사항</div>
                            <div>시스템 공지사항을 알려드립니다</div>
                        </div>
                    </div>
                    {/*report*/}
                    <div>
                        <div onClick={onClickReport} className={`${styles.service_btn_icon} ${styles.service_btn_3}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>오류신고</div>
                            <div>사이트에서 발견한 오류를 신고</div>
                        </div>
                    </div>
                    {/*question*/}
                    <div>
                        <div onClick={onClickQuestion} className={`${styles.service_btn_icon} ${styles.service_btn_4}`}></div>
                        <div className={styles.service_btn_content_wrapper}>
                            <div>고객 문의</div>
                            <div>서비스에 대해 직접 문의할 수 있습니다</div>
                        </div>
                    </div>
                    {/*frequency*/}
                    <div>
                        <div onClick={onClickFrequency} className={`${styles.service_btn_icon} ${styles.service_btn_5}`}></div>
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
                                    isLoggedin
                                        ?(
                                            <>
                                                <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>

                                                    <div className={sideStyles.side_login_top}>
                                                        <img src={"https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"} className={sideStyles.side_login_top_img}></img>
                                                        <div className={sideStyles.side_login_top_info}>
                                                            <div className={sideStyles.side_login_top_nickname}>사용자 이름</div>
                                                            <div className={sideStyles.side_login_top_id}>userid@naver.com</div>
                                                        </div>
                                                        <button className={sideStyles.side_login_top_close} onClick={onClickClose}></button>
                                                    </div>

                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_1}></div>
                                                        <div className={sideStyles.side_nav_content}>이용안내</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_3}></div>
                                                        <div className={sideStyles.side_nav_content}>신청하기</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_4}></div>
                                                        <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_5}></div>
                                                        <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_6}></div>
                                                        <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                    </a></Link>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/"}><a>서비스소개</a></Link>
                                                            <Link href={"/"}><a>자주묻는질문</a></Link>
                                                            <Link href={"/"}><a>문의하기</a></Link>
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
                                        :(
                                            <>
                                                <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>
                                                    <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}/>
                                                    <div className={sideStyles.side_title} style={{minWidth:"320px"}}>
                                                        회원가입하고 다양한 메이커들과
                                                        <br/>
                                                        프로젝트를 시작하세요!
                                                    </div>
                                                    <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                        <div style={{display:"inline-block"}}><Button className={sideStyles.side_login}>로그인</Button></div>
                                                        <div style={{display:"inline-block", marginLeft:"12px"}}><Button className={sideStyles.side_signup}>회원가입</Button></div>
                                                    </div>

                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_1}></div>
                                                        <div className={sideStyles.side_nav_content}>이용안내</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_3}></div>
                                                        <div className={sideStyles.side_nav_content}>신청하기</div>
                                                    </a></Link>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/"}><a>서비스소개</a></Link>
                                                            <Link href={"/"}><a>자주묻는질문</a></Link>
                                                            <Link href={"/"}><a>문의하기</a></Link>
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
        </>
    )
}

export default Service
