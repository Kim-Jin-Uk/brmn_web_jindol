import React, {memo, useCallback, useEffect} from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../../images/logo.svg"
import styles from "../../styles/Sign.module.scss"
import fontStyles from "../../styles/font.module.scss"
import SignWrapper from "../../components/SignWrapper";
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN_REQUEST} from "../../reducers/user";

const LogIn = () => {
    const dispatch = useDispatch()
    const { logInDone, user } = useSelector((state) => state.user)
    const dummy = {email:"jindol@naver.com",password:"1234",age:27,gender:"mail",agreement:"1 1 1"}

    const onClickLogin = useCallback(() => {
        console.log("click")
        dispatch({
            type: LOG_IN_REQUEST,
            data: dummy,
        })
    })

    useEffect(() => {
        console.log(logInDone)
        console.log(user)
    },[logInDone,user])

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

                <div style={{marginTop:"52px"}}>
                    <div onClick={() => onClickLogin()} style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}} className={styles.naver_btn}>
                        <div className={styles.naver_icon}></div>
                        <div>네이버 아이디로 로그인</div>
                    </div>
                    <Link href={"http://localhost:3065/auth/kakao"}><a>
                        <div onClick={() => onClickLogin()} style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}}  className={styles.kakao_btn}>
                            <div className={styles.kakao_icon}></div>
                            <div>카카오 계정으로 로그인</div>
                        </div>
                    </a></Link>
                </div>
            </SignWrapper>

        </>
    )
}

export default LogIn
