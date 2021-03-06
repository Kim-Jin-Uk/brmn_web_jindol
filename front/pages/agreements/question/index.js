import React, {useCallback, useEffect, useState} from "react";
import Header from "../../../components/Header";
import sideStyles from "../../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../../components/Button";
import styles from "../../../styles/agreements.module.scss"
import {createGlobalStyle} from "styled-components";
import useInput from "../../../hooks/useInput";
import {Checkbox, message, Modal} from "antd";
import Router from "next/router";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import Footer from "../../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_MY_PROFILE_REQUEST,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    QUESTION_REQUEST,
    REPORT_REQUEST
} from "../../../reducers/user";
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
    transform: translateY(-50%);
    top: 50%;
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
      font-weight: 500;
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
    const {user,profile,logInDone,getMyProfileError,logOutError,questionError} = useSelector((state) => state.user);
    const [name, onChangeName] = useInput("")
    const [phone, onChangePhone] = useInput("")
    const [email, onChangeEmail] = useInput("")
    const [content, onChangeContent] = useInput("")
    const [agree, setAgree] = useState(false)
    const [visible, setVisible] = useState(false)


    const [nameErr, setNameErr] = useState(true)
    const [phoneErr, setPhoneErr] = useState(true)
    const [emailErr, setEmailErr] = useState(true)
    const [contentErr, setContentErr] = useState(true)
    const [agreeErr, setAgreeErr] = useState(true)


    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onChange = (e) => {
        setAgree(e.target.checked)
    }

    const onClickBtn = () => {
        const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        if (name === ""){
            setNameErr(false)
        }else{
            setNameErr(true)
        }
        if (!regPhone.test(phone)){
            setPhoneErr(false)
        }else{
            setPhoneErr(true)
        }
        if (!regEmail.test(email)){
            setEmailErr(false)
        }else{
            setEmailErr(true)
        }
        if (content.length < 10){
            setContentErr(false)
        }else{
            setContentErr(true)
        }
        if (!agree){
            setAgreeErr(false)
        }else{
            setAgreeErr(true)
        }
        if (name !== "" && regPhone.test(phone) && regEmail.test(email) && content.length >= 10 && agree) {
            setNameErr(true)
            setPhoneErr(true)
            setEmailErr(true)
            setContentErr(true)
            setAgreeErr(true)
            setVisible(true)
        }
    }

    const handleClose = () => {
        setVisible(false)
    }

    const handleOk = () => {
        setVisible(false)
        dispatch({
            type:QUESTION_REQUEST,
            data:{
                name:name,
                phone_num:phone,
                email:email,
                contents:content,
            }
        })
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

    useEffect(() => {
        if (getMyProfileError || questionError){
            message.warning("???????????? ????????? ????????? ?????????.")
        }
    },[getMyProfileError, questionError])

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

    return(
        <>
            <Global />
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <div className={styles.notice_wrapper}>
                <div className={styles.notice_title} style={{fontSize:"28px"}}>
                    ????????? ????????? ??????
                    <br/>
                    ?????? ????????? ??????????????????
                </div>

                <div style={{marginTop:"36px"}}>
                    <div className={styles.inquiry_value}>??????</div>
                    {
                        nameErr
                            ?
                            <div>
                                <input className={styles.inquiry_input} type="text" placeholder={"??????"} value={name} onChange={onChangeName}/>
                            </div>
                            :
                            <div>
                                <input className={styles.inquiry_input_err} type="text" placeholder={"??????"} value={name} onChange={onChangeName}/>
                                <div className={styles.inquiry_err_text}>????????? ???????????????</div>
                            </div>
                    }
                    <div className={styles.inquiry_value}>????????? ??????</div>
                    {
                        phoneErr
                            ?
                            <div>
                                <input className={styles.inquiry_input} type="tel" placeholder={"?????? ?????? ??? ?????? ????????? ??????"} value={phone} onChange={onChangePhone}/>
                            </div>
                            :
                            <div>
                                <input className={styles.inquiry_input_err} type="tel" placeholder={"?????? ?????? ??? ?????? ????????? ??????"} value={phone} onChange={onChangePhone}/>
                                <div className={styles.inquiry_err_text}>????????? ????????? ????????? ???????????????.</div>
                            </div>
                    }
                    <div className={styles.inquiry_value}>?????????</div>
                    {
                        emailErr
                            ?
                            <div>
                                <input className={styles.inquiry_input} type="email" placeholder={"?????? ?????? ????????? ??????"} value={email} onChange={onChangeEmail}/>
                            </div>
                            :
                            <div>
                                <input className={styles.inquiry_input_err} type="email" placeholder={"?????? ?????? ????????? ??????"} value={email} onChange={onChangeEmail}/>
                                <div className={styles.inquiry_err_text}>????????? ???????????? ??????????????????.</div>
                            </div>
                    }
                    <div className={styles.inquiry_value}>??????</div>
                    {
                        contentErr
                            ?
                            <div>
                                <textarea className={styles.inquiry_textarea} type="text" placeholder={"???????????? ?????? ??????????????? ??????????????????."} value={content} onChange={onChangeContent}/>
                            </div>
                            :
                            <div>
                                <textarea className={styles.inquiry_textarea_err} type="text" placeholder={"???????????? ?????? ??????????????? ??????????????????."} value={content} onChange={onChangeContent}/>
                                <div className={styles.inquiry_err_text}>?????? 10?????? ?????? ???????????????.</div>
                            </div>
                    }
                    {
                        agreeErr
                            ?<Checkbox onChange={onChange}>???????????? ????????????????? ???????????????</Checkbox>
                            :<Checkbox className={styles.inquiry_checkbox_err} onChange={onChange}>???????????? ????????????????? ???????????????</Checkbox>
                    }
                </div>

                <Button onClick={onClickBtn} className={styles.inquiry_btn}>????????????</Button>
            </div>

            <Modal
                visible={visible}
                title="?????? ?????? ??????????????????"
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button className={`${styles.pop_btn} ${styles.ok_btn}`} onClick={handleOk}>
                        ??????
                    </Button>,
                    <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={handleClose}>
                        ??????
                    </Button>,
                ]}
            >
                <div className={styles.delete_contents}>
                    ???????????? ????????? ????????? ????????? ????????? ???????????????? ?????? ?????? ???, ????????? ?????? ????????? ?????? ?????? ??? ????????? ?????? ?????? ?????? ??? ??????????????????.
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
        </>
    )
}

export default Index
