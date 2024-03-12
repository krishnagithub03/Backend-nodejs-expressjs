import express from "express";

const app = express();

app.get("/",(req,res)=>{
    const currDay = new Date();
    const dayNum = currDay.getDay();
    // console.log(dayNum);

    let dayType = "A Weekday";
    let adv = "pad le bhai";

    if(dayNum === 6 || dayNum ===0){
        dayType = "A Weekend";
        adv = "Maje maro";
    }

    res.render("index.ejs",
    { day : dayType,
      advice : adv,
    });
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})