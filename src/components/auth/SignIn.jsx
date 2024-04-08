import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState,useRef,useLayoutEffect,   useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import './sigincss.css';
import logo from '../img/logo.png';
import gsap from 'gsap';



const SignIn = () => {
  const myElement = useRef(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useLayoutEffect(() => {
    const tlbtn = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    
    tlbtn
      .to(".knopka", { rotate: 5 })
      .to(".knopka", { rotate: -5 })
      .to(".knopka", { rotate: 5 })
      .to(".knopka", { rotate: 0 });
  
    tlbtn.restart();
  }, []);
  
  useEffect(() => {
    // Анимация появления ошибки
    gsap.fromTo('.error', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });

    // Анимация для надписи "Вход"
    gsap.fromTo('.vhod', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
  }, [error]);
  function logIn(e) {
    e.preventDefault();

    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов");
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
        setError("Такого аккаунта не существует");
      });
  }

  return (
  
    <div>
      <div className="blue">
      <img className="logo" src={logo} alt="Logo" />


      </div>
      
      <form >
      <p className="reg0"><a href="/signup">Зарегистрироваться</a></p>
        <h2 ref={myElement} className="vhod">вход</h2>
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
        {error ? <p className="error">{error}</p> : ""}
      </form>
      <div className="blue2"></div>
    </div>
  );
};

export default SignIn;
