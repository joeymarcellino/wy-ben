import {useState} from 'react' ; 

function HouseholdSize({dataForm, updateDataForm}) {
  const handleChange = (e) => {
    updateDataForm((prevData) => ({
      ...prevData, size: e.target.value})) ;
  } ;

  return (
    <div className="question-block">
      <h2>How many people are in your household, including yourself?</h2>
      <select value={dataForm.size} onChange={handleChange}>
        {[...Array(14)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  ) ;
}

function Married({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, married : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, married : false})) 
    }

    const yesClass = dataForm.married === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.married === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Are you married and living with your spouse?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function PregnantPostpartum({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, pregnantPostpartum : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, pregnantPostpartum : false})) 
    }

    const yesClass = dataForm.pregnantPostpartum === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.pregnantPostpartum === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Pregnant or postpartum (last 12 months)?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function ChildUnder5({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, childUnder5 : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, childUnder5 : false})) 
    }

    const yesClass = dataForm.childUnder5 === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.childUnder5 === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Under the age of 5?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function Child5to18({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, child5to18 : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, child5to18 : false})) 
    }

    const yesClass = dataForm.child5to18 === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.child5to18 === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Between the age of 5 and 18?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function Elderly({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, elderly : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, elderly : false})) 
    }

    const yesClass = dataForm.elderly === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.elderly === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Over the age of 60?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function Disabled({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, disabled : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, disabled : false})) 
    }

    const yesClass = dataForm.disabled === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.disabled === false ? "clickedButton" : "unclickedButton" ; 

    return(
	<div className="question-block">
	    <p>Disabled?</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	</div>
    )
}

function Student({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, student : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, student : false})) 
    }

    const yesClass = dataForm.student === true ? "clickedButton" : "unclickedButton" ; 
    const noClass = dataForm.student === false ? "clickedButton" : "unclickedButton" ; 

    return(
        <div className="question-block">
	    <div>
		<p>A student attending college, university, graduate school, or trade/technical school at least half time?</p>
		<div className="button-group">
		    <button className={yesClass} onClick={handleYesClick}>Yes</button>
		    <button className={noClass} onClick={handleNoClick}>No</button>
		</div>
	    </div>
	    {dataForm.student === true &&
	    <div>
		<p>Students face additional eligibility requirements (see <a href="https://www.fns.usda.gov/snap/students" target="_blank" rel="noopener noreferrer">here</a>). If your household includes an ineligible student, don't count them for the purposes of this calculator (subtract them from the household size, ignore their income/assets, etc.).</p>
	    </div>
	    }
        </div>
    )
}

export default function HouseholdComposition({onNext,onBack,dataForm,updateDataForm}) {
    const nextButtonActive = (
	dataForm.pregnantPostpartum !== null &&
	dataForm.childUnder5 !== null &&
	dataForm.child5to18 !== null &&
	dataForm.elderly !== null &&
	dataForm.disabled !== null &&
	dataForm.student !== null) ;
    return (
        <div className="form-page">
            <HouseholdSize dataForm={dataForm} updateDataForm={updateDataForm}/>  
	        {(dataForm.size > 1) &&
	            <Married dataForm={dataForm} updateDataForm={updateDataForm}/>
	        }

            <div className="question-block">
                <h2>Does anyone in your household fit these descriptions?</h2>
                <p>Select "Yes" or "No" for each.</p>
                <div className="sub-question-group">
                    <PregnantPostpartum dataForm={dataForm} updateDataForm={updateDataForm}/> 
                    <ChildUnder5 dataForm={dataForm} updateDataForm={updateDataForm}/> 
                    <Child5to18 dataForm={dataForm} updateDataForm={updateDataForm}/>  
                    <Elderly dataForm={dataForm} updateDataForm={updateDataForm}/> 
                    <Disabled dataForm={dataForm} updateDataForm={updateDataForm}/>  
                    <Student dataForm={dataForm} updateDataForm={updateDataForm}/>
                </div>
            </div>

            <div className="nav-buttons">
                <button onClick={onBack} className="back-button">Back</button>  
		{nextButtonActive && <button onClick={onNext} className="next-button">Next</button>}
            </div>
        </div>
    )
}
