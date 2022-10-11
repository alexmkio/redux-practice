import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import UserForm from "../components/userForm";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const signupUser = async (email, password) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!response) {
        throw new Error(response);
      } else {
        await setDoc(doc(db, "users", response.user.uid), {
          cart: [],
        });
        router.push({
          pathname: "/store",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return <UserForm submissionHandler={signupUser} submitText={"Sign Up"} />;
}
