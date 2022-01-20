import React, {useCallback, useEffect, useState} from 'react'
import Header from "../../../components/Header";
import styles from '../../../styles/MakerIntro.module.scss'
import { Steps } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link'
import sideStyles from "../../../styles/Project.module.scss";
import Button from "../../../components/Button";

import profile_image_default from "/images/default/profimg_default.svg"
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST} from "../../../reducers/user";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import Footer from "../../../components/Footer";

const { Step } = Steps;

const Global = createGlobalStyle`
  *{
    -ms-user-select: none; 
    -moz-user-select: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    user-select:none;
  }
  
  .ant-steps{
    min-width: 269px;
    display: inline-block;
    vertical-align: top;
    width: auto;
    margin-top: 60px;
    margin-left: 7px!important;
  }
  
  .ant-steps-item-tail{
    display: none !important;
  }
  
  .ant-steps-item-container{
    height: 115px;
  }
  
  .ant-steps-item-content{
    padding-top: 8px;
    padding-left: 12px;
  }
  
  .ant-steps-item-title{
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 14px !important;
    line-height: 150% !important;
    color: #FFFFFF !important;
  }
  
  .ant-steps-item-description{
    margin-top: 4px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    line-height: 150%;
    color: #A8A8A8 !important;
  }
  
  @media (max-width: 600px) {
    .ant-steps{
      width: calc(100% - 42px) !important;
    }
    .ant-steps-item-description{
      width: 100% !important;
    }
  }

  @media (min-width: 600px) and (max-width: 1024px) {
    .ant-steps{
      margin-top: 80px;
      margin-left: 12px!important;
    }
    
    .ant-steps-item-description{
      width: 400px !important;
    }

    .ant-steps-item-title{
      font-size: 16px !important;
    }

    .ant-steps-item-description{
      margin-top: 8px;
      font-size: 16px !important;
    }

    .ant-steps-item-container{
      height: 127px;
    }

    .ant-steps-item-content{
      padding-top: 6px;
      padding-left: 48px;
    }
  }

  @media (min-width: 1024px) {
    .ant-steps{
      margin-top: 80px;
      margin-left: 12px!important;
    }

    .ant-steps-item-description{
      width: 400px !important;
    }

    .ant-steps-item-title{
      font-size: 16px !important;
    }

    .ant-steps-item-description{
      margin-top: 8px;
      font-size: 16px !important;
    }

    .ant-steps-item-container{
      height: 127px;
    }

    .ant-steps-item-content{
      padding-top: 6px;
      padding-left: 48px;
    }
  }
`;

