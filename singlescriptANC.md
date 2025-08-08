let data = {{data}};
let {extraDetails, onSelectAction, ORelationOfApplicantWithBeneficiary ,ORadioAddressAfterMarriedWomen,
OEducationDetailInformationTodelete,OeducationDetailsToDelete, OGender ,OTalukaAfterMarriedWomen ,
OBirthDistrict, ODistrictAfterMarriedWomen , OFilloutDistrict , OBirthTaluka , OInstituteDetails,
OUnivercityBoardOEducation, OAdmisionYear, OCompletionYear, OEducationDetailsOfBeneficiary , OBirthAddressAsAbove,
OAddressBeforeMerriage, OBenefPreAddressRadio ,OUnivercityBoard ,OFilloutTaluka, OSalutation,
OIsBeneficiaryAmarriedwomanRadioCheckFirst,OMariedWomanMiddleName,OIsMarriedWoman, VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst,
OYearsOfResidenceAtCurrentAddress,ODateOfBirth,OFullNameEnglish} = data;

let translation = {{TRANSLATIONS}};
let selectedLanguage = {{selectedLanguage}};
let HTTPResponse = {{HTTPResponse}};
let version = {{version}};

// let { OGender,OIsBeneficiaryAmarriedwomanRadioCheckFirst,OSalutation,OInstituteDetails,OUnivercityBoard , OCompletionYear, OAdmisionYear, OUnivercityBoardOEducation, OEducationDetailsOfBeneficiary } = {{data}}

function tryParse(payload, parsenumber, lineNumber) {
try {
return JSON.parse(payload);
} catch (error) {
logger.info(`Unable to parse given payload, ${parsenumber}`, lineNumber);
throw new Error(`Unable to parse given payload, ${parsenumber}`);
}
}

let parsedExtraDetails = tryParse(extraDetails, "extraDetails", "global");
let { locale, addDetailsArray, permanentAddress } = parsedExtraDetails;
// let language = locale;
const language = selectedLanguage;

// Handle http request payload here
if (HTTPResponse && !HTTPResponse.data && HTTPResponse.status !== 200) {
throw new Error('ERR:3100 Unable to get from API');
}

let payloadToEncrypt = null;

