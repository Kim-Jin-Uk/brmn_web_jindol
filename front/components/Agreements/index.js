import React, {useCallback, useEffect, useState} from "react";
import Checkbox from "../Checkbox";
import styles from "./style.module.scss"
import btn_styles from "../../styles/Sign.module.scss"
import Button from "../Button";
import {Modal} from "antd";
import Router from 'next/router'

export default function Agreements(props) {
    const [hidden, setHidden] = useState(true)
    const [allowAll, setAllowAll] = useState(false)
    const [requiredToggle, setRequiredToggle] = useState(false)
    const [checked, setChecked] = useState({
        "c1": false,
        "c2": false,
        "c3": false,
    })

    useEffect(() => {
        if(props.onChange) {
            props.onChange(checked)
        }
    }, [checked])

    const onClickCreate = useCallback(() => {
        console.log("click")
        if (requiredToggle){
            Router.push("complete")
        }else {
            Modal.error({
                title: '회원가입 실패',
                content: '필수항목을 체크해주세요.',
                okText:"확인"
            });
        }
    },[requiredToggle])

    const toggle = () => setHidden(!hidden)
    const onAllowAll = () => {
        if(allowAll) {
            setAllowAll(false)
            setChecked({
                "c1": false,
                "c2": false,
                "c3": false,
            })
            setRequiredToggle(false)
            return
        }
        setAllowAll(true)
        setChecked({
            "c1": true,
            "c2": true,
            "c3": true,
        })
        setRequiredToggle(true)
    }
    const onToggle = useCallback((name) => {
        const field = {}
        field[name] = !checked[name]
        setChecked({...checked, ...field})
        if ({...checked, ...field}['c1'] && {...checked, ...field}['c2']){
            setRequiredToggle(true)
            if ({...checked, ...field}['c3']){
                setAllowAll(true)
            }else {
                setAllowAll(false)
            }
        }else {
            setRequiredToggle(false)
            setAllowAll(false)
        }
    },[checked,requiredToggle,allowAll])

    return (
        <>
            <div className={styles.agreements}>
                <div className={styles.content}>
                    <Checkbox checked={allowAll} toggle={onAllowAll}><div style={{fontSize:"14px", fontWeight:"700"}}>가입 약관 전체동의</div></Checkbox>
                    <div className={styles.subtitle}>광고 수신 동의를 포함하여 모두 동의합니다.</div>
                </div>
            </div>
            <>
                <div>
                    <div className={styles.agreement}>
                        <Checkbox
                            checked={checked['c1']}
                            toggle={() => {onToggle("c1")}}
                        >
                            <span className={styles.impact}>(필수) 서비스 이용약관에 동의합니다.</span>
                        </Checkbox>
                    </div>
                    <div className={styles.agreement}>
                        <Checkbox
                            checked={checked['c2']}
                            toggle={() => {onToggle("c2")}}
                        >
                            <span className={styles.impact}>(필수) 개인정보 수집·이용에 동의합니다.</span>
                        </Checkbox>
                    </div>
                    <div className={styles.agreement}>
                        <Checkbox
                            checked={checked['c3']}
                            toggle={() => {onToggle("c3")}}
                        >
                            <span className={styles.choice}>(선택) 이벤트 할인 혜택 알림 수신에 동의합니다.</span>
                        </Checkbox>
                    </div>
                </div>

            </>

            <div className={btn_styles.create_btn_group}>
                <Button className={btn_styles.create_btn} onClick={onClickCreate}>다음</Button>
            </div>
        </>
    )
}
