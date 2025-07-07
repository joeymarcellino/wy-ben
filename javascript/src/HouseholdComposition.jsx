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

function PregnantPostpartum({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, pregnantPostpartum: value})) ; 
	}
  return (
	<>
	    <p>Pregnant or postpartum (last 12 months)?</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.pregnantPostpartum}/> 
	</>
	)
}

function ChildUnder5({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, childUnder5: value})) ; 
	}
  return (
	<>
	    <p>Under the age of 5?</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.childUnder5}/> 
	</>
	)
}

function Child5to16({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, child5to16: value})) ; 
	}
  return (
	<>
	    <p>Between the age of 5 and 16?</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.child5to16}/> 
	</>
	)
}

function Elderly({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, elderly: value})) ; 
	}
  return (
	<>
	    <p>Over the age of 60?</p> 
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.elderly}/>  
	</>
	)
}

function Disabled({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, disabled: value})) ; 
	}
  return (
	<>
	    <p>Disabled?</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.disabled}/> 
	</>
	)
}
function Student({dataForm,updateDataForm}) {
  const handleChange = (e) => {
	const value = e.target.checked ; 
	updateDataForm((prevData) => ({
		...prevData, student: value})) ; 
	}
  return (
	<>
	    <p>A student attending college, university, graduate school, or trade/technical school at least half time?</p>
  	    <input type="checkbox" onChange={handleChange} checked={dataForm.student}/> 
	</>
	)
}

export default function HouseholdComposition({onNext,onBack,dataForm,updateDataForm}) {
    return (
        <>
            <div>
                <HouseholdSize dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
            <div>
                <h1>Is anyone in your household...</h1> 
            </div>
            <div>
                <PregnantPostpartum dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <ChildUnder5 dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <Child5to16 dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <Elderly dataForm={dataForm} updateDataForm={updateDataForm}/> 
                <Disabled dataForm={dataForm} updateDataForm={updateDataForm}/>  
                <Student dataForm={dataForm} updateDataForm={updateDataForm}/>  
            </div>
            <button onClick={onBack}>Back</button>  
            <button onClick={onNext}>Next</button> 
        </>
    )
}
