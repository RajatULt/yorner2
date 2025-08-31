import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter, Search, Ship, Building, MapPin, Calendar } from 'lucide-react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, DatePicker, Tag, Space } from 'antd';
import { cruises } from '../data/cruises';
import { hotels } from '../data/hotels';
import { additionalCruises, additionalHotels } from '../data/extendedMockData';
import type { Cruise } from '../data/cruises';
import type { Hotel } from '../data/hotels';

interface InventoryManagementProps {
  userRole: string;
  onClose: () => void;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({ userRole, onClose }) => {
  const [activeTab, setActiveTab] = useState<'cruises' | 'hotels'>('cruises');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Cruise | Hotel | null>(null);
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    type: '',
    status: 'All'
  });

  // Combine data
  const allCruises = [...cruises, ...additionalCruises];
  const allHotels = [...hotels, ...additionalHotels];

  // Cruise columns
  const cruiseColumns = [
    {
      title: 'Cruise Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Cruise) => (
        <div className="flex items-center gap-3">
          <Ship size={16} className="text-blue-500" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.cruiseLine}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Route',
      key: 'route',
      render: (record: Cruise) => `${record.from} → ${record.to}`
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} nights`
    },
    {
      title: 'Price',
      dataIndex: 'pricePerPerson',
      key: 'pricePerPerson',
      render: (price: number) => `₹${price.toLocaleString('en-IN')}`
    },
    {
      title: 'Ship Type',
      dataIndex: 'shipType',
      key: 'shipType',
      render: (type: string) => <Tag color="blue">{type}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Cruise) => (
        <Space>
          <Button size="small" icon={<Edit />} onClick={() => setEditingItem(record)}>
            Edit
          </Button>
          <Button size="small" icon={<Trash2 />} danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  // Hotel columns
  const hotelColumns = [
    {
      title: 'Hotel Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Hotel) => (
        <div className="flex items-center gap-3">
          <Building size={16} className="text-purple-500" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.hotelChain}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-400" />
          <span>{location}</span>
        </div>
      )
    },
    {
      title: 'Star Rating',
      dataIndex: 'starRating',
      key: 'starRating',
      render: (rating: number) => (
        <div className="flex items-center gap-1">
          {[...Array(rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
          <span className="ml-1 text-sm text-gray-600">({rating})</span>
        </div>
      )
    },
    {
      title: 'Price/Night',
      dataIndex: 'pricePerNight',
      key: 'pricePerNight',
      render: (price: number) => `₹${price.toLocaleString('en-IN')}`
    },
    {
      title: 'Type',
      dataIndex: 'hotelType',
      key: 'hotelType',
      render: (type: string) => <Tag color="purple">{type}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Hotel) => (
        <Space>
          <Button size="small" icon={<Edit />} onClick={() => setEditingItem(record)}>
            Edit
          </Button>
          <Button size="small" icon={<Trash2 />} danger>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('cruises')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'cruises' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Ship size={18} />
              Cruises
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'hotels' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Building size={18} />
              Hotels
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Input
                  placeholder="Filter by city"
                  value={filters.city}
                  onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <Select
                  placeholder="Select state"
                  value={filters.state}
                  onChange={(value) => setFilters(prev => ({ ...prev, state: value }))}
                  className="w-full"
                >
                  <Select.Option value="">All States</Select.Option>
                  <Select.Option value="Maharashtra">Maharashtra</Select.Option>
                  <Select.Option value="Goa">Goa</Select.Option>
                  <Select.Option value="Tamil Nadu">Tamil Nadu</Select.Option>
                  <Select.Option value="Kerala">Kerala</Select.Option>
                  <Select.Option value="Karnataka">Karnataka</Select.Option>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <Select
                  placeholder="Select type"
                  value={filters.type}
                  onChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                  className="w-full"
                >
                  <Select.Option value="">All Types</Select.Option>
                  {activeTab === 'cruises' ? (
                    <>
                      <Select.Option value="Mega Ship">Mega Ship</Select.Option>
                      <Select.Option value="Luxury Ship">Luxury Ship</Select.Option>
                      <Select.Option value="Family Ship">Family Ship</Select.Option>
                    </>
                  ) : (
                    <>
                      <Select.Option value="Luxury">Luxury</Select.Option>
                      <Select.Option value="Business">Business</Select.Option>
                      <Select.Option value="Budget">Budget</Select.Option>
                    </>
                  )}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Select
                  value={filters.status}
                  onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                  className="w-full"
                >
                  <Select.Option value="All">All Status</Select.Option>
                  <Select.Option value="Active">Active</Select.Option>
                  <Select.Option value="Inactive">Inactive</Select.Option>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {activeTab === 'cruises' ? 'Cruise Inventory' : 'Hotel Inventory'}
            </h3>
            <Button
              type="primary"
              icon={<Plus />}
              onClick={() => setShowAddModal(true)}
            >
              Add New {activeTab === 'cruises' ? 'Cruise' : 'Hotel'}
            </Button>
          </div>

          {/* Data Table */}
          <Table
            columns={activeTab === 'cruises' ? cruiseColumns : hotelColumns}
            dataSource={activeTab === 'cruises' ? allCruises : allHotels}
            rowKey="id"
            className="bg-white rounded-lg"
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true
            }}
          />
        </div>

        {/* Add/Edit Modal */}
        <Modal
          title={`${editingItem ? 'Edit' : 'Add'} ${activeTab === 'cruises' ? 'Cruise' : 'Hotel'}`}
          open={showAddModal || !!editingItem}
          onCancel={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          footer={null}
          width={800}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              {activeTab === 'cruises' ? 'Cruise' : 'Hotel'} management form would be implemented here with all necessary fields.
            </p>
            <div className="flex gap-3">
              <Button type="primary" className="flex-1">
                {editingItem ? 'Update' : 'Add'} {activeTab === 'cruises' ? 'Cruise' : 'Hotel'}
              </Button>
              <Button onClick={() => {
                setShowAddModal(false);
                setEditingItem(null);
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InventoryManagement;