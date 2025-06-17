import { useState } from "react"; 
import { AutoFormatMoneyInput } from "./MiscComponents" ;

function HowMuchSubQuestion({dataForm,updateDataForm,displayCheck,dataField,questionText}) {
    if (dataForm[displayCheck] !== true) {
	return null 
    }
    else {
	return (
	    <>
		{questionText} <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={dataField}/>
	    </>
	)
    }
}

function RentMortgage({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysRentMortgage : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysRentMortgage : false})) 
    }

    const yesClass = dataForm.paysRentMortgage === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.paysRentMortgage === false ? "clickedButton" : "unclickedButton"

    return(
        <>
	    <div>
		<p>Do you pay rent or make mortgage payments?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysRentMortgage"} dataField={"rentMortgage"} questionText={"How much is your monthly rent or mortgage payment?"}/>
	    </div>
        </>
    )
}

function HeatingCooling({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysHeatingCooling : false})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysHeatingCooling : true})) 
    }

    const yesClass = dataForm.paysHeatingCooling === false ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.paysHeatingCooling === true ? "clickedButton" : "unclickedButton"

    return(
        <>
	    <div>
		<p>Are heating/cooling expenses included in rent/mortgage?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysHeatingCooling"} dataField={"heatingCooling"} questionText={"How much are your monthly heating/cooling expenses?"}/>
	    </div>
        </>
    )
}

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

    return(
        <>
	    <div>
		<p>Do you have monthly out-of-pocket medical expenses?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysMedicalExpenses"} dataField={"medicalExpenses"} questionText={"How much are your monthly out-of-pocket medical expenses?"}/>
	    </div>
        </>
    )
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
    if (!(dataForm.paysRentMortgage === null)) {
        return <button onClick={onNext}>Next</button>
    }
    else {
        return null
    }
}

export default function Deductions({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<>
	    <RentMortgage dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <HeatingCooling dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <MedicalExpenses dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <DependentCare dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <ChildSupport dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <button onClick={onBack}>Back</button>
	    <NextButton onNext={onNext} dataForm={dataForm}/>
	</>
    )
}

