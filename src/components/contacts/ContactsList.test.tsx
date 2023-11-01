import React from "react";
import { render, fireEvent, screen, act, findAllByTestId } from "@testing-library/react";
import ContactsList from "./ContactsList";

const mockContacts = [
  { id: "1", name: "John Doe", email: "johndoe@example.com" },
  { id: "2", name: "Jane Doe", email: "janedoe@example.com" },
];

describe("ContactsList", () => {
  it("renders a list of contacts", () => {
    const { getByText } = render(
      <ContactsList
        contacts={mockContacts}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={false}
      />
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("johndoe@example.com")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
    expect(getByText("janedoe@example.com")).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", async () => {
    const handleEdit = jest.fn();
    render(
      <ContactsList
        contacts={mockContacts}
        onEdit={handleEdit}
        onDelete={() => {}}
        isLoading={false}
      />
    );

    fireEvent.click(await screen.getAllByTestId("actions-button")[0]);
    fireEvent.click(await screen.findByTestId("edit-button"));
    expect(handleEdit).toHaveBeenCalledWith(mockContacts[0]);
  });

  it("calls onDelete when the delete button is clicked", async () => {
    const handleDelete = jest.fn();
    render(
      <ContactsList
        contacts={mockContacts}
        onEdit={() => {}}
        onDelete={handleDelete}
        isLoading={false}
      />
    );

    fireEvent.click(await screen.getAllByTestId("actions-button")[0]);
    fireEvent.click(await screen.findByTestId("delete-button"));

    expect(handleDelete).toHaveBeenCalledWith("2");
  });

  it("renders a placeholder when there are no contacts and isLoading is false", () => {
    const { getByText } = render(
      <ContactsList
        contacts={[]}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={false}
      />
    );

    expect(getByText("No Contacts")).toBeInTheDocument();
  });

  it("renders a placeholder when isLoading is true", () => {
    const { getByText } = render(
      <ContactsList
        contacts={[]}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={true}
      />
    );

    expect(getByText("Loading")).toBeInTheDocument();
  });
});
