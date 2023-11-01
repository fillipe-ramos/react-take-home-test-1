import { useEffect, useState } from "react";
import { IContact, apiFetchAllContacts } from "../data/contacts";

function useContacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactList, setContactList] = useState<IContact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetchAllContacts();
        if (!response) {
          throw new Error("Network response was not ok");
        }
        setContactList(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contact list:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { contactList, setContactList, isLoading };
}

export default useContacts;
