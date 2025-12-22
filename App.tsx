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
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#fafafa",
        color: "#111",
      }}
    >
      <Header />
      <main style={{ paddingTop: 80 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
