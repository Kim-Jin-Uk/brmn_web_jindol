import React, {useCallback, useEffect, useState} from "react"
import Header from "../../components/Header";
import styles from "../../styles/ProjectDetail.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import {createGlobalStyle} from "styled-components";
import sideStyles from "../../styles/Project.module.scss";
import Image from "next/image"

const Global = createGlobalStyle`
  body{
    background: #fafafa;
  }
`

function ProjectCard(props){
    const [youtubeUrl, setYoutubeUrl] = useState("")
    const [textList, setTextList] = useState([])
    useEffect(() => {
        if (props.props.type === "youtube"){
            const propList = props.props.url.toString().split("/")
            if (propList[propList.length-1].includes("watch?v=")){
                setYoutubeUrl(`https://www.youtube.com/embed/${propList[propList.length-1].replace("watch?v=","")}`)
            }else {
                setYoutubeUrl(`https://www.youtube.com/embed/${propList[propList.length-1]}`)
            }
        }
    },[props])

    return(
        <>
            {{
                "img":(
                    <>
                        <img className={styles.card_img} src={props.props.url}/>
                    </>
                ),"youtube":(
                    <>
                        <iframe className={styles.card_youtube} width="100%" height="calc(100% * 210 / 117.5)" src={youtubeUrl}
                                frameBorder="none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </>
                ),"text":(
                    <>
                        <div className={styles.card_img}>{props.props.url}</div>
                    </>
                )
            }[props.props.type]}
        </>
    )
}

function TechBtn(props){
    return(
        <>
            <Button className={styles.tech_btn}>{props.props}</Button>
        </>
    )
}

function CopyrightBtn(props){
    return(
        <div style={{marginLeft:"4px",marginRight:"4px",display:"inline-block"}}>
            <Image src={require(`../../images/project/${props.props}.svg`).default}></Image>
        </div>
    )
}

const ProjectPage = () => {
    const [openAble,setOpenAble] = useState(true)
    const [isLoggedin,setIsLoggedin] = useState(true)
    const [isMe,setIsMe] = useState(true)
    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const [projectList,setProjectList] = useState([
        {type:"img",url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"},
        {type:"text",
            url:"텍스트 입력텍[스트 입력텍###스트 <b>입력      음악의 가사를 입력합니다\n" +
                ".<br>음\n" +
                "악의 가사를 입]력합니다.음악의 가사를 입#력합니다. 음악의 가사를 입력합니다.음악의 가사를 입력합니다.<b>음악의 가사를 입력합니다.음악의 가사를 입력합니<br>다.<b>음\t악의 가사를 #[입력합니다. 음악의 #가사를 ]<br>입력합니다. 음악의 가사를 입력합니다."
        },
        {type:"img",url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"},
        {type:"youtube",url:"https://www.youtube.com/watch?v=A4RDyzQsI7U"},
        {type:"text",
            url:"텍스트 입력텍스트 입력텍스트 입력 음악의 가사를 입력합니다.음악의 가사를 입력합니다.음악의 가사를 입력합니다. 음악의 가사를 입력합니다.음악의 가사를 입력합니다.음악의 가사를 입력합니다.음악의 가사를 입력합니다.음악의 가사를 입력합니다. 음악의 가사를 입력합니다. 음악의 가사를 입력합니다."
        },
        {type:"img",url:"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"},
        {type:"youtube",url:"https://youtu.be/A4RDyzQsI7U"},
    ])

    const [techList, setTechList] = useState([
        "Logic Pro X", "신디사이저", "Cubase"
    ])

    const [copyrightList, setCopyrightList] = useState([
        "cc", "by", "sa", "nd", "nc",
    ])

    return(
        <>
            <Global></Global>
            <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>

            <div className={styles.main_wrapper}>
                <div className={styles.main_title}>프로젝트 제목</div>
                <div className={styles.main_field}>분야</div>
                {projectList.map((props, index) => (
                    <>
                        <ProjectCard props={props}></ProjectCard>
                    </>
                ))}
                <ul className={styles.main_hashtag_wrapper}>
                    <li><Link href={"/"}><a>#2층과3층사이</a></Link></li>
                    <li><Link href={"/"}><a>#2f3f</a></Link></li>
                    <li><Link href={"/"}><a>#발라드</a></Link></li>
                    <li><Link href={"/"}><a>#영어가사</a></Link></li>
                    <li><Link href={"/"}><a>#커버</a></Link></li>
                    <li><Link href={"/"}><a>#노래영상</a></Link></li>
                </ul>
                <div className={styles.main_title}
                     style={{marginTop:"4px", fontSize:"20px"}}
                >프로젝트 제목</div>
                <div className={styles.main_info}>
                    <div>디자인</div>
                    <div>조회수 44,592회</div>
                    <div>2021. 5. 8.</div>
                    <div className={styles.main_btn_group}>
                        <div className={styles.main_share_btn}></div>
                        {isMe
                                ? <div className={styles.main_info_btn}></div>
                                : <></>
                        }
                    </div>
                </div>

                <div className={styles.main_artist}>
                    <div className={styles.main_artist_title}>참여 아티스트</div>
                    <div className={styles.main_artist_name}>권태익</div>
                    <div className={styles.main_artist_info}>작곡가, 작사가, 프로듀서, 보컬</div>
                    <img className={styles.main_artist_img} src={"https://cdn.crowdpic.net/list-thumb/thumb_l_D623AE308211C3678E61EC0E3FF3C969.jpg"}></img>
                </div>

                <div className={styles.main_artist}>
                    <div className={styles.main_artist_title}>기술</div>
                    <div style={{marginTop:"16px", marginLeft:"-3px"}}>
                        {techList.map((props, index) => (
                            <>
                                <TechBtn props={props}></TechBtn>
                            </>
                        ))}
                    </div>
                </div>

                <div className={styles.main_img_wrapper}>
                    {copyrightList.map((props, index) => (
                        <>
                            <CopyrightBtn props={props}></CopyrightBtn>
                        </>
                    ))}
                </div>

            </div>

            <Link href={"/project"}><a><div className={styles.back_btn}></div></a></Link>

            <>
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
            </>
            <Footer></Footer>
        </>
    )
}

export default ProjectPage
