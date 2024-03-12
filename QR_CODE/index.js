// Use the inquirer npm package to get user input
import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message : "Type your URL : ",
        name : "URL",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    console.log(`QR Code generated successfully!`);
    fs.writeFile("URL.txt", url, (err)=>{
        if(err) throw err;
        console.log('File Saved!');
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
//the user entered URL into a QR code image.

//Create a txt file to save the user input using the native fs node module.

