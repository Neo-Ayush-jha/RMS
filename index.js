var express = require ("express");
var mongoose = require("mongoose");
var bodyParser=require("body-parser");
var app =express();
const urlencoded = require('body-parser')

// data base
mongoose.connect("mongodb://localhost/school")
var UserSchema = mongoose.Schema({
    name:{type:String,
    require:true
    },
    phone:{type:Number,
    require:true
    },
    name:{type:String,
    require:true
    },
    email:{type:String,
    require:true
    },
    maths:{type:Number,
    require:true
    },
    sci:{type:Number,
    require:true
    },
    sst:{type:Number,
    require:true
    },
    eng:{type:Number,
    require:true
    },
    hindi:{type:Number,
    require:true
    },
   
});

var UserCollection = mongoose.model("user", UserSchema)
 app.set("view engine","pug");
 app.set("views","./school");

//  body parser
var urlecoderParser = bodyParser.urlencoded({extended:true});

// homepage
app.get("/" ,function(req,res){
    UserCollection.find(function(err,response){
        res.render("student",{data:response})
    })
});

// delete
app.post("/deleteRecord",urlecoderParser,function(res,req){
    UserCollection.remove({"_id":req.body._id},function(err,response){
        return res.redirect("/")
    })
})
// insert
app.post("/insert",urlecoderParser,function(req,res){
    let user = req.body;
    var app = new UserCollection({
        name:user.name,
        phone:user.phone,
        email:user.email,
        maths:user.maths,
        sci:user.sci,
        sst:user.sst,
        eng:user.eng,
        hindi:user.hindi,
    });
    app.save();
    return res.redirect("/")
});

// // edit

app.get("/edit/:id",function(req,res){
    let id = req.params.id;
    UserCollection.findOne({"_id":id} , function(err,response){
        res.render("edit",{data:response});
    })
})
// post
app.post("/edit/:id",urlecoderParser,function(req,res){
    let id =req.params.id;
    UserCollection.updateOne({"_id":id},{$set:{"name":req.body.name,"phone":req.body.phone,"email":req.body.email ,"maths":req.body.maths,"sci":req.body.sci,"sst":req.body.sst,"eng":req.body.eng,"hindi":req.body.hindi}}, function(err,response){
        return res.redirect("/")
    })
});
app.listen(8081);

// collection
// mongoose.connect("mongodb://localhost/school")
// var UserSchema=mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     DOT:{
//         type:String,
//         require:true
//     },
//     father_name:{
//         type:String,
//         require:true
//     }
// })
// var UserCollection = mongoose.model("user", UserSchema)
