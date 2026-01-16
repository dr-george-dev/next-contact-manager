"use server"
import { revalidatePath } from "next/cache";
import { craeteContact, deleteContact } from "../api/contact";
import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contact";


//  These are all mutations, time 28:00
export const createContactAction = async (
    prevState: any,
    formData: FormData
) => {
    if (!formData) {
        return { error: `Form data is missing` };
    }

    const user = await getSession();

    const newContact: ContactType = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        usreId: user?.id
    };
    try {
        await craeteContact(newContact);
        revalidatePath("/contact");
        return { success: true };
    } catch (error) {
        console.log("Error create contact: ", error);
        return {
            error: "Failed to create contact"
        };
    }
};

export const updateContactAction = async (
    prevState: any,
    formData: FormData
) => { };

export const deletContactAction = async (
    prevState: any,
    formData: FormData) => {
    const id = formData.get("id") as string;
    try {
        await deleteContact(id);
        revalidatePath("/contact");
        return {
            success: true
        };
    } catch (error) {
        console.log("Error deleting contact: ", error);
        return {
            error: "Failed to delete contact"
        };
    }
};