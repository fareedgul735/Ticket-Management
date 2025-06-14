import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRyrLhM87ZEyiGN5s7VfO-3dEQFbE17rI",
  authDomain: "ticket-management-19e39.firebaseapp.com",
  projectId: "ticket-management-19e39",
  storageBucket: "ticket-management-19e39.appspot.com",
  messagingSenderId: "615534558254",
  appId: "1:615534558254:web:eecf1b4caa54109194f3bf",
  measurementId: "G-76P6G3NGT0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword
}

            // <Form className="login-container">
            //   <div className="btn-toggle">
            //     <button>Login</button>
            //     <button>Signup</button>
            //   </div>
            //   <Row gutter={6}>
            //     <Col sm={24} md={12} offset={12}>
            //       <Form.Item
            //         label="Email"
            //         name={"email"}
            //         colon={false}
            //         rules={[
            //           {
            //             required: true,
            //             whitespace: true,
            //           },
            //         ]}
            //       >
            //         <Input type="email" placeholder="Enter the Email Address" />
            //       </Form.Item>
            //     </Col>
            //     <Col sm={24} md={12} offset={12}>
            //       <Form.Item
            //         label="Password"
            //         name={"password"}
            //         colon={false}
            //         rules={[
            //           {
            //             required: true,
            //             whitespace: true,
            //           },
            //           {
            //             pattern: PASSWORD_PATTERN,
            //             message:
            //               "Password must be 8+ chars, include uppercase, lowercase, number & special char.",
            //           },
            //         ]}
            //       >
            //         <Input type="password" placeholder="Enter the Password" />
            //       </Form.Item>
            //     </Col>
            //     <Col sm={24} md={12} offset={12}>
            //       <Form.Item
            //         style={{ textAlign: "right" }}
            //       >
            //         <Button type="primary" htmlType="submit">
            //           Login
            //         </Button>
            //       </Form.Item>
            //     </Col>
            //   </Row>
            // </Form>