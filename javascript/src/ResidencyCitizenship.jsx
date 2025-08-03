import { useState } from 'react'

function Residency({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, resident : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, resident : false})) 
    }

    const yesClass = dataForm.resident === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.resident === false ? "clickedButton" : "unclickedButton"

    return(
        <>
            <h1>Do you currently live in Wyoming?</h1>
            <button className={yesClass} onClick={handleYesClick}>Yes</button>
            <button className={noClass} onClick={handleNoClick}>No</button>
        </>
    )
}

function Citizenship({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, citizen : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, citizen : false})) 
    }

    const yesClass = dataForm.citizen === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.citizen === false ? "clickedButton" : "unclickedButton"

    return(
        <>
            <h1>Are any of your household members U.S citizens or qualified immigrants (e.g. green card holder, refugee, asylee)?</h1>
            <button className={yesClass} onClick={handleYesClick}>Yes</button>
            <button className={noClass} onClick={handleNoClick}>No</button>
        </>
    )
}

function NextButton({onNext,dataForm}) {
    if (!(dataForm.citizen === null) & !(dataForm.resident === null)) {
        return <button onClick={onNext}>Next</button>
    }
    else {
        return
    }
}

export default function ResidencyCitizenship({onNext,dataForm,updateDataForm}) {
    return(
        <>
            <div>
                <Residency dataForm={dataForm} updateDataForm={updateDataForm}/>
            </div>
            <div>
                <Citizenship dataForm={dataForm} updateDataForm={updateDataForm}/>
            </div>
            <NextButton onNext={onNext} dataForm={dataForm}/>
        </>
    )
}
