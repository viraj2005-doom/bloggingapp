const {Router} = require('express');
const multer = require('multer');
const User = require('../models/user');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
//const { verifytokenforuser } = require('../service/auth');
const path = require('path');
const { checkforauth } = require('../middlewares/auth');
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Show the "Add Blog" form
router.get("/add", checkforauth("token"), (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin?returnTo=/blog/add');
    }
    return res.render("addblog", {
        user: req.user
    });
});


router.post("/add", checkforauth("token"), upload.single("image"), async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin?returnTo=/blog/add');
    }
    
    const { title, content } = req.body;
    
    const blog = await Blog.create({
        title,
        body: content,
        createdBy: req.user._id,
        coverImageURL: req.file ? `/uploads/${req.file.filename}` : null
    });
    
    return res.redirect(`/`);   
});


router.get("/:id", checkforauth("token"), async (req,res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy', 'firstName profileImageURL');

    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy', 'firstName profileImageURL');
    
    return res.render("blog", {
        user: req.user,
        blog: blog,
        comments: comments
    });
})

router.post("/comment/:blogId", checkforauth("token"), async(req,res) => {
     if (!req.user) {
        return res.redirect('/user/signin');
    }
     await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.blogId}`);
})
module.exports = router;

