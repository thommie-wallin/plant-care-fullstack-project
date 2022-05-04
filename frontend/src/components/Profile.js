import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = currentUser.roles.find((e) => e === "ROLE_ADMIN");

  return (
    <div>
      <header>
        <h3>
          <strong>Profile</strong> {currentUser.username}
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      {isAdmin === "ROLE_ADMIN" && (
        <div>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Profile;
