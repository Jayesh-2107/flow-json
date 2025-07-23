

// const flowsOutput = {{flowsOutput}}
// const TOKEN = {{tokenHTTP}}.data


// const getRTSUserDetails = {{getRTSUserDetails}}.data;

const _DivisionID = getRTSUserDetails.DivisionID;

const _OSalutation =  JSON.parse(flowsOutput.WELCOME.OSalutation).Value;
const _OFatherSalutation = JSON.parse(flowsOutput.WELCOME.OFatherSalutation).Value;
const _OGender = JSON.parse(flowsOutput.WELCOME.OGender).Name;
const _OOccupation = JSON.parse(flowsOutput.WELCOME.OOccupation).Value;
const _ODistrict = JSON.parse(flowsOutput.WELCOME.ODistrict).Districtcode;
const _OTaluka = JSON.parse(flowsOutput.WELCOME.OTaluka).SubDistrictcode;
const _OVillage = JSON.parse(flowsOutput.WELCOME.OVillage).Villagecode;

const _ORelationOfApplicantWithBeneficiary = JSON.parse(flowsOutput.BENEFICIARY.ORelationOfApplicantWithBeneficiary).Value;
const _OBenefPreAddressRadio = flowsOutput.BENEFICIARY.OBenefPreAddressRadio;//JSON.parse(flowsOutput.BENEFICIARY.OBenefPreAddressRadio).title;
const _OBirthAddressAsAbove = flowsOutput.BENEFICIARY.OBirthAddressAsAbove;//JSON.parse(flowsOutput.BENEFICIARY.OBirthAddressAsAbove).title;
const _OBirthDistrict = flowsOutput?.BENEFICIARY?.OBirthDistrict ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthDistrict)?.districtCode || "") : "";//JSON.parse(flowsOutput.BENEFICIARY.OBirthDistrict).districtCode ?? "";
const _OBirthTaluka = flowsOutput?.BENEFICIARY?.OBirthTaluka ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthTaluka)?.SubDistrictcode || "") : "";//JSON.parse(flowsOutput.BENEFICIARY.OBirthTaluka).SubDistrictcode ?? "";
const _OBirthVillage = flowsOutput?.BENEFICIARY?.OBirthVillage ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthVillage)?.Villagecode || "") : "";//JSON.parse(flowsOutput.BENEFICIARY.OBirthVillage).Villagecode ?? "";
// const _OBirthDistrict = flowsOutput?.BENEFICIARY?.OBirthDistrict ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthDistrict)?.districtCode || "") : "";
// const _OBirthTaluka = flowsOutput?.BENEFICIARY?.OBirthTaluka ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthTaluka)?.SubDistrictcode || "") : "";
// const _OBirthVillage = flowsOutput?.BENEFICIARY?.OBirthVillage ? (JSON.parse(flowsOutput.BENEFICIARY.OBirthVillage)?.Villagecode || "") : "";



const _ODistrictBenefPre = flowsOutput?.Beneficiary_Present_Address?.ODistrictBenefPre ? (JSON.parse(flowsOutput.Beneficiary_Present_Address.ODistrictBenefPre)?.districtCode || "") : "";
const _OTalukaBenefPre = flowsOutput?.Beneficiary_Present_Address?.OTalukaBenefPre ? (JSON.parse(flowsOutput.Beneficiary_Present_Address.OTalukaBenefPre)?.SubDistrictcode || "") : "";
const _OVillageBenefPre = flowsOutput?.Beneficiary_Present_Address?.OVillageBenefPre ? (JSON.parse(flowsOutput.Beneficiary_Present_Address.OVillageBenefPre)?.Villagecode || "") : "";
// const _ODistrictBenefPre = JSON.parse(flowsOutput.Beneficiary_Present_Address.ODistrictBenefPre).districtCode;
// const _OTalukaBenefPre = JSON.parse(flowsOutput.Beneficiary_Present_Address.OTalukaBenefPre).SubDistrictcode;
// const _OVillageBenefPre = JSON.parse(flowsOutput.Beneficiary_Present_Address.OVillageBenefPre).Villagecode;

