import React, {useCallback, useEffect} from "react";
import SignWrapper from "../../components/SignWrapper";
import Image from "next/image";
import image_logo from "../../images/logo.svg";
import fontStyles from "../../styles/font.module.scss";
import styles from "../../styles/Sign.module.scss";
import Button from "../../components/Button";
import Router from 'next/router'
import {useDispatch, useSelector} from "react-redux";
import { GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST} from "../../reducers/user";
import {message} from "antd";

const Complete = () => {
    const dispatch = useDispatch()
    const {user,profile,getMyProfileError} = useSelector((state) => state.user);


    const onCLickTop = useCallback(() => {
        Router.replace("/profile/edit")
    })

    const onCLickBottom = useCallback(() => {
        Router.replace("/project")
    })

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user){
            dispatch({
                type:GET_MY_PROFILE_REQUEST,
                data:user.email
            })
        }
    },[user])

    useEffect(() => {
        if (getMyProfileError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[getMyProfileError])

    return(
        <>
            <SignWrapper>
                <Image src={image_logo} />
                <div className={fontStyles.b24} style={{ marginTop: 20 }}>
                    가입이 완료 되었습니다.
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 8 }}>
                    {`${
                        user
                            ? profile
                                ? profile.nickname
                                    ? profile.nickname
                                    : user.email
                                : user.email
                            : ""
                        
                    }님 가입을 축하합니다.`}
                </div>

                <div className={styles.create_btn_group}>
                    <Button className={styles.complete_btn_top} onClick={onCLickTop}>프로필 정보 입력하기</Button>
                    <Button className={styles.complete_btn_bottom} onClick={onCLickBottom}>메인으로 이동</Button>
                </div>

            </SignWrapper>
        </>
    )
}

export default Complete
