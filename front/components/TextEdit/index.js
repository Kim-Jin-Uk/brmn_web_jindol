import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {createGlobalStyle} from "styled-components";
import styles from './styles.module.scss'
import {message, Modal, Popover} from "antd";
import Button from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {ADD_DONE_PROJECT_IMAGE, UPLOAD_PROJECT_IMAGE_REQUEST} from "../../reducers/project";

const Global = createGlobalStyle`
  .ql-video {
    width: 100%;
    height: calc(100vw * 117.5 / 210);
  }

  .ql-editor {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: #1D1D1D;
    padding: 61px 20px 100px !important;
    min-height: calc(100vh - 61px);

  }

  .ql-container {
    border: none !important;
    min-height: calc(100vh - 61px);
  }

  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #E8E8E8;
    position: absolute;
    background: #ffffff;
    z-index: 1000;
    width: 100%;
    top: 56px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "유튭 주소";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    content: "임베딩";
  }

  .ql-snow .ql-tooltip input[type=text] {
    outline: none;
  }

  img {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer !important;
  }

  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer !important;
  }

  .ant-modal-close-x {
    display: none;
  }

  .ant-modal-header {
    padding: 28px 0 8px;
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .ant-modal-body{
    margin-left: 20px;
    margin-right: 20px;
    padding: 20px 0 28px;
  }
  
  .ant-modal-footer{
    background: #FAFAFA;
    border-top: 1px solid #E8E8E8;
    height: 60px;
  }

  @media (min-width: 600px){
    .ql-editor {
      padding: 61px 40px 100px;
    }
  }

  @media (min-width: 960px){
    .ql-toolbar.ql-snow {
      width: 958px;
    }
  }
  
`

function BtnCancle(onClickBtnCancle){
    return(
        <Button className={styles.btn_cancle} key="back" onClick={onClickBtnCancle.onClickBtnCancle}>
            취소
        </Button>
    )
}

function BtnOk(onClickBtnOk){
    return(
        <Button className={styles.btn_Ok} key="back" onClick={onClickBtnOk.onClickBtnOk}>
            저장
        </Button>
    )
}


