import { useState } from "react";
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
const Signup = () => {
	const navigate = useNavigate();
	const [ cookies, setCookie, removeCookie] =useCookies(null)

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [error, setError] = useState(null);
  
//   console.log(cookies)
  
	
  
	const handleSumit = async (e) => {
	  e.preventDefault();
	  if (password !== confirmPassword) {
		setError("no coincide la contraseña!");
		return;
	  }
  
	  const response = await fetch(`http://localhost:9000/signup`, {
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
			<h2>register</h2>
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
				type="password"
				placeholder=" confirm password"
				onChange={(e) => setConfirmPassword(e.target.value)}
			  />
		  
			<input
			  type="submit"
			  className="create"
			  onClick={(e) => handleSumit(e)}
			/>
			{error && <p>{error}</p>}
		  </form>
		  <p onClick={() => navigate(`/login`)}>volver</p>
		</div>
	  </div>
	)
};

export default Signup;
