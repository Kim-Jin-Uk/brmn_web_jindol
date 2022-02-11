import React, {useCallback, useEffect, useState} from "react";
import Header from "../../components/Header";
import dynamic from "next/dynamic";
import {createGlobalStyle} from "styled-components";
import styles from "../../styles/Project.module.scss"
import {Select, Checkbox, Modal, message, Progress} from "antd";
import Button from "../../components/Button";
import {GET_MY_PROFILE_REQUEST, LOG_IN_REQUEST} from "../../reducers/user";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import useInput from "../../hooks/useInput";
import {UPLOAD_PROJECT_DONE, UPLOAD_PROJECT_REQUEST, UPLOAD_PROJECT_THUMB_IMAGE_REQUEST} from "../../reducers/project";
import ProfileThumbnail from "../../components/ProfileThumbnail";
const { Option } = Select;
const TextEdit = dynamic(
    () => {
        return import("../../components/TextEdit");
    },
    { ssr: false }
);

const Global = createGlobalStyle`
  .ant-message{
    z-index: 3000;
  }
    body{
      background: #fafafa;
    }

    .ant-modal-mask{
      z-index: 3000 !important;
    }
    
    .ant-modal-wrap{
      z-index: 3000 !important;
    }
    
    .ant-modal{
      z-index: 4000 !important;
      transform: translateY(-50%);
      top: 50%;
    }
    
    .ant-checkbox-group{
      margin-left: 52px;
    }

    .ant-select{
      width: calc(100% - 76px);
      margin-left: 16px;
      border-radius: 4px !important;
    }
    
    .ant-select-selector {
      border: 1px solid #CCCCCC !important;
      box-shadow: none !important;
      width: 100% !important;
      height: 36px !important;
      border-radius: 4px !important;
      > span{
        font-family: Spoqa Han Sans Neo;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        color: #1D1D1D;
      }
    }

    .ant-select-arrow{
      margin-top: -5px !important;
    }

    .ant-select-selection-item{
      margin-top: 2px !important;
    }
    
    .ant-select-dropdown{
      z-index: 2000;
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

    @media (min-width: 600px) and (max-width: 840px) {


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

        > div {
          font-family: Spoqa Han Sans Neo;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 150%;
          color: #1D1D1D;
        }
      }

      .ant-modal-footer {
        background: #fafafa;
        height: 60px;
        padding: 12px 20px;
      }

      .ant-checkbox {
        margin-right: 4px;
      }
    }
  .ant-progress-bg{
    background-color: #33F4A3;
  }
  .ant-progress-text{
    display: none;
  }
  .ant-progress-outer{
    padding: 0 32px !important;
    margin-bottom: 36px;
  }
`

