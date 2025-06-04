import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function WelcomePage({onNext}) {
  return (
	<>
	  <h1>Welcome!</h1>
	  <button onClick={onNext}>Get started</button>
	</>
	)
}

function HouseholdSize({onNext,dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.value
	updateDataForm((prevData) => ({
		 ...prevData, hhSize: value}))
	}
  return (
	<>
	  <h1>How many people are in your household?</h1>
	  <div>
	    <input type="number" min="1" max="14" value={dataForm.hhSize} onChange={handleChange}/>
	  </div>
	  <button onClick={onNext}>Next</button>
	</>
	)
}

function HouseholdEOD({onNext,onBack,dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked
	updateDataForm((prevData) => ({
		...prevData, hhEOD: value}))
	}
  return (
	<>
	  <h1>Is anyone in your household elderly or disabled?</h1>
	  <div>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.hhEOD}/>
	  </div>
	  <button onClick={onBack}>Back</button>
	  <button onClick={onNext}>Next</button>
	</>
	)
}

function HouseholdEarnedIncome({onNext,onBack,dataForm,updateDataForm}) {
  const handleChange = (e) => {
  	const value = e.target.value
  	if ((/^$|^(\d+\,?)+(\.?\d{0,2})$/).test(value)) {
		updateDataForm((prevData) => ({
			...prevData, hhEarnedIncome: value}))	
       	  }
	}

  const handleBlur = (e) => {
	const value = e.target.value
	const [whole,decimal] = value.split(".")
	}

  return (
	<>
	  <h1>What is your monthly household earned income before taxes?</h1>
	  <div>
	    $<input type="text" onChange={handleChange} onBlur={handleBlur} value={dataForm.hhEarnedIncome}/>
	  </div>	
	  <button onClick={onBack}>Back</button>
	  <button onClick={onNext}>Next</button>
	</>
	)
}

function App() {
  const [step, setStep] = useState(0)
  const [dataForm, updateDataForm] = useState({
					hhSize: "1",
					hhEOD: false,
					hhEarnedIncome: "",
					hhOtherIncome: "0",
					totalAssets: "0"})
  
  const steps = [<WelcomePage onNext = {() => setStep(1)}/>,
		 <HouseholdSize onNext={() => setStep(2)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
		 <HouseholdEOD onNext={() => setStep(3)} onBack={() => setStep(1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
		 <HouseholdEarnedIncome onNext={() => setStep(0)} onBack={() => setStep(2)} dataForm={dataForm} updateDataForm={updateDataForm}/>]
  
  const test = <h1>test</h1>

  return (
    <>
	<div>
	  {steps[step]}
	</div>
	{test}
    </>
  )
}

export default App
