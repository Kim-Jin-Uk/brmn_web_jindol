import React, {useCallback, useEffect, useState} from "react";
import Header from "../../../components/Header";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../../components/Button";
import styles from "../../../styles/agreements.module.scss"
import Router from "next/router";
import { Pagination } from 'antd';
import {createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`
  .ant-pagination-options{
    display: none;
  }

  .ant-pagination-item-active a {
    color: #1d1d1d;
  }
  
  .ant-pagination-item{
    &:hover{
      border-radius: 50%;
      background: #E8E8E8;
      width: 24px !important;
      height: 24px !important;
      > a{
        margin-top: 2px;
        margin-left: 2px;
        color: #616161;
      }
    }
  }
  
  .ant-pagination{
    width: 340px;
    margin: 60px auto 0;
    text-align: center;
    >  li{
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: none;
      margin-left: 8px;
      margin-right: 8px;
      >button{
        margin-top: 2px;
        width: 16px!important;
        height: 16px!important;
        border: none !important;
        > span{
          width: 16px!important;
          height: 16px!important;
          vertical-align: top;
          font-family: Spoqa Han Sans Neo;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 130%;
          text-align: center;
        }
      }
      >a{
        width: 20px!important;
        height: 20px!important;
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 130%;
        text-align: center;
        padding: 0;
        &:hover{
          color: #616161;
        }
      }
    }
  }
  
  .ant-pagination-item-ellipsis{
    font-family: Spoqa Han Sans Neo !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 10px;
    line-height: 130%;
    text-align: center !important;
    color: #616161 !important;
    padding-top: 3px;
  }
  
  .ant-pagination-item-active{
    border-radius: 50%;
    background: #E8E8E8;
    width: 24px !important;
    height: 24px !important;
    > a{
      margin-top: 2px;
      margin-left: 2px;
    }
  }

  @media (min-width: 600px) {
    .ant-pagination{
      width: 540px;
      margin: 60px auto 0;
      >  li{
        margin-right: 14px;
        margin-left: 14px;
      }
    }
  }
`

const Index = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const [noticeList, setNoticeList] = useState([
        {id:"1",title:"1v3.1.0 업데이트 소식을 전해드립니다.", date:"2022. 05. 01"},
    ])

    const [pageNum, setPageNum] = useState(1)

    const onClickNotice =(id) => {
        Router.push(`/agreements/notice/${id}`).then((() =>window.scrollTo(0,0) ))
    }

    const onChange = (pn) => {
        setPageNum(pn)
    }

    return(
        <>
            <Global />
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_title}>공지사항</div>
                <div className={styles.notice_item_wrapper}>
                    {noticeList.slice((pageNum - 1)*10,pageNum*10).map((v, i) => (
                        <div>
                            <div onClick={()=>onClickNotice(v.id)}>{v.title}</div>
                            <div>{v.date}</div>
                        </div>
                    ))}
                </div>
                <Pagination
                    showSizeChanger
                    onChange={onChange}
                    defaultCurrent={1}
                    total={noticeList.length * 10}
                />
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

export default Index
