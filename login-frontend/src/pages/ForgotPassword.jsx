import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState(null);

	const handleSumit = async (e) => {
		e.preventDefault();
		
		}
	return (
		<div>
			  <form >
			<h2>RECUPERA CONTRASEÑA</h2>
			<input
			  type="email"
			  placeholder="email"
			  onChange={(e) => setEmail(e.target.value)}
			/>
			<input
			  type="submit"
			  className="create"
			  onClick={(e) => handleSumit(e)}
			/>
			 <p onClick={() => navigate(`/login`)}>volver</p>
			 </form>
		</div>
	)
};

export default ForgotPassword;
