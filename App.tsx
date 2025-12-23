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
        background: "#f5f5f7",
        fontFamily: "-apple-system, system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
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
