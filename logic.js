const { db_addLog, db_getLogs } = require('./db/db.js');

/* TODO
    fix the logic here. may just need to store as UTC and convert later
*/
const addLog = async (place, description, rating, user) => {
    let username = user.username + "#" + user.discriminator;
    let dateUTC = Date.now();

    let {status, res} = await db_addLog(dateUTC, place, description, rating, username);
    console.log(`Successfully logged log for ${username}`);
    if (status === 0) {
        return res;
    } else {
        console.log("An error occursed with the db");
        return res;
    }
     
}

const getLogs = async () => {
    return await db_getLogs();
}

const help = () => {
    return "<help text>"
}


module.exports = {
    addLog,
    getLogs,
    help,
};
