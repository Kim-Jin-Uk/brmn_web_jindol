import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {createGlobalStyle} from "styled-components";
import styles from './styles.module.scss'
import {Modal} from "antd";
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
    padding: 61px 20px 20px;
    min-height: 400px;

  }

  .ql-container {
    border: none !important;
    min-height: 400px;
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
    const [video, setVideo] = useState("")
    const [visible, setVisible] = useState(false);
    const [youtube, setYoutube] = useState("");
    const [imgList, setImgList] = useState([])
    const [videoList, setVideoList] = useState([])
    const [isOverIframe, setIsOverIframe] = useState(false)

    useEffect(()=>{
        setValue(value + img)
        setImgList([...imgList,img])
        setImg("")
    },[img])

    useEffect(()=>{
        setValue(value + video)
        setVideoList([...videoList,video])
        setImg("")
    },[video])

    function processMouseOut(){
        setIsOverIframe(false)
        top.focus()
    }
    function processMouseOver(){
        setIsOverIframe(true)
    }

    const onBackgroundClick = useCallback(()=> {
        console.log(isOverIframe)
    },[isOverIframe])

    useEffect(() => {
        const videoItems = document.getElementsByTagName("iframe")
        const imgItems = document.getElementsByTagName("img")
        for (let i = 0; i < videoItems.length; i++) {
            const videoItem = videoItems[i]
            videoItem.onmouseover = processMouseOver
            videoItem.onmouseout = processMouseOut
            videoItem.contentWindow.document.getElementsByTagName("body")[0].addEventListener("click",function(){
                    console.log("clickclick")
                })
            window.onclick = onBackgroundClick
            videoItem.contentWindow.addEventListener("blur",function(){
                setValue(value.replace(videoList[i],""))
                setVideoList(videoList.filter((value,index) => index !== i))
            })
            videoItem.contentWindow.addEventListener("focus",function(){
                setValue(value.replace(videoList[i],""))
                setVideoList(videoList.filter((value,index) => index !== i))
            })
        }

        if (imgItems.length > 4){
            for (let i = 0; i < imgItems.length - 4; i++) {
                const imgArray = imgList.filter((value) => value != '')
                const imgItem = imgItems.item(i+4)
                imgItem.addEventListener("click",function(){
                    setValue(value.replace(imgArray[i],""))
                    setImgList(imgArray.filter((value,index) => index !== i))
                })
            }
        }

        console.log(imgItems,videoItems)
    },[imgList,videoList])

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
            url = `https://www.youtube.com/embed/${propList[propList.length-1].replace("watch?v=","")}`
        }else {
            url = `https://www.youtube.com/embed/${propList[propList.length-1]}`
        }
        setVisible(false)
        const videoString = `<iframe width="100%" height="calc(100% * 210 / 117.5)" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        setVideo(videoString)
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

    document.addEventListener("click", function () {
        if (isOverIframe){
            console.log(true)
        }
    })
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
        </>
    )
}

export default TextEdit
