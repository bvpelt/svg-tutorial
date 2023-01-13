const fs = require('fs');
const { exec } = require('child_process');

const clone = (repositories) => {

  exec('mkdir repositories');
  
  repositories.forEach(({ name, org }) => {
    let command = `git clone https://github.com/${org}/${name}.git`;
    console.log(command);
    exec(command, { cwd: './repositories' }, (error, stdout, stderr) => {
      /*
      let command2 = `git pull https://github.com/${org}/${name}.git`;

      exec(command2, { cwd: './repositories' }, (error, stdout, stderr) => {
        console.log('Error during clone: ' + error);
      });
*/
    });
  });
};

module.exports = clone;
