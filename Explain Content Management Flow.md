# Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

tell me workflow of this project

### Planner Response

I'll explore your SmartLearn project to understand and explain its workflow. Let me look at the project structure and key files.

*Listed directory [SmartLearn](file:///home/faujdar/Desktop/SmartLearn) *

*Viewed [README.md](file:///home/faujdar/Desktop/SmartLearn/README.md) *

### Planner Response

Based on the README and project structure, here's the **workflow of your SmartLearn project**:

---

## 🔄 SmartLearn Project Workflow

### **Architecture Overview**
```
┌─────────────────────┐     HTTP/REST      ┌─────────────────────┐
│   React Frontend    │ ◄──────────────────► │   Express Backend   │
│   (Vite + React)    │                      │    (Node.js API)    │
│   Port: 5173        │                      │    Port: 5000       │
└─────────────────────┘                      └─────────────────────┘
                                                       │
                                                       ▼
                                             ┌─────────────────────┐
                                             │      MongoDB        │
                                             │    (Database)       │
                                             └─────────────────────┘
```

---

### **1. User Authentication Flow**
1. **Register** → User submits credentials → Backend hashes password (bcrypt) → Stores in MongoDB → Returns JWT token
2. **Login** → Backend validates credentials → Returns JWT token → Frontend stores in `localStorage` → Uses token for authenticated requests

---

### **2. Role-Based Access**
| Role | Can Do |
|------|--------|
| **Student** | Browse courses, enroll (with Razorpay payment), read/write articles, like articles |
| **Instructor** | All student abilities + create/manage courses & lessons |
| **Admin** | Full platform control + admin dashboard |

---

### **3. Course Enrollment Flow** (with Razorpay)
1. User clicks **Enroll** on a course
2. If **free course** → Direct enrollment
3. If **paid course**:
   - Backend creates Razorpay order (`/api/payments/create-order`)
   - Frontend opens Razorpay checkout modal
   - On success → Backend verifies payment (`/api/payments/verify`)
   - User gets enrolled → Progress tracked

---

### **4. Content Management Flow**
- **Courses**: Instructors create courses → Add lessons → Students enroll & progress
- **Articles**: Users write articles (rich text editor) → Other users can read & like

---

### **5. API Request Flow**
```
Frontend (React) 
    ↓ axios request with JWT in headers
Backend Middlewares:
    1. Helmet (security headers)
    2. Rate Limiter (DDoS protection)
    3. CORS (origin validation)
    4. Auth Middleware (JWT verification)
    5. Role Middleware (permission check)
    ↓
Controller (business logic)
    ↓
Model (Mongoose → MongoDB)
    ↓
Response → Frontend
```

---

### **6. Development Workflow**
You currently have both servers running:
- **Backend**: `npm run dev` in `/backend` (Port 5000)
- **Frontend**: `npm run dev` in `/frontend` (Port 5173)

---

### **Key Files to Know**
| Purpose | Location |
|---------|----------|
| API Routes | `backend/src/routes/` |
| Controllers | `backend/src/controllers/` |
| Database Models | `backend/src/models/` |
| React Pages | `frontend/src/pages/` |
| Auth Context | `frontend/src/context/` |
| API Services | `frontend/src/services/` |

Would you like me to dive deeper into any specific part of the workflow (e.g., payment flow, authentication, or a specific feature)?

### User Input

now i would like to understand User Authentication Flow with files code

### Planner Response

Let me explore all the authentication-related files to give you a complete understanding of the flow.

### User Input

Continue

*Listed directory [controllers](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers) *

*Listed directory [middlewares](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares) *

*Listed directory [routes](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes) *

### Planner Response

Now let me view all the authentication-related files:

*Viewed [auth.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/auth.js) *

*Viewed [authMiddleware.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js) *

*Viewed [authRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/authRoutes.js) *

*Viewed [User.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/User.js) *

### Planner Response

Now let me get the frontend authentication files:

*Viewed [AuthContext.jsx](file:///home/faujdar/Desktop/SmartLearn/frontend/src/context/AuthContext.jsx) *

*Viewed [Login.jsx](file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Login.jsx) *

*Viewed [Register.jsx](file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Register.jsx) *

*Searched filesystem*

*Viewed [auth.js](file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js) *

### Planner Response

Now I have all the authentication files. Let me present the complete **User Authentication Flow** with code:

---

## 🔐 User Authentication Flow - Complete Breakdown

### **Visual Flow Diagram**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           REGISTRATION FLOW                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   [Register.jsx]  →  [auth.js service]  →  [authRoutes.js]  →  [auth.js]     │
│   (Form UI)          (API call)            (Route)             (Controller)   │
│                                                    ↓                          │
│                                              [User.js Model]                  │
│                                              (Hash password & save)           │
│                                                    ↓                          │
│                                            Returns JWT Token                  │
│                                                    ↓                          │
│                                            Redirect to Login                  │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              LOGIN FLOW                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   [Login.jsx]  →  [auth.js service]  →  [authRoutes.js]  →  [auth.js]        │
│   (Form UI)        (API call)            (Route)             (Controller)     │
│                                                    ↓                          │
│                                              [User.js Model]                  │
│                                              (Compare password)               │
│                                                    ↓                          │
│                                            Returns JWT Token                  │
│                                                    ↓                          │
│                                           [AuthContext.jsx]                   │
│                                           (Store token + user)                │
│                                                    ↓                          │
│                                           Navigate to Dashboard               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 File-by-File Code Explanation

### **1. User Model** - [[backend/src/models/User.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/User.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/User.js)

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // ⚠️ Hidden by default
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});

// 🔐 Pre-save hook: Automatically hashes password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Salt rounds = 10
  next();
});

