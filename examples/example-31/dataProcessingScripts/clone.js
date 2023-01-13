const fs = require('fs');
const { execSync } = require('child_process');

const clone = (repositories) => {

  try {
  execSync('rm -Rf repositories && mkdir repositories');
} catch(e) {}

  repositories.forEach(({ name, org }) => {
    let command = `git clone https://github.com/${org}/${name}.git`;
    console.log(command);
    try {
    execSync(command, { cwd: './repositories' }, (error, stdout, stderr) => {
      /*
      let command2 = `git pull https://github.com/${org}/${name}.git`;

      exec(command2, { cwd: './repositories' }, (error, stdout, stderr) => {
        console.log('Error during clone: ' + error);
      });
*/
    });
  } catch (e) {}
  });
};

module.exports = clone;
