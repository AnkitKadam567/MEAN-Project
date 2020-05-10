const Post = require("../models/post")

exports.addPost = (req, res, next) => {      
const url = req.protocol + '://' + req.get("host");
const post = new Post(
    {
        title: req.body.title,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        creator:req.userData.userId
    }
)
console.log(post);
post.save()
    .then(
        (data) => {
            console.log(data.title+" IN ADD "+data.description)
            res.status(201).json(
                {
                    message: "Post added successfully",
                    post:{
                        ...data,
                        id: data._id  // this will return all data object and override the id property
                    }
                }
            )
        }
    )
    .catch(
        (error) => {
            res.status(500).json(
                {message : "Creating a post failed!!"}
            )
        }
    )
}

exports.getPost = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const pageIndex = +req.query.pageIndex;
    let fetchedPostsData;
    
    postQuery =  Post.find()
    if(pageSize!==null && pageIndex!==null){
        console.log(pageSize+" "+(pageSize * (pageIndex - 1)))
        postQuery
            .skip(pageSize * (pageIndex - 1))
            .limit(pageSize)
    }
    postQuery
    .then(
        document => {
            fetchedPostsData = document;
            return Post.count() 
        }
    )
    .then(
            (count) => {
               // console.log(result)
                res.status(200).json({
                    message: "Post fetched successfully",
                    posts: fetchedPostsData,
                    postCount : count
                });
            }
        )
        .catch(
            (error) => {
                res.status(500).json("Some error occured while fetching posts")
            }
        )
}

exports.updatePost = (req,res,next) => {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://" + req.get("host")
        imagePath = url + "/images/" + req.file.filename;
    }
   console.log(req.userData)
    const post = new Post({
        _id : req.body.id,
        title : req.body.title,
        description : req.body.description,
        imagePath : imagePath,
        creator : req.userData.userId 
    })
    console.log(post+" in update")
    Post.updateOne({_id:post.id,creator:req.userData.userId},post)
        .then((post)=>{
            if(post.n > 0){
                res.status(200).json(
                    {
                        message : "Data saved to database"
                    }
                )
            }else{
                res.status(401).json(
                    {
                        message : "Not Authorised!!"
                    }
                )
            }
            
        })
        .catch((error)=>{
            res.status(500).json({
                message : "Post update failed!!"
            })
        })
}

exports.getPostById = (req,res,next) => {
    // console.log(req.params.postId)
     Post.findById({_id : req.params.postId})
         .then(
             (data) => {
                
                 res.status(201).json(
                     {
                         message: "Post fetched successfully",
                         post:{
                             id: data._id,
                             title: data.title,
                             description: data.description,
                             imagePath: data.imagePath
                         }
                     }
                 )
             }
         )
         .catch(
             (error) => {
                 res.status(500).json("Some error occured while fetching post")
             }
         )
 }

 exports.deletePost = (req, res, next) => {
     console.log(req)
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
      result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      }
    );
  }