// 🔑 Method to compare passwords during login
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
```

**Key Points:**
- `select: false` on password → Never returned in queries unless explicitly requested
- `pre('save')` → Automatically hashes password using bcrypt before storing
- [comparePassword()](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/User.js:16:0-18:2) → Used during login to verify credentials

---

### **2. Auth Routes** - [[backend/src/routes/authRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/authRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/authRoutes.js)

```javascript
import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);  // POST /api/auth/register
router.post('/login', login);        // POST /api/auth/login

export default router;
```

---

### **3. Auth Controller** - [[backend/src/controllers/auth.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/auth.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/auth.js)

```javascript
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔑 Generate JWT Token with user ID and role
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, role, adminSecret } = req.body;

    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 🛡️ Role protection: Admin requires secret key
    const requestedRole = (role || "").toLowerCase();
    let userRole = "student"; // Default role

    if (requestedRole === "admin") {
      // Only allow admin if secret matches
      if (process.env.ADMIN_SECRET && adminSecret === process.env.ADMIN_SECRET) {
        userRole = "admin";
      }
    } else if (["student", "instructor"].includes(requestedRole)) {
      userRole = requestedRole;
    }

    // ✅ Create user (password auto-hashed by model's pre-save hook)
    const user = await User.create({ name, email, password, role: userRole });

    const token = signToken(user);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password, adminSecret } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // ✅ Get user WITH password (normally excluded)
    const user = await User.findOne({ email }).select("+password");

    // ✅ Verify password using model method
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🛡️ Admin requires secret for login too
    if (user.role === 'admin') {
      if (!process.env.ADMIN_SECRET || adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Admin authentication failed" });
      }
    }

    const token = signToken(user);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
