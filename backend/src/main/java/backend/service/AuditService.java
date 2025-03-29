package backend.service;

import backend.entity.AuditLog;
import backend.entity.PlatformUser;
import backend.repository.elastic.AuditLogElasticsearchRepository;
import backend.repository.jpa.AuditLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    private final AuditLogElasticsearchRepository elasticsearchRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String ELASTICSEARCH_URL = "http://localhost:9200/audit_logs/_search";


    public void generateLogAudit(PlatformUser platformUser,String action, Long documentId) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setDocumentId(documentId);
        log.setEmail(platformUser.getEmail());
        log.setMobileNumber(platformUser.getMobileNumber());
        log.setName(platformUser.getUsername());
        log.setTimestamp(Instant.now());
        log.setSystemOS(getSystemOS());
        log.setSystemUserName(getSystemUserName());
        log.setSystemUserIp(getSystemUserIp());

        auditLogRepository.save(log);
        elasticsearchRepository.save(log);
    }

    private String getSystemUserIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return "UNKNOWN";
    }

    private String getSystemUserName() {
        return System.getProperty("user.name");
    }

    private String getSystemOS() {
        return System.getProperty("os.name");
    }


    public List<AuditLog> getAllAuditLogs() {
        String queryJson = "{ \"query\": { \"match_all\": {} } }";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<String> requestEntity = new HttpEntity<>(queryJson, headers);

        ResponseEntity<Map> response = restTemplate.exchange(ELASTICSEARCH_URL, HttpMethod.POST, requestEntity, Map.class);

        List<Map<String, Object>> hits = (List<Map<String, Object>>) ((Map<String, Object>) response.getBody().get("hits")).get("hits");

        return hits.stream()
                .map(hit -> objectMapper.convertValue(hit.get("_source"), AuditLog.class))
                .collect(Collectors.toList());
    }

    public List<AuditLog> fullTextSearch(String query) {
        try {
            String jsonQuery = "{ \"query\": { \"bool\": { \"should\": ["
                    + "{ \"wildcard\": { \"name\": \"*" + query + "*\" } },"
                    + "{ \"wildcard\": { \"email\": \"*" + query + "*\" } },"
                    + "{ \"wildcard\": { \"systemOS\": \"*" + query + "*\" } },"
                    + "{ \"wildcard\": { \"action\": \"*" + query + "*\" } }"
                    + "] } } }";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            HttpEntity<String> requestEntity = new HttpEntity<>(jsonQuery, headers);
            ResponseEntity<Map> response = restTemplate.exchange(ELASTICSEARCH_URL, HttpMethod.POST, requestEntity, Map.class);

            Map<String, Object> responseBody = response.getBody();
            if (responseBody == null || !responseBody.containsKey("hits")) {
                return new ArrayList<>();
            }

            List<Map<String, Object>> hits = (List<Map<String, Object>>) ((Map<String, Object>) responseBody.get("hits")).get("hits");

            return hits.stream()
                    .map(hit -> objectMapper.convertValue(hit.get("_source"), AuditLog.class))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }



}
