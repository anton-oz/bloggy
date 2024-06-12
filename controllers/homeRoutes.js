const router = require('express').Router();
const authenticate = require('../utils/authenticate');

const { Post, User } = require('../models');
// Home
router.get('/', authenticate, (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
    });
});

router.get('/post/:id', authenticate, async (req, res) => {
    try {
        const rawPost = await Post.findByPk(req.params.id);
        if(!rawPost) {
            res.status(500).json({ error: "post with that id does not exists" });
            return;
        }
        let post = rawPost.get({ plain: true });
        res.render('post', {
            post
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    
    res.render('login', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;