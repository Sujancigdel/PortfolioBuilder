import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await api.get('/templates');
                setTemplates(res.data);
            } catch (err) {
                console.error('Error fetching templates', err);
                toast.error('Failed to load templates');
            }
        };
        fetchTemplates();
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px' }}>
            <h2>Select a Template</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {templates.map((template) => (
                    <div key={template.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={template.preview_image_url} alt={template.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div style={{ padding: '15px' }}>
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <Link to={`/preview/${template.id}`} className="button" style={{ display: 'inline-block', marginTop: '10px' }}>Preview & Download</Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/dashboard" style={{ display: 'block', marginTop: '20px' }}>Back to Dashboard</Link>
        </div>
    );
};

export default TemplateList;
