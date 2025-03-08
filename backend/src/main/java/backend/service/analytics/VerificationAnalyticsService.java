package backend.service.analytics;

import backend.dto.VerificationAnalyticsResponse;
import backend.repository.jpa.DocumentRepository;
import backend.repository.jpa.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationAnalyticsService {

    private final StudentRepository studentRepository;
    private final DocumentRepository documentRepository;

    public VerificationAnalyticsResponse getAnalytics() {
        long totalStudents = studentRepository.count();
        long totalDocuments = documentRepository.count();
        long verifiedDocuments = documentRepository.countByIsVerified(Boolean.TRUE);
        Long studentsWithAllVerifiedDocs = studentRepository.countStudentsWithAllVerifiedDocs();
        Long studentsWithPendingDocs = studentRepository.countStudentsWithPendingDocs();

        double verificationSuccessRate = (totalDocuments > 0) ? ((double) verifiedDocuments / totalDocuments) * 100 : 0;

        return new VerificationAnalyticsResponse(
                totalStudents, totalDocuments, verifiedDocuments, verificationSuccessRate, studentsWithAllVerifiedDocs, studentsWithPendingDocs
        );
    }
}
