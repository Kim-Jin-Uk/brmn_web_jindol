import React, {useCallback, useEffect, useState} from "react"
import Header from "../../components/Header";
import styles from "../../styles/ProjectDetail.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import {createGlobalStyle} from "styled-components";
import sideStyles from "../../styles/Project.module.scss";
import Image from "next/image"
import {Modal, Popover} from "antd";
import Router from "next/router";


import {
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
import useScript from "../../hooks/use-script";
import KakaoShareButton from "../../components/ShareBtn/KakaoShareButton";

function ShareGroup(props){
    useScript('https://developers.kakao.com/sdk/js/kakao.js')
    const currentUrl = window.location.href
    const handleCopyClipBoard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            alert('링크가 복사되었습니다');
        } catch (error) {
            console.log(error)
        }
    };
    return(
        <div className={styles.share_wrapper}>
            <div className={styles.default_icon} onClick={handleCopyClipBoard}></div>
            <KakaoShareButton title={props.title} hash={props.hash} />
            <FacebookShareButton style={{ marginRight: "20px" }} url={currentUrl}>
                <div className={styles.facebook_icon}></div>
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl}>
                <div className={styles.twitter_icon}></div>
            </TwitterShareButton>
        </div>
    )
}

const Global = createGlobalStyle`
  body {
    background: #fafafa;
  }

  .ant-popover-inner-content {
    height: 76px;
    padding: 8px 0;
  }

  .ant-modal-content {
    border-radius: 4px;
    overflow: hidden;
  }

  .ant-modal {
    background: none;
    width: calc(100% - 32px) !important;
    max-width: 500px;
    min-width: 280px;
    margin: 0 auto;
  }

  .ant-modal-close {
    display: none;
  }

  .ant-modal-header {
    padding: 28px 0 8px;
    margin-left: 20px;
    margin-right: 20px;
    border-bottom: 1px solid #e8e8e8;

    > div {
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 130%;
      color: #1D1D1D;
    }
  }

  .ant-modal-body {
    padding: 12px 0px 20px;
    border-bottom: 1px solid #e8e8e8;
    >span{
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 150%;
      color: #1D1D1D;
    }
  }
  
  .ant-modal-footer{
    background: #fafafa;
    height: 60px;
    padding: 12px 20px;
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
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [shareVisible,setShareVisible] = useState(false)
    const [popVisible,setPopVisible] = useState(false)
    const [hashList, setHashList] = useState([
        "#2층과3층사이","#2f3f","#발라드","#영어가사","#커버","#노래영상"
    ])
    const [defaultUrl, setDefaultUrl] = useState("")
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

    const handleVisibleChange = (e) => {
        setPopVisible(e);
    };

    const onClickEditBtn = () => {
        setPopVisible(false)
        Router.push("/project/edit")
    }

    const onClickRemoveBtn = () => {
        setPopVisible(false)
        setDeleteVisible(true)
    }

    const onClickCloseBtn = () => {
        setDeleteVisible(false)
    }

    const onClickDeleteBtn = () => {
        setDeleteVisible(false)
    }

    const handleShareOk = () => {
        setShareVisible(false)
    }

    const handleShareCancel = () => {
        setShareVisible(false)
    }

    const handleDeleteOk = () => {
        setDeleteVisible(false)
    }

    const handleDeleteCancel = () => {
        setDeleteVisible(false)
    }

    const onClickShareBtn = () => {
        setShareVisible(true)
    }

    useEffect(() => {
        setDefaultUrl(window.location.href)
    })


    useScript('https://developers.kakao.com/sdk/js/kakao.js')

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
                    {
                        hashList.map((v) => (
                            <li><Link href={"/"}><a>{v}</a></Link></li>
                        ))
                    }
                </ul>
                <div className={styles.main_title}
                     style={{marginTop:"4px", fontSize:"20px"}}
                >프로젝트 제목</div>
                <div className={styles.main_info}>
                    <div>디자인</div>
                    <div>조회수 44,592회</div>
                    <div>2021. 5. 8.</div>
                    <div className={styles.main_btn_group}>
                        <div className={styles.main_share_btn} onClick={onClickShareBtn}></div>
                        {
                            isMe
                                ? (
                                    <Popover placement="bottomRight" title={""} content={
                                        <>
                                            <div className={styles.popover_content}
                                            onClick={onClickEditBtn}>편집</div>
                                            <div className={styles.popover_content}
                                            onClick={onClickRemoveBtn}>삭제</div>
                                        </>
                                    } trigger="click"
                                         visible={popVisible}
                                         onVisibleChange={handleVisibleChange}
                                    >
                                        <div className={styles.main_info_btn}></div>
                                    </Popover>
                                )
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

            <Modal
                visible={deleteVisible}
                title="삭제하기"
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                footer={[
                    <Button className={`${styles.pop_btn} ${styles.delete_btn}`} onClick={onClickDeleteBtn}>
                        삭제
                    </Button>,
                    <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={onClickCloseBtn}>
                        취소
                    </Button>,
                ]}
            >
                <div className={styles.delete_contents}>
                    해당 내용을 삭제하시겠습니까?
                    <br/>삭제된 정보는 다시 복구하실 수 없습니다.
                </div>
            </Modal>

            <Modal
                visible={shareVisible}
                title=""
                footer=""
                onOk={handleShareOk}
                onCancel={handleShareCancel}
            >
                <div>
                    <div className={styles.share_title}>프로젝트 공유</div>
                    <ShareGroup title={"프로젝트 제목"} hash={hashList.join(" ")}></ShareGroup>
                    <div className={styles.name_wrapper}>
                        <div>퍼가기</div>
                        <div>카카오톡</div>
                        <div>facebook</div>
                        <div>twitter</div>
                    </div>
                    <div>
                        <div className={styles.link}>{defaultUrl}</div>
                    </div>
                </div>
            </Modal>

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
