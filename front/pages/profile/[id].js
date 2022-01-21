import React, {useCallback, useEffect, useRef, useState} from "react";
import { useRouter } from 'next/router';
import Header from "../../components/Header";
import Link from "next/link";
import Button from "../../components/Button";
import sideStyles from "../../styles/Project.module.scss";
import styles from "../../styles/Profile.module.scss"
import cardStyle from '../../styles/Project.module.scss'
import Footer from "../../components/Footer";
import {Card, Dropdown, Menu as AntMenu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_MY_PROFILE_REQUEST, GET_OTHER_PROFILE_DETAIL_REQUEST,
    GET_OTHER_PROFILE_REQUEST,
    LOG_IN_REQUEST, UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST, UPDATE_PROFILE_IMAGE_REQUEST, UPLOAD_PROFILE_IMAGE_REQUEST
} from "../../reducers/user";
import useInput from "../../hooks/useInput";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import profile_image_default from "/images/default/profimg_default.svg"

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
                props.props.info !== undefined && props.props.info !== null
                ?(
                        <div className={styles.info_subtitle}>{props.props.info}</div>
                    )
                :(
                        <></>
                    )
            }
            {
                props.props.detail !== undefined && props.props.detail !== null
                    ?(
                        <div className={styles.info_content}>{props.props.detail}</div>
                    )
                    :(
                        <></>
                    )
            }
        </div>
    )

}

