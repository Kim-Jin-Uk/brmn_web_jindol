import React, {useCallback, useEffect, useState} from "react";
import Link from "next/link"
import Image from "next/image"
import styles from "./styles.module.scss"
import logo_small from "/images/logo_small.svg"
import logo from "/images/logo.svg"
import Button from "../Button";
import ProfileThumbnail from "../ProfileThumbnail";
import IconButton from "../IconButton";
import {Menu as AntMenu, Dropdown, Button as AntBtn, ConfigProvider, Switch, message} from 'antd';
import profile_image_default from "/images/default/profimg_default.svg"
import image_search from "/images/icons/search.svg"
import image_menu from "/images/icons/menu.svg"
import image_close from "/images/icons/close.svg"
import {useRouter} from "next/router";
import icon_styles from "../IconButton/styles.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {LOG_OUT_REQUEST} from "../../reducers/user";

ConfigProvider.config({
    prefixCls: 'ant',
});

function MenuItem(props) {
    return (
        <Link href={props.href}>
            <div className={`${styles.menu_item} + ${props.active?styles.active:""}`}>
                {props.children}
            </div>
        </Link>
    )
}

export default function Menu(param) {
    const dispatch = useDispatch()
    const [side, setSide] = useState(false)
    const router = useRouter()
    const {user, profile, logInDone, logOutError} = useSelector((state) => state.user);
    const onClickMenu = useCallback(() => {
        if (param.openAble){
            param.setOpenAble(false)
        }else {
            param.setOpenAble(true)
        }
    },[param.openAble])

    const onClickUpload = useCallback(() => {
        if (param.upload){
            param.setUpload(false)
        }else {
            param.setUpload(true)
        }
    },[param.upload])

    const onCLickLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    useEffect(() => {
        if (logOutError){
            message.warning("네트워크 상태가 불안정 합니다.")
        }
    },[logOutError])

    const ProfileMenu = (
        <AntMenu>
            <div className={styles.dropdown}>
                <div className={styles.dropdown_top}>
                    <div style={{cursor: "pointer", display: "inline-block", paddingTop: "20px" , paddingLeft: "20px"}}>
                        <Link href={
                            user && user.email
                                ?`/profile/${user.email}`
                                :`/profile/1`
                        }><a>
                            <ProfileThumbnail circle size={64} image={
                                profile && profile.profile_img
                                    ? profile.profile_img
                                    : profile_image_default
                            }/>
                        </a></Link>
                    </div>
                    <div className={styles.dropdown_item_top}>
                        {
                            profile && profile.nickname
                                ?<span className={styles.dropdown_item_top_first}>{profile.nickname}</span>
                                : user && user.email
                                    ? <span className={styles.dropdown_item_top_first}>{user.email}</span>
                                    : <></>
                        }
                        {
                            user && user.email
                                ? <span className={styles.dropdown_item_top_second}>{user.email}</span>
                                : <></>
                        }
                    </div>
                </div>
                <div className={styles.dropdown_bottom}>
                    <Link href={
                        user && user.email
                            ?`/profile/${user.email}`
                            :`/profile/1`
                    }><a className={styles.dropdown_item_bottom}>작업물 관리</a></Link>
                    <Link href={"/profile/edit"}><a className={styles.dropdown_item_bottom}>프로필 편집</a></Link>
                    <Link href={"/agreements/question"}><a className={styles.dropdown_item_bottom}>문의하기</a></Link>
                    <div onClick={() => onCLickLogOut()} className={styles.dropdown_item_bottom}>로그아웃</div>
                </div>
            </div>
        </AntMenu>
    )

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
                        <div className={styles.menu} style={{borderBottom:"none"}}>
                            {
                                param.btnType === "upload"
                                    ?(
                                        <div className={styles.left}>
                                            <div className={`${icon_styles.button}`} onClick={onClickUpload}>
                                                <Image src={image_close} width={24} height={24}/>
                                            </div>
                                        </div>
                                    ) :<div className={styles.left}>
                                        <Link href="/">
                                            <div className={styles.logo_small}>
                                                <Image src={logo_small}/>
                                            </div>
                                        </Link>
                                        <Link href="/">
                                            <div className={styles.logo}>
                                                <Image width="86px" height={"19px"} src={logo}/>
                                            </div>
                                        </Link>
                                        <div className={styles.menu_items}>
                                            {
                                                param.param && param.param === "guide"
                                                    ? <MenuItem href="/" active>이용안내</MenuItem>
                                                    : <MenuItem href="/">이용안내</MenuItem>
                                            }
                                            {
                                                param.param && param.param === "project"
                                                    ? <MenuItem href="/project" active>프로젝트</MenuItem>
                                                    : <MenuItem href="/project">프로젝트</MenuItem>
                                            }
                                        </div>
                                    </div>
                            }
                                {
                                    param.btnType !== undefined && param.btnType === "upload"
                                        ?(
                                            <div onClick={onClickUpload}>
                                                <Button className={`${styles.upload} ${styles.uploadBtn}`}>업로드</Button>
                                            </div>
                                        )
                                        :(
                                            <>
                                                <div className={styles.right}>
                                                    {
                                                        logInDone
                                                            ? (
                                                                <>
                                                                    <Button upload className={styles.create} onClick={()=>router.push("/project/upload").then((() =>window.scrollTo(0,0) ))}>프로젝트 업로드</Button>
                                                                    {/*
                                        <IconButton src={image_message} onClick={() => alert("준비중인 기능입니다.")}/>
                                        <IconButton src={image_bell} onClick={() => alert("준비중인 기능입니다.")}/>
             */}

                                                                    <Dropdown key={"a"} overlay={ProfileMenu} placement="bottomRight" arrow trigger={"hover"}>
                                                                        <AntBtn className={styles.dropdown_button}>
                                                                            <Link href={
                                                                                user && user.email
                                                                                    ?`/profile/${user.email}`
                                                                                    :`/profile/1`
                                                                            }><a>
                                                                                <div style={{cursor: "pointer", display: "flex"}}>
                                                                                    <ProfileThumbnail circle size={40} image={
                                                                                        profile && profile.profile_img
                                                                                            ? profile.profile_img
                                                                                            : profile_image_default
                                                                                    }/>
                                                                                </div>
                                                                            </a></Link>
                                                                        </AntBtn>
                                                                    </Dropdown>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button login className={styles.login} onClick={()=>router.replace("/signin/login")}>로그인</Button>
                                                                    <Button signup className={styles.signup} onClick={()=>router.replace("/signin/signup")}>회원가입</Button>
                                                                </>
                                                            )
                                                    }
                                                </div>
                                                <div className={styles.right_mobile}>
                                                    <IconButton src={image_search}/>
                                                    {
                                                        param.openAble
                                                            ? (
                                                                <div className={`${icon_styles.button}`} onClick={onClickMenu}>
                                                                    <Image src={image_menu} width={24} height={24}/>
                                                                </div>
                                                            ) : (
                                                                <div className={`${icon_styles.button}`} onClick={onClickMenu}>
                                                                    <Image src={image_close} width={24} height={24}/>
                                                                </div>
                                                            )
                                                    }
                                                </div>
                                            </>
                                        )
                                }


                        </div>
                    )
                    : (
                        <div className={styles.menu}>
                            <div className={styles.left}>
                                <Link href="/">
                                    <div className={styles.logo_small}>
                                        <Image src={logo_small}/>
                                    </div>
                                </Link>
                                <Link href="/">
                                    <div className={styles.logo}>
                                        <Image width="86px" height={"19px"} src={logo}/>
                                    </div>
                                </Link>
                                {
                                    param.btnType !== undefined && param.btnType === "upload"
                                        ?(<></>)
                                        :(<div className={styles.menu_items}>
                                            {
                                                param.param && param.param === "guide"
                                                    ? <MenuItem href="/" active>이용안내</MenuItem>
                                                    : <MenuItem href="/">이용안내</MenuItem>
                                            }
                                            {
                                                param.param && param.param === "project"
                                                    ? <MenuItem href="/project" active>프로젝트</MenuItem>
                                                    : <MenuItem href="/project">프로젝트</MenuItem>
                                            }
                                        </div>)
                                }
                            </div>

                            {
                                param.btnType !== undefined && param.btnType === "upload"
                                    ?(
                                        <div onClick={onClickUpload}>
                                            <Button className={styles.upload}>계속</Button>
                                        </div>
                                    )
                                    :(
                                        <>
                                            <div className={styles.right}>
                                                {
                                                    logInDone
                                                        ? (
                                                            <>
                                                                <Button upload className={styles.create} onClick={()=>router.push("/project/upload").then((() =>window.scrollTo(0,0) ))}>프로젝트 업로드</Button>
                                                                <Dropdown key={"b"} overlay={ProfileMenu} placement="bottomRight" arrow trigger={"hover"}>
                                                                    <AntBtn className={styles.dropdown_button}>
                                                                        <Link href={
                                                                            user && user.email
                                                                                ?`/profile/${user.email}`
                                                                                :`/profile/1`
                                                                        }><a>
                                                                            <div style={{cursor: "pointer", display: "flex"}}>
                                                                                <ProfileThumbnail circle size={40} image={
                                                                                    profile && profile.profile_img
                                                                                        ? profile.profile_img
                                                                                        : profile_image_default
                                                                                }/>
                                                                            </div>
                                                                        </a></Link>
                                                                    </AntBtn>
                                                                </Dropdown>
                                                            </>
                                                    ) : (
                                                            <>
                                                                <Button login className={styles.login} onClick={()=>router.replace("/signin/login")}>로그인</Button>
                                                                <Button signup className={styles.signup} onClick={()=>router.replace("/signin/signup")}>회원가입</Button>
                                                            </>
                                                    )
                                                }
                                            </div>
                                            <div className={styles.right_mobile}>
                                                <IconButton src={image_search}/>
                                                {
                                                    param.openAble
                                                        ? (
                                                            <div className={`${icon_styles.button}`} onClick={onClickMenu}>
                                                                <Image src={image_menu} width={24} height={24}/>
                                                            </div>
                                                        ) : (
                                                            <div className={`${icon_styles.button}`} onClick={onClickMenu}>
                                                                <Image src={image_close} width={24} height={24}/>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </>
                                    )
                            }


                        </div>
                    )
            }
        </>
    )
}
