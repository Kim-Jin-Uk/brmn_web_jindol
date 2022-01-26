import React, { useEffect } from 'react'
import useScript from "../../hooks/use-script"
import styles from "../../styles/ProjectDetail.module.scss";

const KakaoShareButton = (props) => {
    console.log(props)
    useScript('https://developers.kakao.com/sdk/js/kakao.js')

    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (window.Kakao) {
            const kakao = window.Kakao
            // 중복 initialization 방지
            if (!kakao.isInitialized()) {
                // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
                kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY)
            }

            kakao.Link.createDefaultButton({
                // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: props.title,
                    description: props.hash,
                    imageUrl: props.url, // i.e. process.env.FETCH_URL + '/logo.png'
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            })
        }
    }

    return (
        <div className="kakao-share-button" className={styles.kakako_wrapper}>
            {/* Kakao share button */}
            <button className={styles.kakao_btn} id="kakao-link-btn">
                <div className={styles.kakao_icon} />
            </button>
        </div>
    )
}

export default KakaoShareButton
