import React, {useCallback, useEffect, useRef, useState} from "react";
import Header from "../../components/Header";
import styles from "../../styles/Profile.module.scss"
import sideStyles from "../../styles/Project.module.scss";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import {message, Checkbox, Input, Select, Menu, Modal} from "antd";
import {createGlobalStyle} from "styled-components";
const { Option } = Select;
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {
    GET_MY_PROFILE_DETAIL_REQUEST,
    GET_MY_PROFILE_REQUEST,
    LOG_IN_REQUEST, LOG_OUT_REQUEST,
    UPDATE_MY_PROFILE_REQUEST,
    UPLOAD_MY_PROFILE_DONE
} from "../../reducers/user";
import Router from "next/router";
import moment from 'moment'
import 'moment/locale/ko'
import Link from "next/link";
import ProfileThumbnail from "../../components/ProfileThumbnail";


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
    transform: translateY(-50%);
    top: 50%;
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
    const onClickEditButton = () =>{
        value.trigger(true)
        let editter = value.param
        editter.edit = "edit"
        if (value.value.title){
            editter.col_1_edit = value.value.title
        }
        if (value.value.date){
            editter.col_2_edit = value.value.date
            editter.col_4_edit = value.value.date
        }
        if (value.value.info){
            editter.col_3_edit = value.value.info
        }
        if (value.value.detail){
            editter.col_5_edit = value.value.detail
        }
        value.mode({list:value.type,index:value.index})
        value.triggerSet(editter)
    }

    return(
        <>
            {
                value.value !== undefined && value.value !== null
                    ?<div className={styles.value_card_wrapper}>
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

                        <div className={styles.value_card_edit_icon} onClick={()=>onClickEditButton()}></div>

                    </div>
                    :<></>
            }

        </>
    )
}

