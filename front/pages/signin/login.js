import React, {memo, useCallback, useState} from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../../images/logo.svg"
import image_google from "../../images/user/Group 1300.svg"
import image_google_hover from "../../images/user/Group1300_hover.svg"
import image_naver from "../../images/user/Group 1301.svg"
import image_naver_hover from "../../images/user/Group_1301_hover.svg"
import image_kakao from "../../images/user/Group 1302.svg"
import image_kakao_hover from "../../images/user/Group1302_hover.svg"
import styles from "../../styles/Sign.module.scss"
import inputStyles from '../../components/Input/style.module.scss'
import fontStyles from "../../styles/font.module.scss"

import SignWrapper from "../../components/SignWrapper";
import Agreements from "/components/Agreements"
import btn_styles from "../../styles/Sign.module.scss";
import Button from "../../components/Button";
import {Modal} from "antd";
import {useRouter} from "next/router";
import Router from "next/router";

const SignUp = memo(() => {
    const [isGoogleHover, setIsGoogleHover] = useState(false);
    const [isNaverHover, setIsNaverHover] = useState(false);
    const [isKakaoHover, setIsKakaoHover] = useState(false);

    const [emailText, setEmailText] = useState("");
    const [emailErr1,setEmailErr1] = useState(false);
    const [emailErr2,setEmailErr2] = useState(false);
    const [emailFocus,setEmailFocus] = useState(false);
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const [passwordText, setPasswordText] = useState("");
    const [passwordErr,setPasswordErr] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);

    const tester = {email:"gottkfthf@naver.com",password:"rlawlsdnr1!"}

    //email
    const onChangeEmail = useCallback((e) => {
        setEmailText(e.target.value)
    },[emailText])
    const onKeyUpEmail = useCallback((e) => {
        setEmailErr1(!regEmail.test(emailText))
        setEmailErr2(false)
    },[emailErr1,emailErr2,emailText])
    const onFocusEmail = useCallback((e) => {
        setEmailFocus(true)
    },[emailFocus])
    const onBlurEmail = useCallback((e) => {
        setEmailFocus(false)
    },[emailFocus])

    //password
    const onChangePassword = useCallback((e) => {
        setPasswordText(e.target.value)
    },[passwordText])
    const onFocusPassword = useCallback((e) => {
        setPasswordFocus(true)
    },[passwordFocus])
    const onKeyUpPassword = useCallback((e) => {
        setPasswordErr(false)
    },[passwordErr])
    const onBlurPassword = useCallback((e) => {
        setPasswordFocus(false)
    },[passwordFocus])

    const onClickLogin = useCallback(()=>{
        if (tester.email === emailText){
            setEmailErr2(false)
            if (tester.password === passwordText){
                setPasswordErr(false)
                Router.push("/")
            }else {
                setPasswordErr(true)
            }
        }else{
            setEmailErr2(true)
        }
    })

    return(
        <>
            <SignWrapper>
                <Image src={image_logo} />
                <div className={fontStyles.b24} style={{ marginTop: 20 }}>
                    로그인
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 8 }}>
                    신규 사용자이신가요?&nbsp;
                    <Link href="signup">
                        <a className={styles.signin} ><span className={fontStyles.main_dark} style={{ marginLeft: 5 }}>계정 만들기</span></a>
                    </Link>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div>
                        {
                            emailErr1
                                ? <div style={{color:'#F43333'}}>이메일</div>
                                : emailErr2
                                    ? <div style={{color:'#F43333'}}>이메일</div>
                                    : emailFocus
                                        ? <div style={{color:'#3380F4'}}>이메일</div>
                                        : <div style={{color:'#616161'}}>이메일</div>
                        }
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingBottom: '3px',
                            alignItems: 'center',
                        }}>
                            <input
                                type="email"
                                className={styles.input_non_autofill}
                                value={emailText}
                                onFocus={onFocusEmail}
                                onBlur={onBlurEmail}
                                onChange={onChangeEmail}
                                onKeyUp={onKeyUpEmail}
                            />
                        </div>
                        {
                            emailErr1
                                ? <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                : emailErr2
                                    ? <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                    : emailFocus
                                        ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                        : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                        }
                        {
                            emailErr1
                                ? <div style={{color:'#F43333'}}>이메일 형식이 유효하지 않습니다.</div>
                                : emailErr2
                                    ? <div style={{color:'#F43333'}}>가입되어 있지 않은 이메일 주소입니다.</div>
                                    : null
                        }

                    </div>

                    <div className={styles.input_group}>
                        <div>
                            {
                                !passwordErr
                                    ? passwordFocus
                                        ? <div style={{color:'#3380F4'}}>비밀번호</div>
                                        : <div style={{color:'#616161'}}>비밀번호</div>
                                    : <div style={{color:'#F43333'}}>비밀번호</div>
                            }
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingBottom: '3px',
                                alignItems: 'center',
                            }}>
                                <input
                                    type="password"
                                    className={styles.input_non_autofill}
                                    value={passwordText}
                                    onFocus={onFocusPassword}
                                    onBlur={onBlurPassword}
                                    onChange={onChangePassword}
                                    onKeyUp={onKeyUpPassword}
                                />
                            </div>
                            {
                                !passwordErr
                                    ? passwordFocus
                                        ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                        : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                                    : <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                            }
                            {
                                !passwordErr
                                    ? null
                                    : <div style={{color:'#F43333'}}>비밀번호가 맞지 않습니다.</div>
                            }

                        </div>
                    </div>
                    <div>
                    </div>
                    <div className={styles.create_btn_group}>
                        <Button className={styles.create_btn} onClick={onClickLogin} >로그인</Button>
                    </div>
                </div>

                <div className={styles.sns_link}>
                    <span>SNS 계정으로 더욱 간편하게 가입하기</span>
                    <div className={styles.sns_button_group}>
                        <div
                            onMouseOver={()=>setIsGoogleHover(true)}
                            onMouseOut={()=>setIsGoogleHover(false)}
                        >
                            <Image src={!isGoogleHover? image_google : image_google_hover}></Image>
                        </div>
                        <div
                            onMouseOver={()=>setIsNaverHover(true)}
                            onMouseOut={()=>setIsNaverHover(false)}
                        >
                            <Image src={!isNaverHover? image_naver : image_naver_hover}></Image>
                        </div>
                        <div
                            onMouseOver={()=>setIsKakaoHover(true)}
                            onMouseOut={()=>setIsKakaoHover(false)}
                        >
                            <Image src={!isKakaoHover? image_kakao : image_kakao_hover}></Image>
                        </div>
                    </div>
                </div>
            </SignWrapper>

        </>
    )
})

export default SignUp
