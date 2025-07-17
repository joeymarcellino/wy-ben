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

export const liheapIncomeLimits = {
    maxGross: {
	1: 2905,
	2: 3799,
	3: 4693,
	4: 5587,
	5: 6481,
	6: 7375,
	7: 7542,
	8: 7710,
	9: 7877,
	10: 8045,
	11: 8213,
	12: 8380,
	13: 8548,
	14: 8715,
	15: 8883,
	16: 9051
    }
}

export const medicaidIncomeLimits = {
    magi: {
	1: 529,
	2: 737,
	3: 873,
	4: 999,
	5: 1192,
	6: 1327,
	7: 1515,
	8: 1644,
	9: 1843,
	10: 1972
    },
    childUnder5orPregnant: {
	1: 1933,
	2: 2624,
	3: 3314,
	4: 4004,
	5: 4695,
	6: 5385,
	7: 6076,
	8: 6766,
	9: 7457,
	10: 8147
    },
    child6to18: {
	1: 1670,
	2: 2266,
	3: 2862,
	4: 3458,
	5: 4055,
	6: 4651,
	7: 5247,
	8: 5844,
	9: 6440,
	10: 7036
    },
    chip: {
	1: 2510,
	2: 3407,
	3: 4304,
	4: 5200,
	5: 6097,
	6: 6994,
	7: 7890,
	8: 8787,
	9: 9684,
	10: 10580
    },
    disabled: 2901
}
