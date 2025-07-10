import { useState } from 'react' ;
import { wySNAPIncomeLimits } from './MiscComponents' ;
import { ResultsCard } from './MiscComponents' ; 

function SnapEligibility({dataForm}) {
    const povertyLine = 1255.00 ;

    const size = Number(dataForm.size)
    const hheod = dataForm.elderly || dataForm.disabled ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;
    const totalAssets = Number(dataForm.totalAssets.replace(/,/g,"")) ;

    const rentMortgage = dataForm.paysRentMortgage ? Number(dataForm.rentMortgage) : 0 ;
    const insuranceTaxHOA = dataForm.paysInsuranceTaxHOA ? Number(dataForm.insuranceTaxHOA) : 0 ;
    const medicalExpenses = dataForm.paysMedicalExpenses ? Number(dataForm.medicalExpenses) : 0 ;
    const dependentCare = dataForm.paysDependentCare ? Number(dataForm.dependentCare) : 0 ;
    const childSupport = dataForm.paysChildSupport ? Number(dataForm.childSupport) : 0 ;

    // earned income deduction
    const earnedIncomeDeduction = 0.2*earnedIncome ;

    // standard deduction
    let standardDeduction = 0 ;
    if (size >= 1 && size < 4) {
	standardDeduction = 177 ;
    }
    else if (size === 4) {
	standardDeduction = 184 ;
    }
    else if (size === 5) {
	standardDeduction = 215 ;
    }
    else {
	standardDeduction = 246 ;
    }

    // medical deduction
    let medicalDeduction = 0 ;
    if (hheod && (medicalExpenses > 35)) {
	medicalDeduction = Math.max(medicalExpenses,175) ;
    }
    else if (hheod && (medicalExpenses <= 35)) {
	medicalDeduction = medicalExpenses ;
    }

    // shelter deduction
    const nonShelterDeductions = earnedIncomeDeduction + standardDeduction + medicalDeduction + dependentCare + childSupport ;
    const shelterThreshold = Math.max((earnedIncome + otherIncome - nonShelterDeductions)/2,0) ;
    let shelterDeduction = 0 ;
    shelterDeduction = Math.max(rentMortgage + insuranceTaxHOA - shelterThreshold,0) ; 
    if (!hheod) {
	shelterDeduction = Math.min(shelterDeduction, 712) ;
    }

    // homeless deduction
    const homelessDeduction = dataForm.homeless ? 190.30 : 0 ;

    // utility deduction
    const nonHeatingUtilities = [dataForm.paysElectricity, dataForm.paysGasFuel, dataForm.paysWater, dataForm.paysSewage, dataForm.paysTrash, dataForm.paysPhone] ;
    const count = nonHeatingUtilities.filter(Boolean).length ;
    let utilityDeduction = 0 ;
    if (dataForm.paysHeatingCooling) {
	utilityDeduction = 472 ;
    }
    else if (count >= 2) {
	utilityDeduction = 317 ;
    }
    else if ((count === 1) && dataForm.paysPhone) {
	utilityDeduction = 56 ;
    }

    // tests
    let qualifiedSNAP = true ;
    const reasonList = [] ; 
    // resident/citizen
    if (!dataForm.resident) {
	qualifiedSNAP = false ;
	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedSNAP = false ;
	reasonList.push("At least one household member must be a U.S. citizen or qualified immigrant.")
    }

    // gross income
    let grossIncomeLimit
    if (hheod) {
	grossIncomeLimit = wySNAPIncomeLimits.maxGrossHHEOD[Math.min(size,10)] + Math.max(size - 10,0)*wySNAPIncomeLimits.maxGrossHHEOD.additionalMember ;
    }
    else {
	grossIncomeLimit = wySNAPIncomeLimits.maxGross[Math.min(size,10)] + Math.max(size - 10,0)*wySNAPIncomeLimits.maxGross.additionalMember ;
    }

    const grossIncomeString = String(earnedIncome + otherIncome) ;
    const grossIncomeLimitString = String(grossIncomeLimit) ; 

    if (earnedIncome + otherIncome > grossIncomeLimit) {
	qualifiedSNAP = false ;
	reasonList.push("Your total monthly income of " + grossIncomeString + " per month exceeds the limit of " + grossIncomeLimitString + " for your household size and composition.")
    }

    // net income
    const netIncome = (
	earnedIncome
	+ otherIncome 
	- earnedIncomeDeduction 
	- standardDeduction
	- medicalDeduction
	- shelterDeduction
	- homelessDeduction
	- dependentCare
	- childSupport
	- utilityDeduction
    ) ;
    const netIncomeLimit = wySNAPIncomeLimits.maxNet[Math.min(size,10)] + Math.max(size - 10,0)*wySNAPIncomeLimits.maxNet.additionalMember ;

    const netIncomeString = String(netIncome) ;
    const netIncomeLimitString = String(netIncomeLimit) ; 

    if (netIncome > netIncomeLimit) {
	qualifiedSNAP = false ;
	reasonList.push("Your net monthly income (total minus allowed deductions) of $" + netIncomeString + " per month exceeds the limit of " + netIncomeLimitString + " for your household size and composition.")
    }

    // assets
    let assetLimit ;
    if (hheod) {
	assetLimit = 3750 ;
    }
    else {
	assetLimit = 2500 ;
    }

    const assetString = String(totalAssets) ;
    const assetLimitString = String(assetLimit) ; 

    if (totalAssets > assetLimit) {
	qualifiedSNAP = false ;
	reasonList.push("Your total assets of $" + dataForm.totalAssets + " exceeds the limit of $" + assetLimitString + " for your household size and composition.")
    }

    function Reasons({reasonList}) {
	return (
	    <ul className="reason-list">
		{reasonList.map((r,ind) => (
		    <li key={ind}>{r}</li>
		))}
	    </ul>
	)	
    }

    // html
    let description ;
    if (dataForm.onSNAP) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"SNAP"} icon={"snapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else if (qualifiedSNAP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"SNAP"} icon={"snapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	return (
	    <ResultsCard program={"SNAP"} reasons={<Reasons reasonList={reasonList}/>} icon={"snapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
}

function WicEligibility({dataForm,updateDataForm}) {
}

function LiheapEligibility({dataForm,updateDataForm}) {
}

function MedicaidEligibility({dataForm,updateDataForm}) {
}

export default function Results({onBack,dataForm}) {
    return (
	<>
	    <SnapEligibility dataForm={dataForm}/>
	</>
    )
}
