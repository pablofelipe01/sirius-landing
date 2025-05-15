import nodemailer from 'nodemailer';
import { Transporter, SendMailOptions } from 'nodemailer';

// Definición de tipos
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

/**
 * Configuración de nodemailer para enviar emails
 */
const transporter: Transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  }
} as EmailConfig);

/**
 * Envía un correo electrónico al usuario confirmando la recepción de su mensaje
 * 
 * @param {string} userEmail - Correo electrónico del usuario
 * @param {string} name - Nombre del usuario
 * @param {string} subject - Asunto del mensaje
 * @returns {Promise<void>} Promesa de envío de correo
 */
export const sendUserConfirmationEmail = async (
  userEmail: string, 
  name: string, 
  subject: string
): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: `"Sirius Regenerative" <${process.env.EMAIL_FROM}>`,
    to: userEmail,
    subject: `Hemos recibido tu mensaje: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #16a34a; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Gracias por contactarnos</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Hemos recibido tu mensaje sobre "${subject}". Uno de nuestros representantes revisará tu consulta y te responderá lo antes posible.</p>
          <p>Si tienes alguna pregunta adicional, no dudes en responder a este correo electrónico.</p>
          <p>Saludos cordiales,</p>
          <p><strong>Equipo de Sirius Regenerative</strong></p>
        </div>
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
          <p>Este es un mensaje automático, por favor no respondas directamente.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Envía una notificación al equipo con los detalles del mensaje recibido
 * 
 * @param {string} name - Nombre del usuario
 * @param {string} email - Correo electrónico del usuario
 * @param {string | undefined} phone - Teléfono del usuario (opcional)
 * @param {string} subject - Asunto del mensaje
 * @param {string} message - Contenido del mensaje
 * @returns {Promise<void>} Promesa de envío de correo
 */
export const sendTeamNotificationEmail = async (
  name: string, 
  email: string, 
  phone: string | undefined, 
  subject: string, 
  message: string
): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: `"Sistema de Contacto" <${process.env.EMAIL_FROM}>`,
    to: process.env.SUPPORT_EMAIL as string,
    subject: `Nuevo mensaje de contacto: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #16a34a; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">Nuevo mensaje de contacto</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px;">Por favor, responde directamente a este correo electrónico para contactar con el remitente.</p>
        </div>
      </div>
    `,
    replyTo: email
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Verifica la configuración del correo electrónico enviando un mensaje de prueba
 * 
 * @returns {Promise<boolean>} Verdadero si la configuración es correcta
 */
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Error al verificar la configuración de email:', error);
    return false;
  }
};