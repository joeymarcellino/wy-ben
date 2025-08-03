import { useState } from "react" ; 
import { AutoFormatMoneyInput } from "./MiscComponents";

function HouseholdEarnedIncome({dataForm,updateDataForm}) {
  return (
	<div className="question-block">
	    <h2>What is your monthly household earned income before taxes?</h2>
	    <p>Include wages, salaries, tips, and self-employment income before any taxes or deductions.</p>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"earnedIncome"}/>
	</div>
	)
}

function HouseholdOtherIncome({dataForm,updateDataForm}) {
  return (
	<div className="question-block">
	    <h2>What is your monthly household other income before taxes?</h2>
	    <p>Include other stuff</p>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"otherIncome"}/>
	</div>
	)
}

function TotalAssets({dataForm,updateDataForm}) {
  return (
	<div className="question-block">
	    <h2>What are your total assets?</h2>
	    <p>Include stuff</p>
	    <AutoFormatMoneyInput dataForm={dataForm} updateDataForm={updateDataForm} dataField={"totalAssets"}/>
	</div>
	)
}

export default function HouseholdIncomeAssets({onNext,onBack,dataForm,updateDataForm}) {
    return (
	<div className="form-page">
	    <HouseholdEarnedIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <HouseholdOtherIncome onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <TotalAssets onNext={onNext} onBack={onBack} dataForm={dataForm} updateDataForm={updateDataForm}/>
	    <div className="nav-buttons">
		<button className="back-button" onClick={onBack}>Back</button>
		<button className="next-button" onClick={onNext}>Next</button>
	    </div>
	</div>
    )
}
