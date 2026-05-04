const login = require("fca-unofficial");
const express = require('express');
const app = express();

const BOT_NAME = "Ariel Bot";

// Connexion à Facebook
login({appState: JSON.parse(process.env.APPSTATE || '[]')}, (err, api) => {
    if(err) return console.error(err);

    console.log("✅ ARIEL BOT CONNECTÉ À FACEBOOK !");
    
    api.setOptions({ listenEvents: true });

    // Écouter les messages
    api.listen(async (err, event) => {
        if(err) return console.error(err);
        if(event.type !== "message") return;

        let message = event.body.toLowerCase();
        let threadID = event.threadID;

        // RÉPONSES
        if(message.includes("ariel")) {
            api.sendMessage(`🤖 Je suis ${BOT_NAME} 🇨🇩🇨🇩\nComment puis-je t'aider ? ❤️`, threadID);
        }
        else if(message.includes("ai")) {
            api.sendMessage(`🤖 ${BOT_NAME} est là ! 🇨🇩🇨🇩\nQue veux-tu mon amour ? 😘`, threadID);
        }
        else if(message.includes("bonjour") || message.includes("salut")) {
            api.sendMessage(`👋 Bonjour ! Je suis ${BOT_NAME}`, threadID);
        }
    });
});

// Garder le bot en ligne
app.get('/', (req, res) => {
    res.send(`${BOT_NAME} fonctionne sur Facebook ! ✅`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur prêt`);
});
