import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import UserForm from "../components/userForm";

export default function Home() {
  const [items, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "items");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollectionRef);
      setItems(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      console.log(items);
    };

    getItems();
  }, []);

  const loginUser = (email, password) => {
    console.log(email, password);
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
