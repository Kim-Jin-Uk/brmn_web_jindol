import React, {useCallback, useState} from "react";
import Header from "../../components/Header";
import Link from "next/link";
import Button from "../../components/Button";
import sideStyles from "../../styles/Project.module.scss";
import styles from "../../styles/Profile.module.scss"
import cardStyle from '../../styles/Project.module.scss'
import Footer from "../../components/Footer";
import {Card, Dropdown, Menu as antMenu} from "antd";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import {fa} from "faker/lib/locales";

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

function InfoCard(props) {
    return(
        <div style={{marginBottom:"22px"}}>
            <div>
                <div className={styles.info_title}>{props.props.title}</div>
                {
                    props.props.date !== undefined && props.props.date !== null
                    ?(
                            <div className={styles.info_date}>{props.props.date}</div>
                        )
                    :(
                            <></>
                        )
                }
            </div>
            {
                props.props.subtitle !== undefined && props.props.subtitle !== null
                ?(
                        <div className={styles.info_subtitle}>{props.props.subtitle}</div>
                    )
                :(
                        <></>
                    )
            }
            {
                props.props.content !== undefined && props.props.content !== null
                    ?(
                        <div className={styles.info_content}>{props.props.content}</div>
                    )
                    :(
                        <></>
                    )
            }
        </div>
    )

}

