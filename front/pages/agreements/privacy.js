import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import sideStyles from "../../styles/Project.module.scss";
import Link from "next/link";
import Button from "../../components/Button";
import styles from "../../styles/agreements.module.scss";
import ProfileThumbnail from "../../components/ProfileThumbnail";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST} from "../../reducers/user";
import profile_image_default from "/images/default/profimg_default.svg"

const Privacy = () => {
    const dispatch = useDispatch()
    const [openAble,setOpenAble] = useState(true)
    const {user,profile,logInDone} = useSelector((state) => state.user);

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

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    return(
        <>
            <Header openAble = {openAble} setOpenAble={setOpenAble}/>
            <>
                <div className={styles.agreement_title}>개인정보 처리방침</div>
                <div className={styles.agreement_content}>
                    &#60; 브레멘 &#62;('www.brmnmusic.com'이하 '브레멘')은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                    <br/>○ 이 개인정보처리방침은 2021년  8월  14부터 적용됩니다.
                    <br/>
                    <br/>
                    <b>제1조(개인정보의 처리 목적)</b>
                    <br/>
                    <br/>
                    &#60; 브레멘 &#62;('www.brmnmusic.com'이하 '브레멘')은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    <br/>
                    <br/>
                    1. 홈페이지 회원가입 및 관리
                    회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
                    <br/>
                    <br/>
                    2. 민원사무 처리
                    민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.
                    <br/>
                    <br/>
                    3. 재화 또는 서비스 제공
                    서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산, 채권추심을 목적으로 개인정보를 처리합니다.
                    <br/>
                    <br/>
                    4. 마케팅 및 광고에의 활용
                    신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
                    <br/>
                    <br/>
                    <b>제2조(개인정보의 처리 및 보유 기간)</b>
                    <br/>
                    <br/>
                    1. &#60; 브레멘 &#62;은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                    <br/>
                    <br/>
                    2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    <br/>&#60;홈페이지 회원가입 및 관리&#62;
                    <br/>①. &#60;홈페이지 회원가입 및 관리&#62;와 관련한 개인정보는 수집.이용에 관한 동의일로부터&#60;5년&#62;까지 위 이용목적을 위하여 보유.이용됩니다.
                    <br/>②. 보유근거 : 대금결제 및 계약 사항에서 보존할 필요가 있는 경우 일정한 기간동안 회원 개인정보를 보관합니다
                    <br/>③. 관련법령
                    <br/>1) 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년
                    <br/>2) 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                    <br/>3) 계약 또는 청약철회 등에 관한 기록 : 5년
                    <br/>
                    <br/>
                    <b>제3조(개인정보의 제3자 제공)</b>
                    <br/>
                    <br/>
                    &#60; 브레멘 &#62;은 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                    <br/>
                    <br/>
                    <b>제4조(개인정보처리 위탁)</b>
                    <br/>
                    <br/>
                    1. &#60;브레멘&#62;은 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                    <br/>
                    <br/>
                    2. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                    <br/>
                    <br/>
                    <b>제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)</b>
                    <br/>
                    <br/>
                    1. 정보주체는 브레멘에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                    <br/>
                    <br/>
                    2. 제1항에 따른 권리 행사는 브레멘에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 브레멘은 이에 대해 지체 없이 조치하겠습니다.
                    <br/>
                    <br/>
                    3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                    <br/>
                    <br/>
                    4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
                    <br/>
                    <br/>
                    5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                    <br/>
                    <br/>
                    6. 브레멘은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
                    <br/>
                    <br/>
                    <b>제6조(처리하는 개인정보의 항목 작성)</b>
                    <br/>
                    <br/>
                    1. &#60; 브레멘 &#62;은(는) 다음의 개인정보 항목을 처리하고 있습니다.
                    <br/>&#60; 홈페이지 회원가입 및 관리 &#62;
                    <br/>①. 필수항목 : 이메일, 휴대전화번호, 비밀번호, 로그인ID, 성별, 생년월일, 이름, 주민등록번호, 서비스 이용 기록
                    <br/>②. 선택항목 : 직업, 쿠키
                    <br/>
                    <br/>
                    <b>제7조(개인정보의 파기)</b>
                    <br/>
                    <br/>
                    1. &#60; 브레멘 &#62;은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                    <br/>
                    <br/>
                    2. 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                    <br/>①. 보존하는 개인정보 항목 : 계좌정보, 거래날짜
                    <br/>
                    <br/>
                    3. 개인정보 파기의 절차 및 방법은 다음과 같습니다.
                    <br/>①. 파기절차
                    <br/>&#60; 브레멘 &#62;은 파기 사유가 발생한 개인정보를 선정하고, &#60; 브레멘 &#62;의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
                    <br/>②. 파기방법
                    <br/>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                    <br/>
                    <br/>
                    <b>제8조(개인정보의 안전성 확보 조치)</b>
                    <br/>
                    <br/>
                    &#60; 브레멘 &#62;은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                    <br/>
                    <br/>
                    1. 개인정보 취급 직원의 최소화 및 교육개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.
                    <br/>
                    <br/>
                    <b>제9조(개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)</b>
                    <br/>
                    <br/>
                    브레멘은 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다. 단, 서비스 변경으로 인해 쿠키를 수집해야할 시 이용자에게 동의를 물어 수집하고, 이용자는 이를 거절할 수 있습니다.
                    <br/>
                    <br/>
                    <b>제10조 (개인정보 보호책임자)</b>
                    <br/>
                    <br/>
                    1. 브레멘은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    <br/>• ▶ 개인정보 보호책임자
                    <br/>• 성명 :김효재
                    <br/>• 직책 :대표
                    <br/>• 직급 :대표
                    <br/>• 연락처 :01049183442, thekimhyo@kakao.com, 022926757
                    <br/>※ 개인정보 보호 담당부서로 연결됩니다.
                    <br/>• ▶ 개인정보 보호 담당부서
                    <br/>• 부서명 :인사
                    <br/>• 담당자 :김효재
                    <br/>• 연락처 :01049183442, thekimhyo@kakao.com, 022926757
                    <br/>
                    <br/>
                    2. 정보주체께서는 브레멘의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 브레멘은 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
                    <br/>
                    <br/>
                    <b>제12조(권익침해 구제방법)</b>
                    <br/>
                    <br/>
                    정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                    <br/>
                    <br/>
                    1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)
                    <br/>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
                    <br/>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
                    <br/>4. 경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)
                    <br/>「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
                    <br/>※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
                    <br/>
                    <br/>
                    <b>제13조(개인정보 처리방침 변경)</b>
                    <br/>
                    <br/>
                    1. 이 개인정보처리방침은 2021년 8월 14부터 적용됩니다.
                    <br/>
                    <br/>
                    2. 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
                    <br/>
                    <br/>
                    2021.8.14. 개인정보 처리방침 ver 1.0
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

export default Privacy
