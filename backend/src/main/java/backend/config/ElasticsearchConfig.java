package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.elasticsearch.core.convert.ElasticsearchCustomConversions;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Configuration
@EnableElasticsearchRepositories(basePackages = "backend.repository.elastic")
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchCustomConversions elasticsearchCustomConversions() {
        return new ElasticsearchCustomConversions(Arrays.asList(
                // LocalDateTime -> String converter
                new Converter<LocalDateTime, String>() {
                    @Override
                    public String convert(LocalDateTime source) {
                        return source.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                    }
                },
                // String -> LocalDateTime converter
                new Converter<String, LocalDateTime>() {
                    @Override
                    public LocalDateTime convert(String source) {
                        return LocalDateTime.parse(source, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
                    }
                }
        ));
    }
}
