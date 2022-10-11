import { auth } from "../pages/firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";

export default function Logout() {
  const router = useRouter();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        router.push({
          pathname: "/",
        });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return <button onClick={() => handleClick()}>Logout</button>;
}
