// // Extract tradeLicenceDuesOutput data
// var tradeLicenceDuesOutput = { data:
//     {
//     "licenseNumber": "TL/08018/2018",
//     "tradeName": "S V R DAIBATIC & DENTAL CARE",
//     "ownerName": "DR V V RAM KUMAR",
//     "category": "Medical Establishments",
//     "subcategory": "Clinics (All Medical Systems)",
//     "totalDue": 3900.0
// }
// {
//     "errorCode": "TL-002",
//     "errorMessage": "Invalid TradeLicense Number"
// }
// {
//     "errorCode": "TL-001",
//     "errorMessage": "Invalid Mobile Number"
// }
// }

// tradeLicenceDuesOutput = tradeLicenceDuesOutput.data

// // Initialize the output string
// let finalAssessment = "";

// // Debugging: Log the received data structure
// console.log("Received tradeLicenceDuesOutput:", tradeLicenceDuesOutput);

// Validate the response structure
// if (!tradeLicenceDuesOutput || typeof tradeLicenceDuesOutput !== "object") {
//     throw new Error(
//         "No data available. Please provide valid details.\n" +
//         "(డేటా అందుబాటులో లేదు. దయచేసి సరైన వివరాలను అందించండి.)"
//     );
// }

// // Handle specific error codes
// if (tradeLicenceDuesOutput.errorCode === "TL-001") {
//     throw new Error(
//         "Invalid Mobile Number - Please provide a valid mobile number.\n" +
//         "(దయచేసి సరైన మొబైల్ నంబర్ ఇవ్వండి.)"
//     );
// } else if (tradeLicenceDuesOutput.errorCode === "TL-002") {
//     throw new Error(
//         "Invalid Trade License Number - Please provide a valid trade license number.\n" +
//         "(దయచేసి సరైన ట్రేడ్ లైసెన్స్ నంబర్ ఇవ్వండి.)"
//     );
// } else if (tradeLicenceDuesOutput.errorCode) {
//     throw new Error(
//         `An error occurred: ${tradeLicenceDuesOutput.errorMessage || "Unknown error"}.\n` +
//         "(పొరపాటు జరిగింది. దయచేసి మీ వివరాలను తనిఖీ చేయండి.)"
//     );
// }

// // Process trade license details if no error code
// if (tradeLicenceDuesOutput.ownerName) {
//     finalAssessment += `Owner Name: ${tradeLicenceDuesOutput.ownerName}\n\n`;
// } else {
//     throw new Error(
//         "Owner details are missing. Please check the entered details.\n" +
//         "(యజమాని వివరాలు అందుబాటులో లేవు. దయచేసి నమోదు చేసిన వివరాలను తనిఖీ చేయండి.)"
//     );
// }

// if (typeof tradeLicenceDuesOutput.totalDue === "number") {
//     finalAssessment += `Total Dues: ₹${tradeLicenceDuesOutput.totalDue}/-\n`;
// } else {
//     throw new Error(
//         "Total dues information is missing. Please check the entered details.\n" +
//         "(మొత్తం బకాయిల సమాచారం అందుబాటులో లేదు. దయచేసి నమోదు చేసిన వివరాలను తనిఖీ చేయండి.)"
//     );
// }

// // Log final assessment
// console.log(finalAssessment);

// -----throw error part handled---//end//

// let extractedPahaniDetails = "";

// function languageCheckk(enterLanguage) {
//     extractedPahaniDetails += enterLanguage === "ENGLISH" ? `Survey No:10021` : "సర్వే  నెం:  10021\n",
//         extractedPahaniDetails += enterLanguage === "ENGLISH"? `Total Extent:522145`: "మొత్తం  విస్తీర్ణం:  522145";
//         console.log(extractedPahaniDetails)
// }

// // // languageCheckk("TELUGU")

// // // // సర్వే నెం:10021మొత్తం విస్తీర్ణం:522145

// const codeData = {
//     "consumerNo": "1021085603",
//     "ownerName": "J KOTAIAH S/O NARASAIAH",
//     "mobileNo": "9885456699",
//     "propertyAddress": "17-2-3/196/1, GOLUSU KONDALA RAO NAGAR, Revenue Ward 30, Guntur",
//     "localityName": "GOLUSU KONDALA RAO NAGAR",
//     "taxDetails": [
//         {
//             "installment": "2018-2019-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2018-2019-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2019-2020-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2019-2020-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2020-2021-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2020-2021-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2021-2022-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2021-2022-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2022-2023-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2022-2023-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2023-2024-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2023-2024-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2024-2025-1",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         },
//         {
//             "installment": "2024-2025-2",
//             "taxAmount": 84,
//             "chqBouncePenalty": 0,
//             "penalty": 0,
//             "rebate": 0,
//             "totalAmount": 84
//         }
//     ],
//     "errorDetails": {
//         "errorCode": "STAX-REST-0",
//         "errorMessage": "SUCCESS"
//     }
// }

// console.log(codeData.errorDetails.errorCode)

// const arr = ["jayesh", "rajesh", "amit", "ashish"]

// const newArray = arr.map((value)=>{
//         return value+"ji";
// })

// console.log(newArray)

const abc = "";
