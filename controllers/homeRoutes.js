const router = require('express').Router();
const authenticate = require('../utils/authenticate');
// Home
router.get('/', authenticate, (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    
    res.render('login');
});

module.exports = router;