```

---

### **4. Auth Middleware** - [[backend/src/middlewares/authMiddleware.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js)

This protects routes that require authentication:

```javascript
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async function authMiddleware(req, res, next) {
  try {
    // ✅ Extract Bearer token from Authorization header
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // ✅ Verify JWT signature
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from database
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    // ✅ Attach user to request for downstream handlers
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
```

---

### **5. Frontend Auth Service** - [[frontend/src/services/auth.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js)

```javascript
const BASE_URL = import.meta.env.VITE_API_URL + "/auth";

// 📝 REGISTER - API call
export const registerUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

// 🔐 LOGIN - API call
export const loginUser = async (email, password, adminSecret) => {
  const reqBody = { email, password };
  if (adminSecret) reqBody.adminSecret = adminSecret;

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};
```

---

### **6. Auth Context** - [[frontend/src/context/AuthContext.jsx](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/context/AuthContext.jsx:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/frontend/src/context/AuthContext.jsx)

Manages global authentication state:

```javascript
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ On app load: Restore session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Login: Store user + token
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // ✅ Logout: Clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

### **7. Login Page** - [[frontend/src/pages/Login.jsx](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Login.jsx:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Login.jsx) (Key Logic)

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // ✅ Call login API
    const payload = isAdminLogin ? { ...formData, adminSecret } : formData;
    const data = await loginUser(payload.email, payload.password, payload.adminSecret);

    // ✅ Update global context (stores token in localStorage)
    login(data.user, data.token);

    // ✅ Role-based redirect
    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (data.user.role === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    toast.error(err.message || "Login failed");
  }
};
```

---

## 🔄 Complete Flow Summary

| Step | Frontend | Backend |
|------|----------|---------|
| **1** | User fills form in [Login.jsx](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Login.jsx:0:0-0:0) / [Register.jsx](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/Register.jsx:0:0-0:0) | - |
| **2** | Calls [loginUser()](cci:1://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js:19:0-37:2) / [registerUser()](cci:1://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js:2:0-17:2) in [auth.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js:0:0-0:0) service | - |
| **3** | - | Route hits `POST /api/auth/login` or `/register` |
| **4** | - | Controller in [auth.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/auth.js:0:0-0:0) validates input |
| **5** | - | User model hashes password (register) or compares (login) |
| **6** | - | JWT token generated with [signToken()](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/auth.js:3:0-10:2) |
| **7** | - | Response sent: `{ token, user }` |
| **8** | `AuthContext.login()` stores token in localStorage | - |
| **9** | Navigate to role-based dashboard | - |
| **10** | Future API calls include `Authorization: Bearer <token>` | [authMiddleware.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:0:0-0:0) verifies token |

Would you like me to explain any specific part in more detail, like how protected routes work or the role middleware?

*Edited relevant file*

### User Input

 Role-Based Access explain this flow 

### Planner Response

Let me get the role middleware and show you the complete Role-Based Access flow:

*Viewed [roleMiddleware.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js) *

*Grep searched codebase*

### Planner Response

Let me see how these are used in practice:

*Viewed [courseRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/courseRoutes.js) *

*Viewed [lessonRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/lessonRoutes.js) *

### Planner Response

Now I have all the information. Here's the complete **Role-Based Access Control (RBAC) Flow** explanation:

---

## 🛡️ Role-Based Access Control (RBAC) Flow

### **Visual Diagram**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REQUEST TO PROTECTED ROUTE                          │
│                      e.g., POST /api/courses (Create Course)                │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      1️⃣  AUTH MIDDLEWARE  (authMiddleware.js)               │
│  ────────────────────────────────────────────────────────────────────────── │
│  ✅ Extracts JWT from: Authorization: Bearer <token>                        │
│  ✅ Verifies token signature with JWT_SECRET                                │
│  ✅ Fetches user from DB and attaches to req.user                          │
│  ❌ Returns 401 if no token or invalid                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     2️⃣  ROLE MIDDLEWARE  (roleMiddleware.js)                │
│  ────────────────────────────────────────────────────────────────────────── │
│  ✅ Checks if req.user.role is in allowedRoles array                       │
│  ✅ If role matches → proceed to controller                                 │
│  ❌ Returns 403 "Forbidden" if role doesn't match                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        3️⃣  CONTROLLER (Business Logic)                      │
│  ────────────────────────────────────────────────────────────────────────── │
│  ✅ Executes the actual operation (create course, delete lesson, etc.)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Role Middleware Code - [[roleMiddleware.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js)

```javascript
/**
 * requireRole(...allowedRoles)
 * - Usage: requireRole('instructor', 'admin')
 * - Assumes [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) middleware ran earlier and set req.user
 */
export default function requireRole(...allowedRoles) {
  return (req, res, next) => {
    try {
      // ❌ No user attached (auth middleware didn't run or failed)
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: no user found' });
      }

      // ❌ User's role is NOT in the allowed list
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient role' });
      }

      // ✅ Role is allowed → proceed
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
```

---

## 🔗 How It's Used in Routes

### Example: [[courseRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/courseRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/courseRoutes.js)

```javascript
import auth from '../middlewares/authMiddleware.js';
import requireRole from '../middlewares/roleMiddleware.js';

// 🌐 PUBLIC - Anyone can view
router.get('/', courseController.listCourses);
router.get('/:id', courseController.getCourseById);

// 🔒 PROTECTED - Only instructors or admins can create/modify
router.post('/', auth, requireRole('instructor', 'admin'), courseController.createCourse);
router.put('/:id', auth, requireRole('instructor', 'admin'), courseController.updateCourse);
router.delete('/:id', auth, requireRole('instructor', 'admin'), courseController.deleteCourse);
```

### Example: [[lessonRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/lessonRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/lessonRoutes.js)

```javascript
// 🌐 PUBLIC - Anyone can see lesson list
router.get('/course/:courseId', getLessonsByCourse);

// 🔒 PROTECTED - Only instructor/admin can create lessons
router.post('/course/:courseId', auth, requireRole('instructor', 'admin'), createLesson);

// 🔒 PROTECTED - Only instructor/admin can delete lessons
router.delete('/:id', auth, requireRole('instructor', 'admin'), deleteLesson);
```

---

## 👥 Role Permissions Matrix

| Action | Student | Instructor | Admin |
|--------|:-------:|:----------:|:-----:|
| View courses/articles | ✅ | ✅ | ✅ |
| Enroll in courses | ✅ | ✅ | ✅ |
| Write articles | ✅ | ✅ | ✅ |
| Like articles | ✅ | ✅ | ✅ |
| **Create courses** | ❌ | ✅ | ✅ |
| **Edit/Delete own courses** | ❌ | ✅ | ✅ |
| **Add lessons** | ❌ | ✅ | ✅ |
| **Delete any content** | ❌ | ❌ | ✅ |
| **Access admin dashboard** | ❌ | ❌ | ✅ |

---

## 🔄 Complete Request Flow Example

**Scenario:** Instructor tries to create a course

```
1. POST /api/courses  { title: "React Basics", ... }
   Header: Authorization: Bearer eyJhbGciOiJI...
   
2. auth middleware:
   ✅ Token verified
   ✅ req.user = { id: "123", role: "instructor", name: "John" }
   
3. requireRole('instructor', 'admin'):
   ✅ "instructor" is in ['instructor', 'admin']
   ✅ Proceed to controller
   
4. courseController.createCourse():
   ✅ Course created successfully
   
5. Response: 201 { success: true, course: {...} }
```

**Scenario:** Student tries to create a course

```
1. POST /api/courses { title: "React Basics", ... }
   Header: Authorization: Bearer eyJhbGciOiJI...
   
2. auth middleware:
   ✅ Token verified
   ✅ req.user = { id: "456", role: "student", name: "Jane" }
   
3. requireRole('instructor', 'admin'):
   ❌ "student" is NOT in ['instructor', 'admin']
   
4. Response: 403 { message: "Forbidden: insufficient role" }
```

---

## 🎯 Key Points

| Concept | Description |
|---------|-------------|
| **Middleware Chain** | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) → [requireRole](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js:2:0-24:1) → `controller` (order matters!) |
| **Spread Operator** | [requireRole(...args)](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js:2:0-24:1) allows multiple roles: [requireRole('instructor', 'admin')](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js:2:0-24:1) |
| **401 vs 403** | 401 = Not authenticated (no token), 403 = Authenticated but wrong role |
| **req.user** | Set by auth middleware, consumed by role middleware |

Would you like me to explain any other part like the frontend role-based UI rendering or the admin dashboard access?

### User Input

Course Enrollment Flow (with Razorpay) explain this flow

### User Input

Continue

### Planner Response

Let me gather all the enrollment and payment-related files to explain the complete flow:

*Viewed [paymentController.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/paymentController.js) *

*Viewed [enrollmentController.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/enrollmentController.js) *

*Viewed [razorpay.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/config/razorpay.js) *

*Viewed [paymentRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/paymentRoutes.js) *

*Viewed [enrollmentRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/enrollmentRoutes.js) *

### Planner Response

Now let me get the frontend files for the enrollment flow:

*Viewed [enrollmentService.js](file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/enrollmentService.js) *

*Grep searched codebase*

*Viewed [CourseDetails.jsx](file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/CourseDetails.jsx) *

*Viewed [Enrollment.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Enrollment.js) *

### Planner Response

Now I have all the information needed. Here's the complete **Course Enrollment Flow with Razorpay** explanation:

---

## 💳 Course Enrollment Flow (with Razorpay Integration)

### **Complete Visual Flow Diagram**

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        COURSE ENROLLMENT FLOW WITH RAZORPAY                        │
└─────────────────────────────────────────────────────────────────────────────────────┘

   USER CLICKS "ENROLL"                                                              
          │                                                                          
          ▼                                                                          
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ① FRONTEND: CourseDetails.jsx → handleEnroll()                                    │
│     • Checks if user is logged in                                                   │
│     • Calls createPaymentOrder(courseId)                                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
          │                                                                          
          ▼                                                                          
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ② BACKEND: POST /api/payments/create-order                                        │
│     • Validates course exists                                                       │
│     • Checks if already enrolled                                                    │
│     • FREE COURSE? → Create enrollment directly → Return { isFree: true }          │
│     • PAID COURSE? → Create Razorpay order → Return order + key                    │
└─────────────────────────────────────────────────────────────────────────────────────┘
          │                                                                          
          │   ┌──────────────────────────────────────────────────┐                   
          │   │ IF FREE: Enrollment done! ✅                     │                   
          │   └──────────────────────────────────────────────────┘                   
          │                                                                          
          │   IF PAID ▼                                                              
          │                                                                          
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ③ FRONTEND: Load Razorpay Checkout Modal                                          │
│     • Dynamically loads Razorpay script                                            │
│     • Opens payment modal with UPI/Netbanking/Cards                                │
└─────────────────────────────────────────────────────────────────────────────────────┘
          │                                                                          
          ▼ (User completes payment on Razorpay)                                     
                                                                                      
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ④ RAZORPAY → FRONTEND: Payment Response                                           │
│     Returns: razorpay_order_id, razorpay_payment_id, razorpay_signature            │
└─────────────────────────────────────────────────────────────────────────────────────┘
          │                                                                          
          ▼                                                                          
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ⑤ BACKEND: POST /api/payments/verify                                              │
│     • Verifies signature using HMAC-SHA256                                         │
│     • expected = HMAC(order_id|payment_id, KEY_SECRET)                             │
│     • If valid → Create enrollment in DB                                           │
│     • Return success                                                                │
└─────────────────────────────────────────────────────────────────────────────────────┘
          │                                                                          
          ▼                                                                          
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  ⑥ FRONTEND: Update UI                                                             │
│     • setIsEnrolled(true)                                                          │
│     • Show success toast                                                            │
│     • User can now access all lessons                                              │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 File-by-File Code Breakdown

### **1. Razorpay Config** - [[razorpay.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/config/razorpay.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/config/razorpay.js)

```javascript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,         // Public key
    key_secret: process.env.RAZORPAY_KEY_SECRET  // Secret key (never expose!)
});

