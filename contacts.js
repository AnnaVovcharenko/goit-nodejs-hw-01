// contacts.js


const fs = require('fs').promises;
// const { readFile } = require('fs');
const path = require('path');
const { nanoId } = require('nanoid');

//  Розкоментуй і запиши значення
const contactsPath = path.join('db', 'contacts.json');
//і запиши в неї шлях до файлу contacts.json. 
//  Для складання шляху використовуй методи модуля path.
//path.join([path1][, path2][, …]) — 
//Об’єднує всі аргументи і нормалізує отриманий шлях.



// Додай функції для роботи з колекцією контактів. 
// У функціях використовуй модуль fs та його методи
//  readFile() і writeFile().
// TODO: задокументувати кожну функцію
const listContacts = async () => {
    const data = await fs.readFile(contactsPath); // отримуємо данні з файлу як текст
    return JSON.parse(data); // передає текст вже як масив (перетворює його)
    //Повертає масив контактів.
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const resCont = contacts.find(item => item.contactId === contactId);
    return resCont || null;
    // ...твій код. Повертає об'єкт контакту з таким id. 
    // Повертає null, якщо контакт з таким id не знайдений.
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const indxCont = contacts.findIndex(item => item.contactId === contactId);
    if (indxCont === -1) {
        return null
    };
    const [resCont] = contacts.splice(indxCont, 1);
    await fs.writeFile(contactsPath < JSON.stringify(contacts, null, 2));//запис файлу
    return resCont;
    // ...твій код. Повертає об'єкт видаленого контакту. 
    // Повертає null, якщо контакт з таким id не знайдений.
}

const addContact = async (id, name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: nanoId(), name: name, email: email, phone: phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, nul, 2))
    return newContact;
    // ...твій код. Повертає об'єкт доданого контакту. 
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}