
export const contactEmailTemplate = (name: string, email: string, message: string) => {
  return `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `;
};

export const verificationCodeTemplate = (code: string) => {
  return `
    <h2>Your Verification Code: <code>${code}</code></h2>
  `;
};

