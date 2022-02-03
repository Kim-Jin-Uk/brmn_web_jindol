
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./styles.module.scss"

export default function DropdownMenu(props) {
    const [isOpen, setIsOpen] = useState(false)
    const options = props.options || []
    const router = useRouter()
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const click = (item) => {
        setIsOpen(false)
        if(item.url) {
            router.push(item.url)
        }
        if(item.onClick) {
            item.onClick()
        }
    }
    return (
        <div>
            <div onClick={toggle}>
                {props.children}
            </div>
            {
                isOpen && (
                    <div className={styles.menu}>
                        {
                            options.map(group => {
                                return (
                                    <div>
                                        {
                                            group.map(item => {
                                                return (
                                                    <div onClick={()=>click(item)}>{item.text}</div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