logger.info("I want to print the entire data", data);
switch (onSelectAction) {
case 'years-residence': {
// handle years-residence logic
// let HTTPResponse = {{HTTPResponse}}.data

    	// id: JSON.stringify({"Value":item.Value,"Name":item.Name}),//String(item.Value),
    	const _OYearsOfResidenceAtCurrentAddress = JSON.parse(OYearsOfResidenceAtCurrentAddress).Name;
    	const yearMapingWithYRC = parsedExtraDetails.ODateOfBirth.split("-")[0];
    	if (yearMapingWithYRC > _OYearsOfResidenceAtCurrentAddress) {
    		throw new Error("Applicant residing on present address should be greater than applicant's date of birth.");
    	}
    	let httpBenificaryRelation = HTTPResponse.data;
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	httpBenificaryRelation.shift();
    	let benificaryRelationArray = httpBenificaryRelation
    		.map(item => ({
    			id: JSON.stringify({ "Value": item.Value, "Name": item.Name }),//String(item.Value),
    			title: String(item.Name)
    		}));


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibiltyApplicantResidingInMaharahtra": true,
    			"VisibilityRelationOfApplicantWithBenefic": true,
    			"VisibilityBeneficiarySalutation": false,
    			"VisibilityHeadingEducationDetailsOfBenef": false,
    			"VisibilityBirthDetailHeading": false,
    			"VisibilityBirthAddressAsAbove": false,
    			"ListRelationOfApplicantWithBeneficiary": benificaryRelationArray,
    			"VisibilityBenefPreAddress": false,
    			"VisibilityBenefPreAddressRadio": false,
    			"VisibilityBeneficiaryFullName": false,
    			"VisibilityBenificaryDateofBirth": false,
    			"VisibilityBeneficiaryMobileNumber": false,


    			"extraDetails": JSON.stringify({ ...parsedExtraDetails, "addDetailsArray": [], "addMigrations": [] }),

    			//--------------------------------------
    			// This is getting handled by basic details
    			"VisibilityHeadingPreAddress": false,
    			"VisibilityPreAddressAsAbove": false,
    			"VisibilityApplicantPreAddress": false,
    			"VisibilityPreAddress": false,
    			"VisibilityPreBuildingAddress": false,
    			"VisibilityPreSection": false,
    			"VisibilityPreStreet": false,
    			"VisibilityPreLandmark": false,
    			"VisibilityPreDistrict": false,
    			"VisibilityPreTaluka": false,
    			"VisibilityPreVillage": false,
    			"VisibilityPrePincode": false,
    		}
    	}
    	break;
    }

    case 'relation': {

    	let parsedRelationOfApplicantWithBeneficiary = tryParse(ORelationOfApplicantWithBeneficiary, "ORelationOfApplicantWithBeneficiary", 'case_relation');
    	let _ORelationOfApplicantWithBeneficiary = parsedRelationOfApplicantWithBeneficiary.Name;

    	// let httpBenefPreAddressYesNo = HTTPResponse.data;

    	let httpBenefPreAddressYesNoArray = []

    	selectedLanguage = language;
    	if (selectedLanguage === "1") {
    		httpBenefPreAddressYesNoArray = [{id:"No",title:"No"},{id:"Yes",title:"Yes"}]
    	} else {
    		httpBenefPreAddressYesNoArray = [{id:"नाही",title:"नाही"},{id:"हो",title:"हो"}]
    	}


    	// handle relation logic
    	// let translation = {{TRANSLATIONS}}
    	// let { ORelationOfApplicantWithBeneficiary} = {{data}}

    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { extraDetails } = parsedExtraDetails
    	// let  language = parsedExtraDetails.locale;


    	// id: JSON.stringify("Value":item.Value,"Name":item.Name),//String(item.Value),
    	// ORelationOfApplicantWithBeneficiary

    	// let HTTPResponse = {{HTTPResponse}}.data
    	selectedLanguage = language;

    	let httpBenificarySalutation = HTTPResponse.data;
    	httpBenificarySalutation.shift();
    	let benificarySalutationArray = httpBenificarySalutation
    		.map(item => ({
    			id: String(item.Value),
    			title: String(item.Name)
    		}));

    	// ---नि, "आई", "आजी", "आजोबा", "काका", "काकी", "दिर", "नात", "नातू", "पुतण्या", "पुतणी", "पत्नी",
    	//  "पती", "बहिण", "भाऊ  ", "मुलगा", "मुलगी", "वडील ", "वहिणी", "सून", "स्वतः", "सासू", "सासरे"
    	// , "---S, "Brother", "Daughter", "Father", "Grand , "Grand Daughter , "Husband", "Mother", "Nephew",
    	// "Niece", "Self", "Sister", "Son", "Wife"

    	// ORelationOfApplicantWithBeneficiary //OBeneficiarySalutation
    	// EnabilityBeneficiarySalutation
    	// EnabilityBeneficiaryFullName
    	// EnabledBenificaryDateofBirth
    	// EnabilityBeneficiaryMobileNumber

    	// const ListBenificiaryRelations = {
    	// 	1: [
    	// 		{
    	// 			id: 1,
    	// 			title: "Hello"
    	// 		}
    	// 	],
    	// 	2: [
    	// 		{
    	// 			id: 1,
    	// 			title: "Heloooooo"
    	// 		}
    	// 	]
    	// }




    	if (
    		_ORelationOfApplicantWithBeneficiary === "Brother" ||
    		_ORelationOfApplicantWithBeneficiary === "भाऊ  " ||
    		_ORelationOfApplicantWithBeneficiary === "Daughter" ||
    		_ORelationOfApplicantWithBeneficiary === "मुलगी" ||
    		_ORelationOfApplicantWithBeneficiary === "Grand Daughter" ||
    		_ORelationOfApplicantWithBeneficiary === "नात" ||
    		_ORelationOfApplicantWithBeneficiary === "Grand Son" ||
    		_ORelationOfApplicantWithBeneficiary === "Husband" ||
    		_ORelationOfApplicantWithBeneficiary === "Mother" ||
    		_ORelationOfApplicantWithBeneficiary === "Nephew" ||
    		_ORelationOfApplicantWithBeneficiary === "Niece" ||
    		_ORelationOfApplicantWithBeneficiary === "Sister" ||
    		_ORelationOfApplicantWithBeneficiary === "Son" ||
    		_ORelationOfApplicantWithBeneficiary === "Wife" ||
    		_ORelationOfApplicantWithBeneficiary === "आई" ||
    		_ORelationOfApplicantWithBeneficiary === "आजी" ||
    		_ORelationOfApplicantWithBeneficiary === "आजोबा" ||
    		_ORelationOfApplicantWithBeneficiary === "काका" ||
    		_ORelationOfApplicantWithBeneficiary === "काकी" ||
    		_ORelationOfApplicantWithBeneficiary === "दिर" ||
    		_ORelationOfApplicantWithBeneficiary === "नातू" ||
    		_ORelationOfApplicantWithBeneficiary === "पुतण्या" ||
    		_ORelationOfApplicantWithBeneficiary === "पुतणी" ||
    		_ORelationOfApplicantWithBeneficiary === "पत्नी" ||
    		_ORelationOfApplicantWithBeneficiary === "पती" ||
    		_ORelationOfApplicantWithBeneficiary === "बहिण" ||
    		_ORelationOfApplicantWithBeneficiary === "मुलगा" ||
    		_ORelationOfApplicantWithBeneficiary === "वहिणी" ||
    		_ORelationOfApplicantWithBeneficiary === "सून" ||
    		_ORelationOfApplicantWithBeneficiary === "सासू" ||
    		_ORelationOfApplicantWithBeneficiary === "सासरे"
    	) {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBeneficiarySalutation": true,
    				"VisibilityBirthDetailHeading": false,
    				"VisibilityBirthAddressAsAbove": false,
    				"ListBeneficiarySalutation": benificarySalutationArray,
    				"LabelBenificaryDateofBirth": translation.SCREEN_BENEFICIARY.LabelBenificaryDateofBirth[language],
    				"EnabilityBeneficiarySalutation": true,
    				"EnabilityBeneficiaryFullName": false,
    				"EnabledBenificaryDateofBirth": true,
    				"EnabilityBeneficiaryMobileNumber": true,
    				"VisibilityBeneficiaryFullName": false,
    				"VisibilityBenificaryDateofBirth": false,
    				"VisibilityBeneficiaryMobileNumber": false,
    				"VisibilityBenefPreAddressRadio":false,
    				"VisibilityBenefPreAddress":false,
    				"VisibilityEducationDetailsOfBeneficiary":false,
    				"initFullNameOfBeneficiary": "",

    				"VisibilityBirthAddress":false,
    				"VisibilityBirthStreet":false,
    				"VisibilityBirthSection":false,
    				"VisiblityBirthBuilding":false,
    				"VisibilityBirthState":false,
    				"VisibilityBirthDistrict":false,
    				"VisibilityBirthTaluka":false,
    				"VisibilityBirthVillage":false,
    				"VisibilityBirthPincode":false,


    			}
    		}
    	} else if (_ORelationOfApplicantWithBeneficiary === "वडील " || _ORelationOfApplicantWithBeneficiary === "Father") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBeneficiarySalutation": true,
    				"VisibilityBirthDetailHeading": false,
    				"VisibilityBirthAddressAsAbove": false,
    				// "ListBeneficiarySalutation": benificarySalutationArray,
    				"LabelBenificaryDateofBirth": translation.SCREEN_BENEFICIARY.LabelBenificaryDateofBirth[language],
    				"EnabilityBeneficiarySalutation": false,
    				"EnabilityBeneficiaryFullName": false,
    				"EnabledBenificaryDateofBirth": false,
    				"EnabilityBeneficiaryMobileNumber": true,
    				"VisibilityBeneficiaryFullName": true,
    				"VisibilityBenificaryDateofBirth": true,
    				"VisibilityBeneficiaryMobileNumber": true,
    				"VisibilityBenefPreAddressRadio":true,
    				"ListBenefPreAddressRadio":httpBenefPreAddressYesNoArray,
    				"LabelBenefPreAddressRadio":selectedLanguage == "1"? "Present Address as above?" :"वर्तमान पत्ता वरीलप्रमाणे?",
    				"LabelBenefPreAddress": selectedLanguage == "1"? "Present Address": "वर्तमान पत्ता",
    				"VisibilityBenefPreAddress":true,
    				"VisibilityEducationDetailsOfBeneficiary":false,
    				// "VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst":true
    			}
    		}
    	} else if (_ORelationOfApplicantWithBeneficiary === "स्वतः" || _ORelationOfApplicantWithBeneficiary === "Self") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBeneficiarySalutation": true,
    				"VisibilityBirthDetailHeading": false,
    				"VisibilityBirthAddressAsAbove": false,
    				"ListBeneficiarySalutation": benificarySalutationArray,
    				"LabelBenificaryDateofBirth": translation.SCREEN_BENEFICIARY.LabelBenificaryDateofBirth[language],
    				"initBeneficiarySalutation": "heelo",
    				"EnabilityBeneficiarySalutation": true,
    				"EnabilityBeneficiaryFullName": false,
    				"EnabledBenificaryDateofBirth": false,
    				"EnabilityBeneficiaryMobileNumber": true,
    				"VisibilityBeneficiaryFullName": true,
    				"VisibilityBenificaryDateofBirth": false,
    				"VisibilityBeneficiaryMobileNumber": true,
    				"EnabilityBeneficiarySalutation": false,
    				"initFullNameOfBeneficiary": String(OFullNameEnglish),
    				"VisibilityBirthDetailHeading":true,
    				"VisibilityBirthAddressAsAbove":true,
    				"ListRadioBirthAddressAsAbove":httpBenefPreAddressYesNoArray,
    				"VisibilityEducationDetailsOfBeneficiary":false,
    				// "VisibilityEducationDetailsOfBeneficiary":false //It's same for the heading and dropdown
    				//need to add some init values like //Beneficiary Salutation// Mr. Beneficiary Full Name(done)

    			}
    		}
    	}

    	break;
    }

    case 'salutation': {
    	let httpBenefPreAddressYesNo = HTTPResponse.data;

    	// let HTTPResponse = {{HTTPResponse}}.data

    	let parsedRelationOfApplicantWithBeneficiary = tryParse(ORelationOfApplicantWithBeneficiary, "ORelationOfApplicantWithBeneficiary", 'case_salutation');
    	let _ORelationOfApplicantWithBeneficiarySalutation = parsedRelationOfApplicantWithBeneficiary.Name;

    	// handle salutation logic
    	// let translation = {{TRANSLATIONS}}

    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { extraDetails , locale } = parsedExtraDetails
    	// let  language = locale;

    	let httpBenefPreAddressYesNoArray = []

    	// selectedLanguage = language;
    	// if (selectedLanguage === "1") {
    	// 	httpBenefPreAddressYesNoArray = [
    	// 		{ id: JSON.stringify({ "Value": "FB879D81-0CA9-4B4F-98BB-1658A479B786", title: "No" }), title: "No" },
    	// 		{ id: JSON.stringify({ "Value": "A3DA50AA-64B4-4987-B26D-81C66E58F88D", title: "Yes" }), title: "Yes" }
    	// 	]
    	// } else {
    	// 	httpBenefPreAddressYesNoArray = httpBenefPreAddressYesNo
    	// 		.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    	// 		.map(item => ({
    	// 			id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    	// 			title: String(item.Name)
    	// 		}));
    	// }


    	//checking
    	selectedLanguage = language;

    		// httpBenefPreAddressYesNoArray = httpBenefPreAddressYesNo
    		// 	.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    		// 	.map(item => ({
    		// 		id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    		// 		title: String(item.Name)
    		// 	}));

    		if (selectedLanguage === "1") {
    			httpBenefPreAddressYesNoArray = [{ id: "No", title: "No" }, { id: "Yes", title: "Yes" }]
    		} else {
    			httpBenefPreAddressYesNoArray = [{ id: "नाही", title: "नाही" }, { id: "हो", title: "हो" }]
    		}





    	logger.info("hello check here", { "httpBenefPreAddressYesNoArray": httpBenefPreAddressYesNoArray, selectedLanguage })



    	// ---नि, "आई", "आजी", "आजोबा", "काका", "काकी", "दिर", "नात", "नातू", "पुतण्या", "पुतणी", "पत्नी",
    	//  "पती", "बहिण", "भाऊ  ", "मुलगा", "मुलगी", , "वहिणी", "सून", , "सासू", "सासरे"
    	// , "---S, "Brother", "Daughter", , "Grand Daughter" , "Grand Son" , "Husband", "Mother", "Nephew",
    	// "Niece", , "Sister", "Son", "Wife"

    	//"Father" //"Self" //"स्वतः" //...special conditions

    	// ORelationOfApplicantWithBeneficiary //OBeneficiarySalutation
    	// EnabilityBeneficiarySalutation
    	// EnabilityBeneficiaryFullName
    	// EnabledBenificaryDateofBirth
    	// EnabilityBeneficiaryMobileNumber


    	if (_ORelationOfApplicantWithBeneficiarySalutation === "Brother" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "भाऊ  " ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Kumari" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Daughter" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "मुलगी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Grand Daughter" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "नात" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Grand Son" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Husband" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Mother" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Nephew" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Niece" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Sister" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Son" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "Wife" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "आई" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "आजी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "आजोबा" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "काका" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "काकी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "दिर" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "नातू" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "पुतण्या" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "पुतणी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "पत्नी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "पती" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "बहिण" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "मुलगा" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "वहिणी" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "सून" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "सासू" ||
    		_ORelationOfApplicantWithBeneficiarySalutation === "सासरे"
    	) {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBirthDetailHeading": false,
    				"VisibilityBirthAddressAsAbove": false,
    				"LabelBenefPreAddress": translation.SCREEN_BENEFICIARY.LabelBenefPreAddress[language],//"Present Address(As Above?)",
    				// "ListRadioBirthAddressAsAbove": httpBenefPreAddressYesNoArray,
    				"LabelBenefPreAddressRadio": translation.SCREEN_BENEFICIARY.LabelBenefPreAddressRadio[language],//"Present Address as above?",
    				"ListBenefPreAddressRadio": httpBenefPreAddressYesNoArray,
    				"VisibilityBeneficiaryFullName": true,
    				"VisibilityHeadingPreAddress": false,
    				"VisibilityPreAddressAsAbove": false,
    				"VisibilityApplicantPreAddress": false,
    				"VisibilityPreAddress": false,
    				"VisibilityPreBuildingAddress": false,
    				"VisibilityPreSection": false,
    				"VisibilityPreStreet": false,
    				"VisibilityPreLandmark": false,
    				"VisibilityPreDistrict": false,
    				"VisibilityPreTaluka": false,
    				"VisibilityPreVillage": false,
    				"VisibilityPrePincode": false,
    				"VisibilityBeneficiaryMobileNumber": true,
    				"VisibilityBenificaryDateofBirth": true,
    				"LabelBenificaryDateofBirth": translation.SCREEN_BENEFICIARY.LabelBenificaryDateofBirth[language],
    				"EnabilityBeneficiarySalutation": true,
    				"EnabilityBeneficiaryFullName": true,
    				"EnabledBenificaryDateofBirth": true,
    				"EnabilityBeneficiaryMobileNumber": true,
    				"VisibilityBeneficiarySalutation": true,
    				"VisibilityBenefPreAddress": true,
    				"VisibilityBenefPreAddressRadio": true,
    				"initFullNameOfBeneficiary": "",
    				"VisibilityBirthAddress":false,
    				"VisibilityBirthStreet":false,
    				"VisibilityBirthSection":false,
    				"VisiblityBirthBuilding":false,
    				"VisibilityBirthState":false,
    				"VisibilityBirthDistrict":false,
    				"VisibilityBirthTaluka":false,
    				"VisibilityBirthVillage":false,
    				"VisibilityBirthPincode":false,



    			}
    		}
    	} else if (_ORelationOfApplicantWithBeneficiarySalutation === "स्वतः" || _ORelationOfApplicantWithBeneficiarySalutation === "Self") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBirthDetailHeading": true,
    				"VisibilityBirthAddressAsAbove": true,
    				"ListBenefPreAddressRadio": httpBenefPreAddressYesNoArray,
    				// "ListRadioBirthAddressAsAbove": httpBirthYesNoArray,
    				"VisibilityBeneficiaryFullName": true,
    				"VisibilityHeadingPreAddress": false,
    				"VisibilityPreAddressAsAbove": false,
    				"VisibilityApplicantPreAddress": false,
    				"VisibilityPreAddress": false,
    				"VisibilityPreBuildingAddress": false,
    				"VisibilityPreSection": false,
    				"VisibilityPreStreet": false,
    				"VisibilityPreLandmark": false,
    				"VisibilityPreDistrict": false,
    				"VisibilityPreTaluka": false,
    				"VisibilityPreVillage": false,
    				"VisibilityPrePincode": false,
    				"VisibilityBeneficiaryMobileNumber": true,
    				"VisibilityBenificaryDateofBirth": true,
    				"LabelBenificaryDateofBirth": translation.SCREEN_BENEFICIARY.LabelBenificaryDateofBirth[language],
    				"EnabilityBeneficiarySalutation": false,
    				"EnabilityBeneficiaryFullName": true,
    				"EnabledBenificaryDateofBirth": true,
    				"EnabilityBeneficiaryMobileNumber": true,
    				"VisibilityBeneficiarySalutation": true,


    			}
    		}
    	}
    	break;
    }

    case 'birth': {
    	// handle birth logic
    	// let translation = {{TRANSLATIONS}}

    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { extraDetails, locale } = parsedExtraDetails
    	// let  language = locale;

    	selectedLanguage = language;

    	let HTTPBenficiaryQualification = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data

    	// logger.info({"OBirthAddressAsAbove I want to find": OBirthAddressAsAbove})

    	if (!OBirthAddressAsAbove || OBirthAddressAsAbove === "") {
    		throw new Error("please Select an option")
    	}


    	let benficiaryQualificationArray = [];
    	selectedLanguage = language;

    	if (selectedLanguage === "1") {
    		benficiaryQualificationArray = [
    			{ id: JSON.stringify({ "Value": "FB879D81-0CA9-4B4F-98BB-1658A479B786", title: "No" }), title: "No" },
    			{ id: JSON.stringify({ "Value": "A3DA50AA-64B4-4987-B26D-81C66E58F88D", title: "Yes" }), title: "Yes" }
    		]
    	} else {
    		benficiaryQualificationArray = HTTPBenficiaryQualification
    			.filter(item => item.Name !== "---Select---" && item.Value !== null)
    			.map(item => ({
    				id: JSON.stringify({ "Value": item.Value, "item": item.Name }),//String(item.value),
    				title: String(item.Name)
    			}));
    	}


    	// let parsedBirthAddressAsAbove = tryParse(OBirthAddressAsAbove, "OBirthAddressAsAbove", 'case_birth');

    	// let _OBirthAddressAsAbove = parsedBirthAddressAsAbove.title;
    	let _OBirthAddressAsAbove = OBirthAddressAsAbove;


    	if (_OBirthAddressAsAbove == "Yes" || _OBirthAddressAsAbove == "हो") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBirthAddress": false,
    				"VisibilityBirthStreet": false,
    				"VisibilityBirthSection": false,
    				"VisiblityBirthBuilding": false,
    				"VisibilityBirthState": false,
    				"VisibilityBirthDistrict": false,
    				"VisibilityBirthTaluka": false,
    				"VisibilityBirthVillage": false,
    				"VisibilityBirthPincode": false,
    				"VisibilityUniversityBoard": false,
    				"VisibilityEducationDetailsOfBeneficiary": true,
    				"SwitchCurrentComponentToRender": "addRowComponent",
    				// "LabelEducationDetailsOfBeneficiary":translation.SCREEN_BENEFICIARY.LabelEducationDetailsOfBeneficiary[language],
    				"VisibilityEducationDetailsOfBeneficiary": true,
    				"LabelEducationDetailList": translation.SCREEN_BENEFICIARY.LabelEducationDetailList[language],//"Choose option to delete",
    				"VisibilityAddMoreEducationDetails": false,
    				"VisibleInstituteDetails": false,
    				"EnabilityFooterThirdScreen": false,
    				"ListEducationDetailsOfBeneficiary": benficiaryQualificationArray,
    				"VisibilityAdmisionYear": false,
    				"VisibilityCompletionYear": false,
    				"VisibilityAddSurveyEmbedded": false,
    			}
    		}
    	} else {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBirthAddress": true,
    				"VisibilityBirthStreet": true,
    				"VisibilityUniversityBoard": false,
    				"VisibilityBirthSection": true,
    				"VisiblityBirthBuilding": true,
    				"VisibilityBirthState": true,
    				"VisibilityBirthDistrict": false,
    				"VisibilityBirthTaluka": false,
    				"VisibilityBirthVillage": false,
    				"VisibilityBirthPincode": false,
    				"VisibilityEducationDetailsOfBeneficiary": false,
    				"VisibilityCheckBoxInformation": false,
    				"VisibilityAddMoreEducationDetails": false,
    				"VisibleInstituteDetails": false,
    				"EnabilityFooterThirdScreen": false,

    				"LabelBirthAddress": translation.SCREEN_BENEFICIARY.LabelBirthAddress[language], // "Birth Address"
    				"LabelBirthStreet": translation.SCREEN_BENEFICIARY.LabelBirthStreet[language], // "Birth Street"
    				"LabelBirthSection": translation.SCREEN_BENEFICIARY.LabelBirthSection[language], // "Section"
    				"LabelBirthBuilding": translation.SCREEN_BENEFICIARY.LabelBirthBuilding[language], // "Building"
    				"LabelBirthState": translation.SCREEN_BENEFICIARY.LabelBirthState[language], // "State"
    				"LabelBirthDistrict": translation.SCREEN_BENEFICIARY.LabelBirthDistrict[language], // "District"
    				"LabelBirthTaluka": translation.SCREEN_BENEFICIARY.LabelBirthTaluka[language], // "Taluka"
    				"LabelBirthVillage": translation.SCREEN_BENEFICIARY.LabelBirthVillage[language], // "Village"
    				"LabelBirthPincode": translation.SCREEN_BENEFICIARY.LabelBirthPincode[language], // "Pin code"
    				"LabelEducationDetailList": translation.SCREEN_BENEFICIARY.LabelEducationDetailList[language], // "Choose option to delete"
    				"ListEducationDetailsOfBeneficiary": benficiaryQualificationArray,
    				"VisibilityCompletionYear": false,
    				"VisibilityAddSurveyEmbedded": false,
    				"VisibilityAdmisionYear": false,
    				"VisibilityBirthDetailHeading":true,
    				// "HeadingBirthDetail":

    				"ListBirthState": selectedLanguage === "1" ? [{"id": "Maharashtra","title": "Maharashtra"}] : [{"id": "महाराष्ट्र","title": "महाराष्ट्र"}],

    				"ListBirthDistrict": [
    					{
    						"id": "district 1",
    						"title": "District 1"
    					},
    					{
    						"id": "District 2",
    						"title": "District 2"
    					},
    					{
    						"id": "District 3",
    						"title": "District 3"
    					}
    				],

    				"ListBirthTaluka": [
    					{
    						"id": "Birth Taluka 1",
    						"title": "Birth Taluka 1"
    					},
    					{
    						"id": "Birth Taluka 2",
    						"title": "Birth Taluka 2"
    					}
    				],

    				"ListBirthVillage": [
    					{
    						"id": "Birth Village 1",
    						"title": "Birth Village 1"
    					},
    					{
    						"id": "Birth Village 2",
    						"title": "Birth Village 2"
    					}
    				]
    			}
    		}
    	}

    	break;
    }

    case 'birth-state': {
    	// handle birth-state logic
    	let hTTPBirthDistrict = HTTPResponse.data
    	// let HTTPResponse = {{HTTPResponse}}.data


    	let birthDistrictArray = hTTPBirthDistrict
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "districtCode": String(item.Districtcode), "Statecode": String(item.Statecode), "Langid": String(item.Langid) }),
    			title: String(item.Districtname)
    		}));



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityBirthDistrict": true,
    			"VisibleInstituteDetails": false,
    			"VisibilityEducationDetailsOfBeneficiary": false,
    			"VisibilityCompletionYear": false,
    			"VisibilityAddSurveyEmbedded": false,
    			"VisibilityAdmisionYear": false,
    			"VisivilityUnivercityBoard": false,
    			"ListBirthDistrict": birthDistrictArray,


    			"VisibilityBirthTaluka": false,
    			"VisibilityBirthVillage": false,
    			"VisibilityBirthPincode": false,



    		}
    	}

    	break;
    }

    case 'birth-district': {
    	// handle birth-district logic
    	let hTTPBirthTaluka = HTTPResponse.data;

    	let birthTalukaArray = hTTPBirthTaluka
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "SubDistrictcode": String(item.SubDistrictcode), "DistrictCode": String(item.DistrictCode), "SubDistrictname": String(item.SubDistrictname) }),
    			title: String(item.SubDistrictname)
    		}));



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityBirthTaluka": true,
    			"VisibilityBirthVillage": false,
    			"VisibilityBirthPincode": false,
    			"VisibilityEducationDetailsOfBeneficiary": false,
    			"ListBirthTaluka": birthTalukaArray

    		}
    	}

    	break;
    }

    case 'birth-taluka': {
    	// handle birth-taluka logic
    	let HTTPBirthVillage = HTTPResponse.data

    	let birthVillageArray = HTTPBirthVillage
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Subdistrictcode": item.Subdistrictcode, "Villagecode": item.Villagecode, "Villagename": item.Villagename }),
    			title: String(item.Villagename)
    		}));



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityBirthVillage": true,
    			"VisibilityEducationDetailsOfBeneficiary": false,
    			"VisibilityBirthPincode": false,
    			"ListBirthVillage": birthVillageArray
    		}
    	}

    	break;
    }

    case 'birth-village': {
    	// handle birth-village logic
    	// let translation = {{TRANSLATIONS}}

    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { extraDetails, locale } = parsedExtraDetails
    	// let language = String(locale);

    	selectedLanguage = String(language);

    	// let HTTPResponse = {{HTTPResponse}}.data
    	let HTTPBenficiaryQualificationBirth = HTTPResponse.data;



    	let benficiaryQualificationBirthArray = HTTPBenficiaryQualificationBirth
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Value": item.Value, "item": item.Name }),
    			title: String(item.Name)
    		}));

    	// "OEducationDetailsOfBeneficiary": "{\"Value\":\"C0DCA2A2-7E55-4F4E-93C4-713290DDA0BE\",\"item\":\"undefined\"}",



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityBirthPincode": true,
    			"SwitchCurrentComponentToRender": "addRowComponent",
    			"VisibilityAddSurveyEmbedded": false,
    			"LabelAddSurveyEmbedded": translation.SCREEN_BENEFICIARY.HeadingEducationDetailsOfBeneficiary[language],//"Ad Education Details",
    			"VisibilityCompletionYear": false,
    			"HeadingEducationDetailsOfBeneficiary": translation.SCREEN_BENEFICIARY.HeadingEducationDetailsOfBeneficiary[language],//"Choose option to delete",
    			"VisibilityHeadingEducationDetailsOfBenef": true,
    			"VisibilityEducationDetailsOfBeneficiary": true,
    			"VisibilityEducationDetailsOfBeneficiary": true,
    			"ListEducationDetailsOfBeneficiary": benficiaryQualificationBirthArray
    		}
    	}

    	break;
    }

    case 'e-d-b': {
    	// handle e-d-b logic
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	// let translation = {{TRANSLATIONS}}
    	selectedLanguage = language;
    	// let { OEducationDetailsOfBeneficiary } =  {{data}}
    	// let HTTPResponse = {{HTTPResponse}}.data

    	let HTTPInstituteName = HTTPResponse.data;

    	const parsedEducationDetailsOfBeneficiary = tryParse(OEducationDetailsOfBeneficiary, "OEducationDetailsOfBeneficiary", 'case_e-d-b');
    	let _OEducationDetailsOfBeneficiary = parsedEducationDetailsOfBeneficiary.item;

    	let _OBirthAddressAsAbove = OBirthAddressAsAbove;
    	let birthAddress = true
    	if (_OBirthAddressAsAbove == "Yes" || _OBirthAddressAsAbove == "हो") {
    		birthAddress = false
    	}


    	let instituteNameArray = HTTPInstituteName
    		.map(item => ({
    			id: JSON.stringify({"Name":item.Name,"Value":item.Value}),
    			title: String(item.Name)
    		}));




    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityUniversityBoard":(_OEducationDetailsOfBeneficiary === "Illiterate" || _OEducationDetailsOfBeneficiary === "निरक्षर") ? false : true,
    			"VisibilityAddSurveyEmbedded":(_OEducationDetailsOfBeneficiary === "Illiterate" || _OEducationDetailsOfBeneficiary === "निरक्षर") ? true : false,
    			"VisibilityCompletionYear": false,
    			"VisibilityAdmisionYear": false,
    			"EnabilityFooterThirdScreen": false,
    			"VisibleInstituteDetails":false,
    			// "VisibilityAddSurveyEmbedded": false,
    			"ListUnivercityBoard": instituteNameArray,
    			"LabelUnivercityBoard": translation.SCREEN_BENEFICIARY.LabelUnivercityBoard[language],
    			// "extraDetails": JSON.stringify({...parsedExtraDetails,"addDetailsArray":[],"addMigrations":[]})
    			"extraDetails": JSON.stringify({ ...parsedExtraDetails, "addMigrations": [] }),
    			"VisibilityAddMoreEducationDetails":false,
    			"VisibilityCheckBoxInformation":false,

    			"VisibilityBirthAddress": birthAddress,
    			"VisibilityBirthStreet": birthAddress,
    			"VisibilityBirthSection": birthAddress,
    			"VisiblityBirthBuilding": birthAddress,
    			"VisibilityBirthState": birthAddress,
    			"VisibilityBirthDistrict": birthAddress,
    			"VisibilityBirthTaluka": birthAddress,
    			"VisibilityBirthVillage": birthAddress,
    			"VisibilityBirthPincode": birthAddress,

    		}
    	}
    	break;
    }

    case 'university': {
    	// handle university logic
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	// let translation = {{TRANSLATIONS}}
    	selectedLanguage = language;

    	let _OBirthAddressAsAbove = OBirthAddressAsAbove;
    	let birthAddress = true
    	if (_OBirthAddressAsAbove == "Yes" || _OBirthAddressAsAbove == "हो" || _OBirthAddressAsAbove == "") {
    		birthAddress = false
    	}

    	// let HTTPResponse = {{HTTPResponse}}.data
    	let HTTPAdmissionYear = HTTPResponse.data;

    	let admissionYearArray = HTTPAdmissionYear
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: String(item.Name),
    			title: String(item.Name)
    		}));







    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibleInstituteDetails": false,
    			"VisibilityAddSurveyEmbedded": false,
    			"VisibilityCompletionYear": false,
    			"VisibilityAdmisionYear": true,
    			"EnabilityFooterThirdScreen": false,
    			"VisibilityCheckBoxInformation":false,
    			"ListAdmisionYear": admissionYearArray,
    			"LabelAdmisionYear": translation.SCREEN_BENEFICIARY.LabelAdmisionYear[language],

    			"VisibilityBirthAddress": birthAddress,
    			"VisibilityBirthStreet": birthAddress,
    			"VisibilityBirthSection": birthAddress,
    			"VisiblityBirthBuilding": birthAddress,
    			"VisibilityBirthState": birthAddress,
    			"VisibilityBirthDistrict": birthAddress,
    			"VisibilityBirthTaluka": birthAddress,
    			"VisibilityBirthVillage": birthAddress,
    			"VisibilityBirthPincode": birthAddress




    		}
    	}
    	break;
    }

    case 'admission-year': {
    	// handle admission-year logic
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	// let translation = {{TRANSLATIONS}}
    	selectedLanguage = language;


    	// let HTTPResponse = {{HTTPResponse}}.data
    	let HTTPCompletionYear = HTTPResponse.data;

    	let _OBirthAddressAsAbove = OBirthAddressAsAbove;
    	let birthAddress = true
    	if (_OBirthAddressAsAbove == "Yes" || _OBirthAddressAsAbove == "हो") {
    		birthAddress = false
    	}

    	let completionYearArray = HTTPCompletionYear
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: String(item.Name),
    			title: String(item.Name)
    		}));



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibleInstituteDetails": false,
    			"VisibilityCompletionYear": true,
    			// "LabelInstituteDetails": translation.SCREEN_BENEFICIARY.LabelInstituteDetails[language],
    			// "LabelCompletionYear": translation.SCREEN_BENEFICIARY.LabelCompletionYear[language],
    			"ListCompletionYear": completionYearArray,
    			"ListIsBeneficiaryAmarriedwomanRadioCheckFirst": language === "1" ? [{ "id": "Yes", "title": "Yes" }, { "id": "No", "title": "No" }] : [{ "id": "होय", "title": "होय" }, { "id": "नाही", "title": "नाही" }],
    			"VisibilityAddSurveyEmbedded": false,
    			"EnabilityFooterThirdScreen": false,
    			"VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst": false,

    			"VisibilityBirthAddress": birthAddress,
    			"VisibilityBirthStreet": birthAddress,
    			"VisibilityBirthSection": birthAddress,
    			"VisiblityBirthBuilding": birthAddress,
    			"VisibilityBirthState": birthAddress,
    			"VisibilityBirthDistrict": birthAddress,
    			"VisibilityBirthTaluka": birthAddress,
    			"VisibilityBirthVillage": birthAddress,
    			"VisibilityBirthPincode": birthAddress,
    		}
    	}

    	break;
    }

    case 'completion-year': {
    	// let extraDetails = {{data.extraDetails}}
    	// let parsedExtraDetails = JSON.parse(extraDetails)


    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { extraDetails ,locale } = parsedExtraDetails
    	// let  language = locale;
    	// let translation = {{TRANSLATIONS}}

    	let _OBirthAddressAsAbove = OBirthAddressAsAbove;
    	let birthAddress = true
    	if (_OBirthAddressAsAbove == "Yes" || _OBirthAddressAsAbove == "हो") {
    		birthAddress = false
    	}



    	selectedLanguage = language;
    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibleInstituteDetails": true,
    			"LabelInstituteDetails": translation.SCREEN_BENEFICIARY.LabelInstituteDetails[language],
    			"LabelAddSurveyEmbedded": translation.SCREEN_BENEFICIARY.LabelAddSurveyEmbedded[language],
    			"VisibilityAddSurveyEmbedded": true,
    			"EnabilityFooterThirdScreen": false,
    			"ListIsBeneficiaryAmarriedwomanRadioCheckFirst": language === "1" ? [{ "id": "Yes", "title": "Yes" }, { "id": "No", "title": "No" }] : [{ "id": "होय", "title": "होय" }, { "id": "नाही", "title": "नाही" }],
    			// "extraDetails": JSON.stringify({...parsedExtraDetails,"addDetailsArray":[],"addMigrations":[]})
    			"extraDetails": JSON.stringify({ ...parsedExtraDetails, "addMigrations": [] }),

    			"VisibilityBirthAddress": birthAddress,
    			"VisibilityBirthStreet": birthAddress,
    			"VisibilityBirthSection": birthAddress,
    			"VisiblityBirthBuilding": birthAddress,
    			"VisibilityBirthState": birthAddress,
    			"VisibilityBirthDistrict": birthAddress,
    			"VisibilityBirthTaluka": birthAddress,
    			"VisibilityBirthVillage": birthAddress,
    			"VisibilityBirthPincode": birthAddress,
    		}
    	}
    	break;
    }

    case 'add-detail': {
    	// let { OGender, OSalutation,OInstituteDetails,OUnivercityBoard , OCompletionYear, OAdmisionYear, OUnivercityBoardOEducation, OEducationDetailsOfBeneficiary } = {{data}}
    	let row = { OGender, OInstituteDetails, OCompletionYear, OAdmisionYear, OUnivercityBoardOEducation, OEducationDetailsOfBeneficiary };

    	const parsedEducationDetailsOfBeneficiary = tryParse(OEducationDetailsOfBeneficiary, "OEducationDetailsOfBeneficiary", 'case_add_detail_1');
    	let _OEducationDetailsOfBeneficiary = parsedEducationDetailsOfBeneficiary.item;
    	let _OEducationDetailsOfBeneficiaryValue = parsedEducationDetailsOfBeneficiary.Value;
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale, addDetailsArray } = parsedExtraDetails
    	// let  language = locale;
    	// let translation = {{TRANSLATIONS}}
    	selectedLanguage = language;

    	// "OGender": "{\"Name\":\"M\",\"Value\":\"3D771B42-24FF-445E-B49F-5EF7ED2B5C85\"}",
    	// let extraDetails = {{data.extraDetails}}
    	// let parsedExtraDetails = JSON.parse(extraDetails);

    	// let { addDetailsArray } = parsedExtraDetails;

    	let surveyList = (addDetailsArray && Array.isArray(addDetailsArray) && addDetailsArray.length > 0) ? [...addDetailsArray] : [];

    	let uniqueNumber = Number(`${Date.now()}${Math.floor(Math.random() * 1000000)}`);

    	let _OSalutation = tryParse(OSalutation, "OSalutation", 'case_add-detail_2');
    	let checkSalutation = String(_OSalutation.Name);

    	let _OUnivercityBoard = tryParse(OUnivercityBoard, "OUnivercityBoard", 'case_add-detail_2');

    	let womanFirstCheck = false
    	let parsedOGender = tryParse(OGender, "OGender", 'case_add-detail_3');
    	let _OGender = parsedOGender.Name;
    	if (
    		checkSalutation === "कुमारी" ||
    		checkSalutation === "श्रीमती" ||
    		checkSalutation === "सौ" ||
    		checkSalutation === "Kumari" ||
    		checkSalutation === "Mrs" ||
    		checkSalutation === "Ms" ||
    		checkSalutation === "Shrimati" ||
    		_OGender === "F" ||
    		_OGender === "स्त्री"

    	) {
    		womanFirstCheck = true;
    	}

    	// _OGender
    	// इंजि
    	// वकील
    	// सीए

    	// कुमार
    	// श्री

    	// कुमारी
    	// श्रीमती
    	// सौ


    	let discreptionForCheckBox;
    	if (_OEducationDetailsOfBeneficiary === "Illiterate" || _OEducationDetailsOfBeneficiary === "निरक्षर") {
    		discreptionForCheckBox = language === "1" ? `Educational information: ${_OEducationDetailsOfBeneficiary}` : `शैक्षणिक माहिती:  ${_OEducationDetailsOfBeneficiary}`;
    		surveyList.push({
    			"id": `${uniqueNumber}|${_OEducationDetailsOfBeneficiaryValue}`,
    			"title": language === "1" ? `Sr.No: ${addDetailsArray.length + 1}` : `अनुक्रमांक: ${addDetailsArray.length + 1}`,
    			"description": discreptionForCheckBox
    		})
    	} else {
    		discreptionForCheckBox = language === "1" ? `Educational information: ${_OEducationDetailsOfBeneficiary}\n Name of the organization: ${_OUnivercityBoard.Name}\n Entry Year: ${OAdmisionYear}\n Year of release: ${OCompletionYear} \n Educational place: ${OInstituteDetails}` : `शैक्षणिक माहिती: ${_OEducationDetailsOfBeneficiary}\n संस्थेचे नाव: ${_OUnivercityBoard.Name}\n प्रवेश वर्ष: ${OAdmisionYear}\n पूर्णता वर्ष: ${OCompletionYear} \n शैक्षणिक ठिकाण: ${OInstituteDetails}`;
    		surveyList.push({
    			"id": `${uniqueNumber}|${_OEducationDetailsOfBeneficiaryValue}`,
    			"title": language === "1" ? `Sr.No: ${addDetailsArray.length + 1}` : `अनुक्रमांक: ${addDetailsArray.length + 1}`,
    			"description": discreptionForCheckBox
    		})
    	}

    	extraDetails = JSON.stringify({ ...parsedExtraDetails, "addDetailsArray": surveyList })

    	// इंजि.
    	// कुमार
    	// कुमारी
    	// वकील
    	// श्री.
    	// श्रीमती
    	// सीए
    	// सौ


    	// logger.info({"checkSalutation":checkSalutation},"chech here")



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityCheckBoxInformation": true,
    			"ListOfTheCheckBoxes": surveyList,
    			"extraDetails": extraDetails,
    			"OInstituteDetails": "",
    			"OCompletionYear": "",
    			"OAdmisionYear": "",
    			"OUnivercityBoardOEducation": "",
    			"OEducationDetailsOfBeneficiary": "",
    			"VisibilityAddMoreEducationDetails": true,
    			"SwitchCurrentComponentToRender": "",
    			// "ListIsBeneficiaryAmarriedwomanRadioCheckFirst": language === "1" ? [{ "id": "Yes", "title": "Yes" }, { "id": "No", "title": "No" }] : [{ "id": "हो", "title": "हो" }, { "id": "नाही", "title": "नाही" }],
    			"ListIsBeneficiaryAmarriedwomanRadioCheckFirst": language === "1" ? [{ "id": "Yes", "title": "Yes" }] : [{ "id": "हो", "title": "हो" }],

    			// "VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst":true,
    			"LabelIsBeneficiaryAmarriedwomanRadioCheckFirst": translation.SCREEN_BENEFICIARY.LabelIsBeneficiaryAmarriedwomanRadioCheckFirst[language],//"Is Beneficiary a married woman? (Yes/No)",
    			"VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst": womanFirstCheck,
    			// "LabelFoWomanAboveAddressBody":permanentAddress,
    			"LabelEducationDetailList": translation.SCREEN_BENEFICIARY.LabelEducationDetailList[language],
    			"EnabilityFooterThirdScreen": (addDetailsArray.length > 0) && !womanFirstCheck,//delete later
    			// "EnabilityFooterThirdScreen": (addDetailsArray.length > 0),

    		}
    	}

    	break;
    }

    case 'add-more-survey': {
    	// let extraDetails = {{data.extraDetails}}
    	// let parsedExtraDetails = JSON.parse(extraDetails);


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityCheckBoxInformation": true,
    			// "ListOfTheCheckBoxes": surveyList,
    			// "extraDetails": extraDetails,
    			"OInstituteDetails": "",
    			"OCompletionYear": "",
    			"OAdmisionYear": "",
    			"OUnivercityBoardOEducation": "",
    			"OEducationDetailsOfBeneficiary": "",
    			"VisibilityAddMoreEducationDetails": true,
    			"SwitchCurrentComponentToRender": "addRowComponent",
    			"VisibilityAddMoreEducationDetails": false,


    		}
    	}
    	break;
    }

    case 'delete': {
    	// let {OEducationDetailInformationTodelete,OeducationDetailsToDelete, OInstituteDetails } = {{data}};

    	// let extraDetails = {{data.extraDetails}}

    	// let parsedExtraDetails = extraDetails ? JSON.parse(extraDetails) : {};

    	// let addDetailsArray = parsedExtraDetails.addDetailsArray || [];
    	let newAddDetailsArray = [...addDetailsArray];

    	function filterSurveyNumbers(educationDetailsToRemove) {
    		let filteredArray = addDetailsArray.filter((item) =>
    			educationDetailsToRemove.includes(item.id) === false
    		);
    		return filteredArray
    	}



    	//Delete function call kardiya
    	newAddDetailsArray = filterSurveyNumbers(OEducationDetailInformationTodelete);

    	logger.info(`details array => ${JSON.stringify(newAddDetailsArray)}`)
    	/////....


    	let showAddButton = newAddDetailsArray.length <= 0;  // If no rows, show Add Row


    	let showSurveyList = newAddDetailsArray.length > 0;
    	let caseName = showSurveyList ? "deleteComponent" : "addRowComponent";

    	// let OeducationDetailsToDelete = OEducationDetailInformationTodelete


    	let visibilityDelete = false;
    	if (OEducationDetailInformationTodelete == false) {
    		visibilityDelete = false
    	}


    	payloadToEncrypt = {
    		"screen": "BENEFICIARY",
    		"version": version,
    		"data": {
    			...data,
    			"extraDetails": JSON.stringify({ ...parsedExtraDetails, "addDetailsArray": newAddDetailsArray }),
    			"ListOfTheCheckBoxes": newAddDetailsArray,
    			"SwitchCurrentComponentToRender": showAddButton ? "addRowComponent" : "deleteComponent",
    			"VisibilityAddMoreEducationDetails": (newAddDetailsArray.length >= 1),
    			"VisibilityCheckBoxInformation": showSurveyList,
    			"EnabilityFooterThirdScreen": (newAddDetailsArray.length >= 1),
    			"isAddRowembdedVisible": true,
    			"VisibilityDeleteRow": visibilityDelete
    		}
    	};
    	break;
    }


    case 'delete-edu': {

    	// let extraDetails = {{data.extraDetails}}

    	// let parsedExtraDetails = extraDetails ? JSON.parse(extraDetails) : {};

    	let addDetailsArray = parsedExtraDetails.addDetailsArray || [];


    	let visibilityDeleteEdu = true;
    	if (OEducationDetailInformationTodelete <= 0) {
    		visibilityDeleteEdu = false
    	}


    	// if (VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst === "Yes" || VisibilityIsBeneficiaryAmarriedwomanRadioCheckFirst === "Yes")
    		payloadToEncrypt = {
    			"screen": "BENEFICIARY",
    			"version": version,
    			"data": {
    				...data,
    				// "extraDetails": JSON.stringify({ ...parsedExtraDetails, "addDetailsArray": newAddDetailsArray }),
    				// "surveyList": surveyList,
    				"SwitchCurrentComponentToRender": "deleteComponent",
    				// "VisibilityAddMoreEducationDetails": (newAddDetailsArray.length >= 1),
    				// "VisibilityCheckBoxInformation": showSurveyList,
    				// "isFooterButtonVisible": true,
    				// "isAddRowembdedVisible" : true,
    				"VisibilityDeleteRow": visibilityDeleteEdu,
    				// "EnabilityFooterThirdScreen": true, //delete later
    				"EnabilityFooterThirdScreen": (addDetailsArray.length >= 1),
    				"LabelEducationDetailList": translation.SCREEN_BENEFICIARY.LabelEducationDetailList[language],
    			}
    		};
    	break;
    }


    case 'is-married-check-first': {


    	// handle is-married-check-first logic
    	// let { OGender,OIsBeneficiaryAmarriedwomanRadioCheckFirst,OSalutation,OInstituteDetails,OUnivercityBoard , OCompletionYear, OAdmisionYear, OUnivercityBoardOEducation, OEducationDetailsOfBeneficiary } = {{data}}
    	// let row = { OInstituteDetails, OCompletionYear, OAdmisionYear, OUnivercityBoardOEducation, OEducationDetailsOfBeneficiary }

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;




    	// let extraDetails = {{data.extraDetails}}
    	// let parsedExtraDetails = JSON.parse(extraDetails);
    	let parsedOIsBeneficiaryAmarriedwomanRadioCheckFirst = JSON.stringify(OIsBeneficiaryAmarriedwomanRadioCheckFirst);
    	let _OIsBeneficiaryAmarriedwomanRadioCheckFirst = parsedOIsBeneficiaryAmarriedwomanRadioCheckFirst.id;

    	// "OSalutation": "{\"Name\":\"Kumari\",\"Value\":\"09C5B7FA-97B9-4044-9F48-BF1B0B61FB0B\"}",
    	//"OSalutation": "{\"Name\":\"Er.\",\"Value\":\"125C99A9-E72F-4BB3-A1B4-2A33D7CF434D\"}"
    	// "OSalutation": "{\"Name\":\"वकील\",\"Value\":\"04CF461D-312C-4863-BEE5-260A6265D177\"}"
    	let _OSalutationAmarriedwomanRadio = tryParse(OSalutation, 'OSalutation', 'case_is-married-check-first');
    	let _checkSalutation = String(_OSalutationAmarriedwomanRadio.Name);


    	let HTTPMartialStatus = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data


    	let martialStatusArray = HTTPMartialStatus
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Name": item.Name, "value": String(item.Value) }),//String(item.Value),
    			title: String(item.Name)
    		}));





    	logger.info({ "_checkSalutation": _checkSalutation }, "Here we have to check the salutation");

    	let parsedOGender = tryParse(OGender, "OGender", 'Case_is-married-check-first');
    	// let parsedOGender = JSON.parse(OGender)
    	let _OGender = parsedOGender.Name
    	if (
    		(OIsBeneficiaryAmarriedwomanRadioCheckFirst === "Yes" || OIsBeneficiaryAmarriedwomanRadioCheckFirst === "हो") &&
    		(
    			_checkSalutation === "कुमारी" ||
    			_checkSalutation === "श्रीमती" ||
    			_checkSalutation === "सौ" ||
    			_checkSalutation === "Kumari" ||
    			_checkSalutation === "Mrs" ||
    			_checkSalutation === "Ms" ||
    			_checkSalutation === "Shrimati" ||
    			_OGender === "F"
    		)
    	) {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",
    				"HeadingBeneficiaryamarriedwoman": translation.WOMAN_Details_Screen.HeadingBeneficiaryamarriedwoman[language],//"Is Beneficiary a married woman?",
    				"VisibilityHeadingBeneMarriedwoman": true,
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language],//"Is Beneficiary a married woman?",
    				"ListIsMarriedWoman": martialStatusArray,
    				"LabelFooterButtonWomanScreen": translation.WOMAN_Details_Screen.LabelFooterButtonWomanScreen[language],//"Submit",
    				"ScreenNameBeneficiaryWomanDetails":translation.SCREEN_BENEFICIARY.ScreenNameBeneficiaryWomanDetails[language],
    				"VisibilityIsMarriedWomanList": true,
    				"VisiblityMarriedWomanMiddleName": false,
    				"VisibilityDateOfMerriage": false,
    				"LabelFoWomanAboveAddressBody":permanentAddress,
    				"VisibilityHeadingAddBeforeMerriage": false,
    				"VisibilityAddressBeforeMerriage": false,
    				"VisibilityHeadingMarriedWomanDetails": false,
    				"VisiblityPlacewheremarriagewasregistered": false,
    				"VisiblityPostMarriagename": false,
    				"VisibilityResidingBeforMarriageYear": false,
    				"VisiblityPlaceofBirthofHusband": false,
    				"VisibilityDateofBirthofHusband": false,
    				"VisibilityOccupationofHusbandList": false,
    				"VisiblityMarriedWomanHusbandName": false,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": false,
    				"VisiblityFillOutAddress": false,
    				"VisiblityFillOutBuildingName": false,
    				"VisiblityFillOutSectionName": false,
    				"VisiblityFillOutStreetName": false,
    				"VisiblityFillOutLandmarkName": false,
    				"VisibilityFilloutDistrictList": false,
    				"VisibilityFilloutTalukaList": false,
    				"VisibilityFilloutVillageList": false,
    				"VisiblityFillOutPincode": false,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": false,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true,
    			}
    		}
    	}
    	else {
    		throw new Error("Kindly select 'Yes' to fill out the required woman information");
    	}
    	break;
    }


    case 'Benef-PreAddress-Radio': {
    	const hTTPBenefPreDistrict = HTTPResponse.data

    	const hTTPBenefPreDistrictArray = hTTPBenefPreDistrict
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "districtCode": String(item.Districtcode), "Statecode": String(item.Statecode), "Langid": String(item.Langid) }),
    			title: String(item.Districtname)
    		}));

    	// let parsedBenefPreAddressRadio = tryParse(OBenefPreAddressRadio, "OBenefPreAddressRadio", 'Case_Benef-PreAddress-Radio');

    	// const parsedBenefPreAddressRadio= JSON.parse(OBenefPreAddressRadio);

    	// const httpBirthYesNo = HTTPResponse.data


    	selectedLanguage = language;
    	if (selectedLanguage === "1") {
    		httpBenefPreAddressYesNoArray = [{ id: "No", title: "No" }, { id: "Yes", title: "Yes" }]
    	} else {
    		httpBenefPreAddressYesNoArray = [{ id: "नाही", title: "नाही" }, { id: "हो", title: "हो" }]
    	}




    	let httpBirthYesNoArray = [];
    	selectedLanguage = language;
    	if (selectedLanguage === "1") {
    		httpBirthYesNoArray = [{id:"No",title:"No"},{id:"Yes",title:"Yes"}]
    	} else {
    		httpBirthYesNoArray = [{id:"नाही",title:"नाही"},{id:"हो",title:"हो"}]
    	}


    		// .filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    		// .map(item => ({
    		// 	id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    		// 	title: String(item.Name)
    		// }));


    	// const _OBenefPreAddressRadio = parsedBenefPreAddressRadio.title;

    	if (OBenefPreAddressRadio === "No" || OBenefPreAddressRadio === "नाही") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "Beneficiary_Present_Address",
    			"data": {
    				...data,
    				"LabelBenefPreAddress": translation.PRESENT_SCREEN.LabelBenefPreAddress[language],//"Address",
    				"LabelBenefPreBuilding": translation.PRESENT_SCREEN.LabelBenefPreBuilding[language],//"building",
    				"LabelBenefPreSection": translation.PRESENT_SCREEN.LabelBenefPreSection[language],//"Section",
    				"LabelBenefPreStreet": translation.PRESENT_SCREEN.LabelBenefPreStreet[language],//"Street",
    				"LabelBenefPreLandmark": translation.PRESENT_SCREEN.LabelBenefPreLandmark[language],//"Landmark",
    				"LabelBenefPreDistrict": translation.PRESENT_SCREEN.LabelBenefPreDistrict[language],//"District",
    				"LabelBenefPreTaluka": translation.PRESENT_SCREEN.LabelBenefPreTaluka[language],//"Taluka",
    				"LabelFooterButtonBenefPre": translation.PRESENT_SCREEN.LabelFooterButtonBenefPre[language],//"Submit",
    				"LabelBenefPrePincode": translation.PRESENT_SCREEN.LabelBenefPrePincode[language],//"Pincode",
    				// "ScreenNameBeneficiaryDetails":String(translation.SCREEN_BENEFICIARY.ScreenNameBeneficiaryDetails[language]),
    				"ScreenNamePresentAddress": translation.SCREEN_BENEFICIARY.ScreenNamePresentAddress[language],
    				"RequiredBenefPreAddress": true,
    				"RequiredBenefPreBuilding": true,
    				"RequiredBenefPreSection": true,
    				"RequiredBenefPreStreet": true,
    				"RequiredBenefPreLandmark": true,
    				"RequiredBenefPreDistrict": true,
    				// "RequiredBenefPreTaluka": ,

    				"VisibilityBenefPreAddress": true,
    				"VisibilityBenefPreBuilding": true,
    				"VisibilityBenefPreSection": true,
    				"VisibilityBenefPreStreet": true,
    				"VisibilityBenefPreLandmark": true,
    				"ListBenefPreDistrict": hTTPBenefPreDistrictArray,
    				"VisibilityBenefPreDistrict": true,
    				// "ListBenefPreTaluka":  ,
    				"VisibilityBenefPreTaluka": false,
    				"VisibleBenefPreVillage": false,
    				"VisibilityBenefPrePincode": true,

    			}
    		};
    	} else {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "BENEFICIARY",
    			"data": {
    				...data,
    				"VisibilityBirthDetailHeading": true,
    				"VisibilityBirthAddressAsAbove": true,
    				"labelBirthAddressAsAbove": translation.SCREEN_BENEFICIARY.labelBirthAddressAsAbove[language],
    				"ListRadioBirthAddressAsAbove": httpBirthYesNoArray,

    				"LabelBenefPreAddress": translation.PRESENT_SCREEN.LabelBenefPreAddress[language],//"Address",
    				"LabelBenefPreBuilding": translation.PRESENT_SCREEN.LabelBenefPreBuilding[language],//"building",
    				"LabelBenefPreSection": translation.PRESENT_SCREEN.LabelBenefPreSection[language],//"Section",
    				"LabelBenefPreStreet": translation.PRESENT_SCREEN.LabelBenefPreStreet[language],//"Street",
    				"LabelBenefPreLandmark": translation.PRESENT_SCREEN.LabelBenefPreLandmark[language],//"Landmark",
    				"LabelBenefPreDistrict": translation.PRESENT_SCREEN.LabelBenefPreDistrict[language],//"District",
    				"LabelBenefPreTaluka": translation.PRESENT_SCREEN.LabelBenefPreTaluka[language],//"Taluka",
    				"LabelFooterButtonBenefPre": translation.PRESENT_SCREEN.LabelFooterButtonBenefPre[language],//"Submit",
    				"LabelBenefPrePincode": translation.PRESENT_SCREEN.LabelBenefPrePincode[language],//"Pincode",
    				"RequiredBenefPreAddress": false,
    				"RequiredBenefPreBuilding": false,
    				"RequiredBenefPreSection": false,
    				"RequiredBenefPreStreet": false,
    				"RequiredBenefPreLandmark": false,
    				"RequiredBenefPreDistrict": false,
    				"RequiredBenefPrePincode":true,
    				// "RequiredBenefPreTaluka": ,

    				"VisibilityBenefPreAddress": false,
    				"VisibilityBenefPreBuilding": false,
    				"VisibilityBenefPreSection": false,
    				"VisibilityBenefPreStreet": false,
    				"VisibilityBenefPreLandmark": false,
    				"ListBenefPreDistrict": hTTPBenefPreDistrictArray,
    				"VisibilityBenefPreDistrict": false,
    				// "ListBenefPreTaluka":  ,
    				"VisibilityBenefPreTaluka": false,
    				"VisibleBenefPreVillage": false,
    				"VisibilityBenefPrePincode": false,
    				"VisibilityBirthAddress":false,
    				"VisibilityBirthStreet":false,
    				"VisibilityBirthSection":false,
    				"VisiblityBirthBuilding":false,
    				"VisibilityBirthState":false,
    				"VisibilityEducationDetailsOfBeneficiary":false,
    				"VisibilityUniversityBoard":false
    			}
    		}
    	}
    	break;
    }

    case 'district-Benef-Pre': {
    	const hTTPBenefPreTaluka = HTTPResponse.data

    	const hTTPBenefPreTalukaArray = hTTPBenefPreTaluka
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "SubDistrictcode": String(item.SubDistrictcode), "DistrictCode": String(item.DistrictCode), "SubDistrictname": String(item.SubDistrictname) }),
    			title: String(item.SubDistrictname)
    		}));

    	payloadToEncrypt = {
    		"version": version,
    		"screen": "Beneficiary_Present_Address",
    		"data": {
    			...data,
    			// "LabelBenefPreAddress": "Address",
    			"RequiredBenefPreAddress": true,
    			"VisibilityBenefPreAddress": true,
    			// "LabelBenefPreBuilding": "building",
    			"RequiredBenefPreBuilding": true,
    			"VisibilityBenefPreBuilding": true,
    			// "LabelBenefPreSection": "Section",
    			"RequiredBenefPreSection": true,
    			"VisibilityBenefPreSection": true,
    			// "LabelBenefPreStreet": "Street",
    			"RequiredBenefPreStreet": true,
    			"VisibilityBenefPreStreet": true,
    			// "LabelBenefPreLandmark": "Landmark",
    			"RequiredBenefPreLandmark": true,
    			"VisibilityBenefPreLandmark": true,
    			// "LabelBenefPreDistrict": "District",
    			// "ListBenefPreDistrict": hTTPBenefPreDistrictArray,
    			"RequiredBenefPreDistrict": true,
    			"VisibilityBenefPreDistrict": true,
    			"LabelBenefPreTaluka": translation.PRESENT_SCREEN.LabelBenefPreTaluka[language],//"Taluka",
    			"ListBenefPreTaluka": hTTPBenefPreTalukaArray,
    			"RequiredBenefPreTaluka": true,
    			"VisibilityBenefPreTaluka": true,
    			"VisibleBenefPreVillage": false,
    			"VisibilityBenefPrePincode": true,
    			"LabelFooterButtonBenefPre": "Submit",
    			// "LabelBenefPreTaluka": "Taluka"
    		}
    	};

    	break;
    }

    case 'taluka-Benef-Pre': {
    	const hTTPBenefPreVillage = HTTPResponse.data

    	const benefPreVillageArray = hTTPBenefPreVillage
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Subdistrictcode": item.Subdistrictcode, "Villagecode": item.Villagecode, "Villagename": item.Villagename }),
    			title: String(item.Villagename)
    		}));

    	payloadToEncrypt = {
    		"version": version,
    		"screen": "Beneficiary_Present_Address",
    		"data": {
    			...data,
    			// "LabelBenefPreAddress": "Address",
    			"RequiredBenefPreAddress": true,
    			"VisibilityBenefPreAddress": true,
    			// "LabelBenefPreBuilding": "building",
    			"RequiredBenefPreBuilding": true,
    			"VisibilityBenefPreBuilding": true,
    			// "LabelBenefPreSection": "Section",
    			"RequiredBenefPreSection": true,
    			"VisibilityBenefPreSection": true,
    			// "LabelBenefPreStreet": "Street",
    			"RequiredBenefPreStreet": true,
    			"VisibilityBenefPreStreet": true,
    			// "LabelBenefPreLandmark": "Landmark",
    			"RequiredBenefPreLandmark": true,
    			"VisibilityBenefPreLandmark": true,
    			// "LabelBenefPreDistrict": "District",
    			// "ListBenefPreDistrict": hTTPBenefPreDistrictArray,
    			"RequiredBenefPreDistrict": true,
    			"VisibilityBenefPreDistrict": true,
    			// "LabelBenefPreTaluka": "Taluka",
    			// "ListBenefPreTaluka": hTTPBenefPreTalukaArray,
    			"RequiredBenefPreTaluka": true,
    			"VisibilityBenefPreTaluka": true,
    			"VisibilityBenefPrePincode": true,
    			// "LabelFooterButtonBenefPre": "Submit",
    			// "LabelBenefPreTaluka": "Taluka",
    			"LabelBenefPreVillage": translation.PRESENT_SCREEN.LabelBenefPreVillage[language],//"Village",
    			"ListBenefPreVillage": benefPreVillageArray,
    			"RequiredBenefPreVillage": true,
    			"VisibleBenefPreVillage": true,
    			"EnabledBenefPreVillage": true
    		}
    	};

    	break;
    }

    case 'Footer-Benef-Pre': {
    	logger.info("I was here", data);

    	// const httpBirthYesNo = HTTPResponse.data

    	// const httpBirthYesNoArray = httpBirthYesNo
    	// 	.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    	// 	.map(item => ({
    	// 		id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    	// 		title: String(item.Name)
    	// 	}));
    	let httpBirthYesNoArray = [];
    	selectedLanguage = language;
    	if (selectedLanguage === "1") {
    		httpBirthYesNoArray = [{ id: "No", title: "No" }, { id: "Yes", title: "Yes" }]
    	} else {
    		httpBirthYesNoArray = [{ id: "नाही", title: "नाही" }, { id: "हो", title: "हो" }]
    	}



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"VisibilityBirthDetailHeading": true,
    			"VisibilityBirthAddressAsAbove": true,
    			// "labelBirthAddressAsAbove": "Birth Address As Above",
    			"ListRadioBirthAddressAsAbove": httpBirthYesNoArray,
    			"VisibilityBirthAddressAsAbove": true,
    			"VisibilityBirthAddress":false,
    			"VisibilityBirthStreet":false,
    			"VisibilityBirthSection":false,
    			"VisiblityBirthBuilding":false,
    			"VisibilityBirthState":false,
    			"error_message": language === "1"? "Permanent address details has been saved.": "कायमस्वरूपी पत्त्याचे तपशील जतन केले गेले आहे."
    		}
    	};
    	break;
    }

    case 'married-woman': {

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	// "OIsMarriedWoman": "{\"Name\":\"घटस्फोटित\",\"value\":\"24D0812D-9882-4A3E-80E8-E2B3971BA308\"}",
    	let parsedOIsMarriedWoman = tryParse(OIsMarriedWoman, "OIsMarriedWoman", 'case_married-woman');
    	let _OIsMarriedWoman = String(parsedOIsMarriedWoman.Name);

    	logger.info({ "_OIsMarriedWoman": _OIsMarriedWoman, "OIsMarriedWomanEntire": OIsMarriedWoman });

    	// "{\"Name\":\"विवाहित\",\"value\":\"03270236-C470-486A-92A3-729F50AE112B\"}"
    	if (_OIsMarriedWoman === "Unmarried" || _OIsMarriedWoman === "Single" || _OIsMarriedWoman === "Widower" || _OIsMarriedWoman === "अविवाहित") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",
    				"VisibilityHeadingBeneMarriedwoman": false,
    				"VisiblityMarriedWomanMiddleName": false,
    				"VisibilityDateOfMerriage": false,
    				"VisibilityHeadingAddBeforeMerriage": false,
    				"VisibilityAddressBeforeMerriage": false,
    				"VisibilityHeadingMarriedWomanDetails": false,
    				"VisiblityPlacewheremarriagewasregistered": false,
    				"VisiblityPostMarriagename": false,
    				"VisibilityResidingBeforMarriageYear": false,
    				"VisiblityPlaceofBirthofHusband": false,
    				"VisibilityDateofBirthofHusband": false,
    				"VisibilityOccupationofHusbandList": false,
    				"VisiblityMarriedWomanHusbandName": false,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": false,
    				"VisiblityFillOutAddress": false,
    				"VisiblityFillOutBuildingName": false,
    				"VisiblityFillOutSectionName": false,
    				"VisiblityFillOutStreetName": false,
    				"VisiblityFillOutLandmarkName": false,
    				"VisibilityFilloutDistrictList": false,
    				"VisibilityFilloutTalukaList": false,
    				"VisibilityFilloutVillageList": false,
    				"VisiblityFillOutPincode": false,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": false,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true,
    			}
    		}
    	} else {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",
    				"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language],//"Maiden Name",
    				"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language],//"Marriage Date",
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language],//"Is Beneficiary a married woman?",
    				"VisibilityDateOfMerriage": true,
    				"VisibilityIsMarriedWomanList": true,
    				"VisiblityMarriedWomanMiddleName": true,
    				"VisibilityHeadingAddBeforeMerriage": false,
    				"VisibilityAddressBeforeMerriage": false,
    				"VisibilityHeadingMarriedWomanDetails": false,
    				"VisiblityPlacewheremarriagewasregistered": false,
    				"VisiblityPostMarriagename": false,
    				"VisibilityResidingBeforMarriageYear": false,
    				"VisiblityPlaceofBirthofHusband": false,
    				"VisibilityDateofBirthofHusband": false,
    				"VisibilityOccupationofHusbandList": false,
    				"VisiblityMarriedWomanHusbandName": false,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": false,
    				"VisiblityFillOutAddress": false,
    				"VisiblityFillOutBuildingName": false,
    				"VisiblityFillOutSectionName": false,
    				"VisiblityFillOutStreetName": false,
    				"VisiblityFillOutLandmarkName": false,
    				"VisibilityFilloutDistrictList": false,
    				"VisibilityFilloutTalukaList": false,
    				"VisibilityFilloutVillageList": false,
    				"VisiblityFillOutPincode": false,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": false,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true
    			}
    		}
    	}
    	break;
    }

    case 'merriage-date': {
    	// handle merriage-date logic
    	let httpAddressBeforeMerrage = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data


    	let httpAddressBeforeMerrageArray = httpAddressBeforeMerrage
    		.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    			title: String(item.Name)
    		}));

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;

    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], //"Maiden Name",
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], //"Marriage Date",
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language],//"Is Beneficiary a married woman?",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], //"Address Before Merriage",
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], //"Address Before Marriage(same as above)?",
    			"ListRadioAddressBeforeMerriage": httpAddressBeforeMerrageArray,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,


    			"VisibilityHeadingMarriedWomanDetails": false,
    			"VisiblityPlacewheremarriagewasregistered": false,
    			"VisiblityPostMarriagename": false,
    			"VisibilityResidingBeforMarriageYear": false,
    			"VisiblityPlaceofBirthofHusband": false,
    			"VisibilityDateofBirthofHusband": false,
    			"VisibilityOccupationofHusbandList": false,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": false,
    			"VisiblityFillOutAddress": false,
    			"VisiblityFillOutBuildingName": false,
    			"VisiblityFillOutSectionName": false,
    			"VisiblityFillOutStreetName": false,
    			"VisiblityFillOutLandmarkName": false,
    			"VisibilityFilloutDistrictList": false,
    			"VisibilityFilloutTalukaList": false,
    			"VisibilityFilloutVillageList": false,
    			"VisiblityFillOutPincode": false,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,
    			"EnabilityFooterWomanScreen": true,
    		}
    	}
    	break;
    }

    case 'address-before-merrage': {
    	// handle address-before-merrage logic
    	// let { OAddressBeforeMerriage } = {{data}}

    	// "OAddressBeforeMerriage": "{\"Value\":\"FB879D81-0CA9-4B4F-98BB-1658A479B786\",\"title\":\"नाही\"}",
    	let parsedOAddressBeforeMerriage = tryParse(OAddressBeforeMerriage, "OAddressBeforeMerriage", 'case_address-before-merrage');
    	let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title;

    	// let HTTPResponse = {{HTTPResponse}}.data
    	let hTTPDistrictBeforeMerrage = HTTPResponse.data;

    	let districtBeforeMerrageArray = hTTPDistrictBeforeMerrage
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "districtCode": String(item.Districtcode), "Statecode": String(item.Statecode), "Langid": String(item.Langid) }),
    			title: String(item.Districtname)
    		}));

    	logger.info({ "_OAddressBeforeMerriage": _OAddressBeforeMerriage }, "To check the Yes No in radio")

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;

    	if (_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",
    				"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language],//"Maiden Name",
    				"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language],//"Marriage Date",
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language],// "Is Beneficiary a married woman?",
    				"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language],//"Address Before Merriage",
    				"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language],//"Address Before Marriage(same as above)?",
    				"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language],//"Post Marriage name(along with husband's name)",
    				"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language],//"Residing Period befor marriage and No. of year",
    				"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language],//"Place of Birth of Husband",
    				"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language],//"Date of Birth of Husband",
    				"VisibilityHeadingMarriedWomanDetails": true,
    				"VisiblityPlaceofBirthofHusband": false,
    				"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language],//"Is Beneficiary a married woman? (Yes/No)",
    				"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language],//"Place where marriage was registered",
    				"VisiblityPlacewheremarriagewasregistered": true,
    				"VisibilityDateofBirthofHusband": false,
    				"VisibilityResidingBeforMarriageYear": true,
    				"VisiblityPostMarriagename": true,
    				"VisibilityAddressBeforeMerriage": true,
    				"VisibilityHeadingAddBeforeMerriage": true,
    				"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language],//"Address Before Marriage",
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisiblityFillOutAddress": false,
    				"VisiblityFillOutBuildingName": false,
    				"VisiblityFillOutSectionName": false,
    				"VisiblityFillOutStreetName": false,
    				"VisiblityFillOutLandmarkName": false,
    				"VisibilityFilloutDistrictList": false,
    				"ListFilloutDistrict": districtBeforeMerrageArray,
    				"VisibilityFilloutTalukaList": false,
    				"VisibilityOccupationofHusbandList": false,
    				"VisiblityMarriedWomanHusbandName": false,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": false,
    				"VisibilityFilloutVillageList": false,
    				"VisiblityFillOutPincode": false,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": false,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true,
    				"EnabledResidingBeforMarriageYear": true,
    				"EnabledDateofBirthofHusband": true

    			}
    		}
    	} else {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",
    				"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name"
    				"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date"
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?"
    				"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?"
    				"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)"
    				"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of years"
    				"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband"
    				"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband"
    				"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address"
    				"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building"
    				"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section"
    				"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street"
    				"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark"
    				"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District"
    				"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered"

    				"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage"
    				"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)"
    				"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage"
    				"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women"


    				"VisibilityHeadingMarriedWomanDetails": false,
    				"VisiblityPlaceofBirthofHusband": false,
    				"VisiblityPlacewheremarriagewasregistered": false,
    				"VisibilityDateofBirthofHusband": false,
    				"VisibilityResidingBeforMarriageYear": false,
    				"VisiblityPostMarriagename": false,
    				"VisibilityAddressBeforeMerriage": true,
    				"VisibilityHeadingAddBeforeMerriage": true,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisiblityFillOutAddress": true,
    				"VisiblityFillOutBuildingName": true,
    				"VisiblityFillOutSectionName": true,
    				"VisiblityFillOutStreetName": true,
    				"VisiblityFillOutLandmarkName": true,
    				"VisibilityFilloutDistrictList": true,
    				"ListFilloutDistrict": districtBeforeMerrageArray,
    				"VisibilityFilloutTalukaList": false,
    				"VisibilityOccupationofHusbandList": false,
    				"VisiblityMarriedWomanHusbandName": false,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": true,
    				"VisibilityFilloutVillageList": false,
    				"VisiblityFillOutPincode": false,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": false,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true,
    				"EnabledResidingBeforMarriageYear": true,
    				"EnabledDateofBirthofHusband": true,
    			}
    		}
    	}

    	break;
    }

    case 'Birth-of-Husband': {
    	// handle Birth-of-Husband logic
    	let HTTPOccupationofHusband = HTTPResponse.data;

    	let occupationofHusbandArray = HTTPOccupationofHusband
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Name": item.Name, "Value": item.Value }),
    			title: String(item.Name)
    		}));

    	// {
    	//     "Name": " १० वी  खालील ",
    	//     "Value": "AB4F763C-08C4-46B7-99DC-EF4E77ADD0F2"
    	// },



    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;

    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name"
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date"
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?"
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?"
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)"
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year"
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband"
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband"
    			"LabelOccupationofHusband": translation.WOMAN_Details_Screen.LabelOccupationofHusband[language], // "Occupation of Husband"
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered"
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage"
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)"
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage"

    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityOccupationofHusbandList": true,
    			"VisibilityHeadingAddBeforeMerriage": false,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": false,
    			"VisibilityFilloutTalukaList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": false,
    			"VisibilityFilloutVillageList": false,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisiblityPostMarriagename": true,
    			"VisiblityFillOutAddress": false,
    			"VisiblityFillOutBuildingName": false,
    			"VisiblityFillOutSectionName": false,
    			"VisiblityFillOutStreetName": false,
    			"VisiblityFillOutLandmarkName": false,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,

    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,

    			"ListOccupationofHusband": occupationofHusbandArray,

    		}
    	}


    	break;
    }

    case 'Occupation-of-Husband': {
    	// handle Occupation-of-Husband logic

    	let hTTPAddressAfterMarriedYesNo = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data


    	let httpAddressAfterMarriedYesNoArray = hTTPAddressAfterMarriedYesNo
    		.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Value": item.Value, "title": String(item.Name) }),//String(item.Name),
    			title: String(item.Name)
    		}));



    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name"
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date"
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?"
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?"
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)"
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year"
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband"
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband"
    			"LabelOccupationofHusband": translation.WOMAN_Details_Screen.LabelOccupationofHusband[language], // "Occupation of Husband"
    			"LabelMariedWomanHusbandName": translation.WOMAN_Details_Screen.LabelMariedWomanHusbandName[language], // "Husband Name"
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered"
    			"LabelRadioAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelRadioAddressAfterMarriedWomen[language], // "Address for Women(Married After)"

    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage"
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)"
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage"
    			"HeadingAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressAfterMarriedWomen[language], // "Address After Married Women"


    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityOccupationofHusbandList": true,
    			"VisibilityHeadingAddBeforeMerriage": false,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": false,
    			"VisibilityFilloutTalukaList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": false,
    			"VisibilityFilloutVillageList": false,
    			"VisibilityHeadingAddressAfterMarriedWomen": true,
    			"VisibilityRadioAddressAfterMarriedWomen": true,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisiblityPostMarriagename": true,
    			"VisiblityFillOutAddress": false,
    			"VisiblityFillOutBuildingName": false,
    			"VisiblityFillOutSectionName": false,
    			"VisiblityFillOutStreetName": false,
    			"VisiblityFillOutLandmarkName": false,
    			"VisiblityMarriedWomanHusbandName": true,
    			"VisiblityFillOutPincode": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,

    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,

    			"ListRadioAddressAfterMarriedWomen": httpAddressAfterMarriedYesNoArray,
    		}
    	}


    	break;
    }

    case 'fill-out-district': {
    	// handle fill-out-district logic
    	let hTTPTalukaFillout = HTTPResponse.data;

    	let talukaFilloutaArray = hTTPTalukaFillout
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "SubDistrictcode": String(item.SubDistrictcode), "DistrictCode": String(item.DistrictCode), "SubDistrictname": String(item.SubDistrictname) }),
    			title: String(item.SubDistrictname)
    		}));


    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Merriage"
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name"
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date"
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?"
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?"
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)"
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year"
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband"
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband"
    			"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address"
    			"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building"
    			"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section"
    			"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street"
    			"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark"
    			"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District"
    			"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka"
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered"
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)"
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage"
    			"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women"


    			"VisibilityHeadingMarriedWomanDetails": false,
    			"VisibilityDateofBirthofHusband": false,
    			"VisibilityResidingBeforMarriageYear": false,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": true,
    			"VisibilityFilloutTalukaList": true,
    			"VisibilityOccupationofHusbandList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": true,
    			"VisibilityFilloutVillageList": false,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": false,
    			"VisiblityPlacewheremarriagewasregistered": false,
    			"VisiblityPostMarriagename": false,
    			"VisiblityFillOutAddress": true,
    			"VisiblityFillOutBuildingName": true,
    			"VisiblityFillOutSectionName": true,
    			"VisiblityFillOutStreetName": true,
    			"VisiblityFillOutLandmarkName": true,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,
    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,

    			"ListFilloutTaluka": talukaFilloutaArray,
    		}
    	}
    	break;
    }

    case 'fill-out-taluka': {
    	// handle fill-out-taluka logic
    	let HTTPFilloutVillage = HTTPResponse.data;

    	let filloutVillageArray = HTTPFilloutVillage
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Subdistrictcode": item.Subdistrictcode, "Villagecode": item.Villagecode, "Villagename": item.Villagename }),
    			title: String(item.Villagename)
    		}));

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year",
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    			"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    			"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    			"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    			"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    			"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    			"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    			"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    			"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage",
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    			"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women"


    			"VisibilityHeadingMarriedWomanDetails": false,
    			"VisibilityDateofBirthofHusband": false,
    			"VisibilityResidingBeforMarriageYear": false,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": true,
    			"VisibilityFilloutTalukaList": true,
    			"VisibilityOccupationofHusbandList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": true,
    			"VisibilityFilloutVillageList": true,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": false,
    			"VisiblityPlacewheremarriagewasregistered": false,
    			"VisiblityPostMarriagename": false,
    			"VisiblityFillOutAddress": true,
    			"VisiblityFillOutBuildingName": true,
    			"VisiblityFillOutSectionName": true,
    			"VisiblityFillOutStreetName": true,
    			"VisiblityFillOutLandmarkName": true,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,

    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,

    			"ListFilloutVillage": filloutVillageArray,
    		}
    	}


    	break;
    }

    case 'fill-out-village': {
    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;

    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",

    			"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year",
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    			"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    			"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    			"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    			"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    			"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    			"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    			"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    			"LabelFillOutPincode": translation.WOMAN_Details_Screen.LabelFillOutPincode[language], // "Pincode",
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage",
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    			"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women"



    			"LabelFilloutVillage": "Village",
    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisibilityDateofBirthofHusband": false,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": true,
    			"VisibilityFilloutTalukaList": true,
    			"VisibilityOccupationofHusbandList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": true,
    			"VisibilityFilloutVillageList": true,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": false,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisiblityPostMarriagename": true,
    			"VisiblityFillOutAddress": true,
    			"VisiblityFillOutBuildingName": true,
    			"VisiblityFillOutSectionName": true,
    			"VisiblityFillOutStreetName": true,
    			"VisiblityFillOutLandmarkName": true,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": true,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,

    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,
    		}
    	}



    	break;
    }

    case 'Residing-Before-Marriage': {
    	// handle Residing-Before-Marriage logic
    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name"
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date"
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?"
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?"
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)"
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year"
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband"
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband"
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered"
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage"
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)"
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage"

    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": false,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": false,
    			"VisibilityFilloutTalukaList": false,
    			"VisibilityOccupationofHusbandList": false,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": false,
    			"VisibilityFilloutVillageList": false,
    			"VisibilityHeadingAddressAfterMarriedWomen": false,
    			"VisibilityRadioAddressAfterMarriedWomen": false,
    			"VisibilityHeadingAddAfterMarriedWomen": false,
    			"VisibilityDistrictListAfterMarriedWomen": false,
    			"VisibilityTalukaListAfterMarriedWomen": false,
    			"VisibilityVillageListAfterMarriedWomen": false,

    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisiblityPostMarriagename": true,
    			"VisiblityFillOutAddress": false,
    			"VisiblityFillOutBuildingName": false,
    			"VisiblityFillOutSectionName": false,
    			"VisiblityFillOutStreetName": false,
    			"VisiblityFillOutLandmarkName": false,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": false,
    			"VisiblityAddressAfterMarriedWomen": false,
    			"VisiblityBuildingNameAfterMarriedWomen": false,
    			"VisiblitySectionNameAfterMarriedWomen": false,
    			"VisiblityStreetNameAfterMarriedWomen": false,
    			"VisiblityLandmarkNameAfterMarriedWomen": false,
    			"VisiblityPincodeAfterMarriedWomen": false,

    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true


    		}
    	}
    	break;
    }

    case 'address-after-merrage': {
    	// let { ORadioAddressAfterMarriedWomen , OAddressBeforeMerriage} = {{data}}


    	let hTTPAfterMarriedDistrict = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data

    	// let {  } = {{data}}

    	// "OAddressBeforeMerriage": "{\"Value\":\"FB879D81-0CA9-4B4F-98BB-1658A479B786\",\"title\":\"नाही\"}",
    	let parsedOAddressBeforeMerriage = tryParse(OAddressBeforeMerriage, "OAddressBeforeMerriage", 'case_address-after-merrage_1');
    	let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title;

    	let parsedOAddressAfterMarriedWomen = tryParse(ORadioAddressAfterMarriedWomen, "ORadioAddressAfterMarriedWomen", 'case_address-after-merrage_2');
    	let _ORadioAddressAfterMarriedWomen = parsedOAddressAfterMarriedWomen.title;

    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	let afterMarriedDistrictArray = hTTPAfterMarriedDistrict
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "districtCode": String(item.Districtcode), "Statecode": String(item.Statecode), "Langid": String(item.Langid) }),
    			title: String(item.Districtname)
    		}));


    	let beforeMarriage = true
    	if (_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    		beforeMarriage = false
    	}

    	// if(_OAddressBeforeMerriage ===  || _OAddressBeforeMerriage === "हो"){




    	if (_ORadioAddressAfterMarriedWomen === "Yes" || _ORadioAddressAfterMarriedWomen === "हो") {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",

    				"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Merriage",
    				"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    				"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    				"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women",
    				"HeadingAddAfterMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddAfterMarriedWomen[language], // "Address for Married Women(After marriage)",

    				"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    				"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    				"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    				"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    				"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year",
    				"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    				"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    				"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    				"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    				"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    				"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    				"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    				"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    				"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    				"LabelFillOutPincode": translation.WOMAN_Details_Screen.LabelFillOutPincode[language], // "Pincode",
    				"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    				"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    				"LabelAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelAddressAfterMarriedWomen[language], // "Address",
    				"LabelBuildingNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelBuildingNameAfterMarriedWomen[language], // "Building",
    				"LabelSectionNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelSectionNameAfterMarriedWomen[language], // "Section",
    				"LabelStreetNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelStreetNameAfterMarriedWomen[language], // "Street",
    				"LabelLandmarkNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelLandmarkNameAfterMarriedWomen[language], // "Landmark",
    				"LabelDistrictAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelDistrictAfterMarriedWomen[language], // "District",
    				"LabelTalukaAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelTalukaAfterMarriedWomen[language], // "Taluka"


    				"VisibilityHeadingMarriedWomanDetails": false,
    				"VisibilityDateofBirthofHusband": true,
    				"VisibilityResidingBeforMarriageYear": true,
    				"VisibilityAddressBeforeMerriage": true,
    				"VisibilityHeadingAddBeforeMerriage": true,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisibilityFilloutDistrictList": beforeMarriage,
    				"VisibilityFilloutTalukaList": beforeMarriage,
    				"VisibilityOccupationofHusbandList": true,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": beforeMarriage,
    				"VisibilityFilloutVillageList": beforeMarriage,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": true,
    				"VisibilityHeadingAddAfterMarriedWomen": false,
    				"VisibilityDistrictListAfterMarriedWomen": false,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,

    				"VisiblityPlaceofBirthofHusband": false,
    				"VisiblityPlacewheremarriagewasregistered": true,
    				"VisiblityPostMarriagename": true,
    				"VisiblityFillOutAddress": beforeMarriage,
    				"VisiblityFillOutBuildingName": beforeMarriage,
    				"VisiblityFillOutSectionName": beforeMarriage,
    				"VisiblityFillOutStreetName": beforeMarriage,
    				"VisiblityFillOutLandmarkName": beforeMarriage,
    				"VisiblityMarriedWomanHusbandName": true,
    				"VisiblityFillOutPincode": beforeMarriage,
    				"VisiblityAddressAfterMarriedWomen": false,
    				"VisiblityBuildingNameAfterMarriedWomen": false,
    				"VisiblitySectionNameAfterMarriedWomen": false,
    				"VisiblityStreetNameAfterMarriedWomen": false,
    				"VisiblityLandmarkNameAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,


    				"EnabilityFooterWomanScreen": true,
    				"EnabledResidingBeforMarriageYear": true,
    				"EnabledDateofBirthofHusband": true,
    				"ListDistrictAfterMarriedWomen": afterMarriedDistrictArray
    			}
    		}
    	} else {
    		payloadToEncrypt = {
    			"version": version,
    			"screen": "WOMAN_MARRIED",
    			"data": {
    				...data,
    				"SwitchComponentForMarriedWomen": "Woman",


    				"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Merriage",
    				"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    				"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    				"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women",
    				"HeadingAddAfterMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddAfterMarriedWomen[language], // "Address for Married Women(After marriage)",

    				"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    				"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    				"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    				"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    				"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    				"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of year",
    				"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    				"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    				"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    				"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    				"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    				"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    				"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    				"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    				"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    				"LabelFillOutPincode": translation.WOMAN_Details_Screen.LabelFillOutPincode[language], // "Pincode",
    				"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    				"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    				"LabelAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelAddressAfterMarriedWomen[language], // "Address",
    				"LabelBuildingNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelBuildingNameAfterMarriedWomen[language], // "Building",
    				"LabelSectionNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelSectionNameAfterMarriedWomen[language], // "Section",
    				"LabelStreetNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelStreetNameAfterMarriedWomen[language], // "Street",
    				"LabelLandmarkNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelLandmarkNameAfterMarriedWomen[language], // "Landmark",
    				"LabelDistrictAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelDistrictAfterMarriedWomen[language], // "District",
    				"LabelTalukaAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelTalukaAfterMarriedWomen[language], // "Taluka"



    				"VisibilityHeadingMarriedWomanDetails": true,
    				"VisiblityPlaceofBirthofHusband": false,

    				"VisiblityPlacewheremarriagewasregistered": true,
    				"VisibilityDateofBirthofHusband": true,
    				"VisibilityResidingBeforMarriageYear": true,
    				"VisiblityPostMarriagename": true,
    				"VisibilityAddressBeforeMerriage": true,
    				"VisibilityHeadingAddBeforeMerriage": true,
    				"VisibilityHeadingAddressforMarriedWomen": false,
    				"VisiblityFillOutAddress": beforeMarriage,
    				"VisiblityFillOutBuildingName": beforeMarriage,
    				"VisiblityFillOutSectionName": beforeMarriage,
    				"VisiblityFillOutStreetName": beforeMarriage,
    				"VisiblityFillOutLandmarkName": beforeMarriage,
    				"VisibilityFilloutDistrictList": beforeMarriage,
    				"VisibilityFilloutTalukaList": beforeMarriage,
    				"VisibilityOccupationofHusbandList": true,
    				"VisiblityMarriedWomanHusbandName": true,
    				"VisibilityRadioAddressforMarriedWomen": false,
    				"VisibilityHeadingFillOutAddforMarriedWomen": beforeMarriage,
    				"VisibilityFilloutVillageList": beforeMarriage,
    				"VisiblityFillOutPincode": beforeMarriage,
    				"VisibilityHeadingAddressAfterMarriedWomen": false,
    				"VisibilityRadioAddressAfterMarriedWomen": true,
    				"VisibilityHeadingAddAfterMarriedWomen": true,
    				"VisiblityAddressAfterMarriedWomen": true,
    				"VisiblityBuildingNameAfterMarriedWomen": true,
    				"VisiblitySectionNameAfterMarriedWomen": true,
    				"VisiblityStreetNameAfterMarriedWomen": true,
    				"VisiblityLandmarkNameAfterMarriedWomen": true,
    				"VisibilityDistrictListAfterMarriedWomen": true,
    				"VisibilityTalukaListAfterMarriedWomen": false,
    				"VisibilityVillageListAfterMarriedWomen": false,
    				"VisiblityPincodeAfterMarriedWomen": false,
    				"EnabilityFooterWomanScreen": true,
    				"EnabledResidingBeforMarriageYear": true,
    				"EnabledDateofBirthofHusband": true,

    				"ListDistrictAfterMarriedWomen": afterMarriedDistrictArray
    			}
    		}
    	}
    	break;
    }

    case 'District-After-married-woman': {
    	// handle District-After-married-woman logic
    	// let { ORadioAddressAfterMarriedWomen , OAddressBeforeMerriage} = {{data}}

    	let hTTPAfterMarriedWomanTaluka = HTTPResponse.data;

    	let afterMarriedWomanTalukaArray = hTTPAfterMarriedWomanTaluka
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "SubDistrictcode": String(item.SubDistrictcode), "DistrictCode": String(item.DistrictCode), "SubDistrictname": String(item.SubDistrictname) }),
    			title: String(item.SubDistrictname)
    		}));

    	let parsedOAddressBeforeMerriage = tryParse(OAddressBeforeMerriage, "OAddressBeforeMerriage", 'District-After-married-woman');
    	let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title

    	// let beforeMarriageDistrict = true;
    	// if ( _OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    	// 	beforeMarriageDistrict = false
    	// }

    	let beforeMarriage = true
    	if (_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    		beforeMarriage = false
    	}


    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",

    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of years",
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    			"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    			"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    			"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    			"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    			"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    			"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    			"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    			"LabelFillOutPincode": translation.WOMAN_Details_Screen.LabelFillOutPincode[language], // "Pincode",
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    			"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    			"LabelAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelAddressAfterMarriedWomen[language], // "Address",
    			"LabelBuildingNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelBuildingNameAfterMarriedWomen[language], // "Building",
    			"LabelSectionNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelSectionNameAfterMarriedWomen[language], // "Section",
    			"LabelStreetNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelStreetNameAfterMarriedWomen[language], // "Street",
    			"LabelLandmarkNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelLandmarkNameAfterMarriedWomen[language], // "Landmark",
    			"LabelDistrictAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelDistrictAfterMarriedWomen[language], // "District",
    			"LabelTalukaAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelTalukaAfterMarriedWomen[language], // "Taluka",
    			"LabelVillageAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelVillageAfterMarriedWomen[language], // "Village",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage",
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    			"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women",
    			"HeadingAddAfterMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddAfterMarriedWomen[language], // "Address for Married Women(After marriage)"

    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisibilityFilloutDistrictList": beforeMarriage,
    			"VisibilityFilloutTalukaList": beforeMarriage,
    			"VisibilityOccupationofHusbandList": true,
    			"VisibilityRadioAddressforMarriedWomen": false,
    			"VisibilityHeadingFillOutAddforMarriedWomen": beforeMarriage,
    			"VisibilityFilloutVillageList": beforeMarriage,
    			"VisibilityHeadingAddressAfterMarriedWomen": true,
    			"VisibilityRadioAddressAfterMarriedWomen": true,
    			"VisibilityHeadingAddAfterMarriedWomen": true,
    			"VisibilityDistrictListAfterMarriedWomen": true,
    			"VisibilityTalukaListAfterMarriedWomen": true,
    			"VisibilityVillageListAfterMarriedWomen": false,


    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisiblityPostMarriagename": true,
    			"VisiblityFillOutAddress": beforeMarriage,
    			"VisiblityFillOutBuildingName": beforeMarriage,
    			"VisiblityFillOutSectionName": beforeMarriage,
    			"VisiblityFillOutStreetName": beforeMarriage,
    			"VisiblityFillOutLandmarkName": beforeMarriage,
    			"VisiblityMarriedWomanHusbandName": false,
    			"VisiblityFillOutPincode": beforeMarriage,
    			"VisiblityAddressAfterMarriedWomen": true,
    			"VisiblityBuildingNameAfterMarriedWomen": true,
    			"VisiblitySectionNameAfterMarriedWomen": true,
    			"VisiblityStreetNameAfterMarriedWomen": true,
    			"VisiblityLandmarkNameAfterMarriedWomen": true,
    			"VisiblityPincodeAfterMarriedWomen": false,
    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,


    			"ListTalukaAfterMarriedWomen": afterMarriedWomanTalukaArray

    		}
    	}


    	break;
    }

    case 'Taluka-After-married-woman': {
    	// handle Taluka-After-married-woman logic
    	// let { ORadioAddressAfterMarriedWomen , OAddressBeforeMerriage} = {{data}}

    	// let parsedOAddressBeforeMerriage = JSON.parse(OAddressBeforeMerriage)
    	// let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title

    	let HTTPAfterMerriageVillage = HTTPResponse.data;

    	let afterMerriageVillageArray = HTTPAfterMerriageVillage
    		.filter(item => item.Name !== "---Select---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Subdistrictcode": item.Subdistrictcode, "Villagecode": item.Villagecode, "Villagename": item.Villagename }),
    			title: String(item.Villagename)
    		}));


    	// let beforeMarriageTaluka = true;
    	// if (_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    	// 	beforeMarriageTaluka = false;
    	// }
    	let parsedOAddressBeforeMerriage = tryParse(OAddressBeforeMerriage, "OAddressBeforeMerriage", 'case_village-After-married-woman');
    	let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title;


    	let beforeMarriage = true
    	if(_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो"){
    	beforeMarriage = false
    	}





    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMariedWomen": "Woman",
    			"LabelMariedWomanMiddleName": translation.WOMAN_Details_Screen.LabelMariedWomanMiddleName[language], // "Maiden Name",
    			"LabelMarriageDate": translation.WOMAN_Details_Screen.LabelMarriageDate[language], // "Marriage Date",
    			"LabelIsMarriedWoman": translation.WOMAN_Details_Screen.LabelIsMarriedWoman[language], // "Is Beneficiary a married woman?",
    			"LabelAddressBeforeMerriage": translation.WOMAN_Details_Screen.LabelAddressBeforeMerriage[language], // "Address Before Marriage(same as above)?",
    			"LabelPostMarriagename": translation.WOMAN_Details_Screen.LabelPostMarriagename[language], // "Post Marriage name(along with husband's name)",
    			"LabelResidingBeforMarriageYear": translation.WOMAN_Details_Screen.LabelResidingBeforMarriageYear[language], // "Residing Period before marriage and No. of years",
    			"LabelPlaceofBirthofHusband": translation.WOMAN_Details_Screen.LabelPlaceofBirthofHusband[language], // "Place of Birth of Husband",
    			"LabelDateofBirthofHusband": translation.WOMAN_Details_Screen.LabelDateofBirthofHusband[language], // "Date of Birth of Husband",
    			"LabelFillOutAddress": translation.WOMAN_Details_Screen.LabelFillOutAddress[language], // "Address",
    			"LabelFillOutBuildingName": translation.WOMAN_Details_Screen.LabelFillOutBuildingName[language], // "Building",
    			"LabelFillOutSectionName": translation.WOMAN_Details_Screen.LabelFillOutSectionName[language], // "Section",
    			"LabelFillOutStreetName": translation.WOMAN_Details_Screen.LabelFillOutStreetName[language], // "Street",
    			"LabelFillOutLandmarkName": translation.WOMAN_Details_Screen.LabelFillOutLandmarkName[language], // "Landmark",
    			"LabelFilloutDistrict": translation.WOMAN_Details_Screen.LabelFilloutDistrict[language], // "District",
    			"LabelFilloutTaluka": translation.WOMAN_Details_Screen.LabelFilloutTaluka[language], // "Taluka",
    			"LabelFillOutPincode": translation.WOMAN_Details_Screen.LabelFillOutPincode[language], // "Pincode",
    			"LabelPlacewheremarriagewasregistered": translation.WOMAN_Details_Screen.LabelPlacewheremarriagewasregistered[language], // "Place where marriage was registered",
    			"LabelFilloutVillage": translation.WOMAN_Details_Screen.LabelFilloutVillage[language], // "Village",
    			"LabelAddressAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelAddressAfterMarriedWomen[language], // "Address",
    			"LabelBuildingNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelBuildingNameAfterMarriedWomen[language], // "Building",
    			"LabelSectionNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelSectionNameAfterMarriedWomen[language], // "Section",
    			"LabelStreetNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelStreetNameAfterMarriedWomen[language], // "Street",
    			"LabelLandmarkNameAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelLandmarkNameAfterMarriedWomen[language], // "Landmark",
    			"LabelDistrictAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelDistrictAfterMarriedWomen[language], // "District",
    			"LabelTalukaAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelTalukaAfterMarriedWomen[language], // "Taluka",
    			"HeadingAddressBeforeMerriage": translation.WOMAN_Details_Screen.HeadingAddressBeforeMerriage[language], // "Address Before Marriage",
    			"HeadingMarriedWomanDetails": translation.WOMAN_Details_Screen.HeadingMarriedWomanDetails[language], // "Is Beneficiary a married woman? (Yes/No)",
    			"HeadingAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddressforMarriedWomen[language], // "Address Before Marriage",
    			"HeadingFillOutAddressforMarriedWomen": translation.WOMAN_Details_Screen.HeadingFillOutAddressforMarriedWomen[language], // "Address for Married Women",
    			"HeadingAddAfterMarriedWomen": translation.WOMAN_Details_Screen.HeadingAddAfterMarriedWomen[language], // "Address for Married Women(After marriage)"


    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisiblityPostMarriagename": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisiblityFillOutAddress": beforeMarriage,
    			"VisiblityFillOutBuildingName": beforeMarriage,
    			"VisiblityFillOutSectionName": beforeMarriage,
    			"VisiblityFillOutStreetName": beforeMarriage,
    			"VisiblityFillOutLandmarkName": beforeMarriage,
    			"VisibilityFilloutDistrictList": beforeMarriage,
    			"VisibilityFilloutTalukaList": beforeMarriage,
    			"VisibilityOccupationofHusbandList": true,
    			"VisiblityMarriedWomanHusbandName": true,
    			"VisibilityRadioAddressforMarriedWomen": true,
    			"VisibilityHeadingFillOutAddforMarriedWomen": beforeMarriage,
    			"VisibilityFilloutVillageList": beforeMarriage,
    			"VisiblityFillOutPincode": beforeMarriage,
    			"VisibilityHeadingAddressAfterMarriedWomen": true,
    			"VisibilityRadioAddressAfterMarriedWomen": true,
    			"VisibilityHeadingAddAfterMarriedWomen": true,
    			"VisiblityAddressAfterMarriedWomen": true,
    			"VisiblityBuildingNameAfterMarriedWomen": true,
    			"VisiblitySectionNameAfterMarriedWomen": true,
    			"VisiblityStreetNameAfterMarriedWomen": true,
    			"VisiblityLandmarkNameAfterMarriedWomen": true,
    			"VisibilityDistrictListAfterMarriedWomen": true,
    			"VisibilityTalukaListAfterMarriedWomen": true,
    			"VisibilityVillageListAfterMarriedWomen": true,
    			"VisiblityPincodeAfterMarriedWomen": false,
    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,


    			"ListVillageAfterMarriedWomen": afterMerriageVillageArray
    		}
    	}



    	break;
    }

    case 'village-After-married-woman': {
    	// let { ORadioAddressAfterMarriedWomen , OAddressBeforeMerriage} = {{data}}

    	let parsedOAddressBeforeMerriage = tryParse(OAddressBeforeMerriage, "OAddressBeforeMerriage", 'case_village-After-married-woman');
    	let _OAddressBeforeMerriage = parsedOAddressBeforeMerriage.title;

    	// let beforeMarriageVillage = true
    	// if (_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो") {
    	// 	beforeMarriageVillage = false
    	// }

    	let beforeMarriage = true
    	if(_OAddressBeforeMerriage === "Yes" || _OAddressBeforeMerriage === "हो"){
    	beforeMarriage = false
    	}


    	// let translation = {{TRANSLATIONS}}
    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale } = parsedExtraDetails
    	// let  language = locale;
    	selectedLanguage = language;


    	payloadToEncrypt = {
    		"version": version,
    		"screen": "WOMAN_MARRIED",
    		"data": {
    			...data,
    			"SwitchComponentForMarriedWomen": "Woman",

    			// "LabelMariedWomanMiddleName":"Maiden Name",
    			// "LabelMarriageDate":"Marriage Date",
    			// "LabelIsMarriedWoman": "Is Beneficiary a married woman?",
    			// "LabelAddressBeforeMerriage":"Address Before Marriage(same as above)?",
    			// "LabelPostMarriagename":"Post Marriage name(along with husband's name)",
    			// "LabelResidingBeforMarriageYear":"Residing Period befor marriage and No. of year",
    			// "LabelPlaceofBirthofHusband":"Place of Birth of Husband",
    			// "LabelDateofBirthofHusband":"Date of Birth of Husband",
    			// "LabelFillOutAddress":"Address",
    			// "LabelFillOutBuildingName":"Building",
    			// "LabelFillOutSectionName":"Section",
    			// "LabelFillOutStreetName":"Street",
    			// "LabelFillOutLandmarkName":"Landmark",
    			// "LabelFilloutDistrict":"District",
    			// "LabelFilloutTaluka":"Taluka",
    			// "LabelFillOutPincode":"Pincode",
    			// "LabelPlacewheremarriagewasregistered":"Place where marriage was registered",
    			// "LabelFilloutVillage":"Village",
    			// "LabelAddressAfterMarriedWomen":"Address",
    			// "LabelBuildingNameAfterMarriedWomen":"Building",
    			// "LabelSectionNameAfterMarriedWomen":"Section",
    			// "LabelStreetNameAfterMarriedWomen":"Street",
    			// "LabelLandmarkNameAfterMarriedWomen":"Landmark",
    			// "LabelDistrictAfterMarriedWomen":"District",
    			// "LabelTalukaAfterMarriedWomen":"Taluka",
    			// "LabelFooterButtonWomanScreen":"submit",

    			// "HeadingAddressBeforeMerriage":"Address Before Merriage",
    			// "HeadingMarriedWomanDetails":"Is Beneficiary a married woman? (Yes/No)",
    			// "HeadingAddressforMarriedWomen":"Address Before Marriage",
    			// "HeadingFillOutAddressforMarriedWomen":"Address for Married Women",
    			// "HeadingAddAfterMarriedWomen":"Address for Married Women(After marriage)",
    			"LabelPincodeAfterMarriedWomen": translation.WOMAN_Details_Screen.LabelPincodeAfterMarriedWomen[language], // "Pincode"



    			"VisibilityHeadingMarriedWomanDetails": true,
    			"VisiblityPlaceofBirthofHusband": true,
    			"VisiblityPlacewheremarriagewasregistered": true,
    			"VisibilityDateofBirthofHusband": true,
    			"VisibilityResidingBeforMarriageYear": true,
    			"VisiblityPostMarriagename": true,
    			"VisibilityAddressBeforeMerriage": true,
    			"VisibilityHeadingAddBeforeMerriage": true,
    			"VisibilityHeadingAddressforMarriedWomen": false,
    			"VisiblityFillOutAddress": beforeMarriage,
    			"VisiblityFillOutBuildingName": beforeMarriage,
    			"VisiblityFillOutSectionName": beforeMarriage,
    			"VisiblityFillOutStreetName": beforeMarriage,
    			"VisiblityFillOutLandmarkName": beforeMarriage,
    			"VisibilityFilloutDistrictList": beforeMarriage,
    			"VisibilityFilloutTalukaList": beforeMarriage,
    			"VisibilityOccupationofHusbandList": true,
    			"VisiblityMarriedWomanHusbandName": true,
    			"VisibilityRadioAddressforMarriedWomen": true,
    			"VisibilityHeadingFillOutAddforMarriedWomen": beforeMarriage,
    			"VisibilityFilloutVillageList": beforeMarriage,
    			"VisiblityFillOutPincode": beforeMarriage,
    			"VisibilityHeadingAddressAfterMarriedWomen": true,
    			"VisibilityRadioAddressAfterMarriedWomen": true,
    			"VisibilityHeadingAddAfterMarriedWomen": true,
    			"VisiblityAddressAfterMarriedWomen": true,
    			"VisiblityBuildingNameAfterMarriedWomen": true,
    			"VisiblitySectionNameAfterMarriedWomen": true,
    			"VisiblityStreetNameAfterMarriedWomen": true,
    			"VisiblityLandmarkNameAfterMarriedWomen": true,
    			"VisibilityDistrictListAfterMarriedWomen": true,
    			"VisibilityTalukaListAfterMarriedWomen": true,
    			"VisibilityVillageListAfterMarriedWomen": true,
    			"VisiblityPincodeAfterMarriedWomen": true,
    			"EnabilityFooterWomanScreen": true,
    			"EnabledResidingBeforMarriageYear": true,
    			"EnabledDateofBirthofHusband": true,


    		}
    	}

    	break;
    }

    case 'Footer-woman-details': {
    	payloadToEncrypt = {
    		"version": version,
    		"screen": "BENEFICIARY",
    		"data": {
    			...data,
    			"EnabilityFooterThirdScreen": true,
    			"error_message": language== "1"?"Woman Details Has saved!":"महिलेची माहिती सेव्ह झाली आहे"
    		}
    	}
    	break;
    }

    default:
    	// console.log('Unknown type:', type);
    	// let extraDetails = {{data.extraDetails}}
    	// let parsedExtraDetails = JSON.parse(extraDetails)
    	// let translation = {{TRANSLATIONS}}

    	// let parsedExtraDetails = JSON.parse({{data.extraDetails}})
    	// let { locale, extraDetails } = parsedExtraDetails
    	// let  language = locale;

    	selectedLanguage = language;


    	let HTTPfromDifferentState = HTTPResponse.data;
    	// let HTTPResponse = {{HTTPResponse}}.data


    	let fromDifferentStateArray = HTTPfromDifferentState
    		.filter(item => item.Name !== "---निवडा---" && item.Value !== null)
    		.map(item => ({
    			id: JSON.stringify({ "Name": item.Name, "Value": item.Value }),//String(item.Name),
    			title: String(item.Name)
    		}));



    	payloadToEncrypt = {
    		"version": version,
    		"screen": "MIGRATION",
    		"data": {
    			...data,
    			"ListMigratedFromDifferentState": fromDifferentStateArray,
    			"VisibilityMigratedFromDifferentState": true,
    			"VisibilityMigrationDetails": false,

    			"VisibilityYearsOfResidenceInMaharashtra": false,
    			"VisibilityNativePlaceBeforeMigration": false,
    			"VisibilityReasonformigration": false,
    			"FooterEnableMigration": true,
    			"SwithCaseForMigrationDetailsofBeneficiar": "Migration Details of Beneficiary",
    			"VisibilityMigrationplace": true,

    			"VisibilityMigrationFromYear": false,

    			"VisibilityAddMigrationDetailsOfBenefecia": false,

    			"VisibilityMovableProperty": false,
    			"VisibilityPropertyDetailsHeading": false,
    			"VisibilityPropertyAddress": false,
    			"VisibilityPropertyBuilding": false,
    			"VisibilityPropertySection": false,
    			"VisibilityPropertyStreet": false,
    			"VisibilityPropertyLandMark": false,

    			"VisibilityPropertyDistrict": false,

    			"VisibilityPropertyTaluka": false,

    			"VisibilityPropertyVillage": false,
    			"VisibilityPropertyPinCode": false,
    			"VisibilityHeadingMovableProperty": false,

    			"ListFamilyDetailsTOcheck": [
    				{
    					"id": "Daughter",
    					"title": "Daughter"
    				}
    			],
    			"VisibilityPropertyHolderRelationBenefici": false,
    			"VisibilityPropertyDetails": false,
    			"VisibilityBeneficiaryfathHusbandPlaceRes": "Beneficiary's father's / husband's place residence",
    			"VisibilityFatherHusbandPlaceOfRes": false,
    			"VisibiliAtthetimeofbirthofthebeneficiary": false,
    			"VisibilityOutSidePlaceRes": false,
    			"VisibilityPlaceofemployment": false,
    			"VisibilityHeadingWhetherApplicantIsBenef": false,

    			"VisibilityOtherDistrictyes": false,

    			"VisibilityYesOtherTaluka": false,

    			"VisibilityYesOtherVillage": false,
    			"VisibilityYesOtherPinCode": false,

    			"SwitchFamilyMemberDetails": "Family Member Details",

    			"VisibilityRelationshipWithBeneficiary": false,
    			"VisibilityFamilyMemberName": false,
    			"VisibilityFamilyEmbbdedDetails": false,
    			"VisibilityDeleteFamilyMembersDetails": false,
    			"VisibilityMigrationToYear": false,
    			// "LabledeleteMigrationEmbbeded": "Delete Migration Details",
    			"VisibilityDeleteMigrationDetails": false,
    			"HeadingCertificate": "Certificate",
    			"VisibilityHeadingCertificate": false,
    			"VisibilityReason": false,
    			"VisibilityWhetherApplicantsBeneOfGov": false,
    			"VisibilityHeadinWhetherApplicantIsBenefg": false,
    			"VisibilityWhetherApplicantsBeneOfGov": false,
    			"VisibilityMigrationDetailsCheckBox": false,
    			"VisibilityHeadingMigrationDetailsOfBenef": false,
    			"VisibilityHeadingFamilyMemDetailofBenefi": false,
    			"VisibilityFamilyMemberCheck": false,
    			"VisibilityEmbAddMoreFamilyMemberDetails": true,

    			"HeadingMigrationDetailsOfBenefeciary": "Migration Details of Beneficiary",


    			"extraDetails": JSON.stringify({ ...parsedExtraDetails, "addMigrations": [], "addFamilyDetails": [] }),


    			//Heading
    			"HeadingMigrationDetails": translation.SCREEN_MIGRATION_DETAILS.HeadingMigrationDetails[language],




    			//label
    			"LabelMigratedFromDifferentState": translation.SCREEN_MIGRATION_DETAILS.LabelMigratedFromDifferentState[language],
    			"LabelYearsOfResidenceInMaharashtra": translation.SCREEN_MIGRATION_DETAILS.LabelYearsOfResidenceInMaharashtra[language],
    			"LabelNativePlaceBeforMigration": translation.SCREEN_MIGRATION_DETAILS.LabelNativePlaceBeforMigration[language],
    			"LabelReasonForMaharashtra": translation.SCREEN_MIGRATION_DETAILS.LabelReasonForMaharashtra[language],
    			"LabelReasonformigration": translation.SCREEN_MIGRATION_DETAILS.LabelReasonformigration[language],
    			"FooterLabelMigration": translation.SCREEN_MIGRATION_DETAILS.FooterLabelMigration[language],
    			"LabelMigrationPlace": translation.SCREEN_MIGRATION_DETAILS.LabelMigrationPlace[language],
    			"LabelMigrationFromYear": translation.SCREEN_MIGRATION_DETAILS.LabelMigrationFromYear[language],
    			"LabelToYear": translation.SCREEN_MIGRATION_DETAILS.LabelToYear[language],
    			"LabelEmbededForMigrationDetails": translation.SCREEN_MIGRATION_DETAILS.LabelEmbededForMigrationDetails[language],
    			"LabelDetailsOfMovableProperty": translation.SCREEN_MIGRATION_DETAILS.LabelDetailsOfMovableProperty[language],
    			"LabelheadingPropertyDetails": translation.SCREEN_MIGRATION_DETAILS.LabelheadingPropertyDetails[language],
    			"LabelPropertyAddress": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyAddress[language],
    			"LabelPropertyBuilding": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyBuilding[language],
    			"LabelPropertySection": translation.SCREEN_MIGRATION_DETAILS.LabelPropertySection[language],
    			"LabelPropertyStreet": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyStreet[language],
    			"LabelPropertyLandMark": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyLandMark[language],
    			"LabelPropertyDistrict": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyDistrict[language],
    			"LabelPropertyTaluka": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyTaluka[language],
    			"LabelPropertyVillage": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyVillage[language],
    			"LabelPropertyPinCode": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyPinCode[language],
    			"LabelHeadingMovableProperty": translation.SCREEN_MIGRATION_DETAILS.LabelHeadingMovableProperty[language],
    			"LabelPropertyHolderRelationWithBeneficia": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyHolderRelationWithBeneficia[language],
    			"LabelPropertyDetails": translation.SCREEN_MIGRATION_DETAILS.LabelPropertyDetails[language],
    			"LabelBeneficiaryFathHusPlaceOfResi": translation.SCREEN_MIGRATION_DETAILS.LabelBeneficiaryFathHusPlaceOfResi[language],
    			"LabelAtTheTimeOfBirthOfTheBeneficiary": translation.SCREEN_MIGRATION_DETAILS.LabelAtTheTimeOfBirthOfTheBeneficiary[language],
    			// "Label": translation.SCREEN_MIGRATION_DETAILS.Label[language],
    			"LabelOutSideMahaPlaceRes": translation.SCREEN_MIGRATION_DETAILS.LabelOutSideMahaPlaceRes[language],
    			"LabelPlaceOfEmployment": translation.SCREEN_MIGRATION_DETAILS.LabelPlaceOfEmployment[language],
    			"LabelWhetherApplicantBeneficiaryOfGoverm": translation.SCREEN_MIGRATION_DETAILS.LabelWhetherApplicantBeneficiaryOfGoverm[language],
    			"LabelRadioWhetherApplicantisBenefiGov": translation.SCREEN_MIGRATION_DETAILS.LabelRadioWhetherApplicantisBenefiGov[language],
    			"LabelIfInOtherDistrictYes": translation.SCREEN_MIGRATION_DETAILS.LabelIfInOtherDistrictYes[language],
    			"LabelYesOtherDistrictTaluka": translation.SCREEN_MIGRATION_DETAILS.LabelYesOtherDistrictTaluka[language],
    			"LabelYesOtherTaluka": translation.SCREEN_MIGRATION_DETAILS.LabelYesOtherTaluka[language],
    			"LabelYesOtherVillage": translation.SCREEN_MIGRATION_DETAILS.LabelYesOtherVillage[language],
    			"LabelYesOtherPinCode": translation.SCREEN_MIGRATION_DETAILS.LabelYesOtherPinCode[language],
    			"LabelrelationShipWithBeneficiary": translation.SCREEN_MIGRATION_DETAILS.LabelrelationShipWithBeneficiary[language],
    			"LabelFamilyMemberName": translation.SCREEN_MIGRATION_DETAILS.LabelFamilyMemberName[language],
    			"LabelEmbbededAddFamilyDetails": translation.SCREEN_MIGRATION_DETAILS.LabelEmbbededAddFamilyDetails[language],
    			"LabeldeleteFamilyDetails": translation.SCREEN_MIGRATION_DETAILS.LabeldeleteFamilyDetails[language],
    			"LabelReason": translation.SCREEN_MIGRATION_DETAILS.LabelReason[language],
    			"LabelAddMoreMigrationDetails": translation.SCREEN_MIGRATION_DETAILS.LabelAddMoreMigrationDetailss[language],
    			"LabelFamilyMemberDetailsofBeneficiary": translation.SCREEN_MIGRATION_DETAILS.LabelFamilyMemberDetailsofBeneficiary[language],
    			"LabelAddMoreFamilyMembersDetailsEmbbeded": translation.SCREEN_MIGRATION_DETAILS.LabelAddMoreFamilyMembersDetailsEmbbeded[language],
    			"LabelFamilyCheckList": translation.SCREEN_MIGRATION_DETAILS.LabelFamilyCheckList[language],
    			"LabelHeadingWhetherApplicantIsBeneficiar": translation.SCREEN_MIGRATION_DETAILS.LabelHeadingWhetherApplicantIsBeneficiar[language],
    			"LabledeleteMigrationEmbbeded": translation.SCREEN_MIGRATION_DETAILS.LabledeleteMigrationEmbbeded[language],
    			"LabelMigrationDetailsList": translation.SCREEN_MIGRATION_DETAILS.LabelMigrationDetailsList[language],
    			"LabelAddMoreMigrationDetailss": translation.SCREEN_MIGRATION_DETAILS.LabelAddMoreMigrationDetailss[language],
    			"ScreenNameUploadDocument": translation.SCREEN_BENEFICIARY.ScreenNameUploadDocument[language],
    			"ScreenNameMigrationDetails": translation.SCREEN_BENEFICIARY.ScreenNameMigrationDetails[language],
    			"ListYearsOfResidenceInMharashtra": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListMigrationFromyear": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListMigrationToYear": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListPropertyTaluka": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListPropertyVillage": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListPropertyDistrict": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListPropertyHolderRelationWithBeneficia": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"LablelMigrationDetailsList": translation.SCREEN_MIGRATION_DETAILS.LablelMigrationDetailsList[language],
    			"ListOtherDistrictYes": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListOtherDistrictTaluka": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListYesOtherVillage": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListWhetherApplicantIsBeneOfGovScheme": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListRelationshipWihBeneficiary": [{ "id": "For 3 Year", "title": "For 3 Year" }],
    			"ListFamilyDetailsTOcheck": [{ "id": "For 3 Year", "title": "For 3 Year" }],


    		}
    	};
    	break;

}

// taluka-Benef-Pre

{{payloadToEncrypt}} = payloadToEncrypt;