const Index = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone} = useSelector((state) => state.user);

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])
    const customDot = (dot, { status, index }) => (
        index === 0
        ?
            <div className={styles.dots_group}>
                <div className={styles.big_dots}>
                    <div className={styles.small_dots_top}></div>
                </div>
                <div className={styles.first_line}></div>
            </div>
        :
            index === 5
            ?
                <div>
                    <div className={styles.small_dots}></div>
                    <div className={styles.finish_line}></div>
                </div>
            :
                <div>
                    <div className={styles.small_dots}></div>
                    <div className={styles.after_line}></div>
                </div>
    );

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

    return(
        <>
            <Global/>
            <Header param={"guide"} openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}></Header>
            <div style={{background:"#fafafa"}}>
                <div className={styles.background_top}>
                    <div className={styles.content_cover_top}>
                        <div className={styles.content_top}>
                            파트너스에 가입해 콘텐츠 참여를 시작하세요. 콘텐츠 매칭부터 계약조건 협의, 계약서 작성 과정을 도와 콘텐츠 제작에만 집중할 수 있도록 함께 하겠습니다
                        </div>
                        <Link href={"https://forms.gle/ccVtiCpFjYtmWs1y8"}><a className={styles.link_top}>파트너스 신청하기 ></a></Link>
                    </div>
                </div>
                <div className={styles.contents_cover_middle}>
                    <span>메이커 파트너스</span>
                    <div className={styles.content_title_middle}>
                        당신의 재능을
                        <br/>
                        꽃피울 수 있는
                        <br/>
                        콘텐츠를 시작하세요
                    </div>
                </div>
                {/*contents*/}
                <div className={styles.contents_group_middle}>
                    <div className={styles.content_1_middle}>
                        <div className={styles.sub_1_img}></div>
                        <div className={styles.sub_1_text}>
                            내 성향에
                            <br/>
                            딱 맞는
                            <br/>
                            콘텐츠 매칭
                        </div>
                    </div>

                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_1}`}>
                        <div className={styles.contents_sub_text}>
                            콘텐츠 참여를 정기적으로 제안해
                            <br/>
                            수익을 보장합니다.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_1}`}></div>
                    </div>
                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_2}`}>
                        <div className={`${styles.contents_sub_text} ${styles.content_text_sub_2}`}>
                            클라이언트의 요청 시
                            <br/>
                            콘텐츠 제작 전속 계약을 맺을 수 있습니다.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_2}`}></div>
                    </div>

                    <div className={`${styles.content_1_middle} ${styles.content_4_middle}`}>
                        <div className={`${styles.sub_4_text}`}>
                            매번 지원서를
                            <br/>
                            제출할 필요 없이
                            <br/>
                            통합 온라인 포트폴리오로
                            <br/>
                            지원하세요.
                        </div>
                        <div className={`${styles.sub_4_img}`}></div>
                    </div>

                </div>

                <div className={styles.steps_group_middle}>
                    <div className={`${styles.manual_title} ${styles.steps_title}`}>
                        당신과 딱 맞는 콘텐츠를
                        <br/>
                        매칭합니다
                    </div>
                    <div className={styles.steps_group}>
                        <div className={styles.steps_number}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                        </div>

                        <Steps
                            progressDot={customDot} current={6} direction="vertical" size={"small"}
                            style={{marginLeft:"39px"}}
                        >
                            <Step
                                title={"파트너스 신청"}
                                description={'제공드리는 양식에 맞춰 포트폴리오를 제작하고 파트너스를 신청해주세요.'}
                            />
                            <Step
                                title={"심사"}
                                description={'전달해주신 포트폴리오와 입력하신 정보를 바탕으로 자격 심사를 거쳐 파트너스에 가입할 수 있습니다.'}
                            />
                            <Step
                                title={"콘텐츠 제안"}
                                description={'메이커에게 조건에 맞는 콘텐츠를 제안드립니다. 수행여부는 클라이언트와 세부사항을 논의하여 결정할 수 있습니다.\n'}
                            />
                            <Step
                                title={"계약"}
                                description={'협의 사항에 따라 클라이언트와 계약서를 작성합니다. 계약금 수령에 안정성을 보장합니다.'}
                            />
                            <Step
                                title={"콘텐츠 제작"}
                                description={'콘텐츠 제작 메뉴얼을 제공해 제작 참여 과정을 도와드립니다.'}
                            />
                            <Step
                                title={"후기"}
                                description={'클라이언트와의 작업 후기를 남길 수 있으며, 클라이언트의 지속적인 제작 요청 시 전속 계약을 도와드립니다.'}
                            />
                        </Steps>
                    </div>
                </div>

                <div className={styles.background_bottom}>
                    <div>
                        <div className={styles.question_title_bottom}>자주 묻는 질문</div>
                        <div className={styles.question_wrapper}>
                            <div className={styles.question_card}>
                                <div className={styles.question_icon}></div>
                                <div className={styles.question_content}>계약금은 어떻게 되나요?</div>
                            </div>
                            <div className={styles.answer_group}>
                                <div className={styles.answer_icon}></div>
                                <div className={styles.answer_content}>
                                    계약금은 용역비 90%로와 중개비 10%로 나뉩니다. 예를 들어 계약금이 100만원이면 90%인 90만원은 메이커에게 지불되는 용역비로, 10%인 10만원은 brmn에게 중개비로 지불됩니다.
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href={"https://forms.gle/ccVtiCpFjYtmWs1y8"}><a>
                        <div className={styles.match_btn}>
                            <div className={styles.btn_text_1}></div>
                            <div className={styles.btn_text_2}></div>
                        </div>
                    </a></Link>
                </div>
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
                                                <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
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
            <Footer></Footer>
        </>
    )
}

export default Index
