import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoadingPage from "./components/LoadingPage";
import ReportPage from "./components/ReportPage";
import AccountPage from "./components/AccountPage";

const App: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        background: "#f5f5f7",
        color: "#111",
        overflow: "hidden", // 🔥 PREVENT PAGE SCROLL
      }}
    >
      {/* Header takes real space (NOT fixed) */}
      <Header />

      {/* Main content area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px 16px",
          overflow: "hidden", // 🔥 PREVENT DOUBLE SCROLL
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
