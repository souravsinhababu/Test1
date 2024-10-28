import { useEffect, useState } from "react";
import axios from 'axios';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.post('http://localhost:5000/users', { name, email });
            setUsers([...users, response.data]);
            setName('');
            setEmail('');
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={addUser}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                /><br />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                /><br />
                <button type="submit">Add User</button>
            </form>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
