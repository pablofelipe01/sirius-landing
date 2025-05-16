'use client'
import React from 'react';

interface MessageSectionProps {
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  submitMessage: { type: 'success' | 'error', text: string } | null;
}

/**
 * Componente para el campo de mensaje adicional y mensajes de éxito/error
 */
const MessageSection: React.FC<MessageSectionProps> = ({ 
  message, 
  handleChange,
  submitMessage
}) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje Adicional o Consulta
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Escribe cualquier consulta o comentario adicional que tengas sobre la aplicación de Biochar Blend"
        ></textarea>
      </div>
      
      {/* Mensaje de éxito o error */}
      {submitMessage && (
        <div className={`p-4 rounded-md ${
          submitMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {submitMessage.text}
        </div>
      )}
    </>
  );
};

export default MessageSection;