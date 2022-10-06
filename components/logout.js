import { auth } from "../pages/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

export default function Logout() {
  const router = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("user signed out");
        router.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return <button onClick={(event) => handleClick(event)}>Logout</button>;
}
