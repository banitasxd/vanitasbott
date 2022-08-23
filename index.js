console.log('Starting . . .')
require('dotenv').config()
const { spawn: spawn } = require('child_process'), path = require('path'), colors = require('@colors/colors/safe'), CFonts = require('cfonts')

function start() {
	let args = [path.join(__dirname, 'client.js'), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting...')
			p.kill()
			start()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == 1) start()
	})
}

if (!process.env.DATABASE_URL) {
   console.log(colors.red(`You have to setup the database first.`))
} else {
   CFonts.say('VANITAS', {
      font: 'tiny',
      align: 'center',
      colors: ['system']
   }), CFonts.say('Github : https://github.com/vanitasxd', {
      colors: ['system'],
      font: 'console',
      align: 'center'
   }), start()
}