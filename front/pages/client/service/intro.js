import React from 'react'
import Header from "../../../components/Header";
import styles from '../../../styles/Intro.module.scss'
import Link from 'next/link';

const Intro = () => {

    return(
        <>
            <Header></Header>
            <div className={styles.background_top}>
                <div className={styles.content_cover_top}>
                    <div className={styles.content_top}>
                        믿을 수 있는 역량을 지닌 메이커들과 콘텐츠를 제작해 보세요. 메이커를 구하는 데에 시간을 쏟을 필요 없이 조건에 맞게 선별된 메이커를 추천받을 수 있습니다.
                    </div>
                </div>
            </div>
            <div className={styles.contents_cover_middle}>
                <span>메이커 채용하기</span>
                <div className={styles.content_title_middle}>
                    당신의 콘텐츠에
                    <br/>
                    가장 적합한
                    <br/>
                    메이커를 만나보세요
                </div>
            </div>
            {/*contents*/}
            <div className={styles.contents_group_middle}>
                <div className={styles.content_1_middle}>
                    <div className={styles.sub_1_1_middle}>
                        <div className={styles.sub_1_1}>
                            <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_1}`}></div>
                            <div className={styles.sub_1_1_title}>역할</div>
                        </div>
                        <div className={styles.sub_1_1_content}>비주얼 이미지 디렉팅, 촬영 기획</div>
                    </div>

                    <div className={styles.sub_1_1_middle}>
                        <div className={styles.sub_1_1}>
                            <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_2}`}></div>
                            <div className={styles.sub_1_1_title}>포지션</div>
                        </div>
                        <div className={styles.sub_1_1_content}>아트디렉터</div>
                    </div>

                    <div className={styles.sub_1_1_middle}>
                        <div className={styles.sub_1_1}>
                            <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_3}`}></div>
                            <div className={styles.sub_1_1_title}>기간</div>
                        </div>
                        <div className={styles.sub_1_1_content}>2022.01.02&emsp;-&emsp;2022.01.20</div>
                    </div>

                    <div className={styles.sub_1_1_middle}>
                        <div className={styles.sub_1_1}>
                            <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_4}`}></div>
                            <div className={styles.sub_1_1_title}>페이</div>
                        </div>
                        <div className={styles.sub_1_1_content}>500,000원 이내 조건부 협의</div>
                    </div>
                    <div className={styles.sub_1_text}>
                        조건에 맞는 메이커를
                        <br/>
                        시간부터 비용까지
                        <br/>
                        효율적으로
                    </div>
                </div>
                <div>content2</div>
                <div>content3</div>
            </div>
            {/*manuals*/}
            <div>
                <div>manual1</div>
                <div>manual2</div>
                <div>manual3</div>
                <div>manual4</div>
                <div>manual5</div>
            </div>
        </>
    )
}

export default Intro
