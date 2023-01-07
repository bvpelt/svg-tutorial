const { exec } = require("child_process")
const depends = require("./depends");


const knife = () => {

  //  exec('mkdir data', (error, stdout, stderr) => {
  //  });

  // clone each repo
  depends.forEach(repo => {
    exec('mkdir -p ./data/${repo}', (error, stdout, stderr) => {
    });

    let command = `cd repositories/${repo}; git log --pretty=format:"☕%h🔪%ad🔪%an🔪%s🔪%b" --date="iso" --no-merges --compact-summary > ../../data/${repo}.001.🔪sv`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
    })
  });
}

module.exports = knife;

