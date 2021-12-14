import Image from "next/image"
import { useState } from "react"
import styles from "./style.module.scss"

export default function Button(props) {
    let colorStyle = "";

    if(props.main) {
        colorStyle += " " + styles.main
    }

    if(props.black) {
        colorStyle += " " + styles.black
    }

    if(props.text) {
        colorStyle += " " + styles.text
    }

    if(props.white) {
        colorStyle += " " + styles.white
    }

    if(props.small) {
        colorStyle += " " + styles.small
    }
    if(props.upload) {
        colorStyle += " " + styles.upload
    }
    if(props.signup) {
        colorStyle += " " + styles.signup
    }
    if(props.login) {
        colorStyle += " " + styles.login
    }

    return (
        <div
            className={`${styles.button} ${colorStyle} ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
