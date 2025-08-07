import { useEffect, useState } from "react";
import styles from "../styles/components/privacy.module.css";

const KEY = "ss_privacy_accept_v1";

export default function PrivacyBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(KEY)) {
      setOpen(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

return (
  <div className={styles["privacy-banner"]} role="dialog" aria-live="polite">
    <p>
      We use cookies for Google Analytics.{" "}
      <a href="/privacy">See our Privacy Policy</a>.
    </p>
    <button onClick={accept} aria-label="Accept cookies">Accept</button>
  </div>
);
}
