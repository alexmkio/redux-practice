import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import Link from "next/link";
import UserForm from "../components/userForm";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "./firebase";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
          })
        );
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
