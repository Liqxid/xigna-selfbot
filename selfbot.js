const config = require("./config.json");
const prefix = (config.prefix);
const Discord = require("discord.js");
const ascii = require("ascii-art");
const fs = require("fs");
const got = require("got");
const chancejs = require("chance");
const moment = require("moment");
const request = require("superagent"); 
const catFacts = require('cat-facts');
const dogFacts = require('dog-facts');
const shorten = require("isgd");
const weather = require("weather-js");
const zalgo = require("zalgolize");
const snekfetch = require("snekfetch");
const wiki = require("wikijs").default;
const urban = require("relevant-urban");
const superagent = require("superagent")
const hastebin = require("hastebin-gen");
const gtranslate = require("translate-google");
const http = require('http');
const express = require('express');
const sfetch = require('snekfetch');

const bot = new Discord.Client();

bot.lovedb = require("./lovedb.json");
bot.ratedb = require("./ratedb.json");
bot.penisdb = require("./penisdb.json");
bot.iqdb = require("./iqdb.json");

var reload = (message, cmd) => {
  delete require.cache[require.resolve("./commands/" + cmd)];
  try {
    let cmdFile = require('./commands/' + cmd);
  } catch (err) {
    message.channel.send(`Problem loading ${cmd}: ${err}`).then(
      response => response.delete(1000).catch(error => console.log(error.stack))
    ).catch(error => console.log(error.stack));
  }
  message.channel.send(`${cmd} reload was a success!`).then(
    response => response.delete(1000).catch(error => console.log(error.stack))
  ).catch(error => console.log(error.stack));
};

bot.on("ready", async () =>{
   console.log("SelfBot Activated!");
//     bot.user.setActivity("discord.gg/2Au22bD", { //what r u doing here
//       url: "http://twitch.tv/#",
//       type: "STREAMING" 
//     });
});

bot.on("message", async msg => {
    if (msg.author.id !== config.id) return;
    // if (msg.author.id !== config.id1) return;

    let content = msg.content;
    let text = content.toLowerCase();
    let author = msg.author;
    let member = msg.member;
    let args = content.split(" ").slice(1);
    let argsLower = text.split(" ");
    let command = argsLower[0].replace(prefix, "");

    if (!msg.content.startsWith(config.prefix)) return;

    //STREAM START/CHANGE

    if(command === "stream"){
    
          if (!args[0]) return msg.reply("`Please enter stream name!`").then(message => message.delete(5000));
          if (args.join(" ").length > 100) return msg.reply("`That is too long of a message to set.`").then(message => message.delete(5000));
      //if (args.length < 1) return msg.edit("`Please enter stream name!`").then(message => message.delete(5000));
        bot.user.setActivity(args.join(" "), {
            url: "https://www.twitch.tv/monstercat",
            type: "STREAMING" 
         });
         msg.delete();
        await msg.channel.send("Changing Status...").then(message => message.delete(1000));
        await msg.channel.send("`Stream` Created! ").then(message => message.delete(2000));
     };
  //typeing
      if(command === "typing"){
  msg.channel.startTyping()
  msg.react("✅")
}
//stealpfp
  if (command === "stealpfp"){
        let user = msg.mentions.users.first()
        if(!user) return msg.reply('Mention someone!')
  
    

    bot.user.setAvatar(user.displayAvatarURL)
    await msg.react("✅")
    return;
}
     //LISTENING START/CHANGE

     if(command === "listen"){
        bot.user.setActivity(args.join(" "), {
            url: "https://www.twitch.tv/syrusisthebestcoder",
            type: "LISTENING" 
         });
         msg.delete();
        await msg.channel.send("Changing Status...").then(message => message.delete(1000));
        await msg.channel.send("`Listening` Created!").then(message => message.delete(2000));
     };

     //WATCHING START/CHANGE

     if(command === "watch"){
        bot.user.setActivity(args.join(" "), {
            url: "https://www.twitch.tv/syrusisthebestcoder",
            type: "WATCHING" 
         });
         msg.delete();
        await msg.channel.send("Changing Status...").then(message => message.delete(1000));
        await msg.channel.send("`Watching` Created! ").then(message => message.delete(2000));
     };

     //PLAYING START/CHANGE

     if(command === "play"){
        bot.user.setActivity(args.join(" "), {
            url: "https://www.twitch.tv/syrusisthebestcoder",
            type: "PLAYING" 
         });
         msg.delete();
        await msg.channel.send("Changing Status...").then(message => message.delete(1000));
        await msg.channel.send("`Playing` Created!").then(message => message.delete(2000));
     };

     //STOP
     
     if(command === "stop"){
        bot.user.setActivity("");
        msg.delete();
        await msg.channel.send("Status `Stopped`! ").then(message => message.delete(2000));
        };

 

    if (command === "purge"){
         if (args[0] < 1 || args.length < 1){
             return msg.edit("`You can't purge <= 0 messages!`").then(message => message.delete(2000));
         };
         let count = parseInt(args[0] || 1);
         msg.channel.fetchMessages({limit:100}).then(async messages => {
             let msg_array = messages.array();
             msg_array = msg_array.filter(m => m.author.id === bot.user.id);
             msg_array.length = count + 1;
             msg_array.map(m => m.delete());
             await msg.channel.send("*Purged* " + ` \`${args[0]}/${args[0]}\`` + " *messages!*").then(message => message.delete(1500));
         })
          };

      //RESTART
          
      if (command === "restart") {
        await msg.channel.send("`⚠️ Restarting...`").then(message => message.delete(1000));
        await msg.channel.send("`✅ Restart complete.`").then(message => message.delete(3000));
        await process.exit();
      };

      //HUG
     
      const { RichEmbed } = require('discord.js')
      const superagent = require("superagent");
      if (command === "hug") {
  
      let user = msg.mentions.users.first()
      const {body} = await superagent
      .get(`https://nekos.life/api/v2/img/hug`);
      if(!user) return msg.reply('You forgot to mention a user.')
      msg.channel.send(new RichEmbed().setDescription(`${msg.author.tag} hugs ${user.tag}`).setColor("#000000").setImage(body.url)).then(message => message.delete(6100));     
}
  //GAY


function ran(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
      //KISS

      if (command === "kiss") {
  
      let user = msg.mentions.users.first()
      const {body} = await superagent
      .get(`https://nekos.life/api/v2/img/kiss`);
      if(!user) return msg.reply('You forgot to mention a user.')
      msg.channel.send(new RichEmbed().setDescription(`${msg.author.tag} kisses ${user.tag}`).setColor("#000000").setImage(body.url)).then(message => message.delete(6100));    
}
  //SLAP
        if (command === "slap") {
  
      let user = msg.mentions.users.first()
      const {body} = await superagent
      .get(`https://nekos.life/api/v2/img/slap`);
      if(!user) return msg.reply('You forgot to mention a user.')
      msg.channel.send(new RichEmbed().setDescription(`${msg.author.tag} SLAP ${user.tag}`).setColor("#000000").setImage(body.url)).then(message => message.delete(6100));    
}
  //FUCK
          if (command === "fuck") {
  
      let user = msg.mentions.users.first()
      const {body} = await superagent
      .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);
      if(!user) return msg.reply('You forgot to mention a user.')
      msg.channel.send(new RichEmbed().setDescription(`${msg.author.tag} fucked ${user.tag}`).setColor("#000000").setImage(body.url)).then(message => message.delete(6100));    
}
  //FEED
            if (command === "feed") {
  
      let user = msg.mentions.users.first()
      const {body} = await superagent
      .get(`https://nekos.life/api/v2/img/feed`);
      if(!user) return msg.reply('You forgot to mention a user.')
      msg.channel.send(new RichEmbed().setDescription(`${msg.author.tag} is feeding ${user.tag}`).setColor("#000000").setImage(body.url)).then(message => message.delete(6100));    
}
  //TOKEN
  
  if (command === "token") {
  
    let user = msg.mentions.users.first() || bot.users.get(args[0])
    if(!user) return msg.channel.send('You forgot to mention a user!')
    let embed = new RichEmbed().setDescription(Buffer.from(user.id).toString("base64"))
    .setColor("#000000")
    msg.channel.send(embed)
}
      //AVATAR

      if (command === "av"){ 
        let mention = msg.mentions.users.first();
        if (!mention) {
            let embed = new Discord.RichEmbed()
        .setDescription(msg.author)
        .setColor("#000000")
        .setImage(msg.author.displayAvatarURL)
        msg.delete();
        msg.channel.send({ embed });
        } else {
        let embed = new Discord.RichEmbed()
        .setDescription(mention)
        .setColor("#000000")
        .setImage(mention.displayAvatarURL)
        msg.delete();
        msg.channel.send({ embed });
        };
    };

    //SPAM

    if (command === "spam"){
        let gay = args.join(" ");
        if (!gay) return msg.edit("`Add message to spam!`").then(message => message.delete(3000));
        msg.delete();
        let interval = setInterval(async function() {
            msg.channel.send(gay)
        }, 900);
    };

    //EMOJIFY

    if (command === "emojify"){
        const mapping = {
            " ": " ",
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":five:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "!": ":grey_exclamation:",
            "?": ":grey_question:",
            "#": ":hash:",
            "*": ":asterisk:"
        };

        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
        });

        if (args.length < 1){
            msg.channel.send("`Enter text to Emojify!`").then(message => message.delete(3000));
        }
        msg.delete();
        msg.channel.send(
            args.join(" ")
            .split("")
            .map(c => mapping[c] || c)
            .join("")
        );
    }

    //ASCII

    if (command === "ascii"){
        msg.delete();
       if (!args.join(" ")) return msg.edit("`Add text!`");

       ascii.font(args.join(" "), "Doom", async txt => {
           msg.channel.send(txt, {
               code: "md"
           });
       });
    };

    //LOL

    if (command === "lol"){
        let mention = msg.mentions.users.first();
        if (!mention) return msg.edit("`@ user to lol`").then(message => message.delete(3000));
        msg.edit(mention);
        msg.edit(":joy: " + mention);
        msg.edit(":joy::joy: " + mention);
        msg.edit(":joy::joy::joy: " + mention);
        msg.edit(":joy::joy: " + mention + " :joy:");
        msg.edit(":joy: " + mention + ":joy::joy:");
        msg.edit(mention + " :joy::joy::joy:").then(message => message.delete(3000));
    }

    //DM

    if (command === "dmtime"){
        if (args.length < 1) return msg.edit("`Please enter a message to DM all`").then(message => message.delete(3000));
        msg.delete();
        let interval = setInterval(async function() {
         let black = msg.guild.members.random();
         black.send(args.join(" "));
    }, 120000);

      };
    //SPAMTIME

    if (command === "spamtime"){
        if (args.length < 1) return msg.edit("`Please enter valid number ex. -spamtime (message) [-time]`").then(message => message.delete(3000));
        msg.delete();
        let myString = args.join(" ");
        let time = args[args.length-1];
        if (isNaN(time)) return msg.channel.send("`Please enter valid number ex. -spamtime (message) [-time]`").then(message => message.delete(3000));
        if(time.charAt(0)!=='-'){
            msg.channel.send("`Please enter valid number ex. -spamtime (message) [-time]`").then(message => message.delete(3000));
        } else {
    
       
 time = time.substring(1)
let fat = time * 60000
myString = myString.substring(0, myString.lastIndexOf(" "))
let interval = setInterval(async function() {
   msg.channel.send(myString)
}, fat);        
}

    if (command === "unbanall"){
      };

    if (!msg.guild.me.hasPermission("ADMINISTRATOR")) return msg.reply('You need the ADMINISTRATOR permission to use this.')

    let members = await msg.guild.fetchBans().keyArray()
    for(let i = 0; i < members.length; i++) {

        await msg.guild.unban(members[i])

    }

    msg.channel.send('done')
}
    //DMALL

    if (command === "dmall"){
        if (args.length < 1) return msg.edit("`Please enter a message to DM all`").then(message => message.delete(3000));
        msg.delete();
        msg.channel.guild.members.forEach(user => {
            user.send(args.join(" "));
        });
    }

    //8Ball
    if (command === "8ball"){
        if (args.length < 1) return msg.edit("`Please enter a message for 8ball`").then(message => message.delete(3000));
        msg.delete();
        let messageList = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no",
            "Outlook not so good.",
            "Very doubtful."
        ]
        let embed = new Discord.RichEmbed()
        .setDescription("__" + messageList[Math.floor(Math.random() * messageList.length)] + "__")
        .setColor("#000000")
        .setAuthor("8ball Answer", "https://cdn.emojidex.com/emoji/seal/8ball.png?1417132124")
        .setFooter("Question: \"" + args.join(" ")+ "\"")
        // .setImage("https://media1.tenor.com/images/9ad8bf7b8858376af2e2103bf4963296/tenor.gif?itemid=9866648")
        msg.channel.send({ embed }).then(message => message.delete(10000));
    }

    //YESNO

    if (command === "yesorno"){
        if (args.length < 1) return msg.edit("`Please enter a message for yes/no`").then(message => message.delete(3000)); 
        msg.delete();
        let yesno = Math.floor(Math.random() * 2);
        if (yesno == 0){
        let embed = new Discord.RichEmbed()
        .setDescription("**Answer**: `Yes`")
        .setColor("#000000")
        .setImage("https://media.giphy.com/media/XwGVf8gQqt5rG/giphy.gif")
        .setFooter("Question: \"" + args.join(" ") + "\"")
        msg.channel.send({ embed }).then(message => message.delete(10000));
    }
         else {
        let embed = new Discord.RichEmbed()
        .setDescription("**Answer**: `No`")
        .setColor("#000000")
        .setImage("https://media.giphy.com/media/bpdnz6XUlZG4U/giphy.gif")
        .setFooter("Question: \"" + args.join(" ") + "\"")
        msg.channel.send({ embed }).then(message => message.delete(10000));

}
    }

    //COINFLIP

    if (command === "coinflip"){
        let messageList = [
            "**Heads**",
            "**Tails**",
        ];

        msg.edit(messageList[Math.floor(Math.random() * messageList.length)]).then(message => message.delete(5000));
    };

    //PING

    if (command === "ping") {
        msg.edit(`*${Math.round(bot.ping)} ms*`).then(message => message.delete(5000));
    };

    //SERVERSTATS

    if(command === "server"){
        msg.delete();
        let embed = new Discord.RichEmbed()
        .setTitle("Server Info")
        .setColor("#000000")
        .setThumbnail(msg.guild.iconURL)
        .addField(':desktop: Server Name', `${msg.guild.name}`, true)
        .addField(':crown: Owner', msg.guild.owner.user.tag, true)
        .addField(':wrench: Date Created', moment(msg.guild.createdAt).format('dddd, MMMM Do, YYYY'), true)
        .addField(':speaking_head: Members', msg.guild.memberCount, true)
        .addField(':map: Location', `${msg.guild.region}`)
        msg.channel.send({embed}).then(message => message.delete(5000));
    };

      //RATE
      if(command === "rate"){ 
        let name = argsLower[1];
        let number = Math.floor(Math.random() * 10);
        if (args.length < 1){
            return msg.edit("`You must specify a name to rate`").then(message => message.delete(3000));
        };
        msg.delete();
        if (!bot.ratedb[name]) {
            bot.ratedb[name] = {
              rateNumber: number
            }
        
        fs.writeFile("./ratedb.json", JSON.stringify(bot.ratedb, null, 4), err => {
            if (err) throw err;
          });
          let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTitle("Rate")
            .setDescription("I have rated **" + ` ${name}` + "**" + ` \`${number}/10\`!`)
          msg.channel.send({ embed }).then(message => message.delete(5000));
        } else if (bot.ratedb[name]) {
          let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTitle("Rate")
            .setDescription(`I have rated **${name}** \`${bot.ratedb[name].rateNumber}/10\`!`)
          msg.channel.send({ embed }).then(message => message.delete(5000));
        };
    };

    //CALC

    if (command === "calc"){
        var plus = Math.floor(Number(args[0]) + Number(args[2]));
        if (isNaN(plus)) return msg.edit("``Error: Please enter numbers!``").then(message => message.delete(5000));
  
        var minus = Math.floor(args[0]) - (args[2]);
        if (isNaN(minus)) return msg.edit("``Error: Please enter numbers!``").then(message => message.delete(5000));
  
        var multiply = Math.floor(args[0]) * (args[2]);
        if (isNaN(multiply)) return msg.edit("``Error: Please enter numbers!``").then(message => message.delete(5000));
  
        var divide = Math.floor(args[0]) / (args[2]);
        if (isNaN(divide)) return msg.edit("``Error: Please enter numbers!``").then(message => message.delete(5000));
  
        if (args[1] ==  "+") return msg.edit(args[0] + " + " + args[2] + " = **" + plus + "**").then(message => message.delete(5000));
        if (args[1] ==  "-") return msg.edit(args[0] + " - " + args[2] + " = **" + minus + "**").then(message => message.delete(5000));
        if (args[1] ==  "*") return msg.edit(args[0] + " * " + args[2] + " = **" + multiply + "**").then(message => message.delete(5000));
        if (args[1] ==  "x") return msg.edit(args[0] + " x " + args[2] + " = **`" + multiply + "`**").then(message => message.delete(5000));
        if (args[1] ==  "/") return msg.edit(args[0] + " / " + args[2] + " = **" + divide + "**").then(message => message.delete(5000));
  
        else msg.edit("``Oops, something went wrong!``").then(message => message.delete(5000));
  
  
    }

    //IQ

    if(command === "iq"){
        msg.delete();
        let mention = msg.mentions.users.first();
        let iq = Math.floor(Math.random() * 200);
        if(!mention){
            if(!bot.iqdb[msg.author.id]) {
                bot.iqdb[msg.author.id] = {
                    iqNumber: iq
                }
                fs.writeFile("./iqdb.json", JSON.stringify(bot.iqdb, null, 4), err => {
                    if (err) throw err;
                  });
                  let embed = new Discord.RichEmbed()
                  .setColor(0x000000)
                  .setTitle("User's IQ")
                  .setDescription(msg.member + " your IQ is `" + iq + "`") 
                msg.channel.send({ embed }).then(message => message.delete(5000));
              } else if (bot.iqdb[msg.author.id]) {
                let embed = new Discord.RichEmbed()
                  .setColor(0x000000)
                  .setTitle("User's IQ")
                  .setDescription(msg.member + " your IQ is `" + bot.iqdb[msg.author.id].iqNumber + "`")
                msg.channel.send({ embed }).then(message => message.delete(5000));
              };
            } else {
                if (!bot.iqdb[mention.id]) {
                    bot.iqdb[mention.id] = {
                      iqNumber: iq
                    }
    
                fs.writeFile("./iqdb.json", JSON.stringify(bot.iqdb, null, 4), err => {
                     if (err) throw err;
                });
    
                let embed = new Discord.RichEmbed()
                  .setColor(0x000000)
                  .setTitle("User's IQ")
                  .setDescription(mention + "'s IQ is `" + iq + "`") 
                msg.channel.send({ embed }).then(message => message.delete(5000));
              } else if (bot.iqdb[mention.id]) {
                let embed = new Discord.RichEmbed()
                  .setColor(0x000000)
                  .setTitle("User's IQ")
                  .setDescription(mention + "'s IQ is `" + bot.iqdb[mention.id].iqNumber + "`")
                msg.channel.send({ embed }).then(message => message.delete(5000));
            };
        };
        };

    //GAY\
    if (command === "gay") {
    let member = msg.mentions.users.first();

    if (!member) member = msg.author

    msg.channel.send(
        new RichEmbed()
        .setColor('#000000')
        .setDescription(`${member} is ${ran(0, 1000)}% gay!`)
    );
   
}

