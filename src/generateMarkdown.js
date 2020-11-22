// function to generate markdown for README
function generateMarkdown(data) {
  const { fileName, github, title, description, badges, ...ToC } = data;

  function generateBadges(data, userName, repo) {
    let badges = []
    // version       ![GitHub package.json version](https://img.shields.io/github/package-json/v/${userName}/${repo})
    // issues        ![GitHub issues](https://img.shields.io/github/issues/${userName}/${repo})
    // pull requests ![GitHub pull requests](https://img.shields.io/github/issues-pr/${userName}/${repo})
    // license       ![GitHub](https://img.shields.io/github/license/${userName}/${repo})
    // repo stars    ![GitHub Repo stars](https://img.shields.io/github/stars/${userName}/${repo}?style=social)
    data.forEach(el => {
      if (el == 'GitHub issues') {
        badges.push( `![GitHub issues](https://img.shields.io/github/issues/${userName}/${repo})`)
      } else if (el == 'Pull requests') {
        badges.push(`![GitHub pull requests](https://img.shields.io/github/issues-pr/${userName}/${repo})`)
      } else if (el == 'license') {
        badges.push(`![license](https://img.shields.io/github/license/${userName}/${repo})`)
      } else if (el == 'Repo stars') {
        badges.push(`![GitHub Repo stars](https://img.shields.io/github/stars/${userName}/${repo}?style=social)`)
      } else if (el == 'version') {
        badges.push(`![GitHub package.json version](https://img.shields.io/github/package-json/v/${userName}/${repo})`)
      } 
    }
    )
    return `${badges.join(' ')}`
  }

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

module.exports = generateMarkdown;
