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
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #007BFF;
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #0d6efd;
                    color: white;
                    text-align:center;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://res.cloudinary.com/dyiijtk2j/image/upload/v1723660190/rentersLogo_mpe44j.png" alt="Renters Logo">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.firstName}</p>
                    <p>You have requested to reset your password for your Storefleet account. To reset your password, please click the button below:</p>
                    <p><a class="button" href="/api/users/resetPassword/${resetPasswordURL}">Reset Password</a></p>
                    <p>If you did not request a password reset, please ignore this email.</p>
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
