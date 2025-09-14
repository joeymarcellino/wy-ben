import { useState } from 'react' ; 
import { HowMuchSubQuestion } from "./MiscComponents" ;

function RentMortgage({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysRentMortgage : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysRentMortgage : false})) 
    }

    const yesClass = dataForm.paysRentMortgage === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.paysRentMortgage === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <div className="question-block">
	    <h2>Do you pay rent or make mortgage payments?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysRentMortgage"} dataField={"rentMortgage"} questionText={"How much is your monthly rent or mortgage payment?"}/>
        </div>
    )
}

function InsuranceTaxHOA({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysInsuranceTaxHOA : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, paysInsuranceTaxHOA : false})) 
    }

    const yesClass = dataForm.paysInsuranceTaxHOA === true ? "clickedButton" : "unclickedButton" ;
    const noClass = dataForm.paysInsuranceTaxHOA === false ? "clickedButton" : "unclickedButton" ;

    return(
        <div className="question-block">
	    <h2>Do you pay for homeowner's insurance, pay property taxes, or pay homeowner's association fees?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	    <HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysInsuranceTaxHOA"} dataField={"insuranceTaxHOA"} questionText={"How much are your monthly homeowner's insurance payments, property taxes, or homeowner's association fees?"}/>
        </div>
    )
}

function Homeless({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, homeless : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, homeless : false})) 
    }

    const yesClass = dataForm.homeless === true ? "clickedButton" : "unclickedButton" ;
    const noClass = dataForm.homeless === false ? "clickedButton" : "unclickedButton" ;

    return(
        <div className="question-block">
	    <h2>Does your household lack stable housing (e.g. staying in a shelter, living outdoors, or temporarily staying with friends or relatives)?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </div>
    )
}

export default function Shelter({onNext,onBack,dataForm,updateDataForm}) {
    const nextButtonActive = (
	dataForm.paysRentMortgage !== null &&
	dataForm.paysInsuranceTaxHOA !== null &&
	dataForm.homeless !== null) ;
    return (
	<div className="form-page">
	    <RentMortgage dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <InsuranceTaxHOA dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <Homeless dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <div className="nav-buttons">
		<button className="back-button" onClick={onBack}>Back</button>
		{nextButtonActive && <button onClick={onNext} className="next-button">Next</button>}
	    </div>
	</div>
    )
}

