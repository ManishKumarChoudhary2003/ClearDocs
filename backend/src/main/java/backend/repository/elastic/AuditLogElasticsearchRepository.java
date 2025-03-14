package backend.repository.elastic;

import backend.entity.AuditLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditLogElasticsearchRepository extends ElasticsearchRepository<AuditLog, Long> {
}
