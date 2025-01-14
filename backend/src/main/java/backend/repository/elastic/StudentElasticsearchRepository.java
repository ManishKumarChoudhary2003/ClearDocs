package backend.repository.elastic;


import backend.entity.StudentElastic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentElasticsearchRepository extends ElasticsearchRepository<StudentElastic, String> {

}
