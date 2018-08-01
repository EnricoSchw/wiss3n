package de.wiss3n.webapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(de.wiss3n.webapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.Task.class.getName() + ".contents", jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.SchoolClass.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.SchoolClass.class.getName() + ".teachingHours", jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.TeachingSubject.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.TeachingSubject.class.getName() + ".teachingHours", jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.TeachingHour.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.TeachingHour.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.Content.class.getName(), jcacheConfiguration);
            cm.createCache(de.wiss3n.webapp.domain.SchoolClass.class.getName() + ".schoolClasses", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
