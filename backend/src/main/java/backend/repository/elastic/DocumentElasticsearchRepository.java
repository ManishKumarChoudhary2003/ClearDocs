package backend.repository.elastic;


import backend.entity.DocumentsElastic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentElasticsearchRepository extends ElasticsearchRepository<DocumentsElastic, String> {

}
