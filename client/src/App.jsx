import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  DashBoard,
  Leads,
  FollowUps,
  Tasks,
  CashBook,
  Sales,
  Vouchers,
  Login,
  Register,
  CreateSale,
  User,
  Request,
  Refunds,
  Employees,
  Clients,
  Inventories,
  Societies,
  Projects,
  CreateCashBook,
  ViewCashBook,
  Lead,
  Notifications,
  Ledger,
  AllFollowUps,
  ForgotPassword,
  InputCode,
  ResetPassword,
  Transcript,
} from "./Pages";
import { Navbar, Sidebar } from "./Components";
import LeadRefunds from "./Pages/Leads/Refund/Refund";
import VoucherPage from "./Pages/Vouchers/VoucherPage";
import Home from "./Client Panel/Home";
import TranscriptPage from "./Pages/Transcript/TranscriptPage";
import SocialMediaLeads from "./Pages/Leads/SocialMediaLeads";
import { useSelector } from "react-redux";

const App = () => {
  const { loggedUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  // Adjust sidebar visibility on window resize
  useEffect(() => {
    if (window.innerWidth < 768) setShowSidebar(false);
    else setShowSidebar(true);
  }, [window.innerWidth]);

  return (
    <div className="flex flex-col w-full h-screen bg-[#f6f9fa]">
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/auth/*" element={<AuthRoutes loggedUser={loggedUser} />} />

        {/* Protected Routes for non-client users */}
        {loggedUser && loggedUser.role !== "client" && (
          <Route path="/*" element={<ProtectedRoutes showSidebar={showSidebar} />} />
        )}

        {/* Protected Routes for client users */}
        {loggedUser && loggedUser.role === "client" && (
          <Route path="/*" element={<ClientRoutes />} />
        )}

        {/* Fallback: if no user is logged in, redirect to /auth/login */}
        {!loggedUser && <Route path="/*" element={<Navigate to="/auth/login" />} />}
      </Routes>

      {/* Download routes (can be outside the main layout) */}
      <Routes>
        <Route path="/download/transcript" element={<TranscriptPage />} />
        <Route path="/download/voucher" element={<VoucherPage />} />
      </Routes>
    </div>
  );
};

// Authentication Routes Component
const AuthRoutes = ({ loggedUser }) => {
  // If user is already logged in, redirect to home
  if (loggedUser) return <Navigate to="/" replace />;
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot_password" element={<ForgotPassword />} />
      <Route path="newpassword" element={<ResetPassword />} />
      <Route path="forgot_password/enter_code" element={<InputCode />} />
      <Route path="change_password" element={<Navigate to="/auth/register" replace />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

// Protected Routes for non-client users with Sidebar and Navbar
const ProtectedRoutes = ({ showSidebar }) => {
  return (
    <div className={`flex h-screen font-primary ${window.location.pathname.includes("/client/") || window.location.pathname.includes("download") ? "hidden" : "visible"}`}>
      <Sidebar showSidebar={showSidebar} setShowSidebar={() => {}} />
      <div className="flex flex-col w-full overflow-y-scroll">
        <Navbar showSidebar={showSidebar} setShowSidebar={() => {}} />
        <div className="flex p-[1rem] w-full">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/auth/register" element={<Navigate to="/" replace />} />
            <Route path="/auth/login" element={<Navigate to="/" replace />} />
            <Route path="/myLeads" element={<Leads />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/socialmedialeads" element={<SocialMediaLeads />} />
            <Route path="/leads/call-reminders" element={<AllFollowUps />} />
            <Route path="/leads/ledger" element={<Navigate to="/leads" replace />} />
            <Route path="/leads/ledger/:leadId" element={<Ledger />} />
            <Route path="/leads/:leadId" element={<Lead />} />
            <Route path="/leads/followUps" element={<Navigate to="/leads" replace />} />
            <Route path="/leads/followUps/:leadId" element={<FollowUps />} />
            <Route path="/leads/refund" element={<Navigate to="/leads" replace />} />
            <Route path="/leads/refund/:leadId" element={<LeadRefunds />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/inventories" element={<Inventories />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/authorization/request" element={<Request />} />
            <Route path="/authorization/refund" element={<Refunds />} />
            <Route path="/cashbook" element={<CashBook />} />
            <Route path="/cashbook/create" element={<CreateCashBook />} />
            <Route path="/view/cashbook" element={<ViewCashBook />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/sales/create" element={<CreateSale />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/voucher" element={<Vouchers showSidebar={showSidebar} />} />
            <Route path="/notifications" element={<Notifications />} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Protected Routes for client users
const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add any additional client routes here */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
