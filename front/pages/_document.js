import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document{
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="../public/favicon.ico"/>
                    <link rel="icon" href="../public/favicon.ico"/>
                </Head>
                <body>
                    <Main />
                    <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
