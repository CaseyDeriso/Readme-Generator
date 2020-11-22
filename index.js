const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./src/generateMarkdown");

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
    default: true,
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
    when: ({ confirmCredits }) => {
      if (confirmCredits) {
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
  {
    type: "confirm",
    name: "badgeConfirm",
    message: "Would you like to include badges?",
  },
  {
    type: "checkbox",
    name: "badges",
    message: "Please select which badges you would like to include:",
    choices: [
      "GitHub issues",
      "Pull requests",
      "license",
      "Repo stars",
      "version",
    ],
  },
];

// function to write README file
function writeToFile(fileName, data) {
  const pageMD = generateMarkdown(data);
  fs.writeFile(`./dist/${fileName}.md`, pageMD, (err) => {
    if (err) throw err;
    console.log("Done! File is saved in the dist/ direcictory.");
  });
}

// function to initialize program
function init() {
  return inquirer.prompt(questions);
}

// function call to initialize program
init().then((readmeData) => {
  const { fileName } = readmeData;
  writeToFile(fileName, readmeData);
});
