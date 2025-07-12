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

export function ResultsCard({qualified, reasons, program, icon, description, link}) {
    const [showReasons, setShowReasons] = useState(false) ;
    const handleClick = () => {
	setShowReasons((prev) => !prev) ;
    }
    if (qualified) {
	return (
	    <div className="results-card">
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
		<a href={link}>Learn More</a>
	    </div>
	)
    }
    else {
	const reasonButtonClass = showReasons ? "show-less" : "show-more" ; 
	return (
	    <div className="results-card">
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
		<button className={reasonButtonClass} onClick={handleClick}>Why not?</button>
		{showReasons && reasons}
	    </div>
	)
    }
}

// Wyoming SNAP Income Limits (Oct 1, 2024 – Sept 30, 2025)
export const snapIncomeLimits = {
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

export const wicIncomeLimits = {
    maxGross: {
	1: 2413,
	2: 3261,
	3: 4109,
	4: 4957,
	5: 5805,
	6: 6653,
	7: 7501,
	8: 8349,
	9: 9197,
	10: 10044,
	11: 10892,
	12: 11740,
	13: 12588,
	14: 13436,
	15: 14284,
	16: 15132
    }
}
