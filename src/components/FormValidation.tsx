import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormValidationProps {
  errors: string[];
  touched?: boolean;
  showSuccess?: boolean;
}

const FormValidation: React.FC<FormValidationProps> = ({ errors, touched = false, showSuccess = false }) => {
  if (!touched) return null;

  if (errors.length > 0) {
    return (
      <div className="mt-1">
        {errors.map((error, index) => (
          <div key={index} className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        ))}
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="mt-1 flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle size={14} />
        <span>Valid</span>
      </div>
    );
  }

  return null;
};

export default FormValidation;