export default razorpay;
```

---

### **2. Enrollment Model** - [[Enrollment.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Enrollment.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Enrollment.js)

```javascript
const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    
    // 💳 Razorpay payment fields
    paymentId: { type: String, default: null },      // razorpay_payment_id
    orderId: { type: String, default: null },        // razorpay_order_id  
    paymentStatus: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'free'], 
        default: 'pending' 
    }
});

// 🛡️ Prevent duplicate enrollments (unique compound index)
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
```

---

### **3. Payment Controller** - [[paymentController.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/paymentController.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/paymentController.js)

#### **Create Order (Step 2)**
```javascript
export const createOrder = asyncHandler(async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // ❌ Already enrolled check
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // ✅ FREE COURSE → Enroll directly
    if (course.price === 0) {
        const enrollment = await Enrollment.create({
            user: userId,
            course: courseId,
            paymentStatus: 'free'
        });
        return res.status(201).json({
            success: true,
            message: 'Enrolled successfully (Free Course)',
            isFree: true
        });
    }

    // 💳 PAID COURSE → Create Razorpay order
    const options = {
        amount: Math.round(course.price * 100), // ₹299 → 29900 paise
        currency: 'INR',
        receipt: `rcpt_${courseId.slice(-8)}_${userId.slice(-8)}`,
        notes: { courseId, userId, courseTitle: course.title }
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
        success: true,
        order,                               // Razorpay order object
        course: { id: course._id, title: course.title, price: course.price },
        key: process.env.RAZORPAY_KEY_ID     // Public key for frontend
    });
});
```

#### **Verify Payment (Step 5)**
```javascript
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
    const userId = req.user._id;

    // 🔐 Verify signature using HMAC-SHA256
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
        return res.status(400).json({ message: 'Payment verification failed' });
    }

    // ✅ Create enrollment with payment details
    const enrollment = await Enrollment.create({
        user: userId,
        course: courseId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paymentStatus: 'completed'
    });

    res.status(201).json({
        success: true,
        message: 'Payment verified and enrolled successfully!'
    });
});
```

---

### **4. Payment Routes** - [[paymentRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/paymentRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/paymentRoutes.js)

```javascript
router.get('/key', getKey);                    // 🌐 Public - Get Razorpay key
router.post('/create-order', auth, createOrder); // 🔒 Protected - Create order
router.post('/verify', auth, verifyPayment);     // 🔒 Protected - Verify payment
```

---

### **5. Frontend Service** - [[enrollmentService.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/enrollmentService.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/frontend/src/services/enrollmentService.js)

```javascript
// 💳 Create payment order
export const createPaymentOrder = async (courseId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PAYMENT_URL}/create-order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
    });
    return res.json();
};

