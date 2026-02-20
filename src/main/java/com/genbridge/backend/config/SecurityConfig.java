package com.genbridge.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
    // Exception {
    // http
    // .csrf(csrf -> csrf.disable())
    // .sessionManagement(sm ->
    // sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    // .authorizeHttpRequests(auth -> auth
    // // Swagger / OpenAPI (allow)
    // .requestMatchers(
    // "/swagger-ui/**",
    // "/swagger-ui.html",
    // "/v3/api-docs/**",
    // "/api-docs/**" // you had this path in logs earlier
    // ).permitAll()

    // // Auth endpoints (allow)
    // .requestMatchers("/api/auth/**").permitAll()

    // // Moderator/Admin only
    // .requestMatchers("/api/content/pending").hasRole("ADMIN")
    // .requestMatchers("/api/content/*/approve").hasRole("ADMIN")
    // .requestMatchers("/api/content/*/reject").hasRole("ADMIN")

    // // Learners (and admins) can view approved content + details
    // .requestMatchers("/api/content/approved").authenticated()
    // .requestMatchers("/api/content/*").authenticated()

    // // Learners submit/draft
    // .requestMatchers("/api/content/draft", "/api/content/submit").authenticated()

    // .anyRequest().permitAll())
    // .addFilterBefore(jwtAuthenticationFilter,
    // UsernamePasswordAuthenticationFilter.class);

    // return http.build();
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/api-docs/**")
                        .permitAll()

                        .requestMatchers("/api/auth/**").permitAll()

                        // TEMPORARY FOR TESTING
                        .requestMatchers("/api/content/**").permitAll()

                        .anyRequest().permitAll())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}