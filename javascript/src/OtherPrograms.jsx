import { useState } from "react" ;
import { HowMuchSubQuestion } from './MiscComponents' ;


function OnSNAP({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSNAP : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSNAP : false})) 
    }

    const yesClass = dataForm.onSNAP === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.onSNAP === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <>
	    <div>
		<p>SNAP</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
        </>
    )
}

function OnMedicaid({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onMedicaid : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onMedicaid : false})) 
    }

    const yesClass = dataForm.onMedicaid === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.onMedicaid === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <>
	    <div>
		<p>Medicaid</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
        </>
    )
}


function OnTANF({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onTANF : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onTANF : false})) 
    }

    const yesClass = dataForm.onTANF === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.onTANF === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <>
	    <div>
		<p>POWER / TANF</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"onTANF"} dataField={"tanfIncome"} questionText={"How much does your household receive from POWER / TANF per month?"}/>
	    </div>
        </>
    )
}

function OnSSI({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSSI : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSSI : false})) 
    }

    const yesClass = dataForm.onSSI === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.onSSI === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <>
	    <div>
		<p>SSI</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"onSSI"} dataField={"ssiIncome"} questionText={"How much does your household receive from SSI per month?"}/>
	    </div>
        </>
    )
}

function OnSSDI({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSSDI : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, onSSDI : false})) 
    }

    const yesClass = dataForm.onSSDI === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.onSSDI === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <>
	    <div>
		<p>SSDI</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
        </>
    )
}

export default function OtherPrograms({onNext,onBack,dataForm,updateDataForm}) {
    let nextButton ; 
    if ((dataForm.onSNAP != null) &
    (dataForm.onMedicaid != null) &
    (dataForm.onTANF != null) &
    (dataForm.onSSI != null) &
    (dataForm.onSSDI != null)) {
	nextButton = <button onClick={onNext}>See results</button> ;
    }
    return (
        <>
            <div>
                <h1>Does anyone in your household currently receive any of the following?</h1> 
            </div>
            <div>
                <OnSNAP dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnMedicaid dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnTANF dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <OnSSI dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnSSDI dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
            <button onClick={onBack}>Back</button>
	    {nextButton}
        </>
    )
}
