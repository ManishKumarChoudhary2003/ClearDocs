# ClearDocs - Verify Documents with Ease

## 🚀 Overview
ClearDocs is a seamless and secure platform designed to simplify document verification. Whether you're an individual or an organization, ClearDocs provides fast, reliable, and secure verification while eliminating the hassle of manual processes.

## ✨ Features
- 🔍 **Instant Document Verification** - Quickly verify the authenticity of any document.
- 🔒 **Secure & Tamper-Proof** - Advanced encryption and security mechanisms ensure data integrity.
- 🎯 **User-Friendly Interface** - A simple and intuitive UI for effortless navigation.
- 🌍 **Access Anytime, Anywhere** - Verify documents on the go, from any device.

## 🛠 Tech Stack
### **Backend**
- Spring Boot
- Kafka
- Elasticsearch
- MySQL (Dockerized)

### **Frontend**
- ReactJS
- Bootstrap

### **Additional Technologies**
- JWT (JSON Web Token) for authentication
- JavaMailSender for email notifications

---

## 📌 API Endpoints

### **Authentication API** (`/auth`)
- `POST /register` - Register a new user.
- `POST /login` - Authenticate and generate a JWT token.

### **Audit API** (`/audit`)
- `GET /get-all` - Retrieve all audit logs.
- `GET /search?query=<query>` - Perform a full-text search on audit logs.

### **Document API** (`/doc`)
- `POST /upload` - Upload a document.
- `GET /student/{studentId}` - Get documents by student ID.
- `GET /student-documents?email=<email>&userId=<userId>` - Get documents by email and user ID.
- `DELETE /{documentId}` - Delete a document.
- `PUT /{documentId}` - Update a document.
- `POST /verify-document` - Verify a document.
- `GET /download?documentId=<documentId>` - Download a document.

### **Student API** (`/student`)
- `POST /add/{userId}` - Add a student.
- `GET /{studentId}` - Retrieve student details.
- `PUT /update/{studentId}` - Update student information.
- `DELETE /delete/{studentId}` - Delete a student.
- `GET /user/{userId}` - Get all students under a specific user.

### **Analytics API** (`/analytics`)
- `GET /verification` - Get document verification analytics.
- `GET /total-storage` - Get total storage used.
- `GET /average-file-size` - Get average document size.
- `GET /common-document-type` - Get the most common document type.
- `GET /top-uploaders` - Get the top document uploaders.
- `GET /largest-file` - Get details of the largest uploaded file.

---

## 🏗 Installation & Setup
### **Prerequisites**
- Docker & Docker Compose
- Java 17+
- Node.js & npm
- MySQL Database

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/ManishKumarChoudhary2003/ClearDocs.git
   cd cleardocs
   ```
2. Start required services using Docker:
   ```bash
   docker-compose up -d
   ```
3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm start
   ```

---

## 🎯 Usage
- **Sign Up & Login** - Register a new user and log in to obtain a JWT token.
- **Upload Documents** - Easily upload and manage your documents.
- **Verify Documents** - Instantly verify the authenticity of uploaded documents.
- **Track & Analyze** - Get detailed insights into document verification statistics.

## 🤝 Contributing
We welcome contributions! Feel free to submit a pull request or report any issues.

---

### 👨‍💻 Author
Developed by **[Manish Kumar Choudhary](https://github.com/ManishKumarChoudhary2003)** 🚀

🌟 **Star this repo if you find it useful!** 🌟

🔗 **Portfolio:** [Manish](https://manish-kumar-choudhary.netlify.app/)

