const sequelize = require('../config/connection');
const {User, Post} = require('../models');

const userData = require('./testUsers.json');
const postData = require('./testPosts.json');

const seed = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, { individualHooks: true });
    await Post.bulkCreate(postData);

    process.exit(0);
};

seed();