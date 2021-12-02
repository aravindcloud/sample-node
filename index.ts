import readline from 'readline';

import * as Producer from './src/producer';
import * as Consumer from './src/consumer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(Consumer)
function start() {
  console.log('connecting...')
  Consumer.connect().then(() => {
    rl.question('enter user name \n', function (username) { // the username to print it along with the messages
      Producer.getConnection(username).then((sendMessage) => {
        console.log('connected, press Ctrl+C to exit')
        rl.on('line', (input) => {
          readline.moveCursor(process.stdout, 0,-1); // removing the input so you don't get duplicated items in terminal
          sendMessage(input);
        })
      })
    });
  })
}

start();
// handling shut down

process.on('SIGINT', process.exit);

process.on('exit', () => {
  Producer.disconnect();
  Consumer.disconnect();
  rl.close();
});