import styles from "./Documentation.module.css";

const Documentation = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Ticket Management System Documentation</h2>
        <p className={styles.subtitle}>
          Learn how to use, configure, and integrate the TMS effectively.
        </p>
      </header>

      <section className={styles.section}>
        <h3>Getting Started</h3>
        <p>
          The Ticket Management System (TMS) helps organizations manage support
          tickets efficiently. Users can create, assign, track, and resolve tickets
          in a collaborative environment.
        </p>
        <ul className={styles.list}>
          <li>Sign up and create your account.</li>
          <li>Set up your profile and team roles.</li>
          <li>Start creating and assigning tickets.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Core Features</h3>
        <ul className={styles.list}>
          <li><strong>Dashboard:</strong> Overview of active, pending, and closed tickets.</li>
          <li><strong>Ticket Management:</strong> Create, assign, prioritize, and track progress.</li>
          <li><strong>Notifications:</strong> Stay updated on ticket changes and new assignments.</li>
          <li><strong>Reports:</strong> Generate weekly and monthly performance insights.</li>
          <li><strong>API:</strong> Integrate with third-party tools using the REST API.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>User Roles</h3>
        <p>TMS supports different roles with varying permissions:</p>
        <ul className={styles.list}>
          <li><strong>Admin:</strong> Full access to all features and settings.</li>
          <li><strong>Agent:</strong> Manage and resolve assigned tickets.</li>
          <li><strong>Viewer:</strong> Read-only access to monitor ticket progress.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Integration</h3>
        <p>
          TMS can be integrated with external services like Slack, Email, and custom apps
          via our <strong>API References</strong> page. This allows seamless notifications
          and automation in your existing workflows.
        </p>
      </section>

      <section className={styles.section}>
        <h3>FAQ</h3>
        <ul className={styles.list}>
          <li><strong>How do I reset my password?</strong> → Go to Account Settings → Reset Password.</li>
          <li><strong>Can I export reports?</strong> → Yes, reports are available for download in CSV and PDF.</li>
          <li><strong>How do I assign a ticket?</strong> → Open a ticket → Assign to team member.</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <small>Ticket Management System • Documentation v1.0.0</small>
      </footer>
    </div>
  );
};

export default Documentation;


