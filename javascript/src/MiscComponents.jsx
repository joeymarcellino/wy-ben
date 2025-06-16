import { useState } from "react";

export function AutoFormatMoneyInput({dataForm,updateDataForm,dataField}) {
  const handleChange = (e) => {
  	const value = e.target.value ; 
  	if ((/^$|^(\d+\,?)+(\.?\d{0,2})$/).test(value)) {
		updateDataForm((prevData) => ({
			...prevData, [dataField]: value})) ; 	
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
		...prevData, [dataField]: value_formatted})) ; 
  }

  return <input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm[dataField]}/>
}
