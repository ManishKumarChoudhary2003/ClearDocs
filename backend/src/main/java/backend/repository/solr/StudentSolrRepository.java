package backend.repository.solr;

import backend.entity.ClearStudent;
import org.springframework.data.solr.repository.SolrCrudRepository;


public interface StudentSolrRepository extends SolrCrudRepository<ClearStudent, Long> {

}
