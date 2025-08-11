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
        <div className="question-block">
	    <p>SNAP</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
        </div>
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
        <div className="question-block">
	    <p>Medicaid</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
        </div>
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
        <div className="question-block">
	    <p>POWER / TANF</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"onTANF"} dataField={"tanfIncome"} questionText={"How much does your household receive from POWER / TANF per month?"}/>
        </div>
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
        <div className="question-block">
	    <p>SSI</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"onSSI"} dataField={"ssiIncome"} questionText={"How much does your household receive from SSI per month?"}/>
        </div>
    )
}

export default function OtherPrograms({onNext,onBack,dataForm,updateDataForm}) {
    const nextButtonActive = ((dataForm.onSNAP != null) &&
    (dataForm.onMedicaid != null) &&
    (dataForm.onTANF != null) &&
    (dataForm.onSSI != null)) ;
    return (
        <div className="form-page">
	    <h1>Does anyone in your household currently receive any of the following?</h1> 
            <div className="question-block">
                <OnSNAP dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnMedicaid dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnTANF dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <OnSSI dataForm={dataForm} updateDataForm={updateDataForm}/> 
            </div>
	    <div className="nav-buttons">
		<button className="back-button" onClick={onBack}>Back</button>
		{nextButtonActive && <button onClick={onNext} className="next-button">See results</button>}
	    </div>
        </div>
    )
}
