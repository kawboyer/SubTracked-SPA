var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GithubSchema = new Schema({

    name:{
        type: String,
        unique: true
    },
    link:{
        type: String,
        unique: true
    }
});
var Github = mongoose.model("Github", GithubSchema);

var erik = new Github ({
    name: "Erik Augenzucker",
    link: "https://github.com/Eaug2"
});
var josh = new Github ({
    name: "Josh Dulin",
    link: "https://github.com/jzdulin"
});
var klara = new Github ({
    name: "Klara Boyer",
    link: "https://github.com/kawboyer"
});
var taddes = new Github ({
    name: "Taddes Korris",
    link: "https://github.com/taddes"
});

erik.save(function(err){
    if(err) console.log("Error on ESave");
})
josh.save(function(err){
    if(err) console.log("Error on JSave");
})
klara.save(function(err){
    if(err) console.log("Error on KSave");
})
taddes.save(function(err){
    if(err) console.log("Error on TSave");
})

module.exports = Github;