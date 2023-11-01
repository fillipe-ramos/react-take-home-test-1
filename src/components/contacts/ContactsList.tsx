import { IContact } from "../../data/contacts";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import TablePlaceholder from "../common/TablePlaceholder";

interface ContactsListProps {
  contacts: IContact[];
  onEdit: (contact: IContact) => void;
  onDelete: (contactId: string) => void;
  isLoading: boolean;
}
function ContactsList({
  contacts,
  onEdit,
  onDelete,
  isLoading,
}: ContactsListProps) {
  return (
    <div>
      <h1>Contact List</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TablePlaceholder text={"Loading"} />
          ) : contacts?.length === 0 ? (
            <TablePlaceholder text={"No Contacts"} />
          ) : (
            contacts
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.age}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-autoclose-true" data-testid="actions-button">
                        Actions
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          data-testid="edit-button"
                          as="button"
                          onClick={() => onEdit(contact)}
                          href="#"
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          data-testid="delete-button"
                          as="button"
                          onClick={() => onDelete(contact.id)}
                          href="#"
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ContactsList;
