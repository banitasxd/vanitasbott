exports.run = {
   usage: ['menu', 'help', 'أوامر'],
   async: async (m, {
      client,
      isPrefix
   }) => {
      let rows = [{
         title: 'التنزيل',
         rowId: `${isPrefix}menutype 1`,
         description: ``
      }, {
         title: 'أدوات المجموعة',
         rowId: `${isPrefix}menutype 2`,
         description: ``
      }, {
         title: 'صانع الوغو',
         rowId: `${isPrefix}menutype 3`,
         description: ``
      }, {
         title: 'معلومات المستخدم',
         rowId: `${isPrefix}menutype 4`,
         description: ``
      }, {
         title: 'خدمات',
         rowId: `${isPrefix}menutype 5`,
         description: ``
      }, {
         title: 'للمطور فانبتاس',
         rowId: `${isPrefix}menutype 6`,
         description: ``
      }, {
         title: 'خاصة',
         rowId: `${isPrefix}menutype 7`,
         description: ``
      }]
      await client.sendList(m.chat, '', global.db.setting.msg, '© vanitas-bot v2.2.0', 'هنا!', [{
         rows
      }], m)
   },
   error: false
}