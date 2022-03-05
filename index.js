const { registerSlashCommands, TOKEN } = require('./register.js');
const { addLog, getLogs, help } = require('./logic.js');
const { Table } = require('./db/db.js');

registerSlashCommands();


const { Clients, Intents, Client, CommandInteractionOptionResolver } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', async () => {
    const sync = await Table.sync();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // down for maintenance lol.
    if (interaction.guild) {
        await interaction.reply("Log Log is down for maintenance!");
        return;
    }

    /*
    if (!interaction.guild) {
        await interaction.reply("This command is only available in servers!");
        return;
    }
    */
    console.log(interaction.guild.id);
    if (interaction.commandName === 'loglog') {
        console.log(interaction.guild.id);
        /***
         * add option to get logs for specific user
         * only last 5?
         * average rating?
         * number of logs logged?
        ***/
        let res = await getLogs();
        await interaction.reply(`Here is the updated Log Log:\n${res}`);
    } else if (interaction.commandName === 'loglog-add') {


        let place = interaction.options.getString('place');
        let description = interaction.options.getString('description');
        let rating = interaction.options.getInteger('rating');

        let res = await addLog(place, description, rating, interaction.user);

        await interaction.reply(res)
        
    } else if (interaction.commandName === 'loglog-help') {
        console.log(interaction.guild.id);
        await interaction.reply(help());
    }
});

client.login(TOKEN);