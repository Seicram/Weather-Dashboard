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
  CSS: 'Cascading Style Sheets, used to define the presentation of a document',
  JavaScript: 'a high-level programming language used for web development',
  web: 'a network of interconnected documents and resources',
  development: 'the process of creating and improving software or websites',
  achieve: 'to successfully reach or accomplish a desired goal',
  combination: 'the act of joining or merging different elements',
  utilize: 'to make use of or employ something',
};

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

function generateDescription(title, files) {
  const titleWords = title.split(' ');

  let description = `The "${title}" project is a web development endeavor aimed at achieving a desired outcome by combining`;

  const outcomeWords = [];
  titleWords.forEach((word) => {
    if (dictionary.hasOwnProperty(word)) {
      outcomeWords.push(dictionary[word]);
    }
  });

  if (outcomeWords.length > 0) {
    const randomOutcome = outcomeWords[Math.floor(Math.random() * outcomeWords.length)];
    description += ` ${randomOutcome} to successfully accomplish the desired goal. `;
  } else {
    const randomCombination = ['an amalgamation', 'a fusion', 'a blend'][Math.floor(Math.random() * 3)];
    description += ` the power of various web development technologies in ${randomCombination} to achieve the desired outcome. `;
  }

  const randomTech = ['HTML', 'CSS', 'JavaScript'][Math.floor(Math.random() * 3)];

  const randomFeature = ['dynamic and interactive', 'responsive and adaptive', 'visually appealing', 'user-friendly'][Math.floor(Math.random() * 4)];
  const randomAction = ['creating', 'enhancing', 'building'][Math.floor(Math.random() * 3)];
  const randomAdjective = ['an intuitive', 'a captivating', 'an immersive'][Math.floor(Math.random() * 3)];
  const randomMethod = ['skillful use', 'expert application', 'effective utilization'][Math.floor(Math.random() * 3)];
  const randomDetail = ['meticulous attention to detail', 'careful craftsmanship', 'thorough implementation'][Math.floor(Math.random() * 3)];
  const randomDesign = ['seamless and engaging', 'visually stunning', 'modern and elegant'][Math.floor(Math.random() * 3)];
  const randomDevice = ['various devices and screen sizes', 'desktop and mobile devices', 'different browsers and platforms'][Math.floor(Math.random() * 3)];
  const randomSolution = ['industry best practices', 'cutting-edge techniques', 'innovative approaches'][Math.floor(Math.random() * 3)];
  const randomExpression = ['high-quality web solution', 'top-notch web experience', 'excellent end result'][Math.floor(Math.random() * 3)];
  const randomWord = ['development', 'programming', 'coding'][Math.floor(Math.random() * 3)];

  description += `The project utilizes ${randomTech} to create ${randomFeature} web pages. `;
  description += `By ${randomAction} a seamless and engaging user experience, the project aims to provide ${randomAdjective} web browsing experience. `;
  description += `The combination of ${randomTech}, ${randomMethod} of HTML for content structure, CSS for styling and layout, and JavaScript for interactivity and behavior, `;
  description += `with ${randomDetail} and a focus on user experience, the project strives to create a ${randomDesign} web application. `;
  description += `With a responsive and adaptive design, the project ensures the website looks great on ${randomDevice}. `;
  description += `By following ${randomSolution} and staying up-to-date with modern web development techniques, `;
  description += `the project aims to deliver ${randomExpression} that meets the needs of its target audience. `;
  description += `In summary, the "${title}" project represents the application of web `;
  description += `${randomWord} skills to create a web application that is ${randomFeature}, visually appealing, and user-friendly.`;

  return description;
}



