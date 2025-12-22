import React from "react";
import { useAuth } from "../lib/useAuth";

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: 24,
  boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
};

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: "10px 18px",
  borderRadius: 999,
  fontSize: 13,
  cursor: "pointer",
  background: active ? "#000" : "transparent",
  color: active ? "#fff" : "#555",
  border: "none",
});

const HomePage = () => {
  const [tab, setTab] = useState<"link" | "file" | "text">("link");
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #f5f5f7 0%, #eaeaee 100%)",
      }}
    >
      <div style={{ width: 520, padding: 40, ...glass }}>
        {/* Title */}
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          Privacy <span style={{ opacity: 0.4 }}>decoded</span>
        </h1>

        <p style={{ opacity: 0.7, marginBottom: 28 }}>
          Understand complex privacy policies in seconds.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: 6,
            borderRadius: 999,
            background: "rgba(0,0,0,0.06)",
            marginBottom: 24,
          }}
        >
          <button style={tabStyle(tab === "link")} onClick={() => setTab("link")}>
            Link
          </button>
          <button style={tabStyle(tab === "file")} onClick={() => setTab("file")}>
            File
          </button>
          <button style={tabStyle(tab === "text")} onClick={() => setTab("text")}>
            Text
          </button>
        </div>

        {/* Input Area */}
        {tab === "link" && (
          <input
            placeholder="https://example.com/privacy"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "1px solid #ddd",
              marginBottom: 20,
              fontSize: 14,
            }}
          />
        )}

        {tab === "file" && (
          <input
            type="file"
            style={{
              width: "100%",
              marginBottom: 20,
            }}
          />
        )}

        {tab === "text" && (
          <textarea
            placeholder="Paste privacy policy text here…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 14,
              border: "1px solid #ddd",
              marginBottom: 20,
              fontSize: 14,
              resize: "none",
            }}
          />
        )}

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 999,
            border: "none",
            background: "#000",
            color: "#fff",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Start Audit
        </button>

        {/* Footer */}
        <div style={{ marginTop: 16, textAlign: "center", fontSize: 12 }}>
          <div style={{ opacity: 0.6 }}>Free plan · Limited scans</div>
          <div style={{ marginTop: 6, cursor: "pointer" }}>
            Upgrade to Pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
