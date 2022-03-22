const fs = require("fs");

const Pdfmake = require("pdfmake");

var fonts = {
  Roboto: {
    normal: "fonts/roboto/Roboto-Regular.ttf",
    bold: "fonts/roboto/Roboto-Medium.ttf",
    italics: "fonts/roboto/Roboto-Italic.ttf",
    bolditalics: "fonts/roboto/Roboto-MediumItalic.ttf",
  },
};

let pdfmake = new Pdfmake(fonts);

let pdfDoc;

let headerfooterDoc = {
  header: {
    margin: [0, 0, 0, 0],
    alignment: "center",

    image: "images/info.png",
    height: 100,
    width: 600,
  },
  content: [],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: "center",
      margin: [0, 30, 0, 20],
    },
    subheader: {
      fontSize: 14,
      margin: [0, 15, 0, 10],
      color: "#003893",
    },
    details: {
      fontSize: 9,
      bold: true,
      margin: [0, 0, 0, 0],
      color: "#000",
    },
    text: {
      alignment: "justify",
    },
    link: {
      decoration: "underline",
      color: "#0074c1",
    },
  },

  //
  // static footer
  footer: {
    margin: [0, 30, 0, 0],
    fontSize: 11,
    columns: [
      {
        text: "WE REFLECT YOU,",
        margin: [208, 0, 0, 0],
      },
      {
        color: "green",
        text: "WHEN WE SERVE YOU",
      },
    ],
  },

  //   content: content,
  pageMargins: [50, 120, 50, 50],
};

let table = {
  // headers are automatically repeated if the table spans over multiple pages
  // you can declare how many rows should be treated as headers
  // headerRows: 1,
  widths: [30, 150, 300],

  body: [
    [
      { text: "S.No", fillColor: "#82cc41", bold: true },
      { text: "Second", fillColor: "#82cc41", bold: true },
      { text: "Third", fillColor: "#82cc41", bold: true },
    ],
    [
      "1",
      "Current Designation (With reporting relations)",
      `Corporate HR Manager
    Reporting to Executive Wise President and Finance HR
    Reportees - 4`,
    ],
    [
      "2",
      "Qualification (with specialization & academic performance)",
      `M.A (human resource management) 2011
       MADRAS SCHOOL OF SOCIAL WORK
       B.Sc (Zoology) 2007
       Madras University
     `,
    ],
    [
      {
        text: "Professional Exposure",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    ["3", "Current location of the work/Native", "Velachery, Chennai"],
    [
      "4",
      { text: "Salary / Notice period" },
      {
        table: {
          margin: [0, 0, 0, 0],
          headerRows: 1,

          width: [100, 200, 100],
          // border: [false, false, false, false],
          body: [
            [
              { text: "Current CTC", padding: 10 },
              { text: "Expected CTC" },
              { text: "Notice Period" },
            ],
            ["7 Lakhs(Take home – 48K per month)", "10 Lakhs", "30 days"],
          ],
        },
      },
    ],
    [
      "5",
      "Total Years of experience / Relevant Years of experience",
      "10.5 years",
    ],
    [
      "6",
      "Career Highlights",
      {
        table: {
          margin: [0, 0, 0, 0],
          headerRows: 1,

          width: [100, 200, 100],
          // border: [false, false, false, false],
          body: [
            [
              { text: "Employer", padding: 10 },
              { text: "Designation" },
              { text: "Employment Period" },
            ],
            [
              "TVS Sundaram Motors",
              "Corporate HR Manager",
              "Aug 2019 to Till Date",
            ],
            [
              "Raj Petro specialties",
              "Senior Officer HR ",
              "Sep 2016 to Aug 2019",
            ],
            ["Rane Madra Limited", "HR Executive", "Jul 2011 to Aug 2016"],
          ],
        },
      },
    ],
    [
      {
        text: "Personal Details",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    ["7", "DOB", "07 Jul 1985"],
    ["8", "Gender", "Male"],
    ["9", "DOB", "Married"],
    [
      {
        text: "Consultant Assessment",
        colSpan: 3,
        fillColor: "#82cc41",
        bold: true,
      },
      {},
      {},
    ],
    [
      {
        text: `Candidate has overall 8 years of experience in Manufacturing Industry and 10.5 years in Human Resource. He has 3 years of working experience in Chemical Industry. He has experience in Recruitment & Selection, Payroll &Compensation, PMS, Statutory Compliance & Benefits. His Present company’s head count is around 1000 employees. From that 700 are regular and 300 are contract. He has handled party-based union (CITU) for 2+ years in TVS Sundaram Motors. He has handled internal union in Raj Petro specialties.Reason for change: Better Opportunity`,
        colSpan: 3,
      },
      {},
      {},
    ],
  ],
};

const makePDF = () => {
  let aPromise = new Promise((resolve, reject) => {
    console.time("creatingPDF");
    /// all those stuffs
    headerfooterDoc["content"].push(
      {
        text: "PROFILE SNAPSHOT",
        style: "details",
      },
      {
        text: "Name of the candidate: THYAGARAJAN.A",
        style: "details",
      },
      {
        text: "Profile for the position of: HR Manager or HR Head",
        margin: [0, 0, 0, 10],
        style: "details",
      },
      {
        table: table,
      }
    );

    pdfDoc = pdfmake.createPdfKitDocument(headerfooterDoc, {});
    let writeStream = fs.createWriteStream("pdfs/headerfooter.pdf");
    pdfDoc.pipe(writeStream);
    pdfDoc.end();

    writeStream.on("finish", function () {
      console.timeEnd("creatingPDF");
      resolve("pdfs/headerfooter.pdf");
    });
  });

  return aPromise;
};

makePDF().then((file) => {
  console.log(file);
});
