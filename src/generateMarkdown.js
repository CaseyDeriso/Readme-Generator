// function to generate markdown for README
function generateMarkdown(data) {
  // destructure data after rest operator is the data needed for table of contents
  const { fileName, github, title, description, badges, ...ToC } = data;

  // generate badges, takes badge array and pushes each badge to bage array that exists. username and repo name are added to the image link on shields.io
  function generateBadges(data, userName, repo) {
    let badges = [];
    data.forEach((el) => {
      if (el == "GitHub issues") {
        badges.push(
          `![GitHub issues](https://img.shields.io/github/issues/${userName}/${repo})`
        );
      } else if (el == "Pull requests") {
        badges.push(
          `![GitHub pull requests](https://img.shields.io/github/issues-pr/${userName}/${repo})`
        );
      } else if (el == "license") {
        badges.push(
          `![license](https://img.shields.io/github/license/${userName}/${repo})`
        );
      } else if (el == "Repo stars") {
        badges.push(
          `![GitHub Repo stars](https://img.shields.io/github/stars/${userName}/${repo}?style=social)`
        );
      } else if (el == "version") {
        badges.push(
          `![GitHub package.json version](https://img.shields.io/github/package-json/v/${userName}/${repo})`
        );
      }
    });
    return `${badges.join(" ")}`;
  }

  // creates table of contents.. omits sections that were not filled in
  function generateTableOfContents(data) {
    if (!data.confirmTableOfContents) {
      return "";
    } else {
      const contents = Object.entries(data);
      let entries = [];
      contents.forEach((el) => {
        if (typeof el[1] == "string") {
          entries.push(el[0]);
        }
      });
      return `## Table of Contents:
${entries.map((el) => `* [${el}](#${el})`).join(`
`)}
`;
    }
  }

  // creates screen shot section with realtive patch provided in prompts
  function generateScreenshot(data) {
    if (data.confirmScreenshot) {
      return `## Screenshot
![Screenshot of Application](${data.screenshot})
      `;
    } else {
      return "";
    }
  }

  // creates creadit section (if provided)
  function generateCredits(data) {
    if (data.confirmCredits) {
      return `## Credits

${data.credits}`;
    } else {
      return "";
    }
  }

  // return the markdown template and generate neccesary content
  return `
# ${title}

${generateBadges(badges, github, title)}

## Description

${description}

${generateTableOfContents(ToC)}

## Installation 

${ToC.installation}

## Usage 

${ToC.usage}

${generateScreenshot(ToC)}

${generateCredits(ToC)}

## License 

${ToC.license.toString()}
`;
}

// export this file for use in index.js
module.exports = generateMarkdown;
