import { useState } from "react" ;
import { HowMuchSubQuestion } from "./MiscComponents" ;

function MedicalExpenses({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysMedicalExpenses : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysMedicalExpenses : false})) 
    }

    const yesClass = dataForm.paysMedicalExpenses === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.paysMedicalExpenses === false ? "clickedButton" : "unclickedButton"

    if (dataForm.elderly || dataForm.disabled) {
	return(
	    <div className="question-block">
		<h2>Do you have monthly out-of-pocket medical expenses for household members age 60 or older or with a disability?</h2>
		<div className="button-group">
		    <button className={yesClass} onClick={handleYesClick}>Yes</button>
		    <button className={noClass} onClick={handleNoClick}>No</button>
		</div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysMedicalExpenses"} dataField={"medicalExpenses"} questionText={"How much are your monthly out-of-pocket medical expenses?"}/>
	    </div>
	)
    }
    else
	return null
}

function DependentCare({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysDependentCare : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysDependentCare : false})) 
    }

    const yesClass = dataForm.paysDependentCare === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.paysDependentCare === false ? "clickedButton" : "unclickedButton"

    return(
        <div className="question-block">
	    <h2>Does the household pay for dependent care or adult care?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysDependentCare"} dataField={"dependentCare"} questionText={"How much are your monthly dependent or adult care costs?"}/>
        </div>
    )
}

function ChildSupport({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysChildSupport : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysChildSupport : false})) 
    }

    const yesClass = dataForm.paysChildSupport === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.paysChildSupport === false ? "clickedButton" : "unclickedButton"

    return(
        <div className="question-block">
	    <h2>Do you make court-ordered child support payments?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysChildSupport"} dataField={"childSupport"} questionText={"How much are your monthly child support payments?"}/>
        </div>
    )
}

export default function MedicalDependentChildSupport({onNext,onBack,dataForm,updateDataForm}) {
    const nextButtonActive = (
	(dataForm.paysMedicalExpenses !== null || (!dataForm.elderly & !dataForm.disabled)) &
	dataForm.paysDependentCare !== null &
	dataForm.paysChildSupport !== null) ;
    return (
	<div className="form-page">
	    <MedicalExpenses dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <DependentCare dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <ChildSupport dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <div className="nav-buttons">
		<button className="back-button" onClick={onBack}>Back</button>
		{nextButtonActive && <button onClick={onNext} className="next-button">Next</button>}
	    </div>
	</div>
    )
}

