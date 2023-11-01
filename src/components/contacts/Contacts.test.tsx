import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contacts from "./Contacts";

jest.mock("../../hooks/useContacts", () => {
  return () => ({
    contactList: [],
    setContactList: jest.fn(),
    isLoading: false,
  });
});

describe("Contacts Component", () => {
  it("renders without crashing", () => {
    render(<Contacts />);
  });

  it('displays the "New" button when showContactForm is false', () => {
    render(<Contacts />);
    const newButton = screen.getByText("New");
    expect(newButton).toBeInTheDocument();
  });

  it('opens the ContactsForm when the "New" button is clicked', () => {
    render(<Contacts />);
    const newButton = screen.getByText("New");
    fireEvent.click(newButton);
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
  });
});