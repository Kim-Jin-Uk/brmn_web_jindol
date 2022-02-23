import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../styles/globals.scss'
import wrapper from '../store/configureStore';

const NodeBird = function ({ Component }) {
    return (
        <>
            <Head>
                <meta charSet={"utf-8"}/>
                <title>brmn music</title>
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="shortcut icon" href="https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/favicon.ico" />
                <meta property={"og:title"} content={"brmn music"}/>
                <meta property={"og:type"} content={"website"}/>
                <meta property={"og:description"} content={"다양한 콘텐츠가 만들어지는 세상. 당신의 아이디어를 함께할 사람들을 찾아보세요."}/>
                <meta property={"og:image"} content={"https://brmnmusic-image-s3.s3.ap-northeast-2.amazonaws.com/brmn/brmn_icon.png"}/>
            </Head>
            <div style={{display:"none"}}>다양한 콘텐츠가 만들어지는 세상. 당신의 아이디어를 함께할 사람들을 찾아보세요.</div>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
