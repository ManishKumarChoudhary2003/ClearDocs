package backend.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class AnalyticsUtils {

    public static LocalDateTime convertToLocalDateTime(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    public static Date convertToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static long convertToBytes(String size) {
        if (size == null || size.isEmpty()) return 0;
        try {
            return Long.parseLong(size.trim()); // Directly parse the numeric value in bytes
        } catch (NumberFormatException e) {
            System.err.println("Invalid file size format: " + size);
            return 0;
        }
    }


    public static String convertToHumanReadable(double bytes) {
        if (bytes >= 1024 * 1024 * 1024) {
            return String.format("%.2f GB", bytes / (1024 * 1024 * 1024));
        } else if (bytes >= 1024 * 1024) {
            return String.format("%.2f MB", bytes / (1024 * 1024));
        } else if (bytes >= 1024) {
            return String.format("%.2f KB", bytes / 1024);
        } else {
            return String.format("%.2f Bytes", bytes);
        }
    }

}
