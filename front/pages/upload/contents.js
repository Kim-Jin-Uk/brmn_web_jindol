import React from 'react'
import Header from "../../components/Header";
import Head from "next/head";
import styles from '../../styles/Project.module.scss'
import Button from "../../components/Button";

const Contents = () => {

    return(
        <>
            <Header />
            <Head>
                <title>brmn music | portfolio</title>
            </Head>
            <div className={styles.top}>
                <center>
                    <div className={`${styles.button_container} ${styles.center_align}`}>
                        <Button white>수정</Button>
                        <Button main>저장</Button>
                    </div>
                </center>
            </div>
            <h1>Portfolio</h1>
        </>
    )
}

export default Contents
