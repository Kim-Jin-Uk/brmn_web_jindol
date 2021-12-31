import Image from "next/image"
import styles from "./styles.module.scss"

export default function CircleMenu(props) {
    return (
        <div className={styles.menu}>
            <div
                key={0}
                className={props.active === 0 ? styles.active : ""}
                onClick={()=>props.onClick(0)}
            >
                전체
            </div>
            {
                props.items?.map(item => {
                    return (
                        <div
                            key={item.key}
                            className={props.active === item.key ? styles.active : ""}
                            onClick={()=>props.onClick(item.key)}
                        >
                            {item.text}
                        </div>
                    )
                })
            }
        </div>
    )
}