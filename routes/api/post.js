
const userModel = require('../../models/userModel')
const express = require('express')
const Post = require('../../models/post')
const protect = require('../../middleware/auth')


const app = express()

const router = express.Router()

router.route("/").post( protect,  async (req, res) => {

 
    try {

        const user = await userModel.findById(req.user.id).select('-password');
        console.log(user)

    const newPost = {
        text: req.body.text,
        name: user.name, 
        avatar : user.avatar,
        user: req.user.id 

    }
    const post = new Post(newPost)
    await post.save()
    res.json(post)

    }catch(e) {
        console.log(e)
    }


})

router.route("/:id").get(protect, async(req, res)=> {

    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404)
        }
        res.json(post)
    }catch(e) {
        console.log(e)
    }


})


router.route("/:id/delete").delete(protect, async(req, res)=> {

    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() != req.user.id) {
            return res.json({'msg': 'you dont have the right'})
        }
        await post.remove()
        res.json({'msg': 'removed'})
    }catch(e) {
        console.log(e)
    }


})


router.route('/:id/like').put( protect, async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter( like => like.user.toString() === req.user.id).length > 0 ) {
            res.json({"msg": "already liked"})
        }
        post.likes.unshift({user: req.user.id})
        await post.save()
        res.json(post.likes)

    }
    catch(e) {
        console.log(e)
    }
} )


router.route('/:id/unlike').put( protect, async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        if(post.likes.filter( like => like.user.toString() === req.user.id).length === 0 ) {
            res.json({"msg": "post has been not liked"})
        }
        
        const index = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(index, 1)
        await post.save();
        res.json(post.likes)

        
    }
    catch(e) {
        console.log(e)
    }
} )


router.route('/:id/comment').post( protect, async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id).select('-password')
        const user = await userModel.findById(req.user.id)

        const newComment = new Post ({
            text: req.body.text,
            name: user.name,
            avatar : user.avatar,
            user: req.user.id
        })

        post.comments.unshift(newComment);
        await post.save()

        res.json(post.comments)

        
    }
    catch(e) {
        console.log(e)
    }
} )


router.route('/:id/uncomment').delete( protect, async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id).select('-password')
        const user = await userModel.findById(req.user.id)

        if(post.comments.filter(comment => comment.user.toString() === req.user.id).length === 0) {
            res.json({'msg': 'you cant'})
        }
        const index= post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(index, 1)
        
        await post.save()
        res.json(post.comments)
        
    }
    catch(e) {
        console.log(e)
    }
} )






module.exports = router