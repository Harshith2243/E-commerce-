import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
 

const statusColors = {
  Pending:    "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped:    "bg-indigo-100 text-indigo-700",
  Delivered:  "bg-green-100 text-green-700",
  Cancelled:  "bg-red-100 text-red-700",
};

export default function Profile({
  setShowProfile,
  setShowCart,
  setShowWishlist,
  setShowAdmin,
  setShowOrders,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  const [tab, setTab] = useState("profile");

  // Edit profile state
  const [editForm, setEditForm] = useState({ name: user?.name || "" });
  const [editLoading, setEditLoading] = useState(false);

  // Change password state
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwLoading, setPwLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Please login to view your profile</p>
      </div>
    );
  }

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setEditLoading(true);
    try {
      const { data } = await API.put(`/users/${user._id}`, { name: editForm.name });
      const updatedUser = { ...user, name: data.user.name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setEditLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setPwLoading(true);
    try {
      await API.put(`/users/${user._id}/change-password`, {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success("Password changed successfully!");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPwLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Profile header card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 flex items-center gap-4">
          <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center text-yellow-400 text-2xl font-bold flex-shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
            {user.email === "aripelliharshith123@gmail.com" && (
              <span className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full font-bold mt-1 inline-block">
                ⚡ Admin
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 mb-6 shadow">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                tab === t.id
                  ? "bg-black text-yellow-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEditProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full border rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              <button
                type="submit"
                disabled={editLoading}
                className="bg-black hover:bg-gray-800 disabled:opacity-50 text-yellow-400 px-6 py-3 rounded-xl font-bold transition-colors"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}

        {/* PASSWORD TAB */}
        {tab === "password" && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              {[
                { label: "Current Password", key: "currentPassword" },
                { label: "New Password", key: "newPassword" },
                { label: "Confirm New Password", key: "confirmPassword" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="password"
                    value={pwForm[key]}
                    onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                    className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              ))}
              {pwForm.newPassword && pwForm.confirmPassword && pwForm.newPassword !== pwForm.confirmPassword && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
              <button
                type="submit"
                disabled={pwLoading}
                className="bg-black hover:bg-gray-800 disabled:opacity-50 text-yellow-400 px-6 py-3 rounded-xl font-bold transition-colors"
              >
                {pwLoading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}