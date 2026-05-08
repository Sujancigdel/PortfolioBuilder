import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Handlebars from 'handlebars';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

const TemplatePreview = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState(null);
    const [profile, setProfile] = useState(null);
    const [previewHtml, setPreviewHtml] = useState('');
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tmplRes, profRes] = await Promise.all([
                    api.get(`/templates/${id}`),
                    api.get('/profile')
                ]);
                setTemplate(tmplRes.data);
                setProfile(profRes.data);
            } catch (err) {
                console.error('Error fetching data for preview', err);
                setLoadError(true);
                toast.error(err.response?.data?.message || 'Failed to load preview');
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (template && profile) {
            try {
                const compile = Handlebars.compile(template.html_structure);
                let html = compile(profile);
                const css = (template.css_styles || '').trim();

                // Inject CSS BEFORE sanitization - DOMPurify strips <head>/<body> by default,
                // so we must inject while the full document structure still exists
                // Replace the external stylesheet link (style.css doesn't exist in iframe srcDoc)
                html = html.replace(
                    /<link[^>]+href=["']style\.css["'][^>]*>/gi,
                    `<style>${css}</style>`
                );
                // Fallback: inject before </head> if no style.css link
                if (!html.includes('<style>') && html.includes('</head>')) {
                    html = html.replace('</head>', `<style>${css}</style></head>`);
                }

                // Make links open in new tab (otherwise they navigate inside the iframe)
                html = html.replace(/<a (?![^>]*\btarget=)/gi, '<a target="_blank" rel="noopener noreferrer" ');

                // WHOLE_DOCUMENT preserves html, head, body - otherwise DOMPurify strips them
                // ADD_ATTR: ['target'] - DOMPurify strips target by default; we need it for links to open in new tab
                // (otherwise links navigate inside iframe, and github/linkedin refuse to be embedded)
                const cleanHtml = DOMPurify.sanitize(html, {
                    WHOLE_DOCUMENT: true,
                    ADD_ATTR: ['target']
                });

                setPreviewHtml(cleanHtml);
            } catch (e) {
                console.error('Handlebars compile error', e);
            }
        }
    }, [template, profile]);

    const handleDownload = async () => {
        try {
            const response = await api.get(`/export/download/${id}`, {
                responseType: 'blob', // Important for binary data
            });

            // Create a link to download the zip
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${profile.fullName.replace(/\s+/g, '_')}_portfolio.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Download started!');
        } catch (err) {
            console.error('Download failed', err);
            toast.error('Download failed');
        }
    };

    if (loadError) return <div style={{ padding: '40px', textAlign: 'center' }}><p>Failed to load preview. <Link to="/templates">Back to Templates</Link></p></div>;
    if (!template || !profile) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Preview...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Link to="/templates" style={{ color: 'white', marginRight: '20px' }}>&lt; Back to Templates</Link>
                    <strong>Preview: {template.name}</strong>
                </div>
                <button onClick={handleDownload} style={{ backgroundColor: '#28a745', width: 'auto' }}>Download ZIP</button>
            </div>
            <div style={{ flex: 1, border: 'none' }}>
                <iframe
                    srcDoc={previewHtml}
                    title="Preview"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
            </div>
        </div>
    );
};

export default TemplatePreview;
