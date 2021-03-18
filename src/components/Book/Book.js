import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';


const Book = () => {
    const [loggedInUser] = useContext(UserContext);
    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <h4>name: {loggedInUser.displayName}</h4>
        </div>
    );
};

export default Book;