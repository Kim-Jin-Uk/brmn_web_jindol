import React, {useState} from "react";
import Header from "../../components/Header";
import dynamic from "next/dynamic";

const TextEdit = dynamic(
    () => {
        return import("../../components/TextEdit");
    },
    { ssr: false }
);

const Upload = () => {

    return(
        <>
            <Header btnType={"upload"}></Header>
            <>
                <TextEdit></TextEdit>
            </>

        </>
    )
}

export default Upload
