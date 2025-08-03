import { useState } from "react";

function HeatingCooling({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysHeatingCooling: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysHeatingCooling}/>
	    <span></span>
	    Heating/cooling
	</label>
	)
}

function Electricity({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysElectricity: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysElectricity}/> 
	    <span></span>
	    Electricity
	</label>
	)
}

function GasFuel({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysGasFuel: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysGasFuel}/> 
	    <span></span>
	    Gas/fuel
	</label>
	)
}

function Water({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysWater: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysWater}/> 
	    <span></span>
	    Water
	</label>
	)
}

function Sewage({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysSewage: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysSewage}/> 
	    <span></span>
	    Sewage
	</label>
	)
}

function Trash({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysTrash: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysTrash}/> 
	    <span></span>
	    Trash
	</label>
	)
}

function Phone({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysPhone: value})) ; 
	}
  return (
	<label className="checkbox-label">
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysPhone}/> 
	    <span></span>
	    Phone
	</label>
	)
}

export default function Utilities({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<div className="form-page">
	    <h1>Which of the following utility bills do you pay?</h1>
	    <p>Check all that apply. If you receive at least $20 in LIHEAP assistance, check "Heating/cooling".</p>
	    <div className="checkbox-grid">
		<HeatingCooling dataForm={dataForm} updateDataForm={updateDataForm}/>
		<Electricity dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<GasFuel dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Water dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Sewage dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Trash dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Phone dataForm={dataForm} updateDataForm={updateDataForm}/>	
	    </div>
	    <div className="nav-buttons">
		<button className="back-button" onClick={onBack}>Back</button>  
		<button className="next-button" onClick={onNext}>Next</button> 
	    </div>
	</div>
    )
}

