package backend.service.analytics;

import backend.repository.jpa.DocumentRepository;
import backend.utils.AnalyticsUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DocumentAnalyticsService {

    @Autowired
    private DocumentRepository documentRepository;

    public Map<String, Object> getTotalStorageUsed() {
        List<String> fileSizes = documentRepository.getAllFileSizes();
        if (fileSizes.isEmpty()) {
            return Collections.singletonMap("TotalStorageUsed", "0 MB");
        }

        double totalBytes = fileSizes.stream()
                .mapToLong(AnalyticsUtils::convertToBytes)
                .sum();

        String totalSize = AnalyticsUtils.convertToHumanReadable(totalBytes);

        return Collections.singletonMap("TotalStorageUsed", totalSize);
    }


    public Map<String, Object> getAverageFileSize() {
        List<String> fileSizes = documentRepository.getAllFileSizes();
        if (fileSizes.isEmpty()) {
            return Collections.singletonMap("AverageFileSize", "0 MB");
        }

        double totalBytes = 0;
        int count = 0;

        for (String size : fileSizes) {
            long bytes = AnalyticsUtils.convertToBytes(size);
            if (bytes > 0) {
                totalBytes += bytes;
                count++;
            }
        }

        if (count == 0) {
            return Collections.singletonMap("AverageFileSize", "0 MB");
        }

        double avgBytes = totalBytes / count;
        String avgSize = AnalyticsUtils.convertToHumanReadable(avgBytes);

        return Collections.singletonMap("AverageFileSize", avgSize);
    }



    public Map<String, Object> getMostCommonDocumentType() {
        List<Object[]> result = documentRepository.getMostCommonDocumentType();
        Map<String, Object> response = new HashMap<>();
        if (!result.isEmpty()) {
            Object[] mostCommon = result.get(0);
            response.put("DocumentType", mostCommon[0]);
            response.put("Percentage", mostCommon[1] + "%");
        }
        return response;
    }

    public Map<String, Object> getTopUploaders() {
        List<Object[]> topUploaders = documentRepository.getTopUploaders();
        Map<String, Object> response = new HashMap<>();
        response.put("TopUploaders", topUploaders);
        return response;
    }

    public Map<String, Object> getLargestFileUploaded() {
        List<String> fileSizes = documentRepository.getAllFileSizes();
        if (fileSizes.isEmpty()) {
            return Collections.singletonMap("LargestFileSize", "0 MB");
        }

        double maxBytes = fileSizes.stream()
                .mapToLong(AnalyticsUtils::convertToBytes)
                .max()
                .orElse(0);

        String largestSize = AnalyticsUtils.convertToHumanReadable(maxBytes);

        return Collections.singletonMap("LargestFileSize", largestSize);
    }

}