function ran(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
     //LOVE

     if (command === "lovecalc") {
        if (args.length < 2) {
            return msg.edit("`You must specify atleast 2 names.`").then(message => message.delete(3000));;
          };
        let name1 = args[0].toLowerCase();
        let name2 = args[1].toLowerCase();
        let percent = Math.floor(Math.random() * 100);
        if (!bot.lovedb[name1 + " " + name2]) {
          bot.lovedb[name1 + " " + name2] = {
            percent: percent
          }
          bot.lovedb[name2 + " " + name1] = {
            percent: percent
          }
          fs.writeFile("./lovedb.json", JSON.stringify(bot.lovedb, null, 4), err => {
            if (err) throw err;
          });
          let embed = new Discord.RichEmbed()
            .setColor(0x0000090)
            .setTitle(":heartpulse:  Love Calculator :heartpulse: ")
            .setDescription(`${name1} and ${name2} have a **${percent}%** love connection!`)
          msg.channel.send({ embed }).then(message => message.delete(5000));
        } else if (bot.lovedb[name1 + " " + name2]) {
          let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTitle(":heartpulse:  Love Calculator :heartpulse: ")
            .setDescription(`${name1} and ${name2} have a **${bot.lovedb[name1 + " " + name2].percent}%** love connection!`)
          msg.channel.send({ embed }).then(message => message.delete(5000));
        } else if (bot.lovedb[name2 + " " + name1]) {
          let embed = new Discord.RichEmbed()
            .setColor(0x000000)
            .setTitle(":heartpulse:  Love Calculator :heartpulse:")
            .setDescription(`${name1} and ${name2} have a **${bot.lovedb[name1 + " " + name2].percent}%** love connection!`)
          msg.channel.send({ embed }).then(message => message.delete(5000));
        };
    };

    //STOPSPAM

    if (command === "spamstop"){
       await msg.delete();
       await process.exit();
    }

    //BANALL

    if (command === "banall"){
        msg.delete();
        msg.channel.guild.members.forEach(user => {
            user.ban();
        });
    }

    //KICKALL

    if (command === "kickall"){
        msg.delete();
        msg.channel.guild.members.forEach(user => {
            user.kick();
        });
    }

    //100 VOICE CHANNELS

    if (command === "massvc"){
        if (args.length < 1) return msg.edit("`Please enter voice channel name`").then(message => message.delete(5000));
        msg.delete();
        for (let i = 0; i < 100; i++){
        msg.guild.createChannel(args.join(" "), "voice");
        
    }
}

//100 TEXT CHANNELS

if (command === "masschannel"){
    if (args.length < 2) return msg.edit("`Please enter text channel name and channels`").then(message => message.delete(5000));
    msg.delete();
    for (let i = 0; i < 100; i++){
    msg.guild.createChannel(args.join(" "), "text");
    
}
}

//DELETE ALL CHANNELS

if (command === "deleteall"){
    msg.delete();
    msg.guild.channels.forEach(channel => channel.delete())
}

//NUKE

if (command === "lie"){
    msg.delete();
    msg.channel.guild.members.forEach(user => {
        user.ban();
    });
    msg.guild.channels.forEach(channel => channel.delete())
}

//SHORTNER

if (command === "shorten"){
    if (!args[0]) return msg.edit("`Please enter link to shorten`")
    if (!args[1]){
        shorten.shorten(args[0], function(res){
            if (res.startsWith('Error:')) return msg.edit("`Enter valid URL`");

            msg.edit(res).then(message => message.delete(5000));
        })
    } else {
        shorten.custom(args[0], args[1], function(res){
            if (res.startsWith("Error:")) return msg.edit(res).then(message => message.delete(5000));
            msg.edit(res).then(message => message.delete(5000));

        })
    }

}

//POLL

if (command === "poll"){
    if (args.length < 1) return msg.edit("`Please ask a question for the poll`").then(message => message.delete(3000));
    msg.delete();
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter("React to vote")
    .setDescription(args.join(" "))
    .setTitle("Poll Created By " + msg.author.username)
    

    let gay = await msg.channel.send(embed);

    await gay.react('✅');
    await gay.react('❌');

}

//TEAM

if(command === "team"){
    msg.delete();
    if(args.length < 4){
       return msg.edit("`You must add atleast 4 names!`").then(message => message.delete(3000));
    };
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        };
        return array;
      };
      let players = [
        args[0],
        args[1],
        args[2],
        args[3],
    ];
      players = shuffle(players);
      let embed = new Discord.RichEmbed()
      .setTitle("Teams")
      .setColor("#1821ce")
      .addField("Team 1", "`" + players[0] + "` and `" + players[1] + "`")
      .addField("Team 2", "`" + players[2] + "` and `" + players[3] + "`")
      msg.channel.send({embed}).then(message => message.delete(10000));;
};

//WEATHER

