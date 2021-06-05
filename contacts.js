const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '/db/contacts.json');
const contactsList = fs.readFile(contactsPath, 'utf8');

async function listContacts() {
  try {
    console.table(JSON.parse(await contactsList));
    return JSON.parse(await contactsList);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const getContact = JSON.parse(await contactsList).find(
      ({ id }) => id === contactId
    );

    console.table(getContact);
    return getContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsUpdated = JSON.parse(await contactsList).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(contactsUpdated), 'utf8');
    console.table(contactsUpdated);
    return contactsUpdated;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await contactsList);
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };

    const newContactsList = [...contacts, newContact];

    console.table(newContact);
    console.table(newContactsList);
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), 'utf8');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