function AddCard(value) {
    registerLocale('ko', ko)
    const [text1,onChangeText1,setText1] = useInput(value.value.col_1_edit)
    const [text2,setText2] = useState(["",""])
    const [text3,onChangeText3,setText3] = useInput(value.value.col_3_edit)
    const [text5,onChangeText5,setText5] = useInput(value.value.col_5_edit)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [normalDate, setNormalDate] = useState(new Date())

    const [originitem, setOriginItem] = useState(null)

    useEffect(() => {
        if (value.value.edit === "edit"){
            setOriginItem(value.checker.list[value.checker.index])
        }
    },[value.value.edit])

    useEffect(() => {
        if (originitem){
            const index = value.checker.index
            const list = [...value.checker.list]
            console.log("remove",list.filter((value,i) => i !== index))
            value.checkerSet(list.filter((value,i) => i !== index))
        }
    },[originitem])

    useEffect(() => {
        if (value.value.col_2_edit.length > 1){
            if (value.value.col_2_edit.includes(" - ")){
                let dateList = value.value.col_2_edit.split((" - "))
                setStartDate(new Date(dateList[0].replace(".","/")+"/01"))
                setEndDate(new Date(dateList[1].replace(".","/")+"/01"))
                setText2(dateList)
            }else {
                let dateString = value.value.col_2_edit
                setNormalDate(new Date(dateString.replace(".","/")+"/01"))
                setText2(text2.map((value,i) => i === 0 ? dateString : value ))
            }
        }else {
            if (value.value.col_2 !== undefined && value.value.col_2 !== null){
                setText2(text2.map((value,i) => moment(new Date()).format("YYYY.MM")))
            }else {
                setText2(text2.map((value,i) => i === 0 ? moment(new Date()).format("YYYY.MM") : value ))
            }

        }
    },[value.value.col_2_edit])
    useEffect(() => {
        setText1(value.value.col_1_edit)
    },[value.value.col_1_edit])
    useEffect(() => {
        setText3(value.value.col_3_edit)
    },[value.value.col_3_edit])
    useEffect(() => {
        setText5(value.value.col_5_edit)
    },[value.value.col_5_edit])


    const startDateChange = useCallback((date) => {
        setStartDate(date)
        setText2(text2.map((value,i) => i === 0 ? moment(date).format("YYYY.MM") : value ))
    })

    const endDateChange = useCallback((date) => {
        setEndDate(date)
        setText2(text2.map((value,i) => i === 1 ? moment(date).format("YYYY.MM") : value ))
    })

    const normalDateChange = useCallback((date) => {
        setNormalDate(date)
        setText2(text2.map((value,i) => i === 0 ? moment(date).format("YYYY.MM") : value ))
    })

    const onClickCancle = () => {
        if (value.value.edit === "edit" && originitem){
            const index = value.checker.index
            let list = [...value.checker.list]
            list = list.filter((value,i) => i !== index)
            console.log("origin",list)
            console.log(index)
            console.log(originitem)
            list.splice(value.checker.index,0,originitem)
            value.checkerSet(list)
        }
        let editter = value.value
        editter.col_1_edit = ""
        editter.col_2_edit = ""
        editter.col_3_edit = ""
        editter.col_4_edit = ""
        editter.col_5_edit = ""
        editter.edit = null
        value.mode(null)
        value.triggerSet(editter)
        value.type(false)
    }

    const onClickDelete = () => {
        let list = value.checker.list
        let index = value.checker.index
        value.checkerSet(list.filter((value,i) => i !== index))
        value.mode(null)
        let editter = value.value
        editter.col_1_edit = ""
        editter.col_2_edit = ""
        editter.col_3_edit = ""
        editter.col_4_edit = ""
        editter.col_5_edit = ""
        editter.edit = null
        value.triggerSet(editter)
        value.type(false)
    }

    useEffect(() => {
        // console.log("value",value)
    },[value])

    const onClickSave = () => {
        let date = ""
        if ((value.value.col_2 !== undefined && value.value.col_2 !== null) || (value.value.col_4 !== undefined && value.value.col_4 !== null)){
            if (text2[1] !== ""){
                date = text2.join(" - ")
            }else {
                date = text2[0]
            }
        }

        if (text1.length === 0 || text3.length === 0 || (value.value.col_5 !== undefined && value.value.col_5 !== null && text5.length === 0)){
            return message.warning('????????? ?????? ????????? ?????????');
        }
        const addValue = {
            title:text1,
            info:text3,
            detail:text5,
            date:date
        }

        if (value.checker !== null){
            let valueList = value.checker.list
            valueList[value.checker.index] = addValue
            value.checkerSet(valueList)
        }else {
            value.checkerSet([...value.addList,addValue])
        }

        let editter = value.value
        editter.col_1_edit = ""
        editter.col_2_edit = ""
        editter.col_3_edit = ""
        editter.col_4_edit = ""
        editter.col_5_edit = ""
        editter.edit = null
        value.mode(null)
        value.triggerSet(editter)
        value.type(false)
    }

    return(
        <>
            {
                value.value !== undefined && value.value !== null
                    ?<div className={styles.add_card_wrapper}>
                        <div>
                            <div className={styles.add_card_text}>{value.value.col_1}</div>
                            <Input
                                placeholder={value.value.col_1_content}
                                placeholder={value.value.col_1_content}
                                className={styles.edit_card_input}
                                maxLength={50}
                                value={text1}
                                onChange={onChangeText1}
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
                                                locale={ko}// ???????????? ???????????? ??????
                                                dateFormat="yyyy/MM"    // ?????? ?????? ??????
                                                className="input-datepicker"    // ????????? ??? ?????? css?????? ??????
                                                maxDate={new Date()}    // ????????? ??? ?????? ?????? ????????? ??????
                                                closeOnScroll={true}    // ???????????? ???????????? ??? ???????????? ???????????? ?????? ????????? false
                                                placeholderText="?????? ??????"    // placeholder
                                                selected={startDate}    // value
                                                onChange={(date) => startDateChange(date)}    // ????????? ??????????????? ??? ????????? ??????
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
                                                locale={ko}// ???????????? ???????????? ??????
                                                dateFormat="yyyy/MM"    // ?????? ?????? ??????
                                                className="input-datepicker"    // ????????? ??? ?????? css?????? ??????
                                                maxDate={new Date()}    // ????????? ??? ?????? ?????? ????????? ??????
                                                closeOnScroll={true}    // ???????????? ???????????? ??? ???????????? ???????????? ?????? ????????? false
                                                placeholderText="?????? ??????"    // placeholder
                                                selected={endDate}    // value
                                                onChange={(date) => endDateChange(date)}    // ????????? ??????????????? ??? ????????? ??????
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
                                maxLength={100}
                                value={text3}
                                onChange={onChangeText3}
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
                                                locale={ko}// ???????????? ???????????? ??????
                                                dateFormat="yyyy/MM"    // ?????? ?????? ??????
                                                className="input-datepicker"    // ????????? ??? ?????? css?????? ??????
                                                maxDate={new Date()}    // ????????? ??? ?????? ?????? ????????? ??????
                                                closeOnScroll={true}    // ???????????? ???????????? ??? ???????????? ???????????? ?????? ????????? false
                                                placeholderText="?????? ??????"    // placeholder
                                                selected={normalDate}    // value
                                                onChange={(date) => normalDateChange(date)}    // ????????? ??????????????? ??? ????????? ??????
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
                                            maxLength={100}
                                            value={text5}
                                            onChange={onChangeText5}
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
                            <Button className={styles.add_card_btn_1} onClick={() => onClickSave()}>??????</Button>
                            <Button className={styles.add_card_btn_2} onClick={() => onClickCancle()}>??????</Button>
                            {
                                value.value.edit !== undefined && value.value.edit !== null
                                    ?(
                                        <Button className={styles.add_card_btn_3} onClick={() => onClickDelete()}>??????</Button>
                                    ):(
                                        <></>
                                    )
                            }
                        </div>
                    </div>
                    :<></>
            }

        </>
    )
}

