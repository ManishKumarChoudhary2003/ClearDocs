# Elasticsearch Audit Logs Setup

This document provides a reference for setting up an Elasticsearch index to store audit logs.

## 1. Creating the Index
To create an `audit_logs` index with the necessary mappings, use the following command:

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

## 2. Adding Documents
To insert an audit log entry, use the following command:

### **POST audit_logs/_doc/**
```json
POST audit_logs/_doc/
{
  "id": 1,
    "action" : "DOCUMENT_VERIFICATION_SUCCESS",
    "name" : "Manish",
    "email" : "cmanishkumar193@gmail.com",
    "mobileNumber" : "8955946276",
    "documentId" : 1,
    "verifiedBy": "Admin",
    "systemOS" : "Linux",
    "systemUserName" : "manish",
    "systemUserIp" : "127.0.1.1",
    "timestamp" : 1743223817089
}
```

Example response:
```json
{
  "_index" : "audit_logs",
  "_type" : "_doc",
  "_id" : "3",
  "_score" : 1.0,
  "_source" : {
    "_class" : "backend.entity.AuditLog",
    "id" : 3,
    "action" : "DOCUMENT_VERIFICATION_SUCCESS",
    "name" : "Manish",
    "email" : "cmanishkumar193@gmail.com",
    "mobileNumber" : "8955946276",
    "documentId" : 1,
    "systemOS" : "Linux",
    "systemUserName" : "manish",
    "systemUserIp" : "127.0.1.1",
    "timestamp" : 1743223817089
  }
}
```

## 3. Searching for Documents
To retrieve all audit log entries, use the following command:

### **GET audit_logs/_search**
```json
GET audit_logs/_search
{
  "query": {
    "match_all": {}
  }
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


