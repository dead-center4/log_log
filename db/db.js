const Sequelize = require('sequelize');
const { dbname, username, password, hostname } = require('../vars.js').db;

const sequelize = new Sequelize(dbname, username, password, {
    host: hostname,
    dialect: 'sqlite',
    logging: false,
    storage: './db/db.sqlite'
});

const Table = sequelize.define('loglogs', {
    place: Sequelize.TEXT,
    description: Sequelize.TEXT,
    rating: Sequelize.INTEGER,
    uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: Sequelize.STRING,
    userID: Sequelize.STRING,
    guildID: Sequelize.STRING,
    epochtime: Sequelize.INTEGER
});

// better error text?
// issue with adding log to db. still empty.

const db_addLog = async (time, place, description, rating, username, userID, guildID) => {
    try {

        const entry = await Table.create({
            place: place,
            description: description,
            rating: rating,
            username: username,
            userID: userID,
            guildID: guildID,
            epochtime: time
        });
        let date = new Date(time);
        let day = date.toLocaleDateString();
        let outtime = date.toLocaleTimeString();
        return {status: 0, res: `#${entry.uid}: ${entry.username} - ${entry.place} on ${day} at ${outtime}: ${entry.rating}/10: ${entry.description}`}

    } catch (error) {
        console.log(error);
        return { status: 1, res: "An error occurred with the DB"};
    }
};


const db_getLogsForUser = "";

const db_getGuildLogs = async (guildID) => {
    try {
        const logList = await Table.findAll({ where: { guildID: guildID }} );
        const logString = logList.map(l => {
            let date = new Date(l.epochtime);
            let day = date.toLocaleDateString();
            let time = date.toLocaleTimeString();
            return `#${l.uid}: ${l.username} on ${day} at ${time}: ${l.rating}/10 log: ${l.description}`
        }).join('\n') || 'No log logs found :(';
        return logString;
    } catch {
        return 'no log logs found. :(';
    }
    
};

const db_getUserLogs = async (user) => {
    try {
        let logList = await Table.findAll({ where: { userID: user.id } });
        let username = `${user.username}#${user.discriminator}`
        if (logList[0]) {
            let logString = logList.map(l => {
                let date = new Date(l.epochtime);
                let day = date.toLocaleDateString();
                let time = date.toLocaleTimeString();
                return `#${l.uid}: on ${day} at ${time}: ${l.rating}/10 log, ${l.description}`
            });
            return `Here are the logs for ${username}:\n\n${logString}`;
        } else {
            return `Did not find logs for ${username}`
        }
        
    } catch (error) {
        console.log(error);
        return "An error occured with the DB"
    }

    return `Logs for ${userID}`
};

const db_getLastNLogs = async (n) => {
    return `Last ${n}`;
};

const db_deleteLog = async (logID, userID) => {
    const log = await Table.findOne({ where: { uid: logID } });
    console.log(userID, log.userID);
    if (!log) {
        return "Log does not exist!";
    } else if (!(log.userID.toString() === userID.toString())) {
        return "This log does not belong to you. You can only delete your own logs!";
    } else {
        try {
            await Table.destroy({ where: { uid: logID } });
            console.log(`Deleted log ${logID}`);
            return `Log #${logID} successfully deleted!`;
        } catch (error) {
            console.log(error);
            return 'Something went wrong with the database';
        }
    }
};

const displayTable = "";

module.exports = {
    Table,
    db_addLog,
    db_getGuildLogs,
    db_getUserLogs,
    db_getLastNLogs,
    db_deleteLog,
};