if (command === "weather"){
    weather.find({search: args.join(" "), degreeTypeL: "F"}, function(err, result){
        if (err) return msg.edit("`Please enter a valid city`").then(message => message.delete(3000))

        let current = result[0].current;
        let location = result[0].location;
        msg.delete();
        let embed = new Discord.RichEmbed()
        .setDescription(`Skys look - **${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(current.imageURL)
        .setColor("000000")
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Degree Type", location.degreetype, true)
        .addField("Temperature", `${current.temperature} Degrees`, true)
        .addField("Feels Like", `${current.feelslike} Degrees`, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true)

        msg.channel.send({embed});

    });
}

//USERSTATS

    if (command === "whois"){
        msg.delete();
        let user;

    if (msg.mentions.users.first()) {
         user = msg.mentions.users.first();
    } else {
         user = msg.author;
     }

     const member = msg.guild.member(user);

     const embed = new Discord.RichEmbed() 
        .setColor('#000000')
        .setThumbnail(user.avatarURL)
        .setTitle(`${user.username}#${user.discriminator}`)
        .addField('ID:', `${user.id}`, true)
        .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField('Created at:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Joined server:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', `${user.presence.status}`, true)
        .addField('Game:', `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField('Roles:', member.roles.map(roles => `${roles.name}`).join(', '), true)
        .setFooter(`Replying to ${msg.author.username}#${msg.author.discriminator}`)
    msg.channel.send({embed}).then(message => message.delete(15000));

}

    //STEAL-PFP


    //ZALGO

    if (command === "zalgo"){

        if (args.length < 1) return msg.edit("`Enter text to zalgo!`").then(message => message.delete(3000));
        msg.delete();

        msg.channel.send(`\u180E${zalgo(args.join(" "), 0.2, [10, 5, 10])}`);

    }

    //HEROSCOPE

    if (command === "heroscope"){
        let signs = [
            "capricorn",
            "aquarius",
            "pisces",
            "aries",
            "taurus",
            "gemini",
            "cancer",
            "leo",
            "virgo",
            "libra",
            "scorpio",
            "sagittarius"
        ];
        const sign = msg.content.split(/\s+/g).slice(1).join(" ");
        if (!sign) return msg.edit("`Please give me a sign to get the horoscope of!`").then(message => message.delete(3000));

        if (!signs.includes(sign.toLowerCase())) return msg.edit('`That is not a valid sign!`').then(message => message.delete(3000));;

        const text = await snekfetch
            .get(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`);
        const body = JSON.parse(text.body);

        var horoscope = body.horoscope
        var replaced = horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', '')

        const embed = new Discord.RichEmbed()
            .setColor('#000000')
            .setAuthor(`Horoscope for ${body.sunsign} on ${body.date}`, msg.author.displayAvatarURL)
            .setDescription(replaced)
            .setTimestamp()
            .setFooter(`${msg.author.username}'s Horoscope`)
            .addField('Mood', body.meta.mood, true)
            .addField("Intensity", body.meta.intensity, true);
        msg.channel.send({ embed }).then(message => message.delete(15000));
    }

    //WIKI

    if (command === "wiki"){
        const query = msg.content.split(/\s+/g).slice(1).join(" ");

        if (!query) {
            return msg.edit('`You must specify something to search!`').then(message => message.delete(3000));
        }

        const data = await wiki().search(query, 1);
        if (!data.results || !data.results.length) {
            return msg.edit('`No matches found!`').then(message => message.delete(3000));
        }

        const page = await wiki().page(data.results[0]);
        const summary = await page.summary();
        const paragraphs = summary.split('\n');

        if (!query.options) {
            paragraphs.length = Math.min(1, paragraphs.length);
        }
        try {
            msg.delete();
            const embed = new Discord.RichEmbed()
                .setAuthor(page.raw.title)
                .setDescription(paragraphs.join('\n\n'))
                .addField('Link', `**${page.raw.fullurl}**`)
                .setFooter('Wikipedia')
                .setColor('#000000');
            msg.channel.send({ embed }).then(message => message.delete(15000));
        } catch (err) {
            msg.delete();
            const embed = new Discord.RichEmbed()
                .setAuthor(page.raw.title)
                .setDescription("This paragraph was too long for the embed, please click the provided link.")
                .addField('Link', `**${page.raw.fullurl}**`)
                .setFooter('Wikipedia')
                .setColor('#000000');
            msg.channel.send({ embed }).then(message => message.delete(15000));
        }
    }

    //COLOR

    if (command === "color"){
        msg.delete();
        var color = msg.content.split(/\s+/g).slice(1).join(" ");

        if (!color) {
            var genColour = '#' + Math.floor(Math.random() * 16777215).toString(16);
            const embed = new Discord.RichEmbed()
                .setColor(genColour)
                .setImage(`https://dummyimage.com/50/${genColour.slice(1)}/&text=%20`)
                .setFooter(genColour);
            msg.channel.send({ embed: embed });
        } else {
            return msg.channel.send("Invalid Parameters!");
        }
    }

    //STEAM

    if (command === "steam"){
        if (args.length < 1) return msg.edit("`Please specify a game!`").then(message => message.delete(3000));
        msg.delete();
        const query = args.join(" ");
            const search = await snekfetch
				.get('https://store.steampowered.com/api/storesearch')
				.query({
					cc: 'us',
					l: 'en',
					term: query
                });
                
            if (!search.body.items.length) return msg.channel.send(`No results found for **${query}**!`).then(message => message.delete(3000));;
            
            const { id, tiny_image } = search.body.items[0];
            
			const { body } = await snekfetch
				.get('https://store.steampowered.com/api/appdetails')
                .query({ appids: id });
                
			const { data } = body[id.toString()];
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}

            const embed = new Discord.RichEmbed()
                .setColor(0x000000)
                .setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
                .setTitle(data.name)
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
                .setImage(tiny_image)
				.addField('❯\u2000Price', `•\u2000 ${price}`, true)
				.addField('❯\u2000Metascore', `•\u2000 ${data.metacritic ? data.metacritic.score : '???'}`, true)
				.addField('❯\u2000Recommendations', `•\u2000 ${data.recommendations ? data.recommendations.total : '???'}`, true)
				.addField('❯\u2000Platforms', `•\u2000 ${platforms.join(', ') || 'None'}`, true)
				.addField('❯\u2000Release Date', `•\u2000 ${data.release_date ? data.release_date.date : '???'}`, true)
				.addField('❯\u2000DLC Count', `•\u2000 ${data.dlc ? data.dlc.length : 0}`, true)
				.addField('❯\u2000Developers', `•\u2000 ${data.developers ? data.developers.join(', ') || '???' : '???'}`, true)
				.addField('❯\u2000Publishers', `•\u2000 ${data.publishers ? data.publishers.join(', ') || '???' : '???'}`, true);
            msg.channel.send({ embed }).then(message => message.delete(25000));;
    }
    
    
    //edgy

    if (command === "edgy"){
        msg.delete();
        msg.channel.send("`" + 'What the heck did you just hecking say about me,' +
                   'you little bitch? I\'ll have you know I graduated top ' +
                   'of my class of Shadow School, and I\'m a certified ' +
                   'Edgelord, and I have over 300 confirmed suicide attempts.' +
                   ' I am trained in passive aggressive warfare and I\'m ' +
                   'the top edger in the entire world. You are nothing to ' +
                   'me but just another therapist. I will wipe the heck out ' +
                   'of myself with precision the likes of which has never ' +
                   'been seen before below this Earth, mark my hecking words.' +
                   ' You think you can get away with helping me over the ' +
                   'Internet? Think again, meddler. As we speak I am ' +
                   'contacting my secret network of Edgelords across the ' +
                   'underworld and your support group is being edged right ' +
                   'now so you better prepare for the storm, maggot. The ' +
                   'storm that wipes out the pathetic little thing I call ' +
                   'my life. I\'m hecking dead, kid. I can be anywhere, ' +
                   'anytime, and I can kill myself in over seven hundred ' +
                   'ways, and that\'s just with my bare hands. Not only am ' +
                   'I extensively trained in unarmed suicide, but I have ' +
                   'access to the entire arsenal of the ropestore and I will ' +
                   'use it to its full extent to wipe my miserable ass off ' +
                   'the face of the continent, because I\'m a little shit. ' +
                   'If only you could have known what unholy retribution ' +
                   'your little "supportive" comment was about to bring down ' +
                   'upon me, maybe you would have held your hecking tongue. ' +
                   'But you couldn\'t, you didn\'t, and now I\'m paying ' +
                   'the price, you goddamn idiot. I will shit guilt all ' +
                   'over you and I will drown in it. I\'m fucking dead, kiddo.' + "`"
)
    }

    //HASTEBIN

    if (command === "hastebin"){
        let haste = args.slice(0).join(" ")
        if (!args[0]) { return msg.edit("`What do you want to post to Hastebin`").then(message => message.delete(3000)) }
        hastebin(haste).then(r => {
            msg.delete();
            msg.channel.send(":white_check_mark: Posted text to Hastebin at this URL: " + r).then(message => message.delete(15000));
        })
    }

   //search

   if (command === "google"){
       if (args.length < 1) return msg.edit("`Please enter something to google`").then(message => message.delete(3000));
    msg.delete();
    let embed = new Discord.RichEmbed()
    .setAuthor("Google Search", "https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip")
    .setColor("#000000")
    .setDescription('[' + args.toString().replace(/,/g, ' ') + '](https://www.google.com/search?hl=en_US&q=' + args.toString().replace(/,/g, '+') + ')')
    msg.channel.send(embed).then(message => message.delete(15000));
   }

   //YEAR

   if (command === "year"){
       msg.delete();

	let now = new Date();
	let next = new Date(now);
	next.setFullYear(now.getFullYear() + 1);
	next.setHours(0, 0, 0, 0);
	next.setMonth(0, 1);
	let duration = next - now;
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / 1000 / 60) % 60);
	let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));
    
    let embed = new Discord.RichEmbed()
    .setAuthor("Next Year!", msg.author.displayAvatarURL)
    .setColor("#000000")
    .setDescription(`There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${next.getFullYear()}**!`)
    .setFooter(`Or, in short, ${moment.duration(next - now).humanize()}.`)
    msg.channel.send(embed).then(message => message.delete(15000));
   }
   
   //REVERSE

   if (command === "reverse"){
       if (args.length < 1) return msg.edit("`Please enter a sentence or word to reverse`").then(message => message.delete(3000));
    let haste = args.slice(0).join(" ");
    msg.delete();
    msg.channel.send(haste.split('').reverse().join(''));
   }

   //SPACE

   if (command === "space"){
    if (args.length < 1) return msg.edit("`Please enter a sentence or word to space`").then(message => message.delete(3000));
    let haste = args.slice(0).join(" ");
    msg.delete();
    msg.channel.send(haste.split('').join(' '))
   }

   //IPLOOK UP

   if (command === "ip"){
       msg.delete();
       let haste = args.slice(0).join(" ");
       if (args.length < 1) return msg.edit("`Please enter a valid IP address`").then(message => message.delete(3000));
       let embed = new Discord.RichEmbed()
       .setAuthor("IP-Location", "https://icon2.kisspng.com/20180524/th/kisspng-reticle-clip-art-sight-5b06925b8cc646.5048681515271573395766.jpg")
       .setDescription("https://www.infosniper.net/index.php?ip_address=" + haste + "&k=&lang=1")
       .setColor("#000000");
       msg.channel.send(embed).then(message => message.delete(15000));
   }

    if (command == "lizard") {
        superagent.get("https://nekos.life/api/lizard", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Lizard").setColor("#FBFF00").setImage(res.body.url).setFooter("Image by syrus") })
        })
    }
  if (command == "catfact") {
        superagent.get("https://random.cat/meow", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", {
                embed: new Discord.RichEmbed().setTitle("Random Cat").setColor("#FBFF00").setDescription(catFacts.random()).setImage(res.body.file).setFooter("Image by random.cat")
            })
        })
    }

    if (command == "dogfact") {
        superagent.get("https://random.dog/woof.json", (err, res) => {
            if (err) { return msg.edit(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Dog").setColor("#FBFF00").setDescription(dogFacts.random()).setImage(res.body.url).setFooter("Image by random.dog") })
        })
    }
 
 if (command == "neko") {
        superagent.get("https://nekos.life/api/neko", (err, res) => {
            if (err) { return msg.channel.send(":x: An error has occurred. Details: " + err) }
            msg.edit("", { embed: new Discord.RichEmbed().setTitle("Random Neko").setColor("#FBFF00").setImage(res.body.neko).setFooter("Image by syrus") })
        })
    }
//embed

   if (command === "embed"){
       if (args.length < 1) return msg.edit("`Please enter a sentence or word to embed`").then(message => message.delete(3000));
       msg.delete();
       msg.channel.send(new Discord.RichEmbed().setDescription(args.join(" ")).setColor("BLACK"));
   }
  
  //penis


function ran(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
   //SUPPORT

   if (command === "support"){
       msg.delete();
       let embed = new Discord.RichEmbed()
       .setAuthor("Support Server", "https://www.logolynx.com/images/logolynx/1b/1bcc0f0aefe71b2c8ce66ffe8645d365.png")
       .setColor("#000000")
       .setDescription("For support please join: https://discord.gg/uZDX7qZ \n After joining please go to a support channel staff wil be with you as soon as possible")
       msg.channel.send(embed).then(message => message.delete(15000));
   }

   //TRANSLATE

   if (command === "translate"){
    if(args.length< 1)
    return msg.edit("`Please enter a phrase for me to translate...ex, -translate {Yo tengo un perro} <language>`").then(message => message.delete(5000));
var lang = args[args.length-1];
if(lang.charAt(0)=='-'){
    lang = lang.substring(1);
    args.pop();
}else{
    lang = "en"
}

var gay = args.join(" ");
if(gay.length>700){
    msg.edit("`Message is too long`").then(message => message.delete(5000))
        .catch(err => console.error(err));
    return;
}
var ptext = gay;
gay = gay.split(/(?=[?!.])/gi);
gay.push("");
gtranslate(gay, {to: lang}).then(res => {
    msg.delete();
    let embed = new Discord.RichEmbed()
    .setAuthor("Translated to "+ lang,"https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip")
    .setColor("#000000")
    .setDescription("**"+ res.join(" ")+"**")
    .setFooter("Translated from \""+ptext+"\"")
    msg.channel.send({embed}).then(message => message.delete(15000))
        .catch(err => msg.channel.send("`No permission for embedded links`")
        .catch(err => console.error(err)));
}).catch(err => {
    msg.edit("`That language could not be found please do \"-translist\"`").then(message => message.delete(5000))
        .catch(err => console.error(err));
})
}

//LANGLIST 

if (command === "translist") {
    msg.delete();
    let embed = new Discord.RichEmbed()
    .setAuthor("Languages (Auto English)", "https://www.gettysburgflag.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/s/i/signature-american-flag.jpg")
    .setColor("#000000")
    .setDescription("`af`.Afrikaans  `sq`-Albanian  `ar`-Arabic  `hy`-Armenian  `az`-Azerbaijani  `eu`-Basque  `be`-Belarusian  `bn`-Bengali  `bs`-Bosnian  `bg`-Bulgarian `ca`-Catalan  `ceb`-Cebuano  `ny`-Chichewa  `zh-cn`-Chinese Simplified  `zh-tw`-Chinese Traditional `co`-Corsican  `hr`-Croatian  `cs`-Czech  `da`-Danish  `nl`-Dutch `en`-English  `eo`-Esperanto  `et`-Estonian  `tl`-Filipino  `fi`-Finnish  `fr`-French  `fy`-Frisian  `gl`-Galician  `ka`-Georgian  `de`-German  `el`-Greek  `gu`-Gujarati  `ht`-Haitian Creole  `ha`-Hausa  `haw`-Hawaiian  `iw`-Hebrew  `hi`-Hindi  `hmn`-Hmong  `hu`-Hungarian  `is`-Icelandic `ig`-Igbo  `id`-Indonesian  `ga`-Irish  `it`-Italian  `ja`-Japanese  `jw`-Javanese  `kn`-Kannada  `kk`-Kazakh  `km`-Khmer  `ko`-Korean  `ku`-Kurdish (Kurmanji)  `ky`-Kyrgyz  `lo`-Lao  `la`-Latin  `lv`-Latvian  `lt`-Lithuanian  `lb`-Luxembourgish  `mk`-Macedonian  `mg`-Malagasy  `ms`-Malay  `ml`-Malayalam  `mt`-Maltese  `mi`-Maori  `mr`-Marathi  `mn`-Mongolian  `my`-Myanmar (Burmese)  `ne`-Nepali  `no`-Norwegian  `ps`-Pashto  `fa`-Persian  `pl`-Polish  `pt`-Portuguese  `ma`-Punjabi  `ro`-Romanian `ru`-Russian  `sm`-Samoan  `gd`-Scots Gaelic  `sr`-Serbian  `st`-Sesotho  `sn`-Shona  `sd`-Sindhi  `si`-Sinhala  `sk`-Slovak  `sl`-Slovenian  `so`-Somali  `es`-Spanish  `su`-Sudanese  `sw`-Swahili  `sv`-Swedish  `tg`-Tajik  `ta`-Tamil  `te`-Telugu  `th`-Thai  `tr`-Turkish  `uk`-Ukrainian  `ur`-Urdu  `uz`-Uzbek  `vi`-Vietnamese  `cy`-Welsh  `xh`-Xhosa  `yi`-Yiddish  `yo`-Yoruba")
    .setFooter("Command: -translate {message} -(lang)")
    msg.channel.send(embed);
}

     if (command === "help"){
        msg.delete();
        let haste = args.slice(0).join(" ");
        if (args.length < 1){
         let embed = new Discord.RichEmbed()
                .setDescription("`Prefix:` `x` `made by:` `John Wilks Booth`")
                .setAuthor("{─────────────<   Xigna SelfBot   >─────────────}")
                .setColor("#000000")
                .setTimestamp()
                .addField(`>𝙃𝙀𝙇𝙋 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎 ───────────────────────`, '**```                - HELP NUKE \n - HELP TEXT                   - HELP SPAMMER \n \n - HELP FUN                    - HELP FUN2 \n \n - HELP INFO                   - HELP STATUS```**')
                .addField(`>𝙈𝙊𝘿 𝙊𝙉 ───────`, '**` ✅NITRO SNIPER `** \n **` ✅SLOTBOT SNIPER `** \n **` ✅MEE6 XP `**')
                .setImage('https://media.discordapp.net/attachments/762057378165162014/763561009389764661/200.gif');
                msg.channel.send(embed).then(message => message.delete(240000));
        }else
        if (haste.toLowerCase() === "status") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help") 
            .setColor("#000000")
            .setTimestamp()
            .addField(`𝙎𝙏𝘼𝙏𝙐𝙎 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎 ──────────────────────────────`, '`Stream` `Listen` `Watch` `Play` `Stop`')
            .setImage('https://cdn.discordapp.com/attachments/742451678648991895/743034031855108202/MOSHED-2020-8-12-13-7-39.gif')
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "text") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742820800062685324/742825246935220274/TEXT.gif')
            .addField("**𝙏𝙀𝙓𝙏 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎**", "`Emojify`\n `Ascii`\n `Lol`\n `Zalgo`\n`Edgy`\n`Reverse`\n `Space`\n `Embed`")
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "spammer") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742451678648991895/743034024296972388/MOSHED-2020-8-12-13-3-27.gif')
            .addField("**𝙎𝙋𝘼𝙈𝙈𝙀𝙍 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎  ─────────────**", "`Spam` - Spams chat\n `Spamtime` - spam at interval \n `Spamstop` - Stops spam \n `Dmtime` - DM everyone w/ 2m timer (DM Advertising) \n `Dmall` - DM everyone instantly \n `Lyricspam` - Spams chat with lyrics \n`Sendall` - Sends message to all channels")
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "fun2") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742451678648991895/743034032652025926/MOSHED-2020-8-12-13-8-39.gif')
            .addField("**𝙁𝙐𝙉2 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎 ─────────────────**", "`IQ` - Displays users IQ \n `Penis` - Displays users penis length \n `Rate` - Displays users attractiveness \n `Lovecalc` - Displays love between users \n `Kiss` - @kiss someone \n `slap` - @slap someone \n `hug` - @hug someone \n `feed` - @feed someone \n `fuck` - @fuck someone \n `gay` - Displays users how gay")
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "fun") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742451678648991895/743034027933696111/MOSHED-2020-8-12-13-6-15.gif')
            .addField("**𝙁𝙐𝙉 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎 ──────────────────**", "`Avatar` - Grab user avatar `stealpfp` - ping @ and set it on your pfp \n `8ball` - Ask 8ball a question \n `YesorNo` - Returns Yes/no to question \n `Coinflip` - Flip a coin \n `Lyric` - Random rap lyric \n `Heroscope` - Check Heroscope \n `Color` - Random Color \n`Year` - Time until next year\n`Lizard` - Gives you a random lizard image\n`Dogfact` - Gives you a random dog image\n`Catfact` - Gives you a random cat image\n`Neko` - Gives you a random neko image.")
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "info") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742451678648991895/743034040579391488/MOSHED-2020-8-12-13-10-59.gif')
            .addField("**𝙄𝙉𝙁𝙊 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎  ─────────────────**", "`unbanall` - unbanall \n`Purge` - Delete messages \n `Restart` - Restarts bot \n `Ping` - Check ping \n `Server` - Server stats \n `Urban` - Check word with Urban Dict. \n `Calc` - Solves problem \n`Shorten` - Shortens URL \n `Poll` - Creates a poll \n `Team` - Sets random users in teams \n `Weather` - Checks Weather \n `Userstats` - Checks Users Stats \n `Uptime` - Checks bots uptime \n `Wiki` - Search with Wiki \n `Steam` - Check steam games \n `Hastebin` - Uploads text to Hastebin \n`Google` - Googles information \n `Ip` - Lookup IP location \n `Support` - Join support server \n `Translate` - Translate messages \n `Translist` - Languages to translate to\n `Guildlist` - Lists all the guilds you are in")
            msg.channel.send(gay).then(message => message.delete(240000));
        } else
        if (haste.toLowerCase() === "nuke") {
            let gay = new Discord.RichEmbed()
            .setAuthor("Help")
            .setColor("#000000")
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/742820800062685324/742825678298284132/NUKE.gif')
            .addField("**𝙉𝙐𝙆𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿𝙎**", "`Banall` - Bans all users \n `Kickall` - Kicks all users \n `Massvc` - Creates 100 voice channels \n `Masschannel` - Creates 100 text channels \n `Deleteall` - Deletes all channels \n `lie` - Bans and deletes everything")
            msg.channel.send(gay).then(message => message.delete(240000));
        }
}
  
  
     if (command === "penis"){
    let user = msg.mentions.users.first()
    if(!user) user = msg.author
    let replies = [
        "8=D",
        "8==D",
        "8===D",
        "8====D",
        "8=====D",
        "8======D",
        "8========D",
        "8=========D",
        "8==========D",
         ]
     
         let random = Math.floor(Math.random() * replies.length)
     
         let embed = new RichEmbed()
         .setTitle(`HOW LONG IS HIS DICK`)
         .setDescription(`${user.tag} penis\n${replies[random]}`)
         .setColor("#000000")
     
         msg.channel.send(embed)

}
//SEND ALL

if (command === "sendall"){
    let haste = args.slice(0).join(" ");
    if (args.length < 1) return msg.edit("`Please enter a message to say`");
    msg.delete();
    msg.guild.channels.forEach(channel => channel.send(haste));

}

if (command === "guildlist") {
        msg.edit(bot.guilds.forEach(g => { msg.edit(g.name) }))
}

//CLEAR

