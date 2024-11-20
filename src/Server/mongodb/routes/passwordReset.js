const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

router.post('/', async (req, res) => {
    console.log('Received password reset request:', req.body);

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const resetToken = generateToken();
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();

        const transporterOptions = {
            host: 'smtp.walla.co.il',
            port: 25, // Using port 25
            secure: false, // Port 25 usually doesn't use SSL/TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            logger: true,
            debug: true,
            timeout: 60000,
        };

        const transporter = nodemailer.createTransport(transporterOptions);

        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `
Hello ${user.name || 'User'},

You requested a password reset. Click the link below to reset your password:
${resetURL}

Your current password is: ${user.password}

If you did not request this, please ignore this email.
            `,
            html: `
                <p>Hello <strong>${user.name || 'User'}</strong>,</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <p><a href="${resetURL}">${resetURL}</a></p>
                <p>Your current password is: <strong>${user.password}</strong></p>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };

        transporter.verify((error) => {
            if (error) {
                console.error('SMTP connection failed:', error);
                return res.status(500).json({ message: 'SMTP server connection failed.' });
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending email:', err);
                    return res.status(500).json({ message: 'Failed to send email.' });
                }

                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'Password reset email sent.' });
            });
        });
    } catch (error) {
        console.error('Error in password reset:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
});

module.exports = router;
