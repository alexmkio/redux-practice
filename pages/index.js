import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import UserForm from "../components/userForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "items");
  const router = useRouter();

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log(items);
    };

    getItems();
  }, []);

  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('user logged in:', cred.user)
        router.push({
          pathname: "/store",
        });
      })
      .catch(err => {
        console.log(err.message)
      })
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
