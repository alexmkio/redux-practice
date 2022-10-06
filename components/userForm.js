import { useState } from "react";

export default function UserForm({ submissionHandler, submitText }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    submissionHandler(emailAddress, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        type="text"
        id="email"
        name="email address"
        value={emailAddress}
        onChange={(event) => setEmailAddress(event.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <button type="submit">{submitText}</button>
    </form>
  );
}
