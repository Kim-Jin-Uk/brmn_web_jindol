import Image from "next/image"
import { useState } from "react"
import icon_check from "./images/icon_check.svg"
import styles from "./style.module.scss"

export default function Checkbox(props) {
    const checked = props.checked
    const toggle = () => {
        if(props.toggle) {
            props.toggle()
        }
    }

    return (
        <div className={styles.checkbox}>
            {
                checked ? (
                    <div onClick={toggle} className={styles.active}>
                        <Image src={icon_check}/>
                    </div>
                ) : (
                    <div onClick={toggle} className={styles.inactive}>

                    </div>
                )
            }
            <div onClick={toggle}>
                {props.children || props.label}
            </div>
        </div>
    )
}