const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(`./${fileName}.md`, data, (err) => {
    if (err) throw err;
    console.log("Done!");
  });
}

// function to initialize program
function init() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
      validate: (projectTitle) => {
        if (projectTitle) {
          return true;
        } else {
          console.log("Please enter a title for your project!");
          return flase;
        }
      },
    },
    {
      type: "input",
      name: "description",
      message: "Please provide a description of the project",
      validate: (projectDesc) => {
        if (projectDesc) {
          return true;
        } else {
          console.log("Please enter a project description!");
          return false;
        }
      },
    },
  ])

};

// function call to initialize program
init()
.then(readmeData => {
    const content = readmeData.description;
    const title = readmeData.title;
    writeToFile(title, content)
});
