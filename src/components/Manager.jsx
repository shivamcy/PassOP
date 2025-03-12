import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Toggle password visibility for each row
  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Fetch passwords from backend
  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Save or update password
  const savePassword = async () => {
    if (editingIndex !== null) {
      // Update password
      const updatedPasswords = [...passwordArray];
      updatedPasswords[editingIndex] = form;

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setPasswordArray(updatedPasswords);
      setEditingIndex(null);
    } else {
      // Save new password
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setPasswordArray([...passwordArray, form]);
    }

    setForm({ site: "", username: "", password: "" });
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggle password visibility in the input field
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
      ref.current.src = "open.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "close.avif";
    }
  };

  // Delete password
  const deletePassword = async (index) => {
    let passwordToDelete = passwordArray[index];

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordToDelete),
    });

    const updatedPasswords = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updatedPasswords);
  };

  // Edit password
  const editPassword = (index) => {
    setForm(passwordArray[index]);
    setEditingIndex(index);
  };

  return (
    <>
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700 text-lg"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center">Your own pass manager!</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="close.avif" alt="eye" />
              </span>
            </div>
          </div>
          <motion.button onClick={savePassword} whileTap={{ scale: 0.9 }} className="bg-green-500 rounded-full px-8 py-2 hover:bg-green-300">
            {editingIndex !== null ? "Update Password" : "Add Password"}
          </motion.button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show!</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                <AnimatePresence>
                  {passwordArray.map((item, index) => (
                    <motion.tr key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }}>
                      <td className="text-center">
                        <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                      </td>
                      <td className="text-center">{item.username}</td>
                      <td className="text-center relative">
                        {visiblePasswords[index] ? item.password : "******"}
                        <button onClick={() => togglePasswordVisibility(index)} className="ml-2 text-green-500">
                          {visiblePasswords[index] ? "Hide" : "Show"}
                        </button>
                      </td>
                      <td className="text-center flex gap-2 justify-center">
                        <motion.button className="bg-slate-700 text-white my-3 px-2 py-1 rounded hover:bg-slate-300" onClick={() => editPassword(index)} whileHover={{ scale: 1.1 }}>Edit</motion.button>
                        <motion.button className="bg-green-700 text-white my-3 px-2 py-1 rounded hover:bg-green-300" onClick={() => deletePassword(index)} whileHover={{ scale: 1.1 }}>Delete</motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
