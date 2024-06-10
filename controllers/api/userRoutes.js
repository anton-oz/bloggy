const router = require('express').Router();

const { User } = require('../../models');

// Create new User
router.post('/', async (req, res) => {
    try {
        const createUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
    
        req.session.save(() => {
            req.session.logged_in = true;
    
            res.status(201).json(createUser);
        });
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (res, req) => {
   
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ error: "incorrect username or password."});
            return;
        };
     
        const validatePassword = userData.checkPassword(req.body.password);
     
        if (!validatePassword) {
            res.status(400).json({ error: "incorrect username or password."});
            return;
        };
     
        req.session.save(() => {
            req.session.logged_in = true;
    
            res.status(200).json({ success: "You are now logged in!" });
        });
    } 
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;