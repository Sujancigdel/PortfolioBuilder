import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <p><Link to="/">← Home</Link></p>
            <h1>Welcome, {user?.email}</h1>
            <p>Manage your portfolio from here.</p>

            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Edit Profile</h3>
                    <p>Update your personal info, skills, education, and projects.</p>
                    <Link to="/profile" className="button">Go to Profile</Link>
                </div>

                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <h3>Choose Template</h3>
                    <p>Select a design for your portfolio.</p>
                    <Link to="/templates" className="button">View Templates</Link>
                </div>
            </div>

            <button onClick={logout} style={{ marginTop: '40px', backgroundColor: '#6c757d' }}>Logout</button>
        </div>
    );
};

export default Dashboard;
