'use client'
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Props para el componente
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  actionButton?: React.ReactNode;
  className?: string;
}

/**
 * Componente para el encabezado de sección con opción de expansión/colapso
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  expandable = false,
  expanded = true,
  onToggle,
  actionButton,
  className = ''
}) => {
  return (
    <div className={`flex justify-between items-center mb-4 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      
      <div className="flex items-center space-x-2">
        {actionButton}
        
        {expandable && (
          <button 
            type="button"
            onClick={onToggle}
            className="text-green-600 flex items-center text-sm"
          >
            {expanded ? (
              <>Mostrar menos <ChevronUp className="w-4 h-4 ml-1" /></>
            ) : (
              <>Ver detalles <ChevronDown className="w-4 h-4 ml-1" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