const TextEdit = (param) => {
    const dispatch = useDispatch()
    const {projectImagePath,uploadProjectImageError} = useSelector((state) => state.project);
    const [value, setValue] = useState("");
    const [img, setImg] = useState("")
    const [visible, setVisible] = useState(false);
    const [youtube, setYoutube] = useState("");
    const [imgList, setImgList] = useState([])
    const [view, setView] = useState("none")
    const [index, setIndex] = useState(null)
    const imageInput = useRef();
    const bottomRef = useRef(null)
    const [inputChecker,setInputChecker] = useState(true)

    useEffect(() => {
        if (param.mainText.length > 1 && inputChecker){
            setInputChecker(false)
            console.log(param.mainText)
            let inputText = ''
            let imgArray = []
            for (let i = 0; i < param.mainText.length; i++) {
                const text = param.mainText[i]
                if (text.detail_type === "youtube"){
                    inputText += `<p><img src="https://i.ytimg.com/vi/${text.contents}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBEsg2dBu3QxwppLU0hIrT3b00q3g"></p>`
                    imgArray.push(`<img src="https://i.ytimg.com/vi/${text.contents}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBEsg2dBu3QxwppLU0hIrT3b00q3g">`)
                }
                if (text.detail_type === "image"){
                    inputText += `<p><img src="${text.contents}"></p>`
                    imgArray.push(`<img src="${text.contents}">`)
                }
                if (text.detail_type === "text"){
                    inputText += `<p>${text.contents}</p>`
                }
            }
            setValue(inputText)
            setImgList(imgArray)
        }
    },[param.mainText])

    useEffect(() => {
        console.log(imgList)
    },[imgList])

    useEffect(()=>{
        if (img !== ""){
            setValue(value + img + "<p> </p>")
            setImgList([...imgList,img])
            setImg("")
            setYoutube("")
            dispatch({
                type:ADD_DONE_PROJECT_IMAGE
            })
        }
    },[img])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'auto',
            block:"end",
        });
    },[img,bottomRef])

    useEffect(() => {
        document.body.onclick = function (e) {
            if (e.target.id){
                if (parseInt(e.target.id, 10) >= 0){
                    console.log(e.target.id)
                }else {
                    setView("none")
                }
            }else {
                setView("none")
            }
        }

        const imgItems = document.getElementsByTagName("img")

        if (imgItems.length > 4){
            for (let i = 0; i < imgItems.length - 4; i++) {
                const imgItem = imgItems.item(i+4)
                imgItem.id = i
                imgItem.addEventListener("click",function(x){
                    setView("inline-block")
                    const positionLeft = x.clientX;
                    const positionTop = x.clientY;
                    document.getElementById('result').style.left = positionLeft - 20 + "px";
                    document.getElementById('result').style.top = positionTop - 50 +"px";
                    setIndex(i)
                })
            }
        }
    })

    const imageHandler = useCallback(() => {
        imageInput.current.click()
    },[imageInput.current])

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        imageFormData.append('projectImage', e.target.files[0]);
        dispatch({
            type: UPLOAD_PROJECT_IMAGE_REQUEST,
            data: imageFormData
        });
    })

    useEffect(() => {
        if (uploadProjectImageError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[uploadProjectImageError])

    useEffect(() => {
        if (projectImagePath){
            const imgString = `<img src="${projectImagePath.fileName}">`
            setImg(imgString)
        }
    },[projectImagePath])

    const onClickBtnOk = () => {
        let url = ""
        const propList = youtube.toString().split("/")
        if (propList[propList.length-1].includes("watch?v=")){
            url = `${propList[propList.length-1].replace("watch?v=","")}`
        }else {
            url = `${propList[propList.length-1]}`
        }

        setVisible(false)
        const videoString = `<img src="https://i.ytimg.com/vi/${url}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBEsg2dBu3QxwppLU0hIrT3b00q3g">`
        setImg(videoString)
    }
    const onClickBtnCancle = () => {
        setVisible(false)
    }
    const handleChange = (e) => {
        setYoutube(e.target.value)
    }
    const linkHandler = () => {
        setVisible(true)
    }

    const modules = useMemo(() => {
        return(
            {
                toolbar:{
                    container: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['video', 'image'],
                    ],
                    handlers: {
                        video:linkHandler,
                        image:imageHandler
                    }
                }
            }
        )
    },[img])

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'video', 'image',
    ]

    const onClickPopOver = () => {
        const imgArray = imgList.filter((value) => value != '')
        let slicer = imgArray[index]

        if (value.includes(slicer)){
            let v = value.replace(slicer,"")
            console.log("slicer",slicer)
            slicer = slicer.replace(">",` id="${index}">`)
            setValue(v.replace(slicer,""))
            console.log("after",value.replace(slicer,""))
        }else {
            if (slicer.includes("&rs")){
                slicer = slicer.replace("&rs","&amp;rs")
                let v = value.replace(slicer,"")
                console.log("slicer",slicer)
                slicer = slicer.replace(">",` id="${index}">`)
                setValue(v.replace(slicer,""))
                console.log("after",value.replace(slicer,""))
            }
        }
        setImgList(imgArray.filter((value,i) => i !== index))
        setView("none")
    }

    useEffect(() => {
        const valueList = value.split("<p>")
        let realValue = []
        for (let i = 0; i < valueList.length; i++) {
            const valueItem = valueList[i].split("</p>")
            for (let j = 0; j < valueItem.length; j++) {
                const valueItemKey = valueItem[j]
                if (valueItemKey !== '') {
                    if (valueItemKey.includes('src="')){
                        const valueUrl = valueItemKey.split('src="')[1].split('"')[0]
                        if (valueUrl.includes('https://i.ytimg.com/vi/')){
                            realValue.push("youtube:"+valueUrl.split('https://i.ytimg.com/vi/')[1].split('/')[0])
                        }else {
                            realValue.push("image:"+valueUrl)
                        }
                    }else {
                        realValue.push("<pre>"+valueItemKey+"</pre>")
                    }
                }
            }
        }
        param.setMainText(realValue)
    },[value])

    return(
        <>
            <Global></Global>
            <div style={{minWidth:"320px"}}>
                <input type="file" name="projectImage" hidden ref={imageInput} onChange={onChangeImages} />
                <ReactQuill modules={modules} formats={formats} theme="snow" value={value} onChange={setValue} />
            </div>
            <div>
                <Modal
                    className={styles.modal}
                    title="링크 업로드"
                    visible={visible}
                    footer={[
                        <BtnOk onClickBtnOk={onClickBtnOk}></BtnOk>,
                        <BtnCancle onClickBtnCancle={onClickBtnCancle}></BtnCancle>,
                    ]}
                >
                    <div className={styles.input_title}>링크 추가</div>
                    <input className={styles.input} type="text" value={youtube} onChange={handleChange} placeholder={"유튜브 주소를 입력해 주세요"}/>
                </Modal>
            </div>

            <div id="result"
                 className={styles.popover}
                 style={{position: "absolute", display:`${view}`}}
                onClick={onClickPopOver}
            > </div>

            <div style={{width:"100%",height:"1px"}} ref={bottomRef}></div>
        </>
    )
}

export default TextEdit
