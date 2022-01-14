import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "../../components/Header";
import styles from "../../styles/Profile.module.scss"
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import {Checkbox, Input, Select, Menu, Modal} from "antd";
import {createGlobalStyle} from "styled-components";
const { Option } = Select;
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import useInput from "../../hooks/useInput";


const Global = createGlobalStyle`
  .react-datepicker__triangle {
    transform: translate3d(52.8px, 0px, 0px) !important;
  }

  .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow, .react-datepicker__month-year-read-view--down-arrow, .react-datepicker__navigation-icon::before {
    top: 13px !important;
  }

  .ant-select-selector {
    height: 36px !important;
    border: 1px solid #CCCCCC !important;
    border-radius: 4px !important;
    box-shadow: none !important;
  }

  .ant-select-selection-search {
    padding-top: 4px;
  }

  .ant-select-selection-item {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150% !important;
    color: #1D1D1D;
    padding-top: 8px !important;
  }

  .ant-checkbox-checked::after {
    border: none;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: #1d1d1d;
    border: 1px solid #1d1d1d;
    outline: none !important;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
    border: 1px solid #1d1d1d;
    outline: none !important;
  }

  .react-datepicker-wrapper {
    width: calc(50% - 24px);
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 6px;
    max-width: 464px;

    > div {
      width: 100%;
    }

    input {
      width: 100%;
      height: 36px;
      border: 1px solid #CCCCCC;
      outline: none;
      border-radius: 4px;
      padding-left: 12px;
      padding-right: 12px;
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 150%;
      color: #1D1D1D;
    }
  }

  .react-datepicker__tab-loop {
    display: inline-block;
  }

  body {
    background: #fafafa;
  }

  .ant-menu-item {
    background: #ffffff;
    width: auto;
    height: 57px !important;
    border-bottom: 1px solid #E8E8E8;
    padding: 0 0 0 20px !important;
    margin: 0 !important;
    border-left: 2px solid #ffffff;
    span {
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
    }
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    border-left: 2px solid #33F4A3;
    background: #ffffff;
    color:#15C07E !important;
  }
  
  .ant-menu-item:hover{
    background: #FAFAFA;
    border-left: 2px solid #FAFAFA;
    margin-left: 0px !important;
    color: #1d1d1d !important;
  }
  
  .ant-menu-item-selected{
    color:#15C07E !important;
  }

  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
    border: none;
  }
  
  .ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover{
    color:#1d1d1d;
  }

  @media (min-width: 600px) and (max-width: 840px){
    .react-datepicker-wrapper {
      width: calc(50% - 48px);
      margin-left: 12px;
      margin-right: 12px;
      margin-top: 6px;
      max-width: 464px;

      > div {
        width: 100%;
      }

      input {
        width: 100%;
        height: 36px;
        border: 1px solid #CCCCCC;
        outline: none;
        border-radius: 4px;
        padding-left: 12px;
        padding-right: 12px;
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        color: #1D1D1D;
      }
    }

    .react-datepicker__tab-loop {
      display: inline-block;
    }
  }

  .ant-modal-content {
    border-radius: 4px;
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
    padding: 12px 20px 28px;
    border-bottom: 1px solid #e8e8e8;
    >div{
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
  
  .ant-checkbox{
    margin-right: 4px;
  }
  
`

function ValueCard(value) {
    return(
        <>
            <div className={styles.value_card_wrapper}>
                <div className={styles.value_card_title}>{value.value.title}</div>
                <div className={styles.value_card_info}>{value.value.info}</div>
                {
                    value.value.detail !== undefined && value.value.detail !== null
                        ?(
                            <div className={styles.value_card_detail}>{value.value.detail}</div>
                        )
                        :(
                            <></>
                        )
                }
                {
                    value.value.date !== undefined && value.value.date !== null
                        ?(
                            <div className={styles.value_card_date}>{value.value.date}</div>
                        )
                        :(
                            <></>
                        )
                }
                <div className={styles.value_card_edit_icon}></div>
            </div>
        </>
    )
}

