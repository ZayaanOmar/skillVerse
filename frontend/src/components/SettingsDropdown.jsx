import React from "react";

const SettingsDropdown = () => {
  const handleChangeRoles = () => {
    console.log("Change Roles clicked");
    // Add your logic for Change Roles
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
  };

  return (
    <article className="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md z-50 w-48">
      <section className="list-none m-0 p-0">
        <section>
          <button
            onClick={handleChangeRoles}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Change Roles
          </button>
        </section>
        <section>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            Logout
          </button>
        </section>
      </section>
    </article>
  );
};

export default SettingsDropdown;
