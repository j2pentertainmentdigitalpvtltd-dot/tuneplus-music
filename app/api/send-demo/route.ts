import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, catalogSize, phone, website, message, captchaToken } = body;

    // 1. Google reCAPTCHA v3 Verification
    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha is missing" }, { status: 400 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });
    
    const verifyData = await verifyRes.json();
    
    // v3 Score Logic (0.5 se upar human hota hai)
    if (!verifyData.success || verifyData.score < 0.5) {
      console.log("Bot blocked! Score:", verifyData.score);
      return NextResponse.json({ error: "Bot detected by Google v3" }, { status: 403 });
    }

    // 2. Email Sending (Agar Human verified ho gaya)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"TunePlus Enterprise" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || "supportasia@tuneplusmusic.com",
      replyTo: email,
      subject: `Enterprise Demo Request: ${company}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #06b6d4;">New Enterprise Demo Request</h2>
          <hr style="border: 1px solid #ddd;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Website:</strong> ${website || 'N/A'}</p>
          <p><strong>Catalog Size:</strong> ${catalogSize}</p>
          <p><strong>Requirements:</strong><br/>${message}</p>
          <p style="color: green; font-size: 12px; margin-top: 20px;">✓ Passed Google v3 Security Check (Score: ${verifyData.score})</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("❌ Hostinger SMTP Error Details: ", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}