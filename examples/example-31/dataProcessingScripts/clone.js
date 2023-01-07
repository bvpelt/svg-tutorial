const fs = require("fs")
const { exec } = require("child_process")
const depends = require("./depends");

const clone = () => {
  exec('mkdir repositories', (error, stdout, stderr) => {
   
  });

  // clone each repo
  depends.forEach(repo => {
    let command = `git clone https://github.com/d3/${repo}.git`
    console.log(command);
    exec(command, { cwd: './repositories' }, (error, stdout, stderr) => {
      if (error) {
        //console.log(error);

        let command = `git pull`
        console.log(command + ' for repo: ' + repo);
        exec(command, { cwd: './repositories/' + repo }, (error, stdout, stderr) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  });
}

module.exports = clone;
