"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { UserType } from "../_types/user";
import { deleteSession, setSession } from "../_lib/session";

const API_URL = "http://localhost:3001";

// 1. Update signature to accept prevState (required for useActionState)
export const loginAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  // Variable to store user if found
  let user: UserType | null = null;

  try {
    // 2. Perform the fetch inside the try block
    const response = await axios.get(
      `${API_URL}/users?email=${email}&password=${password}`
    );
    user = response.data[0];
    
  } catch (error) {
    // This only catches network errors (like if json-server is down)
    console.error("Database Error:", error);
    return { message: "Service unavailable. Please try again." };
  }

  // 3. validation checks
  if (!user) {
    return { message: "Invalid credentials" };
    //set user in the cookies

  }

  // 4. TODO: Set cookies here 
  // (e.g., using `cookies().set('session', ...)` from 'next/headers')
  await setSession ({ name: user.name, email: user.email, id: user.id });

  // 5. SUCCESS: Call redirect OUTSIDE the try/catch block
  // This prevents the redirect error from being caught as a failure
  redirect("/contact");
};

export const logoutAction = async () => {
  // TODO: Destroy session cookies here
  await deleteSession();
  redirect("/login");
};