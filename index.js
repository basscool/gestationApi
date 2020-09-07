const express= require("express");

const app= express();

let port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("merci a tous")
});

app.get('/api/user',(req,res)=>{
    res.send([
        {
            id:"1",
            nom:'Coulibaly'
        },
        {
            id:"2",
            nom:'Bamba'
        }
    ])
})


app.listen(port,()=>{
    console.log("serveur est marche")

});