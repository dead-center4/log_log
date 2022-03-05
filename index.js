const { TOKEN } = require('./vars.js');
const { registerSlashCommands } = require('./register.js');
const { addLog, getGuildLogs, help, deleteLog, getUserLogs, getLastNLogs } = require('./logic.js');
const { Table } = require('./db/db.js');

registerSlashCommands();


const { Clients, Intents, Client, CommandInteractionOptionResolver, IntegrationApplication } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
    const sync = await Table.sync();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;


    /*// down for maintenance lol.
    if (interaction.guild) {
        await interaction.reply("Log Log is down for maintenance!");
        return;
    }
    */
    
    if (!interaction.guild) {
        await interaction.reply("This command is only available in servers!");
        return;
    }
    
    if (interaction.commandName === 'loglog') {
        /***
         * add option to get logs for specific user
         * only last 5?
         * average rating?
         * number of logs logged?
        ***/
        let command = interaction.options.getSubcommand();
        if (command === 'add') {
            let place = interaction.options.getString('place');
            let description = interaction.options.getString('description');
            let rating = interaction.options.getInteger('rating');

            let res = await addLog(interaction);
            await interaction.reply(res);

        } else if (command === 'delete') {
            let id = interaction.options.getInteger('log-id');
            let userID = interaction.user.id;
            let res = await deleteLog(id, userID);
            await interaction.reply(res);

        } else if (command === 'help') {
            await interaction.reply(help());

        } else if (command === 'all') {
            let res = await getGuildLogs(interaction.guild.id);
            await interaction.reply(res);

        } else if (command === 'get') {
            let res = '';
            if (interaction.options.getUser('user')) {
                res = await getUserLogs(interaction.options.getUser('user'));
            } else if (interaction.options.getInteger('last')) {
                res = await getLastNLogs(interaction.options.getInteger('last'));
            } else {
                res = await getGuildLogs(interaction.guild.id);
            }
            await interaction.reply(res);
        }

    } else if (interaction.commandName === 'loglog-add') {
        await interaction.reply("command deprecated - use /loglog add ... ")
        
    } else if (interaction.commandName === 'loglog-help') {
        await interaction.reply("command deprecated - use /loglog help");
    }
});

client.login(TOKEN);