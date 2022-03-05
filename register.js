const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const TOKEN = 'OTQ4MDQ0MjM3NDIzOTI3MzQ2.Yh2FAA.dudXZ4ZHXmk2eadgY9eCfPlTL4E';
const APPLICATION_ID = '948044237423927346';
const CLIENT_ID = '948044237423927346';
const PERMISSION_INTEGER = 2112;

const commands = [{
    name: 'loglog',
    description: 'Get logs of logs from the log log',
}, {
    name: 'loglog-add',
    description: 'Log a log to the log log',
    options: [
        {
            type: 3,
            name: 'place',
            description: 'The site of the log',
            required: true
        },
        {
            type: 3,
            name: 'description',
            description: 'How the log went',
            required: true
        },
        {
            type: 4,
            name: 'rating',
            description: 'The log\'s rating (out of 10)',
            required: true
        }
    ]
}, {
    name: 'loglog-help',
    description: 'Get help with Log Log'
}];

const rest = new REST({ version: '9'}).setToken(TOKEN);

const registerSlashCommands = async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(await rest.put(
            Routes.applicationCommands(APPLICATION_ID),
            { body: commands },
        ));

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};


module.exports = { registerSlashCommands, TOKEN };