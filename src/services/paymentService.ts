export interface PaymentData {
  bookingId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
  transactionId?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  icon: string;
  processingFee: number;
}

class PaymentService {
  private razorpayKey = 'rzp_test_demo_key'; // Demo key
  
  // Available payment methods
  getPaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        type: 'card',
        icon: '💳',
        processingFee: 0.02 // 2%
      },
      {
        id: 'upi',
        name: 'UPI',
        type: 'upi',
        icon: '📱',
        processingFee: 0.005 // 0.5%
      },
      {
        id: 'netbanking',
        name: 'Net Banking',
        type: 'netbanking',
        icon: '🏦',
        processingFee: 0.015 // 1.5%
      },
      {
        id: 'wallet',
        name: 'Digital Wallet',
        type: 'wallet',
        icon: '💰',
        processingFee: 0.01 // 1%
      }
    ];
  }

  // Calculate processing fee
  calculateProcessingFee(amount: number, paymentMethod: string): number {
    const method = this.getPaymentMethods().find(m => m.id === paymentMethod);
    return method ? amount * method.processingFee : 0;
  }

  // Initiate payment
  async initiatePayment(paymentData: PaymentData, paymentMethod: string): Promise<PaymentResult> {
    try {
      // Calculate total with processing fee
      const processingFee = this.calculateProcessingFee(paymentData.amount, paymentMethod);
      const totalAmount = paymentData.amount + processingFee;

      // Simulate payment gateway integration
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate 95% success rate
          const success = Math.random() > 0.05;
          
          if (success) {
            resolve({
              success: true,
              paymentId: `pay_${Date.now()}`,
              transactionId: `txn_${Date.now()}`
            });
          } else {
            resolve({
              success: false,
              error: 'Payment failed. Please try again.'
            });
          }
        }, 2000); // Simulate processing time
      });
    } catch (error) {
      return {
        success: false,
        error: 'Payment processing error'
      };
    }
  }

  // Verify payment
  async verifyPayment(paymentId: string, bookingId: string): Promise<boolean> {
    try {
      // Simulate payment verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      return false;
    }
  }

  // Process refund
  async processRefund(paymentId: string, amount: number, reason: string): Promise<PaymentResult> {
    try {
      // Simulate refund processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        success: true,
        paymentId: `refund_${Date.now()}`,
        transactionId: `ref_${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Refund processing failed'
      };
    }
  }

  // Get payment history
  async getPaymentHistory(userId: string): Promise<any[]> {
    // Mock payment history
    return [
      {
        id: 'pay_1',
        bookingId: 'BK001',
        amount: 90000,
        status: 'completed',
        method: 'card',
        date: '2024-03-01',
        transactionId: 'txn_1234567890'
      },
      {
        id: 'pay_2',
        bookingId: 'BK002',
        amount: 75000,
        status: 'completed',
        method: 'upi',
        date: '2024-03-05',
        transactionId: 'txn_1234567891'
      }
    ];
  }
}

export const paymentService = new PaymentService();