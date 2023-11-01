import { render, fireEvent } from "@testing-library/react";
import ContactsForm from "./ContactsForm";

describe("ContactsForm", () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    const contact = {
      name: "John Doe",
      phone: "1234567890",
      email: "johndoe@example.com",
      age: "30",
    };
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should render the form with the correct fields", () => {
      const { getByLabelText } = render(
        <ContactsForm onSubmit={onSubmit} onCancel={onCancel} contact={contact} />
      );
  
      expect(getByLabelText("Name")).toBeInTheDocument();
      expect(getByLabelText("Phone Number")).toBeInTheDocument();
      expect(getByLabelText("Email")).toBeInTheDocument();
      expect(getByLabelText("Age")).toBeInTheDocument();
    });
  
    it("should update the form data when the user types in the fields", () => {
      const { getByLabelText } = render(
        <ContactsForm onSubmit={onSubmit} onCancel={onCancel} contact={contact} />
      );
  
      const nameInput = getByLabelText("Name");
      const phoneInput = getByLabelText("Phone Number");
      const emailInput = getByLabelText("Email");
      const ageInput = getByLabelText("Age");
  
      fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
      fireEvent.change(phoneInput, { target: { value: "0987654321" } });
      fireEvent.change(emailInput, { target: { value: "janedoe@example.com" } });
      fireEvent.change(ageInput, { target: { value: "25" } });
  
      expect(nameInput).toHaveValue("Jane Doe");
      expect(phoneInput).toHaveValue("0987654321");
      expect(emailInput).toHaveValue("janedoe@example.com");
      expect(ageInput).toHaveValue("25");
    });
  
    it("should call the onSubmit function when the form is submitted", () => {
      const { getByRole } = render(
        <ContactsForm onSubmit={onSubmit} onCancel={onCancel} contact={contact} />
      );
  
      const submitButton = getByRole("button", { name: "Submit" });
  
      fireEvent.click(submitButton);
  
      expect(onSubmit).toHaveBeenCalledWith(contact);
    });
  
    it("should call the onCancel function when the cancel button is clicked", () => {
      const { getByRole } = render(
        <ContactsForm onSubmit={onSubmit} onCancel={onCancel} contact={contact} />
      );
  
      const cancelButton = getByRole("button", { name: "Cancel" });
  
      fireEvent.click(cancelButton);
  
      expect(onCancel).toHaveBeenCalled();
    });
  });