import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../styles/globals.scss'

const NodeBird = function ({ Component }) {
    return (
        <>
            <Head>
                <title>brmn music</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default NodeBird;
