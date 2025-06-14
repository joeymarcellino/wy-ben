import { useState } from "react" ; 

function HouseholdEarnedIncome({dataForm,updateDataForm}) {
  const handleChange = (e) => {
  	const value = e.target.value ; 
  	if ((/^$|^(\d+\,?)+(\.?\d{0,2})$/).test(value)) {
		updateDataForm((prevData) => ({
			...prevData, hhEarnedIncome: value})) ; 	
     	}
  }

  const handleBlur = (e) => {
	const raw = e.target.value ; 
	if (!raw) return ; 
	
	const strArray = raw.split(".") ; 
	const whole = strArray[0].replace(/\,/g,"") ; 
	const whole_formatted = Number(whole).toLocaleString() ; 

	let decimal_formatted = "" ; 
	if (strArray.length === 1) {
		decimal_formatted = ".00" ; 
	}	
	else {
		const decimal = strArray[1] ; 
		if (decimal.length === 0) {
			decimal_formatted = ".00" ; 
		}
		else if (decimal.length === 1) {
			decimal_formatted = "." + decimal + "0" ; 
		}
		else {
			decimal_formatted = "." + decimal ; 
		}
	}
	
	const value_formatted = whole_formatted + decimal_formatted ; 
	updateDataForm((prevData) => ({
		...prevData, hhEarnedIncome: value_formatted})) ; 
  }

  return (
	<>
	  <h1>What is your monthly household earned income before taxes?</h1>
	  <div>
	    <input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm.hhEarnedIncome}/>
	  </div>	
	</>
	)
}

function HouseholdOtherIncome({dataForm,updateDataForm}) {
  const handleChange = (e) => {
  	const value = e.target.value ; 
  	if ((/^$|^(\d+\,?)+(\.?\d{0,2})$/).test(value)) {
		updateDataForm((prevData) => ({
			...prevData, hhOtherIncome: value})) ; 
     	}
  }

  const handleBlur = (e) => {
	const raw = e.target.value ; 
	if (!raw) return ; 
	
	const strArray = raw.split(".") ; 
	const whole = strArray[0].replace(/\,/g,"") ; 
	const whole_formatted = Number(whole).toLocaleString() ; 

	let decimal_formatted = "" ; 
	if (strArray.length === 1) {
		decimal_formatted = ".00" ; 
	}	
	else {
		const decimal = strArray[1] ; 
		if (decimal.length === 0) {
			decimal_formatted = ".00" ; 
		}
		else if (decimal.length === 1) {
			decimal_formatted = "." + decimal + "0" ; 
		}
		else {
			decimal_formatted = "." + decimal ; 
		}
	}
	
	const value_formatted = whole_formatted + decimal_formatted ; 
	updateDataForm((prevData) => ({
		...prevData, hhOtherIncome: value_formatted})) ; 
  }

  return (
	<>
	  <h1>What is your monthly household other income before taxes?</h1>
	  <div>
	    <input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm.hhOtherIncome}/>
	  </div>	
	</>
	)
}

function TotalAssets({dataForm,updateDataForm}) {
  const handleChange = (e) => {
  	const value = e.target.value ; 
  	if ((/^$|^(\d+\,?)+(\.?\d{0,2})$/).test(value)) {
		updateDataForm((prevData) => ({
			...prevData, totalAssets: value})) ; 
     	}
  }

  const handleBlur = (e) => {
	const raw = e.target.value ; 
	if (!raw) return ; 
	
	const strArray = raw.split(".") ; 
	const whole = strArray[0].replace(/\,/g,"") ; 
	const whole_formatted = Number(whole).toLocaleString() ; 

	let decimal_formatted = "" ; 
	if (strArray.length === 1) {
		decimal_formatted = ".00" ; 
	}	
	else {
		const decimal = strArray[1] ; 
		if (decimal.length === 0) {
			decimal_formatted = ".00" ; 
		}
		else if (decimal.length === 1) {
			decimal_formatted = "." + decimal + "0" ; 
		}
		else {
			decimal_formatted = "." + decimal ; 
		}
	}
	
	const value_formatted = whole_formatted + decimal_formatted ; 
	updateDataForm((prevData) => ({
		...prevData, totalAssets: value_formatted})) ; 
  }

  return (
	<>
	  <h1>What are your total assets?</h1>
	  <div>
	    <input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm.totalAssets}/>
	  </div>	
	</>
	)
}

export default function HouseholdIncomeAssets({onNext,onBack,dataForm,updateDataForm}) {
	return (
		<>
			<HouseholdEarnedIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<HouseholdOtherIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<TotalAssets onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<button onClick={onBack}>Back</button>
			<button onClick={onNext}>Next</button>
		</>
	)
}