function AddCard(value) {
    registerLocale('ko', ko)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [normalDate, setNormalDate] = useState(new Date())

    const startDateChange = useCallback((date) => {
        setStartDate(date)
    })

    const endDateChange = useCallback((date) => {
        setEndDate(date)
    })

    const normalDateChange = useCallback((date) => {
        setNormalDate(date)
    })

    return(
        <>
            <div className={styles.add_card_wrapper}>
                <div>
                    <div className={styles.add_card_text}>{value.value.col_1}</div>
                    <Input
                        placeholder={value.value.col_1_content}
                        className={styles.edit_card_input}
                        maxLength={20}
                        value={value.value.col_1_edit}
                        style={{
                            marginLeft:"12px",
                            marginRight:"12px",
                            width:"calc(100% - 24px)",
                            marginTop:"6px",
                            marginBottom:"0",
                            maxWidth:"464px"
                        }}
                    />
                </div>
                {
                    value.value.col_2 !== undefined && value.value.col_2 !== null
                        ?(
                            <div>
                                <div className={styles.add_card_text}>{value.value.col_2}</div>
                                <div className={styles.add_input_double}>
                                    <DatePicker
                                        locale={ko}// 언어설정 기본값은 영어
                                        dateFormat="yyyy/MM"    // 날짜 형식 설정
                                        className="input-datepicker"    // 클래스 명 지정 css주기 위해
                                        maxDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정
                                        closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                                        placeholderText="시작 날짜"    // placeholder
                                        selected={startDate}    // value
                                        onChange={(date) => startDateChange(date)}    // 날짜를 선택하였을 때 실행될 함수
                                    />
                                    <div style={{
                                        display:"inline-block",
                                        width:"0px",
                                        position:"relative",
                                        right:"4px",
                                        fontFamily: "Spoqa Han Sans Neo",
                                        fontStyle: "normal",
                                        fontWeight: 500,
                                        fontSize: "14px",
                                        lineHeight: "150%",

                                    }}>~</div>
                                    <DatePicker
                                        locale={ko}// 언어설정 기본값은 영어
                                        dateFormat="yyyy/MM"    // 날짜 형식 설정
                                        className="input-datepicker"    // 클래스 명 지정 css주기 위해
                                        minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정
                                        closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                                        placeholderText="종료 날짜"    // placeholder
                                        selected={endDate}    // value
                                        onChange={(date) => endDateChange(date)}    // 날짜를 선택하였을 때 실행될 함수
                                    />
                                </div>


                            </div>
                        )
                        :(
                            <></>
                        )
                }
                <div>
                    <div className={styles.add_card_text}>{value.value.col_3}</div>
                    <Input
                        placeholder={value.value.col_3_content}
                        className={styles.edit_card_input}
                        maxLength={20}
                        value={value.value.col_3_edit}
                        style={{
                            marginLeft:"12px",
                            marginRight:"12px",
                            width:"calc(100% - 24px)",
                            marginTop:"6px",
                            marginBottom:"0",
                            maxWidth:"464px"
                        }}
                    />
                </div>
                {
                    value.value.col_4 !== undefined && value.value.col_4 !== null
                        ?(
                            <div>
                                <div className={styles.add_card_text}>{value.value.col_4}</div>
                                <div className={styles.add_input}>
                                    <DatePicker
                                        locale={ko}// 언어설정 기본값은 영어
                                        dateFormat="yyyy/MM"    // 날짜 형식 설정
                                        className="input-datepicker"    // 클래스 명 지정 css주기 위해
                                        minDate={new Date()}    // 선택할 수 있는 최소 날짜값 지정
                                        closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                                        placeholderText="시작 날짜"    // placeholder
                                        selected={normalDate}    // value
                                        onChange={(date) => normalDateChange(date)}    // 날짜를 선택하였을 때 실행될 함수
                                    />
                                </div>
                            </div>
                        )
                        :(
                            <></>
                        )
                }
                {
                    value.value.col_5 !== undefined && value.value.col_5 !== null
                        ?(
                            <div>
                                <div className={styles.add_card_text}>{value.value.col_5}</div>
                                <Input
                                    placeholder={value.value.col_5_content}
                                    className={styles.edit_card_input}
                                    maxLength={20}
                                    value={value.value.col_5_edit}
                                    style={{
                                        marginLeft:"12px",
                                        marginRight:"12px",
                                        width:"calc(100% - 24px)",
                                        marginTop:"6px",
                                        marginBottom:"0",
                                        maxWidth:"464px"
                                    }}
                                />
                            </div>
                        )
                        :(
                            <></>
                        )
                }
                <div className={styles.add_card_bottom_wrapper}>
                    <Button className={styles.add_card_btn_1}>저장</Button>
                    <Button className={styles.add_card_btn_2}>취소</Button>
                    {
                        value.value.edit !== undefined && value.value.edit !== null
                            ?(
                                <Button className={styles.add_card_btn_3}>삭제</Button>
                            ):(
                                <></>
                            )
                    }
                </div>
            </div>
        </>
    )
}

