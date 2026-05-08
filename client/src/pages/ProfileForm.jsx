import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfileForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        contactEmail: '',
        linkedinUrl: '',
        githubUrl: '',
        skills: [],
        education: [],
        projects: []
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile');
                setFormData(res.data);
            } catch (err) {
                console.log('Profile not found or error', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper for dynamic fields (skills, edu, projects) - simplified for brevity
    // In a real app, I'd create separate components for each list management
    // For now, I'll assume basic JSON handling or simple inputs for critical path

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.post('/profile', formData);
            toast.success('Profile saved!');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Error saving profile');
            console.error(err);
        }
    };

    // Helpers to add empty items
    const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, { name: '', proficiency: 'Beginner' }] });
    const addEducation = () => setFormData({ ...formData, education: [...formData.education, { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }] });
    const addProject = () => setFormData({ ...formData, projects: [...formData.projects, { title: '', description: '', techStack: '', repoLink: '', liveLink: '' }] });

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
            <p><Link to="/dashboard">← Back to Dashboard</Link></p>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSave}>
                {/* Basic Info */}
                <section>
                    <h3>Basic Info</h3>
                    <div className="form-group"><label>Full Name</label><input name="fullName" value={formData.fullName || ''} onChange={handleChange} required /></div>
                    <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio || ''} onChange={handleChange} /></div>
                    <div className="form-group"><label>Contact Email</label><input name="contactEmail" value={formData.contactEmail || ''} onChange={handleChange} /></div>
                    <div className="form-group"><label>LinkedIn</label><input name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleChange} /></div>
                    <div className="form-group"><label>GitHub</label><input name="githubUrl" value={formData.githubUrl || ''} onChange={handleChange} /></div>
                </section>

                {/* Skills */}
                <section>
                    <h3>Skills</h3>
                    {formData.skills.map((skill, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input placeholder="Skill Name" value={skill.name} onChange={(e) => {
                                const newSkills = [...formData.skills];
                                newSkills[index] = { ...newSkills[index], name: e.target.value };
                                setFormData({ ...formData, skills: newSkills });
                            }} required />
                            <select value={skill.proficiency} onChange={(e) => {
                                const newSkills = [...formData.skills];
                                newSkills[index] = { ...newSkills[index], proficiency: e.target.value };
                                setFormData({ ...formData, skills: newSkills });
                            }}>
                                <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option>
                            </select>
                            <button type="button" onClick={() => {
                                const newSkills = formData.skills.filter((_, i) => i !== index);
                                setFormData({ ...formData, skills: newSkills });
                            }} style={{ width: 'auto', backgroundColor: '#dc3545' }}>X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addSkill} style={{ width: 'auto', marginBottom: '20px' }}>+ Add Skill</button>
                </section>

                {/* Education (Simplified for brevity) */}
                <section>
                    <h3>Education</h3>
                    {formData.education.map((edu, index) => (
                        <div key={index} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                            <input placeholder="Institution" value={edu.institution} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], institution: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                            <input placeholder="Degree" value={edu.degree} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], degree: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                            <input placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], fieldOfStudy: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input type="date" placeholder="Start Date" value={edu.startDate || ''} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], startDate: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                                <input type="date" placeholder="End Date" value={edu.endDate || ''} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], endDate: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                            </div>
                            <textarea placeholder="Description" value={edu.description} onChange={(e) => { const newEdu = [...formData.education]; newEdu[index] = { ...newEdu[index], description: e.target.value }; setFormData({ ...formData, education: newEdu }); }} />
                            <button type="button" onClick={() => { const newEdu = formData.education.filter((_, i) => i !== index); setFormData({ ...formData, education: newEdu }); }} style={{ backgroundColor: '#dc3545', marginTop: '5px' }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addEducation} style={{ width: 'auto', marginBottom: '20px' }}>+ Add Education</button>
                </section>

                {/* Projects (Simplified) */}
                <section>
                    <h3>Projects</h3>
                    {formData.projects.map((proj, index) => (
                        <div key={index} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                            <input placeholder="Title" value={proj.title} onChange={(e) => { const newProj = [...formData.projects]; newProj[index] = { ...newProj[index], title: e.target.value }; setFormData({ ...formData, projects: newProj }); }} />
                            <textarea placeholder="Description" value={proj.description} onChange={(e) => { const newProj = [...formData.projects]; newProj[index] = { ...newProj[index], description: e.target.value }; setFormData({ ...formData, projects: newProj }); }} />
                            <input placeholder="Tech Stack (comma separated)" value={proj.techStack} onChange={(e) => { const newProj = [...formData.projects]; newProj[index] = { ...newProj[index], techStack: e.target.value }; setFormData({ ...formData, projects: newProj }); }} />
                            <input placeholder="Repo Link" value={proj.repoLink} onChange={(e) => { const newProj = [...formData.projects]; newProj[index] = { ...newProj[index], repoLink: e.target.value }; setFormData({ ...formData, projects: newProj }); }} />
                            <input placeholder="Live Link" value={proj.liveLink} onChange={(e) => { const newProj = [...formData.projects]; newProj[index] = { ...newProj[index], liveLink: e.target.value }; setFormData({ ...formData, projects: newProj }); }} />
                            <button type="button" onClick={() => { const newProj = formData.projects.filter((_, i) => i !== index); setFormData({ ...formData, projects: newProj }); }} style={{ backgroundColor: '#dc3545', marginTop: '5px' }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addProject} style={{ width: 'auto', marginBottom: '20px' }}>+ Add Project</button>
                </section>

                <button type="submit" style={{ marginTop: '20px' }}>Save Profile</button>
            </form>
        </div>
    );
};

export default ProfileForm;
