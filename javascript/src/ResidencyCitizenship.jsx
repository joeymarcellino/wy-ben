import { useState } from 'react'

function Residency({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, resident : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, resident : false})) 
    }

    const yesClass = dataForm.resident === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.resident === false ? "clickedButton" : "unclickedButton"

    return(
        <div className="question-block">
            <h2>Do you currently live in Wyoming?</h2>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </div>
    )
}

function Citizenship({dataForm,updateDataForm}) {
    const handleYesClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, citizen : true})) 
    }
    const handleNoClick = (e) => {
        updateDataForm((prevData) => ({
            ...prevData, citizen : false})) 
    }

    const yesClass = dataForm.citizen === true ? "clickedButton" : "unclickedButton"
    const noClass = dataForm.citizen === false ? "clickedButton" : "unclickedButton"

    return(
        <div className="question-block">
	    <h2>Are you or any household member a U.S. citizen or qualified non-citizen?</h2>
	    <p>This includes green card holders, refugees, or asylees.</p>
	    <div className="button-group">
		<button className={yesClass} onClick={handleYesClick}>Yes</button>
		<button className={noClass} onClick={handleNoClick}>No</button>
	    </div>
        </div>
    )
}

export default function ResidencyCitizenship({onNext, dataForm, updateDataForm}) {
  const nextButtonActive = (dataForm.citizen !== null & dataForm.resident !== null) ;

  return(
    <div className="form-page">
      <Residency dataForm={dataForm} updateDataForm={updateDataForm}/>
      <Citizenship dataForm={dataForm} updateDataForm={updateDataForm}/>
      <div className="nav-buttons">
        <span></span> 
        {nextButtonActive && <button onClick={onNext} className="next-button">Next</button>}
      </div>
    </div>
  )
}
