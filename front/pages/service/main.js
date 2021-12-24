import React from "react";
import Header from "../../components/Header";
import Link from "next/link"
import styles from "../../styles/MainIntro.module.scss"

const Main = () => {

    return(
        <>
            <Header></Header>
            <div className={styles.main_title}>지금 우리와 함께 하세요</div>
            <div className={styles.main_contents_wrapper}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div>
                다양한 콘텐츠가
                만들어지는
                세상. 당신의
                아이디어를
                함께할 사람들을
                찾아보세요.
            </div>

            <Link href={"/"}><a><div></div></a></Link>
        </>
    )
}

export default Main
