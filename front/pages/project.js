import React from 'react'
import Head from 'next/head'
import Header from "../components/Header"
import styles from '../styles/Project.module.scss'



const Project = () =>{

    return(
        <div>
            <Header param={"project"}/>
            <Head>
                <title>brmn music | project</title>
            </Head>
            <h1>Project</h1>
            <div className={styles.body_color}></div>
        </div>
    )
}

export default Project
