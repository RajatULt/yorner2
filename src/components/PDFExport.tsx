import React from 'react';
import { Download, FileText } from 'lucide-react';

interface PDFExportProps {
  data: any;
  filename: string;
  title: string;
  type: 'cruise' | 'hotel' | 'booking';
}

const PDFExport: React.FC<PDFExportProps> = ({ data, filename, title, type }) => {
  const generatePDF = () => {
    // Create a new window for PDF content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price);
    };

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    let content = '';

    if (type === 'cruise') {
      content = `
        <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px;">
            <h1 style="color: #1F2937; margin-bottom: 10px;">${data.name}</h1>
            <p style="color: #6B7280; font-size: 18px;">${data.cruiseLine} • ${data.shipType}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h3 style="color: #374151; margin-bottom: 15px;">Cruise Details</h3>
              <p><strong>Route:</strong> ${data.from} → ${data.to}</p>
              <p><strong>Duration:</strong> ${data.duration} nights</p>
              <p><strong>Price:</strong> ${formatPrice(data.pricePerPerson)} per person</p>
            </div>
            <div>
              <h3 style="color: #374151; margin-bottom: 15px;">Available Dates</h3>
              ${data.departureDates.map((date: string) => `<p>• ${formatDate(date)}</p>`).join('')}
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Description</h3>
            <p style="line-height: 1.6; color: #4B5563;">${data.description}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Room Types Available</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
              ${data.roomTypes.map((room: string) => `<span style="background: #EFF6FF; color: #1D4ED8; padding: 8px 12px; border-radius: 6px; text-align: center;">${room}</span>`).join('')}
            </div>
          </div>

          <div>
            <h3 style="color: #374151; margin-bottom: 15px;">Ship Amenities</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
              ${data.amenities.map((amenity: string) => `<span style="background: #F0FDF4; color: #166534; padding: 8px 12px; border-radius: 6px;">• ${amenity}</span>`).join('')}
            </div>
          </div>

          <div style="margin-top: 40px; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            <p style="color: #6B7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-IN')}</p>
            <p style="color: #6B7280; font-size: 14px;">Yorker Holidays Services Pvt. Ltd.</p>
          </div>
        </div>
      `;
    } else if (type === 'hotel') {
      content = `
        <div style="max-width: 800px; margin: 0 auto; padding: 40px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px;">
            <h1 style="color: #1F2937; margin-bottom: 10px;">${data.name}</h1>
            <p style="color: #6B7280; font-size: 18px;">${data.hotelChain} • ${data.starRating} Star ${data.hotelType}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
            <div>
              <h3 style="color: #374151; margin-bottom: 15px;">Hotel Details</h3>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Star Rating:</strong> ${data.starRating} Stars</p>
              <p><strong>Price:</strong> ${formatPrice(data.pricePerNight)} per night</p>
            </div>
            <div>
              <h3 style="color: #374151; margin-bottom: 15px;">Available From</h3>
              ${data.availableFrom.map((date: string) => `<p>• ${formatDate(date)}</p>`).join('')}
            </div>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Description</h3>
            <p style="line-height: 1.6; color: #4B5563;">${data.description}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Room Types Available</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
              ${data.availableRoomTypes.map((room: string) => `<span style="background: #EFF6FF; color: #1D4ED8; padding: 8px 12px; border-radius: 6px; text-align: center;">${room}</span>`).join('')}
            </div>
          </div>

          <div>
            <h3 style="color: #374151; margin-bottom: 15px;">Hotel Amenities</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
              ${data.amenities.map((amenity: string) => `<span style="background: #F0FDF4; color: #166534; padding: 8px 12px; border-radius: 6px;">• ${amenity}</span>`).join('')}
            </div>
          </div>

          <div style="margin-top: 40px; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            <p style="color: #6B7280; font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-IN')}</p>
            <p style="color: #6B7280; font-size: 14px;">Yorker Holidays Services Pvt. Ltd.</p>
          </div>
        </div>
      `;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      <Download size={18} />
      <span>Download PDF</span>
    </button>
  );
};

export default PDFExport;