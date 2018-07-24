var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    app             = express();


mongoose.connect("mongodb://localhost/website_v2");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



// Mongooose Model
var friendSchema = new mongoose.Schema({
    firstname: String, 
    lasstname: String, 
    address: String, 
    city: String, 
    state: String, 
    zipcode: Number, 
    state: String, 
    gender: {
        type: Boolean, 
        default: false,
        enum: ['male', 'female']
        
    },
    number: Number, 
    email: String, 
    Position: {
        type: Boolean, 
        default: false,
        enum: ['Manager', 'Supervisor', 'Labor']
        
    },
    employment: {
        type: Boolean, 
        default: false,
        enum: ['Fulltime', 'Partime','Contract']
        
    },
    education: {type: String, select: true},
    company: String,
    jobtitle: String,
    name: String,
    date: Date
});

var friend = mongoose.model("friend", friendSchema);


// Routes

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/index", function(req, res){
    res.render("index");
});

app.get("/register", function(req, res) {
    friend.find({}, function(err, friends){
        if(err){
            console.log("Error");
        }else{
            res.render("register", {friends: friends});
        }
    })
    
});


app.get("/show", function(req, res) {
   res.render("show"); 
});

app.post("/show", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    // var newIndex = {name:name, image:image};
    // index.push(newIndex);
    res.redirect("/show") ;
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Friends Server has Started!");
});