const Upload = () => {
    const dispatch = useDispatch();
    const {user, logInDone, getMyProfileError} = useSelector((state) => state.user);
    const {projectThumbImagePath, uploadProjectDone,uploadProjectLoading, uploadProjectImageError,
        uploadProjectError} = useSelector((state) => state.project);
    const [uploadBtn, setUploadBtn] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [select, setSelect] = useState(true)
    const onSelcetChange = useCallback(() => {
        setSelect(!select)
    })
    const [percent,setPercent] = useState(0)
    let timer = null
    const [title,onChangeTitle] = useInput("")
    const [projectField, setProjectField] = useState([])
    const [imgUrl, setImgUrl] = useState("https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/project/img_select.svg")
    const [imgSet,setImgSet] = useState(false)
    const [hashList,setHashList] = useState([])
    const [techList,setTechList] = useState([])
    const [userCopyright, setUserCopyright] = useState("판권 소유")
    const [mainText,setMainText] = useState([])

    const copyrightList = [
        "판권 소유",
        "저작자표시 (CC BY)",
        "저작자표시 동일조건변경허락 (CC BY-SA)",
        "저작자표시 변경금지 (CC BY-ND)",
        "저작자표시-비영리 (CC BY-NC)",
        "저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)",
        "저작자표시-비영리-변경금지 (CC BY-NC-ND)"
    ]


    const [fieldList, setFieldList] = useState([
        "보컬","촬영편집","사운드","기획","디자인"
    ])
    const [fieldName, setFieldName] = useState("")

    const imgUpload = () =>{
        const input = document.createElement("input")
        input.setAttribute("type","file")
        input.setAttribute("name","projectImage")
        input.setAttribute("accept","image/*")
        input.click()
        input.onchange = async (e) => {
            const imageFormData = new FormData();
            imageFormData.append('projectImage', e.target.files[0]);
            console.log(e.target.files[0])
            dispatch({
                type: UPLOAD_PROJECT_THUMB_IMAGE_REQUEST,
                data: imageFormData
            });

        }
    }

    useEffect(() => {
        if (uploadProjectImageError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[uploadProjectImageError])

    useEffect(() => {
        if (projectThumbImagePath){
            setImgUrl(projectThumbImagePath.fileName)
            setImgSet(true)
        }
    },[projectThumbImagePath])

    const onEnterHash = (e) => {
        if (e.key === "Enter"){
            if (hashList.length >= 30){
                message.warning("태그는 30개까지 입력가능합니다.")
            }else {
                const item = e.target.innerText.replace(/\n/gi,'').toLowerCase()
                if (!hashList.includes(item)){
                    if (item.replace(/(\s*)/g,'') !== ''){
                        if (item.length >= 30){
                            message.warning("태그는 30자까지 입력가능합니다.")
                        }else {
                            setHashList([...hashList,item])
                        }
                    }else {

                    }
                }else {
                    message.warning("동일한 태그를 입력하셨습니다.")
                }
            }
            e.target.innerText = ""
        }
    }
    const onEnterTech = (e) => {
        if (e.key === "Enter"){
            if (techList.length >= 30){
                message.warning("태그는 30개까지 입력가능합니다.")
            }else {
                const item = e.target.innerText.replace(/\n/gi,'').toLowerCase()
                if (!techList.includes(item)){
                    if (item.replace(/(\s*)/g,'') !== ''){
                        if (item.length >= 30){
                            message.warning("태그는 30자까지 입력가능합니다.")
                        }else {
                            setTechList([...techList,item])
                        }
                    }else {

                    }
                }else {
                    message.warning("동일한 태그를 입력하셨습니다.")
                }
            }
            e.target.innerText = ""
        }
    }

    const onClickRemoveHash = (index) => {
        setHashList(hashList.filter((v,i) => i !== index))
    }
    const onClickRemoveTech = (index) => {
        setTechList(techList.filter((v,i) => i !== index))
    }

    const onClickAddField = () => {
        setModalVisible(true)
    }

    const onClickCloseAddField = () => {
        setModalVisible(false)
    }

    const onChangeFieldName = (e) =>{
        setFieldName(e.target.value)
    }

    const addModalFieldItem = () =>{
        const item = fieldName.toLowerCase()
        if (fieldList.length >= 30){
            message.warning("태그는 30개까지 입력가능합니다.")
        }else {
            if (!fieldList.includes(item)){
                setFieldList([...fieldList, item])
                setModalVisible(false)
            }else {
                message.warning("동일한 태그가 존재합니다.")
            }
        }
        setFieldName("")

    }

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
        if (!uploadProjectLoading){
            clearTimeout(timer)
        }else {
            timer = setTimeout(() => {
                if (percent < 100){
                    setPercent(percent + 1)
                }
                else {
                    setPercent(0)
                }
            },100)
        }
    },[uploadProjectLoading])

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
        if (getMyProfileError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[getMyProfileError])

    const onChangeField = (v) => {
        if (v.length > 10){
            return message.warning('분야는 최대 10개까지 선택 가능합니다.')
        }else {
            setProjectField(v)
        }
    }

    const suffix = <>
        {
            select
                ? <div className={styles.edit_card_select_icon}></div>
                : <div className={styles.edit_card_clear_icon}></div>
        }
    </>


    const onChangeCopyright = (v) => {
        setUserCopyright(v)
    }

    const onCLickUploadBtn = () => {
        if (mainText.length < 1){
            message.warning("본문 내용을 입력해주세요.")
        }
        else if (title.length < 1){
            message.warning("제목을 입력해주세요.")
        }else if (projectField.length < 1){
            message.warning("분야를 선택해주세요.")
        }else if (imgUrl === "https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/project/img_select.svg"){
            message.warning("표지 이미지를 선택해주세요.")
        }else {
            dispatch({
                type:UPLOAD_PROJECT_REQUEST,
                data:{
                    mainText:mainText,
                    title:title,
                    field:projectField,
                    image:imgUrl,
                    copyright:userCopyright,
                    hashList:hashList,
                    techList:techList
                }
            })
        }
    }

    useEffect(() => {
        if (uploadProjectError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[uploadProjectError])

    useEffect(() => {
        if (uploadProjectDone){
            dispatch({
                type:UPLOAD_PROJECT_DONE
            })
            message.success("프로젝트가 성공적으로 업로드 되었습니다.")
            Router.back()
        }
    },[uploadProjectDone])

    return(
        <>
            <Global></Global>
            <Header btnType={"upload"} upload={uploadBtn} setUpload={setUploadBtn}></Header>
            <div>
                <div style={{maxWidth:"960px", background:"#ffffff",margin:"0 auto", minHeight:"calc(100vh - 56px)",
                border:"1px solid #E8E8E8"}}>
                    <TextEdit mainText={mainText} setMainText={setMainText}></TextEdit>
                </div>

                {
                    uploadBtn
                        ?(
                            <div style={{position:"absolute", top:"0", zIndex:"2000", width:"100vw", height:"100vh", minWidth:"340px"}}>
                                    <div className={styles.detail_blank}></div>
                                    <aside style={{overflowY:"scroll", overflowX:"hidden"}} className={styles.detail_wrapper}>
                                        <div className={styles.side_top_wrapper}>
                                            <div className={styles.side_top_close_btn} onClick={() => setUploadBtn(false)}></div>
                                            <div onClick={() => onCLickUploadBtn()} className={styles.side_top_upload_btn}>업로드</div>
                                        </div>
                                        <div style={{paddingTop:"4px", border:"none"}}>
                                            <div className={styles.detail_box}>
                                                <div className={styles.detail_title}>제목*</div>
                                                <input maxLength={60} value={title} onChange={onChangeTitle} className={styles.detail_edit} type="text" placeholder={"제목"}/>
                                            </div>
                                            <div className={styles.detail_box} style={{height:"auto"}}>
                                                <div className={styles.detail_title}>분야*</div>
                                                <div className={styles.detail_sub_title}>어떤 분야의 프로젝트입니까?</div>
                                                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeField}>
                                                    {
                                                        fieldList.map((v) => (
                                                            <Checkbox className={styles.edit_card_checkbox} value={v}>{v}</Checkbox>
                                                        ))
                                                    }
                                                    <div className={styles.edit_card_add_link} onClick={onClickAddField}>기타 작성하기</div>
                                                </Checkbox.Group>
                                            </div>
                                            <div className={styles.detail_box} style={{height:"240px"}}>
                                                <div className={styles.detail_title} style={{verticalAlign:"top", position:"static", top:"0", transform:"translateY(0)"}}>표지*</div>
                                                <div onClick={imgUpload} className={styles.detail_img_wrapper}>
                                                    <ProfileThumbnail circle size={240} image={
                                                        imgUrl.replace(/\/thumb\//,'/project/')
                                                    }></ProfileThumbnail>
                                                </div>
                                                {
                                                    imgSet
                                                        ?(
                                                            <div>
                                                                <div className={styles.detail_img_select}>
                                                                    <Button onClick={imgUpload} className={styles.detail_img_select_btn}>이미지 변경</Button>
                                                                </div>
                                                            </div>
                                                        )
                                                        :<></>
                                                }

                                            </div>
                                            <div className={styles.detail_box}>
                                                <div className={styles.detail_title}>저작권</div>
                                                <Select defaultValue="저작자표시 (CC BY)"
                                                        value={userCopyright}
                                                        suffixIcon={suffix}
                                                        onClick={onSelcetChange}
                                                        onChange={onChangeCopyright}
                                                >
                                                    {copyrightList.map(v => (
                                                        <Option key={v}>{v}</Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className={styles.detail_box} style={{height:"auto", minHeight:"36px"}}>
                                                <div className={styles.detail_title} style={{verticalAlign:"top",  top:"7px", transform:"translateY(0)"}}>태그</div>
                                                <div className={styles.detail_edit} style={{height:"auto", minHeight:"36px"}}>
                                                    {
                                                        hashList.map((v,i) => (
                                                            <div className={styles.tag}>
                                                                <div>{v}</div>
                                                                <div className={styles.tag_close}
                                                                     onClick={() => onClickRemoveHash(i)}></div>
                                                            </div>
                                                        ))
                                                    }
                                                    <span contentEditable className={styles.tag_input} type="text" placeholder={"#태그입력 엔터로 구분하여 입력"} onKeyUp={onEnterHash}></span>
                                                </div>
                                            </div>
                                            <div className={styles.detail_box} style={{height:"auto", minHeight:"36px"}}>
                                                <div className={styles.detail_title} style={{verticalAlign:"top",  top:"7px", transform:"translateY(0)"}}>기술</div>
                                                <div className={styles.detail_edit} style={{height:"auto", minHeight:"36px"}}>
                                                    {
                                                        techList.map((v,i) => (
                                                            <div className={styles.tag}>
                                                                <div>{v}</div>
                                                                <div className={styles.tag_close}
                                                                     onClick={() => onClickRemoveTech(i)}></div>
                                                            </div>
                                                        ))
                                                    }
                                                    <span contentEditable className={styles.tag_input} type="text" placeholder={"소프트웨어, 장비를 엔터로 구분하여 입력"} onKeyUp={onEnterTech}></span>
                                                </div>
                                                <div style={{marginBottom:"100px"}}></div>
                                            </div>
                                        </div>
                                    </aside>
                            </div>
                        )
                        :<></>
                }
            </div>

            <Modal title="" visible={uploadProjectLoading} footer={null}>
                <div className={styles.progress_title}>저장 중입니다. 잠시만 기다려주세요</div>
                <Progress percent={percent}></Progress>
            </Modal>

            <Modal
                visible={modalVisible}
                title="기타 분야 작성"
                footer={[
                    <Button className={`${styles.pop_btn} ${styles.save_btn}`} onClick={addModalFieldItem}>
                        저장
                    </Button>,
                    <Button className={`${styles.pop_btn} ${styles.cancle_btn}`} onClick={onClickCloseAddField}>
                        취소
                    </Button>,
                ]}
            >
                <div>분야 이름</div>
                <input maxLength={20} className={styles.add_field_input2} onChange={onChangeFieldName} value={fieldName} type="text" placeholder={"분야 이름을 입력합니다."}/>
            </Modal>

        </>
    )
}

export default Upload
