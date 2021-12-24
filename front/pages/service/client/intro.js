import React from 'react'
import Header from "../../../components/Header";
import styles from '../../../styles/Intro.module.scss'
import { Steps } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Link from 'next/link'

const { Step } = Steps;

const Global = createGlobalStyle`
  *{
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;
  }
  
  .ant-steps{
    min-width: 269px;
    display: inline-block;
    vertical-align: top;
    width: auto;
    margin-top: 60px;
    margin-left: 7px!important;
  }
  
  .ant-steps-item-tail{
    display: none !important;
  }
  
  .ant-steps-item-container{
    height: 115px;
  }
  
  .ant-steps-item-content{
    padding-top: 8px;
    padding-left: 12px;
  }
  
  .ant-steps-item-title{
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 14px !important;
    line-height: 150% !important;
    color: #FFFFFF !important;
  }
  
  .ant-steps-item-description{
    margin-top: 4px;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: 500;
    font-size: 14px !important;
    line-height: 150%;
    color: #C1D9FC !important;
  }
  
  @media (max-width: 600px) {
    .ant-steps-item-description{
      width: 269px !important;
    }
  }

  @media (min-width: 600px) and (max-width: 1024px) {
    .ant-steps{
      margin-top: 80px;
      margin-left: 12px!important;
    }
    
    .ant-steps-item-description{
      width: 400px !important;
    }

    .ant-steps-item-title{
      font-size: 16px !important;
    }

    .ant-steps-item-description{
      margin-top: 8px;
      font-size: 16px !important;
    }

    .ant-steps-item-container{
      height: 127px;
    }

    .ant-steps-item-content{
      padding-top: 6px;
      padding-left: 48px;
    }
  }

  @media (min-width: 1024px) {
    .ant-steps{
      margin-top: 80px;
      margin-left: 12px!important;
    }

    .ant-steps-item-description{
      width: 400px !important;
    }

    .ant-steps-item-title{
      font-size: 16px !important;
    }

    .ant-steps-item-description{
      margin-top: 8px;
      font-size: 16px !important;
    }

    .ant-steps-item-container{
      height: 127px;
    }

    .ant-steps-item-content{
      padding-top: 6px;
      padding-left: 48px;
    }
  }
`;

