import commentModel from "../../../../DB/model/comment.model.js";
import postModel from "../../../../DB/model/post.model.js";


export const getPosts = async (req, res, next) => {

   const cursor = postModel.find({}).populate([
      {
         path: 'userId',
         select: 'userName profilePic'
      },
      {
         path: 'like',
         select: 'userName profilePic'
      },
      {
         path: 'unLike',
         select: 'userName profilePic'
      } 
   ]).cursor();

   const postList=[];
   for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      console.log(doc); 
      const comment = await commentModel.find({postId:doc._id,commentType:"comment"}).populate([
         {
            path: 'userId',
            select: 'userName profilePic'
         },
         {
            path: 'like',
            select: 'userName profilePic'
         },
         {
            path: 'unLike',
            select: 'userName profilePic'
         } ,
         {
            path:'reply',
            populate:[
               {
                  path: 'userId',
                  select: 'userName profilePic'
               },
               {
                  path: 'like',
                  select: 'userName profilePic'
               },
               {
                  path: 'unLike',
                  select: 'userName profilePic'
               } 
            ]
         }
      ]);
      postList.push({post:doc,comment});
   }
   return res.json({ message: "Done", postList }); 

}

export const createPost = async (req, res, next) => {

   const { title, caption } = req.body;
   if (!req.file) {
      return next(new Error('file is required', { cause: 400 }));
   }
   const id = req.user._id;
   console.log(req);
   const post = await postModel.create({ title, caption, image: req.file.dest, userId: id });

   return res.status(201).json({ message: "Done", post });

}

export const likePost = async (req, res, next) => {

   const _id = req.user._id;
   const { id } = req.params;

   const post = await postModel.findOneAndUpdate({ _id: id, like: { $nin: _id } }, {
      $push: { like: _id },
      $pull: { unlike: _id },

   }, { new: true });

   if (!post) {
      return next(new Error("In-valid post Id", { couse: 400 }));
   }
   post.totalVote = post.like.length - post.unLike.length;
   await post.save();
   return res.status(201).json({ message: "Done", post });

}


export const unLikePost = async (req, res, next) => {

   const _id = req.user._id;
   const { id } = req.params;
   const post = await postModel.findOneAndUpdate({ _id: id, unlike: { $nin: _id } }, {
      $push: { unlike: _id },
      $pull: { like: _id },

   }, { new: true });

   if (!post) {
      return next(new Error("In-valid post Id", { couse: 400 }));
   }
   post.totalVote = post.like.length - post.unLike.length;
   await post.save();
   return res.status(201).json({ message: "Done", post });

}


// =============================================== Comment section ==========================================================

