import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import './sigincss.css';


const SignIn = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function logIn(e) {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");

        if (email === "admin@gmail.com" && password === "admin11") {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      }) 
      .catch((error) => {
        console.log(error);
        setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
      });
  }

  return (
  
    <div>
      <div className="blue">
        <img className="logo" src="https://media.discordapp.net/attachments/896756748331929643/1213832655745851402/image.png?ex=661bd2c1&is=66095dc1&hm=bb8544d12957fd287c4cd5d9faf51cbe073dff105225ad920db5647fdfd19c55&=&format=webp&quality=lossless" alt="Logo" />
      </div>
      
      <form >
      <p className="reg0"><a href="/signup">Зарегистрироваться</a></p>
        <h2 className="vhod">вход</h2>
        <input className="input1"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input className="input2"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="knopka" onClick={logIn}>Войти в аккаунт</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
      <div className="blue2"></div>
    </div>
  );
};

export default SignIn;