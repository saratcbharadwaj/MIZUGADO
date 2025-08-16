package com.mizugado.backend.repository;

import com.mizugado.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by their username. Spring Data JPA automatically
     * creates the query for us based on the method name.
     * @param username the username to search for.
     * @return an Optional containing the user if found, or empty if not.
     */
    Optional<User> findByUsername(String username);
}