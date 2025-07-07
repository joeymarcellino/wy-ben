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

export function HowMuchSubQuestion({dataForm,updateDataForm,displayCheck,dataField,questionText}) {
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

export function ResultsCard({program, icon, description, link}) {
    return (
	<div className="results-card">
	    <div className="icon">{icon}</div>
	    <h2>{program}</h2>
	    <p>{description}</p>
	    <a href={link}>Learn More</a>
	</div>
    )
}

// Wyoming SNAP Income Limits (Oct 1, 2024 – Sept 30, 2025)
export const wySNAPIncomeLimits = {
    maxGrossHHEOD: {
	1: 2071,
	2: 2811,
	3: 3551,
	4: 4290,
	5: 5030,
	6: 5770,
	7: 6510,
	8: 7249,
	9: 7989,
	10: 8729,
	additionalMember: 740 // added per extra person
    },
    maxGross: {
	1: 1632,
	2: 2215,
	3: 2798,
	4: 3380,
	5: 3963,
	6: 4546,
	7: 5129,
	8: 5712,
	9: 6295,
	10: 6878,
	additionalMember: 583
    },
    maxNet: {
	1: 1255,
	2: 1704,
	3: 2152,
	4: 2600,
	5: 3049,
	6: 3497,
	7: 3945,
	8: 4394,
	9: 4843,
	10: 5292,
	additionalMember: 449
    }
}
