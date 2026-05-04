const login = require("fca-unofficial");
const express = require('express');
const app = express();
const axios = require('axios');

const BOT_NAME = "Ariel Bot";

// LIRE DEPUIS LA VARIABLE ENVIRONNEMENT
const appState = JSON.parse(process.env.APPSTATE);

login({appState: appState}, (err, api) => {
    if(err) return console.error("ERREUR CONNEXION: ", err);

    console.log("✅ ARIEL BOT CONNECTÉ !");
    
    api.setOptions({
        listenEvents: true,
        logLevel: "silent"
    });

    api.listen(async (err, event) => {
        if(err) return console.error(err);
        if(event.type !== "message") return;

        let msg = event.body.toLowerCase();
        let threadID = event.threadID;

        if(msg.includes("ariel")) {
            api.sendMessage(`🤖 Je suis ${BOT_NAME} 🇨🇩🇨🇩\nComment puis-je t'aider ? ❤️`, threadID);
        }
        else if(msg.includes("ai")) {
            api.sendMessage(`🤖 ${BOT_NAME} est actif ! 🇨🇩🇨🇩\nJe suis là 😘`, threadID);
        }
        else if(msg.includes("bonjour") || msg.includes("salut")) {
            api.sendMessage(`👋 Bonjour ! Je suis ${BOT_NAME}`, threadID);
        }
        else {
            api.sendMessage("🤖 Je réfléchis... 🧠", threadID);
            
            const url = `https://api.asyria.org/api/ai/gpt?question=${encodeURIComponent(msg)}&model=gpt-4&lang=fr`;
            
            axios.get(url)
            .then(response => {
                let reponse = response.data.response || "Désolé, je n'ai pas compris.";
                api.sendMessage(`🤖 ${BOT_NAME} :\n\n${reponse}`, threadID);
            })
            .catch(error => {
                api.sendMessage("❌ Erreur IA", threadID);
            });
        }
    });
});

app.get('/', (req, res) => {
    res.send("Ariel Bot avec GPT fonctionne ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré`);
});
