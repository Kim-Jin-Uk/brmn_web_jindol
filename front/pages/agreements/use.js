import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import sideStyles from "../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import styles from "../../styles/agreements.module.scss"
import ProfileThumbnail from "../../components/ProfileThumbnail";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"
import {message} from "antd";

const Use = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone,getMyProfileError,logOutError} = useSelector((state) => state.user);

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

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
        if (getMyProfileError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[getMyProfileError])

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    useEffect(() => {
        if (logOutError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[logOutError])

    return(
        <>
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <>
                <div className={styles.agreement_title}>브레멘 이용약관</div>
                <div className={styles.agreement_content}>
                    <b>제1조(목적)</b>
                    <br/>
                    <br/>
                    본 약관은 브레멘에서 제공하는 인터넷 관련 서비스를 이용함에 있어 사이버 브레멘과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다. 서비스에 접속하거나 이용함으로써, 이용자는 우리의 이용자로 등록되었는지 여부에 관계없이, 이용자가 본 이용약관을 읽었고 이해하였으며 적용 받는 것에 동의하게 됩니다.
                    <br/>
                    <br/>
                    <b>제2조(정의)</b>
                    <br/>
                    <br/>
                    1.“브레멘”이란 “브레멘”이 서비스를 회원에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 사용자에게 서비스를 제공하도록 설정한 가상의 영업장을 말하며, 아울러 서비스를 운영하는 사업자의 의미로도 사용합니다.
                    <br/>
                    <br/>
                    2. “이용자”란 “브레멘”에 접속하여 이 약관에 따라 “브레멘”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                    <br/>
                    <br/>
                    3. “회원”이라 함은 “브레멘”에 개인정보를 제공하여 회원등록을 한 자로서, “브레멘”이 제공하는 서비스를 지속적으로 제공 받으며, “브레멘”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                    <br/>
                    <br/>
                    4. “비회원”이라 함은 회원에 가입하지 않고 “브레멘”이 제공하는 서비스를 이용하는 자를 말합니다.
                    <br/>
                    <br/>
                    5.“포트폴리오”이라 함은 “브레멘”에서 작성하거나 “회원”이 생성하는 모든 정보를 의미하며, 정보통신망 이용촉진 및 정보보호 등의 관한 법률 제2조제1항제1호 규정에 의한 정보통신망에서 사용되는 부호, 문자, 음성, 음향, 이미지 또는 영상 등으로 표현된 자료 또는 정보를 말합니다.
                    <br/>
                    <br/>
                    <b>제3조 (약관 등의 명시와 설명 및 개정)</b>
                    <br/>
                    <br/>
                    1. “브레멘”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 “이용자”가 쉽게 알 수 있도록 “브레멘”의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 “이용자”가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                    <br/>
                    <br/>
                    2. “브레멘”은 “이용자”가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 서비스 이용 제제 사안 등과 같은 중요한 내용을 “이용자”가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 “이용자”의 확인을 구하여야 합니다.
                    <br/>
                    <br/>
                    3. “브레멘”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, “이용자”에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.  이 경우 "브레멘”은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 “이용자”가 알기 쉽도록 표시합니다.
                    <br/>
                    <br/>
                    4. “회원”은 변경된 약관에 대해 거부할 권리가 있습니다. “회원”은 변경된 약관이 공지된지 15일 이내에 거부의사를 표명할 수 있습니다. “회원”이 거부하는 경우, 본 서비스 제공자인 “브레멘”은 15일 기간을 정하여 “회원”에게 사전통지 후 “회원”과의 계약을 해지할 수 있습니다. 만약, “회원”이 거부의사를 표시하지 않거나 전항에 따라 시행일 이후에 “브레멘”을 이용하는 경우에는 동의한 것으로 간주합니다.
                    <br/>
                    <br/>
                    <b>제4조 (서비스의 제공 및 변경)</b>
                    <br/>
                    <br/>
                    1. “브레멘”은 다음과 같은 업무를 수행합니다.
                    <br/>①. “포트폴리오” 등록 및 아티스트 정보 개제 서비스
                    <br/>②. “이용자” 간의 교류와 소통에 관련한 서비스
                    <br/>③. 기타 “브레멘”이 정하는 업무
                    <br/>
                    <br/>
                    2. “브레멘”이 필요한 경우, 서비스의 내용을 추가 또는 변경할 수 있다. 단, 이 경우 “브레멘”은 추가 또는 변경 내용을 “회원”에게 공지해야 한다.
                    <br/>
                    <br/>
                    <b>제5조(서비스의 중단)</b>
                    <br/>
                    <br/>
                    1. “브레멘”은 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                    <br/>
                    <br/>
                    2. “브레멘”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 “이용자” 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “브레멘”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                    <br/>
                    <br/>
                    3. 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “브레멘”은 이용자에게 관련 내용을 통지해야 합니다.
                    <br/>
                    <br/>
                    <b>제6조(회원가입)</b>
                    <br/>
                    <br/>
                    1. 이용자는 “브레멘”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                    <br/>
                    <br/>
                    2. “브레멘”은 제1항과 같이 “회원”으로 가입할 것을 신청한 “이용자”중 다음 각 호에 해당하지 않는 한 “회원”으로 등록합니다.
                    <br/>①. 가입신청자가 이 약관 제7조제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우
                    <br/>②. 등록 내용에 허위, 기재누락, 오기가 있는 경우
                    <br/>③. 기타 회원으로 등록하는 것이 “브레멘”의 기술상 현저히 지장이 있다고 판단되는 경우
                    <br/>
                    <br/>
                    3. 회원가입계약의 성립 시기는 “브레멘”의 승낙이 “회원”에게 도달한 시점으로 합니다.
                    <br/>
                    <br/>
                    4. “회원”은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “브레멘”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.
                    <br/>
                    <br/>
                    <b>제7조(회원탈퇴 및 자격 상실 등)</b>
                    <br/>
                    <br/>
                    1. “회원”은 “브레멘”에 언제든지 탈퇴를 요청할 수 있으며 “브레멘”은 즉시 회원탈퇴를 처리합니다.
                    <br/>
                    <br/>
                    2. “회원”이 다음 각 호의 사유에 해당하는 경우, “브레멘”은 회원자격을 제한 및 정지시킬 수 있습니다.
                    <br/>①. 가입 신청 시에 허위 내용을 등록한 경우
                    <br/>②. 다른 사람의 “브레멘” 이용을 방해하거나 그 정보를 도용하는 등 제공하는 서비스 운영을 위협하는 경우
                    <br/>③. “브레멘”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
                    <br/>
                    <br/>
                    3. “브레멘”이 회원자격을 제한․정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “브레멘”은 회원자격을 상실시킬 수 있습니다.
                    <br/>
                    <br/>
                    4. “브레멘”이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 “회원”에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.
                    <br/>
                    <br/>
                    <b>제8조(“회원”에 대한 통지)</b>
                    <br/>
                    <br/>
                    1. “브레멘”이 “회원”에 대한 통지를 하는 경우, “회원”이 “브레멘”과 미리 약정하여 지정한 전자우편 주소로 통지할 수 있습니다.
                    <br/>
                    <br/>
                    2. “ “브레멘”은 불특정다수 “회원”에 대한 통지의 경우 1주일이상 “브레멘” 초기화면에 또는 팝업화면으로 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, “회원” 본인의 서비스 이용과 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.
                    <br/>
                    <br/>
                    <b>제9조(“회원”, “포트폴리오” 정보)</b>
                    <br/>
                    <br/>
                    1. “회원”의 “포트폴리오”는 개인이 회원가입 또는 이력서 작성 및 수정 시 희망한 형태로 등록 및 제공됩니다.
                    <br/>
                    <br/>
                    2. “브레멘”은 “회원”이 “포트폴리오”에 정보 등록/미등록 지정, 이력서 상의 연락처 제공여부를 자유롭게 선택할 수 있도록 합니다.
                    <br/>
                    <br/>
                    3. “브레멘”은 안정적인 서비스를 제공하기 위해 테스트 및 모니터링 용도로 “브레멘” 운영자가 “포트폴리오” 정보를 열람할 수 있습니다.
                    <br/>
                    <br/>
                    4. “브레멘”은 “회원”의 선택에 의하여 등록 및 제공되는 “포트폴리오”의 정보를 기준으로 보다 유익한 서비스를 제공하기 위해 일을 개발, 편집, 재구성한 통계자료로 활용할 수 있습니다.
                    <br/>
                    <br/>
                    <b>제10조(개인정보보호)</b>
                    <br/>
                    <br/>
                    1. “브레멘”은 “회원”의 개인정보 보호할 수 있도록 노력합니다. “회원”의 개인정보 보호에 관해서는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보 보호법에 따르고 “브레멘”의 개인정보처리방침을 참고합니다.
                    <br/>
                    <br/>
                    <b>제11조(“브레멘”의 의무)</b>
                    <br/>
                    <br/>
                    1. "브레멘”은 이 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를 제공할 수 있도록 노력합니다.
                    <br/>
                    <br/>
                    2. "브레멘“은 서비스와 관련한 "회원”의 불만사항이 접수되는 경우 이를 즉시 처리하여야 하며, 즉시 처리가 곤란한 경우에는 그 사유와 처리일정을 등록된 개인 이메일 또는 기타 방법을 통해 동 "회원”에게 통지합니다.
                    <br/>
                    <br/>
                    3. 천재지변 등 예측하지 못한 일이 발생하거나 시스템의 장애가 발생하여 서비스가 중단될 경우 이에 대한 손해에 대해서는 "브레멘”이 책임을 지지 않습니다. 다만 자료의 복구나 정상적인 서비스 지원이 되도록 최선을 다할 의무를 집니다.
                    <br/>
                    <br/>
                    4. "브레멘”의 자료를 본 서비스 이외의 목적으로 제3자에게 제공하거나 열람시킬 경우 반드시 "회원”의 동의가 필요합니다.
                    <br/>
                    <br/>
                    <b>제12조(“회원”의 ID 및 비밀번호에 대한 의무)</b>
                    <br/>
                    <br/>
                    1. ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.
                    <br/>
                    <br/>
                    2. “회원”은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
                    <br/>
                    <br/>
                    3. “회원”이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 “브레멘”에 통보하고 “브레멘”의 안내가 있는 경우에는 그에 따라야 합니다.
                    <br/>
                    <br/>
                    <b>제13조(“회원”의 의무)</b>
                    <br/>
                    <br/>
                    1. "회원”은 관계법령과 본 약관의 규정 및 기타 "브레멘”이 통지하는 사항을 준수하여야 하며, 기타 "브레멘”의 업무에 방해되는 행위를 해서는 안 됩니다.
                    <br/>
                    <br/>
                    2. "회원”은 서비스를 이용하여 얻은 정보를 "브레멘”의 사전동의 없이 복사, 복제, 번역, 출판, 방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다.
                    <br/>
                    <br/>
                    3. "회원”은 본 서비스를 “포트폴리오” 작성과 활용 및 경력관리 이외의 목적으로 사용해서는 안되며 이용 중 다음 각 호의 행위를 해서는 안됩니다.
                    <br/>①. 다른 회원의 아이디를 부정 사용하는 행위
                    <br/>②. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위
                    <br/>③. 타인의 명예를 훼손하거나 모욕하는 행위
                    <br/>④. 타인의 지적재산권 등의 권리를 침해하는 행위
                    <br/>⑤. 해킹행위 또는 바이러스의 유포 행위
                    <br/>⑥. 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 계속적으로 전송하는 행위
                    <br/>⑦. 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있다고 판단되는 행위
                    <br/>⑧. 사이트의 정보 및 서비스를 이용한 영리 행위
                    <br/>⑨. 그밖에 선량한 풍속, 기타 사회질서를 해하거나 관계법령에 위반하는 행위
                    <br/>
                    <br/>
                    <b>제14조(저작권의 귀속 및 이용제한)</b>
                    <br/>
                    <br/>
                    1. “브레멘”이 작성한 저작물에 대한 저작권 기타 지적재산권은 “브레멘”에 귀속합니다.
                    <br/>
                    <br/>
                    2. “이용자”는 “브레멘”을 이용함으로써 얻은 정보 중 “브레멘”에게 지적재산권이 귀속된 정보를 “브레멘”의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                    <br/>
                    <br/>
                    3. “브레멘”은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 “이용자”에게 통보하여야 합니다.
                    <br/>
                    <br/>
                    <b>제15조(분쟁해결)</b>
                    <br/>
                    <br/>
                    1. “브레멘”은 “이용자”가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치․운영합니다.
                    <br/>
                    <br/>
                    2. “브레멘”은 “이용자”로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 “이용자”에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                    <br/>
                    <br/>
                </div>
            </>
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
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>
                                                    <Link href={
                                                        user && user.email
                                                            ?`/profile/${user.email}`
                                                            :`/profile/1`
                                                    }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_4}></div>
                                                        <div className={sideStyles.side_nav_content}>작업물 관리</div>
                                                    </a></Link>
                                                    <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_5}></div>
                                                        <div className={sideStyles.side_nav_content}>프로필 편집</div>
                                                    </a></Link>
                                                    <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_6}></div>
                                                        <div className={sideStyles.side_nav_content}>로그아웃</div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>고객센터</a></Link>
                                                        </div>
                                                        <div className={sideStyles.side_sns_wrapper}>
                                                            <Link href="https://www.instagram.com/brmn.music/" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                            <Link href="https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                            <Link href="https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312/" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                            <Link href="https://twitter.com/brmn_music" target="_blank" rel="noreferrer"><a><div className={sideStyles.side_sns_4}></div></a></Link>
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
                                                    <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                        <div className={sideStyles.side_nav_2}></div>
                                                        <div className={sideStyles.side_nav_content}>프로젝트</div>
                                                    </a></Link>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>고객센터</a></Link>
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
        </>
    )
}

export default Use
