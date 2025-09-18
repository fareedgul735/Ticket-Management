import styles from "./Setting.module.css";

const Setting = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" width="48" height="48">
              <rect width="24" height="24" rx="6" fill="#e6e6e6" />
              <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" fill="#cfcfcf" />
              <path d="M4 20a8 8 0 0116 0" fill="#dcdcdc" />
            </svg>
          </div>
          <div className={styles.profileText}>
            <div className={styles.name}>Ticket Manager</div>
            <div className={styles.status}>Support Dashboard</div>
          </div>
        </div>

        <div className={styles.menu}>
          <button className={styles.menuItem} aria-pressed="true">
            Setting
          </button>
          <button className={styles.menuItem}>OverView</button>
          <button className={styles.menuItem}>Profile</button>
          <button className={styles.menuItem}>Employees</button>
          <button className={styles.menuItem}>Organizations</button>
          <button className={styles.menuItem}>Tickets</button>
          <button className={styles.menuItem}>Help</button>
        </div>

        <div className={styles.footer}>
          <small>Ticket Management System • React + CSS Modules</small>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <h2>Setting</h2>
          <input
            className={styles.search}
            placeholder="Search tickets, users, or reports"
            aria-label="Search"
          />
        </header>

        <section className={styles.section}>
          <h3>Overview</h3>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>Total Tickets</div>
              <div className={styles.rowSubtitle}>124 tickets</div>
            </div>
            <button className={styles.linkBtn}>View All</button>
          </div>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>Pending Tickets</div>
              <div className={styles.rowSubtitle}>37 pending</div>
            </div>
            <button className={styles.linkBtn}>Review</button>
          </div>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>Rejected Tickets</div>
              <div className={styles.rowSubtitle}>87 Rejected</div>
            </div>
            <button className={styles.linkBtn}>History</button>
          </div>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>In-Progress Tickets</div>
              <div className={styles.rowSubtitle}>87 In-Progress</div>
            </div>
            <button className={styles.linkBtn}>History</button>
          </div>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>Completed Tickets</div>
              <div className={styles.rowSubtitle}>87 Completed</div>
            </div>
            <button className={styles.linkBtn}>History</button>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Notifications</h3>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>Ticket Updates</div>
              <div className={styles.rowSubtitle}>
                Get notified for ticket status changes
              </div>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.row}>
            <div>
              <div className={styles.rowTitle}>New Assignments</div>
              <div className={styles.rowSubtitle}>
                Alert me when tickets are assigned
              </div>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Reports</h3>
          <div className={styles.rowWithDesc}>
            <div>
              <div className={styles.rowTitle}>Weekly Summary</div>
              <div className={styles.rowSubtitle}>
                Download last week’s ticket stats
              </div>
            </div>
            <button className={styles.linkBtn}>Download</button>
          </div>
          <div className={styles.rowWithDesc}>
            <div>
              <div className={styles.rowTitle}>Monthly Reports</div>
              <div className={styles.rowSubtitle}>View monthly performance</div>
            </div>
            <button className={styles.linkBtn}>Open</button>
          </div>
        </section>

        <footer className={styles.mainFooter}>
          <small>Version 1.0.0 • Ticket System</small>
        </footer>
      </main>
    </div>
  );
};

export default Setting;
