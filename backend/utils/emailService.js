const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_HOST,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_HOST}>`,
            to,
            subject,
            text,
            html
        });
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = { sendEmail };