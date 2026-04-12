import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, department, message, captchaToken } = body;

    // 1. Captcha Verification
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) return NextResponse.json({ error: "Captcha failed" }, { status: 400 });

    // 2. Email Setup (Hostinger)
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: "no-reply@tuneplusmusic.com", pass: "Zu@1Jeet@12" },
    });

    await transporter.sendMail({
      from: `"TunePlus Contact" <no-reply@tuneplusmusic.com>`,
      to: "supportasia@tuneplusmusic.com",
      replyTo: email,
      subject: `[${department}] ${subject}`,
      html: `<h3>New Message from ${name}</h3><p><strong>Email:</strong> ${email}</p><p><strong>Dept:</strong> ${department}</p><p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error sending mail" }, { status: 500 });
  }
}