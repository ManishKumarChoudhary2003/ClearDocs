package backend.mapper;

import backend.entity.PlatformUser;
import backend.entity.PlatformUserElastic;

public class PlatformUserMapper {

    public static PlatformUserElastic mapToElastic(PlatformUser platformUser, PlatformUserElastic platformUserElastic) {
        platformUserElastic.setEmail(platformUser.getEmail());
        platformUserElastic.setUsername(platformUser.getUsername());
        platformUserElastic.setMobileNumber(platformUser.getMobileNumber());
        platformUserElastic.setPassword(platformUser.getPassword());
        return platformUserElastic;
    }

}
