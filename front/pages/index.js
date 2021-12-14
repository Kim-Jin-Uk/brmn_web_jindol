import React from "react";
import Link from 'next/link';
import Header from "../components/Header";

const Home = () => {
    return(
        <>
            <Header />
            <h1>설명 페이지</h1>
            <div><Link href={"/project"}><a>프로젝트</a></Link></div>
            <div><Link href={"/portfolio"}><a>포트폴리오</a></Link></div>
            <Link href={"/upload/contents"}><a>무언가1</a></Link>
            <Link href={"/"}><a>무언가2</a></Link>
        </>
    )
}

export default Home
