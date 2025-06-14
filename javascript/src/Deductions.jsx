import { useState } from "react"; 

function HowMuchSubQuestion({dataForm,updateDataForm,questionText}) {
    
}

function RentMortgage({dataForm,updateDataForm}) {
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
            <p>Do you pay rent or make mortgage payments?</p>
            <button className={yesClass} onClick={handleYesClick}>Yes</button>
            <button className={noClass} onClick={handleNoClick}>No</button>
        </>
    )
}