import { useState } from 'react' ;
import { snapIncomeLimits, snapDeductions, wicIncomeLimits, liheapIncomeLimits, medicaidIncomeLimits, tanfIncomeLimits, childcareIncomeLimits } from './MiscComponents' ;
import { ResultsCard } from './MiscComponents' ; 
import snapSVG from './assets/snap.svg' ;
import wicSVG from './assets/wic.svg' ;
import medicaidSVG from './assets/medicaid.svg' ;
import liheapSVG from './assets/liheap.svg' ;
import tanfSVG from './assets/tanf.svg' ;
import childcareSVG from './assets/childcare.svg' ;

const snapIcon = <img className="icon-img" src={snapSVG} alt="SNAP"/> ; 
const wicIcon = <img className="icon-img" src={wicSVG} alt="WIC"/> ; 
const medicaidIcon = <img className="icon-img" src={medicaidSVG} alt="Medicaid"/> ; 
const liheapIcon = <img className="icon-img" src={liheapSVG} alt="LIHEAP"/> ; 
const tanfIcon = <img className="icon-img" src={tanfSVG} alt="TANF"/> ; 
const childcareIcon = <img className="icon-img" src={childcareSVG} alt="Childcare Assistance"/> ;

function SnapEligibility({dataForm}) {
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
    if (size < 6) {
	standardDeduction = snapDeductions.standard[size] ;
    }
    else {
	standardDeduction = snapDeductions.standard.moreThan5 ;
    }

    // medical deduction
    let medicalDeduction = 0 ;
    if (hheod && (medicalExpenses > 35)) {
	medicalDeduction = Math.max(medicalExpenses,snapDeductions.medical) ;
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
	shelterDeduction = Math.min(shelterDeduction, snapDeductions.shelterMax) ;
    }

    // homeless deduction
    const homelessDeduction = dataForm.homeless ? snapDeductions.homeless : 0 ;

    // utility deduction
    const nonHeatingUtilities = [dataForm.paysElectricity, dataForm.paysGasFuel, dataForm.paysWater, dataForm.paysSewage, dataForm.paysTrash, dataForm.paysPhone] ;
    const count = nonHeatingUtilities.filter(Boolean).length ;
    let utilityDeduction = 0 ;
    if (dataForm.paysHeatingCooling) {
	utilityDeduction = snapDeductions.standardUtility ;
    }
    else if (count >= 2) {
	utilityDeduction = snapDeductions.noHeatCool ;
    }
    else if ((count === 1) && dataForm.paysPhone) {
	utilityDeduction = snapDeductions.phone ;
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
	assetLimit = snapIncomeLimits.assets.hheod ;
    }
    else {
	assetLimit = snapIncomeLimits.assets.nonHHEOD ;
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
    const snapLink = "https://dfs.wyo.gov/assistance-programs/food-assistance/supplemental-nutrition-assistance-program-snap/" ;
    let description ;
    if (dataForm.onSNAP) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={2} reasons={''} program={"SNAP"} icon={snapIcon} description={description} link={''}/>
	)
    }
    else if (qualifiedSNAP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"SNAP"} icon={snapIcon} description={description} link={snapLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={snapLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"SNAP"} reasons={<Reasons reasonList={reasonList}/>} icon={snapIcon} description={description} link={""}/>
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
    const wicLink = "https://health.wyo.gov/publichealth/wic/" ;
    let description ;
    if (dataForm.onWIC) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={2} reasons={''} program={"WIC"} icon={wicIcon} description={description} link={''}/>
	)
    }
    else if (qualifiedWIC) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"WIC"} icon={wicIcon} description={description} link={wicLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={wicLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"WIC"} reasons={<Reasons reasonList={reasonList}/>} icon={wicIcon} description={description} link={wicLink}/>
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
    const liheapLink = "https://dfs.wyo.gov/assistance-programs/home-utilities-energy-assistance/low-income-energy-assistance-program-lieap/"
    let description ;
    if (dataForm.onLIHEAP) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={2} reasons={''} program={"LIHEAP"} icon={liheapIcon} description={description} link={''}/>
	)
    }
    else if (qualifiedLIHEAP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"LIHEAP"} icon={liheapIcon} description={description} link={liheapLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={liheapLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"LIHEAP"} reasons={<Reasons reasonList={reasonList}/>} icon={liheapIcon} description={description} link={liheapLink}/>
	)
    }
}

