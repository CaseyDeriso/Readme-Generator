const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./src/generateMarkdown");
const mockData = {
  fileName: 'README',
  github: 'CaseyDeriso',
  title: 'Readme-Generator',
  description: 'generate a professional readme with this CLI application. a readme is a vital part of any professional repository, and readme-generator will make the proccess of creating a readme easy and consistent across your repositories. ',
  confirmTableOfContents: true,
  installation: "this application requires node.js to be installed on your local machine. after cloning the repository, type the command 'npm install",
  usage: 'youtube link. after typing node . in the command line, you will be presented with a list of prompts to tailor your readme to your repository, after you complete the prompts, the readme file will be added to the /dist directory where you can copy the file to your repository. ',
  confirmScreenshot: true,
  screenshot: './assets/photos/screenshot.jpg',
  confirmCredits: true,
  credits: 'Univiercity of Texas at Austin full stack web development bootcamp',
  license: [ 'Unlicense' ],
  badgeConfirm: true,
  badges: [
    'GitHub issues',
    'Pull requests',
    'license',
    'Repo stars',
    'version'
  ]
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
    message: "Would you like to include badges?"
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
      "version"
    ]
  }
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

// test function call with mock data

const test = mockData => {
    const { fileName } = mockData;
    writeToFile(fileName, mockData)
}
test(mockData)
