import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import UserForm from "../components/userForm";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();

  const signupUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created:", cred.user);
        router.push({
          pathname: "/store",
        });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return <UserForm submissionHandler={signupUser} submitText={"Sign Up"} />;
}
