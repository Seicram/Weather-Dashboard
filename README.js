const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const fileExtensions = [
  { extension: '.html', description: 'HTML' },
  { extension: '.js', description: 'JavaScript' },
  { extension: '.css', description: 'CSS' },
  { extension: '.sql', description: 'SQL' },
  { extension: '.json', description: 'JSON' },
  { extension: '.express.js', description: 'Express.js' },
  { extension: '.md', description: 'Markdown' },
  { extension: '.txt', description: 'Text' },
  { extension: '.gitignore', description: 'Gitignore' },
  { extension: '.git', description: 'Git' },
  { extension: '.npm', description: 'NPM' },
  { extension: '.node', description: 'Node' },
  { extension: '.java', description: 'Java' },
  { extension: '.py', description: 'Python' },
  { extension: '.c', description: 'C' }
];


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
  sequelize: 'a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server',
  json: 'JavaScript Object Notation, a lightweight data-interchange format',
  express: 'a fast, unopinionated, minimalist web framework for Node.js',
};

const filesInFolder = [
  'bulma',
  'bootstrap',
  'jquery',
  'axios',
  'lodash',
  'moment',
  'jsonwebtoken',
  'sequelize',
  'express',
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
    SQL: 'This project includes a SQL file that defines the database schema and seed data.',
    Json: 'This project includes a JSON file that defines the data structure.',
    Express: 'This project includes an Express.js file that defines the server.',
    Markdown: 'This project includes a Markdown file that provides documentation.',
    Text: 'This project includes a text file that provides documentation.',
    Gitignore: 'This project includes a Gitignore file that specifies which files to ignore.',
    Git: 'This project includes a Git file that provides version control.',
    NPM: 'This project includes an NPM file that defines the project dependencies.',
    Node: 'This project includes a Node file that defines the project dependencies.',
    Java: 'This project includes a Java file that defines the project dependencies.',
    Python: 'This project includes a Python file that defines the project dependencies.',
    C: 'This project includes a C file that defines the project dependencies.',
    
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

function generateUsageSynopsis(title, description, fileExtensions) {
  const usageSynopsis = `The "${title}" project offers a practical application of web development skills and techniques. It provides a combination of files to create a fully functional web page. This project is designed to showcase different aspects of web development, including HTML, CSS, and JavaScript. By examining the files included in this project, developers can gain insights into structuring web pages, styling them with CSS, and enhancing interactivity with JavaScript. The project's files cover a range of common web page components and features, such as headers, footers, navigation menus, forms, and image galleries. Each file is organized and labeled appropriately, making it easy to understand its purpose and role in the overall project. By exploring these files, developers can learn best practices for organizing their own web development projects and gain inspiration for their own designs. The usage table below provides a comprehensive overview of the file types included in the project, along with brief descriptions for each file type.`;

  const folderPath = __dirname;
  const filesInFolder = fs.readdirSync(folderPath);

  const extensionsInFolder = filesInFolder.map(file => path.extname(file)); // Get only the extensions of the files

  const uniqueExtensions = [...new Set(extensionsInFolder)]; // Remove duplicate extensions

  let usageTable = `The following table provides an overview of the files included in the project:\n\n`;
  usageTable += `| File Type | Description |\n`;
  usageTable += `| --- | --- |\n`;

  uniqueExtensions.forEach((extension) => {
    const fileType = fileExtensions.find(file => file.extension === extension); // Find the file type based on the extension
    if (fileType) {
      const fileDescription = generateSynopsis(fileType.description);
      usageTable += `| ${extension} | ${fileDescription} |\n`;
    }
  });

  if (uniqueExtensions.length === 0) {
    return `${usageSynopsis} No files detected in the folder.`;
  }

  return `${usageSynopsis}\n${usageTable}`;
}

function detectInstallationInstructions(fileExtensions, filesInFolder) {
  let installationTable = `The following table provides an overview of the files included in the project:\n\n`;
  installationTable += `| File Type | Description | Installation Instructions |\n`;
  installationTable += `| --- | --- | --- |\n`;

  fileExtensions.forEach((fileType) => {
    const extension = fileType.extension;
    const fileDescription = generateSynopsis(fileType.description);
    const isFileIncluded = filesInFolder.some((file) => path.extname(file) === extension);

    if (isFileIncluded) {
      let installationInstructions;

      if (extension === '.js' || extension === '.css' || extension === '.html' || extension === '.md') {
        installationInstructions = `Create the file "${extension}" in the folder using the file extension.`;
      } else {
        installationInstructions = `Install the package using npm install.`;
      }

      installationTable += `| ${extension} | ${fileDescription} | ${installationInstructions} |\n`;
    }
  });

  if (installationTable === `The following table provides an overview of the files included in the project:\n\n| File Type | Description | Installation Instructions |\n| --- | --- | --- |\n`) {
    return `${installationTable}\nNo files detected in the folder.`;
  }
  return installationTable;
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
    answers.fileTypes = ['HTML', 'CSS', 'JavaScript', 'SQL', 'Json', 'Express', 'Markdown', 'Text', 'Gitignore', 'Git', 'NPM', 'Node', 'Java', 'Python', 'C'];
    answers.license = 'UNC Coding Boot Camp - UNC-Chapel Hill';
    return answers;
  });
}

