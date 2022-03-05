const {
    db_addLog,
    db_getGuildLogs,
    db_getUserLogs,
    db_getLastNLogs,
    db_deleteLog
} = require('./db/db.js');

const addLog = async (interaction) => {
    let place = interaction.options.getString('place');
    let description = interaction.options.getString('description');
    let rating = interaction.options.getInteger('rating');
    let user = interaction.user;
    let username = user.username + "#" + user.discriminator;
    let userID = user.id;
    let guildID = interaction.guild.id;

    let dateUTC = Date.now();

    let { status, res } = await db_addLog(dateUTC, place, description, rating, username, userID, guildID);
    console.log(`Successfully logged log for ${username}`);
    if (status === 0) {
        return res;
    } else {
        console.log("An error occursed with the db");
        return res;
    }
     
};

const getGuildLogs = async (guildID) => {
    return await db_getGuildLogs(guildID);
};

const getUserLogs = async (user) => {
    return await db_getUserLogs(user);
};

const getLastNLogs = async (n) => {
    return await db_getLastNLogs(n);
};

const deleteLog = async (logID, userID) => {
    return await db_deleteLog(logID, userID);
};

const help = () => {
    return "<help text>"
};


module.exports = {
    addLog,
    getGuildLogs,
    getUserLogs,
    getLastNLogs,
    deleteLog,
    help,
};
