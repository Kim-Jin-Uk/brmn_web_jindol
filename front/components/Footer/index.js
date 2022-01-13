import styles from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import icon_youtube from "./images/youtube.svg"
import icon_instagram from "./images/instagram.svg"
import icon_twitter from "./images/twitter.svg"
import icon_facebook from "./images/facebook.svg"
import icon_logo from "./images/smalllogo.svg"
import { useState } from "react"

export default function Footer(props) {
    const [isOpen, setIsOpen] = useState()
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={styles.footer_wrapper}>
            <br />
            {
                isOpen && (
                    <div className={styles.background} onClick={close}></div>
                )
            }
            <div className={styles.container}>
                {
                    isOpen && (
                        <div className={styles.box}>
                            <b>대표이사</b>: 김효재<br/>
                            서울특별시 광진구 천호대로 536 서림빌딩 6층<br/>
                            사업자등록번호 480-51-00697<br/>
                            <b>개인정보 관리책임자</b> 김효재
                        </div>
                    )
                }
                <div className={styles.component}>
                    <div>
                        <div className={styles.link} onClick={toggle}>브레멘 사업자정보</div>
                        <div><Link href="/agreements/use">이용약관</Link></div>
                        <div><Link href="/agreements/privacy">개인정보</Link></div>
                        <div><Link href="/agreements/service">고객센터</Link></div>
                    </div>
                    <div>
                        <a href="https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig" target="_blank" rel="noreferrer"><Image src={icon_youtube} /></a>
                        <a href="https://www.instagram.com/brmn.music/" target="_blank" rel="noreferrer"><Image src={icon_instagram} /></a>
                        <a href="https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312/" target="_blank" rel="noreferrer"><Image src={icon_facebook} /></a>
                        <a href="https://twitter.com/brmn_music" target="_blank" rel="noreferrer"><Image src={icon_twitter} /></a>
                        <a href="/"><Image src={icon_logo} /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 트위터
// https://twitter.com/brmn_music
// 페이스북
// https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312/
// 유튜브
// https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig
// 인스타
// https://www.instagram.com/brmn.music/
