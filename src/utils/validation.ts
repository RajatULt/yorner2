// Validation utilities for forms and user inputs

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationUtils {
  // Email validation
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Phone validation (Indian format)
  static validatePhone(phone: string): ValidationResult {
    const errors: string[] = [];
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (!phone) {
      errors.push('Phone number is required');
    } else if (cleanPhone.length !== 10) {
      errors.push('Please enter a valid 10-digit phone number');
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.push('Please enter a valid Indian mobile number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Password validation
  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];
    
    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Name validation
  static validateName(name: string): ValidationResult {
    const errors: string[] = [];
    
    if (!name) {
      errors.push('Name is required');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      errors.push('Name can only contain letters and spaces');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Passport number validation
  static validatePassport(passport: string): ValidationResult {
    const errors: string[] = [];
    
    if (!passport) {
      errors.push('Passport number is required');
    } else if (!/^[A-Z]{1}[0-9]{7}$/.test(passport)) {
      errors.push('Please enter a valid passport number (e.g., A1234567)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Date validation
  static validateDate(date: string, label: string = 'Date'): ValidationResult {
    const errors: string[] = [];
    
    if (!date) {
      errors.push(`${label} is required`);
    } else {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.push(`Please enter a valid ${label.toLowerCase()}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Future date validation
  static validateFutureDate(date: string, label: string = 'Date'): ValidationResult {
    const dateValidation = this.validateDate(date, label);
    if (!dateValidation.isValid) {
      return dateValidation;
    }
    
    const errors: string[] = [];
    const dateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateObj <= today) {
      errors.push(`${label} must be in the future`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Passport expiry validation (must be valid for at least 6 months)
  static validatePassportExpiry(expiryDate: string): ValidationResult {
    const dateValidation = this.validateFutureDate(expiryDate, 'Passport expiry date');
    if (!dateValidation.isValid) {
      return dateValidation;
    }
    
    const errors: string[] = [];
    const expiry = new Date(expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    if (expiry < sixMonthsFromNow) {
      errors.push('Passport must be valid for at least 6 months from travel date');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // File validation
  static validateFile(file: File, maxSizeMB: number = 5, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg']): ValidationResult {
    const errors: string[] = [];
    
    if (!file) {
      errors.push('File is required');
      return { isValid: false, errors };
    }
    
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      errors.push(`File size must be less than ${maxSizeMB}MB`);
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File must be one of: ${allowedTypes.join(', ')}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Comprehensive form validation
  static validateBookingForm(formData: any): ValidationResult {
    const errors: string[] = [];
    
    // Validate name
    const nameValidation = this.validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    
    // Validate email
    const emailValidation = this.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    }
    
    // Validate phone
    const phoneValidation = this.validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.push(...phoneValidation.errors);
    }
    
    // Validate address
    if (!formData.address || formData.address.trim().length < 10) {
      errors.push('Please enter a complete address (minimum 10 characters)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Passenger validation
  static validatePassenger(passenger: any): ValidationResult {
    const errors: string[] = [];
    
    // Validate names
    const firstNameValidation = this.validateName(passenger.firstName);
    if (!firstNameValidation.isValid) {
      errors.push(`First name: ${firstNameValidation.errors.join(', ')}`);
    }
    
    const lastNameValidation = this.validateName(passenger.lastName);
    if (!lastNameValidation.isValid) {
      errors.push(`Last name: ${lastNameValidation.errors.join(', ')}`);
    }
    
    // Validate date of birth
    const dobValidation = this.validateDate(passenger.dateOfBirth, 'Date of birth');
    if (!dobValidation.isValid) {
      errors.push(...dobValidation.errors);
    } else {
      // Check if passenger is not too young (minimum 1 year old)
      const dob = new Date(passenger.dateOfBirth);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (dob > oneYearAgo) {
        errors.push('Passenger must be at least 1 year old');
      }
    }
    
    // Validate passport
    const passportValidation = this.validatePassport(passenger.passportNumber);
    if (!passportValidation.isValid) {
      errors.push(...passportValidation.errors);
    }
    
    // Validate passport expiry
    if (passenger.passportExpiryDate) {
      const expiryValidation = this.validatePassportExpiry(passenger.passportExpiryDate);
      if (!expiryValidation.isValid) {
        errors.push(...expiryValidation.errors);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Utility functions for formatting
export class FormatUtils {
  // Format currency
  static formatCurrency(amount: number, currency: string = 'INR'): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Format date
  static formatDate(date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      case 'full':
        return dateObj.toLocaleDateString('en-IN', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      default:
        return dateObj.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
    }
  }

  // Format phone number
  static formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  }

  // Truncate text
  static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  // Generate initials from name
  static getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

// Error handling utilities
export class ErrorUtils {
  // Handle API errors
  static handleApiError(error: any): string {
    if (error.response) {
      // Server responded with error status
      return error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
      // Request was made but no response received
      return 'Network error. Please check your connection.';
    } else {
      // Something else happened
      return error.message || 'An unexpected error occurred';
    }
  }

  // Log errors for debugging
  static logError(error: any, context: string) {
    console.error(`Error in ${context}:`, error);
    
    // In production, you would send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service (e.g., Sentry)
    }
  }
}