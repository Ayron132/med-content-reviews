import React from "react";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bem-vindo</h1>
        <p style={styles.subtitle}>Faça login para continuar</p>
        <button style={styles.button} onClick={handleGoogleLogin}>
          Login com Google
        </button>
      </div>
    </div>
  );
};


export default Login;
