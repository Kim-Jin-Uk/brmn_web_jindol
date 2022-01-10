import React, {useCallback, useState} from 'react'
import Head from 'next/head'
import Header from "../../components/Header"
import styles from '../../styles/Project.module.scss'
import Button from "../../components/Button";
import Link from "next/link"
import Footer from "../../components/Footer";

import {Modal, Select} from 'antd';
import {createGlobalStyle} from "styled-components";

const { Option } = Select;
const Global = createGlobalStyle`
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
    console.log(props.card.id)
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
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)
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
    const card = {
        id:"1",
        imgUrl:"https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/9dEO/image/_Xi6E6YOQ22VUzRkRtyy0_6Rvak.png",
        title:"사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 쿠쿠루 삥뽕",
        profImg:"https://bit.ly/2V1ipNj",
        nickname:"2층과3층사이"
    }
    const [cardList,setCardList] = useState([
        card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
    ])

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

    return(
        <div>
            <Global />
            <Head>
                <title>brmn music | project</title>
            </Head>
            {

                <>
                    <div>
                        <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>

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
                                {cardList.map((card, index) => (
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
                                        isLoggedin
                                            ?(
                                                <>
                                                    <div style={{height:"100vh"}}  className={styles.side_wrapper}>

                                                        <div className={styles.side_login_top}>
                                                            <img src={"https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"} className={styles.side_login_top_img}></img>
                                                            <div className={styles.side_login_top_info}>
                                                                <div className={styles.side_login_top_nickname}>사용자 이름</div>
                                                                <div className={styles.side_login_top_id}>userid@naver.com</div>
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
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
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
                                                        <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}/>
                                                        <div className={styles.side_title} style={{minWidth:"320px"}}>
                                                            회원가입하고 다양한 메이커들과
                                                            <br/>
                                                            프로젝트를 시작하세요!
                                                        </div>
                                                        <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                            <div style={{display:"inline-block"}}><Button className={styles.side_login}>로그인</Button></div>
                                                            <div style={{display:"inline-block", marginLeft:"12px"}}><Button className={styles.side_signup}>회원가입</Button></div>
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
