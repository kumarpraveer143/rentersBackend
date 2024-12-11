import nodemailer from "nodemailer";

const sendWelcomeEmail = async (newUser) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.RENTERS_SMPT_MAIL,
      pass: process.env.RENTERS_SMPT_MAIL_PASSWORD,
    },
  });

  const emailContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            padding: 20px;
            text-align: center;
        }
        .header img {
            width: 50px;
            height: auto;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img
          src="https://res.cloudinary.com/dyiijtk2j/image/upload/v1723660190/rentersLogo_mpe44j.png"
          alt="R Logo"
          style="width: 200px"
        />
            <h1>Welcome to Our Renter's Community!</h1>
        </div>
        <div class="content">
            <p>Dear ${newUser.name},</p>
            <p>We are thrilled to welcome you to our community! Your application has been received, and we are excited to help you find the perfect place to call home.</p>
            <p>If you have any questions, feel free to reach out to us at any time. We are here to assist you every step of the way.</p>
            <p>Thank you for choosing us!</p>
            <p>Best Regards,</p>
            <p>The Team</p>
        </div>
        <div class="footer">
            <p>Developed by Praveer</p>
        </div>
    </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.RENTERS_SMPT_MAIL,
    to: newUser.email,
    subject: "Welcome to Renters",
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent successfully!");
  });
};

export default sendWelcomeEmail;
