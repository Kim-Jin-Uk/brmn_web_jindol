import React, {memo, useState} from "react";
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
import fontStyles from "../styles/font.module.scss"

import SignWrapper from "../components/SignWrapper";
import Input from "../components/Input"
import Button from "../components/Button"
import Agreements from "/components/Agreements"

const SignUp = memo(() => {
    const [emailReadonly, setEmailReadonly] = useState(false)
    const [isGoogleHover, setIsGoogleHover] = useState(false);
    const [isNaverHover, setIsNaverHover] = useState(false);
    const [isKakaoHover, setIsKakaoHover] = useState(false);
    return(
        <>
            <SignWrapper>
                <Image src={image_logo} />
                <div className={fontStyles.b24} style={{ marginTop: 20 }}>
                    계정 만들기
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 5 }}>
                    이미 계정이 있으십니까?&nbsp;
                    <Link href="/user/signin">
                        <a className={styles.signin} ><span className={fontStyles.main_dark} style={{ marginLeft: 5 }}>로그인</span></a>
                    </Link>
                </div>
                <div className={styles.input_group}>
                    <div>
                        <Input
                            title="이메일"
                            button="인증"
                        />
                    </div>
                    {
                        emailReadonly ? (
                            <div>
                                <Input
                                    title="인증번호 입력"
                                    button="인증"
                                />
                            </div>
                        ) : ""
                    }
                    <div>
                        <Input
                            title="비밀번호"
                            type="password"
                            hint="영문/숫자/특수문자를 포함한 8~15자리를 입력해주세요."
                        />
                    </div>
                    <div>
                        <Input
                            title="비밀번호 확인"
                            type="password"
                        />
                    </div>
                    <Agreements />
                    <div className={styles.create_btn_group}>
                        <Button className={styles.create_btn}>계정 만들기</Button>
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
