const router = require('express').Router();

const authenticate = require('../../utils/authenticate');

const { Post } = require('../../models');


router.post('/newpost', authenticate, async (req, res) => {
    try {
        const newPostRaw = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
        });
        if (!newPostRaw) {
            res.status(500).json({ error: "database creation error" });
            return;
        };
        const newPost = newPostRaw.get({ plain: true });

        console.log(newPost);
        res.status(201).send(newPost);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;