export function generateWelcomeEmail(role, firstName) {
  const isTeacher = role === 'teacher' || role === 'educator';
  const isParent = role === 'parent';
  const nameDisplay = firstName ? firstName : 'there';
  const roleDisplay = isTeacher ? 'teachers' : isParent ? 'parents' : 'parents and teachers';

  const introText = isTeacher 
    ? `Welcome — and genuinely, thank you for being here.<br/><br/>The fact that you're seeking out AI resources tells me you're already ahead of most educators. You recognize that AI isn't just a trend to ban or ignore; it's a reality we need to prepare our students for.<br/><br/>AvenirCore exists for teachers like you. Each week I send one practical idea for the classroom — tool guides, prompts, and lesson hacks — written by someone who cares about kids getting this right.`
    : isParent
    ? `Welcome — and genuinely, thank you for being here.<br/><br/>The fact that you looked up "how do I talk to my child about AI" tells me you're already ahead of most parents. You're curious, not panicked. That's exactly the right starting point.<br/><br/>AvenirCore exists for parents like you. Each week I send one practical tip for navigating AI with your children — age-appropriate, honest, and written by someone who cares about kids getting this right.`
    : `Welcome to AvenirCore — you've just joined a small but growing community of parents and teachers who believe kids deserve honest, safe AI education.`;

  const whatToExpectHTML = isTeacher
    ? `
      <tr>
        <td style="padding: 0 0 16px 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">1</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">Your first AI classroom idea</strong> — practical, testable, and ready to use in the classroom.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 0 16px 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">2</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">A weekly newsletter</strong> — short, practical, always teacher-first. No jargon.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">3</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">Zero spam.</strong> We send only when there's something worth your time.</p>
        </td>
      </tr>
    `
    : `
      <tr>
        <td style="padding: 0 0 16px 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">1</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">Your child's first AI story</strong> — free, no login, 5 minutes. Arrives in the next day or two.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 0 16px 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">2</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">A weekly newsletter</strong> — short, practical, always parent-first. No jargon.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0; display: flex; align-items: flex-start;">
          <div style="background-color: #d1fae5; color: #059669; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 12px; flex-shrink: 0; line-height: 24px; text-align: center;">3</div>
          <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;"><strong style="color: #1e293b;">Zero spam.</strong> We send only when there's something worth your time.</p>
        </td>
      </tr>
    `;

  return `<!DOCTYPE html>
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
            <div style="color: #10b981; font-size: 24px; margin-bottom: 8px;">🌱</div>
            <h1 style="margin: 0 0 8px 0; color: #064e3b; font-size: 24px; font-weight: 700; line-height: 1.3;">You're in — welcome to AvenirCore.</h1>
            <p style="margin: 0; color: #047857; font-size: 16px; font-weight: 500;">Honest, safe AI education for kids ages 6–14.</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Block 3: Greeting -->
    <div style="padding: 16px 32px;">
      <p style="margin: 0 0 16px 0; font-size: 16px; color: #334155; font-weight: 600;">Hi ${nameDisplay},</p>
      <p style="margin: 0; font-size: 16px; color: #475569; line-height: 1.6;">
        ${introText}
      </p>
    </div>

    <!-- Block 4: Divider -->
    <div style="padding: 16px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="border-top: 1px solid #e2e8f0;"></td></tr>
      </table>
    </div>

    <!-- Block 5: Workbook Download Box -->
    <div style="padding: 0 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
        <tr>
          <td width="64" style="vertical-align: top; padding-right: 16px;">
            <div style="background-color: #d1fae5; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; text-align: center;">
              <span style="font-size: 24px; line-height: 48px;">📘</span>
            </div>
          </td>
          <td style="vertical-align: top;">
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1e293b;">Kids & AI Activity Workbook</h3>
            <p style="margin: 0 0 20px 0; font-size: 15px; color: #64748b; line-height: 1.5;">12 pages of activities, conversation starters, and myth-busters designed for ages 6–14. Save it, print it, share it.</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background-color: #10b981; border-radius: 6px; text-align: center;">
                  <a href="https://avenircore.com/avenircore-kids-ai-workbook.pdf" style="display: inline-block; padding: 12px 24px; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 6px;">Download your free workbook</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- Block 6: Divider -->
    <div style="padding: 24px 32px 16px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="border-top: 1px solid #e2e8f0;"></td></tr>
      </table>
    </div>

    <!-- Block 7: What to Expect -->
    <div style="padding: 0 32px 24px 32px;">
      <p style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; color: #10b981; letter-spacing: 1px; text-transform: uppercase;">Coming Up</p>
      <h3 style="margin: 0 0 20px 0; font-size: 18px; color: #1e293b;">What to expect from us</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${whatToExpectHTML}
      </table>
    </div>

    <!-- Block 8: Secondary CTA Dark Box -->
    <div style="padding: 0 32px 32px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 12px; padding: 24px;">
        <tr>
          <td>
            <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.5;">Curious what else we're building? Explore free stories, ${roleDisplay} guides, and more at avenircore.com.</p>
            <a href="https://avenircore.com" style="color: #34d399; font-size: 15px; font-weight: 600; text-decoration: none;">Visit AvenirCore &rarr;</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Block 9: Footer -->
    <div style="padding: 0 32px 48px 32px;">
      <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        You're receiving this because you signed up at avenircore.com. We respect your inbox.<br/>
        If you change your mind, you can unsubscribe below.<br/><br/>
        &copy; ${new Date().getFullYear()} AvenirCore. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>`;
}
