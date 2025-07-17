import { useState } from 'react' ;
import { snapIncomeLimits, wicIncomeLimits, liheapIncomeLimits , medicaidIncomeLimits } from './MiscComponents' ;
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

    const onSSI = dataForm.onSSI ;
    const onTANF = dataForm.onTANF ; 

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
	grossIncomeLimit = snapIncomeLimits.maxGrossHHEOD[Math.min(size,10)] + Math.max(size - 10,0)*snapIncomeLimits.maxGrossHHEOD.additionalMember ;
    }
    else {
	grossIncomeLimit = snapIncomeLimits.maxGross[Math.min(size,10)] + Math.max(size - 10,0)*snapIncomeLimits.maxGross.additionalMember ;
    }

    const grossIncomeString = (earnedIncome + otherIncome).toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const grossIncomeLimitString = grossIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

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
    const netIncomeLimit = snapIncomeLimits.maxNet[Math.min(size,10)] + Math.max(size - 10,0)*snapIncomeLimits.maxNet.additionalMember ;

    const netIncomeString = netIncome.toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const netIncomeLimitString = netIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if (netIncome > netIncomeLimit) {
	qualifiedSNAP = false ;
	reasonList.push("Your net monthly income (total minus allowed deductions) of " + netIncomeString + " per month exceeds the limit of " + netIncomeLimitString + " for your household size and composition.")
    }

    // assets
    let assetLimit ;
    if (hheod) {
	assetLimit = 3750 ;
    }
    else {
	assetLimit = 2500 ;
    }

    const assetString = totalAssets.toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const assetLimitString = assetLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if ((totalAssets > assetLimit) & !(onSSI || onTANF)) {
	qualifiedSNAP = false ;
	reasonList.push("Your total assets of " + assetString + " exceed the limit of " + assetLimitString + " for your household size and composition.")
    }

    // reasons not qualified
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
	    <ResultsCard qualified={false} program={"SNAP"} reasons={<Reasons reasonList={reasonList}/>} icon={"snapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
}

