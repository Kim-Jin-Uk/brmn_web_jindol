import React, {useCallback, useState} from "react";
import Header from "../../components/Header";
import Link from "next/link";
import Button from "../../components/Button";
import sideStyles from "../../styles/Project.module.scss";
import styles from "../../styles/Profile.module.scss"
import cardStyle from '../../styles/Project.module.scss'

function MainCard(props) {
    return(
        <>
            <div className={`${cardStyle.card_group} ${styles.card_group} `}>
                <button className={`${cardStyle.card_button} `}>
                    <div className={`${cardStyle.card_main} `}>
                        <img src={props.card.imgUrl} className={`${cardStyle.card_main_img} `}></img>
                        <div className={`${cardStyle.card_main_background} `}>
                            <div className={`${cardStyle.card_main_background_title} `}>{props.card.title}</div>
                        </div>
                    </div>
                    <div className={`${cardStyle.card_meta} `}>
                        <div className={`${cardStyle.card_meta_title} `}>{props.card.title}</div>
                        <div>
                            <img src={props.card.profImg} className={`${cardStyle.card_meta_img} `}></img>
                            <div className={`${cardStyle.card_meta_nickname} `}>{props.card.nickname}</div>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}

const ProfileProject = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)
    const [isMe,setIsMe] = useState(false)
    const [navActive,setNavActive] = useState({
        "n1": true,
        "n2": false,
    })
    const card = {
        imgUrl:"http://blog.jinbo.net/attach/615/200937431.jpg",
        title:"사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 쿠쿠루 삥뽕",
        profImg:"https://bit.ly/2V1ipNj",
        nickname:"2층과3층사이"
    }
    const [cardList,setCardList] = useState([
        card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
        ,card,card,card,card,card,card,card,card,card
    ])

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onCLickNav = useCallback((name) => {
        const field = {}
        if (name === "n1"){
            field["n1"] = !navActive["n1"]
            field["n2"] = navActive["n1"]
        } else {
            field["n2"] = !navActive["n2"]
            field["n1"] = navActive["n2"]
        }
        setNavActive({...navActive, ...field})
    },[navActive])

    return(
        <>
            <Header openAble = {openAble} setOpenAble={setOpenAble}></Header>
            <div style={{background:"#C7C7C7"}}>
                {
                    isMe
                        ?(
                            <div className={styles.profile_wrapper}>
                                <div className={styles.profile_top_wrapper}>
                                    <div className={styles.profile_top_icon_wrapper}>
                                        <img className={styles.profile_top_icon_img} src="https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"/>
                                        <div className={styles.profile_top_icon_change}></div>
                                    </div>
                                    <div className={styles.profile_top_name}>권태익</div>
                                    <div className={styles.profile_top_sub}>position</div>
                                    <div className={styles.profile_top_sub}>job</div>
                                    <div className={styles.profile_top_sub}>location</div>
                                    <Button className={styles.profile_top_button}>
                                        <div className={styles.profile_top_button_icon}></div>
                                        <div className={styles.profile_top_button_text}>프로필 편집</div>
                                    </Button>
                                    <div>
                                        <div className={styles.profile_top_follow}>팔로워</div>
                                        <div className={styles.profile_top_follow_num}>follower number</div>
                                    </div>
                                    <div>
                                        <div className={styles.profile_top_follow}>팔로잉</div>
                                        <div className={styles.profile_top_follow_num}>following number</div>
                                    </div>
                                    <div className={styles.side_sns_wrapper}>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                        <Link href={"/"}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                    </div>
                                </div>
                            </div>
                        )
                        :(
                            <div className={styles.profile_wrapper}>
                                <div className={styles.profile_top_wrapper}>
                                    <div className={styles.profile_top_icon_wrapper}>
                                        <img className={styles.profile_top_icon_img} src="https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"/>
                                    </div>
                                    <div className={styles.profile_top_name}>권태익</div>
                                    <div className={styles.profile_top_sub}>position</div>
                                    <div className={styles.profile_top_sub}>job</div>
                                    <div className={styles.profile_top_sub}>location</div>
                                    <Button className={styles.profile_top_button_not_me}>
                                        <div className={styles.profile_top_button_icon_not_me}></div>
                                        <div className={styles.profile_top_button_text_not_me}>팔로우</div>
                                    </Button>
                                    <div>
                                        <div className={styles.profile_top_follow}>팔로워</div>
                                        <div className={styles.profile_top_follow_num}>follower number</div>
                                    </div>
                                    <div>
                                        <div className={styles.profile_top_follow}>팔로잉</div>
                                        <div className={styles.profile_top_follow_num}>following number</div>
                                    </div>
                                    <div className={styles.side_sns_wrapper}>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                        <Link href={"/"}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                        <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                    </div>
                                </div>
                            </div>
                        )
                }
                <div className={styles.middle_wrapper}>
                    <div className={styles.nav_wrapper}>
                        {
                            navActive['n1']
                                ?(
                                    <button className={styles.nav_active}
                                            onClick={() => {onCLickNav('n1')}}>
                                        <div>프로젝트</div>
                                    </button>
                                )
                                :(
                                    <button className={styles.nav}
                                            onClick={() => {onCLickNav('n1')}}>
                                        <div>프로젝트</div>
                                    </button>
                                )
                        }
                        {
                            navActive['n2']
                                ?(
                                    <button className={styles.nav_active}
                                            onClick={() => {onCLickNav('n2')}}>
                                        <div>프로필</div>
                                    </button>
                                )
                                :(
                                    <button className={styles.nav}
                                            onClick={() => {onCLickNav('n2')}}>
                                        <div>프로필</div>
                                    </button>
                                )
                        }
                    </div>
                    {
                        navActive["n1"]
                            ?(
                                <div className={`${cardStyle.card_wrapper} ${styles.card_wrapper}`}>
                                    {cardList.map((card, index) => (
                                        <>
                                            <MainCard card={card}></MainCard>
                                        </>
                                    ))}
                                </div>
                            )
                            :(
                                <></>
                            )
                    }
                </div>

            </div>


            {
                openAble
                    ?(
                        <></>
                    )
                    :(
                        <div className={sideStyles.side_menu_wrapper}>
                            <div className={sideStyles.side_right_wrapper}></div>

                            {
                                isLoggedin
                                    ?(
                                        <>
                                            <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>

                                                <div className={sideStyles.side_login_top}>
                                                    <img src={"https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"} className={sideStyles.side_login_top_img}></img>
                                                    <div className={sideStyles.side_login_top_info}>
                                                        <div className={sideStyles.side_login_top_nickname}>사용자 이름</div>
                                                        <div className={sideStyles.side_login_top_id}>userid@naver.com</div>
                                                    </div>
                                                    <button className={sideStyles.side_login_top_close} onClick={onClickClose}></button>
                                                </div>

                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_1}></div>
                                                    <div className={sideStyles.side_nav_content}>이용안내</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_2}></div>
                                                    <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_3}></div>
                                                    <div className={sideStyles.side_nav_content}>신청하기</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_4}></div>
                                                    <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_5}></div>
                                                    <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_6}></div>
                                                    <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                </a></Link>

                                                <div
                                                    style={{
                                                        position:"absolute",
                                                        bottom: "0px",
                                                        width:"100%",
                                                        minWidth:"320px"
                                                    }}>
                                                    <div className={sideStyles.side_link_wrapper}>
                                                        <Link href={"/"}><a>서비스소개</a></Link>
                                                        <Link href={"/"}><a>자주묻는질문</a></Link>
                                                        <Link href={"/"}><a>문의하기</a></Link>
                                                    </div>
                                                    <div className={sideStyles.side_sns_wrapper}>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                    </div>
                                                    <div className={sideStyles.side_bottom_content}>
                                                        Copyright brmn all right reserved
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    :(
                                        <>
                                            <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>
                                                <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>
                                                <div className={sideStyles.side_title} style={{minWidth:"320px"}}>
                                                    회원가입하고 다양한 메이커들과
                                                    <br/>
                                                    프로젝트를 시작하세요!
                                                </div>
                                                <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                    <div style={{display:"inline-block"}}><Button className={sideStyles.side_login}>로그인</Button></div>
                                                    <div style={{display:"inline-block", marginLeft:"12px"}}><Button className={sideStyles.side_signup}>회원가입</Button></div>
                                                </div>

                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_1}></div>
                                                    <div className={sideStyles.side_nav_content}>이용안내</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_2}></div>
                                                    <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                </a></Link>
                                                <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                    <div className={sideStyles.side_nav_3}></div>
                                                    <div className={sideStyles.side_nav_content}>신청하기</div>
                                                </a></Link>

                                                <div
                                                    style={{
                                                        position:"absolute",
                                                        bottom: "0px",
                                                        width:"100%",
                                                        minWidth:"320px"
                                                    }}>
                                                    <div className={sideStyles.side_link_wrapper}>
                                                        <Link href={"/"}><a>서비스소개</a></Link>
                                                        <Link href={"/"}><a>자주묻는질문</a></Link>
                                                        <Link href={"/"}><a>문의하기</a></Link>
                                                    </div>
                                                    <div className={sideStyles.side_sns_wrapper}>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                        <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                    </div>
                                                    <div className={sideStyles.side_bottom_content}>
                                                        Copyright brmn all right reserved
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }


                        </div>
                    )
            }
        </>
    )
}

export default ProfileProject
