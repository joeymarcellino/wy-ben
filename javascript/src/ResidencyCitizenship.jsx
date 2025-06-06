import { useState } from 'react'

function Residency({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, wyResident : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, wyResident : false})) 
    }

    const yesClass = dataForm.wyResident === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.wyResident === false ? "clickedButton" : "unclickedButton"

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
            <h1>Are you a U.S citizen or qualified immigrant (e.g. green card holder, refugee, asylee)?</h1>
            <button className={yesClass} onClick={handleYesClick}>Yes</button>
            <button className={noClass} onClick={handleNoClick}>No</button>
        </>
    )
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
            <button onClick={onNext}>Next</button>
        </>
    )
}