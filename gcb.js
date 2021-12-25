const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "G*";

const ytdl = require('ytdl-core');

const queue = new Map();

var servers = {};

client.login("Token ici");

function play(connection, message) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
  server.queue.shift();
  server.dispatcher.on("end", function() { 
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

client.on("ready", () => {
    console.log("Bot démmarré !");
    var adminlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - Bot")
		.addField(`Le bot a démarré !`, "Tout est prêt")
		.setFooter("Bot by NzoSifou - Logs bot")
		member.guild.channels.get('[id des logs ici]').send(adminlogs_embed)
	client.user.setActivity("G*aide", {
	  type: "PLAYING"
	});
});


client.on('guildMemberAdd', member => { 
member.guild.channels.get('[id du salon aéroport ici]').send(`Bienvenue ${member} sur le Discord de GeekCorner :grin:\nIci tu peux discuter avec les fans et GeekCorner lui-même !\nPour cela, vas dans <#714053746119802932> ou <#714053854768922664>\nTu as également des salons à thèmes: <#714168459340152935> pour la musique, <#733021556573470780> pour les mêmes, etc...\nPasse une belle journée, que ce soit sur Discord ou IRL!`);
});



client.on('guildMemberRemove', member => {
	member.guild.channels.get('[id du salon aéroport ici]').send(`${member.user.tag} nous a quitté :sob:\nC'est triste de l'apprendre mais c'est comme ça.Peut-être reviendra-t-il?`)
});




client.on('error', error => {
  console.log(error)
});

client.on("disconnected", () => {
    console.log("Bot éteint !");
    client.user.setStatus("offline");
});

client.on('message', message => {

    if (message.channel.type === "dm"){
    	if(message.content === prefix){
    		return message.channel.send("test");
    	}
    	else {
    		return;
    	}
    }
//-------------------- Someone --------------------

	if(message.content.startsWith("@someone")){
		if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de @someone !");
		message.channel.send(`<@${message.guild.members.random().user.id}>`)
	}

//-------------------- Fin Someone --------------------

//-------------------- Aide --------------------

    if(message.content === prefix + "help" || message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Aide")
        .setDescription("Voici les commandes disponibles :")
        .addField("G*aide */* G*help", "Affiche les commandes d'aides")
        .addField("G*admin", "Affiche les commandes d'administration")
        .addField("G*fun", "Affiche les commandes fun")
        .addField("G*infos */* G*info", "Affiche les commandes d'informations")
        .setFooter("Bot by NzoSifou - For GeekCorner Officiel")
        message.channel.send(help_embed)
        console.log("Une personne a fait la commande G*aide")
    }
    if(message.content === prefix + "help" || message.content === prefix + "aide"){
		var helplogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*help */* G*aide")
		.addField(`${message.author.username} a executé la commande G*help */* G*aide`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*help / G*aide")
		client.channels.find("name", "logs-gcb").send(helplogs_embed)
    }
    if(message.content === prefix + "admin"){
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de voir les commandes d'admin !");
        var adminhelp_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Aide Admin")
        .setDescription("Voici les commandes d'administration :")
        .addField("G*admin", "Affiche les commandes d'administration")
        .addField("G*kick", "Kick une personne (G*kick @Pseudo+Tag)")
        .addField("G*ban", "Ban une personne (G*ban @Pseudo+Tag)")
        .addField("G*clear", "Supprime les messages. Vous pouvez choisir combien de messages vous voulez supprimer dans un salon")
        .addField("G*mute", "Mute une personne (@Pseudo+Tag)")
        .addField("G*unmute", "Unmute une personne (@Pseudo+Tag)")
        .addField("G*warn", "Warn une personne (@Pseudo+Tag)")
        .addField("G*seewarns", "Voir les warns d'une personne (@Pseudo+Tag)")
        .addField("G*deletewarns", "Supprime les warns d'une personne (@Pseudo+Tag) [N° de warn]")
        .addField("G*streaming", 'Change le "jeu" du bot (... en streaming)')
        .addField("G*playing", 'Change le "jeu" du bot (Joue à ...)')
        .addField("G*listening", 'Change le "jeu" du bot (Écoute ...)')
        .addField("G*watching", 'Change le "jeu" du bot (Regarde ...)')
        .addField("G*online", 'Change le "status" du bot (En ligne ...)')
        .addField("G*idle", 'Change le "status" du bot (Absent ...)')
        .addField("G*dnd", 'Change le "status" du bot (Ne pas déranger ...)')
        .setFooter("Bot by NzoSifou and GeekCorner - For GeekCorner Officiel")
        message.channel.send(adminhelp_embed)
        console.log("Une personne a fait la commande G*admin")
    }
    if(message.content === prefix + "admin"){
		var adminlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*admin")
		.addField(`${message.author.username} a executé la commande G*admin`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*admin")
		client.channels.find("name", "logs-gcb").send(adminlogs_embed)
    }
    if(message.content === prefix + "fun"){
        var funhelp_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Aide Fun")
        .setDescription("Voici les commandes fun :")
        .addField("G*fun", "Affiche les commandes fun")
        .addField("G*8ball", "Pose une question et le bot répond aléatoirement (G*8ball [QUestion])")
        .addField("G*dog", "Donne un gif de chien aléatoire")
        .addField("G*cat", "Donne un gif de chat aléatoire")
        .setFooter("Bot by NzoSifou and GeekCorner - For GeekCorner Officiel")
        message.channel.send(funhelp_embed)
        console.log("Une personne a fait la commande G*fun")
    }
    if(message.content === prefix + "fun"){
    	var funlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*fun")
		.addField(`${message.author.username} a executé la commande G*fun`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*fun")
		client.channels.find("name", "logs-gcb").send(funlogs_embed)
    }
    if(message.content === prefix + "infos" || message.content === prefix + "info"){
        var infohelp_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Aide Fun")
        .setDescription("Voici les commandes fun :")
        .addField("G*infos */* G*info", "Affiche les commandes d'informations")
        .addField("G*stats", "Donne les stats sur votre compte dans les messages privés")
        .addField("G*bot", "Donne les stats sur ce bot")
        .addField("G*server */* G*serveur", "Donne les informations sur le serveur")
        .addField("G*ping", "Donne votre ping")
        .setFooter("Bot by NzoSifou and GeekCorner - G*info / G*infos")
        message.channel.send(infohelp_embed)
        console.log("Une personne a fait la commande G*info / G*infos")
    }
	if(message.content === prefix + "infos" || message.content === prefix + "info"){
		var infologs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*info */* G*infos")
		.addField(`${message.author.username} a executé la commande G*info */* G*infos`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*info / G*infos")
		client.channels.find("name", "logs-gcb").send(infologs_embed)
	}

//-------------------- Fin aide --------------------

//-------------------- Informations --------------------

    if(message.content === prefix + "bot") {
        var bot_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Voici mes informations !")
        .addField(":robot: :", `Je m'apelle ${client.user.tag}`, true)
        .addField(":hash: :", `#${client.user.discriminator}`)
        .addField(":id: :", `${client.user.id}`)
        .addField(":tools: :", "J'ai été crée par NzoSifou#5336 et suis actuellement développé par GeekCornerD#8010")
        .setFooter("Bot by NzoSifou and GeekCorner - For GeekCorner Officiel")
        message.channel.send(bot_embed)
        console.log("Une personne a fait la commande G*bot")
    }
    if(message.content === prefix + "bot"){
		var botlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*bot")
		.addField(`${message.author.username} a executé la commande G*bot`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*bot")
		client.channels.find("name", "logs-gcb").send(botlogs_embed)
    }
    if(message.content === prefix + "server" || message.content === prefix + "serveur") {
        var server_embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Voici les informations du serveur !")
        .addField(":busts_in_silhouette: :", message.guild.members.size)
        .addField("Salons & Catégories :", message.guild.channels.size)
        .addField(":id: :", "714044475734753300")
        .setFooter("Bot by NzoSifou and GeekCorner - For GeekCorner Officiel")
        message.channel.send(server_embed)
        console.log("Une personne a fait la commande G*server */* G*serveur")
    }
  if(message.content === prefix + "server" || message.content === prefix + "serveur"){
		var serverlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*server */* G*serveur")
		.addField(`${message.author.username} a executé la commande G*server */* G*serveur`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*server / G*serveur")
		client.channels.find("name", "logs-gcb").send(serverlogs_embed)
    }

//-------------------- Fin Informations --------------------

//-------------------- Modération / Administration --------------------

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de kick !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Utilisation de la commande : G*kick @Pseudo+Tag")
       }
        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Cette personne est introuvable sur le serveur !")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je ne peux pas kick, GeekCorner ne m'a pas donner cette permission !")
        }
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} a été kick, Kick par ${message.author.username}`)
        });
    }
    if(message.content === prefix + "kick"){
		var kicklogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*kick")
		.addField(`${message.author.username} a executé la commande G*kick`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*kick")
		client.channels.find("name", "logs-gcb").send(kicklogs_embed)
    }
    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de bannir !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Utilisation de la commande : G*ban @Pseudo+Tag")
        }
        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Cette personne est introuvable sur le serveur !")
        }
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je ne peux pas bannir, GeekCorner ne m'a pas donner cette permission !")
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} a été banni, Banni par ${message.author.username}`)
        });
    }
    if(message.content === prefix + "ban"){
		var banlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*ban")
		.addField(`${message.author.username} a executé la commande G*ban`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*ban")
		client.channels.find("name", "logs-gcb").send(banlogs_embed)
    }
    if(message.content.startsWith(prefix + "clear")) {
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission de clear !");

        var args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Utilisation de la commande : G*clear [Nombre de message(s) à supprimer]")
	message.channel.bulkDelete(`1` + args[0]).then(() => {
            message.channel.send("Le(s) message(s) a/ont été supprimé(s) !").then(msg => {
    msg.delete(5000)
  });

        });
    }
    if(message.content === prefix + "clear"){
		var clearlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*clear")
		.addField(`${message.author.username} a executé la commande G*clear`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*clear")
		client.channels.find("name", "logs-gcb").send(clearlogs_embed)
    }
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de mute !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Utilisation de la commande : G*mute @Pseudo+Tag');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Cette personne est introuvable sur le serveur !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas mute, GeekCorner ne m'a pas donner cette permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est désormait mute !`);
        })
    }
    if(message.content === prefix + "mute"){
		var mutelogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*mute")
		.addField(`${message.author.username} a executé la commande G*mute`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*mute")
		client.channels.find("name", "logs-gcb").send(mutelogs_embed)
    }
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de unmute !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('Utilisation de la commande : G*unmute @Pseudo+Tag');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Cette personne est introuvable sur le serveur !");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je ne peux pas unmute, GeekCorner ne m'a pas donner cette permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        })
    }
    if(message.content === prefix + "unmute"){
		var unmutelogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*unmute")
		.addField(`${message.author.username} a executé la commande G*unmute`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*unmute")
		client.channels.find("name", "logs-gcb").send(unmutelogs_embed)
	}

if(message.content === prefix + "clearwarns") return;

var fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission de warn !").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("Utilisation de la commande : G*warn @Pseudo+Tag");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("Vous n'avez pas la permission de warn !");

    }

  }

}

  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission de warn !").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("Vous n'avez pas la permission de warn !");

    }

  }

  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("Vous n'avez pas la permission de warn !").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    if(message.content === prefix + "warn"){
		var warnlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*warn")
		.addField(`${message.author.username} a executé la commande G*warn`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*warn")
		client.channels.find("name", "logs-gcb").send(warnlogs_embed)
    }
    if(message.content === prefix + "seewarns"){
		var seewarnslogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*seewarns")
		.addField(`${message.author.username} a executé la commande G*seewarns`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*seewarns")
		client.channels.find("name", "logs-gcb").send(seewarnslogs_embed)
    }
    if(message.content === prefix + "deletewarns"){
		var deletewarnslogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*deletewarns")
		.addField(`${message.author.username} a executé la commande G*deletewarns`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*deletewarns")
		client.channels.find("name", "logs-gcb").send(deletewarnslogs_embed)
    }
    switch (args[0].toLowerCase()) {
        case "stats":
        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("RANDOM")
        .setTitle(`Statistique de ${message.author.username} :`)
        .addField(`:id: ID de : ${message.author.username}`, msgauthor, true)
        .addField(`:stopwatch: Date de création de ${message.author.username} :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate [3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Vos stats ont été envoyez dans vos messages privés");
        message.author.send({embed: stats_embed});
        break;
        case "ping":
        message.channel.send(':ping_pong: Pong ! ' + `(${Date.now() - message.createdTimestamp}` + ' ms)');
        break;
      }
    if(message.content === prefix + "stats"){
		var statslogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*stats")
		.addField(`${message.author.username} a executé la commande G*stats`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*stats")
		client.channels.find("name", "logs-gcb").send(statslogs_embed)
    }
    if(message.content === prefix + "ping"){
		var pinglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*ping")
		.addField(`${message.author.username} a executé la commande G*ping`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*ping")
		client.channels.find("name", "logs-gcb").send(pinglogs_embed)
    }
    if(message.content === prefix + "play"){
		var playlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*play")
		.addField(`${message.author.username} a executé la commande G*play`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*play")
		client.channels.find("name", "logs-gcb").send(playlogs_embed)
    }
    if(message.content === prefix + "skip"){
		var skiplogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*skip")
		.addField(`${message.author.username} a executé la commande G*skip`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*skip")
		client.channels.find("name", "logs-gcb").send(skiplogs_embed)
    }
    if(message.content === prefix + "stop"){
		var stoplogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*stop")
		.addField(`${message.author.username} a executé la commande G*stop`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*stop")
		client.channels.find("name", "logs-gcb").send(stoplogs_embed)
    }
    

//-------------------- Fin Modération / Administration --------------------

//-------------------- Fun --------------------

  if (message.content.startsWith(prefix + "8ball")) {
    const reponse = JSON.parse(fs.readFileSync('./eightball.json', "utf8"));
    var args = message.content.split(' ').join(' ').slice(7);

    if(!args) return message.channel.send("Utilisation de la commande : G*8ball [Question]")
    
    var ball_embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Commande 8ball :")
    .addField("Question:", `${args}`)
    .addField("Réponse", reponse[Math.round(Math.random() * reponse.length)])
    .setFooter("Bot by NzoSifou and GeekCorner - For GeekCorner Officiel - 8Ball")
    message.channel.send(ball_embed);
  }
    if(message.content === prefix + "8ball"){
		var eightballlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*8ball")
		.addField(`${message.author.username} a executé la commande G*8ball`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*8ball")
		client.channels.find("name", "logs-gcb").send(eightballlogs_embed)
    }

  if(message.content.startsWith(prefix + "dog")) {
    var chien = [
    	"https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif",
		"https://media.giphy.com/media/ygCJ5Bul73NArGOSFN/giphy.gif",
		"https://media.giphy.com/media/fpXxIjftmkk9y/giphy.gif",
		"https://media.giphy.com/media/Kan1AHHJmMRYA/giphy.gif",
		"https://media.giphy.com/media/Bc3SkXz1M9mjS/giphy.gif",
		"https://media.giphy.com/media/DZR39sOOQWP8A7UoVs/giphy.gif",
		"https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif",
		"https://media.giphy.com/media/bbshzgyFQDqPHXBo4c/giphy.gif",
	 	"https://media.giphy.com/media/3lxD1O74siiz5FvrJs/giphy.gif",
		"https://media.giphy.com/media/WLbtNNR5TKJBS/giphy.gif"
    ];

    var gif = chien[Math.floor(Math.random() * chien.length)];

    var dog_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(':dog: Gif de Chien')
    .setImage(gif)
    .setFooter('Bot by NzoSifou and GeekCorner b- For GeekCorner Officiel - G*dog')
    message.channel.send(dog_embed)
  }
  if(message.content.startsWith(prefix + "cat")) {
    var chat = [
    	"https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
		"https://media.giphy.com/media/33OrjzUFwkwEg/giphy.gif",
		"https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
		"https://media.giphy.com/media/NjevnbNiUmeLm/giphy.gif",
		"https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif",
		"https://media.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif",
		"https://media.giphy.com/media/ND6xkVPaj8tHO/giphy.gif",
		"https://media.giphy.com/media/uTCAwWNtz7U2c/giphy.gif",
	 	"https://media.giphy.com/media/p4xp4BjHIdane/giphy.gif",
	  "https://media.giphy.com/media/WXB88TeARFVvi/giphy.gif"
    ];

    var gif = chat[Math.floor(Math.random() * chat.length)];

    var cat_embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(':cat: Gif de Chat')
    .setImage(gif)
    .setFooter('Bot by NzoSifou and GeekCorner - For GeekCorner Officiel - G*cat')
    message.channel.send(cat_embed)
  }
    if(message.content === prefix + "dog"){
		var doglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*dog")
		.addField(`${message.author.username} a executé la commande G*dog`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*dog")
		client.channels.find("name", "logs-gcb").send(doglogs_embed)
    }
    if(message.content === prefix + "cat"){
		var catlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*cat")
		.addField(`${message.author.username} a executé la commande G*cat`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*cat")
		client.channels.find("name", "logs-gcb").send(catlogs_embed)
    }

//-------------------- Fin Fun --------------------


//-------------------- Status --------------------

	if(message.content.startsWith(prefix + "playing")) {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le jeu du bot !");
    	var args = message.content.split(" ").slice(1);
    	if(!args[0]) return message.channel.send("Utilisation de la commande : G*streaming [Nom du jeu auquel le bot doit jouer]")
        	client.user.setActivity(args.join(" "), {
        	type: "PLAYING"
        }).then(() => {
          message.channel.send("Le jeu du bot à été changer (Joue à ...)")
      });
  	}
  	if(message.content === prefix + "playing"){
		var playinglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*playing")
		.addField(`${message.author.username} a executé la commande G*playing`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*playing")
		client.channels.find("name", "logs-gcb").send(playinglogs_embed)
  	}
	if(message.content.startsWith(prefix + "streaming")) {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le jeu du bot !");
    	var args = message.content.split(" ").slice(1);
    	if(!args[0]) return message.channel.send("Utilisation de la commande : G*playing [Nom du jeu auquel le bot doit jouer]")
       	client.user.setActivity(args.join(" "), {
        	type: "STREAMING",
        	url: "https://www.twitch.tv/nzosifou"
        }).then(() => {
          message.channel.send("Le jeu du bot à été changer (Streame ...)")
      });
  	}
  	if(message.content === prefix + "streaming"){
		var streaminglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*streaming")
		.addField(`${message.author.username} a executé la commande G*streaming`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*streaming")
		client.channels.find("name", "logs-gcb").send(streaminglogs_embed)
  	}
	if(message.content.startsWith(prefix + "watching")) {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le jeu du bot !");
    	var args = message.content.split(" ").slice(1);
    	if(!args[0]) return message.channel.send("Utilisation de la commande : G*watching [Nom du jeu auquel le bot doit jouer]")
       	client.user.setActivity(args.join(" "), {
        	type: "WATCHING"
        }).then(() => {
          message.channel.send("Le jeu du bot à été changer (Regarde ...)")
      });
  	}
  	if(message.content === prefix + "watching"){
		var watchinglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*watching")
		.addField(`${message.author.username} a executé la commande G*watching`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*watching")
		client.channels.find("name", "logs-gcb").send(watchinglogs_embed)
  	}
	if(message.content.startsWith(prefix + "listening")) {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le jeu du bot !");
    	var args = message.content.split(" ").slice(1);
    	if(!args[0]) return message.channel.send("Utilisation de la commande : G*listening [Nom du jeu auquel le bot doit jouer]")
       	client.user.setActivity(args.join(" "), {
        	type: "LISTENING"
        }).then(() => {
          message.channel.send("Le jeu du bot à été changer (Écoute ...)")
      });
  	}
  	if(message.content === prefix + "listening"){
		var listeninglogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*listening")
		.addField(`${message.author.username} a executé la commande G*listening`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*listening")
		client.channels.find("name", "logs-gcb").send(listeninglogs_embed)
	}



//-------Geek est par ici---------



if(message.content === prefix + "dnd") {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le status du bot !");
       	client.user.setStatus('dnd').then(() => {
          message.channel.send("Le status du bot à été changé (Ne pas déranger)")
      });
  	}
  	if(message.content === prefix + "dnd"){
		var dndlogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*dnd")
		.addField(`${message.author.username} a executé la commande G*dnd`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*dnd")
		client.channels.find("name", "logs-gcb").send(dndlogs_embed)
  	}



//-----Commande online------;
if(message.content === prefix + "online") {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le status du bot !");
       	client.user.setStatus('online').then(() => {
          message.channel.send("Le status du bot à été changé (En ligne)")
      });
  	}
  	if(message.content === prefix + "online"){
		var onlinelogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*online")
		.addField(`${message.author.username} a executé la commande G*online`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*online")
		client.channels.find("name", "logs-gcb").send(onlinelogs_embed)
  	}
//-----Commande Idle

if(message.content === prefix + "idle") {
    	if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission de changer le status du bot !");
       	client.user.setStatus('idle').then(() => {
          message.channel.send("Le status du bot à été changé (Absent)")
      });
  	}
  	if(message.content === prefix + "idle"){
		var idlelogs_embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setTitle("Logs - G*idle")
		.addField(`${message.author.username} a executé la commande G*idle`, "Cette personne a executé une commande")
		.setFooter("Bot by NzoSifou and GeekCorner - Logs G*idle")
		client.channels.find("name", "logs-gcb").send(idlelogs_embed)
  	}






//-------------------- Fin Status --------------------
});

client.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === ":white_check_mark:") {
    if(reaction.channel.id === "508250453029552131") {
        var joueur = client.users.get(user.id);
        var role = reaction.guild.roles.find('name', 'test');
        client.channels.find("name", "logs-gcb").send(`test`)
        joueur.addRole(role).catch(console.error);
     } else {
    return;
     };
  };
});
