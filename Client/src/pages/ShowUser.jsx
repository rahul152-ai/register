import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const ShowUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  if (localStorage.getItem("user") === null) {
    // Corrected the condition here
    navigate("/");
  }

  const update = () => {
    navigate("/update");
  };
  const deleteUser = async () => {
    try {
      const userIdToDelete = user._id;

      const apiUrl = `http://localhost:3000/user/delete/${userIdToDelete}`;

      await axios.delete(apiUrl);

      localStorage.removeItem("user");
      if (localStorage.getItem("user" === null)) {
        redirect("/");
      }
      alert("User deleted successfully");
      setUser(" ");
    } catch (error) {
      console.log(error);
      console.error("Error deleting user:", error.message);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    if (localStorage.getItem("user") === null) {
      navigate("/");
    }
  }, []);
  return (
    <>
      {user && (
        <div className="container mx-auto relative">
          <div className="bg-[#F2ECEC] mx-auto text-left pl-5 w-full sm:w-[40rem] border rounded-lg mt-3 h-[50vh] shadow-lg">
            <div className="text-center text-xl py-2">Your Details</div>
            <div className="grid gap-8 mt-2">
              <div className="flex">
                <div className="w-[30%] text-lg ">Name</div>:
                <div className="w-[60%] ml-2">{user.username}</div>
              </div>
              <div className="flex">
                <div className="w-[30%] text-lg ">Email</div>:
                <div className="w-[60%] ml-2">{user.email}</div>
              </div>
              <div className="flex">
                <div className="w-[30%] text-lg ">Phone</div>:
                <div className="w-[60%] ml-2">{user.phone}</div>
              </div>
              <div className="flex">
                <div className="w-[30%] text-lg ">Password</div>:
                <div className="w-[60%] ml-2">{user.password}</div>
              </div>
            </div>
            <button
              className="bg-[#11BE07] rounded border py-1 px-2 hover:bg-[green] text-white absolute bottom-2"
              onClick={deleteUser}
            >
              DelteUser
            </button>
            <button
              className="bg-[#F74444] rounded border py-1 px-2 hover:bg-[red] text-white  bottom-2"
              onClick={update}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowUser;
