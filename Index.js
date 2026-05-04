const login = require("fca-unofficial");
const express = require('express');
const app = express();
const fs = require('fs');

const BOT_NAME = "Ariel Bot";

// LIRE LE FICHIER DE CONNEXION
const appState = JSON.parse(fs.readFileSync('./appstate.json', 'utf8'));

login({appState: appState}, (err, api) => {
    if(err) return console.error("ERREUR: ", err);

    console.log("✅ ARIEL BOT CONNECTÉ À FACEBOOK !");
    
    api.setOptions({
        listenEvents: true,
        logLevel: "silent"
    });

    api.listen(async (err, event) => {
        if(err) return console.error(err);
        if(event.type !== "message") return;

        let msg = event.body.toLowerCase();
        let threadID = event.threadID;

        // === RÉPONSES ===
        if(msg.includes("ariel")) {
            api.sendMessage(`🤖 Je suis ${BOT_NAME} 🇨🇩🇨🇩\nComment puis-je t'aider ? ❤️`, threadID);
        }
        else if(msg.includes("ai")) {
            api.sendMessage(`🤖 ${BOT_NAME} est actif ! 🇨🇩🇨🇩\nJe suis là 😘`, threadID);
        }
        else if(msg.includes("bonjour") || msg.includes("salut")) {
            api.sendMessage(`👋 Bonjour ! Je suis ${BOT_NAME}`, threadID);
        }
    });
});

// POUR GARDER EN LIGNE
app.get('/', (req, res) => {
    res.send("Ariel Bot fonctionne ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur prêt`);
});
