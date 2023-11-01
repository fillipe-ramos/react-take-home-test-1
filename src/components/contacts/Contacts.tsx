import React, { useState } from "react";
import {
  IContact,
  apiAddContact,
  apiDeleteContact,
  apiUpdateContact,
} from "../../data/contacts";
import ContactsForm from "./ContactsForm";
import Button from "react-bootstrap/Button";
import { generateUUID } from "../../util/guid";
import useContacts from "../../hooks/useContacts";
import ContactsList from "./ContactsList";

function Contacts() {
  const [contactEdit, setContactEdit] = useState<IContact | undefined>();
  const { contactList, setContactList, isLoading } = useContacts();
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAddContact = async (newContact: IContact) => {
    try {
      const id = await generateUUID();
      const newContactFull = { ...newContact, id };
      await apiAddContact(newContactFull);
      setContactList((prevContacts) => [...prevContacts, newContactFull]);
      setShowContactForm(false);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleEditContact = async (contact: IContact) => {
    try {
      const contactIndex = contactList.findIndex((e) => e.id === contact.id);
      const updatedContacts = [...contactList];
      updatedContacts[contactIndex] = contact;
      await apiUpdateContact(contact);
      setContactList(updatedContacts);
      setShowContactForm(false);
      setContactEdit(undefined);
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  const handleEditButton = (contact: IContact) => {
    setContactEdit(contact);
    setShowContactForm(true);
  };

  const handleDeleteButton = async (contactId: string) => {
    try {
      await apiDeleteContact(contactId);
      const updatedContacts = contactList.filter((c) => c.id !== contactId);
      setContactList(updatedContacts);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleCancelButton = () => {
    setContactEdit(undefined);
    setShowContactForm(false);
  };

  return (
    <div>
      {showContactForm ? (
        <ContactsForm
          onSubmit={contactEdit ? handleEditContact : handleAddContact}
          onCancel={handleCancelButton}
          contact={contactEdit}
        />
      ) : (
        <div>
          <Button variant="primary" onClick={() => setShowContactForm(true)}>
            New
          </Button>
          <ContactsList
            contacts={contactList}
            onEdit={handleEditButton}
            onDelete={handleDeleteButton}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

export default Contacts;
