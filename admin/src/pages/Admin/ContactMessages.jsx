import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const ContactMessages = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  // State for messages, search, and pagination
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch contact messages
  const getContactMessages = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/contact-messages`, {
        method: "GET",
        headers: {
          aToken: aToken,
        },
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (aToken) {
      getContactMessages();
    }
  }, [aToken]);

  // Filter messages based on search term
  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Date formatting function
  const formatDate = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      // Extract date-only string (YYYY-MM-DD)
      const dateString = date.toISOString().split("T")[0];
      if (slotDateFormat) {
        const formatted = slotDateFormat(dateString);
        // Debug: Log the output of slotDateFormat
        console.log("slotDateFormat output:", formatted);
        // Check if slotDateFormat returned a valid string
        if (typeof formatted === "string" && !formatted.includes("undefined")) {
          return formatted;
        }
      }
      // Fallback formatting
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="w-full max-w-7xl m-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-lg font-semibold text-gray-800">Contact Messages</p>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search messages..."
            className="border rounded-lg px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_3fr_2fr_2fr] grid-flow-col py-3 px-6 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-semibold text-gray-700">#</p>
          <p className="text-sm font-semibold text-gray-700">Name</p>
          <p className="text-sm font-semibold text-gray-700">Email</p>
          <p className="text-sm font-semibold text-gray-700">Subject</p>
          <p className="text-sm font-semibold text-gray-700">Message</p>
          <p className="text-sm font-semibold text-gray-700">Date</p>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              className="grid grid-cols-2 sm:grid-cols-[0.5fr_2fr_2fr_3fr_2fr_2fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50 gap-2 transition-colors duration-200"
              key={index}
            >
              <p className="max-sm:hidden">{indexOfFirstItem + index + 1}</p>
              <p className="col-span-2 sm:col-span-1 text-sm">{item.name}</p>
              <p className="col-span-2 sm:col-span-1 text-sm">{item.email}</p>
              <p className="col-span-2 sm:col-span-1 text-sm">{item.subject}</p>
              <p
                className="col-span-2 sm:col-span-1 text-sm truncate"
                title={item.message}
              >
                {item.message}
              </p>
              <p className="col-span-2 sm:col-span-1 text-sm">
                {formatDate(item.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No messages found matching your criteria
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredMessages.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;