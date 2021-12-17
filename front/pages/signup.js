import React, {memo, useCallback, useState} from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../images/logo.svg"
import image_google from "../images/user/Group 1300.svg"
import image_google_hover from "../images/user/Group1300_hover.svg"
import image_naver from "../images/user/Group 1301.svg"
import image_naver_hover from "../images/user/Group_1301_hover.svg"
import image_kakao from "../images/user/Group 1302.svg"
import image_kakao_hover from "../images/user/Group1302_hover.svg"
import styles from "../styles/Sign.module.scss"
import inputStyles from '../components/Input/style.module.scss'
import fontStyles from "../styles/font.module.scss"

import SignWrapper from "../components/SignWrapper";
import Agreements from "/components/Agreements"

const SignUp = memo(() => {
    const [isGoogleHover, setIsGoogleHover] = useState(false);
    const [isNaverHover, setIsNaverHover] = useState(false);
    const [isKakaoHover, setIsKakaoHover] = useState(false);

    const [emailText, setEmailText] = useState("");
    const [emailErr,setEmailErr] = useState(false);
    const [emailFocus,setEmailFocus] = useState(false);
    const [emailReadonly, setEmailReadonly] = useState(false);
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const [authCodeText, setAuthCodeText] = useState("");
    const [authCodeErr,setAuthCodeErr] = useState(false);
    const [authCodeFocus,setAuthCodeFocus] = useState(false);
    const [authCodeCheck, setAuthCodeCheck] = useState(false);
    const [authType,setAuthType] = useState(false);

    const [passwordText, setPasswordText] = useState("");
    const [passwordErr,setPasswordErr] = useState(false);
    const [passwordFocus,setPasswordFocus] = useState(false);
    const regPassword = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    const [passwordCheckText, setPasswordCheckText] = useState("");
    const [passwordCheckErr,setPasswordCheckErr] = useState(true);
    const [passwordCheckFocus,setPasswordCheckFocus] = useState(false);

    //email
    const onChangeEmail = useCallback((e) => {
        setEmailText(e.target.value)
    },[emailText])
    const onKeyUpEmail = useCallback((e) => {
        setEmailErr(!regEmail.test(emailText))
        setEmailReadonly(false)
        setAuthCodeCheck(false)
    },[emailErr,emailText])
    const onFocusEmail = useCallback((e) => {
        setEmailFocus(true)
    })
    const onBlurEmail = useCallback((e) => {
        setEmailFocus(false)
    })
    const onClickEmail = useCallback((e) => {
        setEmailReadonly(true)
    })

    //authCode
    const onChangeAuthCode = useCallback((e) => {
        setAuthCodeText(e.target.value)
    },[authCodeText])
    const onFocusAuthCode = useCallback((e) => {
        setAuthCodeFocus(true)
    })
    const onBlurAuthCode = useCallback((e) => {
        setAuthCodeFocus(false)
    })
    const onKeyUpAuthCode = useCallback(() => {
        setAuthCodeErr(false)
    })
    const onClickAuthCode = useCallback((e) => {
        setAuthCodeErr(authCodeText !== "1234")
        if ((authCodeText !== "1234") === false){
            setAuthCodeCheck(true)
        }
        setAuthType(true)
    },[authCodeErr,authCodeText,authType])

    //password
    const onChangePassword = useCallback((e) => {
        setPasswordText(e.target.value)
    },[passwordText])
    const onKeyUpPassword = useCallback((e) => {
        setPasswordErr(!regPassword.test(passwordText))
    },[passwordText])
    const onFocusPassword = useCallback((e) => {
        setPasswordFocus(true)
    })
    const onBlurPassword = useCallback((e) => {
        setPasswordFocus(false)
    })

    //passwordCheck
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheckText(e.target.value)
    },[passwordCheckText])
    const onKeyUpPasswordCheck = useCallback((e) => {
        setPasswordCheckErr(!(passwordText === passwordCheckText))
    },[passwordText,passwordCheckText,passwordCheckErr])
    const onFocusPasswordCheck = useCallback((e) => {
        setPasswordCheckFocus(true)
    })
    const onBlurPasswordCheck = useCallback((e) => {
        setPasswordCheckFocus(false)
    })

    return(
        <>
            <SignWrapper>
                <Image src={image_logo} />
                <div className={fontStyles.b24} style={{ marginTop: 20 }}>
                    계정 만들기
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 5 }}>
                    이미 계정이 있으십니까?&nbsp;
                    <Link href="/login">
                        <a className={styles.signin} ><span className={fontStyles.main_dark} style={{ marginLeft: 5 }}>로그인</span></a>
                    </Link>
                </div>
                <div style={{marginTop:"20px"}}>
                    <div>
                        {
                            emailErr
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
                            {
                                !authCodeCheck ?(
                                    emailErr ?(
                                        <div className={inputStyles.fake_button}>인증</div>
                                    ) : (
                                        <button className={inputStyles.button} onClick={onClickEmail}>
                                            {
                                                authType
                                                    ? "재전송"
                                                    : "인증"
                                            }
                                        </button>
                                    )
                                ) : null
                            }
                        </div>
                        {
                            emailErr
                                ? <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                : emailFocus
                                    ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                    : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                        }
                        {
                            emailErr
                                ? <div style={{color:'#F43333'}}>이메일 형식이 유효하지 않습니다.</div>
                                : null
                        }

                    </div>
                    {
                        emailReadonly ? (
                            <>
                                <div style={{marginTop:"16px"}}>
                                    {
                                        authCodeErr
                                            ? <div style={{color:'#F43333'}}>인증번호 입력</div>
                                            : authCodeFocus
                                                ? <div style={{color:'#3380F4'}}>인증번호 입력</div>
                                                : <div style={{color:'#616161'}}>인증번호 입력</div>
                                    }
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingBottom: '3px',
                                        alignItems: 'center',
                                    }}>
                                        <input
                                            type="text"
                                            className={styles.input_non_autofill}
                                            value={authCodeText}
                                            onFocus={onFocusAuthCode}
                                            onBlur={onBlurAuthCode}
                                            onChange={onChangeAuthCode}
                                            onKeyUp={onKeyUpAuthCode}
                                        />
                                        {
                                            !authCodeCheck
                                                ? <button className={inputStyles.button} onClick={onClickAuthCode}>인증</button>
                                                : null
                                        }

                                    </div>
                                    {
                                        authCodeErr
                                            ? <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                            : authCodeFocus
                                                ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                                : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                                    }
                                    {
                                        authCodeErr
                                            ? <div style={{color:'#F43333'}}>인증번호가 일치하지 않습니다.</div>
                                            : null
                                    }

                                </div>
                                {
                                    authCodeCheck
                                        ? <div style={{color:'#3380F4'}}>본인인증이 완료되었습니다.</div>
                                        : <></>
                                }
                            </>
                        ) : ""
                    }
                    <div className={styles.input_group}>
                        <div>
                            {
                                passwordErr
                                    ? <div style={{color:'#F43333'}}>비밀번호</div>
                                    : passwordFocus
                                        ? passwordText.length === 0
                                            ? <div style={{color:'#3380F4'}}>비밀번호</div>
                                            : <div style={{color:'#25D38A'}}>비밀번호</div>
                                        : <div style={{color:'#616161'}}>비밀번호</div>
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
                                passwordErr
                                    ? passwordFocus
                                        ? passwordText.length === 0
                                            ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                            : <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                        : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                                    : <div style={{width: '100%',borderBottom:'1px solid #25D38A', marginTop:'2px'}}></div>
                            }
                            {
                                passwordErr
                                    ?  passwordFocus
                                        ? passwordText.length === 0
                                            ? <div style={{color:'#3380F4'}}>영문/숫자/특수문자 포함 8~15자리를 입력해주세요.</div>
                                            : <div style={{color:'#F43333'}}>영문/숫자/특수문자 포함 8~15자리를 입력해주세요.</div>
                                        : null
                                    : <div style={{color:'#25D38A'}}>사용 가능한 비밀번호입니다.</div>


                            }

                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                passwordCheckFocus
                                    ? passwordCheckText.length === 0
                                        ? <div style={{color:'#3380F4'}}>비밀번호 확인</div>
                                        :  passwordCheckErr
                                            ? <div style={{color:'#F43333'}}>비밀번호 확인</div>
                                            : <div style={{color:'#25D38A'}}>비밀번호 확인</div>
                                    : <div style={{color:'#616161'}}>비밀번호 확인</div>
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
                                    value={passwordCheckText}
                                    onFocus={onFocusPasswordCheck}
                                    onBlur={onBlurPasswordCheck}
                                    onChange={onChangePasswordCheck}
                                    onKeyUp={onKeyUpPasswordCheck}
                                />
                            </div>
                            {
                                passwordCheckErr
                                    ? passwordCheckFocus
                                        ? passwordCheckText.length === 0
                                            ? <div style={{width: '100%',borderBottom:'1px solid #3380F4', marginTop:'2px'}}></div>
                                            : <div style={{width: '100%',borderBottom:'1px solid #F43333', marginTop:'2px'}}></div>
                                        : <div style={{width: '100%',borderBottom:'1px solid #E8E8E8', marginTop:'2px'}}></div>
                                    : <div style={{width: '100%',borderBottom:'1px solid #25D38A', marginTop:'2px'}}></div>
                            }
                            {
                                passwordCheckErr
                                    ? passwordCheckFocus
                                        ? passwordCheckText.length === 0
                                            ? <></>
                                            : <div style={{color:'#F43333'}}>비밀번호가 일치하지 않습니다.</div>
                                        : null
                                    : <div style={{color:'#25D38A'}}>비밀번호가 일치합니다.</div>
                            }
                        </div>
                    </div>
                    <div style={{marginTop:"16px"}}></div>
                    <Agreements
                        authCodeCheck = {authCodeCheck}
                        passwordErr={passwordErr}
                        passwordCheckErr={passwordCheckErr}
                    />
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
