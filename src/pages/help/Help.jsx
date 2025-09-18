import styles from "./Help.module.css";
import { Link } from "react-router";

const Help = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Help Center</h2>
        <p className={styles.subtitle}>
          Find answers and guidance for the Ticket Management System.
        </p>
      </header>

      <section className={styles.section}>
        <h3>Getting Started</h3>
        <p>
          New to the system? Visit our{" "}
          <Link to="/documentation">documentation</Link> for setup guides,
          tutorials, and best practices.
        </p>
      </section>

      <section className={styles.section}>
        <h3>Frequently Asked Questions</h3>
        <ul className={styles.list}>
          <li>How do I create a new ticket?</li>
          <li>How can I reset my password?</li>
          <li>Where can I view system notifications?</li>
          <li>How do I integrate with third-party apps?</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Contact Support</h3>
        <p>
          Still stuck? Reach out through the{" "}
          <Link to="/support">Support Center</Link> for personalized assistance.
        </p>
      </section>

      <footer className={styles.footer}>
        <small>Help • Ticket Management System</small>
      </footer>
    </div>
  );
};

export default Help;
