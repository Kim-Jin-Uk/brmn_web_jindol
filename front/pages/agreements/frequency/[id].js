import React, {useCallback, useState} from "react";
import Header from "../../../components/Header";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../../components/Button";
import styles from "../../../styles/agreements.module.scss"
import Router from "next/router";

const Frequency = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)
    const [frequency,setFrequency] = useState({
        title:"계정을 삭제하고 싶습니다. 어떻게 하면 될까요?",
        date:"최근 업데이트 : 2022. 05. 01",
        contents:`v3.1.0 업데이트 소식을 전해드립니다.

- 인스타그램 스토리에 공유**할 때 배경을 고를 수 있게 되었어요. '좋아요'를 누를 때 나타나는 3가지 효과를 고르거나 심플한 블랙, 또는 앨범 커버의 테마 색상을 배경으로 공유할 수 있습니다.
-재생 목록에 몇가지 편의 기능**이 추가되었어요. 노래 목록을 '곡 제목', '아티스트', '앨범' 순서대로 정렬할 수 있고, 플레이리스트 탭에 쌓아둔 목록 중 지우고 싶지 않은 목록은 왼쪽으로 살짝 밀어서 고정할 수 있어요.

 플레이리스트 탭에서 재생할 때 '바로 다음', 또는 '맨 마지막'에 추가하는 기능은 아쉽게도 이번 업데이트에 포함되지 못했어요. 가능한 빨리 업데이트 하기 위해 노력하고 있으니 조금만 기다려주세요.


-파티룸에서 음성없이 간단한 메시지로 의사 표현**을 할 수 있어요. 무언가 말은 하고 싶은데 마이크는 못켜는 상황, 이젠 없습니다! 좀 더 다양한 감정을 표현할 수 있는 이모티콘은 덤으로 드려요.
- 파티룸을 편리하게 이용할 수 있는 숨겨진 기능!** 말할 때마다 마이크를 켜고 끄는 번거로움을 덜고자 꾸~욱 누르는 동안만 마이크가 켜지도록 개선했어요.
-최근에 검색했던 검색어 목록에서 원하는 키워드만 삭제할 수 있어요.
-NOW replay 쇼를 주변에 공유할 수 있어요.`
    })

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    return(
        <>
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_notice}>자주묻는 질문</div>
                <div className={styles.notice_item_title}>{frequency.title}</div>
                <div className={styles.notice_item_date}>{frequency.date}</div>
                <pre className={styles.notice_item_content}>{frequency.contents}</pre>
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

export default Frequency
