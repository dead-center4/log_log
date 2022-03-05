const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { TOKEN, APPLICATION_ID, CLIENT_ID, PERMISSION_INTEGER } = require('./vars.js');

const commands = [{
    name: 'loglog',
    description: 'Log Log commands',
    options: [{
        name: 'add',
        type: 1,
        description: 'Log a log to the Log Log',
        required: false,
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
        name: 'delete',
        type: 1,
        description: 'Delete a log from the Log Log',
        required: false,
        options: [
            {
                type: 4,
                name: 'log-id',
                description: 'Delete a log with a specified ID from the Log Log',
                required: true,
            }
        ]
    }, {
        name: 'all',
        type: 1,
        description: 'Get all logs from the Log Log',
    }, {
        name: 'get',
        type: 1,
        description: 'Get specific logs from the Log Log',
        options: [
            {
                type: 6,
                name: 'user',
                description: "Get a specific user's logs from the Log Log"
            },
            {
                type: 4,
                name: 'last',
                description: "Get the last X logs from the Log Log"
            }
        ]
    }, {
        name: 'help',
        type: 1,
        description: 'Get help with the Log Log'
    }]
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