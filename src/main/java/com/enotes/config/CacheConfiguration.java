package com.enotes.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;
import org.redisson.Redisson;
import org.redisson.config.Config;
import org.redisson.jcache.configuration.RedissonConfiguration;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.hibernate.cache.jcache.ConfigSettings;

import java.util.concurrent.TimeUnit;

import javax.cache.configuration.MutableConfiguration;
import javax.cache.expiry.CreatedExpiryPolicy;
import javax.cache.expiry.Duration;

import io.github.jhipster.config.JHipsterProperties;

@Configuration
@EnableCaching
public class CacheConfiguration {

    @Bean
    public javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration(JHipsterProperties jHipsterProperties) {
        MutableConfiguration<Object, Object> jcacheConfig = new MutableConfiguration<>();
        Config config = new Config();
        if (jHipsterProperties.getCache().getRedis().isCluster()) {
            config.useClusterServers().addNodeAddress(jHipsterProperties.getCache().getRedis().getServer());
        } else {
            config.useSingleServer().setAddress(jHipsterProperties.getCache().getRedis().getServer()[0]);
        }
        jcacheConfig.setStatisticsEnabled(true);
        jcacheConfig.setExpiryPolicyFactory(CreatedExpiryPolicy.factoryOf(new Duration(TimeUnit.SECONDS, jHipsterProperties.getCache().getRedis().getExpiration())));
        return RedissonConfiguration.fromInstance(Redisson.create(config), jcacheConfig);
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cm) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cm);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer(javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration) {
        return cm -> {
            createCache(cm, com.enotes.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            createCache(cm, com.enotes.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            createCache(cm, com.enotes.domain.User.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Authority.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            createCache(cm, com.enotes.domain.Person.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.UserPreference.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Preference.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.PreferenceType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Language.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Gender.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.AddressType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Address.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.OtpAuth.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.StatusCategory.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Status.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceCategory.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Service.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceDefinition.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceProvider.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceFacility.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Frequency.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceProviderRole.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceEntry.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceEntryStatusLog.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ServiceEntryTimeLog.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.GeoType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.GeoAssocType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Geo.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.GeoAssoc.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.GeoPoint.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.ProductStore.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.FacilityType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.FacilityGroupType.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.FacilityGroup.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.Facility.class.getName(), jcacheConfiguration);
            createCache(cm, com.enotes.domain.FacilityUser.class.getName(), jcacheConfiguration);
            // jhipster-needle-redis-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName, javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