const ProfileMenu = (
    <antMenu>
        <div style={{background:"#FFFFFF", boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)", borderRadius:"4px"}}>
            <div className={styles.hover_btn}>프로필 사진 변경</div>
            <div className={styles.hover_btn}>기본 이미지로 변경</div>
        </div>
    </antMenu>
)

const ProfileProject = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(false)
    const [isMe,setIsMe] = useState(true)
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

    const [equipList,setEquipList] = useState([
        {title:"기타",content:"EPIPHONE 어쿠스틱기타 EL-00 Pro"},
        {title:"믹서",content:"Yamaha MG166CX-USB"},
    ])
    const [equipOpen,setEquipOpen] = useState(true)

    const [techList,setTechList] = useState([
        {title:"Logic Pro X",content:"협업 시 원활한 소통이 가능합니다."},
        {title:"피아노 연주",content:"다양한 장르의 연주가 가능합니다."},
    ])

    const [techOpen,setTechOpen] = useState(true)

    const [careerList,setCareerListList] = useState([
        {title:"SM 엔터테인먼트",date:"2020.05 - 현재",subtitle:"사운드 엔지니어",content:"녹음기기 전반을 조작하며 음의 캐릭터, 밸런스를 결정하는 일을 담당했습니다."},
        {title:"음악 입시 작곡 학원",date:"2018.02",subtitle:"작곡 선생님",content:"입시 학원에서 학생들을 지도했습니다."},
        {title:"SM 엔터테인먼트",date:"2020.05 - 현재",subtitle:"사운드 엔지니어",content:"녹음기기 전반을 조작하며 음의 캐릭터, 밸런스를 결정하는 일을 담당했습니다."},
        {title:"음악 입시 작곡 학원",date:"2018.02",subtitle:"작곡 선생님",content:"입시 학원에서 학생들을 지도했습니다."},
        {title:"SM 엔터테인먼트",date:"2020.05 - 현재",subtitle:"사운드 엔지니어",content:"녹음기기 전반을 조작하며 음의 캐릭터, 밸런스를 결정하는 일을 담당했습니다."},
        {title:"음악 입시 작곡 학원",date:"2018.02",subtitle:"작곡 선생님",content:"입시 학원에서 학생들을 지도했습니다."},
    ])

    const [careerOpen,setCareerOpen] = useState(true)

    const [eduList,setEduListList] = useState([
        {title:"건국대학교",date:"2020.05 - 0000.00",subtitle:"전공학과"},
        {title:"안녕고등학교",date:"2018.02 - 0000.00",subtitle:"전공학과"},
    ])

    const [eduOpen,setEduOpen] = useState(true)

    const [awardList,setAwardListList] = useState([
        {title:"건국대학교",date:"2020.05 - 0000.00",subtitle:"사운드 엔지니어",content:"녹음기기 전반을 조작하며 음의 캐릭터, 밸런스를 결정하는 일을 담당했습니다."},
        {title:"안녕고등학교",date:"2018.02 - 0000.00",subtitle:"작곡 선생님",content:"입시 학원에서 학생들을 지도했습니다."},
    ])

    const [awardOpen,setAwardOpen] = useState(true)

    const [createList,setCreateListList] = useState([
        {title:"건국대학교",date:"2020.05 - 0000.00",subtitle:"사운드 엔지니어",content:"녹음기기 전반을 조작하며 음의 캐릭터, 밸런스를 결정하는 일을 담당했습니다."},
        {title:"안녕고등학교",date:"2018.02 - 0000.00",subtitle:"작곡 선생님",content:"입시 학원에서 학생들을 지도했습니다."},
    ])

    const [createOpen,setCreateOpen] = useState(true)


    const onClickMoreBtn = useCallback((setOpen) => {
        setOpen(false)
    },[equipOpen,techOpen,careerOpen,eduOpen,awardOpen,createOpen])

    const onClickUnMoreBtn = useCallback((setOpen) => {
        setOpen(true)
    },[equipOpen,techOpen,careerOpen,eduOpen,awardOpen,createOpen])

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
            <div style={{background:"#FAFAFA", minHeight:"calc(100vh - 92px)"}}>
                {
                    isMe
                        ?(
                            <div className={styles.profile_wrapper}>
                                <div className={styles.profile_top_wrapper}>
                                    <div className={styles.profile_top_icon_wrapper}>
                                        <img className={styles.profile_top_icon_img} src="https://file.mk.co.kr/meet/neds/2020/12/image_readtop_2020_1292239_16081264164474583.jpg"/>
                                        <Dropdown overlay={ProfileMenu} placement="bottomRight" arrow trigger={"hover"}>
                                            <div className={styles.profile_top_icon_change}></div>
                                        </Dropdown>

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
                                <div style={{paddingBottom:"80px"}} className={styles.profile_info_wrapper}>
                                    <div className={styles.profile_profile_wrapper}>
                                        <div className={styles.profile_profile_top_wrapper}>
                                            <div className={styles.profile_profile_top_name}>권태익</div>
                                            <div className={styles.profile_profile_top_sub}>position</div>
                                            <div className={styles.profile_profile_top_sub}>job</div>
                                            <div className={styles.profile_profile_top_sub}>location</div>
                                            <div style={{marginTop:"24px"}}>
                                                <div className={styles.profile_profile_top_follow}>팔로워</div>
                                                <div className={styles.profile_profile_top_follow_num}>number</div>
                                            </div>
                                            <div style={{marginTop:"1px"}}>
                                                <div className={styles.profile_profile_top_follow}>팔로잉</div>
                                                <div className={styles.profile_profile_top_follow_num}>number</div>
                                            </div>
                                            <div className={styles.profile_sns_wrapper}>
                                                <Link href={"/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                <Link href={"/"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                <Link href={"/"}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                                <Link href={"/"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                <Link href={"/"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.info_card}>
                                        <div className={styles.info_card_title}>소개</div>
                                        <div className={styles.info_card_content}>가장 낮은 곳에 닿기 전, 2층과3층사이입니다가장 낮은 곳에 닿기 전, 2층과3층사이입니다가장 낮은 곳에 닿기 전, 2층과3층사이입니다가장 낮은 곳에 닿기 전, 2층과3층사이입니다가장 낮은 곳에 닿기 전, 2층과3층사이입니다</div>
                                    </div>
                                    {/*equip*/}
                                    {
                                        equipList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                equipList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>장비</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={equipList[0]}></InfoCard>
                                                            <InfoCard props={equipList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>장비</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                equipOpen
                                                                    ?(
                                                                       <>
                                                                           <InfoCard props={equipList[0]}></InfoCard>
                                                                           <InfoCard props={equipList[1]}></InfoCard>
                                                                           <div className={styles.more_btn} onClick={() => onClickMoreBtn(setEquipOpen)}>
                                                                               <div>더보기</div>
                                                                               <div className={styles.more_btn_icon}></div>
                                                                           </div>
                                                                       </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {equipList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setEquipOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }

                                    {/*tech*/}
                                    {
                                        techList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                techList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>기술</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={techList[0]}></InfoCard>
                                                            <InfoCard props={techList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>기술</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                techOpen
                                                                    ?(
                                                                        <>
                                                                            <InfoCard props={techList[0]}></InfoCard>
                                                                            <InfoCard props={techList[1]}></InfoCard>
                                                                            <div className={styles.more_btn} onClick={() => onClickMoreBtn(setTechOpen)}>
                                                                                <div>더보기</div>
                                                                                <div className={styles.more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {techList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setTechOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }

                                    {/*career*/}
                                    {
                                        careerList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                careerList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>근무 경력</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={careerList[0]}></InfoCard>
                                                            <InfoCard props={careerList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>근무 경력</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                careerOpen
                                                                    ?(
                                                                        <>
                                                                            <InfoCard props={careerList[0]}></InfoCard>
                                                                            <InfoCard props={careerList[1]}></InfoCard>
                                                                            <div className={styles.more_btn} onClick={() => onClickMoreBtn(setCareerOpen)}>
                                                                                <div>더보기</div>
                                                                                <div className={styles.more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {careerList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setCareerOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }

                                    {/*edu*/}
                                    {
                                        eduList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                eduList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>학력</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={eduList[0]}></InfoCard>
                                                            <InfoCard props={eduList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>학력</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                eduOpen
                                                                    ?(
                                                                        <>
                                                                            <InfoCard props={eduList[0]}></InfoCard>
                                                                            <InfoCard props={eduList[1]}></InfoCard>
                                                                            <div className={styles.more_btn}  onClick={() => onClickMoreBtn(setEduOpen)}>
                                                                                <div>더보기</div>
                                                                                <div className={styles.more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {eduList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setEduOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }

                                    {/*award*/}
                                    {
                                        awardList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                awardList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>수상</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={awardList[0]}></InfoCard>
                                                            <InfoCard props={awardList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>수상</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                awardOpen
                                                                    ?(
                                                                        <>
                                                                            <InfoCard props={awardList[0]}></InfoCard>
                                                                            <InfoCard props={awardList[1]}></InfoCard>
                                                                            <div className={styles.more_btn} onClick={() => onClickMoreBtn(setAwardOpen)}>
                                                                                <div>더보기</div>
                                                                                <div className={styles.more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {awardList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setAwardOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }

                                    {/*create*/}
                                    {
                                        createList.length < 1
                                            ?(
                                                <></>
                                            )
                                            :(
                                                createList.length < 3
                                                    ?(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>제작</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            <InfoCard props={createList[0]}></InfoCard>
                                                            <InfoCard props={createList[1]}></InfoCard>
                                                        </div>
                                                    )
                                                    :(
                                                        <div className={styles.info_card}>
                                                            <div className={styles.info_card_title}>제작</div>
                                                            <div style={{marginTop:"20px"}}></div>
                                                            {
                                                                createOpen
                                                                    ?(
                                                                        <>
                                                                            <InfoCard props={createList[0]}></InfoCard>
                                                                            <InfoCard props={createList[1]}></InfoCard>
                                                                            <div className={styles.more_btn} onClick={() => onClickMoreBtn(setCreateOpen)}>
                                                                                <div>더보기</div>
                                                                                <div className={styles.more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    :(
                                                                        <>
                                                                            {createList.map((props, index) => (
                                                                                <>
                                                                                    <InfoCard props={props}></InfoCard>
                                                                                </>
                                                                            ))}
                                                                            <div className={styles.un_more_btn} onClick={() => onClickUnMoreBtn(setCreateOpen)}>
                                                                                <div>접기</div>
                                                                                <div className={styles.un_more_btn_icon}></div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }


                                                        </div>
                                                    )
                                            )
                                    }



                                </div>
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
                                                <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}/>
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
            <Footer></Footer>
        </>
    )
}

export default ProfileProject