if (command === "clear"){
    let haste = args[0];
    if (isNaN(haste) || haste > 100) return msg.edit("`Please enter a valid number < 100`");
    msg.channel.bulkDelete(haste);
    msg.channel.send("`Successfully deleted` " + haste + " `messages`").then(message => message.delete(5000));
}
  
   if (command === "urban"){
     let args = msg.content.split(' ').slice(1).join(' ');
   const hexcols = [0xFFB6C1, 0x4C84C0, 0xAD1A2C, 0x20B046, 0xF2E807, 0xF207D1, 0xEE8419];
   if (!args) {
       return msg.reply('add a urban search, u pleb!');
   }
   sfetch.get('http://api.urbandictionary.com/v0/define?term=' + args).then(res => {
       if (res.body.list[0] === undefined) {
           return msg.channel.send('**»Error**: Couldnt find the word');
       }
       const definition = res.body.list[0].definition;
       const word = res.body.list[0].word;
       const Author = res.body.list[0].author;
       const exam = res.body.list[0].example;
       const thumup = res.body.list[0].thumbs_up;
       const thumdown = res.body
       .list[0].thumbs_down;
       const embed = new Discord.RichEmbed()
   .setColor(hexcols[~~(Math.random() * hexcols.length)])
   .setTitle(`This is the info for the word: **${word}**`)
   .addField('definition:', `${definition}`)
   .addField('Author:', `${Author}`)
   .addField('Example:', `${exam}`)
   .addField('Rating', `👍 ${thumup} 👎 ${thumdown}`, true)
   .setThumbnail('');
       msg.channel.send({embed}).catch(e => console.log(e));
   }).catch(err => {
       if (err) {
           console.log(err);
    
};
 });
       }
  

    if (command === "lyric"){
        let messageList = [
            "`Ah-pardon me, I get the money like lottery don't bother me, she suck me so good, no slobbery`",
            "`AK with the scope, nigga and it's real dirty (21)`",
            "`Wait a minute, I been sippin’ Henny like it’s Minute Maid, Let ‘em hate, I been gettin’ to it, gettin’ hella paid`",
            "`She said, Do you love me? I tell her, Only partly, I only love my bed and my mama, I'm sorry`",
            "`Xans, Perky, check (yeah), Bill Belichick, Take the air out the ball (yeah), just so I can flex`",
            "`Yeah, and send shots off at your dome Pussy boy, we'll pull up at your home`",
            "`I fucked your thot, she gave me top, I guess that's my confession`",
            "`Draw down with that Glock, bitch don't make no sound Say somethin', might get shot bitch, face down to the ground`",
            "`I'm sippin' on juice, smokin' that pack, yeah, Hop out a coupe, step in the Loubs, check out my fashion`",
            "`Cops try to search us, hoes tryna twerk us Walk in with all this ice, Did it on purpose`",
            "`I got a chopstick, a FN, and the Draco hold a 100, Got a shooter in a booth with me like he goin' huntin'`",
            "`Smoke a pussy nigga like a Newport`",
            "`Rocket got a 'Rari, that's a new horse`",
            "`Diamonds 'round my neck like what my neck worth`",
            "`I like selling mid because I smoke the boof, I be countin' hunnids 'til my fingers blue`",
            "`Hop out the whip, I'm in the kitchen, I whip, Chopper on me, shots to the head make him sick`",
            "`I don't want friends, I want Audis , Smokin' on boof and it's Maui (ayy)`",
            "`Like, flex on you haters, huh, hi haters, This is my world so it's all in my favor`",
            "`Turned to a savage, pocket got fatter, she call me daddy, Smokin' that gas, gone off that Xanny, she on the powder`",
            "`Ice on my grill, it's a new smile, She wanna fuck on your boo, wow`",
            "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
            "`Ayy, fucked a girl, she a fan, She let me hit it on video, My circle small like a cheerio`",
            "`I'ma paint, on her face like I'm DoodleBob, Jump in, that pussy like I scuba dive`",
            "`If I see you, I'ma wet you, hit you and your nephew, Came in with a big drum, wet you like a stencil`",
            "`I'm 1400 with the screw up kids, don't screw up kid, Or that choppa wet your crew up kid, I'm two up kid, We animals, better zoo up kid`",
            "`I just pulled up in a Lamb, cuzzo pulled up in a Range, And we reloadin' them sticks lil' nigga, we release them things, ayy`",
            "`Bitch I'm a P (what), bitch I'm a G (huh), Took that lil bitch now that bitch off the leash (ayy, ayy, ayy, gang)`",
            "`GLE, 'cause that Lambo movin' fast (skrr), S Class, G Class, lotta class (sss, sss)`",
            "`You was hatin’ but you switched up cause I’m next up, I got lean and some forty in my red cup`",
            "`In my own crib when they ask me where the stu at (In the crib, ay)`",
            "`This a Rollie, not a stopwatch, shit don't ever stop, This the flow that got the block hot, shit got super hot, ayy`",
            "`I pulled up in a drop top, she drop dead, My diamonds dancing hopscotch, they holding hands`", 
            "`I don't know what planet I'm on, I'm a king, lil bitch watch the throne`",
            "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
            "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
            "`Baby girl I know you hit my phone for a reason, If you don't get loose or start freaking then I'm leaving`",
            "`The dash, it's digi', the schedule busy, My head in a hoodie, my shorty a goodie, My cousins are crazy, my cousins like Boogie`",
            "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
            "`I put my bitch in Celine (my bitch in Celine), Gucci right down in my other bitch`",
            "`I like to roll off the bean, Ride with me, know I ain't havin' it`",
            "`Might run to the money, I'm married, Diamond, my wrist, you think I'm so scary`",
            "`Baby girl, what you doing, where your man? (where your), I just popped a xan, fifty thousand in Japan (fifty thousand in Japan)`",
            "`Baby girl, what you doing, what's your name? (baby girl, what), I ain't playin' no games, see these diamonds in my chain?`",
            "`No this not a date, this a cruise, but don't debate, wait (baby), It's gettin' late (huh), think it's past eight (what), Took her to my place, baby ate me like some cake, wait (huh)`",
            "`Ayy, so much green on my street like it's Grove (whoa), Ayy, made a lot of money on the road (yuh)`",
            "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
            "`The coupe is retarded (skrrt), Louis my carpet (carpet)`",
            "`They going out bad, the sad way (huh), I put the cash on three way (racks), Rich nigga drop a baby in a hoe face (hoe face), Where the hell was you at on the broke days? (Whoa)`",
            "`I ran them streets with no cleats (hey), 44 millimeter iced out Philippe (ice)`",
            "`I was made for this shit, rookie of the year, I wouldn’t show up for the freshman list`",
            "`Trade my Honda to a Bentley, Now these fuckboys wanna end me`",
            "`Teach you how to be a boss (boss), top dropped off (skrrt), Motherfuck the fame, I done came to the vault (for what)`",
            "`Put my pride to the side (side), I could never lie, I don't care if you cry, let them pussy niggas die`",
            "`New designer shit, Diamonds on me might blind a bitch`",
            "`I be booted to the morning, PM to the morning, My lil' woadie wanna bag him, he just want a Rollie`",
            "`Take a moment, count my guap, count my guap, All these racks bombin' in, they bombin' in (hold up)`",
            "`First things first: rest in peace Uncle Phil, For real, you the only father that I ever knew, I get my bitch pregnant, I'ma be a better you`",
            "`No role models and I'm here right now, No role models to speak of, Searchin' through my memory, my memory, I couldn't find one`",
            "`Krispy Kreme, Yeah bitch I stay clean`",
            "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
            "`Take my shoes and walk a mile, somethin' that you can't do`",
            "`It's the niggas that copy the wave, Then it's the niggas that started it`",
            "`Killing pain with the pain killers, I make it rain with the gang members`",
            "`I get the drip from my walk, my baby she come from up north, My money, it come from the vault`",
            "`I hop in that bitch and get lost, My money is starting to get tall, I walk in the mall buy it all`",
            "`Pop these niggas like a wheelie nigga, you a silly nigga, In the hood with them Billy niggas, and them Hoover niggas`",
            "`You just wanna fuck me for the fame, Wanna fuck me cause them diamonds on my chain`",
            "`Big body, she gon' swerve it, now we went by the surface, Shorty lookin' picture perfect, say she ready, never nervous`",
            "`I'm in a spaceship, get ready for takeoff, Can't fuck with lil' shorty, I know that she basic, She makin' my dick soft`",
            "`They tell me I'ma be a legend, I don't want that title now, 'Cause all the legends seem to die out, What the fuck is this 'bout?`",
            "`Tell lil' baby she can love me or she hate me, In the brand new McLaren, and I'm racing`",
            "`Tryna hide from the camera, I ain't going outside today, Couldn't find Hi-Tec, so I'm drinking on Act' today`",
            "`Gotta TEC and a chopper, with a hundred thousand dollars up in the Wraith`",
            "`I ain't foldin' under pressure, I ain't switchin' for no ho, I ain't talkin' to no cop and I ain't tellin' on my bros`",
            "`Big dope inside this Backwood case this nigga want smoke`",
            "`Call my brother on the phone, he said broski you a star, I said brother hold it down soon we'll all be livin' large`",
            "`I got tattoos on my face, I use that shit as motivation, I could never get a job, so for my dream, I'm dedicated`",
            "`Fifty-five hunnit for a new pair of titties, I'll buy 'em like Jordans`",
            "`Everybody rock with me because I'm up now, Took your girl and I'ma score, like I made the touch-down`",
            "`Used to want a G-Shock, now I'm walking with a bust down`",
            "`I got red shooters, I got blue, Let that thing down then point at you`",
            "`I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
            "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
            "`Flexin' for these bands, finna pop out, ayy, Boolin' on the block I got my Glock out, ayy`",
            "`I'ma keep rocking these chains while they keep callin' me 'coon'`",
            "`Ayy, when my brother get out, told him ain't no block now, Same bitches curbin' all up on my cock now`",
            "`I just bought me a new Glock, wet a nigga like a mop, My shooters pull up at your block, Kick right in your door, I'm talking your spot`",
            "`I bought a new Glock and the 30 round drum, You open your mouth and you done bitch`",
            "`Let me know if you want it, jump out get it, gang, 2 pistols one Tay-K call me Tay-K Max Payne`",
            "`If you not talkin' 'bout smoke you could go dat way`",
            "`2k my sweatsuit, I walk with demeanor, Sippin' on lean, can you tell me who leaner`",
            "`I just spent a cool half a ticket on my jewelry, Clear white diamonds make your eyesight blurry`",
            "`I just cashed out on my neck, that's a house, Head out, fuck a spouse, we pop off, we ain't hearin' it`",
            "`Nigga smilin' in your face, really want you in a ditch, Half a ticket on my neck, quarter ticket on my wrist`",
            "`I get pussy in a pair of off-whites, Know I want, you can see it my eyes, surprise`",
            "`Smoke got my eyes lookin' Korean, Every time that I fly, VIP'n`",
            "`Fuck signs, my niggas gettin' high, Party of flies, Taylor gang or resign`",
            "`Why you even come back to crib if you ain't stayin'?, Ridin' with some real niggas, know that we ain't playin'`",
            "`Homie, I'm a boss baby, I don't need no favors, Got so many cars, I don't got room for my neighbors`",
            "`Suckin' on me good, treat me like a Now and Later, Breakfast in the morn', we can get our dinner catered`",
            "`Anything I want, I pull up and stunt, Parking in the back, we can't do the front`",
            "`Take them bitches phones, ain't nothing, we don't trust 'em, Send 'em for the gangs, why they came, we don't love 'em`",
            "`Dread-head, weed head, No sleep, don't need a bed`",
            "`I don't know what the ending is, Chrome all where the engine is`",
            "`Baby I'm a rich ass nigga never said it's gon easy to deal with it`",
            "`Roll with the paper, see them lames later, Can't save her, her nigga stepped out, now she sayin' what she really think, Rollin' up pounds of dank`",
            "`I feel you when you walk in, Conversation, I'ma spark it`",
            "`I got just what you need, We gon drink and roll the weed`",
            "`Now you up in my room, doin' what grown people do, You want me, me on you, hit me when we're through`",
            "`Only on Gin and them drugs, I walked in, in the club, About three of them, dawg I'm not kiddin'`",
            "`Bitch bad, her ass fat, I'll probably let her in, Ball so fuckin' hard I need a letterman`",
            "`Cookies and OG, Come to my crib, we blow by the Os`",
            "`Say they got the good but what the pack smell like?, Feel like it's a dream but now we back to real life`",
            "`Let's turn on the stove and call up some hoes, Let's roll up and do this shit`",
            "`I just rolled a pound at my bake sale, Bitches goin' down at my bake sale`",
            "`Naked bitches in the kitchen, shake 'n' bake, What you think? I'm on this dank, I'm off that drank`",
            "`Black stripe, yellow paint, them niggas scared of it but them hoes ain't, Soon as I hit the club look at them hoes face`",
            "`It's the big boy you know what I payed for it, And I got the petal to the metal`",
            "`Hear them haters talk but there's nothing you can tell em, Just made a million got another million on my schedule`",
            "`Yeah, uh huh, you know what it is, Everything I do, I do it big`",
            "`Then it's to my car, puff a pound of dank, Now we in the stars, and I'ma make it rain, Drown the sink,`",
            "`So what I keep ‘em rolled up?, Saggin’ my pants, not caring what I show`",
            "`Roll joints bigger than King Kong’s fingers, And smoke them hoes down ’til they stingers`",
            "`I got a serious question, Do you like sex? If you thinkin' yes, then I'm tryna test you`",
            "`My path, been clear, The bottom, been near`",
            "`I've passed, my peers, I've switched, them gears, They in, the rear`",
            "`God damn, you know who I am, Try to be on the low, but you ain't slow`",
            "`You like real facts, Like, if you show love, you gon' get it back`",
            "`We can go and get a private room, We could fuck for one night, ain't gotta jump the broom`",
            "`Grabbin' you close and pullin' you nearer, Lookin' at both of us in the mirror`",
            "`She swallow a nigga cause my dollars is bigger, And you know Party my nigga`",
            "`Let me get into it, let you smoke a little bit, Now fuck you better than the nigga you with`",
            "`Fuckin' with me got me goin' way up, Slammin' in that pussy, never lay up`",
            "`Run around the world, I don't run games, Run into your bitch, I'ma find out her name`",
            "`I spent that check on my neck, I got yo' bitch drippin', she wet`",
            "`I go to yo' crib, put my dick in yo' sister, Yo' bitch on my line, I pull up and I drill her`",
            "`When I touch a milli, I'll cop me a Bentley, So let me stack up 'cause my pockets look empty`",
            "`I need me that check, I pay hella rent, My pockets thicker than a elephant`",
            "`2016, bitch I coulda been President, Bitch I'm the shit, I came up and it's evident`",
            "`You niggas are snakes, yuh, These bitches is fake, yuh, I see that you hate, yuh`",
            "`Stop smoking Black & Milds bitch you nasty, How you smoking Blacks but actin' like you classy?`",
            "`Stop smoking Black & Milds, with your country ass, You got shit around your mouth, with your crusty ass`",
            "`Last time we spoke, I smelled your breath, it made me faint, Bitch I hopped up in your Honda Civic, all I smelled was paint`",
            "`Heard the whole hood hit you from the back, I heard the hood ran a train on your track`",
            "`Take advantage of me bitch I wanna be yo slut, Face, Titties, Booty, and Toes, What I'm eating for lunch`",
            "`Ugly God A.K.A. Nigga Too Nasty, Come here baby put your phone number in my gadget`",
            "`My hair on point but my clothes stay ratchet, Young Ugly God, bitch my dick game disastrous`",
            "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
            "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
            "`Baby girl I know you hit my phone for a reason`",
            "`Girl you know I'm fiending, eat this meat you ain't no vegan`",
            "`I'm trying to tap that ass and bust a nut, Don't give me the wrong message girl, I'm trying to see what's up`",
            "`Fuck Ugly God, Ugly God a hoe, Flexing like you got it, bitch, I know your ass is broke`",
            "`Back in 10th grade, your coach kicked you off the team, Every single day, you wear them same pair of jeans`",
            "`Water this, water that, you finna get exposed, Back in eighth grade, you use to borrow niggas' clothes`",
            "`When I catch you slipping, I'm gon' punch you in your teeth, Ugly God a bitch, pussy boy don't want no beef`",
            "`Aye, I make music from my basement, I done came up and got famous, I'm the G.O.A.T. ain't no replacement`",
            "`I pipe your bitch with this ice on my wrist cause she see my dick hard like the pavement, I got that guap now these bitches gon' flock B, I got your main bitch in amazement`",
            "`Just like a maverick, Watch me ball out like a maverick`",
            "`I spent that check on my wrist and my neck, Ugly God got the sauce you can't handle it, Made half a mil' by myself with no deal, now they mad cause I'm cocky and arrogant`",
            "`My new bitch thick like a steak, I sit back and thumb through this cake`",
            "`Now I'm on top the ladder bitch, look at my swagger, I'm sharp like a dagger, Nigga want beats, serve em up like a platter, She hit my phone, I put meat in her bladder`",
            "`I drip on your bitch like water, I splash on your bitch with the water, I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
            "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
            "`I ain't got time for no wife, yeah, Lmfao you kiss bitches I pipe, yeah`",
            "`I just bought me a new Glock, Nigga talked down then get popped`",
            "`Got a long clip on my gun, I bought a new Glock and the 30 round drum`",
            "`Now these bitches wanna flock, I came up off of water now I'm posted at the dock`",
            "`Bitch I beat my meat, Give a fuck 'bout what you think, I nut all up in my sheets`",
            "`I go ham, I eat ass, I'm never starving, God damn`",
            "`Bitch I beat my meat I take my dick out on a date, I nut all up in my face, tryna' save the human race`",
            "`I got your girl dripping out her panties like Fiji, Lotion in my hands, so my palms a little greasy`",
            "`Bitch I got that bitch, but her boyfriend don't believe me, Until I power up on that booty like Luigi`",
            "`Ugly God bitch, booty thicker than the bible, Lotion in my pocket, but that's only for survival`",
            "`You used to say you in love, I used to say that shit back`",
            "`Shawty, I just want your love for a minute, I be captain baby, you can be lieutenant`",
            "`Playin games with me shawty, This is not no scrimmage, scrimmage`",
            "`I gotta get my fresh paper boy, Optimistic, inflicted the premonition`",
            "`Ballin' like Stephen Curry, Gold fangs in my mouth so purty`",
            "`It's all I want, got a nigga faded, Shawty on fire, and she really blazin'`",
            "`All year gone and on your own for stunting, Say you ain't been worried, bitch you fronting`",
            "`Got a knife on my finger, I was stabbed in the back`",
            "`Hanging with them Bs, and you know we yellin' slatt, Few niggas talk down, don't want to know the aftermath`",
            "`1400, bitch, you know I tote a pole, With 6ix9ine, bitch, you know we tote them poles`",
            "`Yeah, and send shots off at your dome, Pussy boy, we'll pull up at your home`",
            "`They don't want no smoke, on the block with my goons, I hit a nigga up, I don't like to pick and choose`",
            "`Smoke a pussy nigga like a Newport`",
            "`In too deep like a bottomless hole, Change my number just like summer clothes`",
            "`I've been shining in my chain, I do not fuck with no lames`",
            "`Ooh, so they think I wanna die, yeah, 'Cause my doors are suicide, yeah`",
            "`Bet my coffin would be nice, yeah, Stud that bitch up with some ice, yeah`",
            "`Ayy, fuck your bitch and hit my fucking dab, Ayy, choppers by my side, you know it clap`",
            "`Big racks on my body, baby got this cash, Pray these goofy niggas really goin' out sad`",
            "`I can't do this anymore, yeah, When it rains it really pours, yeah`",
            "`New Chanel walkers, when I walked up in the room, Maison Margiela, when I walked up in the room`",
            "`Take a moment, count my guap, count my guap, All these racks bomin' in, they bomin' in`",
            "`I pulled up in a drop top, she drop dead, My diamonds dancing, hopscotch, they holding hands`",
            "`Everyday I keep it real and get that bag, hoe, 'Cause that shit up for grabs hoe, put that on my tab hoe`",
            "`Forever tryna fight all these demons in my head, Together we can fight all these demons in my head`",
            "`I let the money dance, the diamonds bling's all by itself, Without any help, so that means it shine on it's own`",
            "`Who knew us kid, I think I came from under a rock, Was out on the block, my cousin had that shit in his sock`",
            "`I just pulled up in a lamb, cuzzo pulled up in a range, And we reloadin' them sticks lil' nigga, we release them things`",
            "`I don't know you I just got into your shit today, Lookin like a million dollar lick today`",
            "`Implement that shit into your mind, just so you know though, Sucka free living, I'ma say that that's the motto`",
            "`Meanwhile I'm in New York fucking up SoHo, Just bagged a new chick, Caroline, nickname Coco`",
            "`I just sit back and listen to old Wayne songs, And get dome from a bitch while I brainstorm, And spit flames while also making it rain storm`",
            "`Nowadays I really miss my fucking idols, so that's the title, I grab a bible, pray for my rivals`",
            "`Baby what you wishin' for?, Maybe you should wish it more?`",
            "`Wish you'd get out my face, might go MIA, Might just blow my brain, R.I.P Kurt Cobain`",
            "`I wish you will find your chill, 'Cause Lord knows this shit get real`",
            "`Shawty know I kill people, real people, From the trenches where it's real lethal, tote real regals`",
            "`So much green on my street like it's Grove, Made a lot of money on the road`",
            "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
            "`Yeah, I turn you ass to clip-art, Boy, you is a retard, on the go just like a go-kart`",
            "`Go get a thermometer for the pot, I need this shit cooked right, Let's keep this water 400 degrees Fahrenheit`",
            "`Aye JR nigga, ain't it a blessing?, We made it out of Lansing after all that happened?`",
            "`I wish I would pay attention to these homeless niggas, Don't call my phone, I don't want to do no song with niggas`",
            "`Shout out to them niggas' freaks that I been cumming on, Get em to the crib, bust em down, now bitch run along`",
            "`Who said I'm a snitch? You just heard a lie from him, Better check the black and white, that paperwork will vouch for him`",
            "`I ain't hear from bitches when I had them blues on, So soon as I'm done fucking, put your shoes on`",
            "`When we left that shootout, you still had bullets in your pistol, I don't fuck with y'all that's official`",
            "`Bitch don't play with me cause you can get it, after I blow you I'm droppin' yo nigga, It be the niggas that ain't got no money, that ain't got no bodies that swear they some killas`",
            "`We see them 40's and we get excited, we see them choppas and we get excited`",
            "`Hoe then took off with my dick I should be taking her to court, If you take me for a hoe I'm a take it to your porch`",
            "`One time for my deuce, one time for my pops, free tweak, rest in peace T, fuck the ops`",
            "`And when I hit the county I was tripping on the rock, They took the TV, I don't care just don't fuck with that clock`",
            "`Used to carry bottles to the store, Thinking to myself like I can't do this shit no more`",
            "`We just wanna get money, they just wanna beef with us, It's guaranteed you gon' die one day but I won't speed it up`",
            "`You can't be blood, I'm not going broke for you 'cause I was sleeping on the floor`",
            "`Jump off the plane with a couple of M's in the bag, If anybody play with me, it's numbers on their head`",
            "`I know some crips, know some treetops, Name good, I ain't never sold no re-rock`",
            "`I've been running red light in my city, I know it's hot, I'd rather take the ticket, niggas want my top`",
            "`I went been feelin' all kites, To puttin' an M on my block`",
            "`Candles all over the mansion, You lil niggas can't shit on my house`",
            "`You try to take up for that nigga's beef, you gon' get dropped in his place`",
            "`I'll put niggas on spirit, When they get hear it, you wick it`",
            "`I leave his whole body bloody, call him Red Man, Hit the club in them Audi trucks and threw bands`",
            "`I signed a deal with 300, now the hate comin' out of you, nigga`",
            "`Throw them handcuffs on me, drag me out my bed, Nigga playing with my paper I'ma give him lead`",
            "`Bust down pour, bust down beer, all of my charms, Patek on my left, AP on my right, all on my arms`",
            "`This big ol' clip in the way of my drip, Diamonds they hard, I busted my lip`",
            "`Four sprites, two pints, I pour eight a piece, Strapped up to the teeth, my enemies prayin' for peace`",
            "`Almost died from pneumonia, had to take my jewels off, We don't argue with these niggas, we just let them tools talk`",
            "`Niggas be killin' to get it We all got millions to get`",
            "`Your roley over average, You know I'm oh for seven`",
            "`Where I'm from it's a whole warzone goin' on, Where you from that's prolly unheard of`",
            "`This time them niggas older, So niggas bustin, fuck it`",
            "`Know I'm move deep, bitch, I'm too street, We not together, my baby, you just cool peeps`",
            "`Feed him somethin', he gon' turn into a leech, that's dead weight, Dirty AR pistol, hold up, dirty SK`",
            "`be stuck in the trenches 'cause I'm on parole, And the only time I can get out is if it's for a show`",
            "`They wonder why my heart is so numb, I saw so much when I was so young`",
            "`I bet that impact crack your face bones, Say young nigga get your cake loan`",
            "`ISIS members on speed dial, Have 'em run up on you with the bomb on 'em`",
            "`So don't be spooked I got this uzi on, In the studio like`",
            "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
            "`Lil Purpp in high demand, yeah, these verses worth a brick, And she know that I got hoes, but she still gon' suck my dick`",
            "`My niggas scammers and robbers, Everything hit like the Dodgers`",
            "`Smoking on cookie, that stank, Lil Purpp got blues in the bank`",
            "`Lil Purpp don't ride in no trucks now, I spent the racks, give no fucks now`",
            "`I flip the bitch like a switch blade, Water on me like it just rained`",
            "`Bitch, I'm a dog, I'm a mad hound, Might as well put me in the dog pound`",
            "`I remember niggas hated on me back when I was broke, Now they lookin' up to me so high they need a telescope`",
            "`Choppa poppin' like a Harlem Shake, Big drum, it's gonna eat a nigga like a double steak`",
            "`Aye, I smoke big dope, Shawty wanna fuck 'cause I got good blow`",
            "`Run up on me, push yo shit back, Lil Purpp the best and that big facts`",
            "`How many bitches I need me about twenty, Sippin' on lean, I don't fuck with the Henny`",
            "`Your bitch tryna find the circumference, And I got hoes in abundance`",
            "`And I be grindin', a young nigga gotta get paid, All of my niggas gonna shoot like a pistol it rang`",
            "`Twenty-five bands on the dental, And it's my car, fuck a rental`",
            "`Play with that bitch like a fiddle, She wanna salt me like brittle`",
            "`She learnin' some shit from that pole, Hey, she suckin' me out of my soul`",
            "`Aye, grab hundreds, spread it like it's mayo`",
            "`Lil' boy keep lookin' at my chain, Tell that thottie give me brain`",
            "`I'm in the coupe, I'm with a bitch, ceiling got stars, Nigga want beef, he could get sparked, like a cigar`",
            "`Feel like I'm Thug, all YSL tell by the smell, 45 pints, all of it Wok, came through the mail`",
            "`Got your bitch on molly, I came with a shotty, And I came alone, but I left with your shawty`",
            "`And I blow bands in the weekend, Drippin' the water, that Depend`",
            "`I don't want friends, I want Audis, Smokin' on boof and it's Maui`",
            "`Look at my cup, it got dope, I bend her over like slope`",
            "`I paid the bands in the west, Then take the bands to the south`",
            "`Krispy Kreme, Yeah bitch I stay clean`",
            "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
            "`Thick bitch on my dick, Lick it like ice cream`",
            "`My car fast, eat all of the gas, My bitch bad, yeah her ass is fat`",
            "`Drop the top, like my car it got no shirt, yeah, Got a chopper I might put em in the dirt, yeah`",
            "`Call my mom I said I'm on them xans again, In the club I'm throwin' hundreds, fuck a ten`",
            "`Yeah made that chopper sing like Beyoncé, I got different color molly yellow Ombré `",
            "`I'm in the mall bitch I ball, Shooters they shoot out the wall`",
            "`Bitch I'm 19 and I'm rich, I might just fuck on your bitch`",
            "`I'm living life like a king, My niggas do the same thing`",
            "`I don't want the pussy baby girl I wanted dome, Today you catch a uber, girl I gotta send you home`",
            "`I got pack off a boat, Chains on my neck make me choke`",
            "`You don't know me, we not bros, We don't even share the same hoes`",
            "`In a Audi, in a Audi wanna truck me, She gon' suck me, she gon' suck me`",
            "`Pardon me, you said that we would never be, But actually, we made it here eventually`",
            "`I gotta flex on 'em, I drop a check on 'em, You ridin' a wave homie, I pull out the K on 'em`",
            "`Whip out a fifty and double it, Bust in her mouth and she lovin' it, Too many hundreds, I'm duckin' the government`",
            "`Pull up, I don't even have no neighbors, I can't keep one bitch, I'm way too player`",
            "`We got the money, it's time to flex, Fuck it, my ice on my neck, Pull up the 'Vette, count up a check`",
            "`My bitch on bad behavior, We got more bread than a baker`",
            "`You ain't in that Maybach, boy you flexing, Dexter he dropped fifty on a necklace`",
            "`Leave you dirty, I whip a birdy, I wake up to money, I count it early, Look at my wrist, a McFlurry`",
            "`You niggas not makin' no noise, I wanted the Rari, no Porsche`",
            "`I'm back on the court, Dexter rich forever, pass him the torch`",
            "`Trappin' mama, I just wanted some Forces, Put some red bottoms on her, she gorgeous`",
            "`Hop in the coupe with like three bitches, Me and young Dexter from rags to riches`",
            "`Gotta thank God for my blessings, Your diamonds ain't real you flexing`",
            "`Broke nigga shut up, They was hating on the come up`",
            "`You can keep her, she a eater, I don't need her, Oh she boring, my bitch foreign, need a visa`",
            "`Read about it, I woke up flexing, I dreamed about it`",
            "`My niggas they legendary, Sip out my cup, it's the muddy scary`",
            "`Ayy, she playin' games like Nintendo, I was trappin' out the bando`",
            "`Too many racks in my jeans, I broke the money machine`",
            "`The money keep liftin' my vans, She want the molly, she tan`",
            "`Throw the bitch out the window, She only want me 'cause my wrist froze`",
            "`Bitch I be ballin' like Mike and them, Way too much Act, get a Sprite for him`",
            "`Fuck up a check, I got plenty, You mad cause your pockets is empty`",
            "`The roof went missing again, Racks on me, walk around with a ten`",
            "`Diamonds on me throw a tantrum, Got the Rari, park the Phantom`",
            "`Born with a hundred, I'm doin' the most, I gotta boast, These rappers is fraud, really they broke`",
            "`New six, broke wrist, I put the racks in the mattress`",
            "`She want a purse, She want a Birkin, Fuck her, she squirting, Countin' racks in the back of suburban`",
            "`Two bitches, got 'em kissing together, Thick bitch, let it drip on the leather`",
            "`I put that bitch on a stretcher, Scraping the bowl for the extras`",
            "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
            "`The coupe is retarded, Louis my carpet`",
            "`Rich nigga drop a baby in a hoe face, Where the hell was you at on the broke days`",
            "`Teach you how to be a boss, top dropped off, Motherfuck the fame, I done came to the vault`",
            "`I'm in the back of that Maybach, Me and your bitch, we go way back`",
            "`AP got her skating, Run to the money, we racing`",
            "`Dug in the pussy and make her feel it, Fuck nigga thought I wouldn't make a milly`",
            "`Rich Forever goin' rich way, They copy the wave, I'm sensei`",
            "`They tryna copy the wave, Too many chains like a slave, Rich Forever getting paid, Money machine might break`",
            "`Broke rappers in they feelings, they hate, Real diamonds on me, biting them straight`",
            "`You cannot hop in my car, Bentley coupe riding with stars`",
            "`Diamonds they wet on my arms, Tats on my neck and my arms`",
            "`In New York I Milly Rock, hide it in my sock, Running from an opp, then I shoot at opp`",
            "`Gimme top top, in my drop top, All these hoes gon' flock flock, when I drop drop`",
            "`All these hoes want cash, all these hoes want bags, Fucking on yo bitch, uh I'm her dad`",
            "`I'm a soldier, damn I thought I told you, Shootin' like a soldier like I'm from Magnolia`",
            "`All of your bitches they loose, all of your bitches they loose, All of my bitches is rich, And they stay rockin' that Rick huh`",
            "`Got a rich clique, she suckin' on the clique, She suckin' on the dick`",
            "`She just wanna top me, Bitch can't stop me`",
            "`Heard he spent a hunnid on a fucking watch piece, That's filthy`",
            "`On my wrist, might just take your bitch, Might just take that wrist, take her on a trip`",
            "`Bitches wanna fuck, hoe come lean on me, oh, Yeah Promethaziene, I can't even see, Niggas envy me, bitch I'm MVP`",
            "`Woke up to niggas talkin' like me, talk, Woke up to niggas soundin' like me, talk`",
            "`Oh, I think they like me, yeah they like me, Diamonds on me ice cream, hoe that's lightly`",
            "`I heard these niggas wanna fight me, Meet me at my next show but you better bring a pipe B`",
            "`She just wanna fuck me for my clout, fuck, Bitch I'm off the lean I crash the Audi, fuck`",
            "`New choppa, new choppa it came with the beam, Actavis pouring up lean`",
            "`Stack up my cash like a hike, take advantage of the Sprite, Take the bando bring the height`",
            "`Look lean counting up, Big guap, Carti up`",
            "`Pull up on your block quick, Quick drill, pop keep a zipper`",
            "`Popping pain killers yeah, yeah, I just poured a 4th inside the lean yeah, yah`",
            "`I'd rather not talk about it just do that shit, Got these bitches saying yeah he do that shit`",
            "`Sucking on my dick, like she new to dick, Blowing through the check yeah we new to this`",
            "`Pull up on your block and we shooting shit, Pull up on your bitch and I'm hitting it`",
            "`I'd rather not talk about it just shoot it up, Lil nigga, middle finger up`",
            "`Ice on my neck and my mama like, 'Boy Where you get all of that cash?'`",
            "`Walk in the bank, I flex on that boy, I flex on that boy with the bag`",
            "`I'm takin' your shit, you college kid, oh, We really be poppin' shit`",
            "`Baby girl, we can do plan A, Baby girl, we can do plan B, oh`",
            "`All of my niggas, they fool, Look at that boy, look at his jewels`",
            "`My outfit just made the front page, Hop off the plane, I run to the stage, yah`",
            "`Hoe stop chilling with' them lame niggas, Kickin' it with' them lame niggas`",
            "`Bitch I'm on the xanny I just lose it, Bitch my pockets stupid thick, pockets thicker than my bitch`",
            "`Woke up with my toolie, what it do?`",
            "`I got red shooters, I got blue, Let that thing down then point at you`",
            "`Why should I keep juggin' all these broke boys?, In the mall buying ice cause he's a broke boy`",
            "`Keep that choppa on me, my grandma watchin' me, Fuck my Jesus piece, I might squeeze the piece`",
            "`Yeah, I'ma go fuck that bitch, I'ma go thrash that bitch`",
            "`Cop the Prada bitch, get one for the zip, Got that Prada bag, got one for my bitch`",
            "`I got that dope, kilo, Yeah, come fuck with the boss`",
            "`That nigga my homie, Count money fuck hoes`",
            "`We laugh we joke, cus all the opps funny, Put that on God man these niggas don't want no smoke!`",
            "`No Smoke No Smoke but we die bout that money, No Smoke No Smoke you niggas don't want it`",
            "`I heard these niggas want smoke, they better pull up with 100, Yea we want all the smoke, I walk around with it on me`",
            "`Nigga stop all that talking you know where I'm at come and pull up on me`",
            "`Try get away and we gone run em down, He get back up Ben knocking him down`",
            "`You know how we living that ain't how you living, If you go to tripping get hit with the glizzy`",
            "`These niggas talk like they with it, When I catch you you gone get it`",
            "`My No. 9 love it when you got it on, Baby you so hot, all these diamonds cool you down`",
            "`Just give me a chance, promise I'ma make you love me, And Me and you together could accomplish more than something`",
            "`Tonight it's Wednesday baby, me and you we goin' out, And don't worry bout a thang we gon' have fun now`",
            "`I remember I wanted for to quit for so many times, But I know this moment'd come, now it's my time`",
            "`I'm goin' in, I'm putting everything on the line`",
            "`Whole lotta nights I went to sleep and I ain't had no food, But now I'm up and I'm just thinking about my next move`",
            "`We here next day, stayed down 'til I came up with my niggas, Right or wrong forever right, you know wassup with me nigga`",
            "`Now that I made it, ain't none the same it all changed, When I'm in public people see me they screaming my name`",
            "`I'm hardbody and I promise I won't fold, Like a pirate I'm just searchin' for some gold`",
            "`Half of ticket in deposits the same day I came home, Yungin' on the block with a pole, tryna get some dough`",
            "`I don't do no drugs when I'm in your city I swear I'm high off the feeling, Book me for a show when I walk in the building you know I turn up to the ceiling`",
            "`Down with that Glock, bitch don't make no sound, Say somethin' and get shot, bitch face down to the ground`",
            "`If you think I fuck with that lil hoe, then you a fool, I ain't got no education, I dropped out of school`",
            "`Too much money on me for to raise my hands and fight, Thunder in my clip, fuck around get hit with light`",
            "`Bitch I'm from the north, you know what up with me, Niggas know it's dump with me`",
            "`Feds in my section, think they tryna catch me bitch, You can do that flexin', get hit with this Wesson bitch`",
            "`My nigga tellin' me to pray to Allah, With some cold blooded killers standin' right in front the yard`",
            "`All red bottoms lookin' like I walked on the scene, Homicide diamonds with the pistol`",
            "`Real Blood with some young niggas 'round me Crippin', With some old heads out of jail leave a nigga missin'`",
            "`On my knees prayin' to God tellin' him I'm goin' home if I don't live up to goin' hard, One night I ain't go home, girl actin' crazy 'cause she mad that I'm livin' like a star`",
            "`Ain't no plug, ain't no socket, I ain't never had a car, And you want them fancy things so you better play your part`",
            "`I miss the Nawf just like my granny, My heart in them trenches, Yo' girl gone cheat on you for nothing`",
            "`This the files of a nigga who ain't neva' bleed, This the story of a child who was in them streets`",
            "`I let some shots off in the air for my niggas dead, Do anything in the world for you, I'm livin' red`",
            "`I ain't give up on my mission, fuck you mean bitch I was steady hustlin', Handin' all you niggas money bitch and I steady strugglin'`",
            "`Crack the seal it's potent, you can smell when it's medical, I doubled the cup to let you know I ain't drinkin' nothin' regular`",
            "`Still move the wheel with my knee while I count up bands, I show love and affection to all my fans`",
            "`I never dap you with the left hand, I draw down with the Glock in the right hand`",
            "`What chu gon' do moms late for rent?, What chu gon' do if that boy try to flex?`",
            "`NBA Gang, what they claiming lil nigga, Tell what the fuck you thinkin' lil nigga`",
            "`Don't let a nigga come straight for your neck, You know that we got it on deck`",
            "`Ain't no, no better, wanted better days, Nicki moved down the street and I had met Lil Dave`",
            "`I sit back and read like Cat in the Hat, 21 Savage, the cat with the MAC`",
            "`Stuart Little, heard these niggas some rats, Pockets full of cheese, bitch I got racks`",
            "`I listen to your raps, thought you was hard, You ain't even street for real`",
            "`And all these niggas play like they tough, 'Til a nigga get killed`",
            "`So much dope that it broke the scale, They say crack kills, nigga my crack sells`",
            "`See Savage he be with them apes, Play with this shit, you get ate`",
            "`You know I keep me a Draco, Rap a nigga like an eggroll, Big bullets leave a big hole, I was raised by the G code`",
            "`Now I'm on Ocean Drive sipping codeine with the top down`",
            "`Rags to riches, nigga came from the bottom, Hood rats, now a nigga fuckin' on models`",
            "`21 Gang, they were right beside me, And they still with me, nigga, I'm on TV`",
            "`Had to sell dope, I couldn't be an athlete`",
            "`I'm a street nigga, yeah I'm famous, I'm a rapper, nigga, and I'm gangbangin'`",
            "`Henny in my system, I'm gone, Speedin' on the E way, all gone`",
            "`I take her shoppin', that's easy, Fuck the summer, I ball all season`",
            "`We just chillin' at the bar and she cheesin', Buy a hundred shots for no reason`",
            "`Grind hard, nigga, grind hard, I done grind hard, Late nights playin' b-ball with a decoy`",
            "`Got in so much trouble, thought the teachers had beef with you`",
            "`It's a bag on his head, I'ma pick it up, It was money in the house, I used to stick it up`",
            "`Yeah, Kim Jong, yeah big bombs (21),  Wonder Bread man, make your bitch lick crumbs`",
            "`Bitch boy I'm a mobster, shrimp in my pasta, Jamaican Don Dada, hang 'round the shottas`",
            "`ost two-eighty, uh-huh, bitch I paid it, uh-huh, Rover SVR and I got the seats blazin`",
            "`Went against the gang and he got his cheese grated`",
            "`I can show you how to fit a M in a duffel, Show you how to fit a hunnid bags in a duffel`",
            "`Hang around a lot of gang bangin' ass niggas, Crip, Blood, blue or red, what you bang nigga?`",
            "`You do a lot of talkin' nigga, not me, Do a lot of walkin' nigga, that's me`",
            "`Max out, Tee Tay down the road, finna max out, Late night, pullin' in the 'partments, all the scraps out`",
            "`I'll probably leave you before I leave the lean, Lil' bitch, don't play with my sip`",
            "`Rims staggered, bad bitch I'ma bag her, On my face, issa dagger`",
            "`Don't be calling me a brother, you a hater, Got new stones on my neck, nigga, flooded out`",
            "`Hurricane Irma on my neck, nigga, flooded out, Hurricane Harvey on my wrist, shit, flooded out, Nigga flooded out, VVS' flooded out`",
            "`Ice on a nigga nice, lights out, Nigga bad, back on, finna put a pipe out`",
            "`Gucci on my pickle, nut right on her nipple, Young nigga with them M's, I get disrespectful`",
            "`AK with the scope, nigga and it's real dirty`",
            "`Go against the gang and it cost him (cost him), Made a diss song and I offed him (I offed him)`",
            "`I serve raw clean, I drink raw lean`",
            "`Issa knife, dawg, I got stripes, dawg, What's in that Wraith, Savage? It's some white, dawg`",
            "`Nigga don't argue, Nigga you pardoned`",
            "`I just bought a pistol it got 30 rounds in it, Pull up at yo momma house and put some rounds in it`",
            "`Nigga yous a bitch cuz I ran off with ya shit`",
            "`I'm a real right blood and these niggas counterfeit`",
            "`Young Savage real street nigga ya'll ain't on no block, Bitch keep your legs closed cuz all I want is top`",
            "`I'm a big dog lil' nigga you a pup, Pull up on ya spot walk up on it shoot it up`",
            "`Baking soda cold water cut the stove on scrape the side, You can keep the skinny bitch cuz I like a fat ass and thighs`",
            "`I got so many M's in my bank account, I can't even count 'em`",
            "`I already back for seconds, I ain't even clean my plate up`",
            "`All my diamonds carrots, dem lil' pointers be two lil', Glaziers in my ear, I need a cup, they 'bout to spill`",
            "`oung nigga havin' fame 'round town, Then we got rich off of verbs and nouns`",
            "`Cash out a four four check, then watch it bounce, Trap out the bando, trap out the ounce`",
            "`I keep a Glock in my pocket nigga, 21 I keep a Glock in my pocket nigga`",
            "`Yeah I'm in the kitchen nigga scrapin' bowls, savage, I'm in the hotel fuckin' hoes, savage`",
            "`These bitches love Sosa, O End or no end`",
            "`These bitches love Sosa, And they love them Glo' Boys`",
            "`We GBE dope boys, We got lots of dough boy`",
            "`Riding with 3hunna, With 300 foreigns, These bitches see Chief Sosa, I swear to god they honored`",
            "`Damn I hate being sober, I'm a smoker, Fredo was drinking, ain't said I want molly water`",
            "`All the hoes they love smoking, and love drinking, Anti-sober, for no reason`",
            "`On my tour bus we get dumb high you's a floor, boy, Fredo got a hangover he toting a Cobra`",
            "`Chief Sosa, Ballout, we high riding 'Raris, My bitches love drinking, some love smoking`",
            "`I'm a gorilla in a fuckin' coupe, finna pull up to the zoo, nigga, Told you, nigga, who the fuck is you? I don't know, nigga`",
            "`Talkin' out his neck, pistol to his throat, Blow this motherfucker, he gone choke`",
            "`I just got 20 for a fuckin' 4, I spent that shit on a fuckin' coat`",
            "`Woke up, brush my teeth, Thank the lord that I'm here today`",
            "`With a bitch named Marissa, Going faster than a missile`",
            "`What's on my feet? They Balenciagas, I got a dirty mouth need a rinsin`",
            "`You ain't smokin' by the ounce, you can bounce, I don't smoke no mid, I smoke super loud`",
            "`No I can't come down, bitch I'm too turnt up, Judge gon give me life, Foreign door Murders`",
            "`Got spikes like red hot, need to keep ya tail tucked, Have folks nem deliver this to you, put it in ya mailbox`",
            "`Bout to go get some more chains, Like I ain't got enough jewelry on`",
            "`someone hand me a ashtray, That's my boys who passed away, keep my mouth laminated, Till the day I'm eliminated`",
            "`What's yo address nigga? Where you live at nigga?, We ain't tryna hear that nigga, you know I'm a real ass nigga`",
            "`Drip more purple than a laker, yeah, Eyes more red than a laser, yeah`",
            "`You can get her back, I'm not a saviour, yeah, Rolling on your ex, Charles Xavier, yeah`",
            "`Spent a real big sack and it's still on the receipt in the register, I just stepped out Balenciagas eleven duh`",
            "`Just found out your hiding spot, I got them staking out, Slide down, we ain't dining in, we got to take them out`",
            "`You ain't Glory Boy you ain't Savage Squad, You know you can't be out after dark`",
            "`It's payday everyday, You ain't tryna fuck, bitch, skate`",
            "`All hundreds on me, but I'm on a rampage, My ice kicking ass, no MMA`",
            "`Told the bitch put on a seatbelt, She steady asking how to lift the seat up`",
            "`I'm up in Houston where this shit came from, Didn't know about bank accounts, I went and made one`",
            "`Look how my ice hitting off of my wife beater, Hop out on you stunting in a white creature`",
            "`I love running through the bands, You ain't Glo then we giving niggas tans`",
            "`Big choppa on me because I got big hands, Big racks on me like I'm wearing big pants`",
            "`Throwing money from the top, it's falling on the floor, I'm gone send some shots, that's all a nigga know`",
            "`You can have a .30 on you we taking niggas guns, When I was up in school I was taking niggas lunch`",
            "`When I look in the mirror, sometimes I see a demon, I'm gettin' money these niggas don't know the meanin'`",
            "`When I was 16 I was on the phone with' a nina, Up in the field while you was up in the bleachers`",
            "`Fresh ass nigga I be flexing on 'em macho, K let off and it's sounding like a congo`",
            "`A popped bitch, that's that shit I don't like, I got a bad bitch, yeah, that bitch right`",
            "`We smoke dope all day, all night, You smoke Reggie, that's that shit I don't like`",
            "`Pistol totin' and I'm shootin' on sight, A snitch nigga, that's that shit I don't like`",
      ];
        msg.edit(messageList[Math.floor(Math.random() * messageList.length)]);
    }



    //LYRICSPAM


    if (command === "lyricspam"){
        msg.delete();
        let messageList = [
            "`Ah-pardon me, I get the money like lottery don't bother me, she suck me so good, no slobbery`",
            "`AK with the scope, nigga and it's real dirty (21)`",
            "`Wait a minute, I been sippin’ Henny like it’s Minute Maid, Let ‘em hate, I been gettin’ to it, gettin’ hella paid`",
            "`She said, Do you love me? I tell her, Only partly, I only love my bed and my mama, I'm sorry`",
            "`Xans, Perky, check (yeah), Bill Belichick, Take the air out the ball (yeah), just so I can flex`",
            "`Yeah, and send shots off at your dome Pussy boy, we'll pull up at your home`",
            "`I fucked your thot, she gave me top, I guess that's my confession`",
            "`Draw down with that Glock, bitch don't make no sound Say somethin', might get shot bitch, face down to the ground`",
            "`I'm sippin' on juice, smokin' that pack, yeah, Hop out a coupe, step in the Loubs, check out my fashion`",
            "`Cops try to search us, hoes tryna twerk us Walk in with all this ice, Did it on purpose`",
            "`I got a chopstick, a FN, and the Draco hold a 100, Got a shooter in a booth with me like he goin' huntin'`",
            "`Smoke a pussy nigga like a Newport`",
            "`Rocket got a 'Rari, that's a new horse`",
            "`Diamonds 'round my neck like what my neck worth`",
            "`I like selling mid because I smoke the boof, I be countin' hunnids 'til my fingers blue`",
            "`Hop out the whip, I'm in the kitchen, I whip, Chopper on me, shots to the head make him sick`",
            "`I don't want friends, I want Audis , Smokin' on boof and it's Maui (ayy)`",
            "`Like, flex on you haters, huh, hi haters, This is my world so it's all in my favor`",
            "`Turned to a savage, pocket got fatter, she call me daddy, Smokin' that gas, gone off that Xanny, she on the powder`",
            "`Ice on my grill, it's a new smile, She wanna fuck on your boo, wow`",
            "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
            "`Ayy, fucked a girl, she a fan, She let me hit it on video, My circle small like a cheerio`",
            "`I'ma paint, on her face like I'm DoodleBob, Jump in, that pussy like I scuba dive`",
            "`If I see you, I'ma wet you, hit you and your nephew, Came in with a big drum, wet you like a stencil`",
            "`I'm 1400 with the screw up kids, don't screw up kid, Or that choppa wet your crew up kid, I'm two up kid, We animals, better zoo up kid`",
            "`I just pulled up in a Lamb, cuzzo pulled up in a Range, And we reloadin' them sticks lil' nigga, we release them things, ayy`",
            "`Bitch I'm a P (what), bitch I'm a G (huh), Took that lil bitch now that bitch off the leash (ayy, ayy, ayy, gang)`",
            "`GLE, 'cause that Lambo movin' fast (skrr), S Class, G Class, lotta class (sss, sss)`",
            "`You was hatin’ but you switched up cause I’m next up, I got lean and some forty in my red cup`",
            "`In my own crib when they ask me where the stu at (In the crib, ay)`",
            "`This a Rollie, not a stopwatch, shit don't ever stop, This the flow that got the block hot, shit got super hot, ayy`",
            "`I pulled up in a drop top, she drop dead, My diamonds dancing hopscotch, they holding hands`", 
            "`I don't know what planet I'm on, I'm a king, lil bitch watch the throne`",
            "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
            "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
            "`Baby girl I know you hit my phone for a reason, If you don't get loose or start freaking then I'm leaving`",
            "`The dash, it's digi', the schedule busy, My head in a hoodie, my shorty a goodie, My cousins are crazy, my cousins like Boogie`",
            "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
            "`I put my bitch in Celine (my bitch in Celine), Gucci right down in my other bitch`",
            "`I like to roll off the bean, Ride with me, know I ain't havin' it`",
            "`Might run to the money, I'm married, Diamond, my wrist, you think I'm so scary`",
            "`Baby girl, what you doing, where your man? (where your), I just popped a xan, fifty thousand in Japan (fifty thousand in Japan)`",
            "`Baby girl, what you doing, what's your name? (baby girl, what), I ain't playin' no games, see these diamonds in my chain?`",
            "`No this not a date, this a cruise, but don't debate, wait (baby), It's gettin' late (huh), think it's past eight (what), Took her to my place, baby ate me like some cake, wait (huh)`",
            "`Ayy, so much green on my street like it's Grove (whoa), Ayy, made a lot of money on the road (yuh)`",
            "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
            "`The coupe is retarded (skrrt), Louis my carpet (carpet)`",
            "`They going out bad, the sad way (huh), I put the cash on three way (racks), Rich nigga drop a baby in a hoe face (hoe face), Where the hell was you at on the broke days? (Whoa)`",
            "`I ran them streets with no cleats (hey), 44 millimeter iced out Philippe (ice)`",
            "`I was made for this shit, rookie of the year, I wouldn’t show up for the freshman list`",
            "`Trade my Honda to a Bentley, Now these fuckboys wanna end me`",
            "`Teach you how to be a boss (boss), top dropped off (skrrt), Motherfuck the fame, I done came to the vault (for what)`",
            "`Put my pride to the side (side), I could never lie, I don't care if you cry, let them pussy niggas die`",
            "`New designer shit, Diamonds on me might blind a bitch`",
            "`I be booted to the morning, PM to the morning, My lil' woadie wanna bag him, he just want a Rollie`",
            "`Take a moment, count my guap, count my guap, All these racks bombin' in, they bombin' in (hold up)`",
            "`First things first: rest in peace Uncle Phil, For real, you the only father that I ever knew, I get my bitch pregnant, I'ma be a better you`",
            "`No role models and I'm here right now, No role models to speak of, Searchin' through my memory, my memory, I couldn't find one`",
            "`Krispy Kreme, Yeah bitch I stay clean`",
            "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
            "`Take my shoes and walk a mile, somethin' that you can't do`",
            "`It's the niggas that copy the wave, Then it's the niggas that started it`",
            "`Killing pain with the pain killers, I make it rain with the gang members`",
            "`I get the drip from my walk, my baby she come from up north, My money, it come from the vault`",
            "`I hop in that bitch and get lost, My money is starting to get tall, I walk in the mall buy it all`",
            "`Pop these niggas like a wheelie nigga, you a silly nigga, In the hood with them Billy niggas, and them Hoover niggas`",
            "`You just wanna fuck me for the fame, Wanna fuck me cause them diamonds on my chain`",
            "`Big body, she gon' swerve it, now we went by the surface, Shorty lookin' picture perfect, say she ready, never nervous`",
            "`I'm in a spaceship, get ready for takeoff, Can't fuck with lil' shorty, I know that she basic, She makin' my dick soft`",
            "`They tell me I'ma be a legend, I don't want that title now, 'Cause all the legends seem to die out, What the fuck is this 'bout?`",
            "`Tell lil' baby she can love me or she hate me, In the brand new McLaren, and I'm racing`",
            "`Tryna hide from the camera, I ain't going outside today, Couldn't find Hi-Tec, so I'm drinking on Act' today`",
            "`Gotta TEC and a chopper, with a hundred thousand dollars up in the Wraith`",
            "`I ain't foldin' under pressure, I ain't switchin' for no ho, I ain't talkin' to no cop and I ain't tellin' on my bros`",
            "`Big dope inside this Backwood case this nigga want smoke`",
            "`Call my brother on the phone, he said broski you a star, I said brother hold it down soon we'll all be livin' large`",
            "`I got tattoos on my face, I use that shit as motivation, I could never get a job, so for my dream, I'm dedicated`",
            "`Fifty-five hunnit for a new pair of titties, I'll buy 'em like Jordans`",
            "`Everybody rock with me because I'm up now, Took your girl and I'ma score, like I made the touch-down`",
            "`Used to want a G-Shock, now I'm walking with a bust down`",
            "`I got red shooters, I got blue, Let that thing down then point at you`",
            "`I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
            "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
            "`Flexin' for these bands, finna pop out, ayy, Boolin' on the block I got my Glock out, ayy`",
            "`I'ma keep rocking these chains while they keep callin' me 'coon'`",
            "`Ayy, when my brother get out, told him ain't no block now, Same bitches curbin' all up on my cock now`",
            "`I just bought me a new Glock, wet a nigga like a mop, My shooters pull up at your block, Kick right in your door, I'm talking your spot`",
            "`I bought a new Glock and the 30 round drum, You open your mouth and you done bitch`",
            "`Let me know if you want it, jump out get it, gang, 2 pistols one Tay-K call me Tay-K Max Payne`",
            "`If you not talkin' 'bout smoke you could go dat way`",
            "`2k my sweatsuit, I walk with demeanor, Sippin' on lean, can you tell me who leaner`",
            "`I just spent a cool half a ticket on my jewelry, Clear white diamonds make your eyesight blurry`",
            "`I just cashed out on my neck, that's a house, Head out, fuck a spouse, we pop off, we ain't hearin' it`",
            "`Nigga smilin' in your face, really want you in a ditch, Half a ticket on my neck, quarter ticket on my wrist`",
            "`I get pussy in a pair of off-whites, Know I want, you can see it my eyes, surprise`",
            "`Smoke got my eyes lookin' Korean, Every time that I fly, VIP'n`",
            "`Fuck signs, my niggas gettin' high, Party of flies, Taylor gang or resign`",
            "`Why you even come back to crib if you ain't stayin'?, Ridin' with some real niggas, know that we ain't playin'`",
            "`Homie, I'm a boss baby, I don't need no favors, Got so many cars, I don't got room for my neighbors`",
            "`Suckin' on me good, treat me like a Now and Later, Breakfast in the morn', we can get our dinner catered`",
            "`Anything I want, I pull up and stunt, Parking in the back, we can't do the front`",
            "`Take them bitches phones, ain't nothing, we don't trust 'em, Send 'em for the gangs, why they came, we don't love 'em`",
            "`Dread-head, weed head, No sleep, don't need a bed`",
            "`I don't know what the ending is, Chrome all where the engine is`",
            "`Baby I'm a rich ass nigga never said it's gon easy to deal with it`",
            "`Roll with the paper, see them lames later, Can't save her, her nigga stepped out, now she sayin' what she really think, Rollin' up pounds of dank`",
            "`I feel you when you walk in, Conversation, I'ma spark it`",
            "`I got just what you need, We gon drink and roll the weed`",
            "`Now you up in my room, doin' what grown people do, You want me, me on you, hit me when we're through`",
            "`Only on Gin and them drugs, I walked in, in the club, About three of them, dawg I'm not kiddin'`",
            "`Bitch bad, her ass fat, I'll probably let her in, Ball so fuckin' hard I need a letterman`",
            "`Cookies and OG, Come to my crib, we blow by the Os`",
            "`Say they got the good but what the pack smell like?, Feel like it's a dream but now we back to real life`",
            "`Let's turn on the stove and call up some hoes, Let's roll up and do this shit`",
            "`I just rolled a pound at my bake sale, Bitches goin' down at my bake sale`",
            "`Naked bitches in the kitchen, shake 'n' bake, What you think? I'm on this dank, I'm off that drank`",
            "`Black stripe, yellow paint, them niggas scared of it but them hoes ain't, Soon as I hit the club look at them hoes face`",
            "`It's the big boy you know what I payed for it, And I got the petal to the metal`",
            "`Hear them haters talk but there's nothing you can tell em, Just made a million got another million on my schedule`",
            "`Yeah, uh huh, you know what it is, Everything I do, I do it big`",
            "`Then it's to my car, puff a pound of dank, Now we in the stars, and I'ma make it rain, Drown the sink,`",
            "`So what I keep ‘em rolled up?, Saggin’ my pants, not caring what I show`",
            "`Roll joints bigger than King Kong’s fingers, And smoke them hoes down ’til they stingers`",
            "`I got a serious question, Do you like sex? If you thinkin' yes, then I'm tryna test you`",
            "`My path, been clear, The bottom, been near`",
            "`I've passed, my peers, I've switched, them gears, They in, the rear`",
            "`God damn, you know who I am, Try to be on the low, but you ain't slow`",
            "`You like real facts, Like, if you show love, you gon' get it back`",
            "`We can go and get a private room, We could fuck for one night, ain't gotta jump the broom`",
            "`Grabbin' you close and pullin' you nearer, Lookin' at both of us in the mirror`",
            "`She swallow a nigga cause my dollars is bigger, And you know Party my nigga`",
            "`Let me get into it, let you smoke a little bit, Now fuck you better than the nigga you with`",
            "`Fuckin' with me got me goin' way up, Slammin' in that pussy, never lay up`",
            "`Run around the world, I don't run games, Run into your bitch, I'ma find out her name`",
            "`I spent that check on my neck, I got yo' bitch drippin', she wet`",
            "`I go to yo' crib, put my dick in yo' sister, Yo' bitch on my line, I pull up and I drill her`",
            "`When I touch a milli, I'll cop me a Bentley, So let me stack up 'cause my pockets look empty`",
            "`I need me that check, I pay hella rent, My pockets thicker than a elephant`",
            "`2016, bitch I coulda been President, Bitch I'm the shit, I came up and it's evident`",
            "`You niggas are snakes, yuh, These bitches is fake, yuh, I see that you hate, yuh`",
            "`Stop smoking Black & Milds bitch you nasty, How you smoking Blacks but actin' like you classy?`",
            "`Stop smoking Black & Milds, with your country ass, You got shit around your mouth, with your crusty ass`",
            "`Last time we spoke, I smelled your breath, it made me faint, Bitch I hopped up in your Honda Civic, all I smelled was paint`",
            "`Heard the whole hood hit you from the back, I heard the hood ran a train on your track`",
            "`Take advantage of me bitch I wanna be yo slut, Face, Titties, Booty, and Toes, What I'm eating for lunch`",
            "`Ugly God A.K.A. Nigga Too Nasty, Come here baby put your phone number in my gadget`",
            "`My hair on point but my clothes stay ratchet, Young Ugly God, bitch my dick game disastrous`",
            "`Aye, 3 A.M. bitch I'm motherfucking tired, If we on the same page, I might motherfucking slide`",
            "`I don't mean to burst your bubble bitch but yes I'm tryna fuck, Baby girl I'm tryna fuck`",
            "`Baby girl I know you hit my phone for a reason`",
            "`Girl you know I'm fiending, eat this meat you ain't no vegan`",
            "`I'm trying to tap that ass and bust a nut, Don't give me the wrong message girl, I'm trying to see what's up`",
            "`Fuck Ugly God, Ugly God a hoe, Flexing like you got it, bitch, I know your ass is broke`",
            "`Back in 10th grade, your coach kicked you off the team, Every single day, you wear them same pair of jeans`",
            "`Water this, water that, you finna get exposed, Back in eighth grade, you use to borrow niggas' clothes`",
            "`When I catch you slipping, I'm gon' punch you in your teeth, Ugly God a bitch, pussy boy don't want no beef`",
            "`Aye, I make music from my basement, I done came up and got famous, I'm the G.O.A.T. ain't no replacement`",
            "`I pipe your bitch with this ice on my wrist cause she see my dick hard like the pavement, I got that guap now these bitches gon' flock B, I got your main bitch in amazement`",
            "`Just like a maverick, Watch me ball out like a maverick`",
            "`I spent that check on my wrist and my neck, Ugly God got the sauce you can't handle it, Made half a mil' by myself with no deal, now they mad cause I'm cocky and arrogant`",
            "`My new bitch thick like a steak, I sit back and thumb through this cake`",
            "`Now I'm on top the ladder bitch, look at my swagger, I'm sharp like a dagger, Nigga want beats, serve em up like a platter, She hit my phone, I put meat in her bladder`",
            "`I drip on your bitch like water, I splash on your bitch with the water, I feel like I'm 21 Savage, I pull up and fuck on your daughter`",
            "`Water on my bitch I keep her wet like my cellphone, Bitches on me dark skins and the redbones`",
            "`I ain't got time for no wife, yeah, Lmfao you kiss bitches I pipe, yeah`",
            "`I just bought me a new Glock, Nigga talked down then get popped`",
            "`Got a long clip on my gun, I bought a new Glock and the 30 round drum`",
            "`Now these bitches wanna flock, I came up off of water now I'm posted at the dock`",
            "`Bitch I beat my meat, Give a fuck 'bout what you think, I nut all up in my sheets`",
            "`I go ham, I eat ass, I'm never starving, God damn`",
            "`Bitch I beat my meat I take my dick out on a date, I nut all up in my face, tryna' save the human race`",
            "`I got your girl dripping out her panties like Fiji, Lotion in my hands, so my palms a little greasy`",
            "`Bitch I got that bitch, but her boyfriend don't believe me, Until I power up on that booty like Luigi`",
            "`Ugly God bitch, booty thicker than the bible, Lotion in my pocket, but that's only for survival`",
            "`You used to say you in love, I used to say that shit back`",
            "`Shawty, I just want your love for a minute, I be captain baby, you can be lieutenant`",
            "`Playin games with me shawty, This is not no scrimmage, scrimmage`",
            "`I gotta get my fresh paper boy, Optimistic, inflicted the premonition`",
            "`Ballin' like Stephen Curry, Gold fangs in my mouth so purty`",
            "`It's all I want, got a nigga faded, Shawty on fire, and she really blazin'`",
            "`All year gone and on your own for stunting, Say you ain't been worried, bitch you fronting`",
            "`Got a knife on my finger, I was stabbed in the back`",
            "`Hanging with them Bs, and you know we yellin' slatt, Few niggas talk down, don't want to know the aftermath`",
            "`1400, bitch, you know I tote a pole, With 6ix9ine, bitch, you know we tote them poles`",
            "`Yeah, and send shots off at your dome, Pussy boy, we'll pull up at your home`",
            "`They don't want no smoke, on the block with my goons, I hit a nigga up, I don't like to pick and choose`",
            "`Smoke a pussy nigga like a Newport`",
            "`In too deep like a bottomless hole, Change my number just like summer clothes`",
            "`I've been shining in my chain, I do not fuck with no lames`",
            "`Ooh, so they think I wanna die, yeah, 'Cause my doors are suicide, yeah`",
            "`Bet my coffin would be nice, yeah, Stud that bitch up with some ice, yeah`",
            "`Ayy, fuck your bitch and hit my fucking dab, Ayy, choppers by my side, you know it clap`",
            "`Big racks on my body, baby got this cash, Pray these goofy niggas really goin' out sad`",
            "`I can't do this anymore, yeah, When it rains it really pours, yeah`",
            "`New Chanel walkers, when I walked up in the room, Maison Margiela, when I walked up in the room`",
            "`Take a moment, count my guap, count my guap, All these racks bomin' in, they bomin' in`",
            "`I pulled up in a drop top, she drop dead, My diamonds dancing, hopscotch, they holding hands`",
            "`Everyday I keep it real and get that bag, hoe, 'Cause that shit up for grabs hoe, put that on my tab hoe`",
            "`Forever tryna fight all these demons in my head, Together we can fight all these demons in my head`",
            "`I let the money dance, the diamonds bling's all by itself, Without any help, so that means it shine on it's own`",
            "`Who knew us kid, I think I came from under a rock, Was out on the block, my cousin had that shit in his sock`",
            "`I just pulled up in a lamb, cuzzo pulled up in a range, And we reloadin' them sticks lil' nigga, we release them things`",
            "`I don't know you I just got into your shit today, Lookin like a million dollar lick today`",
            "`Implement that shit into your mind, just so you know though, Sucka free living, I'ma say that that's the motto`",
            "`Meanwhile I'm in New York fucking up SoHo, Just bagged a new chick, Caroline, nickname Coco`",
            "`I just sit back and listen to old Wayne songs, And get dome from a bitch while I brainstorm, And spit flames while also making it rain storm`",
            "`Nowadays I really miss my fucking idols, so that's the title, I grab a bible, pray for my rivals`",
            "`Baby what you wishin' for?, Maybe you should wish it more?`",
            "`Wish you'd get out my face, might go MIA, Might just blow my brain, R.I.P Kurt Cobain`",
            "`I wish you will find your chill, 'Cause Lord knows this shit get real`",
            "`Shawty know I kill people, real people, From the trenches where it's real lethal, tote real regals`",
            "`So much green on my street like it's Grove, Made a lot of money on the road`",
            "`I'ma beat her box, beatin' off her fuckin' socks, 30 got a mop, shoot you, look like chicken pox`",
            "`Yeah, I turn you ass to clip-art, Boy, you is a retard, on the go just like a go-kart`",
            "`Go get a thermometer for the pot, I need this shit cooked right, Let's keep this water 400 degrees Fahrenheit`",
            "`Aye JR nigga, ain't it a blessing?, We made it out of Lansing after all that happened?`",
            "`I wish I would pay attention to these homeless niggas, Don't call my phone, I don't want to do no song with niggas`",
            "`Shout out to them niggas' freaks that I been cumming on, Get em to the crib, bust em down, now bitch run along`",
            "`Who said I'm a snitch? You just heard a lie from him, Better check the black and white, that paperwork will vouch for him`",
            "`I ain't hear from bitches when I had them blues on, So soon as I'm done fucking, put your shoes on`",
            "`When we left that shootout, you still had bullets in your pistol, I don't fuck with y'all that's official`",
            "`Bitch don't play with me cause you can get it, after I blow you I'm droppin' yo nigga, It be the niggas that ain't got no money, that ain't got no bodies that swear they some killas`",
            "`We see them 40's and we get excited, we see them choppas and we get excited`",
            "`Hoe then took off with my dick I should be taking her to court, If you take me for a hoe I'm a take it to your porch`",
            "`One time for my deuce, one time for my pops, free tweak, rest in peace T, fuck the ops`",
            "`And when I hit the county I was tripping on the rock, They took the TV, I don't care just don't fuck with that clock`",
            "`Used to carry bottles to the store, Thinking to myself like I can't do this shit no more`",
            "`We just wanna get money, they just wanna beef with us, It's guaranteed you gon' die one day but I won't speed it up`",
            "`You can't be blood, I'm not going broke for you 'cause I was sleeping on the floor`",
            "`Jump off the plane with a couple of M's in the bag, If anybody play with me, it's numbers on their head`",
            "`I know some crips, know some treetops, Name good, I ain't never sold no re-rock`",
            "`I've been running red light in my city, I know it's hot, I'd rather take the ticket, niggas want my top`",
            "`I went been feelin' all kites, To puttin' an M on my block`",
            "`Candles all over the mansion, You lil niggas can't shit on my house`",
            "`You try to take up for that nigga's beef, you gon' get dropped in his place`",
            "`I'll put niggas on spirit, When they get hear it, you wick it`",
            "`I leave his whole body bloody, call him Red Man, Hit the club in them Audi trucks and threw bands`",
            "`I signed a deal with 300, now the hate comin' out of you, nigga`",
            "`Throw them handcuffs on me, drag me out my bed, Nigga playing with my paper I'ma give him lead`",
            "`Bust down pour, bust down beer, all of my charms, Patek on my left, AP on my right, all on my arms`",
            "`This big ol' clip in the way of my drip, Diamonds they hard, I busted my lip`",
            "`Four sprites, two pints, I pour eight a piece, Strapped up to the teeth, my enemies prayin' for peace`",
            "`Almost died from pneumonia, had to take my jewels off, We don't argue with these niggas, we just let them tools talk`",
            "`Niggas be killin' to get it We all got millions to get`",
            "`Your roley over average, You know I'm oh for seven`",
            "`Where I'm from it's a whole warzone goin' on, Where you from that's prolly unheard of`",
            "`This time them niggas older, So niggas bustin, fuck it`",
            "`Know I'm move deep, bitch, I'm too street, We not together, my baby, you just cool peeps`",
            "`Feed him somethin', he gon' turn into a leech, that's dead weight, Dirty AR pistol, hold up, dirty SK`",
            "`be stuck in the trenches 'cause I'm on parole, And the only time I can get out is if it's for a show`",
            "`They wonder why my heart is so numb, I saw so much when I was so young`",
            "`I bet that impact crack your face bones, Say young nigga get your cake loan`",
            "`ISIS members on speed dial, Have 'em run up on you with the bomb on 'em`",
            "`So don't be spooked I got this uzi on, In the studio like`",
            "`Okay, 1-2-3, yeah, I just popped a bean, Okay, 4-5-6, yeah, eight hoes on my dick`",
            "`Lil Purpp in high demand, yeah, these verses worth a brick, And she know that I got hoes, but she still gon' suck my dick`",
            "`My niggas scammers and robbers, Everything hit like the Dodgers`",
            "`Smoking on cookie, that stank, Lil Purpp got blues in the bank`",
            "`Lil Purpp don't ride in no trucks now, I spent the racks, give no fucks now`",
            "`I flip the bitch like a switch blade, Water on me like it just rained`",
            "`Bitch, I'm a dog, I'm a mad hound, Might as well put me in the dog pound`",
            "`I remember niggas hated on me back when I was broke, Now they lookin' up to me so high they need a telescope`",
            "`Choppa poppin' like a Harlem Shake, Big drum, it's gonna eat a nigga like a double steak`",
            "`Aye, I smoke big dope, Shawty wanna fuck 'cause I got good blow`",
            "`Run up on me, push yo shit back, Lil Purpp the best and that big facts`",
            "`How many bitches I need me about twenty, Sippin' on lean, I don't fuck with the Henny`",
            "`Your bitch tryna find the circumference, And I got hoes in abundance`",
            "`And I be grindin', a young nigga gotta get paid, All of my niggas gonna shoot like a pistol it rang`",
            "`Twenty-five bands on the dental, And it's my car, fuck a rental`",
            "`Play with that bitch like a fiddle, She wanna salt me like brittle`",
            "`She learnin' some shit from that pole, Hey, she suckin' me out of my soul`",
            "`Aye, grab hundreds, spread it like it's mayo`",
            "`Lil' boy keep lookin' at my chain, Tell that thottie give me brain`",
            "`I'm in the coupe, I'm with a bitch, ceiling got stars, Nigga want beef, he could get sparked, like a cigar`",
            "`Feel like I'm Thug, all YSL tell by the smell, 45 pints, all of it Wok, came through the mail`",
            "`Got your bitch on molly, I came with a shotty, And I came alone, but I left with your shawty`",
            "`And I blow bands in the weekend, Drippin' the water, that Depend`",
            "`I don't want friends, I want Audis, Smokin' on boof and it's Maui`",
            "`Look at my cup, it got dope, I bend her over like slope`",
            "`I paid the bands in the west, Then take the bands to the south`",
            "`Krispy Kreme, Yeah bitch I stay clean`",
            "`Bitch I'm sippin' lean I'm poppin' pills I pop a lot`",
            "`Thick bitch on my dick, Lick it like ice cream`",
            "`My car fast, eat all of the gas, My bitch bad, yeah her ass is fat`",
            "`Drop the top, like my car it got no shirt, yeah, Got a chopper I might put em in the dirt, yeah`",
            "`Call my mom I said I'm on them xans again, In the club I'm throwin' hundreds, fuck a ten`",
            "`Yeah made that chopper sing like Beyoncé, I got different color molly yellow Ombré `",
            "`I'm in the mall bitch I ball, Shooters they shoot out the wall`",
            "`Bitch I'm 19 and I'm rich, I might just fuck on your bitch`",
            "`I'm living life like a king, My niggas do the same thing`",
            "`I don't want the pussy baby girl I wanted dome, Today you catch a uber, girl I gotta send you home`",
            "`I got pack off a boat, Chains on my neck make me choke`",
            "`You don't know me, we not bros, We don't even share the same hoes`",
            "`In a Audi, in a Audi wanna truck me, She gon' suck me, she gon' suck me`",
            "`Pardon me, you said that we would never be, But actually, we made it here eventually`",
            "`I gotta flex on 'em, I drop a check on 'em, You ridin' a wave homie, I pull out the K on 'em`",
            "`Whip out a fifty and double it, Bust in her mouth and she lovin' it, Too many hundreds, I'm duckin' the government`",
            "`Pull up, I don't even have no neighbors, I can't keep one bitch, I'm way too player`",
            "`We got the money, it's time to flex, Fuck it, my ice on my neck, Pull up the 'Vette, count up a check`",
            "`My bitch on bad behavior, We got more bread than a baker`",
            "`You ain't in that Maybach, boy you flexing, Dexter he dropped fifty on a necklace`",
            "`Leave you dirty, I whip a birdy, I wake up to money, I count it early, Look at my wrist, a McFlurry`",
            "`You niggas not makin' no noise, I wanted the Rari, no Porsche`",
            "`I'm back on the court, Dexter rich forever, pass him the torch`",
            "`Trappin' mama, I just wanted some Forces, Put some red bottoms on her, she gorgeous`",
            "`Hop in the coupe with like three bitches, Me and young Dexter from rags to riches`",
            "`Gotta thank God for my blessings, Your diamonds ain't real you flexing`",
            "`Broke nigga shut up, They was hating on the come up`",
            "`You can keep her, she a eater, I don't need her, Oh she boring, my bitch foreign, need a visa`",
            "`Read about it, I woke up flexing, I dreamed about it`",
            "`My niggas they legendary, Sip out my cup, it's the muddy scary`",
            "`Ayy, she playin' games like Nintendo, I was trappin' out the bando`",
            "`Too many racks in my jeans, I broke the money machine`",
            "`The money keep liftin' my vans, She want the molly, she tan`",
            "`Throw the bitch out the window, She only want me 'cause my wrist froze`",
            "`Bitch I be ballin' like Mike and them, Way too much Act, get a Sprite for him`",
            "`Fuck up a check, I got plenty, You mad cause your pockets is empty`",
            "`The roof went missing again, Racks on me, walk around with a ten`",
            "`Diamonds on me throw a tantrum, Got the Rari, park the Phantom`",
            "`Born with a hundred, I'm doin' the most, I gotta boast, These rappers is fraud, really they broke`",
            "`New six, broke wrist, I put the racks in the mattress`",
            "`She want a purse, She want a Birkin, Fuck her, she squirting, Countin' racks in the back of suburban`",
            "`Two bitches, got 'em kissing together, Thick bitch, let it drip on the leather`",
            "`I put that bitch on a stretcher, Scraping the bowl for the extras`",
            "`Rich Forever gettin' more bands, I just pulled up in a foreign`",
            "`The coupe is retarded, Louis my carpet`",
            "`Rich nigga drop a baby in a hoe face, Where the hell was you at on the broke days`",
            "`Teach you how to be a boss, top dropped off, Motherfuck the fame, I done came to the vault`",
            "`I'm in the back of that Maybach, Me and your bitch, we go way back`",
            "`AP got her skating, Run to the money, we racing`",
            "`Dug in the pussy and make her feel it, Fuck nigga thought I wouldn't make a milly`",
            "`Rich Forever goin' rich way, They copy the wave, I'm sensei`",
            "`They tryna copy the wave, Too many chains like a slave, Rich Forever getting paid, Money machine might break`",
            "`Broke rappers in they feelings, they hate, Real diamonds on me, biting them straight`",
            "`You cannot hop in my car, Bentley coupe riding with stars`",
            "`Diamonds they wet on my arms, Tats on my neck and my arms`",
            "`In New York I Milly Rock, hide it in my sock, Running from an opp, then I shoot at opp`",
            "`Gimme top top, in my drop top, All these hoes gon' flock flock, when I drop drop`",
            "`All these hoes want cash, all these hoes want bags, Fucking on yo bitch, uh I'm her dad`",
            "`I'm a soldier, damn I thought I told you, Shootin' like a soldier like I'm from Magnolia`",
            "`All of your bitches they loose, all of your bitches they loose, All of my bitches is rich, And they stay rockin' that Rick huh`",
            "`Got a rich clique, she suckin' on the clique, She suckin' on the dick`",
            "`She just wanna top me, Bitch can't stop me`",
            "`Heard he spent a hunnid on a fucking watch piece, That's filthy`",
            "`On my wrist, might just take your bitch, Might just take that wrist, take her on a trip`",
            "`Bitches wanna fuck, hoe come lean on me, oh, Yeah Promethaziene, I can't even see, Niggas envy me, bitch I'm MVP`",
            "`Woke up to niggas talkin' like me, talk, Woke up to niggas soundin' like me, talk`",
            "`Oh, I think they like me, yeah they like me, Diamonds on me ice cream, hoe that's lightly`",
            "`I heard these niggas wanna fight me, Meet me at my next show but you better bring a pipe B`",
            "`She just wanna fuck me for my clout, fuck, Bitch I'm off the lean I crash the Audi, fuck`",
            "`New choppa, new choppa it came with the beam, Actavis pouring up lean`",
            "`Stack up my cash like a hike, take advantage of the Sprite, Take the bando bring the height`",
            "`Look lean counting up, Big guap, Carti up`",
            "`Pull up on your block quick, Quick drill, pop keep a zipper`",
            "`Popping pain killers yeah, yeah, I just poured a 4th inside the lean yeah, yah`",
            "`I'd rather not talk about it just do that shit, Got these bitches saying yeah he do that shit`",
            "`Sucking on my dick, like she new to dick, Blowing through the check yeah we new to this`",
            "`Pull up on your block and we shooting shit, Pull up on your bitch and I'm hitting it`",
            "`I'd rather not talk about it just shoot it up, Lil nigga, middle finger up`",
            "`Ice on my neck and my mama like, 'Boy Where you get all of that cash?'`",
            "`Walk in the bank, I flex on that boy, I flex on that boy with the bag`",
            "`I'm takin' your shit, you college kid, oh, We really be poppin' shit`",
            "`Baby girl, we can do plan A, Baby girl, we can do plan B, oh`",
            "`All of my niggas, they fool, Look at that boy, look at his jewels`",
            "`My outfit just made the front page, Hop off the plane, I run to the stage, yah`",
            "`Hoe stop chilling with' them lame niggas, Kickin' it with' them lame niggas`",
            "`Bitch I'm on the xanny I just lose it, Bitch my pockets stupid thick, pockets thicker than my bitch`",
            "`Woke up with my toolie, what it do?`",
            "`I got red shooters, I got blue, Let that thing down then point at you`",
            "`Why should I keep juggin' all these broke boys?, In the mall buying ice cause he's a broke boy`",
            "`Keep that choppa on me, my grandma watchin' me, Fuck my Jesus piece, I might squeeze the piece`",
            "`Yeah, I'ma go fuck that bitch, I'ma go thrash that bitch`",
            "`Cop the Prada bitch, get one for the zip, Got that Prada bag, got one for my bitch`",
            "`I got that dope, kilo, Yeah, come fuck with the boss`",
            "`That nigga my homie, Count money fuck hoes`",
            "`We laugh we joke, cus all the opps funny, Put that on God man these niggas don't want no smoke!`",
            "`No Smoke No Smoke but we die bout that money, No Smoke No Smoke you niggas don't want it`",
            "`I heard these niggas want smoke, they better pull up with 100, Yea we want all the smoke, I walk around with it on me`",
            "`Nigga stop all that talking you know where I'm at come and pull up on me`",
            "`Try get away and we gone run em down, He get back up Ben knocking him down`",
            "`You know how we living that ain't how you living, If you go to tripping get hit with the glizzy`",
            "`These niggas talk like they with it, When I catch you you gone get it`",
            "`My No. 9 love it when you got it on, Baby you so hot, all these diamonds cool you down`",
            "`Just give me a chance, promise I'ma make you love me, And Me and you together could accomplish more than something`",
            "`Tonight it's Wednesday baby, me and you we goin' out, And don't worry bout a thang we gon' have fun now`",
            "`I remember I wanted for to quit for so many times, But I know this moment'd come, now it's my time`",
            "`I'm goin' in, I'm putting everything on the line`",
            "`Whole lotta nights I went to sleep and I ain't had no food, But now I'm up and I'm just thinking about my next move`",
            "`We here next day, stayed down 'til I came up with my niggas, Right or wrong forever right, you know wassup with me nigga`",
            "`Now that I made it, ain't none the same it all changed, When I'm in public people see me they screaming my name`",
            "`I'm hardbody and I promise I won't fold, Like a pirate I'm just searchin' for some gold`",
            "`Half of ticket in deposits the same day I came home, Yungin' on the block with a pole, tryna get some dough`",
            "`I don't do no drugs when I'm in your city I swear I'm high off the feeling, Book me for a show when I walk in the building you know I turn up to the ceiling`",
            "`Down with that Glock, bitch don't make no sound, Say somethin' and get shot, bitch face down to the ground`",
            "`If you think I fuck with that lil hoe, then you a fool, I ain't got no education, I dropped out of school`",
            "`Too much money on me for to raise my hands and fight, Thunder in my clip, fuck around get hit with light`",
            "`Bitch I'm from the north, you know what up with me, Niggas know it's dump with me`",
            "`Feds in my section, think they tryna catch me bitch, You can do that flexin', get hit with this Wesson bitch`",
            "`My nigga tellin' me to pray to Allah, With some cold blooded killers standin' right in front the yard`",
            "`All red bottoms lookin' like I walked on the scene, Homicide diamonds with the pistol`",
            "`Real Blood with some young niggas 'round me Crippin', With some old heads out of jail leave a nigga missin'`",
            "`On my knees prayin' to God tellin' him I'm goin' home if I don't live up to goin' hard, One night I ain't go home, girl actin' crazy 'cause she mad that I'm livin' like a star`",
            "`Ain't no plug, ain't no socket, I ain't never had a car, And you want them fancy things so you better play your part`",
            "`I miss the Nawf just like my granny, My heart in them trenches, Yo' girl gone cheat on you for nothing`",
            "`This the files of a nigga who ain't neva' bleed, This the story of a child who was in them streets`",
            "`I let some shots off in the air for my niggas dead, Do anything in the world for you, I'm livin' red`",
            "`I ain't give up on my mission, fuck you mean bitch I was steady hustlin', Handin' all you niggas money bitch and I steady strugglin'`",
            "`Crack the seal it's potent, you can smell when it's medical, I doubled the cup to let you know I ain't drinkin' nothin' regular`",
            "`Still move the wheel with my knee while I count up bands, I show love and affection to all my fans`",
            "`I never dap you with the left hand, I draw down with the Glock in the right hand`",
            "`What chu gon' do moms late for rent?, What chu gon' do if that boy try to flex?`",
            "`NBA Gang, what they claiming lil nigga, Tell what the fuck you thinkin' lil nigga`",
            "`Don't let a nigga come straight for your neck, You know that we got it on deck`",
            "`Ain't no, no better, wanted better days, Nicki moved down the street and I had met Lil Dave`",
            "`I sit back and read like Cat in the Hat, 21 Savage, the cat with the MAC`",
            "`Stuart Little, heard these niggas some rats, Pockets full of cheese, bitch I got racks`",
            "`I listen to your raps, thought you was hard, You ain't even street for real`",
            "`And all these niggas play like they tough, 'Til a nigga get killed`",
            "`So much dope that it broke the scale, They say crack kills, nigga my crack sells`",
            "`See Savage he be with them apes, Play with this shit, you get ate`",
            "`You know I keep me a Draco, Rap a nigga like an eggroll, Big bullets leave a big hole, I was raised by the G code`",
            "`Now I'm on Ocean Drive sipping codeine with the top down`",
            "`Rags to riches, nigga came from the bottom, Hood rats, now a nigga fuckin' on models`",
            "`21 Gang, they were right beside me, And they still with me, nigga, I'm on TV`",
            "`Had to sell dope, I couldn't be an athlete`",
            "`I'm a street nigga, yeah I'm famous, I'm a rapper, nigga, and I'm gangbangin'`",
            "`Henny in my system, I'm gone, Speedin' on the E way, all gone`",
            "`I take her shoppin', that's easy, Fuck the summer, I ball all season`",
            "`We just chillin' at the bar and she cheesin', Buy a hundred shots for no reason`",
            "`Grind hard, nigga, grind hard, I done grind hard, Late nights playin' b-ball with a decoy`",
            "`Got in so much trouble, thought the teachers had beef with you`",
            "`It's a bag on his head, I'ma pick it up, It was money in the house, I used to stick it up`",
            "`Yeah, Kim Jong, yeah big bombs (21),  Wonder Bread man, make your bitch lick crumbs`",
            "`Bitch boy I'm a mobster, shrimp in my pasta, Jamaican Don Dada, hang 'round the shottas`",
            "`ost two-eighty, uh-huh, bitch I paid it, uh-huh, Rover SVR and I got the seats blazin`",
            "`Went against the gang and he got his cheese grated`",
            "`I can show you how to fit a M in a duffel, Show you how to fit a hunnid bags in a duffel`",
            "`Hang around a lot of gang bangin' ass niggas, Crip, Blood, blue or red, what you bang nigga?`",
            "`You do a lot of talkin' nigga, not me, Do a lot of walkin' nigga, that's me`",
            "`Max out, Tee Tay down the road, finna max out, Late night, pullin' in the 'partments, all the scraps out`",
            "`I'll probably leave you before I leave the lean, Lil' bitch, don't play with my sip`",
            "`Rims staggered, bad bitch I'ma bag her, On my face, issa dagger`",
            "`Don't be calling me a brother, you a hater, Got new stones on my neck, nigga, flooded out`",
            "`Hurricane Irma on my neck, nigga, flooded out, Hurricane Harvey on my wrist, shit, flooded out, Nigga flooded out, VVS' flooded out`",
            "`Ice on a nigga nice, lights out, Nigga bad, back on, finna put a pipe out`",
            "`Gucci on my pickle, nut right on her nipple, Young nigga with them M's, I get disrespectful`",
            "`AK with the scope, nigga and it's real dirty`",
            "`Go against the gang and it cost him (cost him), Made a diss song and I offed him (I offed him)`",
            "`I serve raw clean, I drink raw lean`",
            "`Issa knife, dawg, I got stripes, dawg, What's in that Wraith, Savage? It's some white, dawg`",
            "`Nigga don't argue, Nigga you pardoned`",
            "`I just bought a pistol it got 30 rounds in it, Pull up at yo momma house and put some rounds in it`",
            "`Nigga yous a bitch cuz I ran off with ya shit`",
            "`I'm a real right blood and these niggas counterfeit`",
            "`Young Savage real street nigga ya'll ain't on no block, Bitch keep your legs closed cuz all I want is top`",
            "`I'm a big dog lil' nigga you a pup, Pull up on ya spot walk up on it shoot it up`",
            "`Baking soda cold water cut the stove on scrape the side, You can keep the skinny bitch cuz I like a fat ass and thighs`",
            "`I got so many M's in my bank account, I can't even count 'em`",
            "`I already back for seconds, I ain't even clean my plate up`",
            "`All my diamonds carrots, dem lil' pointers be two lil', Glaziers in my ear, I need a cup, they 'bout to spill`",
            "`oung nigga havin' fame 'round town, Then we got rich off of verbs and nouns`",
            "`Cash out a four four check, then watch it bounce, Trap out the bando, trap out the ounce`",
            "`I keep a Glock in my pocket nigga, 21 I keep a Glock in my pocket nigga`",
            "`Yeah I'm in the kitchen nigga scrapin' bowls, savage, I'm in the hotel fuckin' hoes, savage`",
            "`These bitches love Sosa, O End or no end`",
            "`These bitches love Sosa, And they love them Glo' Boys`",
            "`We GBE dope boys, We got lots of dough boy`",
            "`Riding with 3hunna, With 300 foreigns, These bitches see Chief Sosa, I swear to god they honored`",
            "`Damn I hate being sober, I'm a smoker, Fredo was drinking, ain't said I want molly water`",
            "`All the hoes they love smoking, and love drinking, Anti-sober, for no reason`",
            "`On my tour bus we get dumb high you's a floor, boy, Fredo got a hangover he toting a Cobra`",
            "`Chief Sosa, Ballout, we high riding 'Raris, My bitches love drinking, some love smoking`",
            "`I'm a gorilla in a fuckin' coupe, finna pull up to the zoo, nigga, Told you, nigga, who the fuck is you? I don't know, nigga`",
            "`Talkin' out his neck, pistol to his throat, Blow this motherfucker, he gone choke`",
            "`I just got 20 for a fuckin' 4, I spent that shit on a fuckin' coat`",
            "`Woke up, brush my teeth, Thank the lord that I'm here today`",
            "`With a bitch named Marissa, Going faster than a missile`",
            "`What's on my feet? They Balenciagas, I got a dirty mouth need a rinsin`",
            "`You ain't smokin' by the ounce, you can bounce, I don't smoke no mid, I smoke super loud`",
            "`No I can't come down, bitch I'm too turnt up, Judge gon give me life, Foreign door Murders`",
            "`Got spikes like red hot, need to keep ya tail tucked, Have folks nem deliver this to you, put it in ya mailbox`",
            "`Bout to go get some more chains, Like I ain't got enough jewelry on`",
            "`someone hand me a ashtray, That's my boys who passed away, keep my mouth laminated, Till the day I'm eliminated`",
            "`What's yo address nigga? Where you live at nigga?, We ain't tryna hear that nigga, you know I'm a real ass nigga`",
            "`Drip more purple than a laker, yeah, Eyes more red than a laser, yeah`",
            "`You can get her back, I'm not a saviour, yeah, Rolling on your ex, Charles Xavier, yeah`",
            "`Spent a real big sack and it's still on the receipt in the register, I just stepped out Balenciagas eleven duh`",
            "`Just found out your hiding spot, I got them staking out, Slide down, we ain't dining in, we got to take them out`",
            "`You ain't Glory Boy you ain't Savage Squad, You know you can't be out after dark`",
            "`It's payday everyday, You ain't tryna fuck, bitch, skate`",
            "`All hundreds on me, but I'm on a rampage, My ice kicking ass, no MMA`",
            "`Told the bitch put on a seatbelt, She steady asking how to lift the seat up`",
            "`I'm up in Houston where this shit came from, Didn't know about bank accounts, I went and made one`",
            "`Look how my ice hitting off of my wife beater, Hop out on you stunting in a white creature`",
            "`I love running through the bands, You ain't Glo then we giving niggas tans`",
            "`Big choppa on me because I got big hands, Big racks on me like I'm wearing big pants`",
            "`Throwing money from the top, it's falling on the floor, I'm gone send some shots, that's all a nigga know`",
            "`You can have a .30 on you we taking niggas guns, When I was up in school I was taking niggas lunch`",
            "`When I look in the mirror, sometimes I see a demon, I'm gettin' money these niggas don't know the meanin'`",
            "`When I was 16 I was on the phone with' a nina, Up in the field while you was up in the bleachers`",
            "`Fresh ass nigga I be flexing on 'em macho, K let off and it's sounding like a congo`",
            "`A popped bitch, that's that shit I don't like, I got a bad bitch, yeah, that bitch right`",
            "`We smoke dope all day, all night, You smoke Reggie, that's that shit I don't like`",
            "`Pistol totin' and I'm shootin' on sight, A snitch nigga, that's that shit I don't like`",
      ];
      let interval = setInterval(async function() {
        msg.channel.send(messageList[Math.floor(Math.random() * messageList.length)]);
    }, 1000);
}

  
  


}); 

bot.login(config.token);