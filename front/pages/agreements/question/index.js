import React, {useCallback, useEffect, useState} from "react";
import Header from "../../../components/Header";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../../components/Button";
import styles from "../../../styles/agreements.module.scss"
import {createGlobalStyle} from "styled-components";
import useInput from "../../../hooks/useInput";
import {Checkbox, Modal} from "antd";
import Router from "next/router";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import Footer from "../../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"

const Global = createGlobalStyle`
  body{
    background: #FAFAFA;
  }

  .ant-checkbox-checked .ant-checkbox-inner{
    background-color: #1D1D1D;
    border-color: #1D1D1D;
  }
  
  .ant-checkbox-inner{
    border: 1px solid #e8e8e8;
  }

  .ant-checkbox-checked::after{
    border: 1px solid #1d1d1d;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner{
    border: 1px solid #1d1d1d;
  }
  
  .ant-checkbox-wrapper{
    >span:last-child{
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 170%;
      color: #1D1D1D;
      padding-left: 6px;
    }
  }

  .ant-modal-content {
    border-radius: 4px;
    overflow: hidden;
  }

  .ant-modal {
    background: none;
    width: calc(100% - 32px) !important;
    max-width: 500px;
    min-width: 280px;
    margin: 0 auto;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    padding: 28px 0 8px;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom: 1px solid #e8e8e8;

    > div {
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 130%;
      color: #1D1D1D;
    }
  }

  .ant-modal-body {
    padding: 12px 20px 20px;
    border-bottom: 1px solid #e8e8e8;
    >span{
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 150%;
      color: #1D1D1D;
    }
  }

  .ant-modal-footer{
    background: #fafafa;
    height: 60px;
    padding: 12px 20px;
  }
`

const Index = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone} = useSelector((state) => state.user);
    const [name, onChangeName] = useInput("")
    const [phone, onChangePhone] = useInput("")
    const [email, onChangeEmail] = useInput("")
    const [content, onChangeContent] = useInput("")
    const [agree, setAgree] = useState(false)
    const [visible, setVisible] = useState(false)

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onChange = (e) => {
        setAgree(e.target.checked)
    }

    const onClickBtn = () => {
        setVisible(true)
    }

    const handleClose = () => {
        setVisible(false)
    }

    const handleOk = () => {
        setVisible(false)
        Router.replace("/agreements/question/send")
    }

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

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    return(
        <>
            <Global />
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_title} style={{fontSize:"28px"}}>
                    서비스 문의를 위해
                    <br/>
                    아래 정보를 입력해주세요
                </div>

                <div style={{marginTop:"36px"}}>
                    <div>
                        <div className={styles.inquiry_value}>이름</div>
                        <input className={styles.inquiry_input} type="text" placeholder={"이름"} value={name} onChange={onChangeName}/>
                    </div>
                    <div>
                        <div className={styles.inquiry_value}>휴대폰 번호</div>
                        <input className={styles.inquiry_input} type="tel" placeholder={"연락 받을 수 있는 휴대폰 번호"} value={phone} onChange={onChangePhone}/>
                    </div>
                    <div>
                        <div className={styles.inquiry_value}>이메일</div>
                        <input className={styles.inquiry_input} type="email" placeholder={"답변 받을 이메일 주소"} value={email} onChange={onChangeEmail}/>
                    </div>
                    <div>
                        <div className={styles.inquiry_value}>내용</div>
                        <textarea className={styles.inquiry_textarea} type="text" placeholder={"서비스에 관한 문의사항을 접수해주세요."} value={content} onChange={onChangeContent}/>
                    </div>
                    <Checkbox onChange={onChange}>개인정보 수집·이용에 동의합니다</Checkbox>
                </div>

                <Button onClick={onClickBtn} className={styles.inquiry_btn}>접수하기</Button>
            </div>

            <Modal
                visible={visible}
                title="접수 전에 확인해주세요"
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button className={`${styles.pop_btn} ${styles.ok_btn}`} onClick={handleOk}>
                        확인
                    </Button>,
                    <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={handleClose}>
                        취소
                    </Button>,
                ]}
            >
                <div className={styles.delete_contents}>
                    입력하신 휴대폰 번호와 이메일 주소가 정확한가요? 잘못 기입 시, 문의에 대한 안내를 받지 못할 수 있으니 최종 접수 전에 꼭 확인해주세요.
                </div>
            </Modal>

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
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>
                                                    <Link href={
                                                        user && user.email
                                                            ?`/profile/${user.email}`
                                                            :`/profile/1`
                                                    }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_4}></div>
                                                        <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                    </a></Link>
                                                    <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_5}></div>
                                                        <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                    </a></Link>
                                                    <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_6}></div>
                                                        <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
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

                                                    <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_1}></div>
                                                        <div className={sideStyles.side_nav_content}>이용안내</div>
                                                    </a></Link>
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>고객센터</a></Link>
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
        </>
    )
}

export default Index
