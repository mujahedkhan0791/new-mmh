const express = require("express");
const multer = require('multer');

const router = express.Router();
const Post = require('../models/post');

const checkAuth = require("../middleware/check-auth");
const e = require("express");

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
      if (isValid) {
          uploadError = null;
      }
      cb(uploadError, 'backend/images');
  },
  filename: function (req, file, cb) {
      const filename = `${file.originalname.split(' ').join('-')}`;
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`);
  }
});

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extends: false}));

router.post("",checkAuth, multer({storage:storage}).single("image"), async (req, res, next)=> {
  const url = req.protocol + '://' + req.get("host");
  let posts = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  // console.log('req.userData',req.userData);
  // return req.status(200).json({});
  posts = await posts.save();
  res.status(201).json({
    message: "Post addedd successfully",
    // post: {
    //   ...
    // }
  })
  });

  router.delete("/:id",checkAuth, async (req, res, next)=> {
    Post.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      if(result.deletedCount >0){ //nModified
        res.status(200).json({
          message: "Updated Successful!"
        })
      }else {
        res.status(401).json({
          message: "Updated Successful!"
        })
      }
      // res.status(200).json({message: "Deleted!"})
    });
  });




  // router.use('',(req, res, next) => {
  // const posts = [
  //   {is:'123456789', title: 'Title',content: "Content"},
  //   {is:'asdfghjk', title: 'Title2',content: "Content2"}
  // ];
  // res.status(200).json({
  //   message: "pi=ost message successfully",
  //   post: posts
  // })
  // });

  router.get('',(req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = req.query. page;
    const postQuery = Post. find();
    if (pageSize && currentPage) {
      postQuery
      .skip(pageSize * (currentPage - 1))
      .limit (pageSize);
    }
    postQuery.then(documents => {
      // console.log('testingMD',documents);
      res.status(200).json({
        message: "post message successfully",
        post: documents
      });
    })
    });
  router.put('/:id',checkAuth, multer({storage:storage}).single("image"),(req, res, next) => {
    // console.log('req.body.image', req.body);
    let imagePath = req.body.imagePath;
    if(req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath: url + "/images/" + req.file.filename;
    }
    // console.log('resput', imagePath);

    const post = { _id: req.body.id, title: req.body.title, content: req.body.content, imagePath: imagePath,  creator: req.userData.userId};
    Post.updateOne({_id: req.body.id, creator: req.userData.userId}, post).then(result => {
      // console.log('put',result);
      // console.log(result);
      if(result.matchedCount >0 || result.modifiedCount >0){ //nModified  changed to modifiedCount
        res.status(200).json({
          message: "Updated Successful!"
        })
      }else {
        res.status(401).json({
          message: "Not Authorized!"
        })
      }
      // res.status(200).json({message: 'Updated Successfu l!'});
    });
    });

  router.use((req, res, next) => {
  console.log("My meddle ware");
  next();
  });
  // router.use( (req, res, next) => {
  //   res.send(`<h1 style="color: red;">hello</h1>`);
  // });

  module.exports = router;
