package org.sid.dao;

import java.util.List;

import org.sid.entities.Client;
import org.sid.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

	public Profile findByUsername(String username);
}
