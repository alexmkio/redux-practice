import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import Link from "next/link";
import UserForm from "../components/userForm";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "./firebase";
import { db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid),
          (snapshot) => {
            let updatedUserResponse = snapshot.data();

            dispatch(
              setUser({
                email: user.email,
                uid: user.uid,
                cart: updatedUserResponse.cart,
              })
            );
          },
          (error) => {
            console.log("error with realtime listener:", error);
          }
        );
        router.push({
          pathname: "/store",
        });
      }
    });
  }, []);

  const loginUser = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      if (!response) {
        throw new Error(response);
      } else {
        console.log("user logged in:", response);
        router.push({
          pathname: "/store",
        });
      }
    } catch (error) {
      console.log("sign in error:", error);
    }
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
