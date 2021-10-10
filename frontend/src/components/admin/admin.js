import { useState, useEffect } from "react";
import { getUsers, delUser } from "../../services/users";
import { Link } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    getUsers()
      .then(users => {
      if(mounted) {
        setUsers(users);
      }
    })
    return () => mounted = false;
  }, [deleteUser]);

  const handleDelete = (id) => {
    delUser(id)
    setDeleteUser(id);
    console.log(id)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Admin</h1>
        <div>
          <Link to="/createuser">
              <button className="w-full sm:h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold  mr-2 sm:mr-4">Create</button>
            </Link>
        </div>
      </div>

      {/* Admin panel */}
      <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-center"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-center"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Del</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <span className="px-2 leading-5 text-sm text-gray-500">
                          {user._id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-start">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>          
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 text-gray-500">
                        <div className="text-sm text-gray-500">{user.password}</div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className={`${user.admin === true  ? 'px-2 inline-flex text-sm leading-5 rounded-full bg-green-100 text-green-800' : 'whitespace-nowrap'}`}>
                          <div className="text-sm text-gray-500">{user.admin === true  ? 'admin' : 'user'}</div>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/updateuser/${user._id}`} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a onClick={() => handleDelete(user._id)} href="#" className="text-indigo-600 hover:text-indigo-900">
                        Del
                      </a>
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
  )
}

export default Admin