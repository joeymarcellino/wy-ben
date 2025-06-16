import { useState } from "react"; 
import { AutoFormatMoneyInput } from "./MiscComponents" ;

function HowMuchSubQuestion({dataForm,updateDataForm,dataField,questionText}) {
    if (dataForm[dataField] === "") {
	return 
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
		<HowMuchSubQuestion dataform={dataForm} updateDataForm={updateDataForm} dataField={"rentMortgage"} questionText={"How much is your monthly rent or mortgage payment?"}/>
	    </div>
        </>
    )
}

function NextButton({onNext,dataForm}) {
    if (!(dataForm.paysRentMortgage === null) & !(dataForm.paysRentMortgage === null)) {
        return <button onClick={onNext}>Next</button>
    }
    else {
        return
    }
}

export default function Deductions({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<>
	    <RentMortgage dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <button onClick={onBack}>Back</button>
	    <NextButton onNext={onNext} dataForm={dataForm}/>
	</>
    )
}

