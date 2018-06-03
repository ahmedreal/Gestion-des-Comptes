package org.sid.service;

import org.sid.entities.AppRole;
import org.sid.entities.Profile;

public interface AccountService {

	public Profile saveProfil(Profile p);
	public AppRole saveRole(AppRole r);
	public void addRoleToProfil(String username,String roleName);
	public Profile findUserByUserName(String username);
}