// ✅ Verify payment after Razorpay callback
export const verifyPayment = async (paymentData) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${PAYMENT_URL}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData) // Contains razorpay_order_id, razorpay_payment_id, etc.
    });
    return res.json();
};
```

---

### **6. Frontend Handler** - [[CourseDetails.jsx](cci:7://file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/CourseDetails.jsx:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/frontend/src/pages/CourseDetails.jsx#L66-L142)

```javascript
const handleEnroll = async () => {
    if (!user) {
        toast.error("Please login to enroll");
        navigate("/login");
        return;
    }

    setEnrollLoading(true);
    try {
        // ① Create order (handles free courses too)
        const orderData = await createPaymentOrder(id);
        
        // ② FREE COURSE → Already enrolled!
        if (orderData.isFree) {
            setIsEnrolled(true);
            toast.success("Successfully enrolled in the course!");
            return;
        }

        // ③ PAID COURSE → Open Razorpay checkout
        const options = {
            key: orderData.key,                          // Public key
            amount: orderData.order.amount,              // In paise
            currency: orderData.order.currency,
            name: "SmartLearn",
            description: `Enroll in ${orderData.course.title}`,
            order_id: orderData.order.id,                // Razorpay order ID
            
            // ④ Success callback
            handler: async function (response) {
                // ⑤ Verify on backend
                await verifyPayment({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    courseId: id
                });
                setIsEnrolled(true);
                toast.success("Payment successful! You're now enrolled.");
            },
            
            prefill: { name: user.name, email: user.email },
            theme: { color: "#0f766e" }
        };

        // Load Razorpay script dynamically
        if (!window.Razorpay) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => new window.Razorpay(options).open();
            document.body.appendChild(script);
        } else {
            new window.Razorpay(options).open();
        }
    } catch (err) {
        toast.error(err.message);
    }
};
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|----------------|
| **Signature Verification** | HMAC-SHA256 with `order_id|payment_id` verified using secret key |
| **Duplicate Prevention** | Unique compound index on `{user, course}` in Enrollment model |
| **Protected Routes** | Auth middleware required for all payment endpoints |
| **Secret Key Protection** | `RAZORPAY_KEY_SECRET` never exposed to frontend |

---

## 💰 Payment Status Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   pending   │ ──► │  completed  │ or  │   failed    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       
       │ (Free course)                         
       ▼                                       
┌─────────────┐                                
│    free     │                                
└─────────────┘                                
```

---

## 🎯 Key Takeaways

| Concept | Description |
|---------|-------------|
| **Razorpay Order** | Created on backend, contains amount, currency, receipt |
| **Checkout Modal** | Loaded dynamically from Razorpay CDN |
| **Signature Verification** | Proves payment is authentic (not tampered) |
| **Free Course Path** | Skips Razorpay entirely, enrolls directly |

Would you like me to explain any specific part in more detail?

### User Input

Content Management Flow explain it

### Planner Response

Let me gather all the content management related files to explain the complete flow:

*Viewed [courseController.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/courseController.js) *

*Viewed [articleController.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/articleController.js) *

*Viewed [lessonController.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/lessonController.js) *

### Planner Response

Now let me also get the models and routes to complete the picture:

*Viewed [Course.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Course.js) *

*Viewed [Article.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Article.js) *

*Viewed [Lesson.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Lesson.js) *

*Viewed [articleRoutes.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/articleRoutes.js) *

### Planner Response

Now I have all the information. Here's the complete **Content Management Flow** explanation:

---

## 📚 Content Management Flow

SmartLearn has **three types of content**: Courses, Lessons, and Articles. Here's how each is managed:

---

## **Visual Architecture**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTENT TYPES & RELATIONSHIPS                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│     COURSE       │ 1 ──► N │     LESSON       │         │    ARTICLE       │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ • title          │         │ • title          │         │ • title          │
│ • description    │         │ • content        │         │ • content (HTML) │
│ • price          │         │ • videoUrl       │         │ • author         │
│ • instructor     │         │ • duration       │         │ • likes[]        │
│ • lessons[]      │         │ • isFree         │         │ • views          │
│ • category       │         │ • order          │         │ • tags[]         │
│ • thumbnailUrl   │         │ • course (ref)   │         │ • category       │
└──────────────────┘         └──────────────────┘         └──────────────────┘
        │                              │                          │
        ▼                              ▼                          ▼
  Instructor/Admin             Instructor/Admin              Any Logged User
    can CRUD                      can CRUD                     can CRUD
```

---

## 📖 1. Course Management Flow

