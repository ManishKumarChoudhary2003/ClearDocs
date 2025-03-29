# Elasticsearch Audit Logs Index Setup

This document provides a step-by-step guide to setting up an Elasticsearch index for storing audit logs. The index structure is designed to store user actions, system details, and timestamps for logging purposes.

## 1. Create the Audit Logs Index

To create the `audit_logs` index with the required mappings, use the following command:

### **PUT audit_logs**
```json
PUT audit_logs
{
  "mappings": {
    "properties": {
      "id": { "type": "long" },
      "action": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "name": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "email": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "mobileNumber": { "type": "keyword" },  
      "documentId": { "type": "long" },
      "verifiedBy": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "systemOS": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "systemUserName": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      },
      "systemUserIp": { "type": "ip" },
      "timestamp": {
        "type": "date",
        "format": "epoch_millis||yyyy-MM-dd'T'HH:mm:ss.SSS"
      }
    }
  }
}
```

## 2. Query the Audit Logs

To retrieve all documents from the `audit_logs` index, use the following search query:

### **GET audit_logs/_search**
```json
GET audit_logs/_search
{
  "query": {
    "match_all": {}
  }
}
```

## 3. Indexing Sample Data

To insert a sample audit log entry, use the following command:

### **POST audit_logs/_doc/**
```json
POST audit_logs/_doc/
{
  "id": 1,
  "action": "User Login",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "1234567890",
  "documentId": 101,
  "verifiedBy": "Admin",
  "systemOS": "Windows 10",
  "systemUserName": "johndoe",
  "systemUserIp": "192.168.1.1",
  "timestamp": "2024-07-26T14:30:00.000"
}
```

## 4. Deleting the Index

To delete the `audit_logs` index, use the following command:

### **DELETE audit_logs**
```json
DELETE audit_logs
```

## Notes:
- Ensure that Elasticsearch is running before executing these commands.
- Use Kibana or a REST client to interact with Elasticsearch.
- The `keyword` field type allows exact matching for filtering and aggregation.
- The `timestamp` field supports both epoch milliseconds and formatted date strings.

This document serves as a reference for setting up an Elasticsearch audit logs index. Users can clone and modify it as needed for their applications.


