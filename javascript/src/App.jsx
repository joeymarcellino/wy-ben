import { useState } from 'react' ; 
import './App.css' ; 
import wyFlag from './assets/flag.svg' ;
import allIcons from './assets/all_icons.svg' ;

import WelcomePage from './WelcomePage' ; 
import ResidencyCitizenship from './ResidencyCitizenship' ; 
import HouseholdComposition from './HouseholdComposition' ; 
import HouseholdIncomeAssets from './HouseholdIncomeAssets' ;
import MedicalDependentChildSupport from './MedicalDependentChildSupport' ;
import Shelter from './Shelter' ; 
import Utilities from './Utilities' ;
import OtherPrograms from './OtherPrograms' ;
import Results from './Results' ;
import { ProgressBar } from './MiscComponents.jsx' ;

function App() {
    const [step, setStep] = useState(0) ; 
    const [dataForm, updateDataForm] = useState({
	resident: null,
	citizen: null,
	size: "1",
	married: null,
	pregnantPostpartum: null,
	childUnder5: null,
	child5to18: null,
	elderly: null,
	disabled: null,
	student: null,
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
	onSNAP: null,
	onMedicaid: null,
	onTANF: null,
	tanfIncome : "",
	onSSI: null,
	ssiIncome: ""
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

    const handleOtherProgramsNext = () => {
	const fields = ["tanfIncome","ssiIncome"] ;
	const checks =  ["onTANF","onSSI"]

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
	<OtherPrograms onNext={handleOtherProgramsNext} onBack={() => setStep(step-1)} dataForm={dataForm} updateDataForm={updateDataForm}/>,
	<Results onBack={() => setStep(step-1)} dataForm={dataForm}/>]; 

    return (
	<div className="page-wrapper">
	    {step === 0 && (
		<img src={wyFlag} className="side-image" alt="Decorative graphic"/>
	    )}

	    <main className="main-content-area">
		<div className="app-container">
		    <ProgressBar currentStep={step} totalSteps={steps.length} />
		    <div>{steps[step]}</div>
		</div>
		{step === 0 && (
		    <div className="disclaimer">
			<p>
			    This website is an independent, non-governmental resource. All calculations are estimates for educational purposes only and are based on publicly available information that may be incomplete or outdated. To determine your final eligibility and benefit amount, you must submit an official application to the appropriate government agency.
			</p>
		    </div>
		)}
	    </main>

	    {step === 0 && (
	    <img src={allIcons} className="side-image" alt="Decorative graphic"/>
	    )}
	</div>
    );
}

export default App