### **Who Can Do What?**
| Action | Student | Instructor | Admin |
|--------|:-------:|:----------:|:-----:|
| View courses | ✅ | ✅ | ✅ |
| Create course | ❌ | ✅ | ✅ |
| Edit **own** course | ❌ | ✅ | ✅ |
| Edit **any** course | ❌ | ❌ | ✅ |
| Delete **own** course | ❌ | ✅ | ✅ |
| Delete **any** course | ❌ | ❌ | ✅ |

### **Course Model** - [[Course.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Course.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Course.js)

```javascript
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },    // Auto-generated from title
  description: { type: String },
  shortDescription: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 0 },                     // 0 = Free course
  category: { type: String, index: true },
  thumbnailUrl: { type: String },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate slug before save
courseSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
```

### **Course Routes** - [[courseRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/courseRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/courseRoutes.js)

```javascript
// 🌐 PUBLIC
router.get('/', courseController.listCourses);        // List all courses
router.get('/:id', courseController.getCourseById);   // Get single course

// 🔒 PROTECTED (Instructor/Admin only)
router.post('/', auth, requireRole('instructor', 'admin'), courseController.createCourse);
router.put('/:id', auth, requireRole('instructor', 'admin'), courseController.updateCourse);
router.delete('/:id', auth, requireRole('instructor', 'admin'), courseController.deleteCourse);
```

### **Create Course Flow**

```
1. POST /api/courses  { title, description, price, category, ... }
        │
        ▼
2. authMiddleware → Verify JWT → Set req.user
        │
        ▼
3. requireRole('instructor', 'admin') → Check role
        │
        ▼
4. createCourse controller:
   • Validate title is not empty
   • Set instructor = req.user._id (automatic!)
   • Create course in MongoDB
   • Return populated course data
```

### **Ownership Check in Update/Delete**

```javascript
// From courseController.js - updateCourse
if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden: not owner or admin' });
}
```

---

## 📝 2. Lesson Management Flow

### **Lesson Model** - [[Lesson.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Lesson.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Lesson.js)

```javascript
const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    content: { type: String },             // Text content/description
    videoUrl: { type: String },            // External video link (YouTube, etc.)
    duration: { type: Number, default: 0 }, // Minutes
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    isFree: { type: Boolean, default: false },  // Free preview?
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});
```

### **Lesson Routes** - [[lessonRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/lessonRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/lessonRoutes.js)

```javascript
// 🌐 PUBLIC - View syllabus
router.get('/course/:courseId', getLessonsByCourse);

// 🔒 PROTECTED - Create lesson (Instructor who owns course or Admin)
router.post('/course/:courseId', auth, requireRole('instructor', 'admin'), createLesson);

// 🔒 PROTECTED - Delete lesson
router.delete('/:id', auth, requireRole('instructor', 'admin'), deleteLesson);
```

### **Create Lesson Flow**

```javascript
export const createLesson = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title, content, videoUrl, duration, isFree } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // 🔐 Ownership check: Only course owner or admin can add lessons
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }

    const lesson = await Lesson.create({
        title, content, videoUrl, duration, isFree,
        course: courseId,
        order: course.lessons.length + 1  // Auto-increment order
    });

    // 📌 Add lesson reference to course
    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json(lesson);
});
```

---

## 📰 3. Article Management Flow

### **Who Can Do What?**
| Action | Student | Instructor | Admin |
|--------|:-------:|:----------:|:-----:|
| Read articles | ✅ | ✅ | ✅ |
| Write articles | ✅ | ✅ | ✅ |
| Edit **own** articles | ✅ | ✅ | ✅ |
| Delete **own** articles | ✅ | ✅ | ✅ |
| Delete **any** article | ❌ | ❌ | ✅ |
| Like articles | ✅ | ✅ | ✅ |

### **Article Model** - [[Article.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Article.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Article.js)

```javascript
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },        // Rich HTML content
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, default: 'Development' },
  thumbnailUrl: { type: String },
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],   // Array of user IDs
  views: { type: Number, default: 0 },              // Auto-incremented on read
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
```

### **Article Routes** - [[articleRoutes.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/articleRoutes.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/routes/articleRoutes.js)

```javascript
// 🌐 PUBLIC
router.get('/', getAllArticles);            // List all articles
router.get('/:id', getArticleById);         // Get single (auto-increments views!)

// 🔒 PROTECTED
router.post('/', auth, requireRole('student', 'instructor', 'admin'), createArticle);
router.get('/my/articles', auth, requireRole('student', 'instructor', 'admin'), getMyArticles);

// 🔒 PROTECTED + OWNERSHIP CHECK
router.put('/:id', auth, requireRole('student', 'instructor', 'admin'), articleOwnership, updateArticle);
router.delete('/:id', auth, articleOwnership, deleteArticle);

// 🔒 LIKE TOGGLE
router.post('/:id/like', auth, requireRole('student', 'instructor', 'admin'), toggleLike);
```

### **Article Ownership Middleware** - [[articleOwnership.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/articleOwnership.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/articleOwnership.js)

```javascript
// This middleware checks if the user owns the article (or is admin)
export default async function articleOwnership(req, res, next) {
  const article = await Article.findById(req.params.id);
  
  if (!article) return res.status(404).json({ message: 'Article not found' });
  
  // Admin can edit/delete any article
  if (req.user.role === 'admin') {
    req.article = article;
    return next();
  }
  
  // Others must be the author
  if (article.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  
  req.article = article;
  next();
}
```

### **Like Toggle Feature**

