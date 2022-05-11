import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";

function Admin() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);
  let isAdmin;

  useEffect(() => {
    let mounted = true;
    UserService.getUsers().then((users) => {
      if (mounted) {
        setUsers(users);
      }
    });
    return () => (mounted = false);
  }, [deleteUser]);

  const handleDelete = (id) => {
    UserService.deleteUser(id);
    setDeleteUser(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Admin panel</h1>
        <div>
          <Link to="/createuser">
            <button className="w-full sm:h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold  mr-2 sm:mr-4">
              Create
            </button>
          </Link>
        </div>
      </div>

      {/* Admin panel */}
      <div className="flex flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-fixed w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/12 px-1 md:px-6 md:py-3 text-center md:text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="w-1/12 md:w-3/12 break-all truncate px-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="w-1/12 md:w-3/12 break-all truncate px-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="w-1/12 md:w-2/12 lg:w-1/12 px-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="w-1/12 px-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="w-1/12 px-1 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <span className="sr-only">Del</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map((user, index) => (
                    <tr key={index}>
                      <td className="break-all px-1 md:px-6 md:py-4">
                        <div className="truncate px-1 md:px-2 leading-5 text-sm text-gray-500">
                          {user._id}
                        </div>
                      </td>
                      <td className="break-all px-1 md:px-6 md:py-4">
                        <div>
                          <div className="md:ml-4 truncate text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                        </div>
                      </td>

                      <td className="break-all px-1 md:px-6 md:py-4">
                        <div className="truncate text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="break-all px-1 md:px-6 md:py-4">
                        <div className="truncate">
                          <span
                            className={`${
                              (isAdmin = user.roles.find(
                                (element) => element === "admin"
                              )) === "admin"
                                ? "px-1 lg:px-2 inline-flex  lg:rounded-full bg-green-100"
                                : "px-1 md:px-2 inline-flex"
                            }`}
                          >
                            <div
                              className={`${
                                (isAdmin = user.roles.find(
                                  (element) => element === "admin"
                                )) === "admin"
                                  ? "text-green-800 text-sm leading-5"
                                  : "text-gray-500 text-sm leading-5"
                              }`}
                            >
                              {isAdmin === "admin" ? "admin" : "user"}
                            </div>
                          </span>
                        </div>
                      </td>
                      <td className="break-all px-1 md:px-6 md:py-4 text-right text-sm font-medium truncate">
                        <Link
                          to={`/updateuser/${user._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="break-all px-1 md:px-6 md:py-4 text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium truncate"
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
