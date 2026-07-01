const fs = require("fs");
const pdf = require("pdf-parse");

console.log("Type of pdf:", typeof pdf);
console.log(pdf);
const extractTextFromPDF = async (filePath) => {
    try {
        // Read the uploaded PDF
        const dataBuffer = fs.readFileSync(filePath);

        // Extract text
console.log("About to call pdf...");
console.log("typeof pdf inside function:", typeof pdf);

const data = await pdf(dataBuffer);

console.log("PDF parsed successfully!");
        return data.text;

    } catch (error) {
        console.error("PDF Parsing Error:");
        console.error(error);

        throw error;
    }
};

module.exports = {
    extractTextFromPDF
};