async function generateReadme() {
  const { title, fileTypes, license, github, deployment, video } = await promptUser();
  const description = generateDescription(title, fileTypes);
  const usageSynopsis = generateUsageSynopsis(title, description, fileExtensions);
  const folderPath = __dirname;
  const filesInFolder = fs.readdirSync(folderPath);

  let readmeContent = `# ${title}\n\n## Table of Contents\n`;
  
  readmeContent += `- [Description](#description)\n`;

  if (usageSynopsis !== '') {
    readmeContent += `- [Usage](#usage)\n`;
  }

  readmeContent += `- [Installation](#installation)\n`;
  readmeContent += `- [Credits](#credits)\n`;

  if (github || deployment || video) {
    readmeContent += `- [Links](#links)\n`;
  }

  if (license !== 'None') {
    readmeContent += `- [License](#license)\n`;
  }

  readmeContent += `\n## Description\n\n${description}\n\n`;

  if (usageSynopsis !== '') {
    readmeContent += `\n## Usage\n\n${usageSynopsis}\n`;
  } else {
    const hypothesis = generateHypothesis(title, description, fileTypes);
    readmeContent += `\n## Usage\n\n${hypothesis}\n`;
  }

  readmeContent += `\n## Installation\n`;

  const installationInstructions = detectInstallationInstructions(fileExtensions, filesInFolder, fileTypes);
  readmeContent += `\n${installationInstructions}`;

  readmeContent += `\n## Credits\n\n`;

  readmeContent += `This project was developed by Marcies Smith. Special thanks to John Doe for contributing to the project.\n`;

  if (github || deployment || video) {
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
  }

  if (license !== 'None') {
    readmeContent += `\n## License\n\n${generateBadge(license)}\n`;
  }

  const outputPath = path.join(__dirname, 'README.md');
  fs.writeFileSync(outputPath, readmeContent);

  console.log(`README.md file generated successfully at ${outputPath}`);
}



function generateHypothesis(title, description, fileTypes) {
  // Generate a hypothesis based on the project title, description, and file types
  let hypothesis = `Discover the power and versatility of "${title}" for your projects. Whether you're a developer, data analyst, or researcher, this project offers an array of capabilities to enhance your workflow. Seamlessly incorporate ${capitalize(fileTypes[0])} processing, ${capitalize(fileTypes[1])} generation, and ${capitalize(fileTypes[2])} analysis into your tasks.`;

  const uniqueWords = [...new Set([...title.split(' '), ...description.split(' ')])];

  const sentenceVariations = [
    `Harness the potential of ${uniqueWords[0] || ''} processing, ${uniqueWords[1] || ''} visualization, and ${uniqueWords[2] || ''} exploration with ${title}.`,
    `Effortlessly analyze and manipulate ${uniqueWords[0] || ''} datasets to derive meaningful insights using ${title}.`,
    `Take advantage of the powerful ${uniqueWords[0] || ''} capabilities to uncover hidden patterns and trends in your data.`,
    `Simplify ${uniqueWords[1] || ''} tasks and streamline your workflows with the intuitive features of ${title}.`,
    `Unleash the potential of ${uniqueWords[2] || ''} analysis and ${uniqueWords[1] || ''} generation using ${title}.`,
    `Make data-driven decisions with confidence, leveraging the rich ${uniqueWords[0] || ''} functionality of ${title}.`
  ];

  if (sentenceVariations.length > 7) {
    sentenceVariations.splice(7, sentenceVariations.length - 7);
  }

  hypothesis += `\n\n${sentenceVariations.join(' ')}`;

  return hypothesis;
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

generateReadme();
