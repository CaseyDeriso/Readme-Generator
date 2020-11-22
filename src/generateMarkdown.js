// function to generate markdown for README
function generateMarkdown(data) {
  const { fileName, github, title, description, ...ToC } = data;

  function generateLinks(data) {}

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
${entries.map(el => `* [${el}](#${el})`).join(`
`)}
`;
    }
  }

  function generateScreenshot(data) {
    if (data.confirmScreenshot) {
      return `![Screenshot of Application](${data.screenshot})
      `;
    } else {
      return "";
    }
  }

  function generateCredits(data) {
    if (data.confirmCredits) {
      return `## Credits

${data.credits}`;
    } else {
      return "";
    }
  }

  return `
# ${title}

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

module.exports = generateMarkdown;
