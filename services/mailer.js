import nodemailer from "nodemailer";

const regHtml = (password) => {
  return `<div style="text-align: center; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <h1 style="color: #007bff; margin-bottom: 20px;">Спасибо за регистрацию!</h1>
  <p style="margin-bottom: 20px;">Это информация только для вас. Если вы забудете свой пароль, не беспокойтесь, вы можете восстановить его на сайте.</p>
  <p  style="font-size: 18px; margin-bottom: 20px;">Ваш парол: <b>${password}</b></p>
  <p style="font-size: 12px; color: #888; margin-bottom: 20px;">Примечание: сохраните свои учетные данные в надежном месте.</p>
  </div>`;
};

export const sendMail = (to, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gevorgyan.narek.prog@gmail.com",
      pass: "tyrb woqb hoop ohso",
    },
  });

  const mailOptions = {
    from: "gevorgyan.narek.prog@gmail.com",
    to: to,
    subject: "Добро пожаловать EnCampo",
    html: regHtml(password),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
