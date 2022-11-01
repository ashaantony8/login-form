import { useEffect, useState } from "react";
import "./App.css";
import {
  hasLowerCase,
  hasNumber,
  hasSpecialCharacter,
  hasUpperCase,
} from "./utils";

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [progressBarStyle, setProgressBarStyle] = useState({
    width: "0%",
    backgroundColor: "transparent",
  });

  const handlePasswordChange = (e) => {
    const {
      target: { value = "" }
    } = e;
    setPassword(value);
  };

  useEffect(() => {

    const updatedProgressBarStyles = {
      backgroundColor: "red",
    };

    let totalStrength = 0;

    if (password.length > 3) {
      const strengthByLength = Math.min(6, Math.floor(password.length / 3));

      let strengthByCharacterType = 0;


      if (hasNumber.test(password)) {
        strengthByCharacterType += 1;
      }
      if (hasUpperCase.test(password)) {
        strengthByCharacterType += 1;
      }

      if (hasLowerCase.test(password)) {
        strengthByCharacterType += 1;
      }
      if (hasSpecialCharacter.test(password)) {
        strengthByCharacterType += 1;
      }

      totalStrength = strengthByLength + strengthByCharacterType;
    } else {
      totalStrength = 0 ;
    }

    updatedProgressBarStyles.width = `${totalStrength * 10}%`;
    if (totalStrength > 8) {
      updatedProgressBarStyles.backgroundColor = "green";
    } else if (totalStrength > 6) {
      updatedProgressBarStyles.backgroundColor = "orange";
    }

    setStrength(totalStrength);
    setProgressBarStyle(updatedProgressBarStyles);
  }, [password]);

  return (
    <div className="app">
      <h1>Password Strength Checker</h1>
      <input type="text" value={password} onChange={handlePasswordChange} />
      <div className="progress-container">
        <div className="progress-bar" style={{ ...progressBarStyle }} />
      </div>
      <p>Strength of your Password(out of 10 ) is ${strength}</p>
    </div>
  );
}

export default App;
