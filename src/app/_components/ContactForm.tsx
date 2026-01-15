import React from 'react'
import { ContactType } from '../_types/contact';


type ContactFormProps = {
  action: (prevState: any, formData: FormData) => Promise<any>;
  contact?: ContactType;
};

const ContactForm = ({action, contact}: ContactFormProps) => {
  return (
    <div>
      
    </div>
  )
}

export default ContactForm
