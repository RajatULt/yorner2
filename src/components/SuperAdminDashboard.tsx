import React, { useState } from "react";
import {
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  Settings,
  Award,
  FileText,
  BarChart3,
  PieChart,
  Globe,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  DollarSign,
  Calendar,
  Home,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Card,
  Statistic,
  Progress,
  Tag,
  Switch,
  Rate,
  DatePicker,
  InputNumber,
  Tabs,
  Space
} from "antd";
import NotificationSystem from './NotificationSystem';
import { useToast } from './ToastNotification';
import { basicAdmins, agents, complaints, offers } from "../data/admins";
import { additionalAgents, additionalComplaints, additionalOffers, systemAnalytics } from '../data/extendedMockData';
import { bookings, performanceMetrics } from "../data/bookings";
import { additionalBookings } from '../data/extendedMockData';
import type { BasicAdmin, Agent, Complaint, Offer } from "../data/admins";

interface SuperAdminDashboardProps {
  userRole: string;
  onLogout: () => void;
  onBack: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  userRole,
  onLogout,
  onBack,
}) => {
  // Toast notifications
  const { showSuccess, showError, showInfo, ToastContainer } = useToast();

  // Role verification
  if (userRole !== 'Super Admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Super Admin role required to access this dashboard.</p>
          <button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showCruiseModal, setShowCruiseModal] = useState(false);
  const [showCMSModal, setShowCMSModal] = useState(false);
  
  // Combine all data
  const allAgents = [...agents, ...additionalAgents];
  const allComplaints = [...complaints, ...additionalComplaints];
  const allOffers = [...offers, ...additionalOffers];
  const allBookings = [...bookings, ...additionalBookings];
  
  // Handle permission management
  const handleManagePermissions = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowPermissionModal(true);
  };

  // Handle cruise management
  const handleManageCruise = () => {
    showInfo(
      'Cruise Management',
      'Advanced cruise management with hold periods: 7-day cruises (1 day hold), 15-day cruises (2 day hold)'
    );
  };

  // Handle CMS management
  const handleCMSManagement = () => {
    showInfo(
      'CMS Management',
      'Content Management System for blog posts, social media integration, and website content'
    );
  };

  // Agent columns with actions
  const agentColumns = [
    {
      title: 'Agent Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Agent) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {text.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region'
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (record: Agent) => (
        <div>
          <Tag color={record.performance.grade === 'A' ? 'green' : record.performance.grade === 'B' ? 'orange' : 'red'}>
            Grade {record.performance.grade}
          </Tag>
          <div className="text-sm text-gray-600 mt-1">
            {record.performance.totalBookings} bookings
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Agent) => (
        <Space>
          <Button size="small" onClick={() => handleManagePermissions(record)}>
            Permissions
          </Button>
          <Button size="small" onClick={() => setSelectedAgent(record)}>
            View
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="bg-[#f9fafb] text-gray-800 flex">
      {/* Toast Notifications */}
      <ToastContainer />
      
      <aside className="w-64 bg-gray-50 border-r fixed top-0 left-0 h-full flex flex-col items-center py-6 z-40">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">YH</span>
        </div>
        <h1 className="text-center text-sm text-yellow-600 font-semibold leading-tight px-3 mb-6">
          Yorker Holidays
          <br />
          Services Pvt. Ltd.
        </h1>
        <nav className="flex flex-col gap-2 w-full px-4">
          {[
            {
              key: "overview",
              label: "Overview",
              icon: <BarChart3 size={16} />,
            },
            { key: "agents", label: "Manage Agents", icon: <Users size={16} /> },
            {
              key: "cruises",
              label: "Manage Cruise",
              icon: <FileText size={16} />,
            },
            {
              key: "permissions",
              label: "Permissions",
              icon: <Lock size={16} />,
            },
            { key: "corporate", label: "Corporate", icon: <Award size={16} /> },
            { key: "cms", label: "CMS & Blog", icon: <FileText size={16} /> },
            { key: "analytics", label: "Analytics", icon: <PieChart size={16} /> }
          ].map((item, idx) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
          ${
            activeTab === item.key
              ? "bg-gray-200 text-purple-700"
              : "hover:bg-gray-100 text-gray-700"
          }`}
            >
              <span className="bg-white p-1 rounded-md shadow-sm">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      
      <div className="ps-64 w-full">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b bg-white shadow-sm w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center text-purple-600 font-semibold text-lg"
            >
              <Home size={20} className="mr-2" />
              Dashboard
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="font-bold text-lg">Super Admin</h1>
          </div>
          <div className="flex gap-4">
            {/* Notification System */}
            <NotificationSystem userId="super-admin" />
            
            <Button className="text-sm font-medium" type="default">
              System Logs
            </Button>
            <Button className="bg-purple-100 text-purple-700 border-none hover:text-purple-900">
              Control Panel
            </Button>
            <Button
              danger
              type="text"
              onClick={onLogout}
              className="flex items-center"
            >
              <LogOut size={16} className="mr-1" /> Logout
            </Button>
          </div>
        </header>

        {/* Main Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <Card
            bordered
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow"
          >
            <Statistic
              title={<span className="text-white">Total Users</span>}
              value={systemAnalytics.totalUsers}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">+12.5%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-teal-500 to-green-400 text-white shadow"
          >
            <Statistic
              title={<span className="text-white">Active Users</span>}
              value={systemAnalytics.activeUsers}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">+15.03%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow"
          >
            <Statistic
              title={<span className="text-white">Total Bookings</span>}
              value={systemAnalytics.totalBookings}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">+8.7%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-teal-500 to-green-400 text-white shadow"
          >
            <Statistic
              title={<span className="text-white">Revenue (Cr)</span>}
              value={systemAnalytics.totalRevenue / 1000000}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">+6.08%</span>}
            />
          </Card>
        </section>

        {/* Tab Content */}
        <div className="px-8 pb-12">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="text-sm text-gray-400 mb-2">
                Dashboards / Overview
              </div>
              <h2 className="text-2xl font-bold mb-6">System Overview</h2>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleManageCruise}
                  className="h-16"
                >
                  Manage Cruise Inventory
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleCMSManagement}
                  className="h-16"
                >
                  CMS & Blog Management
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={() => setActiveTab('analytics')}
                  className="h-16"
                >
                  View Analytics
                </Button>
              </div>
              
              {/* Agent Performance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allAgents.slice(0, 9).map((agent) => (
                  <Card key={agent.id} className="bg-white shadow hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <div className="text-md font-semibold">{agent.name}</div>
                        <div className="text-xs text-gray-400">{agent.region}</div>
                      </div>
                      <Tag
                        color={
                          agent.performance.grade === "A"
                            ? "green"
                            : agent.performance.grade === "B"
                            ? "orange"
                            : "red"
                        }
                      >
                        Grade {agent.performance.grade}
                      </Tag>
                    </div>
                    <div className="mt-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Bookings:</span>
                        <span className="font-medium">{agent.performance.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium text-green-600">
                          ₹{agent.performance.totalSales.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium">{agent.performance.successRate}%</span>
                      </div>
                      <Progress percent={agent.performance.successRate} size="small" />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="small" onClick={() => handleManagePermissions(agent)}>
                        Permissions
                      </Button>
                      <Button size="small" onClick={() => setSelectedAgent(agent)}>
                        Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Agents Management Tab */}
          {activeTab === 'agents' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Agent Management</h2>
                <Button type="primary" icon={<Plus />}>
                  Add New Agent
                </Button>
              </div>
              <Table
                columns={agentColumns}
                dataSource={allAgents}
                rowKey="id"
                className="bg-white rounded-lg shadow"
                pagination={{ pageSize: 15 }}
              />
            </div>
          )}

          {/* Cruise Management Tab */}
          {activeTab === 'cruises' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Cruise Management</h2>
                <div className="flex gap-2">
                  <Button icon={<Plus />}>Add Cruise</Button>
                  <Button type="primary" onClick={handleManageCruise}>
                    Manage Hold Periods
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 mb-4">Cruise inventory management with hold period configuration:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 7-day cruises: 1 day hold period</li>
                  <li>• 15-day cruises: 2 day hold period</li>
                  <li>• Pricing and itinerary management</li>
                  <li>• Cabin allocation and availability</li>
                </ul>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Permission Management</h2>
                <Button type="primary" icon={<Plus />}>
                  Create Role
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allAgents.slice(0, 6).map(agent => (
                  <Card key={agent.id} className="bg-white shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-600">{agent.region}</div>
                      </div>
                      <Tag color={agent.status === 'Active' ? 'green' : 'red'}>
                        {agent.status}
                      </Tag>
                    </div>
                    <Button 
                      block 
                      onClick={() => handleManagePermissions(agent)}
                    >
                      Manage Permissions
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Corporate Tab */}
          {activeTab === 'corporate' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Corporate Management</h2>
                <Button type="primary" icon={<Plus />}>
                  Add Corporate Client
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 mb-4">Corporate client management and B2B partnerships:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Corporate booking management</li>
                  <li>• Volume discount configuration</li>
                  <li>• Contract management</li>
                  <li>• Dedicated account managers</li>
                </ul>
              </div>
            </div>
          )}

          {/* CMS Tab */}
          {activeTab === 'cms' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Content Management</h2>
                <Button type="primary" onClick={handleCMSManagement}>
                  Open CMS Editor
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Blog Management" className="shadow">
                  <p className="text-gray-600 mb-4">Manage travel blog content and articles</p>
                  <Button block>Manage Blog Posts</Button>
                </Card>
                <Card title="Social Media" className="shadow">
                  <p className="text-gray-600 mb-4">Social media integration and content scheduling</p>
                  <Button block>Social Media Dashboard</Button>
                </Card>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">System Analytics</h2>
                <Button type="primary" icon={<Download />}>
                  Export Analytics
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card title="User Analytics" className="shadow">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Users:</span>
                      <span className="font-medium">{systemAnalytics.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="font-medium">{systemAnalytics.activeUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate:</span>
                      <span className="font-medium">{systemAnalytics.conversionRate}%</span>
                    </div>
                  </div>
                </Card>
                <Card title="Revenue Analytics" className="shadow">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span className="font-medium">₹{(systemAnalytics.totalRevenue / 1000000).toFixed(1)}Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Booking:</span>
                      <span className="font-medium">₹{systemAnalytics.averageBookingValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Satisfaction:</span>
                      <span className="font-medium">{systemAnalytics.customerSatisfaction}/5</span>
                    </div>
                  </div>
                </Card>
                <Card title="Performance Metrics" className="shadow">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Bookings:</span>
                      <span className="font-medium">{systemAnalytics.totalBookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers:</span>
                      <span className="font-medium">{systemAnalytics.repeatCustomerRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate:</span>
                      <span className="font-medium">{systemAnalytics.conversionRate}%</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Permission Management Modal */}
        <Modal
          title="Manage Agent Permissions"
          open={showPermissionModal}
          onCancel={() => {
            setShowPermissionModal(false);
            setSelectedAgent(null);
          }}
          footer={null}
          width={600}
        >
          {selectedAgent && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Agent Information</h4>
                <p><strong>Name:</strong> {selectedAgent.name}</p>
                <p><strong>Email:</strong> {selectedAgent.email}</p>
                <p><strong>Region:</strong> {selectedAgent.region}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Permissions</h4>
                <div className="space-y-2">
                  {[
                    'book_cruise',
                    'book_hotel', 
                    'view_bookings',
                    'manage_passengers',
                    'export_reports',
                    'access_analytics'
                  ].map(permission => (
                    <div key={permission} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="capitalize">{permission.replace('_', ' ')}</span>
                      <Switch defaultChecked={true} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="primary" className="flex-1">
                  Save Changes
                </Button>
                <Button onClick={() => setShowPermissionModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Agent Details Modal */}
        <Modal
          title="Agent Details"
          open={!!selectedAgent && !showPermissionModal}
          onCancel={() => setSelectedAgent(null)}
          footer={null}
          width={600}
        >
          {selectedAgent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedAgent.name}</h3>
                  <p className="text-gray-600">{selectedAgent.email}</p>
                  <Tag color={selectedAgent.status === 'Active' ? 'green' : 'red'}>
                    {selectedAgent.status}
                  </Tag>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  <p className="text-gray-900">{selectedAgent.region}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                  <p className="text-gray-900">{selectedAgent.joinedDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedAgent.contactInfo.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Performance Grade</label>
                  <Tag color={selectedAgent.performance.grade === 'A' ? 'green' : 'orange'}>
                    Grade {selectedAgent.performance.grade}
                  </Tag>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <p className="text-gray-900">{selectedAgent.contactInfo.address}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Card size="small">
                  <Statistic title="Total Bookings" value={selectedAgent.performance.totalBookings} />
                </Card>
                <Card size="small">
                  <Statistic 
                    title="Commission Earned" 
                    value={selectedAgent.performance.commissionEarned}
                    formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                  />
                </Card>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;