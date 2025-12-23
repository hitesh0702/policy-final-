import React, { useState, useRef, useEffect } from "react";

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [fileName, setFileName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check screen size to adjust UI dynamically
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  // Dynamic Styles
  const containerStyle: React.CSSProperties = {
    minHeight: "100svh",
    background: "radial-gradient(circle at top, #ffffff 0%, #f4f4f9 100%)",
    display: "flex",
    flexDirection: "column",
    fontFamily: '-apple-system, system-ui, sans-serif',
    transition: "all 0.3s ease",
  };

  const cardStyle: React.CSSProperties = {
    width: "100%",
    // Mobile is narrow, Desktop is wider
    maxWidth: isMobile ? "100%" : "480px", 
    padding: isMobile ? "32px 24px" : "48px",
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    borderRadius: isMobile ? 32 : 40,
    boxShadow: isMobile 
      ? "0 20px 40px rgba(0,0,0,0.08)" 
      : "0 40px 100px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      {/* RESPONSIVE HEADER */}
      <header style={{ padding: isMobile ? "20px 16px" : "30px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: 1000,
          padding: "12px 24px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.05)"
        }}>
          <strong style={{ fontSize: isMobile ? 16 : 18 }}>PolicyPulse</strong>
          <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {!isMobile && <span style={{ fontSize: 14, color: "#636366", cursor: "pointer" }}>Features</span>}
            <span style={{ fontSize: 14, fontWeight: 600, color: "#007AFF", cursor: "pointer" }}>Sign In</span>
          </nav>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={cardStyle}>
          <h1 style={{ 
            fontSize: isMobile ? 28 : 36, 
            fontWeight: 800, 
            marginBottom: 12, 
            letterSpacing: "-1px" 
          }}>
            Privacy <span style={{ color: "#86868b", fontWeight: 400 }}>decoded</span>
          </h1>

          <p style={{ 
            fontSize: isMobile ? 16 : 18, 
            color: "#424245", 
            marginBottom: 32, 
            lineHeight: "1.5" 
          }}>
            Understand complex privacy policies in seconds.
          </p>

          {/* TABS */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.05)", borderRadius: 14, padding: 4, marginBottom: 24 }}>
            {["link", "file", "text"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t as any)}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 10,
                  border: "none",
                  background: mode === t ? "#fff" : "transparent",
                  color: mode === t ? "#000" : "#636366",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: mode === t ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
                  cursor: "pointer",
                  transition: "0.2s"
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* INPUT AREA */}
          <div style={{ minHeight: 150 }}>
            {mode === "link" && (
              <input
                type="url"
                placeholder="Paste policy URL..."
                style={{ width: "100%", height: 56, padding: "0 20px", borderRadius: 16, border: "1px solid #d2d2d7", fontSize: 16, outline: "none" }}
              />
            )}

            {mode === "file" && (
              <div
                onClick={handleFileClick}
                style={{
                  border: "2px dashed #d2d2d7",
                  borderRadius: 16,
                  padding: isMobile ? "40px 20px" : "60px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.01)",
                }}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.txt" />
                <div style={{ fontSize: 16, fontWeight: 600 }}>{fileName || "Click to upload PDF"}</div>
                <div style={{ fontSize: 13, color: "#86868b", marginTop: 8 }}>Supports PDF, TXT up to 10MB</div>
              </div>
            )}

            {mode === "text" && (
              <textarea
                placeholder="Paste text here..."
                style={{ width: "100%", height: 150, padding: 20, borderRadius: 16, border: "1px solid #d2d2d7", fontSize: 16, resize: "none", outline: "none" }}
              />
            )}
          </div>

          <button
            style={{
              width: "100%",
              height: 60,
              borderRadius: 18,
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: 17,
              fontWeight: 600,
              marginTop: 24,
              cursor: "pointer",
              transition: "transform 0.1s active",
            }}
          >
            Start Free Audit
          </button>
        </div>
      </main>

      <footer style={{ padding: "30px", textAlign: "center", fontSize: 13, color: "#86868b" }}>
        © 2025 PolicyPulse · Built for clarity
      </footer>
    </div>
  );
};

export default HomePage;
