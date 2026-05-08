import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

const Homepage = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="homepage">
            <nav className="homepage-nav">
                <span className="logo">Portfolio Builder</span>
                <div className="nav-actions">
                    <Link to="/login" className="btn btn-ghost">Login</Link>
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </div>
            </nav>

            <main className="hero">
                <h1>Build Your Professional Portfolio in Minutes</h1>
                <p className="hero-subtitle">
                    Create a stunning portfolio website with our easy to use builder. 
                    Choose from beautiful templates, add your projects, and share with the world.
                </p>
                <div className="hero-actions">
                    <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
                    <Link to="/login" className="btn btn-outline btn-lg">I already have an account</Link>
                </div>
            </main>

            <section className="features">
                <h2>Why Choose Portfolio Builder?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Easy Profile Setup</h3>
                        <p>Add your info, skills, education, and projects in one place.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Beautiful Templates</h3>
                        <p>Choose from multiple professional designs that fit your style.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📦</div>
                        <h3>Download & Deploy</h3>
                        <p>Export your portfolio as a ZIP and host it anywhere.</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to showcase your work?</h2>
                <p>Join thousands of professionals who built their portfolio with us.</p>
                <Link to="/register" className="btn btn-primary btn-lg">Create Your Portfolio</Link>
            </section>

            <footer className="homepage-footer">
                <p>© {new Date().getFullYear()} Portfolio Builder. Build something amazing.</p>
            </footer>
        </div>
    );
};

export default Homepage;
