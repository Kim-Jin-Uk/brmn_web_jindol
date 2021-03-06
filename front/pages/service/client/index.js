import React, {useCallback, useEffect, useRef, useState} from 'react'
import Header from "../../../components/Header";
import styles from '../../../styles/Intro.module.scss'
import {message, Steps} from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link'
import sideStyles from "../../../styles/Project.module.scss";
import Button from "../../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"
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
    color: #C1D9FC !important;
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
    const {user,profile,logInDone,getMyProfileError,logOutError} = useSelector((state) => state.user);
    const Ref = useRef(null)

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
            message.warning("???????????? ????????? ????????? ?????????.")
        }
    },[getMyProfileError])

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    useEffect(() => {
        if (logOutError){
            message.warning("???????????? ????????? ????????? ?????????.")
        }
    },[logOutError])

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
            index === 6
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

    return(
        <>
            <Global/>
            <Header param={"guide"} openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}></Header>
            <div style={{background:"fafafa"}} ref={Ref}>
                <div className={styles.background_top}>
                    <div className={styles.content_cover_top}>
                        <div className={styles.content_top}>
                            ?????? ??? ?????? ????????? ?????? ??????????????? ???????????? ????????? ?????????. ???????????? ????????? ?????? ????????? ?????? ?????? ?????? ????????? ?????? ????????? ???????????? ???????????? ??? ????????????.
                        </div>
                        <Link href={"https://forms.gle/ccVtiCpFjYtmWs1y8"}><a className={styles.link_top}>????????? ?????? ???????????? ></a></Link>
                    </div>
                </div>
                <div className={styles.contents_cover_middle}>
                    <span>????????? ????????????</span>
                    <div className={styles.content_title_middle}>
                        ????????? ????????????
                        <br/>
                        ?????? ?????????
                        <br/>
                        ???????????? ???????????????
                    </div>
                </div>
                {/*contents*/}
                <div className={styles.contents_group_middle}>
                    <div className={styles.content_1_middle}>
                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_1}`}></div>
                                <div className={styles.sub_1_1_title}>??????</div>
                            </div>
                            <div className={styles.sub_1_1_content}>????????? ????????? ?????????, ?????? ??????</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_2}`}></div>
                                <div className={styles.sub_1_1_title}>?????????</div>
                            </div>
                            <div className={styles.sub_1_1_content}>???????????????</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_3}`}></div>
                                <div className={styles.sub_1_1_title}>??????</div>
                            </div>
                            <div className={styles.sub_1_1_content}>2022.01.02&emsp;-&emsp;2022.01.20</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_4}`}></div>
                                <div className={styles.sub_1_1_title}>??????</div>
                            </div>
                            <div className={styles.sub_1_1_content}>500,000??? ?????? ????????? ??????</div>
                        </div>
                        <div className={styles.sub_1_text}>
                            ????????? ?????? ????????????
                            <br/>
                            ???????????? ????????????
                            <br/>
                            ???????????????
                        </div>
                    </div>

                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_1}`}>
                        <div className={styles.contents_sub_text}>
                            ???????????? ?????? ????????? ?????????
                            <br/>
                            ????????? ????????? ????????????.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_1}`}></div>
                    </div>
                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_2}`}>
                        <div className={`${styles.contents_sub_text} ${styles.content_text_sub_2}`}>
                            ???????????? ??????????????? ????????? ????????? ????????? ????????? 100% ????????? ???????????????.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_2}`}></div>
                    </div>
                </div>
                {/*manuals*/}
                <div className={styles.manual_title}>
                    ?????? ????????????
                    <br/>
                    ????????? ???????????? ???????????????
                </div>
                <div className={styles.manual_grouper} >
                    <div className={styles.manual_group}>
                        <div className={styles.manu_back1}>
                            <div className={styles.manual_text}>
                                ?????? ?????????
                                <br/>
                                ??????
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu1}`}></div>
                        </div>
                        <div className={styles.manu_back2}>
                            <div className={styles.manual_text}>
                                ????????? ?????????
                                <br/>
                                ?????????
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu2}`}></div>
                        </div>
                        <div className={styles.manu_back3}>
                            <div className={styles.manual_text}>
                                ?????? ????????? ??????
                                <br/>
                                ?????????
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu3}`}></div>
                        </div>
                        <div className={styles.manu_back4}>
                            <div className={styles.manual_text}>
                                ?????? ???????????????
                                <br/>
                                ??????
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu4}`}></div>
                        </div>
                        <div className={styles.manu_back5}>
                            <div className={styles.manual_text}>
                                ?????? ?????????
                                <br/>
                                ??????
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu5}`}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.steps_group_middle}>
                    <div className={`${styles.manual_title} ${styles.steps_title}`}>
                        ?????? ??? ?????? ????????????
                        <br/>
                        ???????????? ???????????????
                    </div>
                    <div className={styles.steps_group}>
                        <div className={styles.steps_number}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                        </div>

                        <Steps
                            progressDot={customDot} current={6} direction="vertical" size={"small"}
                            style={{marginLeft:"39px"}}
                        >
                            <Step
                                title={"???????????? ??????"}
                                description={'??????????????? ?????? ???????????? ?????? ???????????? ????????? ???????????? ?????? ??????????????? ??????????????????.'}
                            />
                            <Step
                                title={"??????"}
                                description={'??????????????? ??????????????? ????????? ???????????? ??????????????? ????????? ?????? ???????????? ???????????????. ????????? 1~3?????? ???????????????.'}
                            />
                            <Step
                                title={"????????? ??????"}
                                description={'????????? ???????????? ??????????????? ??????????????? ???????????? ?????? ????????? ???????????? ????????? ???????????????.'}
                            />
                            <Step
                                title={"??????"}
                                description={'????????? ????????? ?????? ????????? ????????? ????????? ?????? ???????????? ???????????????. ????????? ????????? ?????? 100% ???????????????.'}
                            />
                            <Step
                                title={"????????? ??????"}
                                description={'??????????????? ????????? ???????????? ???????????? ???????????? ??????????????? ??????????????? ????????? ???????????? ???????????????.'}
                            />
                            <Step
                                title={"??????"}
                                description={'?????? ????????? ?????? ???????????? ???????????????. ???????????? ?????? ????????? ????????? ??? ????????? ??????????????????.'}
                            />
                            <Step
                                title={"??????"}
                                description={'??????????????? ??????????????? ?????? ??? ?????????, ???????????? ?????? ????????? ????????? ??? ????????? ??????????????????.'}
                            />
                        </Steps>
                    </div>
                </div>

                <div className={styles.background_bottom}>
                    <div>
                        <div className={styles.question_title_bottom}>?????? ?????? ??????</div>
                        <div className={styles.question_wrapper}>
                            <div className={styles.question_card}>
                                <div className={styles.question_icon}></div>
                                <div className={styles.question_content}>???????????? ????????? ??????????</div>
                            </div>
                            <div className={styles.answer_group}>
                                <div className={styles.answer_icon}></div>
                                <div className={styles.answer_content}>
                                    ???????????? ????????? 90%?????? ????????? 10%??? ????????????. ?????? ?????? ???????????? 100???????????? 90%??? 90????????? ??????????????? ???????????? ????????????, 10%??? 10????????? brmn?????? ???????????? ???????????????.
                                </div>
                            </div>
                        </div>
                        <div className={styles.question_wrapper2}>
                            <div className={styles.question_card}>
                                <div className={styles.question_icon}></div>
                                <div className={styles.question_content}>???????????? ????????? ????????? ????????????????</div>
                            </div>
                            <div className={styles.answer_group}>
                                <div className={styles.answer_icon}></div>
                                <div className={styles.answer_content}>
                                    brmn ???????????? ???????????? ????????? ?????????????????? ????????? ??? ????????????.
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
                                                        <div className={sideStyles.side_nav_content}>????????????</div>
                                                    </a></Link>
                                                </div>
                                                <div onClick={() => setOpenAble(true)}>
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>????????????</div>
                                                    </a></Link>
                                                </div>
                                                <div onClick={() => setOpenAble(true)}>
                                                    <Link href={
                                                        user && user.email
                                                            ?`/profile/${user.email}`
                                                            :`/profile/1`
                                                    }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_4}></div>
                                                        <div className={sideStyles.side_nav_content}>????????? ??????</div>
                                                    </a></Link>
                                                </div>
                                                <div onClick={() => setOpenAble(true)}>
                                                    <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_5}></div>
                                                        <div className={sideStyles.side_nav_content}>????????? ??????</div>
                                                    </a></Link>
                                                </div>
                                                <div onClick={() => setOpenAble(true)}>
                                                    <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_6}></div>
                                                        <div className={sideStyles.side_nav_content}>????????????</div>
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
                                                        <Link href={"/agreements/service"}><a>????????????</a></Link>
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
                                                    ?????????????????? ????????? ???????????????
                                                    <br/>
                                                    ??????????????? ???????????????!
                                                </div>
                                                <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                    <div style={{display:"inline-block"}}><Link href="/signin/login"><a><Button className={sideStyles.side_login}>?????????</Button></a></Link></div>
                                                    <div style={{display:"inline-block", marginLeft:"12px"}}><Link href="/signin/signup"><a><Button className={sideStyles.side_signup}>????????????</Button></a></Link></div>
                                                </div>

                                                <div onClick={() => setOpenAble(true)}>
                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_1}></div>
                                                        <div className={sideStyles.side_nav_content}>????????????</div>
                                                    </a></Link>
                                                </div>
                                                <div onClick={() => setOpenAble(true)}>
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>????????????</div>
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
                                                        <Link href={"/agreements/service"}><a>????????????</a></Link>
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
    )
}

export default Index
