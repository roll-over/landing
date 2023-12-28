import { SMTPClient } from "emailjs";
import { env } from "$env/dynamic/private";

export const sendEmail = async (text: string, subject: string, to: string) => {
  const PROVIDER_EMAIL_USERNAME = env.PROVIDER_EMAIL_USERNAME;
  const PROVIDER_EMAIL_PASSWORD = env.PROVIDER_EMAIL_PASSWORD;
  const PROVIDER_EMAIL_HOST = env.PROVIDER_EMAIL_HOST;

  if (!PROVIDER_EMAIL_USERNAME || !PROVIDER_EMAIL_PASSWORD || !PROVIDER_EMAIL_HOST) {
    throw new Error("Email provider is not available");
  }
  const client = new SMTPClient({
    user: PROVIDER_EMAIL_USERNAME,
    password: PROVIDER_EMAIL_PASSWORD,
    host: PROVIDER_EMAIL_HOST,
    ssl: true,
    port: 465,
    authentication: ["LOGIN"],
  });

  client.send(
    {
      text,
      "Content-Type": "text/html; charset=UTF-8",
      from: PROVIDER_EMAIL_USERNAME,
      to,
      subject,
    },
    (err, message) => {
      console.log(err || message);
    },
  );
};
