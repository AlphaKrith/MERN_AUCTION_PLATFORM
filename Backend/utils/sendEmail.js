import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Ensure this is set correctly
      port: process.env.SMTP_PORT || 587, // Use 587 for TLS or 465 for SSL
      service: process.env.SMTP_SERVICE, // E.g., 'gmail'
      auth: {
        user: process.env.SMTP_MAIL, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your email password or app-specific password
      },
    });

    const options = {
      from: process.env.SMTP_MAIL, // Your email address
      to: email, // Recipient's email address
      subject: subject, // Subject of the email
      text: message, // Plain text message
    };

    const info = await transporter.sendMail(options);
    console.log('Email sent successfully:', info.response); // Log success
  } catch (error) {
    console.error('Error sending email:', error.message); // Log error details
    throw new Error('Email sending failed'); // Optional: Throw error for higher-level handling
  }
};