const Edit = () => {
    const [select, setSelect] = useState(true)
    const ref = useRef(null);

    const [modalVisible, setModalVisible] = useState(false)
    const [fieldName, setFieldName] = useState("")
    const [fieldList, setFieldList] = useState([
        "보컬","랩","작곡","연주","디자인","영상제작","작사","음향 엔지니어",
    ])

    const onClickAddField = () => {
        setModalVisible(true)
    }

    const onClickCloseAddField = () => {
        setModalVisible(false)
    }

    const onChangeFieldName = (e) =>{
        setFieldName(e.target.value)
    }

    const addFieldItem = () =>{
        setFieldList([...fieldList, fieldName])
        setFieldName("")
        setModalVisible(false)
    }

    const [menuList, setMenuList] = useState({
        "basic":true,
        "info":false,
        "field":false,
        "tech":false,
        "equip":false,
        "career":false,
        "award":false,
        "edu":false,
        "create":false,
        "show":false,
    })
    const basicRef = useRef(null)
    const infoRef = useRef(null)
    const fieldRef = useRef(null)
    const webRef = useRef(null)
    const techRef = useRef(null)
    const equipRef = useRef(null)
    const careerRef = useRef(null)
    const onClickScroll = useCallback((ref) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block:"center",
        });
        console.log(ref.current?.scrollHeight)
    },[basicRef,infoRef,fieldRef,techRef,equipRef,careerRef])

    const onClickSideMenu = useCallback((menu) => {
        const field = {}
        for ( let i in menuList ){
            if (i === name){
                field[i] = true
            }else {
                field[i] = false
            }
        }
        setMenuList({...menuList, ...field})
    },[menuList])

    const [tech, setTech] = useState(false)
    const [equip, setEquip] = useState(false)
    const [career, setCareer] = useState(false)
    const [award, setAward] = useState(false)
    const [edu, setEdu] = useState(false)
    const [create, setCreate] = useState(false)
    const [show, setShow] = useState(false)

    const [insta, setInsta] = useState("none")
    const [youtube, setYoutube] = useState("none")
    const [soundcloud, setSoundcloud] = useState("none")
    const [facebook, setFacebook] = useState("none")
    const [twitter, setTwitter] = useState("none")

    const [instaText,onChangeInstaText] = useInput("")
    const [youtubeText,onChangeYoutubeText] = useInput("")
    const [soundcloudText,onChangeSoundcloudText] = useInput("")
    const [facebookText,onChangeFacebookText] = useInput("")
    const [twitterText,onChangeTwitterText] = useInput("")

    const [techAdd, setTechAdd] = useState({
        col_1:"보유 기술", col_1_content:"기술 이름", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"세부 사항", col_3_content:"협업 시 원활한 소통이 가능합니다.", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [equipAdd, setEquipAdd] = useState({
        col_1:"장비 종류", col_1_content:"예: 기타, 믹서, 카메라 등", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"장비 설명", col_3_content:"예: EPIPHONE 어쿠스틱기타 EL-00", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [careerAdd, setCareerAdd] = useState({
        col_1:"회사/조직", col_1_content:"회사 이름", col_1_edit:"",
        col_2:"기간", col_2_content:"", col_2_edit:"",
        col_3:"직책", col_3_content:"예: 작곡가, 앨범 디자이너 등", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:"세부 사항", col_5_content:"회사에서 진행한 업무를 입력", col_5_edit:"",
        edit:null
    })
    const [awardAdd, setAwardAdd] = useState({
        col_1:"수상 경력", col_1_content:"수상 내용", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"수상 기관", col_3_content:"기관 이름", col_3_edit:"",
        col_4:"취득일", col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [eduAdd, setEduAdd] = useState({
        col_1:"학교 또는 대학", col_1_content:"학교 이름", col_1_edit:"",
        col_2:"기간", col_2_content:"", col_2_edit:"",
        col_3:"전공", col_3_content:"전공 학과", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [createAdd, setCreateAdd] = useState({
        col_1:"제작 이름", col_1_content:"제작한 프로젝트 이름", col_1_edit:"",
        col_2:"기간", col_2_content:"", col_2_edit:"",
        col_3:"제작 업무", col_3_content:"예: 작곡, 앨범 디자인 등", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:"세부 사항", col_5_content:"제작 업무에 포함된 자세한 사항을 입력", col_5_edit:"",
        edit:null
    })
    const [showAdd, setShowAdd] = useState({
        col_1:"공연 제목", col_1_content:"공연 이름", col_1_edit:"",
        col_2:"기간", col_2_content:"", col_2_edit:"",
        col_3:"공연 업무", col_3_content:"예: 음향감독, 세션 등", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:"세부 사항", col_5_content:"공연에 포함된 자세한 사항을 입력", col_5_edit:"",
        edit:null
    })

    const [techList, setTechList] = useState([
        {title:"Logic Pro X",info:"협업 시 원활한 소통이 가능합니다."},
        {title:"Logic Pro X",info:"협업 시 원활한 소통이 가능합니다."},
    ])
    const [equipList, setEquipList] = useState([
        {title:"기타",info:"EPIPHONE 어쿠스틱기타 EL-00 Pro"},
        {title:"기타",info:"EPIPHONE 어쿠스틱기타 EL-00 Pro"},
    ])
    const [careerList, setCareerList] = useState([
        {title:"JYP 엔터테인먼트",info:"사운드 엔지니어",detail:"세부사항 내용",date:"2018.03 - 2020.04"},
        {title:"JYP 엔터테인먼트",info:"사운드 엔지니어",detail:"세부사항 내용",date:"2018.03 - 2020.04"},
    ])
    const [awardList, setAwardList] = useState([
        {title:"제 21회 한국대중음악상 올해의 신인 ",info:"한국대중음악상 선정위원회",date:"2021.02"},
        {title:"제 21회 한국대중음악상 올해의 신인 ",info:"한국대중음악상 선정위원회",date:"2021.02"},
    ])
    const [eduList, setEduList] = useState([
        {title:"한국예술종합학교",info:"작곡과",date:"2015.03 - 2018.02"},
        {title:"한국예술종합학교",info:"작곡과",date:"2015.03 - 2018.02"},
    ])
    const [createList, setCreateList] = useState([
        {title:"제작 이름",info:"제작 업무",detail:"세부사항 내용",date:"0000.00 - 0000.00"},
        {title:"제작 이름",info:"제작 업무",detail:"세부사항 내용",date:"0000.00 - 0000.00"},
    ])
    const [showList, setShowList] = useState([
        {title:"2019 IU Tour Concert Love, Poem",info:"기타 세션",detail:"세부사항 내용",date:"2019.11  ｜  KSPO DOME "},
        {title:"2019 IU Tour Concert Love, Poem",info:"기타 세션",detail:"세부사항 내용",date:"2019.11  ｜  KSPO DOME "},
    ])

    const onClickAddText = useCallback((value,setter) => {
        setter(!value)
    },[tech,equip,career,award,edu,create,show])

    const locationList = [
        <Option>서울특별시</Option>
    ]

    const suffix = <>
        {
            select
                ? <div className={styles.edit_card_select_icon}></div>
                : <div className={styles.edit_card_clear_icon}></div>
        }
    </>

    const onSelcetChange = useCallback(() => {
        setSelect(!select)
    })

    useEffect(() => {
        if (ref === null || ref.current === null) {
            return;
        }
        ref.current.style.height = '36px';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, []);

    const handleResizeHeight = useCallback(() => {
        if (ref === null || ref.current === null){
            return;
        }
        ref.current.style.height = "36px"
        ref.current.style.height = ref.current.scrollHeight + "px"
    }, [])

    const onClickLogger = useCallback((value) => {
        console.log(value)
    })

    return(
        <div>
            <Global></Global>
            <Header></Header>
            <div className={styles.edit_top_wrapper}>
                <div className={styles.edit_top}>
                    <div className={styles.edit_top_back}></div>
                    <Button className={styles.edit_top_btn}>저장</Button>
                </div>
            </div>

            <div style={{height:"61px"}}></div>

            <Modal
                visible={modalVisible}
                title="기타 분야 작성"
                footer={[
                    <Button className={`${styles.pop_btn} ${styles.save_btn}`} onClick={addFieldItem}>
                        저장
                    </Button>,
                    <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={onClickCloseAddField}>
                        취소
                    </Button>,
                ]}
            >
                <div>분야 이름</div>
                <input className={styles.add_field_input} onChange={onChangeFieldName} value={fieldName} type="text" placeholder={"분야 이름을 입력합니다."}/>
            </Modal>

            <div className={styles.edit_main_wrapper}>
                <div className={styles.edit_subset}>
                    <div className={styles.edit_side_menu}>
                        <Menu>
                            <Menu.Item key="basic" onClick={() => onClickScroll(basicRef)}>기본정보</Menu.Item>
                            <Menu.Item key="info" onClick={() => onClickScroll(infoRef)}>소개</Menu.Item>
                            <Menu.Item key="field" onClick={() => onClickScroll(fieldRef)}>분야</Menu.Item>
                            <Menu.Item key="web" onClick={() => onClickScroll(webRef)}>웹</Menu.Item>
                            <Menu.Item key="tech" onClick={() => onClickScroll(techRef)}>기술</Menu.Item>
                            <Menu.Item key="equip" onClick={() => onClickScroll(equipRef)}>장비</Menu.Item>
                            <Menu.Item key="career" onClick={() => onClickScroll(careerRef)}>이력</Menu.Item>
                        </Menu>

                    </div>
                    <div className={styles.edit_side_main} >
                        {/*info*/}
                        <div className={styles.edit_card_wrapper}  ref={basicRef}>
                            <div className={styles.edit_card_title}>기본 정보</div>
                            <div style={{marginBottom:"5px"}}>
                                <div className={styles.edit_card_sub_title}>이름</div>
                                <div className={styles.edit_card_sub_explain}>(필수)</div>
                            </div>
                            <Input
                                placeholder="포트폴리오에 표시되는 이름입니다."
                                className={styles.edit_card_input}
                                maxLength={20}
                            />

                            <div style={{marginBottom:"5px"}}>
                                <div className={styles.edit_card_sub_title}>직업</div>
                            </div>
                            <Input
                                placeholder="현재 직업을 입력합니다."
                                className={styles.edit_card_input}
                                maxLength={20}
                            />

                            <div style={{marginBottom:"5px"}}>
                                <div className={styles.edit_card_sub_title}>위치</div>
                            </div>
                            <Select size={"default"} defaultValue="서울특별시" style={{
                                width: "100%",
                                maxWidth:"344px",
                                height:"36px",
                            }}
                                    suffixIcon={suffix}
                                    onClick={onSelcetChange}
                            >
                                {locationList}
                            </Select>

                        </div>
                        {/*introduction*/}
                        <div className={styles.edit_card_wrapper} ref={infoRef}>
                            <div className={styles.edit_card_title}>소개</div>
                            <div style={{marginBottom:"6px"}}>
                                <div className={styles.edit_card_sub_title}>자기소개</div>
                            </div>
                            <textarea
                                placeholder="자세한 내용을 추가합니다."
                                className={styles.edit_card_textarea}
                                ref={ref}
                                onInput={handleResizeHeight}
                            />
                        </div>

                        <div className={styles.edit_card_wrapper} ref={fieldRef}>
                            <div className={styles.edit_card_title}>분야</div>
                            <div style={{marginBottom:"6px"}}>
                                <div className={styles.edit_card_sub_explain}>어떤 분야에서 활동 중입니까?</div>
                            </div>
                            <Checkbox.Group style={{ width: '100%' }}>
                                {
                                    fieldList.map((v) => (
                                        <Checkbox className={styles.edit_card_checkbox} value={v}>{v}</Checkbox>
                                    ))
                                }
                                <div className={styles.edit_card_add_link} onClick={onClickAddField}>기타 작성하기</div>
                            </Checkbox.Group>

                        </div>

                        <div className={styles.edit_card_wrapper} ref={webRef}>
                            <div className={styles.edit_card_title}>웹</div>
                            <div style={{marginTop:"29px"}}>
                                <div className={styles.sns_edit_wrapper}>
                                    <div className={styles.sns_tail}></div>
                                    <div className={styles.insta_icon}></div>
                                    {{
                                        "none":<div className={styles.sns_title}>Instagram</div>,
                                        "edit":<div className={styles.sns_title_eidt}>Instagram</div>,
                                        "save":<div className={styles.sns_title}>Instagram</div>,
                                    }[insta]}

                                    {{
                                        "none":<><div className={styles.sns_link_btn} onClick={() => {setInsta("edit")}}>링크</div></>,
                                        "edit":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setInsta("none")}}></div>
                                                <div className={styles.sns_edit_btn} onClick={() => {setInsta("save")}}>저장</div>
                                                <input className={styles.sns_edit_input} placeholder={"입력"} type="text" value={instaText} onChange={onChangeInstaText}/>
                                            </>,
                                        "save":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setInsta("none")}}></div>
                                                <div className={styles.sns_save_text}>{instaText}</div>
                                            </>,
                                    }[insta]}
                                </div>
                                <div className={styles.sns_edit_wrapper}>
                                    <div className={styles.sns_tail}></div>
                                    <div className={styles.youtube_icon}></div>
                                    {{
                                        "none":<div className={styles.sns_title}>YouTube</div>,
                                        "edit":<div className={styles.sns_title_eidt}>YouTube</div>,
                                        "save":<div className={styles.sns_title}>YouTube</div>,
                                    }[youtube]}

                                    {{
                                        "none":<><div className={styles.sns_link_btn} onClick={() => {setYoutube("edit")}}>링크</div></>,
                                        "edit":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setYoutube("none")}}></div>
                                                <div className={styles.sns_edit_btn} onClick={() => {setYoutube("save")}}>저장</div>
                                                <input className={styles.sns_edit_input} placeholder={"입력"} type="text" value={youtubeText} onChange={onChangeYoutubeText}/>
                                            </>,
                                        "save":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setYoutube("none")}}></div>
                                                <div className={styles.sns_save_text}>{youtubeText}</div>
                                            </>,
                                    }[youtube]}
                                </div>
                                <div className={styles.sns_edit_wrapper}>
                                    <div className={styles.sns_tail}></div>
                                    <div className={styles.soundcloud_icon}></div>
                                    {{
                                        "none":<div className={styles.sns_title}>Soundcloud</div>,
                                        "edit":<div className={styles.sns_title_eidt}>Soundcloud</div>,
                                        "save":<div className={styles.sns_title}>Soundcloud</div>,
                                    }[soundcloud]}

                                    {{
                                        "none":<><div className={styles.sns_link_btn} onClick={() => {setSoundcloud("edit")}}>링크</div></>,
                                        "edit":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setSoundcloud("none")}}></div>
                                                <div className={styles.sns_edit_btn} onClick={() => {setSoundcloud("save")}}>저장</div>
                                                <input className={styles.sns_edit_input} placeholder={"입력"} type="text" value={soundcloudText} onChange={onChangeSoundcloudText}/>
                                            </>,
                                        "save":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setSoundcloud("none")}}></div>
                                                <div className={styles.sns_save_text}>{soundcloudText}</div>
                                            </>,
                                    }[soundcloud]}
                                </div>
                                <div className={styles.sns_edit_wrapper}>
                                    <div className={styles.sns_tail}></div>
                                    <div className={styles.facebook_icon}></div>
                                    {{
                                        "none":<div className={styles.sns_title}>Facebook</div>,
                                        "edit":<div className={styles.sns_title_eidt}>Facebook</div>,
                                        "save":<div className={styles.sns_title}>Facebook</div>,
                                    }[facebook]}

                                    {{
                                        "none":<><div className={styles.sns_link_btn} onClick={() => {setFacebook("edit")}}>링크</div></>,
                                        "edit":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setFacebook("none")}}></div>
                                                <div className={styles.sns_edit_btn} onClick={() => {setFacebook("save")}}>저장</div>
                                                <input className={styles.sns_edit_input} placeholder={"입력"} type="text" value={facebookText} onChange={onChangeFacebookText}/>
                                            </>,
                                        "save":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setFacebook("none")}}></div>
                                                <div className={styles.sns_save_text}>{facebookText}</div>
                                            </>,
                                    }[facebook]}
                                </div>
                                <div className={styles.sns_edit_wrapper} style={{border:"none", paddingBottom:"0", height:"26px"}}>
                                    <div className={styles.sns_tail}></div>
                                    <div className={styles.twitter_icon}></div>
                                    {{
                                        "none":<div className={styles.sns_title}>Twitter</div>,
                                        "edit":<div className={styles.sns_title_eidt}>Twitter</div>,
                                        "save":<div className={styles.sns_title}>Twitter</div>,
                                    }[twitter]}

                                    {{
                                        "none":<><div className={styles.sns_link_btn} onClick={() => {setTwitter("edit")}}>링크</div></>,
                                        "edit":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setTwitter("none")}}></div>
                                                <div className={styles.sns_edit_btn} onClick={() => {setTwitter("save")}}>저장</div>
                                                <input className={styles.sns_edit_input} placeholder={"입력"} type="text" value={twitterText} onChange={onChangeTwitterText}/>
                                            </>,
                                        "save":
                                            <>
                                                <div className={styles.sns_edit_close}  onClick={() => {setTwitter("none")}}></div>
                                                <div className={styles.sns_save_text}>{twitterText}</div>
                                            </>,
                                    }[twitter]}
                                </div>
                            </div>
                        </div>

                        <div className={styles.edit_card_wrapper} ref={techRef}>
                            <div className={styles.edit_card_title}>기술</div>
                            {
                                techList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                tech
                                    ?(
                                        <AddCard value={techAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div style={{marginBottom:"6px"}}>
                                <div className={styles.edit_card_sub_explain}>소프트웨어, 악기 연주 등을 추가합니다.</div>
                            </div>
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(tech,setTech)}>+  기술 추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper} ref={equipRef}>
                            <div className={styles.edit_card_title}>장비</div>
                            {
                                equipList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                equip
                                    ?(
                                        <AddCard value={equipAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div style={{marginBottom:"6px"}}>
                                <div className={styles.edit_card_sub_explain}>보유하고 있는 장비, 악기를 추가합니다.</div>
                            </div>
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(equip,setEquip)}>+  장비 추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper} ref={careerRef}>
                            <div className={styles.edit_card_title}>근무 경력</div>
                            {
                                careerList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                career
                                    ?(
                                        <AddCard value={careerAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(career,setCareer)}>+  근무 경력 추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper}>
                            <div className={styles.edit_card_title}>수상</div>
                            {
                                awardList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                award
                                    ?(
                                        <AddCard value={awardAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(award,setAward)}>+  수상추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper}>
                            <div className={styles.edit_card_title}>학력</div>
                            {
                                eduList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                edu
                                    ?(
                                        <AddCard value={eduAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(edu,setEdu)}>+  학력추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper}>
                            <div className={styles.edit_card_title}>제작</div>
                            {
                                createList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                create
                                    ?(
                                        <AddCard value={createAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div style={{marginBottom:"6px"}}>
                                <div className={styles.edit_card_sub_explain}>음반 제작, 콘텐츠 제작 활동 등을 추가합니다.</div>
                            </div>
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(create,setCreate)}>+  제작추가</div>
                        </div>

                        <div className={styles.edit_card_wrapper}>
                            <div className={styles.edit_card_title}>공연</div>
                            {
                                showList.map((value, index) => (
                                    <>
                                        <ValueCard value={value}></ValueCard>
                                    </>
                                ))
                            }
                            {
                                show
                                    ?(
                                        <AddCard value={showAdd}></AddCard>
                                    )
                                    :(
                                        <></>
                                    )
                            }
                            <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                 onClick={() => onClickAddText(show,setShow)}>+  공연추가</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Edit
