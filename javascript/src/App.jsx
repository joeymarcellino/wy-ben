import { useState } from 'react' ; 
import './App.css' ; 

import WelcomePage from './WelcomePage' ; 
import ResidencyCitizenship from './ResidencyCitizenship' ; 
import HouseholdComposition from './HouseholdComposition' ; 
import HouseholdIncomeAssets from './HouseholdIncomeAssets' ;
import MedicalDependentChildSupport from './MedicalDependentChildSupport' ;
import Shelter from './Shelter' ; 
import Utilities from './Utilities' ;
import OtherPrograms from './OtherPrograms' ;
import Results from './Results' ;

function App() {
    const [step, setStep] = useState(0) ; 
    const [dataForm, updateDataForm] = useState({
	resident: null,
	citizen: null,
	size: "1",
	pregnantPostpartum: false,
	childUnder5: false,
	child5to18: false,
	elderly: false,
	disabled: false,
	student: false,
	earnedIncome: "",
	otherIncome: "",
	totalAssets: "",
	paysRentMortgage: null,
	rentMortgage: "",
	paysInsuranceTaxHOA: null,
	insuranceTaxHOA: "",
	homeless: null,
	paysHeatingCooling: false,
	paysElectricity: false,
	paysGasFuel: false,
	paysWater: false,
	paysSewage: false,
	paysTrash: false,
	paysPhone: false,
	paysMedicalExpenses: null,
	medicalExpenses: "",
	paysDependentCare: null,
	dependentCare: "",
	paysChildSupport: null,
	childSupport: "",
	onSNAP: false,
	onMedicaid: false,
	onTANF: false,
	onSSI: false,
	onSSDI: false
    }) ; 

    const handleIncomeNext = () => {
	const fields = ["earnedIncome","otherIncome","totalAssets"] ; 
		
	for (let x of fields) {
	    if (dataForm[x] === "") {
		dataForm[x] = "0.00"
	    }
	} ;

	setStep(step+1) ; 
    } ;

    const handleMedicalDependentChildSupportNext = () => {
	const fields = ["medicalExpenses","dependentCare","childSupport"] ;
	const checks =  ["paysMedicalExpenses","paysDependentCare","paysChildSupport"]

	for (let x = 0; x<fields.length; x++) {
	    if (dataForm[checks[x]] === true & dataForm[fields[x]] === "") {
		dataForm[fields[x]] = "0.00"
	    }
	} ;

	setStep(step+1) ;
    } ;

    const handleShelterNext = () => {
	const fields = ["rentMortgage","insuranceTaxHOA"] ;
	const checks =  ["paysRentMortgage","paysInsuranceTaxHOA"]

	for (let x = 0; x<fields.length; x++) {
	    if (dataForm[checks[x]] === true & dataForm[fields[x]] === "") {
		dataForm[fields[x]] = "0.00"
	    }
	} ;

	setStep(step+1) ;
    } ;

    const steps = [<WelcomePage onNext = {() => setStep(step+1)}/>,
	<ResidencyCitizenship onNext={() => setStep(step+1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<HouseholdComposition onNext={() => setStep(step+1)} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<HouseholdIncomeAssets onNext={handleIncomeNext} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<Shelter onNext={handleShelterNext} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<MedicalDependentChildSupport onNext={handleMedicalDependentChildSupportNext} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<Utilities onNext={() => setStep(step+1)} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<OtherPrograms onNext={() => setStep(step+1)} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<Results onBack={() => setStep(step-1)} dataForm={dataForm}/>]; 

    return (
	<>
	    <div>
		{steps[step]} 
	    </div>
	</>
    )
}

export default App
