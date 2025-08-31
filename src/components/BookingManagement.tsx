import React, { useState } from 'react';
import { Calendar, Edit, X, DollarSign, Clock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { DatePicker, Modal, Select, InputNumber, Button } from 'antd';
import { useToast } from './ToastNotification';
import { paymentService } from '../services/paymentService';
import dayjs, { Dayjs } from 'dayjs';

interface BookingData {
  id: string;
  type: 'cruise' | 'hotel';
  itemName: string;
  customerName: string;
  originalAmount: number;
  currentAmount: number;
  bookingDate: string;
  travelDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  modificationHistory: ModificationRecord[];
}

interface ModificationRecord {
  id: string;
  type: 'date_change' | 'room_upgrade' | 'guest_count' | 'cancellation';
  oldValue: string;
  newValue: string;
  priceAdjustment: number;
  timestamp: string;
  reason: string;
}

interface BookingManagementProps {
  booking: BookingData;
  onClose: () => void;
  onUpdate: (updatedBooking: BookingData) => void;
}

const BookingManagement: React.FC<BookingManagementProps> = ({ booking, onClose, onUpdate }) => {
  const { showSuccess, showError, showWarning } = useToast();
  const [activeTab, setActiveTab] = useState<'modify' | 'cancel' | 'history'>('modify');
  const [loading, setLoading] = useState(false);
  
  // Modification form state
  const [modifications, setModifications] = useState({
    newTravelDate: dayjs(booking.travelDate),
    roomUpgrade: '',
    guestCount: 2,
    reason: ''
  });

  // Cancellation state
  const [cancellationReason, setCancellationReason] = useState('');
  const [refundAmount, setRefundAmount] = useState(0);

  // Calculate cancellation refund based on days until travel
  const calculateRefund = () => {
    const travelDate = dayjs(booking.travelDate);
    const today = dayjs();
    const daysUntilTravel = travelDate.diff(today, 'day');
    
    let refundPercentage = 0;
    if (daysUntilTravel >= 30) {
      refundPercentage = 90; // 90% refund
    } else if (daysUntilTravel >= 15) {
      refundPercentage = 70; // 70% refund
    } else if (daysUntilTravel >= 7) {
      refundPercentage = 50; // 50% refund
    } else if (daysUntilTravel >= 3) {
      refundPercentage = 25; // 25% refund
    } else {
      refundPercentage = 0; // No refund
    }
    
    return (booking.currentAmount * refundPercentage) / 100;
  };

  // Calculate modification cost
  const calculateModificationCost = () => {
    let adjustmentCost = 0;
    
    // Date change fee
    const originalDate = dayjs(booking.travelDate);
    if (!modifications.newTravelDate.isSame(originalDate, 'day')) {
      adjustmentCost += 2500; // Date change fee
    }
    
    // Room upgrade cost (mock calculation)
    if (modifications.roomUpgrade) {
      adjustmentCost += 5000; // Upgrade fee
    }
    
    return adjustmentCost;
  };

  // Handle booking modification
  const handleModifyBooking = async () => {
    if (!modifications.reason.trim()) {
      showError('Validation Error', 'Please provide a reason for modification');
      return;
    }

    setLoading(true);
    
    try {
      const modificationCost = calculateModificationCost();
      
      // If there's additional cost, process payment
      if (modificationCost > 0) {
        const paymentResult = await paymentService.initiatePayment({
          bookingId: booking.id,
          amount: modificationCost,
          currency: 'INR',
          customerEmail: 'customer@example.com',
          customerPhone: '+91 9876543210',
          description: `Booking modification for ${booking.itemName}`
        }, 'card');

        if (!paymentResult.success) {
          showError('Payment Failed', paymentResult.error || 'Failed to process modification payment');
          return;
        }
      }

      // Create modification record
      const modificationRecord: ModificationRecord = {
        id: Date.now().toString(),
        type: 'date_change',
        oldValue: booking.travelDate,
        newValue: modifications.newTravelDate.format('YYYY-MM-DD'),
        priceAdjustment: modificationCost,
        timestamp: new Date().toISOString(),
        reason: modifications.reason
      };

      // Update booking
      const updatedBooking: BookingData = {
        ...booking,
        travelDate: modifications.newTravelDate.format('YYYY-MM-DD'),
        currentAmount: booking.currentAmount + modificationCost,
        modificationHistory: [...booking.modificationHistory, modificationRecord]
      };

      onUpdate(updatedBooking);
      showSuccess(
        'Booking Modified',
        `Your booking has been successfully modified. ${modificationCost > 0 ? `Additional cost: ₹${modificationCost.toLocaleString('en-IN')}` : ''}`
      );
      onClose();
      
    } catch (error) {
      showError('Modification Failed', 'Failed to modify booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async () => {
    if (!cancellationReason.trim()) {
      showError('Validation Error', 'Please provide a reason for cancellation');
      return;
    }

    const refund = calculateRefund();
    
    if (!window.confirm(`Are you sure you want to cancel this booking? You will receive a refund of ₹${refund.toLocaleString('en-IN')}.`)) {
      return;
    }

    setLoading(true);
    
    try {
      // Process refund if applicable
      if (refund > 0) {
        const refundResult = await paymentService.processRefund(
          `pay_${booking.id}`,
          refund,
          cancellationReason
        );

        if (!refundResult.success) {
          showError('Refund Failed', refundResult.error || 'Failed to process refund');
          return;
        }
      }

      // Create cancellation record
      const cancellationRecord: ModificationRecord = {
        id: Date.now().toString(),
        type: 'cancellation',
        oldValue: 'Active',
        newValue: 'Cancelled',
        priceAdjustment: -refund,
        timestamp: new Date().toISOString(),
        reason: cancellationReason
      };

      // Update booking
      const updatedBooking: BookingData = {
        ...booking,
        status: 'Cancelled',
        paymentStatus: refund > 0 ? 'Refunded' : 'Paid',
        modificationHistory: [...booking.modificationHistory, cancellationRecord]
      };

      onUpdate(updatedBooking);
      showSuccess(
        'Booking Cancelled',
        `Your booking has been cancelled. ${refund > 0 ? `Refund of ₹${refund.toLocaleString('en-IN')} will be processed within 5-7 business days.` : ''}`
      );
      onClose();
      
    } catch (error) {
      showError('Cancellation Failed', 'Failed to cancel booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD MMM YYYY');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Booking</h2>
            <p className="text-gray-600">{booking.itemName} - {booking.customerName}</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 p-6 pb-0">
          {[
            { key: 'modify', label: 'Modify Booking', icon: <Edit size={18} /> },
            { key: 'cancel', label: 'Cancel Booking', icon: <X size={18} /> },
            { key: 'history', label: 'History', icon: <Clock size={18} /> }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">Current Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Booking ID:</span>
                <span className="font-medium ml-2">{booking.id}</span>
              </div>
              <div>
                <span className="text-blue-700">Travel Date:</span>
                <span className="font-medium ml-2">{formatDate(booking.travelDate)}</span>
              </div>
              <div>
                <span className="text-blue-700">Amount Paid:</span>
                <span className="font-medium ml-2">{formatPrice(booking.currentAmount)}</span>
              </div>
            </div>
          </div>

          {/* Modify Tab */}
          {activeTab === 'modify' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Modify Your Booking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Modification Options */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Travel Date
                    </label>
                    <DatePicker
                      value={modifications.newTravelDate}
                      onChange={(date) => setModifications(prev => ({ ...prev, newTravelDate: date || dayjs() }))}
                      className="w-full"
                      format="DD/MM/YYYY"
                      disabledDate={(current) => current && current < dayjs().endOf('day')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room/Cabin Upgrade
                    </label>
                    <Select
                      value={modifications.roomUpgrade}
                      onChange={(value) => setModifications(prev => ({ ...prev, roomUpgrade: value }))}
                      className="w-full"
                      placeholder="Select upgrade option"
                    >
                      <Select.Option value="">No Upgrade</Select.Option>
                      <Select.Option value="ocean_view">Ocean View (+₹5,000)</Select.Option>
                      <Select.Option value="balcony">Balcony (+₹10,000)</Select.Option>
                      <Select.Option value="suite">Suite (+₹20,000)</Select.Option>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <InputNumber
                      min={1}
                      max={6}
                      value={modifications.guestCount}
                      onChange={(value) => setModifications(prev => ({ ...prev, guestCount: value || 2 }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Modification
                    </label>
                    <textarea
                      value={modifications.reason}
                      onChange={(e) => setModifications(prev => ({ ...prev, reason: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Please explain why you need to modify this booking..."
                      required
                    />
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-4">Modification Cost Summary</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Original Amount:</span>
                      <span>{formatPrice(booking.originalAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Current Amount:</span>
                      <span>{formatPrice(booking.currentAmount)}</span>
                    </div>
                    
                    {calculateModificationCost() > 0 && (
                      <>
                        <div className="flex justify-between text-orange-600">
                          <span>Modification Fee:</span>
                          <span>+{formatPrice(calculateModificationCost())}</span>
                        </div>
                        
                        <hr className="my-2" />
                        
                        <div className="flex justify-between text-lg font-bold text-blue-600">
                          <span>New Total:</span>
                          <span>{formatPrice(booking.currentAmount + calculateModificationCost())}</span>
                        </div>
                        
                        <div className="flex justify-between text-red-600">
                          <span>Additional Payment:</span>
                          <span>{formatPrice(calculateModificationCost())}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleModifyBooking}
                    disabled={loading || !modifications.reason.trim()}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        Confirm Modification
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Tab */}
          {activeTab === 'cancel' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Cancel Your Booking</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cancellation Form */}
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-700 mb-2">
                      <AlertTriangle size={18} />
                      <span className="font-medium">Cancellation Policy</span>
                    </div>
                    <ul className="text-yellow-600 text-sm space-y-1">
                      <li>• 30+ days: 90% refund</li>
                      <li>• 15-29 days: 70% refund</li>
                      <li>• 7-14 days: 50% refund</li>
                      <li>• 3-6 days: 25% refund</li>
                      <li>• Less than 3 days: No refund</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Cancellation
                    </label>
                    <textarea
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Please explain why you need to cancel this booking..."
                      required
                    />
                  </div>
                </div>

                {/* Refund Summary */}
                <div className="bg-red-50 rounded-lg p-6">
                  <h4 className="font-medium text-red-800 mb-4">Refund Summary</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Original Amount:</span>
                      <span>{formatPrice(booking.currentAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Cancellation Fee:</span>
                      <span className="text-red-600">
                        -{formatPrice(booking.currentAmount - calculateRefund())}
                      </span>
                    </div>
                    
                    <hr className="my-2" />
                    
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Refund Amount:</span>
                      <span>{formatPrice(calculateRefund())}</span>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-red-600">
                    <p>* Refund will be processed within 5-7 business days</p>
                    <p>* Refund will be credited to the original payment method</p>
                  </div>

                  <button
                    onClick={handleCancelBooking}
                    disabled={loading || !cancellationReason.trim()}
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <X size={18} />
                        Confirm Cancellation
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Modification History</h3>
              
              {booking.modificationHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">No Modifications</h4>
                  <p className="text-gray-500">This booking has not been modified since creation.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {booking.modificationHistory.map((record) => (
                    <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            record.type === 'cancellation' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="font-medium text-gray-800 capitalize">
                            {record.type.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(record.timestamp)}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Changed from:</span> {record.oldValue}
                        <br />
                        <span className="font-medium">Changed to:</span> {record.newValue}
                      </div>
                      
                      {record.priceAdjustment !== 0 && (
                        <div className={`text-sm font-medium ${
                          record.priceAdjustment > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          Price Adjustment: {record.priceAdjustment > 0 ? '+' : ''}{formatPrice(record.priceAdjustment)}
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Reason:</span> {record.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;