import { useState, useCallback, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IContact } from "../../data/contacts";

interface ContactsFormProps {
  onSubmit: (contact: IContact) => void;
  onCancel: () => void;
  contact?: IContact;
}

const initialFormData = {
  id: "",
  name: "",
  phone: "",
  email: "",
  age: 0,
};

function ContactsForm({ onSubmit, onCancel, contact }: ContactsFormProps) {
  const [formData, setFormData] = useState(contact || initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  const handleCancelButton = () => {
    setFormData(initialFormData);
    onCancel();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          defaultValue={formData.name}
          type="text"
          placeholder="Contact name"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          defaultValue={formData.phone}
          type="text"
          placeholder="Phone Number"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          defaultValue={formData.email}
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control
          defaultValue={formData.age}
          type="text"
          placeholder="Age"
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="outline-danger" onClick={handleCancelButton}>
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactsForm;