const Edit = () => {
    const dispatch = useDispatch();
    const {user, logInDone, profile,profileDetail, updateMyProfileDone, updateMyProfileError,
        getMyProfileError, getMyProfileDetailError, logOutError} = useSelector((state) => state.user);
    const [userName, onChangeUserName, setUserName] = useInput("")
    const [userJob, onChangeUserJob, setUserJob] = useInput("")
    const locationList = [
        "???????????????",
        "???????????????",
        "???????????????",
        "???????????????",
        "???????????????",
        "???????????????",
        "???????????????",
        "?????????????????????",
        "?????????",
        "?????????",
        "????????????",
        "????????????",
        "????????????",
        "????????????",
        "????????????",
        "????????????",
        "?????????????????????"
    ]
    const [userLocation, setUserLocation] = useState("??????")
    const [userIntroduce, onChangeUserIntroduce, setUserIntroduce] = useInput("")
    const [userField, setUserField] = useState([])
    const [userInstagram, onChangeUserInstagram, setUserInstagram] = useInput("")
    const [userYoutube, onChangeUserYoutube, setUserYoutube] = useInput("")
    const [userSoundCloud, onChangeUserSoundCloud, setUserSoundCloud] = useInput("")
    const [userFacebook, onChangeUserFacebook, setUserFacebook] = useInput("")
    const [userTwitter, onChangeUserTwitter, setUserTwitter] = useInput("")
    const [techList, setTechList] = useState([])
    const [equipList, setEquipList] = useState([])
    const [careerList, setCareerList] = useState([])
    const [awardList, setAwardList] = useState([])
    const [eduList, setEduList] = useState([])
    const [createList, setCreateList] = useState([])
    const [techAdd,setTechAdd] = useState({
        col_1:"?????? ??????", col_1_content:"?????? ??????", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"?????? ??????", col_3_content:"?????? ??? ????????? ????????? ???????????????.", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [equipAdd,setEquipAdd] = useState({
        col_1:"?????? ??????", col_1_content:"???: ??????, ??????, ????????? ???", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"?????? ??????", col_3_content:"???: EPIPHONE ?????????????????? EL-00", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [careerAdd,setCareerAdd] = useState({
        col_1:"??????/??????", col_1_content:"?????? ??????", col_1_edit:"",
        col_2:"??????", col_2_content:"", col_2_edit:"",
        col_3:"??????", col_3_content:"???: ?????????, ?????? ???????????? ???", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:"?????? ??????", col_5_content:"???????????? ????????? ????????? ??????", col_5_edit:"",
        edit:null
    })
    const [awardAdd,setAwardAdd]= useState({
        col_1:"?????? ??????", col_1_content:"?????? ??????", col_1_edit:"",
        col_2:null, col_2_content:"", col_2_edit:"",
        col_3:"?????? ??????", col_3_content:"?????? ??????", col_3_edit:"",
        col_4:"?????????", col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [eduAdd,setEduAdd] = useState({
        col_1:"?????? ?????? ??????", col_1_content:"?????? ??????", col_1_edit:"",
        col_2:"??????", col_2_content:"", col_2_edit:"",
        col_3:"??????", col_3_content:"?????? ??????", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:null, col_5_content:"", col_5_edit:"",
        edit:null
    })
    const [createAdd,setCreateAdd] = useState({
        col_1:"?????? ??????", col_1_content:"????????? ???????????? ??????", col_1_edit:"",
        col_2:"??????", col_2_content:"", col_2_edit:"",
        col_3:"?????? ??????", col_3_content:"???: ??????, ?????? ????????? ???", col_3_edit:"",
        col_4:null, col_4_content:"", col_4_edit:"",
        col_5:"?????? ??????", col_5_content:"?????? ????????? ????????? ????????? ????????? ??????", col_5_edit:"",
        edit:null
    })
    const [editTechMode, setEditTechMode] = useState(null)
    const [editEquipMode, setEditEquipMode] = useState(null)
    const [editCareerMode, setEditCareerMode] = useState(null)
    const [editAwardMode, setEditAwardMode] = useState(null)
    const [editEduMode, setEditEduMode] = useState(null)
    const [editCreateMode, setEditCreateMode] = useState(null)
    const filterKey = /[~`!@#$%^&*()+|<>?:{}/\/\[\]]/gi;

    const onKeyUpUserName = (e) => {
        if (filterKey.test(e.key)){
            setUserName(userName.replace(filterKey, ''))
            message.warning("'_'??? ????????? ??????????????? ????????? ???????????????.")
        }
    }

    const onChangeLocation = (v) => {
        setUserLocation(v)
    }

    const onChangeField = (v) => {
        if (v.length > 3){
            return message.warning('????????? ?????? 3????????? ?????? ???????????????.')
        }else {
            setUserField(v)
        }
    }

    const [select, setSelect] = useState(true)
    const ref = useRef(null);

    const [modalVisible, setModalVisible] = useState(false)
    const [fieldName, setFieldName] = useState("")
    const [fieldList, setFieldList] = useState([
        "??????", "????????????", "?????????", "??????", "?????????"
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
        const item = fieldName.toLowerCase()
        if (fieldList.length >= 8){
            message.warning("????????? ????????? 3????????? ?????????????????????.")
        }else {
            if (!fieldList.includes(item)){
                setFieldList([...fieldList, item])
                setModalVisible(false)
            }else {
                message.warning("????????? ????????? ???????????????.")
            }
        }
        setFieldName("")
        setModalVisible(false)
    }

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
    },[basicRef,infoRef,fieldRef,techRef,equipRef,careerRef])

    const [tech, setTech] = useState(false)
    const [equip, setEquip] = useState(false)
    const [career, setCareer] = useState(false)
    const [award, setAward] = useState(false)
    const [edu, setEdu] = useState(false)
    const [create, setCreate] = useState(false)

    const [insta, setInsta] = useState("none")
    const [youtube, setYoutube] = useState("none")
    const [soundcloud, setSoundcloud] = useState("none")
    const [facebook, setFacebook] = useState("none")
    const [twitter, setTwitter] = useState("none")

    const [openAble,setOpenAble] = useState(true)

    const onClickClose = useCallback(() => {
        setOpenAble(!openAble)
    },[openAble])

    const onClickAddText = useCallback((value,setter,add,setAdd) => {
        let editter = add
        editter.col_1_edit = ""
        editter.col_2_edit = ""
        editter.col_3_edit = ""
        editter.col_4_edit = ""
        editter.col_5_edit = ""
        editter.edit = null
        setAdd(editter)
        setter(!value)
    },[tech,equip,career,award,edu,create])


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

    useEffect(() => {
        if (!logInDone){
            Router.replace("/project")
        }
    },[])

    useEffect(() => {
        dispatch({
            type:LOG_IN_REQUEST
        })
    },[])

    useEffect(() => {
        if (user !== null){
            if (user === "not agreement"){
                Router.replace("http://localhost:3060/signin/agreements")
            }else {
                dispatch({
                    type:GET_MY_PROFILE_REQUEST,
                    data:user.email
                })
            }
        }
    },[user])

    useEffect(() => {
        if (getMyProfileError || getMyProfileDetailError || updateMyProfileError || logOutError){
            message.warning("???????????? ????????? ????????? ?????????.")
        }
    },[getMyProfileError, getMyProfileDetailError, updateMyProfileError, logOutError])

    useEffect(() => {
        if (profile){
            dispatch({
                type:GET_MY_PROFILE_DETAIL_REQUEST,
                data:user.email
            })
            if (profile.nickname){
                setUserName(profile.nickname)
            }
            if (profile.job){
                setUserJob(profile.job)
            }
            if (profile.location){
                if (profile.location !== ""){
                    setUserLocation(profile.location)
                }
            }
            if (profile.introduce){
                setUserIntroduce(profile.introduce)
            }
            if (profile.field){
                const userFieldList = profile.field.split(", ")
                setUserField(userFieldList)
                let anotherList = []
                for (let i = 0; i < userFieldList.length; i++) {
                    if (!fieldList.includes(userFieldList[i])){
                        anotherList.push(userFieldList[i])
                    }
                }
                setFieldList(fieldList.concat(anotherList))
            }
            if (profile.instagram_link){
                setUserInstagram(profile.instagram_link)
                if (profile.instagram_link.length > 0){
                    setInsta("edit")
                }
            }
            if (profile.youtube_link){
                setUserYoutube(profile.youtube_link)
                if (profile.youtube_link.length > 0){
                    setYoutube("edit")
                }
            }
            if (profile.soundcloud_link){
                setUserSoundCloud(profile.soundcloud_link)
                if (profile.soundcloud_link.length > 0){
                    setSoundcloud("edit")
                }
            }
            if (profile.facebook_link){
                setUserFacebook(profile.facebook_link)
                if (profile.facebook_link.length > 0){
                    setFacebook("edit")
                }
            }
            if (profile.twitter_link){
                setUserTwitter(profile.twitter_link)
                if (profile.twitter_link.length > 0){
                    setTwitter("edit")
                }
            }

        }else if (user){
            setUserName(user.email)
        }
    },[profile])

    useEffect(() => {
        if (profileDetail){
            const UserProfileDetails = profileDetail.profiledetails
            let UserTechList = []
            let UserEquipmentList = []
            let UserCareerList = []
            let UserAwardList = []
            let UserEducationList = []
            let UserCreateList = []
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
            setTechList(UserTechList)
            setEquipList(UserEquipmentList)
            setCareerList(UserCareerList)
            setAwardList(UserAwardList)
            setEduList(UserEducationList)
            setCreateList(UserCreateList)
        }
    },[profileDetail])

    useEffect(() => {
        if (updateMyProfileDone){
            message.success('???????????? ??????????????? ???????????? ???????????????');
            dispatch({type:UPLOAD_MY_PROFILE_DONE})
            Router.back()
        }
    },[updateMyProfileDone])

    useEffect(() => {
        const antSelect = document.getElementById("antSelect")
        console.log(antSelect)
    },[userLocation])

    const onClickMainSaveButton = () => {
        if (userName.length > 0){
            dispatch({
                type:UPDATE_MY_PROFILE_REQUEST,
                data:{
                    email:user.email,
                    name:userName,
                    job:userJob,
                    location:userLocation,
                    introduce:userIntroduce,
                    field:userField.join(", "),
                    instagram:userInstagram,
                    youtube:userYoutube,
                    soundcloud:userSoundCloud,
                    facebook:userFacebook,
                    twitter:userTwitter,
                    tech:techList,
                    equip:equipList,
                    career:careerList,
                    award:awardList,
                    edu:eduList,
                    create:createList,
                }
            })
        }else {
            message.warning("????????? ???????????????.")
        }
    }

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })


    return(
        <div>
            <Global></Global>
            <>
                <Header param={"profile"} openAble = {openAble} setOpenAble={setOpenAble} user={user} profile={profile}  isLoggedin={logInDone}/>
                <div className={styles.edit_top_wrapper}>
                    <div className={styles.edit_top}>
                        <div className={styles.edit_top_back} onClick={() => Router.back()}></div>
                        <Button className={styles.edit_top_btn} onClick={()=>onClickMainSaveButton()}>??????</Button>
                    </div>
                </div>

                <div style={{height:"61px"}}></div>

                <Modal
                    visible={modalVisible}
                    title="?????? ?????? ??????"
                    footer={[
                        <Button className={`${styles.pop_btn} ${styles.save_btn}`} onClick={addFieldItem}>
                            ??????
                        </Button>,
                        <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={onClickCloseAddField}>
                            ??????
                        </Button>,
                    ]}
                >
                    <div>?????? ??????</div>
                    <input maxLength={30} className={styles.add_field_input} onChange={onChangeFieldName} value={fieldName} type="text" placeholder={"?????? ????????? ???????????????."}/>
                </Modal>

                <div className={styles.edit_main_wrapper}>
                    <div className={styles.edit_subset}>
                        <div className={styles.edit_side_menu}>
                            <Menu>
                                <Menu.Item key="basic" onClick={() => onClickScroll(basicRef)}>????????????</Menu.Item>
                                <Menu.Item key="info" onClick={() => onClickScroll(infoRef)}>??????</Menu.Item>
                                <Menu.Item key="field" onClick={() => onClickScroll(fieldRef)}>??????</Menu.Item>
                                <Menu.Item key="web" onClick={() => onClickScroll(webRef)}>???</Menu.Item>
                                <Menu.Item key="tech" onClick={() => onClickScroll(techRef)}>??????</Menu.Item>
                                <Menu.Item key="equip" onClick={() => onClickScroll(equipRef)}>??????</Menu.Item>
                                <Menu.Item key="career" onClick={() => onClickScroll(careerRef)}>??????</Menu.Item>
                            </Menu>

                        </div>
                        <div className={styles.edit_side_main} >
                            {/*info*/}
                            <div className={styles.edit_card_wrapper}  ref={basicRef}>
                                <div className={styles.edit_card_title}>?????? ??????</div>
                                <div style={{marginBottom:"5px"}}>
                                    <div className={styles.edit_card_sub_title}>??????</div>
                                    <div className={styles.edit_card_sub_explain}>(??????)</div>
                                </div>
                                <Input
                                    placeholder="?????????????????? ???????????? ???????????????."
                                    className={styles.edit_card_input}
                                    maxLength={34}
                                    value={userName}
                                    onChange={onChangeUserName}
                                    onKeyUp={onKeyUpUserName}
                                />

                                <div style={{marginBottom:"5px"}}>
                                    <div className={styles.edit_card_sub_title}>??????</div>
                                </div>
                                <Input
                                    placeholder="?????? ????????? ???????????????."
                                    className={styles.edit_card_input}
                                    maxLength={25}
                                    value={userJob}
                                    onChange={onChangeUserJob}
                                />

                                <div style={{marginBottom:"5px"}}>
                                    <div className={styles.edit_card_sub_title}>??????</div>
                                </div>
                                <Select id={"antSelect"} size={"default"} defaultValue={
                                    userLocation !== ""
                                        ? userLocation
                                        : "???????????????"
                                } style={{
                                    width: "100%",
                                    maxWidth:"344px",
                                    height:"36px",
                                }}
                                        value={userLocation}
                                        suffixIcon={suffix}
                                        onClick={onSelcetChange}
                                        onChange={onChangeLocation}
                                >
                                    {locationList.map(v => (
                                        <Option key={v}>{v}</Option>
                                    ))}
                                </Select>

                            </div>
                            {/*introduction*/}
                            <div className={styles.edit_card_wrapper} ref={infoRef}>
                                <div className={styles.edit_card_title}>??????</div>
                                <div style={{marginBottom:"6px"}}>
                                    <div className={styles.edit_card_sub_title}>????????????</div>
                                </div>
                                <textarea
                                    placeholder="????????? ????????? ???????????????."
                                    className={styles.edit_card_textarea}
                                    ref={ref}
                                    onInput={handleResizeHeight}
                                    value={userIntroduce}
                                    onChange={onChangeUserIntroduce}
                                    maxLength={500}
                                />
                            </div>

                            <div className={styles.edit_card_wrapper} ref={fieldRef}>
                                <div className={styles.edit_card_title}>??????</div>
                                <div style={{marginBottom:"6px"}}>
                                    <div className={styles.edit_card_sub_explain}>?????? ???????????? ?????? ?????????????</div>
                                </div>
                                <Checkbox.Group style={{ width: '100%' }} value={userField} onChange={onChangeField}>
                                    {
                                        fieldList.map((v) => (
                                            <Checkbox className={styles.edit_card_checkbox} value={v}>{v}</Checkbox>
                                        ))
                                    }
                                    <div className={styles.edit_card_add_link} onClick={onClickAddField}>?????? ????????????</div>
                                </Checkbox.Group>

                            </div>

                            <div className={styles.edit_card_wrapper} ref={webRef}>
                                <div className={styles.edit_card_title}>???</div>
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
                                            "none":<><div className={styles.sns_link_btn} onClick={() => {setInsta("edit")}}>??????</div></>,
                                            "edit":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setInsta("none")
                                                        setUserInstagram("")
                                                    }}></div>
                                                    <div className={styles.sns_edit_btn} onClick={() => {setInsta("save")}}>??????</div>
                                                    <input className={styles.sns_edit_input} placeholder={"??????"} type="text" value={userInstagram} onChange={onChangeUserInstagram}/>
                                                </>,
                                            "save":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setInsta("none")
                                                        setUserInstagram("")
                                                    }}></div>
                                                    <div className={styles.sns_save_text}>{userInstagram}</div>
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
                                            "none":<><div className={styles.sns_link_btn} onClick={() => {setYoutube("edit")}}>??????</div></>,
                                            "edit":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setYoutube("none")
                                                        setUserYoutube("")
                                                    }}></div>
                                                    <div className={styles.sns_edit_btn} onClick={() => {setYoutube("save")}}>??????</div>
                                                    <input className={styles.sns_edit_input} placeholder={"??????"} type="text" value={userYoutube} onChange={onChangeUserYoutube}/>
                                                </>,
                                            "save":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setYoutube("none")
                                                        setUserYoutube("")
                                                    }}></div>
                                                    <div className={styles.sns_save_text}>{userYoutube}</div>
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
                                            "none":<><div className={styles.sns_link_btn} onClick={() => {setSoundcloud("edit")}}>??????</div></>,
                                            "edit":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setSoundcloud("none")
                                                        setUserSoundCloud("")
                                                    }}></div>
                                                    <div className={styles.sns_edit_btn} onClick={() => {setSoundcloud("save")}}>??????</div>
                                                    <input className={styles.sns_edit_input} placeholder={"??????"} type="text" value={userSoundCloud} onChange={onChangeUserSoundCloud}/>
                                                </>,
                                            "save":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setSoundcloud("none")
                                                        setUserSoundCloud("")
                                                    }}></div>
                                                    <div className={styles.sns_save_text}>{userSoundCloud}</div>
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
                                            "none":<><div className={styles.sns_link_btn} onClick={() => {setFacebook("edit")}}>??????</div></>,
                                            "edit":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setFacebook("none")
                                                        setUserFacebook("")
                                                    }}></div>
                                                    <div className={styles.sns_edit_btn} onClick={() => {setFacebook("save")}}>??????</div>
                                                    <input className={styles.sns_edit_input} placeholder={"??????"} type="text" value={userFacebook} onChange={onChangeUserFacebook}/>
                                                </>,
                                            "save":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setFacebook("none")
                                                        setUserFacebook("")
                                                    }}></div>
                                                    <div className={styles.sns_save_text}>{userFacebook}</div>
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
                                            "none":<><div className={styles.sns_link_btn} onClick={() => {setTwitter("edit")}}>??????</div></>,
                                            "edit":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setTwitter("none")
                                                        setUserTwitter("")
                                                    }}></div>
                                                    <div className={styles.sns_edit_btn} onClick={() => {setTwitter("save")}}>??????</div>
                                                    <input className={styles.sns_edit_input} placeholder={"??????"} type="text" value={userTwitter} onChange={onChangeUserTwitter}/>
                                                </>,
                                            "save":
                                                <>
                                                    <div className={styles.sns_edit_close}  onClick={() => {
                                                        setTwitter("none")
                                                        setUserTwitter("")
                                                    }}></div>
                                                    <div className={styles.sns_save_text}>{userTwitter}</div>
                                                </>,
                                        }[twitter]}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.edit_card_wrapper} ref={techRef}>
                                <div className={styles.edit_card_title}>??????</div>
                                {
                                    techList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={techList} trigger={setTech}
                                                       triggerSet={setTechAdd} param={techAdd} mode={setEditTechMode}
                                                       checker={editTechMode} checkerSet={setTechList}
                                            ></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    tech
                                        ?(
                                            <AddCard value={techAdd} type={setTech} mode={setEditTechMode}
                                                     checker={editTechMode} triggerSet={setTechAdd} checkerSet={setTechList}
                                                     addList={techList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div style={{marginBottom:"6px"}}>
                                    <div className={styles.edit_card_sub_explain}>???????????????, ?????? ?????? ?????? ???????????????.</div>
                                </div>
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(tech,setTech,techAdd,setTechAdd)}>+  ?????? ??????</div>
                            </div>

                            <div className={styles.edit_card_wrapper} ref={equipRef}>
                                <div className={styles.edit_card_title}>??????</div>
                                {
                                    equipList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={equipList} trigger={setEquip}
                                                       triggerSet={setEquipAdd} param={equipAdd} mode={setEditEquipMode}
                                                       checker={editEquipMode} checkerSet={setEquipList}></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    equip
                                        ?(
                                            <AddCard value={equipAdd} type={setEquip} mode={setEditEquipMode}
                                                     checker={editEquipMode} triggerSet={setEquipAdd} checkerSet={setEquipList}
                                                     addList={equipList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div style={{marginBottom:"6px"}}>
                                    <div className={styles.edit_card_sub_explain}>???????????? ?????? ??????, ????????? ???????????????.</div>
                                </div>
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(equip,setEquip,equipAdd,setEquipAdd)}>+  ?????? ??????</div>
                            </div>

                            <div className={styles.edit_card_wrapper} ref={careerRef}>
                                <div className={styles.edit_card_title}>?????? ??????</div>
                                {
                                    careerList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={careerList} trigger={setCareer}
                                                       triggerSet={setCareerAdd} param={careerAdd} mode={setEditCareerMode}
                                                       checker={editCareerMode} checkerSet={setCareerList}></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    career
                                        ?(
                                            <AddCard value={careerAdd} type={setCareer} mode={setEditCareerMode}
                                                     checker={editCareerMode} triggerSet={setCareerAdd} checkerSet={setCareerList}
                                                     addList={careerList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(career,setCareer,careerAdd,setCareerAdd)}>+  ?????? ?????? ??????</div>
                            </div>

                            <div className={styles.edit_card_wrapper}>
                                <div className={styles.edit_card_title}>??????</div>
                                {
                                    awardList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={awardList} trigger={setAward}
                                                       triggerSet={setAwardAdd} param={awardAdd} mode={setEditAwardMode}
                                                       checker={editAwardMode} checkerSet={setAwardList}></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    award
                                        ?(
                                            <AddCard value={awardAdd} type={setAward} mode={setEditAwardMode}
                                                     checker={editAwardMode} triggerSet={setAwardAdd} checkerSet={setAwardList}
                                                     addList={awardList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(award,setAward,awardAdd,setAwardAdd)}>+  ????????????</div>
                            </div>

                            <div className={styles.edit_card_wrapper}>
                                <div className={styles.edit_card_title}>??????</div>
                                {
                                    eduList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={eduList} trigger={setEdu}
                                                       triggerSet={setEduAdd} param={eduAdd} mode={setEditEduMode}
                                                       checker={editEduMode} checkerSet={setEduList}></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    edu
                                        ?(
                                            <AddCard value={eduAdd} type={setEdu} mode={setEditEduMode}
                                                     checker={editEduMode} triggerSet={setEduAdd} checkerSet={setEduList}
                                                     addList={eduList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(edu,setEdu,eduAdd,setEduAdd)}>+  ????????????</div>
                            </div>

                            <div className={styles.edit_card_wrapper}>
                                <div className={styles.edit_card_title}>??????</div>
                                {
                                    createList.map((value, index) => (
                                        <>
                                            <ValueCard value={value} index={index} type={createList} trigger={setCreate}
                                                       triggerSet={setCreateAdd} param={createAdd} mode={setEditCreateMode}
                                                       checker={editCreateMode} checkerSet={setCreateList}></ValueCard>
                                        </>
                                    ))
                                }
                                {
                                    create
                                        ?(
                                            <AddCard value={createAdd} type={setCreate} mode={setEditCreateMode}
                                                     checker={editCreateMode} triggerSet={setCreateAdd} checkerSet={setCreateList}
                                                     addList={createList}></AddCard>
                                        )
                                        :(
                                            <></>
                                        )
                                }
                                <div style={{marginBottom:"6px"}}>
                                    <div className={styles.edit_card_sub_explain}>?????? ??????, ????????? ?????? ?????? ?????? ???????????????.</div>
                                </div>
                                <div className={styles.edit_card_add_link} style={{marginTop:"4px"}}
                                     onClick={() => onClickAddText(create,setCreate,createAdd,setCreateAdd)}>+  ????????????</div>
                            </div>

                        </div>
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
                                                                        :"https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/profimg_default.svg"
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

                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>????????????</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>????????????</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={
                                                            user && user.email
                                                                ?`/profile/${user.email}`
                                                                :`/profile/1`
                                                        }><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_4}></div>
                                                            <div className={sideStyles.side_nav_content}>????????? ??????</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/profile/edit"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_5}></div>
                                                            <div className={sideStyles.side_nav_content}>????????? ??????</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <div onClick={() => onCLickLogOut()} style={{cursor:"pointer", display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_6}></div>
                                                            <div className={sideStyles.side_nav_content}>????????????</div>
                                                        </div>
                                                    </div>


                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div onClick={() => setOpenAble(true)} className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>????????????</a></Link>
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
                                                        ?????????????????? ????????? ???????????????
                                                        <br/>
                                                        ??????????????? ???????????????!
                                                    </div>
                                                    <div style={{display:"block",paddingLeft:"20px", height:"56px", marginTop:"16px", borderBottom:"1px solid #E8E8E8", minWidth:"320px"}}>
                                                        <div style={{display:"inline-block"}}><Link href="/signin/login"><a><Button className={sideStyles.side_login}>?????????</Button></a></Link></div>
                                                        <div style={{display:"inline-block", marginLeft:"12px"}}><Link href="/signin/signup"><a><Button className={sideStyles.side_signup}>????????????</Button></a></Link></div>
                                                    </div>

                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_1}></div>
                                                            <div className={sideStyles.side_nav_content}>????????????</div>
                                                        </a></Link>
                                                    </div>
                                                    <div onClick={() => setOpenAble(true)}>
                                                        <Link href={"/project"}><a style={{display:"block", paddingLeft:"16px", height:"60px", borderBottom:"1px solid #E8E8E8"}}>
                                                            <div className={sideStyles.side_nav_2}></div>
                                                            <div className={sideStyles.side_nav_content}>????????????</div>
                                                        </a></Link>
                                                    </div>

                                                    <div
                                                        style={{
                                                            position:"absolute",
                                                            bottom: "0px",
                                                            width:"100%",
                                                            minWidth:"320px"
                                                        }}>
                                                        <div onClick={() => setOpenAble(true)} className={sideStyles.side_link_wrapper}>
                                                            <Link href={"/agreements/service"}><a>????????????</a></Link>
                                                        </div>
                                                        <div className={sideStyles.side_sns_wrapper}>
                                                            <Link href={"https://www.instagram.com/brmn.music/"}><a><div className={sideStyles.side_sns_1}></div></a></Link>
                                                            <Link href={"https://www.youtube.com/channel/UCCkwGVEZn-c6udCK-RXO2ig"}><a><div className={sideStyles.side_sns_2}></div></a></Link>
                                                            <Link href={"https://www.facebook.com/%EB%B8%8C%EB%A0%88%EB%A9%98-brmn-100401712331312"}><a><div className={sideStyles.side_sns_3}></div></a></Link>
                                                            <Link href={"https://twitter.com/brmn_music"}><a><div className={sideStyles.side_sns_4}></div></a></Link>
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
        </div>
    )
}

export default Edit
