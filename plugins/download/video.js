const { decode } = require('html-entities')
const { ytv } = require('../../lib/y2mate')
const yt = require('usetube')
exports.run = {
   usage: ['video'],
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, 'π', m.key)
         const search = await (await yt.searchVideo(text)).videos
         if (!search || search.length == 0) return client.reply(m.chat, global.status.fail, m)
         const {
            dl_link,
            thumb,
            title,
            duration,
            filesizeF
         } = await ytv('https://youtu.be/' + search[0].id)
         if (!dl_link) return client.reply(m.chat, global.status.fail, m)
         let caption = `δΉ  *Y T - V I D E O*\n\n`
         caption += `	β¦  *Title* : ${decode(title)}\n`
         caption += `	β¦  *Size* : ${filesizeF}\n`
         caption += `	β¦  *Duration* : ${duration}\n`
         caption += `	β¦  *Quality* : 480p\n\n`
         caption += global.footer
         let chSize = Func.sizeLimit(filesizeF, global.max_upload)
         if (chSize.oversize) return client.reply(m.chat, `π File size (${filesizeF}) exceeds the maximum limit, download it by yourself via this link : ${await (await scrap.shorten(dl_link)).data.url}`, m)
         let isSize = (filesizeF).replace(/MB/g, '').trim()
         if (isSize > 99) return client.sendMessageModify(m.chat, caption, m, {
            title: 'Β© vanitas-bot v2.2.0 (Public Bot)',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(thumb)
         }).then(async () => await client.sendFile(m.chat, dl_link, decode(title) + '.mp4', '', m, {
            document: true
         }))
         client.sendFile(m.chat, dl_link, Func.filename('mp4'), caption, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}