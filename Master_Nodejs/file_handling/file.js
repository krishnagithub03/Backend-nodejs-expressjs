const fs = require("fs");
const os = require("os");


console.log(os.cpus().length);


// syncronous ca;;
// fs.writeFileSync("./test.txt","Hey, There");


// async
// fs.writeFile("./test.txt","Hello buddy Async", (err) =>{});


// const res = fs.readFileSync('./contacts.txt','utf-8');
// ye sync mai return krta h result ko
// console.log(res);





// ye kuch return nhi krta ye expect krta h ki tum isko ek callback funct doge aur ye uspe ans dega
// fs.readFile("./contacts.txt","utf-8",(err, res) =>{
//     if(err){
//     console.log("Error",err);
//     } else{
//         console.log(res);
//     }
// });
  

// ye overwrtie nhik krt aye aage data ko append krta h 
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

// fs.cpSync("./test.txt","./copy.txt");
// copy


// fs.unlinkSync("./copy.txt");
//delete krne ke liye








// async and sync

//sync blacking 
// console.log("1");
// const res = fs.readFileSync("./contacts.txt","utf-8");
// console.log(res);

// console.log("2");

//async  non-blocking
// console.log("1");

// fs.readFile("./contacts.txt","utf-8",(err,res) => {
//     console.log(res);
// });

// console.log("2");

// iska output aayega 1 2 then res kyuki jab tak res calculate hua tab tak usne 2 ko print kr diya 

