import { Link } from "react-router";
import "../components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Ticket Management System</h2>
          <p className="footer-desc">
            Manage tickets, employees, and organizations efficiently.
          </p>
        </div>

        <div className="footer-section">
          <h3>Dashboard</h3>
          <ul>
            <li>
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <Link to="/tasks">Tickets</Link>
            </li>
            <li>
              <Link to="/employee">Employees</Link>
            </li>
            <li>
              <Link to="/organization">Organizations</Link>
            </li>
            <li>
              <Link to="/setting">Settings</Link>
            </li>
            <li>
              <Link to="/helptms ">Help Center</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>
              <Link to="/documentation">Documentation</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/api_references">API Reference</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@ticketms.com</p>
          <p>Phone: +92 300 1234567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Ticket Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