const Intro = () => {

    const customDot = (dot, { status, index }) => (
        index === 0
        ?
            <div className={styles.dots_group}>
                <div className={styles.big_dots}>
                    <div className={styles.small_dots_top}></div>
                </div>
                <div className={styles.first_line}></div>
            </div>
        :
            index === 6
            ?
                <div>
                    <div className={styles.small_dots}></div>
                    <div className={styles.finish_line}></div>
                </div>
            :
                <div>
                    <div className={styles.small_dots}></div>
                    <div className={styles.after_line}></div>
                </div>
    );

    return(
        <>
            <Global/>
            <Header></Header>
            <div style={{background:"e5e5e5"}}>
                <div className={styles.background_top}>
                    <div className={styles.content_cover_top}>
                        <div className={styles.content_top}>
                            믿을 수 있는 역량을 지닌 메이커들과 콘텐츠를 제작해 보세요. 메이커를 구하는 데에 시간을 쏟을 필요 없이 조건에 맞게 선별된 메이커를 추천받을 수 있습니다.
                        </div>
                        <Link href={"/"}><a className={styles.link_top}>메이커 매칭 신청하기 ></a></Link>
                    </div>
                </div>
                <div className={styles.contents_cover_middle}>
                    <span>메이커 채용하기</span>
                    <div className={styles.content_title_middle}>
                        당신의 콘텐츠에
                        <br/>
                        가장 적합한
                        <br/>
                        메이커를 만나보세요
                    </div>
                </div>
                {/*contents*/}
                <div className={styles.contents_group_middle}>
                    <div className={styles.content_1_middle}>
                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_1}`}></div>
                                <div className={styles.sub_1_1_title}>역할</div>
                            </div>
                            <div className={styles.sub_1_1_content}>비주얼 이미지 디렉팅, 촬영 기획</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_2}`}></div>
                                <div className={styles.sub_1_1_title}>포지션</div>
                            </div>
                            <div className={styles.sub_1_1_content}>아트디렉터</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_3}`}></div>
                                <div className={styles.sub_1_1_title}>기간</div>
                            </div>
                            <div className={styles.sub_1_1_content}>2022.01.02&emsp;-&emsp;2022.01.20</div>
                        </div>

                        <div className={styles.sub_1_1_middle}>
                            <div className={styles.sub_1_1}>
                                <div className={`${styles.sub_1_1_icon} ${styles.sub_icon_4}`}></div>
                                <div className={styles.sub_1_1_title}>페이</div>
                            </div>
                            <div className={styles.sub_1_1_content}>500,000원 이내 조건부 협의</div>
                        </div>
                        <div className={styles.sub_1_text}>
                            조건에 맞는 메이커를
                            <br/>
                            시간부터 비용까지
                            <br/>
                            효율적으로
                        </div>
                    </div>

                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_1}`}>
                        <div className={styles.contents_sub_text}>
                            메이커와 추가 계약을 맺으면
                            <br/>
                            수수료 혜택을 드립니다.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_1}`}></div>
                    </div>
                    <div className={`${styles.contents_sub_middle} ${styles.content_sub_2}`}>
                        <div className={`${styles.contents_sub_text} ${styles.content_text_sub_2}`}>
                            메이커와 소통문제로 제작에 차질이 생기면 계약금 100% 환불을 책임집니다.
                        </div>
                        <div className={`${styles.contents_sub_img} ${styles.content_img_2}`}></div>
                    </div>
                </div>
                {/*manuals*/}
                <div className={styles.manual_title}>
                    제작 현장에서
                    <br/>
                    필요한 매뉴얼을 받아보세요
                </div>
                <div className={styles.manual_grouper} >
                    <div className={styles.manual_group}>
                        <div className={styles.manu_back1}>
                            <div className={styles.manual_text}>
                                집행 계약서
                                <br/>
                                양식
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu1}`}></div>
                        </div>
                        <div className={styles.manu_back2}>
                            <div className={styles.manual_text}>
                                콘셉트 기획서
                                <br/>
                                메뉴얼
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu2}`}></div>
                        </div>
                        <div className={styles.manu_back3}>
                            <div className={styles.manual_text}>
                                현장 스케줄 관리
                                <br/>
                                메뉴얼
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu3}`}></div>
                        </div>
                        <div className={styles.manu_back4}>
                            <div className={styles.manual_text}>
                                현장 스토리보드
                                <br/>
                                예시
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu4}`}></div>
                        </div>
                        <div className={styles.manu_back5}>
                            <div className={styles.manual_text}>
                                예산 견적서
                                <br/>
                                양식
                            </div>
                            <div className={`${styles.manual_img} ${styles.manu5}`}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.steps_group_middle}>
                    <div className={`${styles.manual_title} ${styles.steps_title}`}>
                        믿을 수 있는 메이커를
                        <br/>
                        선별해서 매칭합니다
                    </div>
                    <div className={styles.steps_group}>
                        <div className={styles.steps_number}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                        </div>

                        <Steps
                            progressDot={customDot} current={6} direction="vertical" size={"small"}
                            style={{marginLeft:"39px"}}
                        >
                            <Step
                                title={"요구조건 작성"}
                                description={'제공드리는 작성 매뉴얼에 따라 콘텐츠에 필요한 메이커에 대한 요구조건을 작성해주세요.'}
                            />
                            <Step
                                title={"검토"}
                                description={'전달해주신 요구조건을 검토해 파트너스 메이커에서 조건에 맞는 메이커를 선별합니다. 검토는 1~3일이 소요됩니다.'}
                            />
                            <Step
                                title={"메이커 매칭"}
                                description={'선별한 메이커와 요구조건의 세부사항을 논의하고 작업 견적을 확정하는 과정을 진행합니다.'}
                            />
                            <Step
                                title={"계약"}
                                description={'메이커 매칭에 대한 서비스 보장의 내용이 담긴 계약서를 작성합니다. 메이커 참여에 대해 100% 보장합니다.'}
                            />
                            <Step
                                title={"콘텐츠 집행"}
                                description={'메이커와의 협업과 제작중인 콘텐츠가 원할하게 집행되도록 전문가들의 노하우 메뉴얼을 제공합니다.'}
                            />
                            <Step
                                title={"정산"}
                                description={'계약 조건에 따라 계약금을 정산합니다. 메이커와 연속 계약을 진행할 수 있도록 도와드립니다.'}
                            />
                            <Step
                                title={"후기"}
                                description={'메이커와의 작업후기를 남길 수 있으며, 메이커와 연속 계약을 진행할 수 있도록 도와드립니다.'}
                            />
                        </Steps>
                    </div>
                </div>

                <div className={styles.background_bottom}>
                    <div>
                        <div className={styles.question_title_bottom}>자주 묻는 질문</div>
                        <div className={styles.question_wrapper}>
                            <div className={styles.question_card}>
                                <div className={styles.question_icon}></div>
                                <div className={styles.question_content}>계약금은 어떻게 되나요?</div>
                            </div>
                            <div className={styles.answer_group}>
                                <div className={styles.answer_icon}></div>
                                <div className={styles.answer_content}>
                                    계약금은 용역비 90%로와 중개비 10%로 나뉩니다. 예를 들어 계약금이 100만원이면 90%인 90만원은 메이커에게 지불되는 용역비로, 10%인 10만원은 brmn에게 중개비로 지불됩니다.
                                </div>
                            </div>
                        </div>
                        <div className={styles.question_wrapper2}>
                            <div className={styles.question_card}>
                                <div className={styles.question_icon}></div>
                                <div className={styles.question_content}>메이커의 역량은 어떻게 확인하나요?</div>
                            </div>
                            <div className={styles.answer_group}>
                                <div className={styles.answer_icon}></div>
                                <div className={styles.answer_content}>
                                    brmn 파트너스 메이커의 이력과 포트폴리오로 확인할 수 있습니다.
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href={"/"}><a><div className={styles.match_btn}></div></a></Link>
                </div>
            </div>
        </>
    )
}

export default Intro
