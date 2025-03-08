package backend.controller.analytics;

import backend.service.analytics.DocumentAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/analytics")
public class DocumentAnalyticsController {

    @Autowired
    private DocumentAnalyticsService documentAnalyticsService;


    @GetMapping("/total-storage")
    public Map<String, Object> getTotalStorageUsed() {
        return documentAnalyticsService.getTotalStorageUsed();
    }

    @GetMapping("/average-file-size")
    public Map<String, Object> getAverageFileSize() {
        return documentAnalyticsService.getAverageFileSize();
    }

    @GetMapping("/common-document-type")
    public Map<String, Object> getMostCommonDocumentType() {
        return documentAnalyticsService.getMostCommonDocumentType();
    }

    @GetMapping("/top-uploaders")
    public Map<String, Object> getTopUploaders() {
        return documentAnalyticsService.getTopUploaders();
    }

    @GetMapping("/largest-file")
    public Map<String, Object> getLargestFileUploaded() {
        return documentAnalyticsService.getLargestFileUploaded();
    }
}
