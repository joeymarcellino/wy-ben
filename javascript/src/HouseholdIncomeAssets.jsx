import { useState } from "react" ; 
import { AutoFormatMoneyInput } from "./MiscComponents";

function HouseholdEarnedIncome({dataForm,updateDataForm}) {
  return (
	<>
	  <h1>What is your monthly household earned income before taxes?</h1>
	  <div>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"earnedIncome"}/>
	  </div>	
	</>
	)
}

function HouseholdOtherIncome({dataForm,updateDataForm}) {
  return (
	<>
	  <h1>What is your monthly household other income before taxes?</h1>
	  <div>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"otherIncome"}/>
	  </div>	
	</>
	)
}

function TotalAssets({dataForm,updateDataForm}) {
  return (
	<>
	  <h1>What are your total assets?</h1>
	  <div>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"totalAssets"}/>
	  </div>	
	</>
	)
}

export default function HouseholdIncomeAssets({onNext,onBack,dataForm,updateDataForm}) {
	return (
		<>
			<HouseholdEarnedIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<HouseholdOtherIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<TotalAssets onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
			<button onClick={onBack}>Back</button>
			<button onClick={onNext}>Next</button>
		</>
	)
}
