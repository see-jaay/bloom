
// const fs = require('fs');

const readJSON = async (path) => {
  try {
    // const data = await fsmod.readFile('./manifest/temp.json');
    console.log(fs)
  } catch (err) {
    console.error(`issue reading file at path: ${path} \n Error: ${err.message}`)
  }
}

const writeJSON = async (path, data) => {
  try {
    console.log('writing new json file...');
  } catch (err) {
    console.log(`issue when writing a new JSON file ${err.message}`);
  }
}

export {
  readJSON, 
  writeJSON
}