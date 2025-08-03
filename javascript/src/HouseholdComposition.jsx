import {useState} from 'react' ; 

function HouseholdSize({dataForm, updateDataForm}) {
  const handleChange = (e) => {
    updateDataForm((prevData) => ({
      ...prevData, size: e.target.value})) ;
  } ;

  return (
    <>
      <h1>How many people are in your household, including yourself?</h1>
      <select value={dataForm.size} onChange={handleChange}>
        {[...Array(14)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </>
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
        <>
	    <div>
		<p>Are you married and living with your spouse?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>Pregnant or postpartum (last 12 months)?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>Under the age of 5?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>Between the age of 5 and 18?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>Over the age of 60?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>Disabled?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </>
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
        <>
	    <div>
		<p>A student attending college, university, graduate school, or trade/technical school at least half time?</p>
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
	    {dataForm.student === true &&
	    <div>
		<p>Students don't count lol</p>
	    </div>
	    }
        </>
    )
}

export default function HouseholdComposition({onNext,onBack,dataForm,updateDataForm}) {
    let nextButton ; 
    if ((dataForm.pregnantPostpartum != null) &
    (dataForm.childUnder5 != null) &
    (dataForm.child5to18 != null) &
    (dataForm.elderly != null) &
    (dataForm.student != null) &
    (dataForm.disabled != null)) {
	nextButton = <button onClick={onNext}>Next</button> ;
    }
    return (
        <>
            <div>
                <HouseholdSize dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
	    {(dataForm.size > 1) &&
	    <div>
		<Married dataForm={dataForm} updateDataForm={updateDataForm}/>
	    </div>
	    }
            <div>
                <h1>Are you or anyone in your household...</h1> 
            </div>
            <div>
                <PregnantPostpartum dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <ChildUnder5 dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <Child5to18 dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <Elderly dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <Disabled dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <Student dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
            <button onClick={onBack}>Back</button>  
	    {nextButton}
        </>
    )
}
