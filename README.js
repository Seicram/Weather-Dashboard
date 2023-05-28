const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const fileExtensions = {
  '.html': 'HTML',
  '.js': 'JavaScript',
  '.css': 'CSS',
};

const dictionary = {
  outcome: 'the result or consequence of a series of actions',
  HTML: 'Hypertext Markup Language, the standard language for creating web pages',
  CSS: 'Cascading Style Sheets, used to define the styles and layout of the web page',
  JavaScript: 'a high-level programming language used for web development',
  web: 'a network of interconnected documents and resources',
  development: 'the process of creating and improving software or websites',
  project: 'a planned undertaking with defined objectives and deliverables',
  achieve: 'to successfully reach or accomplish a desired goal',
  combination: 'the act of joining or merging different elements',
  utilize: 'to make use of or employ something',
};

const basicPackageInstallations = [
  'bulma',
  'bootstrap',
  'jquery',
  'axios',
  'lodash',
  'moment',
  'jsonwebtoken',
  // Add more basic packages here
];

function generateBadge(license) {
  return `Licensed under ${license}`;
}

function getFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.log(`Error reading file '${filePath}': ${error}`);
    return '';
  }
}

function generateSynopsis(fileType) {
  const fileTypeDescriptions = {
    HTML: 'This project includes an HTML file that represents the web page.',
    JavaScript: 'This project includes JavaScript files that provide the interactive functionality of the web page.',
    CSS: 'This project includes a CSS file that defines the styles and layout of the web page.',
  };

  return fileTypeDescriptions[fileType] || '';
}

function generateDescription(title, fileTypes) {
  const titleWords = title.split(' ');

  let description = `The "${title}" project is a web development project that aims to achieve an outcome by combining the power of`;

  const outcomeWords = [];
  titleWords.forEach((word) => {
    if (dictionary.hasOwnProperty(word)) {
      outcomeWords.push(dictionary[word]);
    }
  });

  if (outcomeWords.length > 0) {
    description += ` ${outcomeWords.join(', ')} to achieve the desired outcome. `;
  } else {
    description += ` various web development technologies to achieve the desired outcome. `;
  }

  description += `The project utilizes web development technologies such as HTML, CSS, and JavaScript to create a dynamic and interactive web page. `;
  description += `By leveraging the power of these technologies, the project aims to deliver a visually appealing and user-friendly experience. `;
  description += `Through skillful use of HTML for content structure, CSS for styling and layout, and JavaScript for interactivity and behavior, the project strives to create a seamless and engaging web application. `;
  description += `With meticulous attention to detail and a focus on user experience, the project seeks to provide an intuitive and enjoyable web browsing experience. `;
  description += `The combination of HTML, CSS, and JavaScript allows for the creation of a responsive and adaptive design, ensuring the website looks great on various devices and screen sizes. `;
  description += `By following industry best practices and staying up-to-date with modern web development techniques, the project aims to deliver a high-quality web solution that meets the needs of its target audience. `;
  description += `Overall, the "${title}" project represents the application of web development skills and technologies to create a compelling and functional web experience. `;

  return description;
}

function generateUsageSynopsis(title, description, fileTypes) {
  let usageSynopsis = `The "${title}" project offers a practical application of web development skills and techniques. It provides a combination of HTML, CSS, and JavaScript files to create a fully functional web page. `;
  usageSynopsis += `The project's main focus is to ${description}. `;
  usageSynopsis += `The following table provides an overview of the files included in the project:\n\n`;
  usageSynopsis += `| File | Description |\n`;
  usageSynopsis += `| --- | --- |\n`;

  fileTypes.forEach((fileType) => {
    usageSynopsis += `| ${fileType} | ${generateSynopsis(fileType)} |\n`;
  });

  return usageSynopsis;
}

function detectInstallationInstructions(fileTypes) {
  const installationInstructions = [];

  if (fileTypes.includes('HTML')) {
    installationInstructions.push(`${generateSynopsis('HTML')} ${dictionary['HTML']}`);
  }

  if (fileTypes.includes('CSS')) {
    installationInstructions.push(`${generateSynopsis('CSS')} ${dictionary['CSS']}`);
  }

  if (fileTypes.includes('JavaScript')) {
    installationInstructions.push(`${generateSynopsis('JavaScript')} ${dictionary['JavaScript']}`);
  }

  // Basic package installations
  if (fileTypes.includes('JavaScript')) {
    const packagesList = basicPackageInstallations.map(pkg => `- Install ${pkg}: \`npm install ${pkg}\``);
    installationInstructions.push('To use some common JavaScript libraries, you can install the following packages using npm:\n' + packagesList.join('\n'));
  }

  return installationInstructions;
}

async function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What's the title of your project?",
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter the GitHub link for your project:',
    },
    {
      type: 'input',
      name: 'deployment',
      message: 'Enter the deployment link for your project:',
    },
    {
      type: 'input',
      name: 'video',
      message: 'Enter the video link for your project:',
    },
  ]).then((answers) => {
    answers.fileTypes = ['HTML', 'CSS', 'JavaScript'];
    answers.license = 'UNC Coding Boot Camp - UNC-Chapel Hill';
    return answers;
  });
}

async function generateReadme() {
  const { title, fileTypes, license, github, deployment, video } = await promptUser();
  const description = generateDescription(title, fileTypes);

  let readmeContent = `# ${title}\n\n## Table of Contents\n`;

  readmeContent += `- [Description](#description)\n`;
  readmeContent += `- [Usage](#usage)\n`;
  readmeContent += `- [Installation](#installation)\n`;
  readmeContent += `- [Credits](#credits)\n`;
  readmeContent += `- [Links](#links)\n`;

  if (license !== 'None') {
    readmeContent += `- [License](#license)\n`;
  }

  readmeContent += `\n## Description\n\n${description}\n\n`;

  readmeContent += `\n## Usage\n\n${generateUsageSynopsis(title, description, fileTypes)}\n`;

  readmeContent += `\n## Installation\n`;

  const installationInstructions = detectInstallationInstructions(fileTypes);

  if (installationInstructions.length > 0) {
    installationInstructions.forEach((instruction, index) => {
      readmeContent += `\n**Step ${index + 1}:**\n\n${instruction}\n`;
    });
  } else {
    readmeContent += `\nNo additional installation steps are required for this project.\n`;
  }

  readmeContent += `\n## Credits\n\n`;

  if (github) {
    readmeContent += `- This project was developed by Marcies Smith.\n`;
  }

  readmeContent += `\n## Links\n\n`;

  if (github) {
    readmeContent += `- [GitHub Repository](${github})\n`;
  }

  if (deployment) {
    readmeContent += `- [Deployed Application](${deployment})\n`;
  }

  if (video) {
    readmeContent += `- [Demo Video](${video})\n`;
  }

  if (license !== 'None') {
    readmeContent += `\n## License\n\n${generateBadge(license)}\n`;
  }

  const outputPath = path.join(__dirname, 'README.md');
  fs.writeFileSync(outputPath, readmeContent);

  console.log(`README.md file generated successfully at ${outputPath}`);
}


generateReadme();