const _OIsMarriedWoman = JSON.parse(flowsOutput.WOMAN_MARRIED.OIsMarriedWoman).value;
const _OAddressBeforeMerriage = JSON.parse(flowsOutput.WOMAN_MARRIED.OAddressBeforeMerriage).title;
const _OFilloutDistrict = JSON.parse(flowsOutput.WOMAN_MARRIED.OFilloutDistrict).districtCode;
const _OFilloutTaluka = JSON.parse(flowsOutput.WOMAN_MARRIED.OFilloutTaluka).SubDistrictcode;
const _OFilloutVillage = JSON.parse(flowsOutput.WOMAN_MARRIED.OFilloutVillage).Villagecode;
const _OOccupationofHusband = JSON.parse(flowsOutput.WOMAN_MARRIED.OOccupationofHusband).Value;
const _ORadioAddressAfterMarriedWomen = JSON.parse(flowsOutput.WOMAN_MARRIED.ORadioAddressAfterMarriedWomen).title;


const _ODistrictAfterMarriedWomen = flowsOutput?.WOMAN_MARRIED?.ODistrictAfterMarriedWomen ? (JSON.parse(flowsOutput.WOMAN_MARRIED.ODistrictAfterMarriedWomen)?.districtCode || "") : "";
const _OTalukaAfterMarriedWomen = flowsOutput?.WOMAN_MARRIED?.OTalukaAfterMarriedWomen ? (JSON.parse(flowsOutput.WOMAN_MARRIED.OTalukaAfterMarriedWomen)?.SubDistrictcode || "") : "";
const _OVillageAfterMarriedWomen = flowsOutput?.WOMAN_MARRIED?.OVillageAfterMarriedWomen ? (JSON.parse(flowsOutput.WOMAN_MARRIED.OVillageAfterMarriedWomen)?.Villagecode || "") : "";
// const _ODistrictAfterMarriedWomen = JSON.parse(flowsOutput.WOMAN_MARRIED.ODistrictAfterMarriedWomen).districtCode;
// const _OTalukaAfterMarriedWomen = JSON.parse(flowsOutput.WOMAN_MARRIED.OTalukaAfterMarriedWomen).SubDistrictcode;
// const _OVillageAfterMarriedWomen = flowsOutput.WOMAN_MARRIED.OVillageAfterMarriedWomen && JSON.parse(flowsOutput.WOMAN_MARRIED.OVillageAfterMarriedWomen).Villagecode;


// Optional May not came in some cases
const _OMigratedFromDifferentState = flowsOutput.MIGRATION.OMigratedFromDifferentState && JSON.parse(flowsOutput.MIGRATION.OMigratedFromDifferentState).Value;
const _OPropertyDistrict = flowsOutput.MIGRATION.OPropertyDistrict && JSON.parse(flowsOutput.MIGRATION.OPropertyDistrict).districtCode;
const _OPropertyTaluka = flowsOutput.MIGRATION.OPropertyTaluka && JSON.parse(flowsOutput.MIGRATION.OPropertyTaluka).SubDistrictcode 
const _OPropertyVillage = flowsOutput.MIGRATION.OPropertyVillage && JSON.parse(flowsOutput.MIGRATION.OPropertyVillage).Villagecode;
const _OWhetherApplicantIsBeneficiaryOfGovScheme = flowsOutput.MIGRATION.OWhetherApplicantIsBeneficiaryOfGovScheme && JSON.parse(flowsOutput.MIGRATION.OWhetherApplicantIsBeneficiaryOfGovScheme).Name
const _OOtherDistrictyes = flowsOutput.MIGRATION.OOtherDistrictyes && JSON.parse(flowsOutput.MIGRATION.OOtherDistrictyes).districtCode;
const _OYesOtherDistrictTaluka = flowsOutput.MIGRATION.OYesOtherDistrictTaluka && JSON.parse(flowsOutput.MIGRATION.OYesOtherDistrictTaluka).SubDistrictcode;
const _OLabelYesOtherVillage = flowsOutput.MIGRATION.OLabelYesOtherVillage && JSON.parse(flowsOutput.MIGRATION.OLabelYesOtherVillage).Villagecode;
const _OYearsOfResidenceAtCurrentAddress = flowsOutput.BENEFICIARY.OYearsOfResidenceAtCurrentAddress && JSON.parse(flowsOutput.BENEFICIARY.OYearsOfResidenceAtCurrentAddress).Name


