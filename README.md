# ktane_bot_ts
AI assistant for Keep Talking and Nobody Explodes. A (hopefully) simple voice recognition bot to respond to basic user input and assist in bomb defusal for Keep Talking and Nobody Explodes. If I can't finish this project by the time FA21 starts then this project will likely be abandoned until I have free time. This is mainly a passion project for myself since nobody ever wants to play KTANE for more than 5 min at a time.
---
Basic installation process:
 - Make sure you have the google cloud API installed via [this](https://cloud.google.com/sdk/docs/install)
 - Make sure you have a project created and configured to your machine that uses the speech-to-text API
 - Install SoX and have it available in your $PATH
 - Add a .d.ts file to node-record-lpcm16 that has "declare module 'node-record-lpcm16';" in it
