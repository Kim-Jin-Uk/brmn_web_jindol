import React from "react";
import Header from "../../components/Header";
import Link from "next/link"
import styles from "../../styles/MainIntro.module.scss"

const Main = () => {

    return(
        <>
            <Header></Header>
            {/*main title*/}
            <div className={styles.main_title}>지금 우리와 함께 하세요</div>
            {/*intro top btn*/}
            <div className={styles.main_contents_wrapper}>
                <div>
                    <Link href={"/"}><a>
                        <div>title</div>
                        <div>img</div>
                        <div>text</div>
                    </a></Link>
                </div>

                <div>
                    <Link href={"/"}><a>
                        <div>title</div>
                        <div>img</div>
                        <div>text</div>
                    </a></Link>
                </div>

                <div>
                    <Link href={"/"}><a>
                        <div>title</div>
                        <div>img</div>
                        <div>text</div>
                    </a></Link>
                </div>
            </div>
            {/*intro content*/}
            <div className={styles.main_intro_content}>
                다양한 콘텐츠가
                만들어지는
                세상. 당신의
                아이디어를
                함께할 사람들을
                찾아보세요.
            </div>
            {/*intro bottom btn*/}
            <Link href={"/"}><a><div></div></a></Link>
            {/*bottom area*/}
            <div></div>

            <iframe
                width="100%" height="500px" src="https://www.youtube.com/embed/sxmCmaHJ0kc"
                frameBorder={"none"}
                >
            </iframe>
        </>
    )
}

export default Main