function MedicaidEligibility({dataForm}) {
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
	    reasonList.push("In general, Wyoming Medicaid is restricted to families with children, people with disabilities, and pregnant women.") ;
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
    const medicaidLink = "https://health.wyo.gov/healthcarefin/medicaid/"
    let description ;
    if (dataForm.onMedicaid) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={2} reasons={''} program={"Medicaid"} icon={medicaidIcon} description={description} link={''}/>
	)
    }
    else if (oversize) {
	description = "Eligibility unclear" ;
	// const oversizeExplanation = ["Wyoming only publicly lists Medicaid income limits for households up to 10 people. Contact the Wyoming Department of Health to see if anyone in your household qualifies."]
	const oversizeExplanation = [<p style={{fontSize: ".9rem"}}>Wyoming only publicly lists Medicaid income limits for households up to 10 people. <a href={medicaidLink} target="_blank" rel="noopener noreferrer">Contact</a> the Wyoming Department of Health to see if anyone in your household qualifies.</p>]
	return (
	    <ResultsCard qualified={-1} program={"Medicaid"} reasons={<Reasons reasonList={oversizeExplanation}/>} icon={medicaidIcon} description={description} link={medicaidLink}/>
	)
    }
    else if (qualifiedMAGI || qualifiedPregnantMedicaid || qualifiedChildMedicaid || qualifiedDisabledMedicaid) {
	description = "Likely eligible" ;
	return (
	    <>
		{qualifiedCHIP &&
		<ResultsCard qualified={1} reasons={''} program={"CHIP (Children's Health Insurance Plan)"} icon={medicaidIcon} description={description} link={medicaidLink}/>}
		<ResultsCard qualified={1} reasons={''} program={"Medicaid"} icon={medicaidIcon} description={description} link={medicaidLink}/>
	    </>
	)
    }
    else if (qualifiedCHIP) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"CHIP (Children's Health Insurance Plan)"} icon={medicaidIcon} description={description} link={medicaidLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={medicaidLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"Medicaid"} reasons={<Reasons reasonList={reasonList}/>} icon={medicaidIcon} description={description} link={medicaidLink}/>
	)
    }
}

function TanfEligibility({dataForm}) {
    const size = Number(dataForm.size) ;
    const resident = dataForm.resident ; 
    const citizen = dataForm.citizen ; 
    const married = dataForm.size > 1 ? dataForm.married : false ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;

    // tests
    let qualifiedTANF = true ;
    const reasonList = [] ;

    // resident/citizen
    if (!dataForm.resident) {
	qualifiedTANF = false ;
	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedTANF = false ;
	reasonList.push("At least one household member must be a U.S. citizen or qualified immigrant.")
    }

    // children
    if (!(dataForm.childUnder5 || dataForm.child5to18)) {
	qualifiedTANF = false ;
	reasonList.push("In general, Wyoming POWER / TANF is restricted to families with children.")
    }

    // income
    let shelterQualified = false ;
    if (dataForm.paysRentMortgage ||
	dataForm.paysHeatingCooling ||
	dataForm.paysElectricity ||
	dataForm.paysGasFuel ||
	dataForm.paysWater ||
	dataForm.paysSewage ||
	dataForm.paysTrash) {
	shelterQualified = true ;
    }

    let netIncomeLimit ;
    let oversize = false ;
    if (size > 12) {
	oversize = true ;
	netIncomeLimit = 0 ;
    }
    else {
	if (married & shelterQualified) {
	    netIncomeLimit = tanfIncomeLimits.marriedCoupleQualified[size] ;
	}
	else if (married & !shelterQualified) {
	    netIncomeLimit = tanfIncomeLimits.marriedCoupleDisqualified[size] ;
	}
	else if (!married & shelterQualified) {
	    netIncomeLimit = tanfIncomeLimits.singleParentQualified[size] ;
	}
	else if (!married & !shelterQualified) {
	    netIncomeLimit = tanfIncomeLimits.singleParentDisqualified[size] ;
	}
    }

    let earnedIncomeDeduction ;
    if (married) {
	earnedIncomeDeduction = tanfIncomeLimits.marriedCoupleEarnedIncomeDisregard ;
    }
    else {
	earnedIncomeDeduction = tanfIncomeLimits.singleParentEarnedIncomeDisregard ;
    }
    
    const netIncome = earnedIncome + otherIncome - earnedIncomeDeduction ;
    const netIncomeString = netIncome.toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const netIncomeLimitString = netIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if (netIncome > netIncomeLimit) {
	qualifiedTANF = false ;
	reasonList.push("Your total monthly income of " + netIncomeString + " per month exceeds the limit of " + netIncomeLimitString + " for your household size and composition.")
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
    const tanfLink = "https://dfs.wyo.gov/assistance-programs/cash-assistance/" ;
    if (dataForm.onTANF) {
	description = "Already participating" ;
	return (
	    <ResultsCard qualified={2} reasons={''} program={"POWER / TANF"} icon={tanfIcon} description={description} link={''}/>
	)
    }
    else if (oversize) {
	description = "Eligibility unclear" ;
	const oversizeExplanation = [<p style={{fontSize: ".9rem"}}>Wyoming only publicly lists POWER / TANF income limits for households up to 10 people. <a href={tanfLink} target="_blank" rel="noopener noreferrer">Contact</a> the Wyoming Department of Family Services to see if anyone in your household qualifies.</p>]
	return (
	    <ResultsCard qualified={-1} program={"POWER / TANF"} reasons={<Reasons reasonList={oversizeExplanation}/>} icon={tanfIcon} description={description} link={tanfLink}/>
	)
    }
    else if (qualifiedTANF) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"POWER / TANF"} icon={tanfIcon} description={description} link={tanfLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={tanfLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"POWER / TANF"} reasons={<Reasons reasonList={reasonList}/>} icon={tanfIcon} description={description} link={tanfLink}/>
	)
    }
}

