// scripts/createUserAndSendLink.js

const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const serviceAccount = require('./serviceAccountKey.json');

// 🔐 Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✉️ Email config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'delphine.cmd@gmail.com',         // TODO: Replace with your sender Gmail
    pass: 'iypucwwnvqyqaltl',            // TODO: Use Gmail App Password (not normal password)
  },
});

// 🧑‍🎓 Target user info
const email = 'monimationgh@gmail.com';      // TODO: Replace with the user you're adding
const password = 'Gimpa123';

async function createUserAndSendLink() {
  try {
    const user = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    const link = await admin.auth().generateEmailVerificationLink(email);

    await transporter.sendMail({
      from: '"GIMPA VLE" <your-email@gmail.com>',   // match your auth user
      to: email,
      subject: 'Verify Your GIMPA VLE Account',
      html: `Welcome to GIMPA VLE.<br><br>
        Click <a href="${link}">here</a> to verify your email.<br><br>
        If you did not request this, you can ignore it.`,
    });

    console.log(`✅ User created and verification email sent to ${email}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createUserAndSendLink();
