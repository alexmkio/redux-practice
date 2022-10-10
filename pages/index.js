import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import Link from "next/link";
import UserForm from "../components/userForm";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "./firebase";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        try {
          getDoc(doc(db, "users", user.uid))
            .then((data) => data.data())
            .then((data) => {
              dispatch(
                setUser({
                  email: user.email,
                  uid: user.uid,
                  cart: data.cart,
                })
              );
            });
          router.push({
            pathname: "/store",
          });
        } catch (error) {
          console.log("failed to fetch user", error);
        }
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
      console.log(error);
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