const ProfileProject = () => {
    const router = useRouter()
    const [id,setId] = useState(router.query.id)
    const dispatch = useDispatch()
    const {user,profile, logInDone, otherProfile, otherProfileDetail,imagePath} = useSelector((state) => state.user);
    const [openAble,setOpenAble] = useState(true)
    const [isMe,setIsMe] = useState(true)
    const [userName, onChangeUserName, setUserName] = useInput("")
    const [userJob, onChangeUserJob, setUserJob] = useInput("직업")
    const [userLocation, setUserLocation] = useState("지역")
    const [userIntroduce, onChangeUserIntroduce, setUserIntroduce] = useInput("")
    const [userField, setUserField] = useState(["분야"])
    const [userInstagram, onChangeUserInstagram, setUserInstagram] = useInput(null)
    const [userYoutube, onChangeUserYoutube, setUserYoutube] = useInput(null)
    const [userSoundCloud, onChangeUserSoundCloud, setUserSoundCloud] = useInput(null)
    const [userFacebook, onChangeUserFacebook, setUserFacebook] = useInput(null)
    const [userTwitter, onChangeUserTwitter, setUserTwitter] = useInput(null)
    const [techList, setTechList] = useState([])
    const [equipList, setEquipList] = useState([])
    const [careerList, setCareerList] = useState([])
    const [awardList, setAwardList] = useState([])
    const [eduList, setEduList] = useState([])
    const [createList, setCreateList] = useState([])
    const [followerNum,setFollowerNum] = useState(0)
    const [followingNum,setFollowingNum] = useState(0)
    const imageInput = useRef();

    const [navActive,setNavActive] = useState({
        "n1": true,
        "n2": false,
    })

    const onCLickChangeProfileImage = useCallback(() => {
        imageInput.current.click()
    },[imageInput.current])

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        imageFormData.append('profileImage', e.target.files[0]);
        console.log(e.target.files[0])
        dispatch({
            type: UPLOAD_PROFILE_IMAGE_REQUEST,
            data: imageFormData
        });
    },[])

    const onClickChangeDefaultImage = useCallback(() => {
        dispatch({
            type:UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST,
            data:{id:user.email}
        })
    },[])

    const ProfileMenu = (
        <AntMenu>
            <div style={{background:"#FFFFFF", boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)", borderRadius:"4px"}}>
                <div className={styles.hover_btn} onClick={() => onCLickChangeProfileImage()}>프로필 사진 변경</div>
                <input type="file" name="profileImage" hidden ref={imageInput} onChange={onChangeImages} />
                <div className={styles.hover_btn} onClick={() => onClickChangeDefaultImage()}>기본 이미지로 변경</div>
            </div>
        </AntMenu>
    )

    const card = {
        imgUrl:"https://img1.daumcdn.net/thumb/R1280x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/9dEO/image/_Xi6E6YOQ22VUzRkRtyy0_6Rvak.png",
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

    const [equipOpen,setEquipOpen] = useState(true)


    const [techOpen,setTechOpen] = useState(true)

    const [careerOpen,setCareerOpen] = useState(true)

    const [eduOpen,setEduOpen] = useState(true)

    const [awardOpen,setAwardOpen] = useState(true)

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

    useEffect(() => {
        if (!router.isReady) return
        setId(router.query.id)

    },[router.isReady])

    useEffect(() => {
        if (user){
            if (user.email === id){
                setIsMe(true)
            }else {
                setIsMe(false)
            }
        }else {
            setIsMe(false)
        }
        if (id){
            console.log(id)
            dispatch({
                type:GET_OTHER_PROFILE_REQUEST,
                data:id
            })
        }
    },[user, id])

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user !== null){
            dispatch({
                type:GET_MY_PROFILE_REQUEST,
                data:user.email
            })
        }
    },[user])

    useEffect(() => {
        if (otherProfile){
            setUserName(user.email)
            dispatch({
                type:GET_OTHER_PROFILE_DETAIL_REQUEST,
                data:id
            })
            if (otherProfile.nickname){
                setUserName(otherProfile.nickname)
            }
            if (otherProfile.job){
                setUserJob(otherProfile.job)
            }
            if (otherProfile.location){
                setUserLocation(otherProfile.location)
            }
            if (otherProfile.introduce){
                setUserIntroduce(otherProfile.introduce)
            }
            if (otherProfile.field){
                const userFieldList = otherProfile.field.split(", ")
                setUserField(userFieldList)
            }
            if (otherProfile.instagram_link){
                setUserInstagram(otherProfile.instagram_link)
            }
            if (otherProfile.youtube_link){
                setUserYoutube(otherProfile.youtube_link)
            }
            if (otherProfile.soundcloud_link){
                setUserSoundCloud(otherProfile.soundcloud_link)
            }
            if (otherProfile.facebook_link){
                setUserFacebook(otherProfile.facebook_link)
            }
            if (otherProfile.twitter_link){
                setUserTwitter(otherProfile.twitter_link)
            }

        }
    },[otherProfile])

    useEffect(() => {
        if (otherProfileDetail){
            const UserProfileDetails = otherProfileDetail.ProfileDetails
            let UserTechList = []
            let UserEquipmentList = []
            let UserCareerList = []
            let UserAwardList = []
            let UserEducationList = []
            let UserCreateList = []
            let UserShowList = []
            if (UserProfileDetails.length && UserProfileDetails.length > 0){
                for (let i = 0; i < UserProfileDetails.length; i++) {
                    switch (UserProfileDetails[i].detail_type){
                        case "technic":{
                            UserTechList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:"",date:""}
                            )
                        }break

                        case "equipment":{
                            UserEquipmentList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:"",date:""}
                            )
                        }break

                        case "career":{
                            UserCareerList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:UserProfileDetails[i].contents,date:UserProfileDetails[i].start_date+" - "+UserProfileDetails[i].end_date}
                            )
                        }break

                        case "award":{
                            UserAwardList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:"",date:UserProfileDetails[i].start_date}
                            )
                        }break

                        case "education":{
                            UserEducationList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:"",date:UserProfileDetails[i].start_date+" - "+UserProfileDetails[i].end_date}
                            )
                        }break

                        case "create":{
                            UserCreateList.push(
                                {title:UserProfileDetails[i].title,info:UserProfileDetails[i].sub_title,detail:UserProfileDetails[i].contents,date:UserProfileDetails[i].start_date+" - "+UserProfileDetails[i].end_date}
                            )
                        }break

                        default:
                            continue
                    }
                }
            }
            setTechList(UserTechList)
            setEquipList(UserEquipmentList)
            setCareerList(UserCareerList)
            setAwardList(UserAwardList)
            setEduList(UserEducationList)
            setCreateList(UserCreateList)
            setShowList(UserShowList)
        }
    },[otherProfileDetail])

    useEffect(() => {
        if (imagePath){
            dispatch({
                type: UPDATE_PROFILE_IMAGE_REQUEST,
                data: imagePath,
            });
        }
    },[imagePath])


    return(
        <>
            <Header openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}></Header>
            <div style={{background:"#FAFAFA", minHeight:"calc(100vh - 92px)"}}>
                {
                    isMe
                        ?(
                            <>
                                <div className={styles.profile_wrapper}>
                                    <div className={styles.profile_top_wrapper}>
                                        <div className={styles.profile_top_icon_wrapper}>
                                            <ProfileThumbnail circle size={112} image={
                                                otherProfile && otherProfile.profile_img
                                                    ?otherProfile.profile_img
                                                    :profile_image_default
                                            }></ProfileThumbnail>
                                            <Dropdown overlay={ProfileMenu} placement="bottomRight" arrow trigger={"hover"}>
                                                <div className={styles.profile_top_icon_change}></div>
                                            </Dropdown>

                                        </div>
                                        <div className={styles.profile_top_name}>{userName}</div>
                                        <div className={styles.profile_top_sub}>{userField.join(", ")}</div>
                                        <div className={styles.profile_top_sub}>{userJob}</div>
                                        <div className={styles.profile_top_sub}>{userLocation}</div>
                                        <Button className={styles.profile_top_button} onClick={() => router.push("/profile/edit")}>
                                            <div className={styles.profile_top_button_icon}></div>
                                            <div className={styles.profile_top_button_text}>프로필 편집</div>
                                        </Button>
                                        <div>
                                            <div className={styles.profile_top_follow}>팔로워</div>
                                            <div className={styles.profile_top_follow_num}>{followerNum}</div>
                                        </div>
                                        <div>
                                            <div className={styles.profile_top_follow}>팔로잉</div>
                                            <div className={styles.profile_top_follow_num}>{followingNum}</div>
                                        </div>
                                        <div className={styles.side_sns_wrapper}>
                                            {
                                                userInstagram
                                                    ?<Link href={userInstagram}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userYoutube
                                                    ?<Link href={userYoutube}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userSoundCloud
                                                    ?<Link href={userSoundCloud}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userFacebook
                                                    ?<Link href={userFacebook}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userTwitter
                                                    ?<Link href={userTwitter}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                    :<></>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_wrapper_clone}></div>
                            </>
                        )
                        :(
                            <>
                                <div className={styles.profile_wrapper}>
                                    <div className={styles.profile_top_wrapper}>
                                        <div className={styles.profile_top_icon_wrapper}>
                                            <ProfileThumbnail circle size={112} image={
                                                otherProfile && otherProfile.profile_img
                                                    ?otherProfile.profile_img
                                                    :profile_image_default
                                            }></ProfileThumbnail>
                                        </div>
                                        <div className={styles.profile_top_name}>{userName}</div>
                                        <div className={styles.profile_top_sub}>{userField.join(", ")}</div>
                                        <div className={styles.profile_top_sub}>{userJob}</div>
                                        <div className={styles.profile_top_sub}>{userLocation}</div>
                                        <Button className={styles.profile_top_button_not_me}>
                                            <div className={styles.profile_top_button_icon_not_me}></div>
                                            <div className={styles.profile_top_button_text_not_me}>팔로우</div>
                                        </Button>
                                        <div>
                                            <div className={styles.profile_top_follow}>팔로워</div>
                                            <div className={styles.profile_top_follow_num}>{followerNum}</div>
                                        </div>
                                        <div>
                                            <div className={styles.profile_top_follow}>팔로잉</div>
                                            <div className={styles.profile_top_follow_num}>{followingNum}</div>
                                        </div>
                                        <div className={styles.side_sns_wrapper}>
                                            {
                                                userInstagram
                                                    ?<Link href={userInstagram}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userYoutube
                                                    ?<Link href={userYoutube}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userSoundCloud
                                                    ?<Link href={userSoundCloud}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userFacebook
                                                    ?<Link href={userFacebook}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                    :<></>
                                            }
                                            {
                                                userTwitter
                                                    ?<Link href={userTwitter}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                    :<></>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.profile_wrapper_clone}></div>
                            </>

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
                                <div style={{paddingLeft:"14px", marginTop:"4px"}} className={`${cardStyle.card_wrapper} ${styles.card_wrapper}`}>
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
                                            <div className={styles.profile_profile_top_name}>{userName}</div>
                                            <div className={styles.profile_profile_top_sub}>{userField.join(", ")}</div>
                                            <div className={styles.profile_profile_top_sub}>{userJob}</div>
                                            <div className={styles.profile_profile_top_sub}>{userLocation}</div>
                                            <div style={{marginTop:"24px"}}>
                                                <div className={styles.profile_profile_top_follow}>팔로워</div>
                                                <div className={styles.profile_profile_top_follow_num}>{followerNum}</div>
                                            </div>
                                            <div style={{marginTop:"1px"}}>
                                                <div className={styles.profile_profile_top_follow}>팔로잉</div>
                                                <div className={styles.profile_profile_top_follow_num}>{followingNum}</div>
                                            </div>
                                            <div className={styles.profile_sns_wrapper}>
                                                {
                                                    userInstagram
                                                        ?<Link href={userInstagram}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                        :<></>
                                                }
                                                {
                                                    userYoutube
                                                        ?<Link href={userYoutube}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                        :<></>
                                                }
                                                {
                                                    userSoundCloud
                                                        ?<Link href={userSoundCloud}><a><div style={{backgroundSize:"24px"}} className={sideStyles.side_sns_2_1}></div></a></Link>
                                                        :<></>
                                                }
                                                {
                                                    userFacebook
                                                        ?<Link href={userFacebook}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                        :<></>
                                                }
                                                {
                                                    userTwitter
                                                        ?<Link href={userTwitter}><a><div className={sideStyles.side_sns_4}></div></a></Link>
                                                        :<></>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.info_card}>
                                        <div className={styles.info_card_title}>소개</div>
                                        <div className={styles.info_card_content}>{
                                            otherProfile && otherProfile.introduce
                                            ?otherProfile.introduce
                                            :""
                                        }</div>
                                    </div>
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
            <Footer></Footer>
        </>
    )
}

export default ProfileProject
