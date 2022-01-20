import React, {useEffect, useState} from "react";
import Header from "../../components/Header";
import dynamic from "next/dynamic";
import {createGlobalStyle} from "styled-components";
import styles from "../../styles/Project.module.scss"
import {Select} from "antd";
import Image from "next/image";
import Button from "../../components/Button";
const { Option } = Select;
const TextEdit = dynamic(
    () => {
        return import("../../components/TextEdit");
    },
    { ssr: false }
);

const Global = createGlobalStyle`
    body{
      background: #fafafa;
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
`

const Upload = () => {

    const [uploadBtn, setUploadBtn] = useState(false)
    const [imgUrl, setImgUrl] = useState("")
    const [imgSet,setImgSet] = useState(false)
    const [hashList,setHashList] = useState([])
    const [techList,setTechList] = useState([])

    const imgUpload = () =>{
        const input = document.createElement("input")
        input.setAttribute("type","file")
        input.setAttribute("accept","image/*")
        input.click()
        input.onchange = async (e) => {
            if (input.files){
                const file = input.files[0]
                const formData = new FormData()
                formData.append("image",file)
                setImgUrl("https://helpx.adobe.com/content/dam/help/ko/photoshop/how-to/compositing/jcr%3acontent/main-pars/image/compositing_1408x792.jpg")
                setImgSet(true)
            }
        }
    }

    const onEnterHash = (e) => {
        if (e.key === "Enter"){
            setHashList([...hashList,e.target.innerText])
            e.target.innerText = ""
        }
    }
    const onEnterTech = (e) => {
        if (e.key === "Enter"){
            setTechList([...techList,e.target.innerText])
            e.target.innerText = ""
        }
    }

    const onClickRemoveHash = (index) => {
        setHashList(hashList.filter((v,i) => i !== index))
    }
    const onClickRemoveTech = (index) => {
        setTechList(techList.filter((v,i) => i !== index))
    }

    return(
        <>
            <Global></Global>
            <Header btnType={"upload"} upload={uploadBtn} setUpload={setUploadBtn}></Header>
            <div>
                <div style={{maxWidth:"960px", background:"#ffffff",margin:"0 auto", minHeight:"calc(100vh - 56px)",
                border:"1px solid #E8E8E8"}}>
                    <TextEdit></TextEdit>
                </div>

                {
                    uploadBtn
                        ?(
                            <div style={{position:"absolute", top:"0", zIndex:"2000", width:"100vw", height:"100vh", minWidth:"340px"}}>
                                    <div className={styles.detail_blank}></div>
                                    <aside style={{overflowY:"scroll", overflowX:"hidden"}} className={styles.detail_wrapper}>
                                        <Header btnType={"upload"} upload={uploadBtn} setUpload={setUploadBtn} side={true}></Header>
                                        <div style={{paddingTop:"4px", border:"none"}}>
                                            <div className={styles.detail_box}>
                                                <div className={styles.detail_title}>제목*</div>
                                                <input className={styles.detail_edit} type="text" placeholder={"제목"}/>
                                            </div>
                                            <div className={styles.detail_box}>
                                                <div className={styles.detail_title}>분야*</div>
                                                <Select defaultValue="분야">
                                                    <Option value="전체">전체</Option>
                                                    <Option value="보컬">보컬</Option>
                                                    <Option value="랩">랩</Option>
                                                    <Option value="작사">작사</Option>
                                                    <Option value="작곡">작곡</Option>
                                                    <Option value="연주">연주</Option>
                                                    <Option value="음향 엔지니어">음향 엔지니어</Option>
                                                    <Option value="디자인">디자인</Option>
                                                </Select>
                                            </div>
                                            <div className={styles.detail_box} style={{height:"240px"}}>
                                                <div className={styles.detail_title} style={{verticalAlign:"top", position:"static", top:"0", transform:"translateY(0)"}}>표지*</div>
                                                <img src={imgUrl} onClick={imgUpload} className={styles.detail_img_wrapper}></img>
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
                                                <Select defaultValue="CC BY">
                                                    <Option value="CC BY">저작자표시 (CC BY)</Option>
                                                    <Option value="CC BY SA">저작자표시 동일조건변경허락 (CC BY-SA)</Option>
                                                    <Option value="CC BY ND">저작자표시 변경금지 (CC BY-ND)</Option>
                                                    <Option value="CC BY NC">저작자표시-비영리 (CC BY-NC)</Option>
                                                    <Option value="CC BY NC SA">저작자표시-비영리-동일조건변경허락 (CC BY-NC-SA)</Option>
                                                    <Option value="CC BY NC ND">저작자표시-비영리-변경금지 (CC BY-NC-ND)</Option>
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

        </>
    )
}

export default Upload