//extraDetails Parsed...
const parsedExtraDetails = JSON.parse(flowsOutput.extraDetails);
// ------------------- education-details ---------------------
const extraDetails = JSON.parse(flowsOutput.extraDetails);
const _ListEducationDetailsofBeneficiaryModel = (extraDetails.addDetailsArray || []).map(entry => {
  const uuid = entry.id.split("|")[1];
  const universityMatch = entry.description.match(/संस्थेचे नाव: (.+)/);
  const admissionMatch = entry.description.match(/प्रवेश वर्ष: (\d+)/);
  const completionMatch = entry.description.match(/पूर्णता वर्ष: (\d+)/);
  const instituteMatch = entry.description.match(/शैक्षणिक ठिकाण: (.+)/);

  return {
    EducationDetailsofBeneficiary: uuid,
    University: universityMatch ? universityMatch[1].trim() : '',
    AdmissionYear: admissionMatch ? admissionMatch[1] : '',
    CompletionYear: completionMatch ? completionMatch[1] : '',
    InstituteDetails: instituteMatch ? instituteMatch[1].trim() : ''
  };
});
// ------------------- education-details ---------------------

// ------------------- MIGRATION ---------------------
const _ListMigrationDetailsofBeneficiaryModel = (extraDetails.addMigrations || []).map(entry => {
  const migrationPlaceMatch = entry.description.match(/स्थलांतराचे ठिकाण: (.+)/);
  const fromYearMatch = entry.description.match(/वर्षापासून: (\d+)/);
  const toYearMatch = entry.description.match(/ते वर्ष: (\d+)/);

  return {
    MigrationPlace: migrationPlaceMatch ? migrationPlaceMatch[1].trim() : '',
    FromYear: fromYearMatch ? fromYearMatch[1] : '',
    ToYear: toYearMatch ? toYearMatch[1] : ''
  };
});
// ------------------- MIGRATION ---------------------

// ------------------- Family Details ---------------------
const _ListApplicantFamilyResidantDetailsModel = (extraDetails.addFamilyDetails || []).map(entry => {
  const uuid = entry.id.split("|")[1];

  const relationMatch = entry.description.match(/संबंध: (.+?)\s/);
  const nameMatch = entry.description.match(/कुटुंबातील सदस्याचे नाव: (.+)/);

  return {
    ApplicantFamilyResidantDetails: uuid,
    Relation: relationMatch ? relationMatch[1].trim() : '',
    FamilyMemberName: nameMatch ? nameMatch[1].trim() : ''
  };
});
// ------------------- Family Details ---------------------

