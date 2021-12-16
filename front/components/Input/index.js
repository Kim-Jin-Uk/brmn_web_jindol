import { useState } from "react"
import styles from "./style.module.scss"

export default function Input(props) {
    const [isFocus, setIsFocus] = useState(false)
    const onFocus = () => {
        setIsFocus(true)
    }
    const onBlur = () => {
        setIsFocus(false)
    }
    let stateStyle = "";
    if(isFocus) {
        stateStyle = styles.focus;
    } else if(props.positive) {
        stateStyle = styles.positive;
    } else if(props.negative) {
        stateStyle = styles.negative;
    } else if(props.hint && isFocus) {
        stateStyle = styles.hint;
    }
    return (
        <div>
            <div className={`${styles.label} ${stateStyle}`}>{props.title}</div>
            <div className={`${styles.wrapper} ${stateStyle} ${props.disabled ? styles.disabled : ""}`}>
                {
                    props.textarea ? (
                        <textarea type={props.type} disabled={props.disabled} placeholder={props.placeholder} onFocus={onFocus} onBlur={onBlur} value={props.value} onChange={props.onChange} readOnly={props.readOnly} />
                    ) : (
                        <input type={props.type} disabled={props.disabled} placeholder={props.placeholder} onFocus={onFocus} onBlur={onBlur} value={props.value} onChange={props.onChange} readOnly={props.readOnly} />
                    )
                }
                {
                    props.text ? (
                        <span className={styles.text}>{props.text}</span>
                    ) : <></>
                }
                {
                    props.button ? (
                        <button className={styles.button} onClick={props.onClick}>{props.button}</button>
                    ) : (
                        <></>
                    )
                }
            </div>
            {
                (props.positive) ? (
                    <div className={styles.positive}>
                        {props.positive}
                    </div>
                ) : (props.negative) ? (
                    <div className={styles.negative}>
                        {props.negative}
                    </div>
                ) : (props.hint && isFocus) ? (
                    <div className={styles.hint}>
                        {props.hint}
                    </div>
                ) : <></>
            }
        </div>
    )
}