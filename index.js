const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
const contacts = require('./contacts');
const { log } = require('console');

// TODO: рефакторити
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
        const allContacys = await contacts.listContacts();
        return console.log(allContacys);      
    case 'get':
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);
    case 'add':
      const newContact = await contacts.addContact(id, name, email, phone);
      return console.log(newContact);
    case 'remove':
     const removeCont = await contacts.removeContact(id);
     return console.log(removeCont);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);