import Image from "next/image"

import styles from "./styles.module.scss"

export default function IconButton(props) {
    return (
        <div className={`${styles.button} ${props.className}`}>
            <Image src={props.src} width={50} height={50}/>
        </div>
    )
}