import { useState } from 'react' ; 
import './App.css' ; 

import WelcomePage from './WelcomePage' ; 
import ResidencyCitizenship from './ResidencyCitizenship' ; 
import HouseholdComposition from './HouseholdComposition' ; 
import HouseholdIncomeAssets from './HouseholdIncomeAssets';

function App() {
  const [step, setStep] = useState(0) ; 
  const [dataForm, updateDataForm] = useState({
					wyResident: null,
					citizen: null,
					size: "1",
					pregnantPostpartum: false,
					childUnder5: false,
					child5to18: false,
					elderly: false,
					disabled: false,
					earnedIncome: "",
					otherIncome: "",
					totalAssets: ""}) ; 
  
  const steps = [<WelcomePage onNext = {() => setStep(step+1)}/>,
		 <ResidencyCitizenship onNext={() => setStep(step+1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
		 <HouseholdComposition onNext={() => setStep(step+1)} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
		 <HouseholdIncomeAssets onNext={() => setStep(step+1)} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>] ; 

  return (
    <>
		<div>
			{steps[step]} 
		</div>
    </>
  )
}

export default App
