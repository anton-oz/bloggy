const router = require('express').Router();

const authenticate = require('../../utils/authenticate');

const { Comment } = require('../../models');

router.post('/', authenticate, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id  
        });
        if (!newComment) {
            res.status(400).json({ error: "database error" });
            return;
        };
        res.status(201).json({ success: "comment created successfully!" })
    }
    catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;