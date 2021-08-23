const {SlashCommandBuilder} = require('@discordjs/builders');
const fs = require('fs');
const fetch = require('node-fetch');
const Jimp = require('jimp');
const {BitmapImage, GifFrame, GifUtil} = require('gifwrap');
const sharp = require('sharp');
sharp.cache(false);

/**
 * download a file from an url
 * @param {str} url Url to download from
 * @param {str} path Path to save the image
 */
async function download(url, path) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer);
}

module.exports = {
  data: new SlashCommandBuilder()
      .setName('pat')
      .setDescription('Pat the person')
      .addUserOption((option) =>
        option.setName('target')
            .setDescription('The person you want to pat')
            .setRequired(true)),
  async execute(interaction) {
    // Ack the interaction
    await interaction.deferReply();

    const target = interaction.options.getUser('target');
    if (target.id === interaction.user.id) {
      await interaction.editReply({content: 'You can\'t pat yourself!'});
      return;
    }

    // Download and save the image
    const avatarURL = target.avatarURL();
    // User has a default avatar
    if (avatarURL === null) {
      await interaction.editReply({
        content: 'You can\'t pat someone without an avatar :\'(',
      });
      return;
    }
    const fileExtention = avatarURL.split('.').pop();
    const filename = `./tmp/${target.username}.${fileExtention}`;
    const filenamePNG = `./tmp/${target.username}.png`;
    await download(avatarURL, filename);

    // Convert the image to png, Jimp can't handle WebP
    await sharp(filename)
        .png()
        .toFile(filenamePNG);

    const avatar = await Jimp.read(filenamePNG);
    const spriteTemplate = await Jimp.read('./img/pat.png');
    const outputPath = `./tmp/pat.gif`;
    const frames = [];
    const AVATAR_CRUNCH_SIZES = [
      [112, 112],
      [112, 87],
      [112, 78],
      [112, 87],
      [112, 100],
    ];

    // Create the gif
    for (let i=0; i<5; i++) {
      const tmp = new Jimp(112, 112, '#36393f', (err, image) =>{});
      const crunchedAvatar = avatar.clone()
          .resize(AVATAR_CRUNCH_SIZES[i][0], AVATAR_CRUNCH_SIZES[i][1]);
      tmp.blit(crunchedAvatar, 0, 112-AVATAR_CRUNCH_SIZES[i][1]);
      tmp.blit(spriteTemplate, 0, 0, 112*i, 0, 112, 112);
      const bitmap = new BitmapImage(tmp.bitmap);
      // Limit to 256 colors (gif limitation)
      GifUtil.quantizeWu(bitmap, 256);
      frames.push(new GifFrame(
          bitmap,
          {delayCentisecs: 6}));
    }
    await GifUtil.write(outputPath, frames);

    // Reply using the created gif
    await interaction.editReply({
      content: `<@${target.id}> got pats`,
      files: [outputPath],
    });

    // Clean files
    fs.unlinkSync(outputPath);
    fs.unlinkSync(filenamePNG);
    fs.unlinkSync(filename);
  },
};
