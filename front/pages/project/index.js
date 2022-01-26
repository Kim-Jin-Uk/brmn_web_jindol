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
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST} from "../../reducers/user";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import Router from "next/router";

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
        "n8": false,
    })
    const {loadProjects} = useSelector((state) => state.project);

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
                Router.replace("http://localhost:3060/signin/agreements")
            }else {
                dispatch({
                    type:GET_MY_PROFILE_REQUEST,
                    data:user.email
                })
            }
        }
    },[user])

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
                            <Select defaultValue="분야 선택" className={styles.nav_mobile}>
                                <Option value="전체">전체</Option>
                                <Option value="보컬">보컬</Option>
                                <Option value="랩">랩</Option>
                                <Option value="작사">작사</Option>
                                <Option value="작곡">작곡</Option>
                                <Option value="연주">연주</Option>
                                <Option value="음향 엔지니어">음향 엔지니어</Option>
                                <Option value="디자인">디자인</Option>
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
                                                <div>🎤  랩</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n3')}}>
                                                <div>🎤  랩</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n4']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n4')}}>
                                                <div>✏  작사</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n4')}}>
                                                <div>✏  작사</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n5']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n5')}}>
                                                <div>💿  작곡</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n5')}}>
                                                <div>💿  작곡</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n6']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n6')}}>
                                                <div>🎷  연주</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n6')}}>
                                                <div>🎷  연주</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n7']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n7')}}>
                                                <div>🎛  음향 엔지니어</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n7')}}>
                                                <div>🎛  음향 엔지니어</div>
                                            </button>
                                        )
                                }
                                {
                                    navActive['n8']
                                        ?(
                                            <button className={styles.nav_desktop_active}
                                                    onClick={() => {onCLickNav('n8')}}>
                                                <div>🎨  디자인</div>
                                            </button>
                                        )
                                        :(
                                            <button className={styles.nav_desktop}
                                                    onClick={() => {onCLickNav('n8')}}>
                                                <div>🎨  디자인</div>
                                            </button>
                                        )
                                }

                            </div>
                            <div className={styles.card_wrapper}>
                                {loadProjects.map((card, index) => (
                                    <>
                                        <MainCard card={card}></MainCard>
                                    </>
                                ))}
                            </div>

                        </div>
                    </div>

                    {
                        openAble
                            ?(
                                <></>
                            )
                            :(
                                <div className={styles.side_menu_wrapper}>
                                    <div className={styles.side_right_wrapper}></div>

                                    {
                                        logInDone
                                            ?(
                                                <>
                                                    <div style={{height:"100vh"}}  className={styles.side_wrapper}>

                                                        <div className={styles.side_login_top}>
                                                            <div className={styles.side_login_top_img}>
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
                                                            <div className={styles.side_login_top_info}>
                                                                {
                                                                    profile && profile.nickname
                                                                        ? <div className={styles.side_login_top_nickname}>{profile.nickname}</div>
                                                                        : <div className={styles.side_login_top_nickname}>{user.email}</div>
                                                                }
                                                                <div className={styles.side_login_top_id}>{user.email}</div>
                                                            </div>
                                                            <button className={styles.side_login_top_close} onClick={onClickClose}></button>
                                                        </div>

                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_1}></div>
                                                            <div className={styles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_2}></div>
                                                            <div className={styles.side_nav_content}>프로젝트</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_3}></div>
                                                            <div className={styles.side_nav_content}>신청하기</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_4}></div>
                                                            <div className={styles.side_nav_content}>작업물 관리</div>
                                                        </a></Link>
                                                        <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_5}></div>
                                                            <div className={styles.side_nav_content}>프로필 편집</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_6}></div>
                                                            <div className={styles.side_nav_content}>로그아웃</div>
                                                        </a></Link>

                                                        <div
                                                            style={{
                                                                position:"absolute",
                                                                bottom: "0px",
                                                                width:"100%",
                                                                minWidth:"320px"
                                                            }}>
                                                            <div className={styles.side_link_wrapper}>
                                                                <Link href={"/"}><a>서비스소개</a></Link>
                                                                <Link href={"/"}><a>자주묻는질문</a></Link>
                                                                <Link href={"/"}><a>문의하기</a></Link>
                                                            </div>
                                                            <div className={styles.side_sns_wrapper}>
                                                                <Link href={"/"}><a><div className={styles.side_sns_1}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_2}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_3}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_4}></div></a></Link>
                                                            </div>
                                                            <div className={styles.side_bottom_content}>
                                                                Copyright brmn all right reserved
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                            :(
                                                <>
                                                    <div style={{height:"100vh"}}  className={styles.side_wrapper}>
                                                        <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}  user={user} profile={profile}/>
                                                        <div className={styles.side_title} style={{minWidth:"320px"}}>
                                                            회원가입하고 다양한 메이커들과
                                                            <br/>
                                                            프로젝트를 시작하세요!
                                                        </div>
                                                        <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                            <div style={{display:"inline-block"}}><Link href="/signin/login"><a><Button className={styles.side_login}>로그인</Button></a></Link></div>
                                                            <div style={{display:"inline-block", marginLeft:"12px"}}><Link href="/signin/signup"><a><Button className={styles.side_signup}>회원가입</Button></a></Link></div>
                                                        </div>

                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_1}></div>
                                                            <div className={styles.side_nav_content}>이용안내</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_2}></div>
                                                            <div className={styles.side_nav_content}>프로젝트</div>
                                                        </a></Link>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={styles.side_nav_3}></div>
                                                            <div className={styles.side_nav_content}>신청하기</div>
                                                        </a></Link>

                                                        <div
                                                            style={{
                                                                position:"absolute",
                                                                bottom: "0px",
                                                                width:"100%",
                                                                minWidth:"320px"
                                                            }}>
                                                            <div className={styles.side_link_wrapper}>
                                                                <Link href={"/"}><a>서비스소개</a></Link>
                                                                <Link href={"/"}><a>자주묻는질문</a></Link>
                                                                <Link href={"/"}><a>문의하기</a></Link>
                                                            </div>
                                                            <div className={styles.side_sns_wrapper}>
                                                                <Link href={"/"}><a><div className={styles.side_sns_1}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_2}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_3}></div></a></Link>
                                                                <Link href={"/"}><a><div className={styles.side_sns_4}></div></a></Link>
                                                            </div>
                                                            <div className={styles.side_bottom_content}>
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