const LangID = JSON.parse(flowsOutput.extraDetails).locale
// const ServiceId = "1253"
const CertificateName = JSON.parse(flowsOutput.WELCOME.OCertificateName).Name;
const ServiceName = CertificateName;//"Age Domicile Certificate";
const UserID = "224a14e9-33e8-4c5a-8d48-fe20d26769f6";
const DivisionId = _DivisionID;
const CertificateType = JSON.parse(flowsOutput.WELCOME.OCertificateName).Name;//"Certificate of Age and Domicile";
const CertificateTypeCode = JSON.parse(flowsOutput.WELCOME.OCertificateName).Value;
const ApplicantSalutation = _OSalutation;
const ApplicantNameEnglish = flowsOutput.WELCOME.OFullNameEnglish?? "";
const ApplicantNameMarathi = flowsOutput.WELCOME.OFullNameMarathi;
const ApplicantFatherSalutation = _OFatherSalutation;
const ApplicantFatherNameEnglish = flowsOutput.WELCOME.OFatherNameEnglish;
const ApplicantFatherNameMarathi = flowsOutput.WELCOME.OFatherNameMarathi;
const ApplicantDOB = flowsOutput.WELCOME.ODateOfBirth;
const ApplicantAge = flowsOutput.WELCOME.OAge;
const ApplicantMobileNo = flowsOutput.WELCOME.OMobileNumber;
const ApplicantGender = _OGender;
const ApplicantEmailID = flowsOutput.WELCOME.OEmailId;
const ApplicantOccupation = _OOccupation;
const ApplicantNationality = "INDIAN";
const ResidingAtPresentAddressSince = '2023';
const ApplicantAddress = flowsOutput.WELCOME.OAddress;
const ApplicantBuilding = flowsOutput.WELCOME.OBuilding;
const ApplicantSection = flowsOutput.WELCOME.OSection;
const ApplicantStreet = flowsOutput.WELCOME.OAddress;
const ApplicantLandmark = flowsOutput.WELCOME.OLandmark;
const ApplicantStateCode = "27";
const ApplicantDistrictCode = _ODistrict;
const ApplicantSubDistrictCode = _OTaluka;
const ApplicantVillageCode = _OVillage;
const ApplicantPinCode = flowsOutput.WELCOME.OPincode;
const BeneficiaryResidingCurrentAddress = _OYearsOfResidenceAtCurrentAddress; //need to handle
const ApplicantResidingMaharashtra = flowsOutput.BENEFICIARY.OApplicantResidingInMaharahtra;
const ApplicantRelationWithBeneficiary = _ORelationOfApplicantWithBeneficiary;
const BeneficiarySalutation = flowsOutput.BENEFICIARY.OBeneficiarySalutation;
const BeneficiaryName = flowsOutput.BENEFICIARY.OBeneficiaryFullName;
const BeneficiaryDOB = flowsOutput.BENEFICIARY.OBenificaryDateofBirth;
const BeneficiaryMobile = flowsOutput.BENEFICIARY.OBeneficiaryMobileNumber;
const PresentAddressSameAsAbove = _OBenefPreAddressRadio;
const PresentAddress = flowsOutput.Beneficiary_Present_Address.OAddressBenefPre ?? "";
const PresentBuilding = flowsOutput.Beneficiary_Present_Address.OBuildingBenefPre ?? "";
const PresentSection = flowsOutput.Beneficiary_Present_Address.OSectionBenefPre ?? "";
const PresentStreet = flowsOutput.Beneficiary_Present_Address.OStreetBenefPre ?? "";
const PresentLandmark = flowsOutput.Beneficiary_Present_Address.OLandmarkBenefPre ?? "";
const PresentDistrictCode = _ODistrictBenefPre;
const PresentSubDistrictCode = _OTalukaBenefPre;
const PresentVillageCode = _OVillageBenefPre;
const PresentPinCode = flowsOutput.Beneficiary_Present_Address.OLandmarkBenefPre ?? ""; //parsedExtraDetails.OPincodeBenefPre;
const BirthAddressSameAsAbove = _OBirthAddressAsAbove;
const BirthAddress = flowsOutput.BENEFICIARY.OBirthAddress ?? "";
const BirthBuilding = flowsOutput.BENEFICIARY.OBirthBuilding;
const BirthSection = flowsOutput.BENEFICIARY.OBirthSection;
const BirthStreet = flowsOutput.BENEFICIARY.OBirthStreet;
const BirthStateCode = "27";
const BirthDistrictCode = _OBirthDistrict;
const BirthSubDistrictCode = _OBirthTaluka;
const BirthVillageCode = _OBirthVillage;
const BirthPinCode = flowsOutput.BENEFICIARY.OBirthPincode ?? "";
const ListEducationDetailsofBeneficiaryModel = _ListEducationDetailsofBeneficiaryModel;

