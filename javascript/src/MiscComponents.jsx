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

  return (
    <div className="money-input-wrapper">
	<input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm[dataField]}/>
    </div>
  )
}

export function HowMuchSubQuestion({dataForm,updateDataForm,displayCheck,dataField,questionText}) {
    if (dataForm[displayCheck] !== true) {
	return null 
    }
    else {
	return (
	    <div className="sub-question">
		{questionText} <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={dataField}/>
	    </div>
	)
    }
}

export function ResultsCard({qualified, reasons, program, icon, description, link}) {
    const [showReasons, setShowReasons] = useState(false) ;
    const handleClick = () => {
	setShowReasons((prev) => !prev) ;
    }
    let cardClass ;
    switch (qualified) {
	case -1:
	    cardClass = `results-card oversize` ;
	    break ;
	case 0:
	    cardClass = `results-card is-ineligible` ;
	    break ;
	case 1:
	    cardClass = `results-card is-eligible` ;
	    break ;
	case 2:
	    cardClass = 'results-card is-eligible' ;
	    break ;
    }

    if (qualified === 1) {
	return (
	    <div className={cardClass}>
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
		<a href={link} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More & Apply</a>
	    </div>
	)
    }
    if (qualified === 2) {
	return (
	    <div className={cardClass}>
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
	    </div>
	)
    }
    else if (qualified === 0) {
	return (
	    <div className={cardClass}>
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
		<button className="reason-toggle" onClick={handleClick}>
		    {showReasons ? 'Hide reasons' : 'Why not?'}
		</button>
		<div className="reasons-container">
		    {showReasons && reasons}
		</div>
	    </div>
	)
    }
    else {
	return (
	    <div className={cardClass}>
		<div className="icon">{icon}</div>
		<h2>{program}</h2>
		<p>{description}</p>
		<button className="reason-toggle" onClick={handleClick}>
		    {showReasons ? 'Hide reasons' : 'Why?'}
		</button>
		<div className="reasons-container">
		    {showReasons && reasons}
		</div>
	    </div>
	)
    }
}

export function ProgressBar({ currentStep, totalSteps }) {
  // We subtract 1 from totalSteps because the welcome page (step 0) and results page shouldn't count as "progress" steps.
  const progressPercentage =
    currentStep > 0 ? ((currentStep) / (totalSteps - 2)) * 100 : 0;

  // Don't show the bar on the first or last page
  if (currentStep === 0 || currentStep >= totalSteps - 1) {
    return null;
  }

  return (
    <div className="progress-bar">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

// Wyoming SNAP Income Limits (Oct 1, 2024 – Sept 30, 2025)
export const snapDeductions = {
    standard: {
	1: 177,
	2: 177,
	3: 177,
	4: 184,
	5: 215,
	moreThan5: 246
    },
    medical: 175,
    shelterMax: 712,
    homeless: 190.30,
    standardUtility: 472,
    noHeatCool: 317,
    phone: 56
}

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
    },
    assets: {
	hheod: 3750,
	nonHHEOD: 2500
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

export const tanfIncomeLimits = {
    singleParentEarnedIncomeDisregard: 600,
    marriedCoupleEarnedIncomeDisregard: 1200,
    singleParentDisqualified: {
	1: 887,
	2: 1121,
	3: 1197,
	4: 1197,
	5: 1276,
	6: 1276,
	7: 1354,
	8: 1354,
	9: 1354,
	10: 1354,
	11: 1354,
	12: 1354
    },
    marriedCoupleDisqualified: {
	1: 1487,
	2: 1721,
	3: 1797,
	4: 1797,
	5: 1876,
	6: 1876,
	7: 1954,
	8: 1954,
	9: 1954,
	10: 1954,
	11: 1954,
	12: 1954
    },
    singleParentQualified: {
	1: 1093,
	2: 1416,
	3: 1469,
	4: 1469,
	5: 1523,
	6: 1523,
	7: 1577,
	8: 1577,
	9: 1577,
	10: 1577,
	11: 1577,
	12: 1577
    },
    marriedCoupleQualified: {
	1: 1693,
	2: 2016,
	3: 2069,
	4: 2069,
	5: 2123,
	6: 2123,
	7: 2177,
	8: 2177,
	9: 2177,
	10: 2177,
	11: 2177,
	12: 2177
    }
}
	
