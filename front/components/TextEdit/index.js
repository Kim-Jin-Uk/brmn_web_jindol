import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {createGlobalStyle} from "styled-components";
import styles from './styles.module.scss'
import {Modal, Popover} from "antd";
import Button from "../Button";
import {func} from "prop-types";

const Global = createGlobalStyle`
  .ql-video {
    width: 100%;
    height: calc(100vw * 117.5 / 210);
  }

  .ql-editor {
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #1D1D1D;
    padding: 61px 20px 100px;
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


const TextEdit = () => {
    const [value, setValue] = useState("");
    const [img, setImg] = useState("")
    const [visible, setVisible] = useState(false);
    const [youtube, setYoutube] = useState("");
    const [imgList, setImgList] = useState([])
    const [view, setView] = useState("none")
    const [index, setIndex] = useState(null)
    const Ref = useRef(null)

    useEffect(()=>{
        setValue(value + img)
        setImgList([...imgList,img])
        setImg("")
    },[img])

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

    const imageHandler = () => {
        const input = document.createElement("input")
        input.setAttribute("type","file")
        input.setAttribute("accept","image/*")
        input.click()
        input.onchange = async (e) => {
            if (input.files){
                const file = input.files[0]
                const formData = new FormData()
                formData.append("image",file)
                const imgString = `<img src="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E">`
                setImg(imgString)
            }
        }
    }
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
        console.log(value)
        let slicer = imgArray[index]

        if (value.includes(slicer)){
            setValue(value.replace(slicer,""))
        }else {
            if (slicer.includes("&rs")){
                slicer = slicer.replace("&rs","&amp;rs")
                setValue(value.replace(slicer,""))
                console.log(slicer)
                console.log(value.replace(slicer,""))
            }
        }

        setImgList(imgArray.filter((value,i) => i !== index))
        setView("none")
    }

    return(
        <>
            <Global></Global>
            <div style={{minWidth:"320px"}}>
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

        </>
    )
}

export default TextEdit