const IsBeneficiaryaMarriedWoman = _OIsMarriedWoman;
const MaidenName = parsedExtraDetails.OMariedWomanMiddleName;
const MarriageDate = flowsOutput.WOMAN_MARRIED.OMarriageDate;
const AddressBeforeMarriageSameasSbove = _OAddressBeforeMerriage;
const BeforeMarriageAddress = flowsOutput.WOMAN_MARRIED.OFillOutAddress;
const BeforeMarriageBuilding = parsedExtraDetails.OFillOutBuildingName;
const BeforeMarriageSection = parsedExtraDetails.OFillOutSectionName;
const BeforeMarriageStreet = parsedExtraDetails.OFillOutStreetName;
const BeforeMarriageLandmark = parsedExtraDetails.OFillOutLandmarkName;
const BeforeMarriageDistrictCode = _OFilloutDistrict;
const BeforeMarriageSubDistrictCode = _OFilloutTaluka;
const BeforeMarriageVillageCode = _OFilloutVillage;
const BeforeMarriagePinCode = flowsOutput.WOMAN_MARRIED.OFillOutPincode;
const PlacewhereMarriageWasRegistered = parsedExtraDetails.OPlacewheremarriagewasregistered;
const PostMarriageNameAlongWithHusbandName = parsedExtraDetails.OPostMarriagename;
const ResidingPeriodBeforMarriageAndNoofYear = flowsOutput.WOMAN_MARRIED.OResidingBeforMarriageYear;
const PlaceofBirthofHusband = parsedExtraDetails.OPlaceofBirthofHusband;
const DateofBirthofHusband = flowsOutput.WOMAN_MARRIED.ODateofBirthofHusband;
const OccupationofHusband = _OOccupationofHusband;
const HusbandName = parsedExtraDetails.OMariedWomanHusbandName;
const AddressAfterMarriageSameasAbove = _ORadioAddressAfterMarriedWomen;
const AfterMarriageAddress = parsedExtraDetails.OAddressAfterMarriedWomen;
const AfterMarriageBuilding = parsedExtraDetails.OBuildingNameAfterMarriedWomen;
const AfterMarriageSection = parsedExtraDetails.OSectionNameAfterMarriedWomen;
const AfterMarriageStreet = parsedExtraDetails.OStreetNameAfterMarriedWomen;
const AfterMarriageLandmark = parsedExtraDetails.OLandmarkNameAfterMarriedWomen;
const AfterMarriageDistrictCode = _ODistrictAfterMarriedWomen;
const AfterMarriageSubDistrictCode = _OTalukaAfterMarriedWomen;
const AfterMarriageVillageCode = _OVillageAfterMarriedWomen;
const AfterMarriagePinCode = flowsOutput.WOMAN_MARRIED.OPincodeAfterMarriedWomen?? "";
const HasBeneficiaryMigratedFromDifferentState = _OMigratedFromDifferentState;
const YearsOfResidenceInMaharashtra = flowsOutput.MIGRATION.OYearsOfResidenceInMaharashtra;
const FamilyNativePlaceBeforeMigrationToMaharashtra = flowsOutput.MIGRATION.ONativePlaceBeforeMigration;
const ReasonforMigration = flowsOutput.MIGRATION.OReasonformigration;
const ListMigrationDetailsofBeneficiaryModel = _ListMigrationDetailsofBeneficiaryModel;

const DetailsOfMovablePropertyBelongToApplicantFatherhusbandInMaharashtra = flowsOutput.MIGRATION.ODetailsOfMovableProperty;
const PropertyAddress = flowsOutput.MIGRATION.OPropertyAddress;
const PropertyBuilding = parsedExtraDetails.OPropertyBuilding;
const PropertySection = parsedExtraDetails.OPropertySection;
const PropertyStreet = parsedExtraDetails.OPropertyStreet;
const PropertyLandmark = parsedExtraDetails.OPropertyLandMark;
const PropertyDistrictCode = _OPropertyDistrict;
const PropertySubDistrictCode = _OPropertyTaluka;
const PropertyVillageCode = _OPropertyVillage;
const PropertyPinCode = flowsOutput.MIGRATION.OPropertyPinCode;
const PropertyHolderRelationwithBeneficiary = "aa6f3900-f4f0-43df-92ba-2433093a2f42"; //need to handle
const PropertyDetail = flowsOutput.MIGRATION.OPropertyDetails;
const Beneficiaryfatherhusbandplaceofresidence = parsedExtraDetails.OBeneficiaryFatherHusbandPlaceOfResidence
const Atthetimeofbirthofthebeneficiaryplaceofresidenceoffather = parsedExtraDetails.OAtthetimeofbirthofthebeneficiary;
const IfBeneficiaryfatherhusbandisstayingoutsideMaharashtrathenplaceofresidence = parsedExtraDetails.OOutSideMahaPlaceRes;
const Placeofemploymentenrolmentforschemeifany = parsedExtraDetails.OPlaceOfEmployment;
const WhetherApplicantIsBeneficiaryOfGovernmentSchemeinOtherDistrict = _OWhetherApplicantIsBeneficiaryOfGovScheme;
const PolicyDistrictCode = _OOtherDistrictyes;
const PolicySubDistrictCode = _OYesOtherDistrictTaluka;
const PolicyVillageCode = _OLabelYesOtherVillage;
const PolicyPinCode = parsedExtraDetails.OYesOtherPinCode;
const ListApplicantFamilyResidantDetailsModel = _ListApplicantFamilyResidantDetailsModel;
const Reason = flowsOutput.MIGRATION.OReason;


