package org.habithero.backend.config.dispatcherservlet;

import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.DispatcherServletRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.DispatcherServlet;

@Configuration
public class DispatcherServletConfig {
    /*@Bean
    @Primary
    public DispatcherServletRegistrationBean servletRegistration() {
        return new DispatcherServletRegistrationBean(
                new DispatcherServlet(),
                "/api/v1"
        );
    }*/
}
