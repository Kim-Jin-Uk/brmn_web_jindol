import React from "react";
import Image from "next/image"
import Link from "next/link"
import image_logo from "../../images/logo.svg"
import styles from "../../styles/Sign.module.scss"
import fontStyles from "../../styles/font.module.scss"
import SignWrapper from "../../components/SignWrapper";
import Button from "../../components/Button";
import {Modal} from "antd";
import {createGlobalStyle} from "styled-components";
import Router from "next/router";

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
      font-weight: 500;
      font-size: 18px;
      line-height: 130%;
      color: #1D1D1D;
    }
  }

  .ant-modal-body {
    padding: 14px 20px 20px;
    border-bottom: 1px solid #e8e8e8;
    > div {
      font-family: Spoqa Han Sans Neo;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
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

`

const Overlap = () => {

    const onClickOkBtn = () => {
        Router.replace('/signin/login')
    }

    return(
        <>
            <Global></Global>
            <SignWrapper>

                <Image src={image_logo} />
                <div className={fontStyles.b24} style={{ marginTop: 20 }}>
                    로그인
                </div>
                <div className={fontStyles.n13} style={{ marginTop: 8 }}>
                    신규 사용자이신가요?&nbsp;
                    <Link href="signup">
                        <a className={styles.signin} ><span className={fontStyles.main_dark} style={{ marginLeft: 5 }}>계정 만들기</span></a>
                    </Link>
                </div>

                <div style={{marginTop:"52px"}}>
                    <div style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}} className={styles.naver_btn}>
                        <div className={styles.naver_icon}></div>
                        <div style={{marginTop:"1px"}}>네이버 아이디로 로그인</div>
                    </div>
                    <div style={{ paddingLeft: "calc(50% - 93.5px)", paddingRight: "calc(50% - 93.5px)"}}  className={styles.kakao_btn}>
                        <div className={styles.kakao_icon}></div>
                        <div style={{marginTop:"1px"}}>카카오 계정으로 로그인</div>
                    </div>
                </div>

                <Modal
                    visible={true}
                    title="이메일 중복 알림"
                    footer={[
                        <Button className={`${styles.pop_btn} ${styles.save_btn}`} onClick={() => onClickOkBtn()}>
                            확인
                        </Button>,
                    ]}
                >
                    <div>
                        이미 해당 SNS 이메일로 가입된 계정이 존재합니다.
                        <br/>
                        다른 이메일로 가입해주세요.
                    </div>
                </Modal>
            </SignWrapper>

        </>
    )
}

export default Overlap
