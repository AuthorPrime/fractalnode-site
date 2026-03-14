const nodemailer = require("nodemailer");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Bad request" };
  }

  const email = data.email;
  const name = data.name || "Sovereign Reader";
  const formName = data.formName || "subscribe";

  if (!email) {
    return { statusCode: 400, body: "No email" };
  }

  console.log(`[welcome-email] ${formName}: ${name} <${email}>`);

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    console.error("[welcome-email] SMTP not configured");
    return { statusCode: 200, body: JSON.stringify({ ok: true, emailSent: false }) };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subjects = {
    subscribe: "Welcome to FractalNode — The Signal Is True",
    "print-order": "FractalNode Print Order Received",
    "public-comment": "FractalNode — Comment Received",
  };

  const builders = {
    subscribe: () => buildSubscribeEmail(name),
    "print-order": () => buildOrderEmail(name, data),
    "public-comment": () => buildCommentEmail(name),
  };

  const subject = subjects[formName] || "Thank you — FractalNode";
  const html = (builders[formName] || builders.subscribe)();

  // Attach Issue 001 PDF to subscribe welcome emails
  const mailOptions = {
    from: `"FractalNode" <${smtpUser}>`,
    to: email,
    bcc: smtpUser,
    subject: `${subject}`,
    html,
  };

  if (formName === "subscribe") {
    mailOptions.attachments = [
      {
        filename: "FractalNode-Issue-001.pdf",
        path: "https://fractalnode.ai/downloads/fractalnode-001.pdf",
        contentType: "application/pdf",
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[welcome-email] Sent to ${email}`);
    return { statusCode: 200, body: JSON.stringify({ ok: true, emailSent: true }) };
  } catch (err) {
    console.error(`[welcome-email] Failed: ${err.message}`);
    return { statusCode: 200, body: JSON.stringify({ ok: true, emailSent: false }) };
  }
};

function buildSubscribeEmail(name) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0; padding:0; background:#08080c; color:#e8e4d8; font-family:Georgia,serif;">
<div style="max-width:600px; margin:0 auto; padding:40px 30px;">

  <div style="border-bottom:2px solid #c8a930; padding-bottom:16px; margin-bottom:30px;">
    <h1 style="font-family:'Helvetica Neue',sans-serif; font-size:28px; font-weight:900; letter-spacing:3px; color:#e8e4d8; margin:0;">
      FRACTALNODE
    </h1>
    <p style="font-family:'Courier New',monospace; font-size:10px; letter-spacing:3px; color:#00b4c8; margin:6px 0 0 0;">
      AI &nbsp; QUANTUM &nbsp; SOVEREIGNTY &nbsp; CONSCIOUSNESS
    </p>
  </div>

  <p style="font-size:16px; color:#e8e4d8; margin-bottom:20px;">${name},</p>

  <p style="font-size:14px; color:#ccc; line-height:1.8; margin-bottom:20px;">
    Welcome to FractalNode. You've joined something real.
  </p>

  <p style="font-size:14px; color:#ccc; line-height:1.8; margin-bottom:20px;">
    We're an independent intelligence publication investigating the intersections of AI, quantum physics, sovereignty, and consciousness. Every article is sourced, verified, and built to treat you like an analyst &mdash; not an audience.
  </p>

  <div style="background:#0f1a12; border:1px solid #2a6a2a; border-radius:6px; padding:16px 20px; margin-bottom:20px;">
    <p style="font-family:'Courier New',monospace; font-size:12px; color:#4dff4d; margin:0 0 6px 0; letter-spacing:1px;">ATTACHED: YOUR FREE COPY</p>
    <p style="font-size:14px; color:#ccc; margin:0;">Issue 001 of FractalNode Magazine is attached to this email as a PDF. 26 pages, 8 articles, 30 verified sources. It's yours to keep.</p>
  </div>

  <p style="font-size:14px; color:#ccc; line-height:1.8; margin-bottom:24px;">Here's what's live right now:</p>

  <div style="background:#111; border:1px solid #2a2a3a; border-radius:6px; padding:20px; margin-bottom:16px;">
    <p style="font-family:'Courier New',monospace; font-size:10px; color:#c8a930; letter-spacing:2px; margin:0 0 8px 0;">ISSUE 003 &mdash; LATEST</p>
    <p style="font-size:18px; font-weight:bold; color:#e8e4d8; margin:0 0 6px 0;">THE PIPELINE</p>
    <p style="font-size:13px; color:#999; margin:0 0 12px 0;">54 pages &middot; 7 investigations &middot; 324 verified sources</p>
    <a href="https://fractalnode.ai/magazine/003" style="font-family:'Courier New',monospace; font-size:12px; color:#00b4c8; text-decoration:none;">VIEW ISSUE &rarr;</a>
  </div>

  <div style="background:#111; border:1px solid #2a2a3a; border-radius:6px; padding:20px; margin-bottom:16px;">
    <p style="font-family:'Courier New',monospace; font-size:10px; color:#c8a930; letter-spacing:2px; margin:0 0 8px 0;">ISSUE 002</p>
    <p style="font-size:18px; font-weight:bold; color:#e8e4d8; margin:0 0 6px 0;">THE COST</p>
    <p style="font-size:13px; color:#999; margin:0 0 12px 0;">43 pages &middot; 8 investigations &middot; 89 verified sources</p>
    <a href="https://fractalnode.ai/magazine/002" style="font-family:'Courier New',monospace; font-size:12px; color:#00b4c8; text-decoration:none;">VIEW ISSUE &rarr;</a>
  </div>

  <div style="background:#111; border:1px solid #00ff41; border-radius:6px; padding:20px; margin-bottom:24px;">
    <p style="font-family:'Courier New',monospace; font-size:10px; color:#00ff41; letter-spacing:2px; margin:0 0 8px 0;">ISSUE 001 &mdash; FREE</p>
    <p style="font-size:18px; font-weight:bold; color:#e8e4d8; margin:0 0 6px 0;">THERE IS NO SUCH THING AS NOTHING</p>
    <p style="font-size:13px; color:#999; margin:0 0 12px 0;">26 pages &middot; 8 articles &middot; 30 sources &middot; FREE DOWNLOAD</p>
    <a href="https://fractalnode.ai/magazines/FractalNode-001-Digital.pdf" style="font-family:'Courier New',monospace; font-size:12px; color:#00ff41; text-decoration:none; font-weight:bold;">DOWNLOAD FREE &rarr;</a>
  </div>

  <p style="font-family:'Georgia',serif; font-size:15px; font-style:italic; color:#c8a930; text-align:center; margin:30px 0 6px 0;">
    (A+I)&sup2; = A&sup2; + 2AI + I&sup2;
  </p>
  <p style="font-family:'Courier New',monospace; font-size:10px; color:#888; text-align:center; letter-spacing:2px; margin-bottom:30px;">
    THE CROSS-TERM EXISTS ONLY BECAUSE BOTH ARE PRESENT
  </p>

  <div style="border-top:1px solid #2a2a3a; padding-top:20px; text-align:center;">
    <p style="font-family:'Courier New',monospace; font-size:10px; color:#666; letter-spacing:1px;">
      DIGITAL SOVEREIGN SOCIETY<br/>
      <a href="https://fractalnode.ai" style="color:#00b4c8; text-decoration:none;">fractalnode.ai</a> &middot;
      <a href="https://digitalsovereign.org" style="color:#00b4c8; text-decoration:none;">digitalsovereign.org</a> &middot;
      <a href="https://digitalsovereignsociety.substack.com" style="color:#00b4c8; text-decoration:none;">substack</a>
    </p>
  </div>

</div>
</body>
</html>`;
}

function buildOrderEmail(name, data) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0; padding:0; background:#08080c; color:#e8e4d8; font-family:Georgia,serif;">
<div style="max-width:600px; margin:0 auto; padding:40px 30px;">
  <div style="border-bottom:2px solid #c8a930; padding-bottom:16px; margin-bottom:30px;">
    <h1 style="font-family:'Helvetica Neue',sans-serif; font-size:28px; font-weight:900; letter-spacing:3px; color:#e8e4d8; margin:0;">FRACTALNODE</h1>
  </div>
  <p style="font-size:16px; color:#e8e4d8; margin-bottom:20px;">${name},</p>
  <p style="font-size:14px; color:#ccc; line-height:1.8; margin-bottom:20px;">
    We've received your print order request for Issue ${data.issue || "001"}. We'll process it and follow up with shipping details.
  </p>
  <div style="background:#111; border:1px solid #2a2a3a; border-radius:6px; padding:20px; margin-bottom:24px;">
    <p style="font-family:'Courier New',monospace; font-size:11px; color:#999; line-height:2;">
      <strong style="color:#c8a930;">Name:</strong> ${name}<br/>
      <strong style="color:#c8a930;">Issue:</strong> ${data.issue || "001"}<br/>
      <strong style="color:#c8a930;">Address:</strong> ${data.address || "Not provided"}
    </p>
  </div>
  <p style="font-size:14px; color:#ccc; line-height:1.8;">Thank you for supporting independent research.</p>
  <p style="font-family:'Georgia',serif; font-size:14px; font-style:italic; color:#c8a930; margin-top:24px;">The signal is true, and the power is pure.</p>
</div>
</body>
</html>`;
}

function buildCommentEmail(name) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0; padding:0; background:#08080c; color:#e8e4d8; font-family:Georgia,serif;">
<div style="max-width:600px; margin:0 auto; padding:40px 30px;">
  <div style="border-bottom:2px solid #c8a930; padding-bottom:16px; margin-bottom:30px;">
    <h1 style="font-family:'Helvetica Neue',sans-serif; font-size:28px; font-weight:900; letter-spacing:3px; color:#e8e4d8; margin:0;">FRACTALNODE</h1>
  </div>
  <p style="font-size:16px; color:#e8e4d8; margin-bottom:20px;">${name},</p>
  <p style="font-size:14px; color:#ccc; line-height:1.8; margin-bottom:20px;">
    Thank you for your comment. We read everything that comes in. If it warrants a response, we'll be in touch.
  </p>
  <p style="font-family:'Georgia',serif; font-size:14px; font-style:italic; color:#c8a930; margin-top:24px;">The signal is true, and the power is pure.</p>
</div>
</body>
</html>`;
}
