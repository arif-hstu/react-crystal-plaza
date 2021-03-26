import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';


const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {bedType} = useParams();

    // handle booking
    const handleBlur = (e) => {
    	const newUser = {...loggedInUser};
    	newUser.age = e.target.value;
    	setLoggedInUser(newUser);
    }

   	const userInfo = {
   		name: loggedInUser.displayName,
   		age: parseInt(loggedInUser.age)
   	}
    const handleBook = () => {
    	fetch('http://localhost:5000/', {
    		method: 'POST',
    		body: JSON.stringify(userInfo),
    		headers: {
    			'Content-type': 'application/json'
    		}
    	})
    	.then(res => res.json())
    	.then(data => console.log(data));
    }
    return (
        <div style={{textAlign: 'center'}}>
        	<input onBlur={handleBlur} type='text' placeholder='Your Age' />
        	<button onClick={handleBook}>Book</button>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <h4>name: {loggedInUser.displayName}</h4>
        </div>
    );
};

export default Book;