const saveApiPayload = {
  LangID: LangID,
  ServiceId: "1253", //constant
  ServiceName: ServiceName, //constant
  UserID: "224a14e9-33e8-4c5a-8d48-fe20d26769f6", ///...bot level
  DivisionId: "6", //constant
  CertificateType: CertificateType, //constant 
  CertificateTypeCode: CertificateTypeCode, //constant Not constant
  ApplicantSalutation: ApplicantSalutation,
  ApplicantNameEnglish: ApplicantNameEnglish,
  ApplicantNameMarathi: ApplicantNameMarathi,
  ApplicantFatherSalutation: ApplicantFatherSalutation,
  ApplicantFatherNameEnglish: ApplicantFatherNameEnglish,
  ApplicantFatherNameMarathi: ApplicantFatherNameMarathi,
  ApplicantDOB: ApplicantDOB,
  ApplicantAge: ApplicantAge,
  ApplicantMobileNo: ApplicantMobileNo,
  ApplicantGender: ApplicantGender,
  ApplicantEmailID: ApplicantEmailID,
  ApplicantOccupation: ApplicantOccupation,
  ApplicantNationality: ApplicantNationality, //constant
  ResidingAtPresentAddressSince: ResidingAtPresentAddressSince, //need to handle in basic screen - Dependency
  ApplicantAddress: ApplicantAddress,
  ApplicantBuilding: ApplicantBuilding,
  ApplicantSection: ApplicantSection,
  ApplicantStreet: ApplicantStreet,
  ApplicantLandmark: ApplicantLandmark,
  ApplicantStateCode: ApplicantStateCode, //constant
  ApplicantDistrictCode: ApplicantDistrictCode,
  ApplicantSubDistrictCode: ApplicantSubDistrictCode,
  ApplicantVillageCode: ApplicantVillageCode,
  ApplicantPinCode: ApplicantPinCode,
  BeneficiaryResidingCurrentAddress: BeneficiaryResidingCurrentAddress, //Name.... need to handle in beneficiary
  ApplicantResidingMaharashtra: ApplicantResidingMaharashtra,
  ApplicantRelationWithBeneficiary: ApplicantRelationWithBeneficiary,
  BeneficiarySalutation: BeneficiarySalutation,
  BeneficiaryName: BeneficiaryName,
  BeneficiaryDOB: BeneficiaryDOB,
  BeneficiaryMobile: BeneficiaryMobile ?? "",
  PresentAddressSameAsAbove: PresentAddressSameAsAbove, //.Name
  PresentAddress: PresentAddress,
  PresentBuilding: PresentBuilding,
  PresentSection: PresentSection,
  PresentStreet: PresentStreet,
  PresentLandmark: PresentLandmark,
  PresentDistrictCode: PresentDistrictCode,
  PresentSubDistrictCode: PresentSubDistrictCode,
  PresentVillageCode: PresentVillageCode,
  PresentPinCode: PresentPinCode,
  BirthAddressSameAsAbove: BirthAddressSameAsAbove, //.Name
  BirthAddress: BirthAddress,
  BirthBuilding: BirthBuilding ?? "",
  BirthSection: BirthSection ?? "",
  BirthStreet: BirthStreet ?? "",
  BirthStateCode: BirthStateCode,
  BirthDistrictCode: BirthDistrictCode,
  BirthSubDistrictCode: BirthSubDistrictCode,
  BirthVillageCode: BirthVillageCode,
  BirthPinCode: BirthPinCode,
  ListEducationDetailsofBeneficiaryModel:
    ListEducationDetailsofBeneficiaryModel,
  //done

  IsBeneficiaryaMarriedWoman: IsBeneficiaryaMarriedWoman,
  MaidenName: MaidenName ?? "",
  MarriageDate: MarriageDate,
  AddressBeforeMarriageSameasSbove: AddressBeforeMarriageSameasSbove,
  BeforeMarriageAddress: BeforeMarriageAddress, //These all about fill out
  BeforeMarriageBuilding: BeforeMarriageBuilding ?? "",
  BeforeMarriageSection: BeforeMarriageSection ?? "",
  BeforeMarriageStreet: BeforeMarriageStreet ?? "",
  BeforeMarriageLandmark: BeforeMarriageLandmark ?? "",
  BeforeMarriageDistrictCode: BeforeMarriageDistrictCode,
  BeforeMarriageSubDistrictCode: BeforeMarriageSubDistrictCode,
  BeforeMarriageVillageCode: BeforeMarriageVillageCode,
  BeforeMarriagePinCode: BeforeMarriagePinCode,
  PlacewhereMarriageWasRegistered: PlacewhereMarriageWasRegistered ?? "",
  PostMarriageNameAlongWithHusbandName:
    PostMarriageNameAlongWithHusbandName ?? "",
  ResidingPeriodBeforMarriageAndNoofYear:
    ResidingPeriodBeforMarriageAndNoofYear,
  PlaceofBirthofHusband: PlaceofBirthofHusband ?? "",
  DateofBirthofHusband: DateofBirthofHusband,
  OccupationofHusband: OccupationofHusband,
  HusbandName: HusbandName ?? "",
  AddressAfterMarriageSameasAbove: AddressAfterMarriageSameasAbove, //.Name
  AfterMarriageAddress: AfterMarriageAddress ?? "",
  AfterMarriageBuilding: AfterMarriageBuilding ?? "", //These all about After Married woman
  AfterMarriageSection: AfterMarriageSection ?? "",
  AfterMarriageStreet: AfterMarriageStreet ?? "",
  AfterMarriageLandmark: AfterMarriageLandmark ?? "",
  AfterMarriageDistrictCode: AfterMarriageDistrictCode,
  AfterMarriageSubDistrictCode: AfterMarriageSubDistrictCode,
  AfterMarriageVillageCode: AfterMarriageVillageCode ?? "",
  AfterMarriagePinCode: AfterMarriagePinCode,
  HasBeneficiaryMigratedFromDifferentState: HasBeneficiaryMigratedFromDifferentState, //.Value These all about Migration Screen
  YearsOfResidenceInMaharashtra: YearsOfResidenceInMaharashtra, //.Name
  FamilyNativePlaceBeforeMigrationToMaharashtra: FamilyNativePlaceBeforeMigrationToMaharashtra ?? "",
  ReasonforMigration: ReasonforMigration ?? "",
  //done

  ListMigrationDetailsofBeneficiaryModel:ListMigrationDetailsofBeneficiaryModel,
  DetailsOfMovablePropertyBelongToApplicantFatherhusbandInMaharashtra:DetailsOfMovablePropertyBelongToApplicantFatherhusbandInMaharashtra, //.Name
  PropertyAddress: PropertyAddress ?? "",
  PropertyBuilding: PropertyBuilding ?? "",
  PropertySection: PropertySection ?? "",
  PropertyStreet: PropertyStreet ?? "",
  PropertyLandmark: PropertyLandmark ?? "",
  PropertyDistrictCode: PropertyDistrictCode ?? "",
  PropertySubDistrictCode: PropertySubDistrictCode ?? "",
  PropertyVillageCode: PropertyVillageCode ?? "",
  PropertyPinCode: PropertyPinCode ?? "",
  PropertyHolderRelationwithBeneficiary:PropertyHolderRelationwithBeneficiary ?? "",
  PropertyDetail: PropertyDetail ?? "",
  Beneficiaryfatherhusbandplaceofresidence:Beneficiaryfatherhusbandplaceofresidence ?? "",
  Atthetimeofbirthofthebeneficiaryplaceofresidenceoffather:Atthetimeofbirthofthebeneficiaryplaceofresidenceoffather ?? "",
  IfBeneficiaryfatherhusbandisstayingoutsideMaharashtrathenplaceofresidence:IfBeneficiaryfatherhusbandisstayingoutsideMaharashtrathenplaceofresidence ?? "",
  Placeofemploymentenrolmentforschemeifany:Placeofemploymentenrolmentforschemeifany ?? "",
  WhetherApplicantIsBeneficiaryOfGovernmentSchemeinOtherDistrict:WhetherApplicantIsBeneficiaryOfGovernmentSchemeinOtherDistrict ?? "",
  PolicyDistrictCode: PolicyDistrictCode ?? "",
  PolicySubDistrictCode: PolicySubDistrictCode ?? "",
  PolicyVillageCode: PolicyVillageCode ?? "",
  PolicyPinCode: PolicyPinCode ?? "",

  // done
  ListApplicantFamilyResidantDetailsModel:ListApplicantFamilyResidantDetailsModel,
  Reason: Reason,
  CreatedBy: "224a14e9-33e8-4c5a-8d48-fe20d26769f6",
};


// {{saveApiPayload}} = saveApiPayload;
// {{TOKEN}} = `Bearer ${TOKEN}`;



console.log(saveApiPayload)