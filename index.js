const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./src/generateMarkdown");
const mockData = {
  fileName: "README",
  github: "CaseyDeriso",
  title: "Portfolio-Generator",
  description:
    "Portfolio Generator is a CLI application designed to quickly produce a portfolio HTML file based on CLI input and your github repositories. ",
  confirmTableOfContents: true,
  installation:
    "This application requires node.js to be installed on your local machine. There are also dependencies which must be installed with 'npm install' command after you have cloned the repo",
  usage:
    "After installing dependencies, you can run 'node app' in the terminal to begin the program. all responses with (required) must have input. Your GitHub username and project titles are case-sensitive. Have an interview next week and no portfolio? Use this application to quickly get a stylish HTML page out there to showcase your hard work, without doing all the hard work!",
  confirmScreenshot: true,
  screenshot: "./assets/photos/screenshot.jpg",
  confirmCredits: true,
  credits:
    "This program was written with instructions from the full stack web development boot camp at the Univercity of Texas at Austin",
  license: ["Unlicense"],
};

// array of questions for user
const questions = [
  {
    type: "input",
    name: "fileName",
    default: "README",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username? (required)",
    validate: (projectTitle) => {
      if (projectTitle) {
        return true;
      } else {
        console.log("Please enter a title for your project!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project? (required)",
    validate: (projectTitle) => {
      if (projectTitle) {
        return true;
      } else {
        console.log("Please enter a title for your project!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "Please provide a description of the project (required)",
    validate: (projectDesc) => {
      if (projectDesc) {
        return true;
      } else {
        console.log("Please enter a project description!");
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmTableOfContents",
    message: "Would you like to include a table of contents? (recommended)",
    default: true
  },
  {
    type: "input",
    name: "installation",
    message:
      "Please provide installation instructions for your project's development envioronment",
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide instructions and examples for use of the project.",
  },
  {
    type: "confirm",
    name: "confirmScreenshot",
    message:
      "Would you like to include a screenshot? (there must be a valid relative patch for the screenshot in your project)",
    default: false,
  },
  {
    type: "input",
    name: "screenshot",
    message:
      "please provide relative path from root folder to screenshot file.",
    when: ({ confirmScreenshot }) => {
      if (confirmScreenshot) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "confirmCredits",
    message:
      "Do you wish to share credit for this project (With collaborators, third party assets, tutorials, etc.)",
    default: false,
  },
  {
    type: "input",
    name: "credits",
    message: "please provide information on who you wish to share credit with.",
    when: ({ creditsConfirm }) => {
      if (creditsConfirm) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "checkbox",
    name: "license",
    message: "How is your project licensed?",
    choices: [
      "MIT",
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "Boost Software License 1.0",
      "Unlicense",
    ],
  },
];

// function to write README file
function writeToFile(fileName, data) {
  const pageMD = generateMarkdown(data);
  fs.writeFile(`./dist/${fileName}.md`, pageMD, (err) => {
    if (err) throw err;
    console.log("Done! File is int the dist direcictory.");
  });
}

// function to initialize program
function init() {
  return inquirer.prompt(questions);
}

// // function call to initialize program
// init().then((readmeData) => {
//   const { fileName } = readmeData;
//   writeToFile(fileName, readmeData);
// });

// // test function call with mock data

const test = mockData => {
    const { fileName } = mockData;
    writeToFile(fileName, mockData)
}
test(mockData)
