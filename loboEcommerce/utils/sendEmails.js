import nodemailer from "nodemailer";//Nodemailer é um módulo para aplicativos Node.js que permite o envio de e-mail com facilidade. O projeto começou em 2010, quando não havia uma opção sensata de enviar 
import { google } from "googleapis";//importa a dependencia
import { activateEmailTemplate } from "../emails/activateEmailTemplate";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";//rota com token de autorização do google

const {//pego no .env
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send email

export const sendEmail = (to, url, txt, subject, template) => {//(to, url, txt, subject, template) (to, url, txt, subject, html)
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    port: 465,    
      host: "smtp.gmail.com",
      secure: true,
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: process.env.GOOGLE_DEVELOPERS_ACESS_TOKEN,
            accessToken,
              
        }
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,//req.body.email    to
    subject: subject,
    // text: "I hope this message gets through!",
    html: template(to, url),//email template para confirmar cadastro
  };
  smtpTransport.sendMail(mailOptions, (err, infos) => {
    if (err) return err;
    return infos;
  });
};