```javascript
export const toggleLike = async (req, res) => {
  const article = await Article.findById(req.params.id);
  const userId = req.user._id;
  
  const isLiked = article.likes.includes(userId);

  if (isLiked) {
    // Remove like
    article.likes = article.likes.filter(id => id.toString() !== userId.toString());
  } else {
    // Add like
    article.likes.push(userId);
  }

  await article.save();
  res.json({ likes: article.likes, isLiked: !isLiked });
};
```

---

## 🛡️ Security Features Across All Content

| Feature | Implementation |
|---------|----------------|
| **Input Validation** | Title/content length limits, required field checks |
| **ReDoS Prevention** | [escapeRegex()](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/controllers/courseController.js:5:0-6:72) function sanitizes search queries |
| **Ownership Verification** | Controllers check `req.user._id` vs `content.author/instructor` |
| **Field Whitelisting** | Only specific fields can be updated |
| **Role-Based Access** | Middleware chain: [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) → [requireRole](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/roleMiddleware.js:2:0-24:1) → `ownership` |

### **ReDoS Prevention Example**

```javascript
// Escape special regex characters to prevent ReDoS attacks
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Usage in search
const safeSearch = escapeRegex(search);
query.$or = [
  { title: { $regex: safeSearch, $options: 'i' } },
  { content: { $regex: safeSearch, $options: 'i' } }
];
```

---

## 📊 Content Management Summary Table

| Content Type | Model | Who Creates | Ownership Check | Special Features |
|--------------|-------|-------------|-----------------|------------------|
| **Course** | [Course.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Course.js:0:0-0:0) | Instructor/Admin | `instructor === user._id` | Lessons array, price, slug |
| **Lesson** | [Lesson.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Lesson.js:0:0-0:0) | Course Owner/Admin | Via parent course | Free preview, order, videoUrl |
| **Article** | [Article.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/models/Article.js:0:0-0:0) | Any logged-in user | `author === user._id` | Likes array, views counter, tags |

Would you like me to explain any other flow, such as the frontend pages for creating/editing content or the search/filter functionality?

### User Input

API Request Flow explain it

### Planner Response

Let me get the main app setup and middleware files to explain the complete API request flow:

*Viewed [app.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/app.js) *

*Viewed [asyncHandler.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/asyncHandler.js) *

*Searched filesystem*

### Planner Response

Now let me view the index.js (server entry point) and config file:

*Viewed [index.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/index.js) *

