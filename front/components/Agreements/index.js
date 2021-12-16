import { useEffect, useState } from "react";
import Checkbox from "../Checkbox";
import styles from "./style.module.scss"

export default function Agreements(props) {
    const [hidden, setHidden] = useState(true)
    const [allowAll, setAllowAll] = useState(false)
    const [checked, setChecked] = useState({
        "c1": false,
        "c2": false,
        "c3": false,
        "c4": false,
        "c5": false
    })

    useEffect(() => {
        if(props.onChange) {
            props.onChange(checked)
        }
    }, [checked])

    const toggle = () => setHidden(!hidden)
    const onAllowAll = () => {
        if(allowAll) {
            setAllowAll(false)
            setChecked({
                "c1": false,
                "c2": false,
                "c3": false,
                "c4": false,
                "c5": false,
                "c6": false
            })
            return
        }
        setAllowAll(true)
        setChecked({
            "c1": true,
            "c2": true,
            "c3": true,
            "c4": true,
            "c5": true,
            "c6": true
        })
    }
    const onToggle = (name) => {
        const field = {}
        field[name] = !checked[name]
        setChecked({...checked, ...field})
    }
    return (
        <>
            <div className={styles.agreements}>
                <div className={styles.content}>
                    <Checkbox checked={allowAll} toggle={onAllowAll}>가입 약관 전체동의</Checkbox>
                    <div className={styles.subtitle}>광고 수신 동의를 포함하여 모두 동의합니다.</div>
                </div>
                <span onClick={toggle} className={styles.toggle}>
                {
                    hidden ? "전체보기" : "접기"
                }
                </span>
            </div>

            {
                hidden ? (
                    <></>
                ) : (
                    <>
                        <div>
                            <div className={styles.agreement}>
                                <Checkbox
                                    checked={checked['c1']}
                                    toggle={() => {onToggle("c1")}}
                                >
                                    <span className={styles.impact}>(필수) 만 14세 이상입니다.</span>
                                </Checkbox>
                                <span>(확인하기)</span>
                            </div>
                            <div className={styles.agreement}>
                                <Checkbox
                                    checked={checked['c3']}
                                    toggle={() => {onToggle("c3")}}
                                >
                                    <span className={styles.impact}>(필수) 서비스 이용약관에 동의합니다.</span>
                                </Checkbox>
                                <span>(확인하기)</span>
                            </div>
                            <div className={styles.agreement}>
                                <Checkbox
                                    checked={checked['c4']}
                                    toggle={() => {onToggle("c4")}}
                                >
                                    <span className={styles.impact}>(필수) 개인정보 수집·이용에 동의합니다.</span>
                                </Checkbox>
                                <span>(확인하기)</span>
                            </div>
                            <Checkbox
                                checked={checked['c5']}
                                toggle={() => {onToggle("c5")}}
                            >
                                (선택) 이벤트 할인 혜택 알림 수신에 동의합니다.
                            </Checkbox>
                            <Checkbox
                                checked={checked['c6']}
                                toggle={() => {onToggle("c6")}}
                            >
                                (선택) 장기 미접속 시 계정 활성 상태 유지합니다.
                            </Checkbox>
                        </div>
                    </>
                )
            }

        </>
    )
}