function ChildcareEligibility({dataForm}) {
    const size = Number(dataForm.size) ;
    const resident = dataForm.resident ; 
    const citizen = dataForm.citizen ; 

    const child5to18 = dataForm.child5to18 ;
    const childUnder5 = dataForm.childUnder5 ;

    const earnedIncome = Number(dataForm.earnedIncome.replace(/,/g,"")) ;
    const otherIncome = Number(dataForm.otherIncome.replace(/,/g,"")) ;

    // tests
    let qualifiedChildcare = true ;
    const reasonList = [] ;

    // resident/citizen
    if (!dataForm.resident) {
	qualifiedChildcare = false ;
	reasonList.push("Your household must reside in Wyoming.")
    }
    if (!dataForm.citizen) {
	qualifiedChildcare = false ;
	reasonList.push("At least one household member must be a U.S. citizen or qualified immigrant.")
    }

    // has kids
    if (!(child5to18 || childUnder5)) {
	qualifiedChildcare = false ; 
	reasonList.push('You indicated that your household doesn\'t include children.') ; 
    }

    // size limit
    let grossIncomeLimit
    let oversize = false ;

    if (size > 8) {
	oversize = true ;
	grossIncomeLimit = 0 ;
    }
    else {
	grossIncomeLimit = childcareIncomeLimits.maxGross[size] ;
    }

    // income

    const grossIncomeString = (earnedIncome + otherIncome).toLocaleString("en-US", {style:"currency", currency:"USD"}) ;
    const grossIncomeLimitString = grossIncomeLimit.toLocaleString("en-US", {style:"currency", currency:"USD"}) ; 

    if (earnedIncome + otherIncome > grossIncomeLimit) {
	qualifiedChildcare = false ;
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
    const childcareLink = "https://health.wyo.gov/publichealth/childcare/" ;
    let description ;
    if (!(childUnder5 || child5to18)) {
	description = "Likely not eligible" ;
	reasonList.push(<a href={childcareLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"Childcare Assistance"} reasons={<Reasons reasonList={reasonList}/>} icon={childcareIcon} description={description} link={childcareLink}/>
	)
    }
    else if (oversize) {
	description = "Eligibility unclear" ;
	const oversizeExplanation = [<p style={{fontSize: ".9rem"}}>Wyoming only publicly lists childcare assistance income limits for households up to 8 people. <a href={childcareLink} target="_blank" rel="noopener noreferrer">Contact</a> the Wyoming Department of Family Services to see if anyone in your household qualifies.</p>]
	return (
	    <ResultsCard qualified={-1} program={"Childcare Assistance"} reasons={<Reasons reasonList={oversizeExplanation}/>} icon={childcareIcon} description={description} link={childcareLink}/>
	)
    }
    else if (qualifiedChildcare) {
	description = "Likely eligible" ;
	return (
	    <ResultsCard qualified={1} reasons={''} program={"Childcare Assistance"} icon={childcareIcon} description={description} link={childcareLink}/>
	)
    }
    else {
	description = "Likely not eligible" ;
	reasonList.push(<a href={childcareLink} className="cta-button" target="_blank" rel="noopener noreferrer">Learn More</a>) ;
	return (
	    <ResultsCard qualified={0} program={"Childcare Assistance"} reasons={<Reasons reasonList={reasonList}/>} icon={childcareIcon} description={description} link={childcareLink}/>
	)
    }
}

export default function Results({onBack,dataForm}) {
    return (
	<div className="form-page">
	    <h1>Your Eligibility Results</h1>
	    <p>Based on the information you provided, here is a summary of benefits you may be eligible to receive. This is an estimate, not a guarantee of benefits.</p>
	    <div className="results-grid">
		<SnapEligibility dataForm={dataForm}/>
		<WicEligibility dataForm={dataForm}/>
		<LiheapEligibility dataForm={dataForm}/>
		<MedicaidEligibility dataForm={dataForm}/>
		<TanfEligibility dataForm={dataForm}/>
		<ChildcareEligibility dataForm={dataForm}/>
	    </div>
	    <div className="nav-buttons">
		<button onClick={onBack} className="back-button">Go Back & Edit</button>
	    </div>
	</div>
    )
}
