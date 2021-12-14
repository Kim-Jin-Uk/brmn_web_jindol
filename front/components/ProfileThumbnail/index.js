import Image from "next/image"
// import { fileUrl } from "utils/api"
import styles from "./styles.module.scss"

export default function ProfileThumbnail(props) {
    const fileUrl = "";
    const size = props.size ? props.size : 30
    const borderRadius = props.borderRadius ? props.borderRadius : props.size
    return (
        <div
            className={styles.component}
            style={{width: size, height: size, backgroundImage: "url('" + fileUrl + props.image + "')", borderRadius: borderRadius}}
            onClick={props.onClick}
        >
        </div>
    )
}
