import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Definición de tipos
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface EmailTransportConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

// Configuración del transporte de correo electrónico
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  }
} as EmailTransportConfig);

/**
 * Envía un correo electrónico al usuario confirmando la recepción de su mensaje
 */
const sendUserConfirmationEmail = async (userEmail: string, name: string, subject: string): Promise<void> => {
  const mailOptions = {
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
 */
const sendTeamNotificationEmail = async (
  name: string, 
  email: string, 
  phone: string | undefined, 
  subject: string, 
  message: string
): Promise<void> => {
  const mailOptions = {
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
 * API route handler para procesar el formulario de contacto
 */
export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data: ContactFormData = await request.json();
    const { name, email, phone, subject, message } = data;

    // Validar campos obligatorios
    if (!name || !email || !message || !subject) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios excepto el teléfono' },
        { status: 400 }
      );
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El correo electrónico proporcionado no es válido' },
        { status: 400 }
      );
    }

    // Enviar correo de confirmación al usuario
    await sendUserConfirmationEmail(email, name, subject);

    // Enviar notificación al equipo
    await sendTeamNotificationEmail(name, email, phone, subject, message);

    // Devolver respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Tu mensaje ha sido enviado correctamente'
    });
    
  } catch (error) {
    console.error('Error al procesar el formulario de contacto:', error);
    
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}