
const {MessageEmbed} = require('discord.js');

module.exports = {
  logs: {
    message: new MessageEmbed()
        .setColor(0x0d6299)
        .setTitle('Logfile location')
        .setDescription(`%userprofile%\\appdata\\locallow\\Fire Sword Studios\
\\The Perfect Tower II
Log file names:
\`player.log\`
\`player-prev.log\``),
  },
  save: {
    message: new MessageEmbed()
        .setColor(0x0d6299)
        .setTitle('Save location and backup')
        .setDescription(`%userprofile%\\appdata\\locallow\\Fire Sword Studios\
\\The Perfect Tower II\\saves
Each slot corresponds to one of your saves. To create a backup of a save, \
copy the files that end with:
  \`.sav\`
  \`.timestamp.sav\` 
  \`.bak.sav\`
to a safe location (any other folder works).
You can later restore your save by copying the saved file in this folder.`),
  },
  file_write_error: {
    message: new MessageEmbed()
        .setColor(0x0d6299)
        .setTitle('What to do in case of a file write error on Steam')
        .setDescription(`Usually a file write error comes form your antivirus \
locking some files. To solve this there's a few steps you can try:
1)   Add TPT2 to the exclusions folders
2)   Close and reopen your session / Restart your PC

Relevant links:
[Remove from quarantine AVG](https://support.avg.com/SupportArticleView?l=en&urlName=Use-AVG-Quarantine&supportType=home)
[Remove from quarantine Avast](https://support.avast.com/en-us/article/Use-Antivirus-Quarantine/)`),
  },
  update: {
    message: new MessageEmbed()
        .setColor(0x0d6299)
        .setTitle('Force update')
        .setDescription(`To force an update on Steam, right click on the game \
> properties and then verify files`)
        .setImage(`https://media.discordapp.net/attachments/528272777321512990/824776080640573500/\
unknown.png?width=400&height=153`),
  },
  record: {
    message: new MessageEmbed()
        .setColor(0x0d6299)
        .setTitle('Record a video on Windows')
        .setDescription(`To record a play/bug with windows 10 you can use the \
gamebar \`win+g\` (it also let's you see you fps)
      
      The shortcut for starting (and ending) a record is \`win + alt + r\`
      
      Usual path for records is \`Videos\\Captures\`
      
      You can share your record via https://www.file.io/`),
  },
};
