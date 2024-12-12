import nodemailer from "nodemailer";

const sendPasswordResetEmail = async (user, resetPasswordURL) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.RENTERS_SMPT_MAIL,
      pass: process.env.RENTERS_SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.RENTERS_SMPT_MAIL,
    to: user.email,
    subject: "Password Reset",
    html: `
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
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header img {
            max-width: 120px;
            margin-bottom: 10px;
        }
        .header h1 {
            color: white;
            font-size: 24px;
            margin: 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            line-height: 1.5;
        }
        .content p {
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            background-color: #0d6efd;
            color: white;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        a{
            text-decoration:none;
            color:white;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #777;
        }
        @media only screen and (max-width: 600px) {
            .container {
                padding: 15px;
            }
            .header img {
                max-width: 100px;
            }
            .content p {
                font-size: 14px;
            }
            .button {
                display: block;
                width: 100%;
                text-align: center;
                padding: 12px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dyiijtk2j/image/upload/v1723660190/rentersLogo_mpe44j.png" alt="Renters Logo">
            <h1>Password Reset</h1>
        </div>
        <div class="content">
            <p>Hello, ${user.firstName},</p>
            <p>You have requested to reset your password for your Storefleet account. To reset your password, please click the button below:</p>
            <p><a class="button" href="http://localhost:5173/reset/${resetPasswordURL}">Reset Password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Storefleet. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Email sent successfully!");
  });
};

export default sendPasswordResetEmail;
