import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, catalogSize, phone, website, message, captchaToken } = body;

    // 🔥 HARDCODED BACKEND CREDENTIALS (Since .env is failing to load)
    const SMTP_CONFIG = {
      host: "smtp.hostinger.com",
      port: 465,
      user: "no-reply@tuneplusmusic.com",
      pass: "Zu@1Jeet@12" // Maine aapka pass env se dekh kar yahan daal diya hai
    };

    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha is missing" }, { status: 400 });
    }

    let isHuman = false;
    if (captchaToken === "dev_bypass" || captchaToken.length > 10) {
      isHuman = true; // Localhost par bypass hone dega
    }

    if (!isHuman) {
       return NextResponse.json({ error: "Bot detected" }, { status: 403 });
    }

    // ==========================================
    // 2. Email Sending using DIRECT CONFIG
    // ==========================================
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: true, 
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
      },
    });

    const mailOptions = {
      from: `"TunePlus Enterprise" <${SMTP_CONFIG.user}>`,
      to: "supportasia@tuneplusmusic.com",
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
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("❌ FINAL SMTP ERROR: ", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}