const login = require("fca-unofficial");
const express = require('express');
const app = express();

const BOT_NAME = "Ariel Bot";

login({appState: JSON.parse(process.env.APPSTATE || '[]')}, (err, api) => {
    if(err) return console.error(err);

    console.log("✅ ARIEL BOT EST EN LIGNE !");
    
    api.setOptions({ listenEvents: true });

    api.listen(async (err, event) => {
        if(err) return console.error(err);
        if(event.type !== "message") return;

        let body = event.body.toLowerCase();
        let threadID = event.threadID;

        if(body.includes("ariel")) {
            api.sendMessage(`🤖 Je suis ${BOT_NAME} 🇨🇩🇨🇩\nComment puis-je t'aider ? ❤️`, threadID);
        }
        else if(body.includes("ai")) {
            api.sendMessage(`🤖 ${BOT_NAME} est actif ! 🇨🇩🇨🇩\nQue veux-tu ? 😘`, threadID);
        }
        else if(body.includes("bonjour")) {
            api.sendMessage(`👋 Bonjour ! Je suis ${BOT_NAME}`, threadID);
        }
    });
});

app.get('/', (req, res) => {
    res.send(`${BOT_NAME} fonctionne ! ✅`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré`);
});
          
