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
  Chart,
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
  
  const [activeTab, setActiveTab] = useState("overview");
  
  // Combine all data
  const allAgents = [...agents, ...additionalAgents];
  const allComplaints = [...complaints, ...additionalComplaints];
  const allOffers = [...offers, ...additionalOffers];
  const allBookings = [...bookings, ...additionalBookings];
  
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
            { key: "users", label: "Manage agents", icon: <Users size={16} /> },
            {
              key: "performance",
              label: "Manage Cruise",
              icon: <FileText size={16} />,
            },
            {
              key: "profile",
              label: "User Profile",
              icon: <UserCheck size={16} />,
            },
            { key: "account", label: "Account", icon: <Settings size={16} /> },
            { key: "corporate", label: "Corporate", icon: <Award size={16} /> },
            { key: "blog", label: "Blog", icon: <FileText size={16} /> },
            { key: "social", label: "Social", icon: <Globe size={16} /> },
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
              title={<span className="text-white">Visits</span>}
              value={systemAnalytics.totalUsers}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">-0.03%</span>}
            />
          </Card>
          <Card
            bordered
            className="bg-gradient-to-br from-teal-500 to-green-400 text-white shadow"
          >
            <Statistic
              title={<span className="text-white">New Users</span>}
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
              title={<span className="text-white">Active Users</span>}
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
              title={<span className="text-white">Views</span>}
              value={systemAnalytics.totalRevenue / 1000000}
              valueStyle={{ color: "white" }}
              suffix={<span className="text-xs text-white ml-1">M +6.08%</span>}
            />
          </Card>
        </section>

        {/* Placeholder for Tabs and Tables */}
        <div className="px-8 pb-12">
          <div className="text-sm text-gray-400 mb-2">
            Dashboards / Overview
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Users Projects Operating Status
            </h2>
            <div className="text-sm text-gray-500">Week</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6 mb-10">
            <div className="text-center text-gray-400 py-12">
              {/* Bookings & Location Graph */}
              <div className="px-8 pb-6">
                <Card className="bg-white shadow rounded-lg p-6 w-full">
                  <h3 className="text-sm text-teal-600 font-semibold mb-4">
                    Bookings & Location
                  </h3>
                  <div className="flex items-end justify-around h-64">
                    {[
                      { label: "Jan", value: 100 },
                      { label: "Feb", value: 180 },
                      { label: "Mar", value: 150 },
                      { label: "Apr", value: 200 },
                      { label: "May", value: 243, highlight: true },
                      { label: "Jun", value: 170 },
                      { label: "Jul", value: 190 },
                    ].map(({ label, value, highlight }, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          className={`rounded-t-lg w-10 transition-all duration-300 ${
                            highlight ? "bg-teal-400" : "bg-gray-200"
                          }`}
                          style={{ height: `${value}px` }}
                        ></div>
                        {highlight && (
                          <div className="text-xs -mt-6 mb-2 px-2 py-1 bg-black text-white rounded-full">
                            {value}K
                          </div>
                        )}
                        <span className="mt-2 text-xs text-gray-700">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              <p>Bookings & Location Chart Placeholder</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAgents.slice(0, 9).map((agent) => (
              <Card key={agent.id} className="bg-white shadow">
                <div className="flex justify-between items-center">
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
                    {agent.performance.grade}
                  </Tag>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Bookings</span>
                    <span>{agent.performance.totalBookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue</span>
                    <span>
                      ₹{agent.performance.totalSales.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span>{agent.performance.successRate}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
