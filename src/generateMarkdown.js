// function to generate markdown for README
function generateMarkdown(data) {
  console.log(data)
  return `
  # ${data.title}
  
  ## ${data.description}

  ## Table of Contents:
  

  ## Installation 

  ${data.installation}
`;
}

module.exports = generateMarkdown;
