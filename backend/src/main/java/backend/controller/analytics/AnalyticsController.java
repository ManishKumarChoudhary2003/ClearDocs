package backend.controller.analytics;

import backend.dto.VerificationAnalyticsResponse;
import backend.service.analytics.VerificationAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final VerificationAnalyticsService analyticsService;

    @GetMapping("/verification")
    public ResponseEntity<VerificationAnalyticsResponse> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAnalytics());
    }
}
