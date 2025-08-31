import React, { useState } from 'react';
import { User, Upload, Calendar, AlertTriangle, CheckCircle, X, Plus, Trash2 } from 'lucide-react';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  passportFrontImage?: File;
  passportBackImage?: File;
  nationality: string;
  isEligible: boolean;
  validityDays: number;
}

interface PassengerManagementProps {
  bookingId: string;
  onSave: (passengers: Passenger[]) => void;
  onClose: () => void;
}

const PassengerManagement: React.FC<PassengerManagementProps> = ({ bookingId, onSave, onClose }) => {
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      nationality: 'Indian',
      isEligible: true,
      validityDays: 0
    }
  ]);

  const calculatePassportValidity = (expiryDate: string): { isEligible: boolean; validityDays: number } => {
    if (!expiryDate) return { isEligible: true, validityDays: 0 };
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      isEligible: diffDays >= 180, // 6 months minimum
      validityDays: diffDays
    };
  };

  const updatePassenger = (id: string, field: keyof Passenger, value: string | File) => {
    setPassengers(prev => prev.map(passenger => {
      if (passenger.id === id) {
        const updated = { ...passenger, [field]: value };
        
        // Recalculate eligibility when expiry date changes
        if (field === 'passportExpiryDate') {
          const validity = calculatePassportValidity(value as string);
          updated.isEligible = validity.isEligible;
          updated.validityDays = validity.validityDays;
        }
        
        return updated;
      }
      return passenger;
    }));
  };

  const addPassenger = () => {
    const newPassenger: Passenger = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      nationality: 'Indian',
      isEligible: true,
      validityDays: 0
    };
    setPassengers(prev => [...prev, newPassenger]);
  };

  const removePassenger = (id: string) => {
    if (passengers.length > 1) {
      setPassengers(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleFileUpload = (passengerId: string, field: 'passportFrontImage' | 'passportBackImage', file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    updatePassenger(passengerId, field, file);
  };

  const validateForm = (): boolean => {
    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.dateOfBirth || 
          !passenger.passportNumber || !passenger.passportExpiryDate) {
        alert(`Please fill all required fields for passenger: ${passenger.firstName || 'Unnamed'} ${passenger.lastName || ''}`);
        return false;
      }
      
      if (!passenger.isEligible) {
        alert(`Passenger ${passenger.firstName} ${passenger.lastName} has insufficient passport validity. Passport must be valid for at least 6 months from travel date.`);
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(passengers);
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Important Requirements:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Passport must be valid for at least 6 months from travel date</li>
          <li>• Upload clear images of passport front and back pages</li>
          <li>• All fields marked with * are mandatory</li>
          <li>• Maximum file size: 5MB per image</li>
        </ul>
      </div>

      {/* Passengers List */}
      <div className="space-y-6">
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Passenger {index + 1}
              </h3>
              {passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(passenger.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(passenger.id, 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(passenger.id, 'lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => updatePassenger(passenger.id, 'dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality *
                </label>
                <select
                  value={passenger.nationality}
                  onChange={(e) => updatePassenger(passenger.id, 'nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                </select>
              </div>

              {/* Passport Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Number *
                </label>
                <input
                  type="text"
                  value={passenger.passportNumber}
                  onChange={(e) => updatePassenger(passenger.id, 'passportNumber', e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter passport number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Issue Date *
                </label>
                <input
                  type="date"
                  value={passenger.passportIssueDate}
                  onChange={(e) => updatePassenger(passenger.id, 'passportIssueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Expiry Date *
                </label>
                <input
                  type="date"
                  value={passenger.passportExpiryDate}
                  onChange={(e) => updatePassenger(passenger.id, 'passportExpiryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Passport Validity Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Validity
                </label>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  passenger.isEligible ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {passenger.isEligible ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}
                  <span className="text-sm font-medium">
                    {passenger.validityDays > 0 
                      ? `${passenger.validityDays} days remaining`
                      : 'Please enter expiry date'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Passport Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Front Page *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(passenger.id, 'passportFrontImage', file);
                    }}
                    className="hidden"
                    id={`front-${passenger.id}`}
                  />
                  <label htmlFor={`front-${passenger.id}`} className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-sm text-gray-600">
                      {passenger.passportFrontImage ? passenger.passportFrontImage.name : 'Upload front page'}
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passport Back Page *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(passenger.id, 'passportBackImage', file);
                    }}
                    className="hidden"
                    id={`back-${passenger.id}`}
                  />
                  <label htmlFor={`back-${passenger.id}`} className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-sm text-gray-600">
                      {passenger.passportBackImage ? passenger.passportBackImage.name : 'Upload back page'}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Passenger Button */}
      <button
        onClick={addPassenger}
        className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add Another Passenger
      </button>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={onClose}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Save Passengers
        </button>
      </div>
    </div>
  );
};

export default PassengerManagement;