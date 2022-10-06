import { useEffect } from "react";
import Link from "next/link";
import UserForm from "../components/userForm";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "./firebase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push({
          pathname: "/store",
        });
      }
    });
  }, []);

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in:", cred.user);
        router.push({
          pathname: "/store",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <UserForm submissionHandler={loginUser} submitText={"Log In"} />
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
    </>
  );
}
