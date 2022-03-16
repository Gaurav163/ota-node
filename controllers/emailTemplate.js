module.exports = {
    verifyEmail: (personName, verificationLink) => {
        const html = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family: 'Poppins', sans-serif;">
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>Congratulations</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins|sans-serif&amp;amp;subset=latin-ext" rel="stylesheet" media="screen">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet" media="screen">
        <style>
          @media (max-width: 600px) {
            .sm-px-12 {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
  
            .sm-px-24 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
  
            .sm-w-full {
              width: 100% !important;
            }
  
            .sm-w-2-3 {
              width: 66.666667% !important;
            }
          }
        </style>
        <link rel="preconnect" href="https://fonts.gstatic.com">
      </head>
  
      <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; font-family: 'Poppins', sans-serif; background-color: #111827; height: 100%;">
        <div role="article" aria-roledescription="email" aria-label="Congratulations" lang="en" style="font-family: 'Poppins', sans-serif;">
          <table style="font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; height: 100%; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr style="font-family: 'Poppins', sans-serif;">
              <td align="center" style="font-family: 'Poppins', sans-serif; background-color: #e5e7eb; padding-top: 24px; padding-bottom: 24px; vertical-align: middle;" valign="middle">
                <table class="sm-w-full" style="font-family: 'Poppins', sans-serif; width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr style="font-family: 'Poppins', sans-serif;">
                    <td align="center" class="sm-px-24" style="font-family: 'Poppins', sans-serif;">
                      <table style="font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                        <div style="background: url(https://etark-admin-bucket.s3.ap-south-1.amazonaws.com/tempp/banner.png); font-family: 'Poppins', sans-serif; background-color: #245fd3; background-size: cover; padding-top: 48px; padding-bottom: 48px; text-align: center; width: 100%;">
                          <span style="font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 36px; color: #e5e7eb;">Welcome to OTApi</span>
                        </div>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td class="sm-px-24" style="font-family: 'Poppins', sans-serif; background-color: #ffffff; padding: 48px; text-align: center;">
                            <img src="https://etark-admin-bucket.s3.ap-south-1.amazonaws.com/tempp/manWindow.png" class="sm-w-2-3" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle; font-family: 'Poppins', sans-serif; margin-bottom: 24px; width: 40%;" alt="">
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; margin-top: 24px; text-align: left; color: #4b5563;">Hey ${personName},</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 16px; text-align: left; color: #6b7280;">
                              Thanks for creating an account with One Touch Api!  
                              <br style="font-family: 'Poppins', sans-serif;">
                              Before we get started, we’ll need to verify your email.
                            </p>
                            <br style="font-family: 'Poppins', sans-serif;">
                            <br style="font-family: 'Poppins', sans-serif;">
                            <br style="font-family: 'Poppins', sans-serif;">
                            <a href="${verificationLink}" target="_blank" style="font-family: 'Poppins', sans-serif; background-color: #245fd3; border-radius: 4px; border-width: 0px; font-weight: 500; font-size: 16px; padding: 12px 28px; color: #f3f4f6; text-decoration: none;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td style="font-family: 'Poppins', sans-serif; background-color: #d1d5db; height: 2px;"></td>
                        </tr>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td style="font-family: 'Poppins', sans-serif; font-size: 14px; padding: 32px; text-align: center;">
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; text-align: center; color: #9ca3af;">That's all for now!</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 18px; margin-top: 12px; text-align: center; color: #6b7280;">Regards,</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 18px; text-align: center; color: #6b7280;">Team OTApi</p>
                            <p style="font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; margin-top: 12px; margin-bottom: 32px;">
                              <img src="/images/bluelogo.png" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle; font-family: 'Poppins', sans-serif; width: 60px;" alt="">
                            </p>
                            
                            <div style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 14px; margin-top: 8px; text-align: center; color: #6b7280;">&copy; Copyright 2021. OTApi. All rights reserved</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
`
        return html;
    }
    ,
    resetPassTemplate: (personName, resetPassLink) => {
        const html = `<!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family: 'Poppins', sans-serif;">
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>Congratulations</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins|sans-serif&amp;amp;subset=latin-ext" rel="stylesheet" media="screen">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet" media="screen">
        <style>
          @media (max-width: 600px) {
            .sm-px-12 {
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
  
            .sm-px-24 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
  
            .sm-w-full {
              width: 100% !important;
            }
  
            .sm-w-2-3 {
              width: 66.666667% !important;
            }
          }
        </style>
        <link rel="preconnect" href="https://fonts.gstatic.com">
      </head>
  
      <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; font-family: 'Poppins', sans-serif; background-color: #111827; height: 100%;">
        <div role="article" aria-roledescription="email" aria-label="Congratulations" lang="en" style="font-family: 'Poppins', sans-serif;">
          <table style="font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; height: 100%; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr style="font-family: 'Poppins', sans-serif;">
              <td align="center" style="font-family: 'Poppins', sans-serif; background-color: #e5e7eb; padding-top: 24px; padding-bottom: 24px; vertical-align: middle;" valign="middle">
                <table class="sm-w-full" style="font-family: 'Poppins', sans-serif; width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                  <tr style="font-family: 'Poppins', sans-serif;">
                    <td align="center" class="sm-px-24" style="font-family: 'Poppins', sans-serif;">
                      <table style="font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                        <div style="background: url(https://etark-admin-bucket.s3.ap-south-1.amazonaws.com/tempp/banner.png); font-family: 'Poppins', sans-serif; background-color: #245fd3; background-size: cover; padding-top: 48px; padding-bottom: 48px; text-align: center; width: 100%;">
                          <span style="font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 36px; color: #e5e7eb;">
                            Reset your password for OTApi
                          </span>
                        </div>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td class="sm-px-24" style="font-family: 'Poppins', sans-serif; background-color: #ffffff; padding: 48px; text-align: center;">
                            <img src="https://etark-admin-bucket.s3.ap-south-1.amazonaws.com/tempp/manWindow.png" class="sm-w-2-3" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle; font-family: 'Poppins', sans-serif; margin-bottom: 24px; width: 40%;" alt="">
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; margin-top: 24px; text-align: left; color: #4b5563;">Hey ${personName},</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 16px; text-align: left; color: #6b7280;">
                              Click the link below to reset your password!
                              <br style="font-family: 'Poppins', sans-serif;">
                              If you haven't initiated this, please ignore this email.
                            </p>
                            <br style="font-family: 'Poppins', sans-serif;">
                            <br style="font-family: 'Poppins', sans-serif;">
                            <br style="font-family: 'Poppins', sans-serif;">
                            <a href="${resetPassLink}" target="_blank" style="font-family: 'Poppins', sans-serif; background-color: #245fd3; border-radius: 4px; border-width: 0px; font-weight: 500; font-size: 16px; padding: 12px 28px; color: #f3f4f6; text-decoration: none;">
                              Reset password
                            </a>
                          </td>
                        </tr>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td style="font-family: 'Poppins', sans-serif; background-color: #d1d5db; height: 2px;"></td>
                        </tr>
                        <tr style="font-family: 'Poppins', sans-serif;">
                          <td style="font-family: 'Poppins', sans-serif; font-size: 14px; padding: 32px; text-align: center;">
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; text-align: center; color: #9ca3af;">That's all for now!</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 18px; margin-top: 12px; text-align: center; color: #6b7280;">Regards,</p>
                            <p style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 18px; text-align: center; color: #6b7280;">Team OTApi</p>
                            <p style="font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; margin-top: 24px; margin-bottom: 32px;">
                              <img src="/images/bluelogo.png" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle; font-family: 'Poppins', sans-serif; width: 60px;" alt="">
                            </p>
                            
                            <div style="font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 14px; margin-top: 8px; text-align: center; color: #6b7280;">&copy; Copyright 2021. OTApi. All rights reserved</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
`
        return html;
    }
}