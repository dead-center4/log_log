const Sequelize = require('sequelize');
const { dbname, username, password, hostname } = require('../vars.js').db;

const sequelize = new Sequelize(dbname, username, password, {
    host: hostname,
    dialect: 'sqlite',
    logging: false,
    storage: 'db.sqlite'
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
    guildID: Sequelize.STRING,
    epochtime: Sequelize.INTEGER
});

// better error text?
// issue with adding log to db. still empty.

const db_addLog = async (time, place, description, rating, log_username, guildID) => {
    try {

        const entry = await Table.create({
            place: place,
            description: description,
            rating: rating,
            username: log_username,
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

const db_getLogs = async () => {
    const logList = await Table.findAll();

    try {
        const logString = logList.map(l => {
            let date = new Date(l.epochtime);
            let day = date.toLocaleDateString();
            let time = date.toLocaleTimeString();
            return `#${l.uid}: ${l.username} on ${day} at ${time}: ${l.rating}/10 log: ${l.description}`
        }).join('\n');
        return logString;
    } catch {
        return 'no log logs found. :(';
    }
    
};

const db_deleteLastLog = "";

const displayTable = "";

module.exports = {
    Table,
    db_addLog,
    db_getLogs,
};