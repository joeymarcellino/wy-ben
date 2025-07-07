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
        <>
	    <div>
		<p>Do you pay for homeowner's insurance, pay property taxes, or pay homeowner's association fees?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>	
	    <div>
		<HowMuchSubQuestion dataForm={dataForm} updateDataForm={updateDataForm} displayCheck={"paysInsuranceTaxHOA"} dataField={"rentMortgage"} questionText={"How much are your monthly homeowner's insurance payments, property taxes, or homeowner's association fees?"}/>
	    </div>
        </>
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
        <>
		<p>Does your household lack a permanent residence, sleep in a homeless shelter, live on the street, or "couch surf"?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
        </>
    )
}

function NextButton({onNext,dataForm}) {
    if (!(dataForm.paysRentMortgage === null) && 
	!(dataForm.paysInsuranceTaxHOA === null) &&
	!(dataForm.homeless === null)) {
        return <button onClick={onNext}>Next</button>
    }
    else {
        return null
    }
}

export default function Shelter({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<>
	    <div>
		<RentMortgage dataForm={dataForm} updateDataForm={updateDataForm}/>
		<InsuranceTaxHOA dataForm={dataForm} updateDataForm={updateDataForm}/>
		<Homeless dataForm={dataForm} updateDataForm={updateDataForm}/>
	    </div>
	    <div>
		<button onClick={onBack}>Back</button>
		<NextButton onNext={onNext} dataForm={dataForm}/>
	    </div>
	</>
    )
}