*Viewed [db.js](file:///home/faujdar/Desktop/SmartLearn/backend/src/config/db.js) *

### Planner Response

Now I have all the information. Here's the complete **API Request Flow** explanation:

---

## 🔄 API Request Flow - Complete Breakdown

### **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (React Frontend)                            │
│                              http://localhost:5173                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP Request
                                        │ (GET, POST, PUT, DELETE)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              EXPRESS SERVER                                     │
│                              http://localhost:5000                              │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                      MIDDLEWARE PIPELINE                                 │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │  Helmet  │→│   CORS   │→│  Parser  │→│Rate Limit│→│ Route Match  │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                        │
│                                        ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                      ROUTE-SPECIFIC MIDDLEWARE                           │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐                │   │
│  │  │   Auth   │→│   Role   │→│Ownership │→│  Controller  │                │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘                │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                        │
│                                        ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                           DATABASE (MongoDB)                             │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Server Entry Point - [[index.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/index.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/index.js)

```javascript
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config({ path: "./.env" });  // ① Load environment variables

const PORT = process.env.PORT || 3000;

connectDB().then(() => {            // ② Connect to MongoDB first
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // ③ Start Express
});
```

---

## 🛡️ Middleware Pipeline - [[app.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/app.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/app.js)

Every request passes through this chain **in order**:

```
Request → Helmet → CORS → Body Parser → Rate Limiter → Route Handler → Response
```

### **Step-by-Step Middleware Breakdown**

```javascript
// ① HELMET - Security Headers
app.use(helmet());
// Adds: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.

// ② BODY PARSERS - Parse JSON & URL-encoded data
app.use(express.json({ limit: '16kb' }));       // Max 16KB JSON body
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ③ CORS - Cross-Origin Resource Sharing
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ④ RATE LIMITERS
// General API: 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later.' }
});

// Auth routes: 60 requests per hour (prevents brute force)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 60,
    message: { message: 'Too many authentication attempts' }
});

app.use('/api/', generalLimiter);
app.use('/api/auth', authLimiter);

// ⑤ ROUTE MOUNTING
app.use('/api/auth', authRoutes);           // Login/Register
app.use('/api/users', userRoutes);          // User profiles
app.use('/api/courses', courseRoutes);      // Course CRUD
app.use('/api/articles', articleRoutes);    // Article CRUD
app.use('/api/admin', adminArticleRoutes);  // Admin operations
app.use('/api/lessons', lessonRoutes);      // Lesson CRUD
app.use('/api/enrollments', enrollmentRoutes);  // Enrollments
app.use('/api/payments', paymentRoutes);    // Razorpay payments
```

---

## 🔐 Route-Specific Middleware Chain

### **Example: Protected Route Flow**

```
POST /api/courses (Create a course)
        │
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  1. authMiddleware.js                                            │
│  ────────────────────────────────────────                        │
│  • Extract JWT from: Authorization: Bearer <token>               │
│  • Verify token with JWT_SECRET                                  │
│  • Fetch user from DB: User.findById(payload.id)                │
│  • Attach to request: req.user = user                           │
│  • ❌ 401 if no token or invalid                                 │
└──────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  2. roleMiddleware.js                                             │
│  ────────────────────────────────────────                        │
│  • Check if req.user.role in ['instructor', 'admin']            │
│  • ❌ 403 "Forbidden" if role not allowed                        │
└──────────────────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────────────────┐
│  3. Controller (courseController.createCourse)                   │
│  ────────────────────────────────────────                        │
│  • Validate input                                                 │
│  • Perform business logic                                         │
│  • Interact with MongoDB                                          │
│  • Return response                                                │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 Request Flow Diagram for Different Route Types

### **Public Route (No Auth)**
```
GET /api/courses
    │
    ├─→ Helmet
    ├─→ CORS
    ├─→ JSON Parser
    ├─→ Rate Limiter (100 req/15min)
    ├─→ listCourses Controller
    │       └─→ MongoDB Query
    │
    ▼
Response: { courses: [...] }
```

### **Protected Route (Auth Required)**
```
POST /api/enrollments
    │
    ├─→ Helmet
    ├─→ CORS
    ├─→ JSON Parser
    ├─→ Rate Limiter
    ├─→ authMiddleware ──┐
    │       │            │
    │       │   ❌ 401   │  Token invalid
    │       ▼            │
    ├─→ enrollUser Controller
    │       └─→ MongoDB Insert
    │
    ▼
Response: { success: true, enrollment: {...} }
```

### **Role-Protected Route**
```
POST /api/courses
    │
    ├─→ Helmet
    ├─→ CORS
    ├─→ JSON Parser
    ├─→ Rate Limiter
    ├─→ authMiddleware ──┐
    │       │            │ ❌ 401 Token invalid
    │       ▼            │
    ├─→ requireRole('instructor', 'admin') ──┐
    │       │                                 │ ❌ 403 Wrong role
    │       ▼                                 │
    ├─→ createCourse Controller
    │       └─→ MongoDB Insert
    │
    ▼
Response: { course: {...} }
```

### **Ownership-Protected Route**
```
PUT /api/articles/:id
    │
    ├─→ Helmet
    ├─→ CORS
    ├─→ JSON Parser
    ├─→ Rate Limiter
    ├─→ authMiddleware
    ├─→ requireRole('student', 'instructor', 'admin')
    ├─→ articleOwnership ──┐
    │       │              │ ❌ 403 Not owner/admin
    │       ▼              │
    ├─→ updateArticle Controller
    │       └─→ MongoDB Update
    │
    ▼
Response: { article: {...} }
```

---

## ⚡ Async Handler Utility - [[asyncHandler.js](cci:7://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/asyncHandler.js:0:0-0:0)](file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/asyncHandler.js)

Wraps async controllers to catch errors automatically:

```javascript
export default fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in controllers:
export const createCourse = asyncHandler(async (req, res) => {
    // If this throws, error is caught and passed to next()
    const course = await Course.create(req.body);
    res.json(course);
});
```

---

## 🗺️ API Routes Overview

| Route | Methods | Middleware | Description |
|-------|---------|------------|-------------|
| `/api/auth/register` | POST | `authLimiter` | User registration |
| `/api/auth/login` | POST | `authLimiter` | User login |
| `/api/users/me` | GET | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) | Get current user |
| `/api/courses` | GET | - | List all courses |
| `/api/courses` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1), `role` | Create course |
| `/api/courses/:id` | PUT/DELETE | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1), `role`, ownership | Edit/Delete course |
| `/api/articles` | GET | - | List all articles |
| `/api/articles` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1), `role` | Create article |
| `/api/articles/:id` | PUT/DELETE | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1), `role`, `ownership` | Edit/Delete |
| `/api/articles/:id/like` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1), `role` | Toggle like |
| `/api/enrollments` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) | Enroll in course |
| `/api/payments/create-order` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) | Create Razorpay order |
| `/api/payments/verify` | POST | [auth](cci:1://file:///home/faujdar/Desktop/SmartLearn/backend/src/middlewares/authMiddleware.js:4:0-20:1) | Verify payment |

---

## 🔒 Security Layers Summary

| Layer | Protection | Implementation |
|-------|------------|----------------|
| **Helmet** | XSS, clickjacking, MIME sniffing | HTTP security headers |
| **CORS** | Unauthorized origins | Whitelist of allowed origins |
| **Body Limit** | Payload attacks | Max 16KB request body |
| **Rate Limiting** | DDoS, brute force | 100 req/15min (API), 60 req/hr (auth) |
| **JWT Auth** | Unauthorized access | Token verification |
| **Role Check** | Privilege escalation | Role-based access control |
| **Ownership** | Data theft/tampering | Only owner or admin can modify |

---

## 📦 Complete Request Example

```javascript
// Frontend makes request
const response = await fetch('http://localhost:5000/api/courses', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR...'
    },
    body: JSON.stringify({ title: 'React Course', price: 299 })
});

// Backend Processing:
// 1. Helmet adds security headers
// 2. CORS checks origin (http://localhost:5173 ✅)
// 3. express.json() parses body → req.body
// 4. Rate limiter checks: 5/100 requests used ✅
// 5. Route matches: POST /api/courses
// 6. authMiddleware: JWT verified → req.user set
// 7. requireRole: user.role === 'instructor' ✅
// 8. createCourse: Course created in MongoDB
// 9. Response: 201 { course: {...} }
```

Would you like me to dive deeper into any specific part of the flow, like error handling or the database connection setup?