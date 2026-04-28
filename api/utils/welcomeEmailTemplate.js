const escapeHTML = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createBaseLayout = (title, subtitle, icon, nameDisplay, bodyContent) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]><style type="text/css">table {border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}</style><![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
    
    <!-- Block 1: Dark Header -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 24px 32px; border-radius: 0 0 12px 12px;">
      <tr>
        <td align="left" style="vertical-align: middle;">
          <div style="display: inline-block; background-color: #10b981; color: white; border-radius: 8px; width: 32px; height: 32px; text-align: center; line-height: 32px; font-weight: bold; font-size: 18px; font-family: sans-serif; margin-right: 12px; vertical-align: middle;">A</div>
          <span style="color: #ffffff; font-size: 20px; font-weight: 600; vertical-align: middle;">AvenirCore</span>
        </td>
      </tr>
    </table>

    <!-- Block 2: Hero Box -->
    <div style="padding: 32px 32px 16px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; padding: 24px;">
        <tr>
          <td>
            <div style="color: #10b981; font-size: 24px; margin-bottom: 8px;">${icon}</div>
            <h1 style="margin: 0 0 8px 0; color: #064e3b; font-size: 24px; font-weight: 700; line-height: 1.3;">${title}</h1>
            <p style="margin: 0; color: #047857; font-size: 16px; font-weight: 500;">${subtitle}</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Block 3: Greeting & Body -->
    <div style="padding: 16px 32px;">
      <p style="margin: 0 0 16px 0; font-size: 16px; color: #334155; font-weight: 600;">Hi ${nameDisplay},</p>
      <div style="margin: 0; font-size: 16px; color: #475569; line-height: 1.6;">
        ${bodyContent}
      </div>
    </div>

    <!-- Block 4: Footer -->
    <div style="padding: 32px 32px 48px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="border-top: 1px solid #e2e8f0; padding-top: 24px;"></td></tr>
      </table>
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        You're receiving this because you signed up at avenircore.com. We respect your inbox.<br/>
        If you change your mind, you can unsubscribe below.<br/><br/>
        &copy; ${new Date().getFullYear()} AvenirCore. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>`;

export function generateGeneralWelcomeEmail(firstName) {
  const nameDisplay = firstName ? escapeHTML(firstName) : 'there';
  
  const bodyContent = `
    <p style="margin: 0 0 16px 0;">Welcome to AvenirCore — you've just joined a small but growing community of parents and teachers who believe kids deserve honest, safe AI education.</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1e293b;">📘 Kids & AI Activity Workbook</h3>
      <p style="margin: 0 0 20px 0; font-size: 15px; color: #64748b; line-height: 1.5;">12 pages of activities, conversation starters, and myth-busters designed for ages 6–14. Save it, print it, share it.</p>
      <a href="https://avenircore.com/avenircore-kids-ai-workbook.pdf" style="display: inline-block; padding: 12px 24px; color: #ffffff; background-color: #10b981; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">Download your free workbook</a>
    </div>

    <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">What to expect from us:</h3>
    <p style="margin: 0 0 16px 0;">Over the next few days, we'll share a few things that are actually useful — starting with your child's first AI literacy story (it's free, no login needed, and takes about 5 minutes).</p>
    <p style="margin: 0;">No spam. No daily emails. Just good stuff, when it matters.</p>
  `;

  return createBaseLayout(
    "You're in — welcome to AvenirCore.",
    "Honest, safe AI education for kids ages 6–14.",
    "🌱",
    nameDisplay,
    bodyContent
  );
}

export function generateRoleSpecificEmail(role, firstName) {
  const nameDisplay = firstName ? escapeHTML(firstName) : 'there';
  let title = '';
  let subtitle = '';
  let icon = '';
  let bodyContent = '';

  if (role === 'teacher' || role === 'educator') {
    title = "Your first AI idea is on its way.";
    subtitle = "Practical classroom resources without the hype.";
    icon = "🍎";
    bodyContent = `
      <p style="margin: 0 0 16px 0;">Welcome to Avenircore — really glad you're here.</p>
      <p style="margin: 0 0 16px 0;">You just joined a growing group of teachers who are figuring out AI in the classroom without the hype or the overwhelm. That's exactly what this newsletter is for.</p>
      
      <h3 style="margin: 24px 0 12px 0; font-size: 18px; color: #1e293b;">Here's what you'll get every week:</h3>
      <p style="margin: 0 0 16px 0;">One practical AI idea you can use in your classroom the following day. No jargon, no lengthy explainers — just something concrete that saves you time or opens up something new for your students.</p>
      <p style="margin: 0 0 24px 0;">Think: a prompt that generates a differentiated reading task in 30 seconds, a tool that writes your rubric while you make coffee, a way to use AI to spark a class debate about technology itself.</p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">To get you started right now:</h3>
      <p style="margin: 0 0 8px 0;">→ <a href="https://avenircore.com/blog/teachers-ai-guide" style="color: #10b981; font-weight: 600; text-decoration: none;">How teachers can use AI in the classroom — the complete guide</a><br/>
      <span style="font-size: 14px; color: #64748b;">This is the most popular article on the site. It covers the practical starting points, which tools are worth your time, and how to introduce AI to students at any level.</span></p>
      
      <p style="margin: 0 0 24px 0;">→ <a href="https://avenircore.com/workbook" style="color: #10b981; font-weight: 600; text-decoration: none;">The Kids AI Workbook — printable classroom activity</a><br/>
      <span style="font-size: 14px; color: #64748b;">A structured activity you can use with students to explore AI together. Teachers tell me it sparks some of the best class discussions they've had.</span></p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">One thing before you go:</h3>
      <p style="margin: 0 0 24px 0;">Reply to this email and tell me: what's the one AI question your students keep asking that you're not sure how to answer? I read every reply and it shapes what I write each week.</p>
      
      <p style="margin: 0 0 4px 0;">Speak soon,</p>
      <p style="margin: 0;"><strong>John</strong><br/>Founder, Avenircore</p>
    `;
  } else if (role === 'parent') {
    title = "You're doing the right thing.";
    subtitle = "Navigating AI with your children, step by step.";
    icon = "🏡";
    bodyContent = `
      <p style="margin: 0 0 16px 0;">Welcome — and genuinely, thank you for being here.</p>
      <p style="margin: 0 0 16px 0;">The fact that you looked up "how do I talk to my child about AI" or "is AI safe for kids" tells me you're already ahead of most parents. You're curious, not panicked. That's exactly the right starting point.</p>
      <p style="margin: 0 0 24px 0;">Avenircore exists for parents like you. Each week I send one practical tip for navigating AI with your children — age-appropriate, honest, and written by someone who cares about kids getting this right.</p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">Here's what to expect:</h3>
      <p style="margin: 0 0 24px 0;">Every week, one email. It might be a conversation starter for the dinner table, a question to ask your child's teacher, a tool worth knowing about, or a concern worth understanding. Always short. Always useful.</p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">To start you off:</h3>
      <p style="margin: 0 0 8px 0;">→ <a href="https://avenircore.com/blog/how-to-talk-to-kids-about-ai" style="color: #10b981; font-weight: 600; text-decoration: none;">How to talk to your kids about AI — an age-by-age guide</a><br/>
      <span style="font-size: 14px; color: #64748b;">This is the article most parents tell me they wish they'd found sooner. It gives you the actual words to use, by age group, so you're not winging it.</span></p>
      
      <p style="margin: 0 0 24px 0;">→ <a href="https://avenircore.com/blog/is-ai-safe-for-kids" style="color: #10b981; font-weight: 600; text-decoration: none;">Is AI safe for kids? What parents actually need to know</a><br/>
      <span style="font-size: 14px; color: #64748b;">Cuts through the fear and the hype. What the real risks are, what they aren't, and what you can do at home.</span></p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">A quick note from me:</h3>
      <p style="margin: 0 0 16px 0;">I'm John — I started Avenircore because I believe the children who thrive with AI won't be the ones who used it the most. They'll be the ones whose parents and teachers helped them understand it, question it, and use it thoughtfully.</p>
      <p style="margin: 0 0 24px 0;">This newsletter is my way of helping that happen, one family at a time.</p>
      
      <p style="margin: 0 0 24px 0;">Reply any time — I read every message.</p>
      <p style="margin: 0;"><strong>John</strong><br/>Founder, Avenircore</p>
    `;
  } else {
    // General
    title = "AI and kids, explained simply.";
    subtitle = "Weekly ideas for navigating AI with children.";
    icon = "✨";
    bodyContent = `
      <p style="margin: 0 0 16px 0;">Welcome to Avenircore.</p>
      <p style="margin: 0 0 16px 0;">Whether you're a teacher, a parent, or simply someone who cares about children growing up well in an AI world — you're in the right place.</p>
      <p style="margin: 0 0 24px 0;">Each week I send one short, practical idea for navigating AI with kids. No hype, no panic — just honest, useful guidance from someone building this resource one article at a time.</p>
      
      <h3 style="margin: 0 0 12px 0; font-size: 18px; color: #1e293b;">Start here:</h3>
      <p style="margin: 0 0 8px 0;">→ <a href="https://avenircore.com/blog/free-ai-tools-for-kids-2026" style="color: #10b981; font-weight: 600; text-decoration: none;">Free AI tools for kids in 2026 — what's actually worth it</a></p>
      <p style="margin: 0 0 24px 0;">→ <a href="https://avenircore.com/blog/is-ai-safe-for-kids" style="color: #10b981; font-weight: 600; text-decoration: none;">Is AI safe for kids? What parents and teachers need to know</a></p>
      
      <p style="margin: 0 0 24px 0;">More good things coming your way. Reply any time.</p>
      <p style="margin: 0;"><strong>John</strong><br/>Founder, Avenircore</p>
    `;
  }

  return createBaseLayout(
    title,
    subtitle,
    icon,
    nameDisplay,
    bodyContent
  );
}
