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
import Router, {useRouter} from "next/router";


import {
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
import useScript from "../../hooks/use-script";
import KakaoShareButton from "../../components/ShareBtn/KakaoShareButton";
import {GET_MY_PROFILE_REQUEST, GET_OTHER_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../reducers/user";
import {
    ADD_VIEW_COUNT_REQUEST, DELETE_PROJECT_REQUEST,
    LOAD_PROJECT_DETAIL_REQUEST,
    LOAD_PROJECT_DETAIL_SUCCESS,
    LOAD_PROJECT_REQUEST
} from "../../reducers/project";
import {useDispatch, useSelector} from "react-redux";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import moment from "moment";
import 'moment/locale/ko'

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
            <KakaoShareButton title={props.title} hash={props.hash} url={props.url} />
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
        if (props.props.detail_type === "youtube"){
            setYoutubeUrl(`https://www.youtube.com/embed/${props.props.contents}`)
        }
    },[props])

    return(
        <>
            {{
                "image":(
                    <>
                        <img className={styles.card_img} src={props.props.contents}/>
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
                        <div className={styles.card_text} dangerouslySetInnerHTML={ {__html: props.props.contents} }></div>
                    </>
                )
            }[props.props.detail_type]}
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
    const router = useRouter()
    const [id,setId] = useState(router.query.id)
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile, logInDone} = useSelector((state) => state.user);
    const {loadProjectDetail,deleteProjectDone} = useSelector((state) => state.project);
    const [isMe,setIsMe] = useState(false)
    const [deleteVisible,setDeleteVisible] = useState(false)
    const [shareVisible,setShareVisible] = useState(false)
    const [popVisible,setPopVisible] = useState(false)
    const [fieldList, setFieldList] = useState([
    ])
    const [hashList, setHashList] = useState([
    ])
    const [defaultUrl, setDefaultUrl] = useState("")
    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const [projectList,setProjectList] = useState([
    ])

    const [techList, setTechList] = useState([
    ])

    const [copyrightList, setCopyrightList] = useState([
        "cc", "by", "sa", "nd", "nc",
    ])

    const handleVisibleChange = (e) => {
        setPopVisible(e);
    };

    const onClickEditBtn = () => {
        setPopVisible(false)
        Router.push(`/project/edit/${id}`).then((() =>window.scrollTo(0,0) ))
    }

    const onClickRemoveBtn = () => {
        setPopVisible(false)
        setDeleteVisible(true)
    }

    useEffect(() => {
        if (deleteProjectDone){
            setDeleteVisible(false)
            dispatch({
                type:LOAD_PROJECT_REQUEST,
                data:{email:loadProjectDetail.user.email}
            })
            Router.back()
        }
    },[deleteProjectDone])

    const onClickCloseBtn = () => {
        setDeleteVisible(false)
    }

    const onClickDeleteBtn = () => {
        dispatch({
            type:DELETE_PROJECT_REQUEST,
            data:{id:id}
        })
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

    useEffect(() => {
        if (!router.isReady) return
        setId(router.query.id)

    },[router.isReady])

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (id){
            const projectId = id
            dispatch({
                type:LOAD_PROJECT_DETAIL_REQUEST,
                data:{id:projectId}
            })
            dispatch({
                type:ADD_VIEW_COUNT_REQUEST,
                data:{id:id}
            })
        }
    },[id])

    useEffect(() => {
        if (user !== null){
            if (user === "not agreement"){
                dispatch({
                    type:LOG_OUT_REQUEST
                })
            }else {
                dispatch({
                    type:GET_MY_PROFILE_REQUEST,
                    data:user.email
                })
            }
        }
    },[user])

    useEffect(() => {
        if (user && loadProjectDetail){
            if (user.email === loadProjectDetail.user.email){
                setIsMe(true)
            }else {
                setIsMe(false)
            }
        }else {
            setIsMe(false)
        }
        if (loadProjectDetail){
            const coprightText = loadProjectDetail.copyright.toLowerCase().split("(")[1].replace(')','').replace(' ','-')
            setCopyrightList(coprightText.split('-'))
            setProjectList(loadProjectDetail.projectdetails)
            let hash = []
            let field = []
            let tech = []
            for (let i = 0; i < loadProjectDetail.tags.length; i++) {
                const tagItem = loadProjectDetail.tags[i]
                if (tagItem.tag_type === "field"){
                    field.push(tagItem.tag_name)
                }
                if (tagItem.tag_type === "hash"){
                    hash.push("#"+tagItem.tag_name)
                }
                if (tagItem.tag_type === "tech"){
                    tech.push(tagItem.tag_name)
                }
            }
            setFieldList(field)
            setHashList(hash)
            setTechList(tech)
        }
    },[user,loadProjectDetail])

    return(
        <>
            <Global></Global>
            <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble}/>

            <div className={styles.main_wrapper}>
                <div className={styles.main_title}>{
                    loadProjectDetail
                        ? loadProjectDetail.title
                        :""
                }</div>
                <div className={styles.main_field}>분야</div>
                {projectList.map((props, index) => (
                    <>
                        <ProjectCard props={props}></ProjectCard>
                    </>
                ))}
                <div style={{marginTop:"28px"}}></div>
                <ul className={styles.main_hashtag_wrapper}>
                    {
                        hashList.map((v) => (
                            <li><Link href={"/"}><a>{v}</a></Link></li>
                        ))
                    }
                </ul>
                <div className={styles.main_title}
                     style={{marginTop:"4px", fontSize:"20px"}}
                >{
                    loadProjectDetail
                        ? loadProjectDetail.title
                        : ""
                }</div>
                <div className={styles.main_info}>
                    <div>{fieldList.join(", ")}</div>
                    <div>{
                        loadProjectDetail
                            ? `조회수 ${loadProjectDetail.view_count}회`
                            : `조회수 0회`
                    }</div>
                    <div>{
                        loadProjectDetail
                            ? moment(loadProjectDetail.updatedAt).format('YYYY.MM.DD')
                            : "2022. 1. 1."
                    }</div>
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
                    <div className={styles.main_artist_name}>{
                        loadProjectDetail
                            ? loadProjectDetail.user.profile.nickname
                            : ""
                    }</div>
                    <div className={styles.main_artist_info}>{
                        loadProjectDetail
                            ? loadProjectDetail.user.profile.job
                            : ""
                    }</div>
                    <Link href={`/profile/${
                        loadProjectDetail
                            ? loadProjectDetail.user.email
                            : 1
                    }`}><a>
                        <img className={styles.main_artist_img} src={
                            loadProjectDetail
                                ? loadProjectDetail.user.profile.profile_img
                                : ""
                        }></img>
                    </a></Link>
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
                    <ShareGroup
                        title={loadProjectDetail
                            ? loadProjectDetail.title
                            : ""}
                        hash={"#brmn "+hashList.join(" ")}
                        url={loadProjectDetail
                            ? loadProjectDetail.thumb_img
                            : "https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/brmn_icon.png"}
                    ></ShareGroup>
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
                                    logInDone
                                        ?(
                                            <>
                                                <div style={{height:"100vh"}}  className={sideStyles.side_wrapper}>

                                                    <div className={sideStyles.side_login_top}>
                                                        <div className={sideStyles.side_login_top_img}>
                                                            <Link href={
                                                                user && user.email
                                                                    ?`/profile/${user.email}`
                                                                    :`/profile/1`
                                                            }><a>
                                                                <ProfileThumbnail circle size={40} image={
                                                                    profile && profile.profile_img
                                                                        ?profile.profile_img
                                                                        :profile_image_default
                                                                }></ProfileThumbnail>
                                                            </a></Link>
                                                        </div>
                                                        <div className={sideStyles.side_login_top_info}>
                                                            {
                                                                profile && profile.nickname
                                                                    ? <div className={sideStyles.side_login_top_nickname}>{profile.nickname}</div>
                                                                    : <div className={sideStyles.side_login_top_nickname}>{user.email}</div>
                                                            }
                                                            <div className={sideStyles.side_login_top_id}>{user.email}</div>
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
                                                    <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
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
                                                    <Header param={"project"} openAble = {openAble} setOpenAble={setOpenAble} side={true}  user={user} profile={profile}/>
                                                    <div className={sideStyles.side_title} style={{minWidth:"320px"}}>
                                                        회원가입하고 다양한 메이커들과
                                                        <br/>
                                                        프로젝트를 시작하세요!
                                                    </div>
                                                    <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                        <div style={{display:"inline-block"}}><Link href="/signin/login"><a><Button className={sideStyles.side_login}>로그인</Button></a></Link></div>
                                                        <div style={{display:"inline-block", marginLeft:"12px"}}><Link href="/signin/signup"><a><Button className={sideStyles.side_signup}>회원가입</Button></a></Link></div>
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
