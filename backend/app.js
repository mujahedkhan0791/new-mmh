// const bodyParser = require('body-parser');
const express  = require('express');
const path = require('path');

const mongoose = require('mongoose');

// const Post = require('./models/post');
const postsRoutes = require('./routes/posts');
const registrationRoutes = require('./routes/registration');
const billindRoutes = require('./routes/billing');
const settingsRoutes = require('./routes/settings');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect("mongodb+srv://mujahedkhan:" +process.env.MONGO_ATLAS_PW +"@cluster0.vj12dwm.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  // useUnifieldTopology: true,
  dbName: "test"
})
  .then(() => {
    console.log("Connected to DB");
  }).catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });



// app.delete("/api/posts/:id", async (req, res, next)=> {
//   Post.deleteOne({_id: req.params.id}).then(result => {
//     console.log(result);
//     res.status(200).json({message: "Deleted!"})
//   });
// });
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});



// app.get('/api/posts',(req, res, next) => {
//   Post.find().then(documents => {
//     console.log('testingMD',documents);
//     res.status(200).json({
//       message: "post message successfully",
//       post: documents
//     });
//   })
//   });
// app.put('/api/posts/:id',(req, res, next) => {
//   const post = { _id: req.body.id, title: req.body.title, content: req.body.content};
//   Post.updateOne({_id: req.body.id}, post).then(result => {
//     console.log('put',result);
//     res.status(200).json({message: 'Updated!'});
//   });
//   });

// app.use((req, res, next) => {
// console.log("My meddle ware");
// next();
// });
// app.use( (req, res, next) => {
//   res.send(`<h1 style="color: red;">hello</h1>`);
// });

app.use('/api/user', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/billing', billindRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/images', express.static(path.join('backend/images')));

module.exports = app;