function WicEligibility({dataForm}) {
    const size = Number(dataForm.size) ;
    const resident = dataForm.resident ; 
    const citizen = dataForm.citizen ; 

    const pregnant = dataForm.pregnantPostpartum ;
    const childUnder5 = dataForm.childUnder5 ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;

    const onSNAP = dataForm.onSNAP ;
    const onTANF = dataForm.onTANF ;
    const onMedicaid = dataForm.onMedicaid ;

    // tests
    let qualifiedWIC = true ;
    const reasonList = [] ;

    // resident/citizen
    if (!dataForm.resident) {
	qualifiedWIC = false ;
	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedWIC = false ;
	reasonList.push("At least one household member must be a U.S. citizen or qualified immigrant.")
    }

    // pregnant
    if (!(pregnant || childUnder5)) {
	qualifiedWIC = false ; 
	reasonList.push('Your household must include someone who is pregnant, recently postpartum, or breastfeeding, or a child under 5 years old.') ; 
    }

    // income
    const grossIncomeLimit = wicIncomeLimits.maxGross[size] ;

    const grossIncomeString = (earnedIncome + otherIncome).toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const grossIncomeLimitString = grossIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if ((earnedIncome + otherIncome > grossIncomeLimit) & !(onSNAP || onTANF || onMedicaid)) {
	qualifiedWIC = false ;
	reasonList.push("Your total monthly income of " + grossIncomeString + " per month exceeds the limit of " + grossIncomeLimitString + " for your household size and composition.")
    }

    // reasons not qualified
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
    if (dataForm.onWIC) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"WIC"} icon={"wicicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else if (qualifiedWIC) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"WIC"} icon={"wicicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	return (
	    <ResultsCard qualified={false} program={"WIC"} reasons={<Reasons reasonList={reasonList}/>} icon={"wicicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
}

function LiheapEligibility({dataForm}) {
    const size = Number(dataForm.size) ;
    const resident = dataForm.resident ; 
    const citizen = dataForm.citizen ; 

    const paysHeatingCooling = dataForm.paysHeatingCooling ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;

    // tests
    let qualifiedLIHEAP = true ;
    const reasonList = [] ;

    // resident/citizen
    if (!dataForm.resident) {
	qualifiedLIHEAP = false ;
	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedLIHEAP = false ;
	reasonList.push("At least one household member must be a U.S. citizen or qualified immigrant.")
    }

    // pays heating/cooling
    if (!paysHeatingCooling) {
	qualifiedLIHEAP = false ;
	reasonList.push("LIHEAP provides assistance with heating/cooling bills, but you indicated that you don't pay those (separately from rent/mortgage).")
    }


    // income
    const grossIncomeLimit = liheapIncomeLimits.maxGross[size] ;

    const grossIncomeString = (earnedIncome + otherIncome).toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const grossIncomeLimitString = grossIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if (earnedIncome + otherIncome > grossIncomeLimit) {
	qualifiedLIHEAP = false ;
	reasonList.push("Your total monthly income of " + grossIncomeString + " per month exceeds the limit of " + grossIncomeLimitString + " for your household size and composition.")
    }

    // reasons not qualified
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
    if (dataForm.onLIHEAP) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"LIHEAP"} icon={"liheapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else if (qualifiedLIHEAP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"LIHEAP"} icon={"liheapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	return (
	    <ResultsCard qualified={false} program={"LIHEAP"} reasons={<Reasons reasonList={reasonList}/>} icon={"liheapicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
}

function MedicaidEligibility({dataForm,updateDataForm}) {
    const size = Number(dataForm.size) ;
    const resident = dataForm.resident ;
    const citizen = dataForm.citizen ;

    const pregnant = dataForm.pregnantPostpartum ;
    const childUnder5 = dataForm.childUnder5 ;
    const child5to18 = dataForm.child5to18 ;
    const disabled = dataForm.disabled ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;

    let tanfIncome ;
    let ssiIncome ;

    if (dataForm.tanfIncome === "") {
	tanfIncome = 0 ;
    }
    else {
	tanfIncome = Number(dataForm.tanfIncome.replace(/,/g,"")) ;
    }

    if (dataForm.ssiIncome === "") {
	ssiIncome = 0 ;
    }
    else {
	ssiIncome = Number(dataForm.ssiIncome.replace(/,/g,"")) ;
    }

    // tests
    let qualifiedChildMedicaid = true ;
    let qualifiedCHIP = true ;
    let qualifiedMAGI = true ;
    let qualifiedPregnantMedicaid = true ;
    let qualifiedDisabledMedicaid = true ; 
    const reasonList = [] ;

    // resident/citizen
    if (!dataForm.resident) {
	qualifiedChildMedicaid = false ;
	qualifiedPregnantMedicaid = false ;
	qualifiedCHIP = false ;
	qualifiedMAGI = false ;

	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedChildMedicaid = false ;
	qualifiedPregnantMedicaid = false ;
	qualifiedCHIP = false ;
	qualifiedMAGI = false ;
	reasonList.push("Medicaid recipients must be U.S. citizens or qualified immigrants.")
    }

    // pregnancy + children
    if (!(pregnant || childUnder5)) {
	qualifiedPregnantMedicaid = false ;
    }

    if (!child5to18) {
	qualifiedChildMedicaid = false ;
    }

    if (!(childUnder5 || child5to18)) {
	qualifiedMAGI = false ; 
	qualifiedCHIP = false ;
    }

    // disabled 
    if (!disabled) {
	qualifiedDisabledMedicaid = false ; 
    }

    // income
    // chip
    let chipLimit ;
    let childUnder5orPregnantLimit ;
    let child6to18Limit ;
    let magiLimit ;
    const disabledLimit = medicaidIncomeLimits.disabled ;

    let oversize = false ;
    if (size <= 10) {
	chipLimit = medicaidIncomeLimits.chip[size] ;
	childUnder5orPregnantLimit = medicaidIncomeLimits.childUnder5orPregnant[size] ;
	child6to18Limit = medicaidIncomeLimits.child6to18[size] ;
	magiLimit = medicaidIncomeLimits.magi[size] ;
    }
    else {
	chipLimit = 0 ;
	childUnder5orPregnantLimit = 0 ;
	child6to18Limit = 0 ;
	magiLimit = 0 ;
	oversize = true ;
    }

    if (earnedIncome + otherIncome - tanfIncome - ssiIncome > chipLimit) {
	qualifiedCHIP = false ;
    }

    if (earnedIncome + otherIncome - tanfIncome - ssiIncome > childUnder5orPregnantLimit) {
	qualifiedPregnantMedicaid = false ;
    }

    if (earnedIncome + otherIncome - tanfIncome - ssiIncome > child6to18Limit) {
	qualifiedChildMedicaid = false ;
    }

    if (otherIncome - tanfIncome - ssiIncome > disabledLimit) {
	qualifiedDisabledMedicaid = false ;
    }

    if (earnedIncome + otherIncome > magiLimit) {
	qualifiedMAGI = false ;
    }

    if (!(qualifiedCHIP || qualifiedPregnantMedicaid || qualifiedChildMedicaid || qualifiedDisabledMedicaid || qualifiedMAGI)) {
	if (!(childUnder5 || child5to18) & !disabled) {
	    reasonList.push("In general, Wyoming Medicaid is restricted to children and people with disabilities or who are pregnant.") ;
	}
	else {
	    reasonList.push("Your household exceeds the income thresholds for Wyoming's Medicaid programs.") ;
	}
    }

    // reasons not qualified
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
    if (dataForm.onMedicaid) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"Medicaid"} icon={"medicaidicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else if (oversize) {
	description = "" ;
	return (
	    <ResultsCard qualified={true} program={"Medicaid"} reasons={<Reasons reasonList={reasonList}/>} icon={"medicaidicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else if (qualifiedMAGI || qualifiedPregnantMedicaid || qualifiedChildMedicaid || qualifiedDisabledMedicaid) {
	description = "Likely eligible" ;
	return (
	    <>
		{qualifiedCHIP &&
		<ResultsCard qualified={true} reasons={''} program={"CHIP (Children's Health Insurance Plan"} icon={"chipicon.png"} description={description} link={"http://www.google.com"}/>}
		<ResultsCard qualified={true} reasons={''} program={"Medicaid"} icon={"medicaidicon.png"} description={description} link={"http://www.google.com"}/>
	    </>
	)
    }
    else if (qualifiedCHIP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={true} reasons={''} program={"CHIP (Children's Health Insurance Plan"} icon={"medicaidicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	return (
	    <ResultsCard qualified={false} program={"Medicaid"} reasons={<Reasons reasonList={reasonList}/>} icon={"medicaidicon.png"} description={description} link={"http://www.google.com"}/>
	)
    }

}

export default function Results({onBack,dataForm}) {
    return (
	<>
	    <SnapEligibility dataForm={dataForm}/>
	    <WicEligibility dataForm={dataForm}/>
	    <LiheapEligibility dataForm={dataForm}/>
	    <MedicaidEligibility dataForm={dataForm}/>
	</>
    )
}
