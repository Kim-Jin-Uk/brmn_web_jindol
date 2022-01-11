import Menu from "/components/Menu";
import {useCallback, useEffect, useState} from "react";

export default function Header(param) {
    const [side, setSide] = useState(false)
    useEffect(() => {
        if (param.side !== undefined){
            setSide(param.side)
        }
        return () => {
        };
    }, [param.side, side]);
    return (
        <>
            {
                side
                    ? (
                        <div style={{
                            top: "0px",
                            zIndex: 1000,
                        }}>
                            <Menu param={param.param} openAble={param.openAble} setOpenAble={param.setOpenAble} side={side}
                                  btnType={param.btnType} upload={param.upload} setUpload={param.setUpload}/>
                        </div>
                    )
                    : (
                        <>
                            <div style={{
                                position: "absolute",
                                width:"100%",
                                top: "0px",
                                zIndex: 1000,
                            }}>
                                <Menu param={param.param} openAble={param.openAble} setOpenAble={param.setOpenAble} side={side} btnType={param.btnType}  upload={param.upload} setUpload={param.setUpload}/>
                            </div>
                            <div style={{height:"56px"}}></div>
                        </>
                    )
            }

        </>
    )
}
