const router = require('express').Router();

const authenticate = require('../../utils/authenticate');

const { Post } = require('../../models');

// Create new post
router.post('/', authenticate, async (req, res) => {
    try {
        const newPostRaw = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        if (!newPostRaw) {
            res.status(500).json({ error: "database creation error" });
            return;
        };
        const newPost = newPostRaw.get({ plain: true });

        console.log('newpost', newPost);
        res.status(201).json(newPost);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

// Get a post by id
router.get('/:id', authenticate, async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: {
                    exclude: ['password'],
                },
            }],
        });
        if (!singlePost) {
            res.status(400).json({ error: `Post with id: ${req.params.id} does not exist.` });
            return;
        };
        res.status(200).json(singlePost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', authenticate, (req, res) => {
    try {
        const updatePost = Post.update(
            req.body,
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        if (!updatePost) {
            res.status(400).json({ error: `Post with id: ${req.params.id} does not exist.` });
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;