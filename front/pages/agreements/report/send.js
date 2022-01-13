import React, {useCallback, useState} from "react";
import Header from "../../../components/Header";
import styles from "../../../styles/agreements.module.scss";
import Button from "../../../components/Button";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import {createGlobalStyle} from "styled-components";
import Router from "next/router";

const Global = createGlobalStyle`
  body{
    background: #FAFAFA;
  }
`

const Send = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])


    const onClickBtn = () => {
        Router.replace("/agreements/service")
    }

    return(
        <>
            <Global />
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_title} style={{fontSize:"28px"}}>
                    신고가 정상적으로
                    <br/>
                    접수되었어요
                </div>

                <div className={styles.inquiry_content}>
                    입력해주신 이메일 또는 연락처로 관련된 답변을 드릴 예정이며. 빠르게 확인 후 도움을 드릴 수 있도록 노력하겠습니다. 시간을 내어 목소리를 들려주셔서 감사합니다.
                </div>

                <Button onClick={onClickBtn} className={styles.inquiry_btn}>고객센터 돌아가기</Button>
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

export default Send
