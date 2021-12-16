import Image from "next/image"
import Link from "next/link"

import image_logo_white from "../images/logo_white.svg"
import styles from "../styles/components/SignWrapper.module.scss"

export default function SignWrapper(props) {
    return (
        <>
            <div className={styles.sign_wrapper}>
                <div className={styles.sign_image}>
                    <div className={styles.black_cover}>
                        <Image src={image_logo_white}/>
                    </div>
                </div>
                <div className={styles.sign_children}>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>

        </>
    )
}
