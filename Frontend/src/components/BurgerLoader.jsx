import { useEffect, useState } from "react";

const BurgerLoader = ({ minDuration = 1500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <div style={styles.burgerWrapper}>
          {/* Top bun */}
          <div style={styles.topBun} />
          {/* Sesame seeds */}
          <div style={{ ...styles.seed, top: "6px", left: "30px" }} />
          <div style={{ ...styles.seed, top: "4px", left: "55px" }} />
          <div style={{ ...styles.seed, top: "8px", left: "75px" }} />
          {/* Lettuce */}
          <div style={styles.lettuce} />
          {/* Cheese */}
          <div style={styles.cheese} />
          {/* Patty */}
          <div style={styles.patty} />
          {/* Bottom bun */}
          <div style={styles.bottomBun} />
        </div>

        {/* Bouncing dots */}
        <div style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <p style={styles.text}>Signing you in...</p>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); opacity: 0.4; }
            50% { transform: translateY(-8px); opacity: 1; }
          }
          @keyframes burgerBounce {
            0%, 100% { transform: translateY(0px) rotate(-2deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  box: {
    background: "#fff",
    borderRadius: "24px",
    padding: "40px 56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
  },
  burgerWrapper: {
    position: "relative",
    width: "120px",
    height: "90px",
    animation: "burgerBounce 0.8s ease-in-out infinite",
  },
  topBun: {
    position: "absolute",
    top: 0, left: 0,
    width: "120px",
    height: "36px",
    backgroundColor: "#f5a623",
    borderRadius: "60px 60px 0 0",
    boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.1)",
  },
  seed: {
    position: "absolute",
    width: "10px",
    height: "5px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    opacity: 0.7,
  },
  lettuce: {
    position: "absolute",
    top: "34px", left: "-4px",
    width: "128px",
    height: "10px",
    backgroundColor: "#5cb85c",
    borderRadius: "4px",
    boxShadow: "0 2px 0 #4a9e4a",
  },
  cheese: {
    position: "absolute",
    top: "42px", left: "-2px",
    width: "124px",
    height: "8px",
    backgroundColor: "#f9d71c",
    borderRadius: "2px",
  },
  patty: {
    position: "absolute",
    top: "50px", left: "4px",
    width: "112px",
    height: "18px",
    backgroundColor: "#8B4513",
    borderRadius: "4px",
    boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)",
  },
  bottomBun: {
    position: "absolute",
    top: "68px", left: "4px",
    width: "112px",
    height: "20px",
    backgroundColor: "#e8922a",
    borderRadius: "0 0 12px 12px",
  },
  dotsRow: {
    display: "flex",
    gap: "8px",
    marginTop: "24px",
    marginBottom: "10px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#e8452c",
    animation: "bounce 0.6s ease-in-out infinite",
  },
  text: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#e8452c",
    letterSpacing: "0.4px",
    margin: 0,
  },
};

export default BurgerLoader;