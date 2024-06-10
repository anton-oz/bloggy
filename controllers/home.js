const router = require('express').Router();

// Home
router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;