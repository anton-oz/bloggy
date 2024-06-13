// const { post } = require("../controllers");

module.exports = {
    format_date: (date) => {
        const postDate = new Date(date);
        const now = new Date();

        const dayDifference = Math.trunc((now - postDate) / (1000 * 60 * 60 * 24));
        const hourDifference = Math.trunc((now - postDate) / (1000 * 60 * 60)); 
        const minuteDifference = Math.round((now - postDate) / (1000 * 60));

        // return `Posted ${dayDifference} day/s and ${hourDifference} hour/s ago. post date ${postDate}`
        if (minuteDifference <= 1) {
            return `Posted ${minuteDifference} minute ago`;
        }
        else if (minuteDifference < 60) {
            return `Posted ${minuteDifference} minutes ago`;
        }
        else if (minuteDifference >= 60 && dayDifference < 1) {
            const trueMinutes = minuteDifference - (hourDifference * 60);
            return `Posted ${hourDifference} hours and ${trueMinutes} minutes ago`
        }
        else if (dayDifference === 1) {
            const trueHours = hourDifference - (dayDifference * 24);
            const trueMinutes = minuteDifference - (hourDifference * 60);
            return `Posted ${dayDifference} day ago`
        }
        else if (dayDifference > 1) {
            const trueHours = hourDifference - (dayDifference * 24);
            const trueMinutes = minuteDifference - (hourDifference * 60);
            return `Posted ${dayDifference} days ago`
        }
    },
    create_date: (date) => {
        const createDate = new Date(date);
        return `User created on: ${createDate.toLocaleDateString()}`;
    }
}