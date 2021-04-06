import React, {
    useContext,
    useState,
    useEffect
} from 'react';
import {
    Link,
    useParams
} from 'react-router-dom';
import {
    UserContext
} from '../../App';

// import packages for date picker
import DatePicker from '../DatePicker/DatePicker'



const Book = () => {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ageFromDatabase, setAgeFromDatabase] = useState();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {
        bedType
    } = useParams();

    // handle booking
    const handleBlur = (e) => {
        const newUser = {
            ...loggedInUser
        };
        newUser.age = e.target.value;
        setLoggedInUser(newUser);
    }

    const userInfo = {
        name: loggedInUser.displayName,
        age: parseInt(loggedInUser.age),
        checkInDate: selectedDate
    }

    const handleBook = () => {
        fetch(`http://localhost:5000/book/${bedType}`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    // load data from server
    const loadData = () => {
        fetch('http://localhost:5000/bookings')
        .then(res => res.json())
        .then(data => console.log(data))
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <DatePicker date={[selectedDate, setSelectedDate]}/>
            <input onBlur={handleBlur} type='text' placeholder='Your Age' />
            <button onClick={handleBook} > Book </button>
            <h1> Let 's book a {bedType} Room.</h1>
            <p> Want a <Link to="/home"> different room ? </Link>
            </p>
            <h4> name : {loggedInUser.displayName} </h4>
            <button onClick={loadData}>Show Age</button>
            <p>Your age is {ageFromDatabase}</p>

        </div>
    );
};

export default Book;