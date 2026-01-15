import ContactForm from "@/app/_components/ContactForm";
import { createContactAction } from "@/app/actions/contact";
import React from "react";

const NewConatactPage = () => {
  return (
    <div className="max-w-md mt-6 mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl fontbold mb-6">Create New Contact</h1>
      <ContactForm action={createContactAction} />
    </div>
  );
};

export default NewConatactPage;
