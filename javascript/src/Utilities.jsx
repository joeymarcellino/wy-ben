import { useState } from "react";

function HeatingCooling({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysHeatingCooling: value})) ; 
	}
  return (
	<>
	    <p>Heating/cooling</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysHeatingCooling}/> 
	</>
	)
}

function Electricity({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysElectricity: value})) ; 
	}
  return (
	<>
	    <p>Electricity</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysElectricity}/> 
	</>
	)
}

function GasFuel({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysGasFuel: value})) ; 
	}
  return (
	<>
	    <p>Gas/fuel</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysGasFuel}/> 
	</>
	)
}

function Water({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysWater: value})) ; 
	}
  return (
	<>
	    <p>Water</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysWater}/> 
	</>
	)
}

function Sewage({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysSewage: value})) ; 
	}
  return (
	<>
	    <p>Sewage</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysSewage}/> 
	</>
	)
}

function Trash({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysTrash: value})) ; 
	}
  return (
	<>
	    <p>Trash</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysTrash}/> 
	</>
	)
}

function Phone({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, paysPhone: value})) ; 
	}
  return (
	<>
	    <p>Phone</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.paysPhone}/> 
	</>
	)
}

export default function Utilities({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<>
	    <h1>Which of the following utility bills do you pay?</h1>
	    <p>(check heating/cooling if you received a payment over $20 from LIHEAP)</p>
	    <div>
		<HeatingCooling dataForm={dataForm} updateDataForm={updateDataForm}/>
		<Electricity dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<GasFuel dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Water dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Sewage dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Trash dataForm={dataForm} updateDataForm={updateDataForm}/>	
		<Phone dataForm={dataForm} updateDataForm={updateDataForm}/>	
	    </div>
	    <div>
		<button onClick={onBack}>Back</button>  
		<button onClick={onNext}>Next</button> 
	    </div>
	</>
    )
}

