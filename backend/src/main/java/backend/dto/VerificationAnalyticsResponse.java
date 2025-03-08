package backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerificationAnalyticsResponse {
    private Long totalStudents;
    private Long totalDocuments;
    private Long verifiedDocuments;
    private Double verificationSuccessRate;
    private Long studentsWithAllVerifiedDocs;
    private Long studentsWithPendingDocs;
}
