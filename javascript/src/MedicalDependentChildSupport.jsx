import { useState } from "react"; 
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
	    <>
		<div>
		    <p>Do you have monthly out-of-pocket medical expenses for household members age 60 or older or with a disability?</p>
		    <button className={yesClass} onClick={handleYesClick}>Yes</button>
		    <button className={noClass} onClick={handleNoClick}>No</button>
		</div>	
		<div>
		    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysMedicalExpenses"} dataField={"medicalExpenses"} questionText={"How much are your monthly out-of-pocket medical expenses?"}/>
		</div>
	    </>
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
        <>
	    <div>
		<p>Does the household pay for dependent care or adult care?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysDependentCare"} dataField={"dependentCare"} questionText={"How much are your monthly dependent or adult care costs?"}/>
	    </div>
        </>
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
        <>
	    <div>
		<p>Do you make court-ordered child support payments?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysChildSupport"} dataField={"childSupport"} questionText={"How much are your monthly child support payments?"}/>
	    </div>
        </>
    )
}

function NextButton({onNext,dataForm}) {
    if ((!(dataForm.paysMedicalExpenses === null) || !(dataForm.elderly || dataForm.disabled)) &&
	!(dataForm.paysDependentCare === null) && 
	!(dataForm.paysChildSupport === null)) {
        return <button onClick={onNext}>Next</button>
    }
    else {
        return null
    }
}

export default function MedicalDependentChildSupport({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<>
	    <MedicalExpenses dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <DependentCare dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <ChildSupport dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <button onClick={onBack}>Back</button>
	    <NextButton onNext={onNext} dataForm={dataForm}/>
	</>
    )
}

