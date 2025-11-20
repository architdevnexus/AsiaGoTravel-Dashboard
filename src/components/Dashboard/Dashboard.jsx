import React, { useEffect, useState } from "react";
import { SlBadge } from "react-icons/sl";
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

export const Revenue = () => {
  const [bookings, setBookings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [salesMedium, setSalesMedium] = useState([]);
  const [salesOverview, setSalesOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://194.238.18.1:3003/api/all-sales-data";
  const AGENTS_URL = "http://194.238.18.1:3003/api/get-all-users";
  const HOTEL_BOOKINGS_URL =
    "http://194.238.18.1:3003/api/all-booked-holiday-package";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        // ✅ Fetch all 3 endpoints in parallel
        const [resSales, resAgents, resHotel] = await Promise.all([
          fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(AGENTS_URL, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(HOTEL_BOOKINGS_URL, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [salesData, agentsData, hotelData] = await Promise.all([
          resSales.json(),
          resAgents.json(),
          resHotel.json(),
        ]);

        console.log("Sales data:", salesData);
        console.log("Agents data:", agentsData);
        console.log("Hotel bookings data:", hotelData);

        // ✅ Handle agents — now using your structure
        const allAgents = Array.isArray(agentsData?.users)
          ? agentsData.users
          : [];

        // ✅ Handle hotel bookings safely
        const allBookings = Array.isArray(hotelData)
          ? hotelData
          : hotelData?.data || [];

        // ✅ Sort bookings by latest updatedAt
        const sortedBookings = allBookings.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // ✅ Set states
        setBookings(sortedBookings.slice(0, 3)); // latest 3 bookings
        setAgents(allAgents);
        setRevenueData(salesData.revenueData || []);
        setSalesMedium(salesData.salesMedium || []);
        setSalesOverview(salesData.salesOverview || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="bg-white h-40 p-6 text-[#9D9D9D] space-y-2 rounded-xl">
          <span className="text-[20px]">Total Revenue</span>
          <h1 className="font-semibold text-black text-[30px]">
            ₹{revenueData.reduce((acc, cur) => acc + (cur.sales || 0), 0)}
          </h1>
          <span className="text-[12px]">from last month</span>
        </div>
        <div className="bg-white h-40 p-6 text-[#9D9D9D] space-y-2 rounded-xl">
          <span className="text-[20px]">Total Bookings</span>
          <h1 className="font-semibold text-black text-[30px]">
            {bookings.length}
          </h1>
          <span className="text-[12px]">New recent bookings</span>
        </div>
        <div className="bg-white h-40 p-6 text-[#9D9D9D] space-y-2 rounded-xl">
          <span className="text-[20px]">Total Users</span>
          <h1 className="font-semibold text-black text-[30px]">
            {agents.length}
          </h1>
          <span className="text-[12px]">Performing this month</span>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest Sales Table */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow h-[300px] overflow-y-auto">
            <span className="text-[#9D9D9D] text-[20px]">Latest Sales</span>
            <h2 className="text-2xl font-semibold mb-2">
              Most Recent Booking List
            </h2>
            <table className="w-full text-lg font-normal">
              <thead className="text-[#9D9D9D]">
                <tr>
                  <th className="text-left p-2">Booking ID</th>
                  <th className="text-left p-2">Customer Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone no.</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b, i) => {
                    const guest = b?.hotelBooking?.guestDetails || {};
                    const guest2 = b || {};
                    return (
                      <tr key={i} className="font-semibold border-b">
                        <td className="p-2">{b.uniqueBookingId || "NA"}</td>
                        <td className="p-2">
                          {guest2.firstName || guest.firstName || "-"}
                        </td>
                        <td className="p-2">
                          {guest2.email || guest.email || "-"}
                        </td>
                        <td className="p-2">
                          {guest2.phoneNumber || guest.phoneNumber || "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-3">
                      No booking data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <a
              href="/dashboard/salesmanagement"
              className="text-sm font-semibold text-gray-400"
            >
              View ALL
            </a>
          </div>

          {/* Top Agents */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-3 text-[#9D9D9D]">
              Top Performing <br />
              <span className="text-black text-[28px]">Agents</span>
            </h2>
            <ul>
              {agents.length > 0 ? (
                agents.slice(0, 3).map((agent, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between mb-3 gap-4 border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <SlBadge className="w-[46px] h-[46px] text-gray-400" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg">
                          {agent.firstName} {agent.lastName}
                        </span>
                        <span className="text-[#9D9D9D] text-sm">
                          {agent.email || agent.phone}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No agent data found</p>
              )}
            </ul>
            <a
              href="/dashboard/usermanagement"
              className="text-sm font-semibold text-gray-400"
            >
              View ALL
            </a>
          </div>

          {/* Revenue Overview Chart */}
          <div className="col-span-2 bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Revenue Overview</h2>
              <select className="border rounded p-1 text-sm">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="flights"
                  stroke="#FFD700"
                  fillOpacity={1}
                  fill="url(#color1)"
                />
                <Area
                  type="monotone"
                  dataKey="hotels"
                  stroke="#FF0000"
                  fillOpacity={1}
                />
                <Area
                  type="monotone"
                  dataKey="tours"
                  stroke="#0088FE"
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Medium of Sales Pie Chart */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">Medium of Sales</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={salesMedium}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {salesMedium.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Overview Bar Chart */}
          <div className="bg-white rounded-xl p-4 shadow col-span-2">
            <h2 className="text-lg font-semibold mb-3">Sales Overview</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesOverview}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
