
import { Form, Input, Button } from "antd";
import styles from "./Support.module.css";
import { Link } from "react-router";

const { TextArea } = Input;

const Support = () => {
  const onFinish = (values) => {
    console.log("Submitted:", values);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Support Center</h2>
        <p className={styles.subtitle}>
          We’re here to help you with the Ticket Management System.
        </p>
      </header>

      <section className={styles.section}>
        <h3>Contact Support</h3>
        <p>If you’re experiencing issues, you can reach out to us:</p>
        <ul className={styles.list}>
          <li>Email: support@tms.com</li>
          <li>Phone: +1 (800) 123-4567</li>
          <li>Live Chat: Available 9am – 6pm (Mon – Fri)</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Resources</h3>
        <ul className={styles.list}>
          <li>
            <Link to="/documentation">Documentation</Link>
          </li>
          <li>
            <Link to="/api_references">API References</Link>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3>Submit a Ticket</h3>
        <p>
          Can’t find the answer? Submit a support ticket and our team will
          assist you.
        </p>
        <Form className={styles.form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please enter a subject" }]}
          >
            <Input placeholder="Brief subject" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please describe your issue" }]}
          >
            <TextArea rows={4} placeholder="Describe your issue..." />
          </Form.Item>

          <Form.Item>
            <Button className="btn" type="primary" htmlType="submit">
              Submit Ticket
            </Button>
          </Form.Item>
        </Form>
      </section>

      <footer className={styles.footer}>
        <small>Support • Ticket Management System</small>
      </footer>
    </div>
  );
};

export default Support;
