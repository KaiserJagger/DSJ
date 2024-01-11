import nodemailer from "nodemailer";
import mailgen from "mailgen";
import logger from "./logger.js";
import { GMAIL_CONFIG } from "../config/config.js";

export const deleteAccountMailer = async (email) => {
  const mailerConfig = {
    service: "gmail",
    auth: { user: GMAIL_CONFIG.user, pass: GMAIL_CONFIG.pass },
  };

  let transporter = nodemailer.createTransport(mailerConfig);

  const Mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: "Distribuciones-San Juan",
      link: "https://distribucionessanjuan-dev-bajj.4.us-1.fl0.io",
    },
  });

  const response = {
    body: {
      name: email,
      intro: "Tu cuenta fue eliminada",
      action: {
        instructions:
          "Su cuenta fue eliminada debido a inactividad. Para crear una nueva cuenta, haga clic en el botón",
        button: {
          color: "#22BC66",
          text: "Crear nueva cuenta",
          link: "https://distribucionessanjuan-dev-bajj.4.us-1.fl0.io/api/session/register",
        },
      },
      outro:
        "¿Necesita ayuda o tiene preguntas? Simplemente responda a este correo electrónico, nos encantaría ayudarlo.",
    },
  };

  const mail = Mailgenerator.generate(response);

  let message = {
    from: GMAIL_CONFIG.user,
    to: email,
    subject: "Distribuciones-San Juan- Tu cuenta ha sido eliminada por inactividad",
    html: mail,
  };

  try {
    await transporter.sendMail(message);

    logger.info("(Delete Account) Emails sent successfully");
  } catch (err) {
    logger.error(`(Delete Account) Error when sending email. 
    ${err.stack}`);
  }
};

export const deleteProductMailer = async (productOwner, productTitle) => {
  const mailerConfig = {
    service: "gmail",
    auth: { user: GMAIL_CONFIG.user, pass: GMAIL_CONFIG.pass },
  };

  let transporter = nodemailer.createTransport(mailerConfig);

  const Mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: "Distribuciones San Juan",
      link: "https://distribucionessanjuan-dev-bajj.4.us-1.fl0.io/api/session/login",
    },
  });

  const response = {
    body: {
      name: productOwner,
      intro: "Tu producto ha sido eliminado",
      action: {
        instructions: `Tu producto "${productTitle}" ha sido eliminado de la tienda`,
        button: {
          color: "#176B87",
          text: "Ir a la tienda",
          link: "https://distribucionessanjuan-dev-bajj.4.us-1.fl0.io/api/products",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const mail = Mailgenerator.generate(response);

  let message = {
    from: GMAIL_CONFIG.user,
    to: productOwner,
    subject: "Distribuciones San Juan - Tu producto ha sido eliminado",
    html: mail,
  };

  try {
    await transporter.sendMail(message);

    logger.info("(Delete Product) Emails sent successfully");
  } catch (err) {
    logger.error(`(Delete Product) Error when sending email. 
    ${err.stack}`);
  }
};