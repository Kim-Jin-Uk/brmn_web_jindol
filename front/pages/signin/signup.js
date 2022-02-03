import React, {memo, useCallback, useEffect, useState} from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../../images/logo.svg"
import styles from "../../styles/Sign.module.scss"
import fontStyles from "../../styles/font.module.scss"
import SignWrapper from "../../components/SignWrapper";
import backUrl from "../../config/config";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN_REQUEST} from "../../reducers/user";

const SignUp = memo(() => {
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
                    계정 만들기
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 8 }}>
                    이미 계정이 있으십니까?&nbsp;
                    <Link href="login">
                        <a className={styles.signin} ><span className={fontStyles.main_dark} style={{ marginLeft: 5 }}>로그인</span></a>
                    </Link>
                </div>

                <div style={{marginTop:"52px"}}>
                    <div onClick={() => Router.replace(`${backUrl}/auth/naver`)} className={styles.naver_btn}>
                        <div className={styles.naver_icon}></div>
                        <div style={{marginTop:"1px"}}>네이버 아이디로 가입</div>
                    </div>
                    <div onClick={() => Router.replace(`${backUrl}/auth/kakao`)} style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}}  className={styles.kakao_btn}>
                        <div className={styles.kakao_icon}></div>
                        <div style={{marginTop:"1px"}}>카카오 계정으로 가입</div>
                    </div>
                </div>
            </SignWrapper>

        </>
    )
})

export default SignUp
