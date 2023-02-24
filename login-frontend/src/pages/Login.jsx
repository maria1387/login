import { useState } from "react";
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
const Login = () => {
	const navigate = useNavigate();
	const [ cookies, setCookie, removeCookie] =useCookies(null)

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(null)
  
//   console.log(cookies)
  
	
  
	const handleSumit = async (e) => {
	  e.preventDefault();
	  
	  const response = await fetch(`http://localhost:9000/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	  });
	  navigate('/')
	  const data = await response.json();
	 
	 if(data.detail){
		setError(data.detail)
		
  }else{
	  setCookie('email', data.email)
	  setCookie('AuthToken', data.token)
	 
	  window.location.reload()
  }
	};
	return (
		<div className="auth-container">
		<div className="auth-container-box">
		  <form action="">
			<h2>login</h2>
			<input
			  type="email"
			  placeholder="email"
			  onChange={(e) => setEmail(e.target.value)}
			/>
			<input
			  type="password"
			  placeholder="password"
			  onChange={(e) => setPassword(e.target.value)}
			/>
			
			  
			<input
			  type="submit"
			  className="create"
			  onClick={handleSumit}
			/>
			
			{error && <p>{error}</p>}
		  </form>
		   <p onClick={() => navigate(`/forgotpassword`)}>recuperar contraseña</p>

        <p onClick={() => navigate(`/signup`)}>Crear CUENTA</p>
		</div>
	  </div>
	
	)
};

export default Login;
