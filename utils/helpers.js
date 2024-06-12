const { post } = require("../controllers");

module.exports = {
    format_date: (date) => {
        const postDate = new Date(date);
        const now = new Date();

        const dayDifference = (now - postDate) / (1000 * 60 * 60 * 24);
        const hourDifference = (now - postDate) / (1000 * 60 * 60);
        const minuteDifference = Math.round((now - postDate) / (1000 * 60));

        // return `Posted ${dayDifference} day/s and ${hourDifference} hour/s ago. post date ${postDate}`
        return `Posted ${minuteDifference} minutes ago`;
    },
}