const router = require('express').Router();
const authenticate = require('../utils/authenticate');

const { Post, User } = require('../models');
// Home
router.get('/', async (req, res) => {
    try {
        const rawPostData = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{ 
                model: User,
                attributes: {
                    exclude: ['id', 'password', 'createdAt'],
                }, 
            }],
        });
        const posts = rawPostData.map(post => post.get({ plain: true }));
        console.log('posts', posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(500).json(err);
    };
});

router.get('/dashboard', authenticate, async (req, res) => {
    try {
        const dbUserData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password'],
            },
            include: [{ 
                model: Post,
                where: {
                    user_id: req.session.user_id,
                }, 
            }],
        });
        if (!dbUserData) {
            res.status(400).json({ error: 'database error, check info' });
            return;
        }
        const userData = dbUserData.get({ plain: true });

        res.render('dashboard', {
            logged_in: req.session.logged_in,
            username: userData.username,
            createdAt: userData.createdAt,
            posts: userData.Posts
        });
    }
    catch (err) {
        res.status(500).json({error: `caught ${err}`});
    };
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
            logged_in: req.session.logged_in,
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