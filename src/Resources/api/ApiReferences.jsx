
import styles from "./Api.module.css";

const ApiReferences = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>API References</h2>
        <p className={styles.subtitle}>
          Documentation and examples for integrating with the Ticket Management
          System API.
        </p>
      </header>

      <section className={styles.section}>
        <h3>Authentication</h3>
        <p>All requests require an API key in the header:</p>
        <pre
          className={styles.code}
        >{`Authorization: Bearer YOUR_API_KEY`}</pre>
      </section>

      <section className={styles.section}>
        <h3>Endpoints</h3>

        <div className={styles.endpoint}>
          <h4>GET /tickets</h4>
          <p>Retrieve a list of tickets with optional filters.</p>
          <pre className={styles.code}>{`GET /api/v1/tickets?status=open`}</pre>
        </div>

        <div className={styles.endpoint}>
          <h4>POST /tickets</h4>
          <p>Create a new support ticket.</p>
          <pre
            className={styles.code}
          >{`POST /api/v1/tickets{"title": "Login issue","description": "Unable to login with correct password","priority": "high"}`}</pre>
        </div>

        <div className={styles.endpoint}>
          <h4>PATCH /tickets/:id</h4>
          <p>Update an existing ticket.</p>
          <pre
            className={styles.code}
          >{`PATCH /api/v1/tickets/123{ "status": "resolved"}`}</pre>
        </div>

        <div className={styles.endpoint}>
          <h4>DELETE /tickets/:id</h4>
          <p>Delete a ticket permanently.</p>
          <pre className={styles.code}>{`DELETE /api/v1/tickets/123`}</pre>
        </div>
      </section>

      <section className={styles.section}>
        <h3>Error Codes</h3>
        <ul className={styles.list}>
          <li>
            <strong>400</strong> – Bad Request (invalid data)
          </li>
          <li>
            <strong>401</strong> – Unauthorized (missing/invalid API key)
          </li>
          <li>
            <strong>404</strong> – Not Found (resource doesn’t exist)
          </li>
          <li>
            <strong>500</strong> – Internal Server Error
          </li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <small>Ticket Management System API • v1.0.0</small>
      </footer>
    </div>
  );
};

export default ApiReferences;
