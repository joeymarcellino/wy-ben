import { useState } from "react" ;

function OnSNAP({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, onSNAP: value})) ; 
	}
  return (
	<>
	    <p>SNAP (food stamps)</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.onSNAP}/> 
	</>
	)
}

function OnMedicaid({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, onMedicaid: value})) ; 
	}
  return (
	<>
	    <p>Medicaid</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.onMedicaid}/> 
	</>
	)
}

function OnTANF({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, onTANF: value})) ; 
	}
  return (
	<>
	    <p>POWER / TANF (Temporary Assistance for Needy Families)</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.onTANF}/> 
	</>
	)
}

function OnSSI({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, onSSI: value})) ; 
	}
  return (
	<>
	    <p>Supplemental Security Income (SSI)</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.onSSI}/>  
	</>
	)
}

function OnSSDI({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, onSSDI: value})) ; 
	}
  return (
	<>
	    <p>Social Security Disability (SSDI)</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.onSSDI}/> 
	</>
	)
}

export default function OtherPrograms({onNext,onBack,dataForm,updateDataForm}) {
    return (
        <>
            <div>
                <h1>Does anyone in your household currently receive any of the following?</h1> 
            </div>
            <div>
                <OnSNAP dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnMedicaid dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnTANF dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <OnSSI dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <OnSSDI dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
            <button onClick={onBack}>Back</button>  
            <button onClick={onNext}>See results</button> 
        </>
    )
}
