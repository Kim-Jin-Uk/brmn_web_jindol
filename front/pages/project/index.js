import React, {useState} from 'react'
import Head from 'next/head'
import Header from "../../components/Header"
import styles from '../../styles/Project.module.scss'
import Button from "../../components/Button";
import Link from "next/link"
import Footer from "../../components/Footer";

import { Select,Card,Avatar  } from 'antd';
import {createGlobalStyle} from "styled-components";

const { Meta } = Card;
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

  .ant-card-cover{
    height: calc(100vw - 59px) !important;
    min-height: 280px !important;
    >img{
      height: calc(100vw - 59px);
      min-height: 280px !important;
      border-radius: 4px !important;
      object-fit:cover;
    }
  }
  
  .ant-card-body{
    height: 49px;
    padding: 0px;
  }
  
  .ant-card-meta{
    margin-top: -4px;
  }
  
  .ant-card-meta-title{
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #1D1D1D;
    margin: 8px auto 0px !important;
  }
  
  .ant-card-meta-description{
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: #1D1D1D;
    margin-top: -2px;
  }
  
  .ant-avatar{
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

  @media (min-width: 600px) and (max-width: 840px) {
    .ant-card-cover{
      height: calc((100vw - 87px) / 2) !important;
      min-height: 0px !important;
      >img{
        height: calc((100vw - 87px) / 2);
        min-height: 0px !important;
        border-radius: 4px !important;
        object-fit:cover;
      }
    }
  }

  @media (min-width: 840px) and (max-width: 1024px) {
    .ant-card-cover{
      height: calc((100vw - 107px) / 3) !important;
      min-height: 235px !important;
      >img{
        height: calc((100vw - 107px) / 3);
        min-height: 235px !important;
        border-radius: 4px !important;
        object-fit:cover;
      }
    }
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    .ant-card-cover{
      height: calc((100vw - 127px) / 4) !important;
      min-height: 0px !important;
      >img{
        height: calc((100vw - 127px) / 4);
        min-height: 0px !important;
        border-radius: 4px !important;
        object-fit:cover;
      }
    }
  }

  @media (min-width: 1440px) and (max-width: 1828px) {
    .ant-card-cover{
      height: calc(100% / 5) !important;
      >img{
        height: calc(100% / 5);
        border-radius: 4px !important;
        object-fit:cover;
      }
    }
  }

  @media (min-width: 1828px){
    .ant-card-cover{
      height: calc((100vw - 167px) / 6) !important;
      >img{
        height: calc((100vw - 167px) / 6);
        border-radius: 4px !important;
        object-fit:cover;
      }
    }
  }
`;

const Index = () =>{
    const [openAble,setOpenAble] = useState(true)
    const card = {
        imgUrl:"http://blog.jinbo.net/attach/615/200937431.jpg",
        title:"사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 쿠쿠루 삥뽕",
        profImg:"https://bit.ly/2V1ipNj",
        nickname:"2층과3층사이"
    }
    const [cardList,setCardList] = useState([card,card,card,card,card,card,card,card,card])

    return(
        <>
            <Global />
            <Head>
                <title>brmn music | project</title>
            </Head>
            {
                openAble
                    ? (
                        <>
                            <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>
                            <div className={styles.body_color}>
                                <Select defaultValue="분야 선택" style={{
                                    width: "118px",
                                    height: "40px",
                                    marginTop:"28px",
                                    marginLeft:"19px",
                                }}>
                                    <Option value="전체">전체</Option>
                                    <Option value="보컬">보컬</Option>
                                    <Option value="랩">랩</Option>
                                    <Option value="작사">작사</Option>
                                    <Option value="작곡">작곡</Option>
                                    <Option value="연주">연주</Option>
                                    <Option value="음향 엔지니어">음향 엔지니어</Option>
                                    <Option value="디자인">디자인</Option>
                                </Select>

                                <div className={styles.card_wrapper}>
                                    {cardList.map((card, index) => (
                                        <Link href={"/"}><a style={{display: "inline-block", width:"calc(100% / 5)"}}>
                                            <Card
                                                className={styles.card}
                                                cover={<img alt="example" src={card.imgUrl} />}
                                            >
                                                <Meta
                                                    title={card.title}
                                                    description={
                                                        <>
                                                            <Avatar style={{display:"inline-block"}} src={card.profImg} />
                                                            <div style={{display:"inline-block"}}>{card.nickname}</div>
                                                        </>
                                                    }
                                                />
                                            </Card>
                                        </a></Link>
                                    ))}
                                </div>

                            </div>
                        </>
                    ) : (
                        <div>
                            <div className={styles.side_right_wrapper}></div>
                            <div style={{height:"100vh"}}  className={styles.side_wrapper}>
                                <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>
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
                            <div className={styles.side_fake_wrapper}>
                                {/*same collection*/}
                                <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>
                                <h1>Project</h1>
                                <div className={styles.body_color}></div>
                            </div>
                        </div>
                    )
            }
            <Footer></Footer>
        </>
    )
}

export default Index
