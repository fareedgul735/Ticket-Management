import { useEffect, useState } from "react";

const Network = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      style={{
        width: "100%",
        zIndex: "9999999999",
        position: "fixed",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000000, #434343)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "6px solid #fff",
            position: "relative",
            animation: "pulse 2s infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "20px",
              height: "20px",
              margin: "-10px 0 0 -10px",
              background: "#ff4444",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>

      <h1
        style={{
          fontSize: "6vw",
          margin: "0",
          fontWeight: "bold",
          animation: "fadeInDown 1.5s",
        }}
      >
        You’re Offline
      </h1>

      <p
        style={{
          maxWidth: "600px",
          fontSize: "1.2rem",
          margin: "10px 0 30px",
          animation: "fadeInUp 1.5s",
        }}
      >
        Looks like you lost your internet connection. Please check and try
        again.
      </p>

      <button
        style={{
          padding: "12px 28px",
          background: "linear-gradient(135deg, #000000, #434343)",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s ease",
          animation: "fadeIn 2s",
        }}
        onClick={() => window.location.reload()}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#3a9bdc")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4cafef")}
      >
        Retry Connection
      </button>

      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.6); }
            70% { box-shadow: 0 0 0 20px rgba(255, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0); }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Network;
