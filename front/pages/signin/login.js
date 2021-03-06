import React, {useEffect} from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../../images/logo.svg"
import styles from "../../styles/Sign.module.scss"
import fontStyles from "../../styles/font.module.scss"
import SignWrapper from "../../components/SignWrapper";
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN_REQUEST} from "../../reducers/user";
import backUrl from "../../config/config";
import Router from "next/router";

const LogIn = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user){
            Router.replace('/project')
        }
    },[user])

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
                    <div onClick={() => Router.replace(`${backUrl}/auth/naver`)} style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}} className={styles.naver_btn}>
                        <div className={styles.naver_icon}></div>
                        <div style={{marginTop:"1px"}}>네이버 아이디로 로그인</div>
                    </div>
                    <div onClick={() => Router.replace(`${backUrl}/auth/kakao`)} style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}}  className={styles.kakao_btn}>
                        <div className={styles.kakao_icon}></div>
                        <div style={{marginTop:"1px"}}>카카오 계정으로 로그인</div>
                    </div>
                </div>
            </SignWrapper>

        </>
    )
}

export default LogIn