function generateUsageSynopsis(title, description, fileTypes) {
  let usageSynopsis = `The "${title}" project offers a practical application of web development skills, showcasing the synergy of HTML, CSS, and JavaScript in building a dynamic and interactive web experience. `;

  if (fileTypes.length > 0) {
    const fileTypesList = fileTypes.map((fileType) => fileType.toLowerCase()).join(', ');
    usageSynopsis += `The project incorporates ${fileTypesList} to enhance the user interface and deliver a visually appealing design. `;
  }

  const randomUserAction = ['interacting with dynamic content', 'navigating through intuitive user interfaces', 'enjoying the visual aesthetics'][Math.floor(Math.random() * 3)];
  const randomUserExperience = ['an immersive', 'a captivating', 'a seamless'][Math.floor(Math.random() * 3)];
  const randomUserInterface = ['well-crafted', 'intuitive', 'user-friendly'][Math.floor(Math.random() * 3)];
  const randomDeviceCompatibility = ['different devices and browsers', 'various screen sizes and platforms', 'a wide range of viewing environments'][Math.floor(Math.random() * 3)];
  const randomPower = ['leverage', 'utilize', 'harness'][Math.floor(Math.random() * 3)];
  const randomRobustness = ['robust', 'powerful', 'flexible'][Math.floor(Math.random() * 3)];
  const randomAdditionalBenefit = [
    'Users can collaborate with others in real-time through the project\'s built-in chat functionality. ',
    'The project implements gamification elements to make the web experience more engaging and enjoyable. ',
    'It provides seamless integration with popular social media platforms, allowing users to easily share content. ',
    'The web application includes advanced search and filtering capabilities to help users find the information they need. ',
  ][Math.floor(Math.random() * 4)];

  usageSynopsis += `Users can explore the website and ${randomUserAction}, experiencing ${randomUserExperience} web experience. `;
  usageSynopsis += `The project encourages user engagement and interactivity through its ${randomUserInterface} user interface and intuitive navigation. `;
  usageSynopsis += `With a responsive design and compatibility across ${randomDeviceCompatibility}, the web page adapts seamlessly to different devices and browsers, ensuring a consistent experience for all users. `;
  usageSynopsis += `By ${randomPower} the power of web development technologies, the "${title}" project provides a ${randomRobustness} and interactive web experience that is visually appealing and user-friendly. `;
  usageSynopsis += randomAdditionalBenefit;

  return usageSynopsis;
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the Title of your Project:',
    },
  ])
  .then((answers) => {
    const title = answers.title.trim();

    if (!title) {
      console.log('Please provide a valid project title.');
      return;
    }

    const license = 'UNC Coding Boot Camp - UNC-Chapel Hill';
    const licenseBadge = generateBadge(license);

    const currentDir = process.cwd();

    const files = fs.readdirSync(currentDir);
    const fileTypes = files
      .map((file) => {
        const extension = path.extname(file);
        return fileExtensions[extension];
      })
      .filter(Boolean);

    const description = generateDescription(title, files);
    const usageSynopsis = generateUsageSynopsis(title, description, fileTypes);

    let readmeContent = `
# ${title}

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
`;

    const tableOfContents = [];

    if (fileTypes.includes('HTML')) {
      tableOfContents.push('- [HTML](#html)');
      readmeContent += `
## HTML

${generateSynopsis('HTML')}
`;
    }

    if (fileTypes.includes('JavaScript')) {
      tableOfContents.push('- [JavaScript](#javascript)');
      readmeContent += `
## JavaScript

${generateSynopsis('JavaScript')}
`;
    }

    if (fileTypes.includes('CSS')) {
      tableOfContents.push('- [CSS](#css)');
      readmeContent += `
## CSS

${generateSynopsis('CSS')}
`;
    }

    // Append the updated Table of Contents
    readmeContent = readmeContent.replace(
      '## Table of Contents',
      `## Table of Contents\n\n${tableOfContents.join('\n')}`
    );

    readmeContent += `
## Description

${description}

## Usage

${usageSynopsis}

## Credits

This project was developed by Marcies Smith.

## License

${licenseBadge}
`;

    const readmePath = path.join(currentDir, 'README.md');
    fs.writeFile(readmePath, readmeContent, (err) => {
      if (err) throw err;
      console.log('README.md file created successfully.');
    });
  });
