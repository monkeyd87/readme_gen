const inquirer = require('./.gitignore/node_modules/inquirer')
const fs = require('fs')

console.log('running')

const prompt = inquirer.createPromptModule()

async function getData() {
    let info = await prompt(
        [
            {
                type: 'input',
                name: 'github',
                message: 'What is your github?',
                validate: (input)=>{
                    return input? true: 'You must give a a github.' 
                }
            },

            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                validate: (input)=>{
                    return input? true: 'You must give a a email.' 
                }
            },

            {
                type: 'input',
                name: 'title',
                message: 'What the title',
                validate: (input)=>input? true: 'You must add a title',
                
            },

            {
                type: 'input',
                name: 'discription_short',
                message: 'What the give a one line description',
                validate: (input)=>input? true: 'Must give a short description',
                
            },
            {
                type: 'input',
                name: 'instructions',
                message: 'is there any install instructions',
                 
        
            },

            {
                type: 'input',
                name: 'discription',
                message: 'What the description',
                validate: (input)=>input? true: 'You must add a description',
                
            },

            {
                type: 'checkbox',
                name: 'languages',
                message: 'What languages did you use.',
                choices: ['html', 'javascript', 'python', 'css']
        
            },

            {
                type: 'list',
                name: 'licenese',
                choices:[
                    'Apache License 2.0.',
                    'Boost Software License 1.0',
                    'BSD',
                    'Eclipse Public License 1.0',
                    'Creative Commons'


                ]
            }
        ]
    )
    const data = await info
    fs.writeFile('readme.md', reamMeTemplate(data), (err)=>console.error(err))
    return data

}

const license = {'Apache License 2.0.':'[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)','Boost Software License 1.0':'[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)','BSD':'[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)','Eclipse Public License 1.0':'[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)','Creative Commons':'[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)'}

getData().then(data=>console.log(data))
function reamMeTemplate(data) {
   const readMe = 
   `
# ${data.title}
    
## ${data.discription_short}

*[lincenses](#license)

*[languages](#Languages)

*[instructions](#instructions)

*[Questions](#questions)

${data.discription}

## Instructions:
 ${data.instructions?data.instructions: 'N/A'}

    
## Languages
${data.languages.join(', ')}


## license
${license[data.licenese]}
    

#Questions
If you need to reach me you could send men an email ${data.email} or send me message at my git hub at [${data.github}](https://github.com/${data.github})



    
`
    return readMe

}
