import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import './sigincss.css';
import gsap from 'gsap';
import logo from '../img/logo.png';

const SignUp = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");

  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Пароли не совпадают");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
        navigate("/home");
      })
      .catch((error) => console.log(error));
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  useEffect(() => {
    // Анимация для надписи "Вход"
    gsap.fromTo('.regg', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, delay: 0, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    // Анимация появления ошибки
    if (error) {
      gsap.fromTo('.error0', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  }, [error]);

  useEffect(() => {
    if (!isChecked) return; // Не запускать анимацию, если кнопка не активна
    const tlbtn = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    tlbtn
      .to(".knopka1", { rotate: 5 })
      .to(".knopka1", { rotate: -5 })
      .to(".knopka1", { rotate: 5 })
      .to(".knopka1", { rotate: 0 });
  }, [isChecked]);

  return (
    <div>
      <p className="reg"><a href="/signin">Войти</a></p>
      <div className="blue">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="blue2"></div>
      <form onSubmit={register}>
        <h2 className="regg">РЕГИСТРАЦИЯ</h2>
        <input className="input0"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input className="input1"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <input className="input2"
          placeholder="Пароль"
          value={copyPassword}
          onChange={(e) => setCopyPassword(e.target.value)}
          type="password"
        />
        <p className="zakon">Нажимая на данную кнопку, в соответствии с п. 4 ст. 9 Федерального закона от 27.07.2006 N 152-ФЗ «О персональных данных», Вы даете согласие на обработку своих персональных данных и (или) персональных
данных представляемого лица.</p>
        <input
          type="checkbox"
          className="galka"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button className={isChecked ? 'knopka1' : 'inactiveButton'}
          onClick={handleButtonClick}
          disabled={!isChecked}
        >Зарегистрироваться</button>
        {error ? <p className="error0" style={{ color: "red" }}>{error}</p> : ""}
      </form>
    </div>
  );
};

export default SignUp;
