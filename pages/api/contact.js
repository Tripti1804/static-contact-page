// pages/api/contact.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email,contact, message } = req.body;

        // Here you would typically handle the form data, e.g., save it to a database or send an email
        console.log('Received contact form submission:', { name, email,contact, message });

        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
