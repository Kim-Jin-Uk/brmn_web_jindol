import React from "react";
import Link from 'next/link';
import Header from "../components/Header";
import styles from "../styles/MainIntro.module.scss";

const Home = () => {
    return(
        <>
            <Header param={"guide"}/>
            <div style={{minWidth:"360px"}}>
                {/*main title*/}
                <div className={styles.main_title}></div>
                {/*intro top btn*/}
                <div className={styles.main_contents_wrapper}>
                    <div className={styles.content_1}>
                        <Link href={"/service/client/intro"}><a>
                            <div className={styles.content_title}>메이커 채용하기</div>
                            <div className={`${styles.content_img} ${styles.img_1}`}></div>
                            <div className={styles.content_text}>
                                당신의 콘텐츠에
                                <br/>
                                가장 적합한
                                <br/>
                                메이커를 만나보세요
                            </div>
                        </a></Link>
                    </div>

                    <div className={styles.content_2}>
                        <Link href={"/service/maker/intro"}><a>
                            <div className={styles.content_title}>메이커 파트너스</div>
                            <div className={`${styles.content_img} ${styles.img_2}`}></div>
                            <div className={styles.content_text}>
                                당신의 재능을
                                <br/>
                                꽃피울 수 있는
                                <br/>
                                콘텐츠를 시작하세요
                            </div>
                        </a></Link>
                    </div>

                    <div className={styles.content_3}>
                        <Link href={"https://melon-railway-ee2.notion.site/brmn-db4220eec1f44a5db4239e09dad53614"}><a>
                            <div className={styles.content_title}>회사 소개</div>
                            <div className={`${styles.content_img} ${styles.img_3}`}></div>
                            <div className={styles.content_text}>
                                브레멘과 함께
                                <br/>
                                다가올 콘텐츠 제작의
                                <br/>
                                미래를 만나보세요
                            </div>
                        </a></Link>
                    </div>
                </div>
                {/*intro bottom btn*/}
                <Link href={"https://melon-railway-ee2.notion.site/brmn-db4220eec1f44a5db4239e09dad53614"} target="_blank" rel="noreferrer noopener"><a>
                    <div className={styles.match_btn}>
                        <div className={styles.btn_text_1}></div>
                        <div className={styles.btn_text_2}></div>
                    </div>
                </a></Link>
                {/*bottom area*/}
                <div className={styles.bmcc}></div>

                <iframe
                    width="560" height="315" src="https://www.youtube.com/embed/MDB_iLkmaP4"
                    title="YouTube video player" frameBorder="0px"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen

                    className={styles.youtube}
                ></iframe>
            </div>
        </>
    )
}

export default Home
