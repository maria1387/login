import Signup from "./Signup";
import {useCookies} from "react-cookie"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Login from "./Login";
const Home = () => {
	const [ cookies, setCookie, removeCookie] =useCookies(null)
	const authToken= cookies.AuthToken
	const userEmail = cookies.Email
	const [tasks, setTasks] = useState(null);
  
	
  
	const getData = async (e) => {
		
	  try {
		const response = await fetch(`http://localhost:9000/${userEmail}`);
		const data = await response.json();
  
		setTasks(data);
	  } catch (err) {
		console.error(err);
	  }
	};
	console.log(tasks);
	// Sort by date
	// const sortedTask = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));
  
	useEffect(() => {
	  if(authToken){
		getData()
	  }
	}, []);
	return (
		<div className="app">
			
      {!authToken && <Login/>  }
      {authToken && 
        <>
		<Navbar/>
        <div  getData={getData}>ingresate  A HOME </div>
          
          <p className="user-email">Welcome back</p>
          {/* {sortedTask?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))} */}
        </>
      }
   
    </div>
	)
};

export default Home;
