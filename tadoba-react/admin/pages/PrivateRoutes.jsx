// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedPermissions = [] }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("admin-role");

  // safely parse permissions
  let permissions = [];
  try {
    permissions = JSON.parse(localStorage.getItem("admin-permissions") || "[]");
  } catch (err) {
    console.warn("Failed to parse permissions:", err);
  }

  // 🔐 1. Not logged in
  if (!token) return <Navigate to="/admin/login" />;

  // ✅ 2. Admin has full access
  if (role === "admin") return children;

  // 🔐 3. Check if user has required permission
  const hasAccess =
    allowedPermissions.length === 0 || // if no permissions specified, allow by default
    allowedPermissions.some((p) => permissions.includes(p));

  if (hasAccess) return children;

  // ❌ 4. Not allowed
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>403 - Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default ProtectedRoute;
