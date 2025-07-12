import axios from "axios";

const { NEWSLETTER_URL, NEWSLETTER_API_KEY } = process.env;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": NEWSLETTER_API_KEY,
};

const sendWelcomeEmail = async (email: string) => {
  try {
    await axios.post(`${NEWSLETTER_URL}/register`, { email }, { headers });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendNewPostEmail = async (subscribers: string[]) => {
  try {
    await axios.post(
      `${NEWSLETTER_URL}/new-post`,
      { subscribers },
      { headers }
    );
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export { sendWelcomeEmail, sendNewPostEmail };
