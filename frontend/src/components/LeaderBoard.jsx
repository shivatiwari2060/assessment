import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, BarChart3 } from "lucide-react";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "https://assessment-1-y243.onrender.com/sale/leaderboard"
        );

        if (res.data.success) {
          setLeaders(res.data.data);
          setTotalSales(res.data.totalSales);
          setTotalDeals(res.data.totalDeals);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-green-600" size={24} />
          <h1 className="text-2xl font-bold">Today's Leaderboard</h1>
        </div>

        <p className="mt-2 md:mt-0 text-lg font-semibold">
          Total Sales: {totalDeals} | Total Amount: Rs.{" "}
          {Number(totalSales).toFixed(2)}
        </p>
      </div>

      {leaders.map((agent, index) => (
        <div
          key={index}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg mb-4"
        >
          <div className="flex justify-between items-center p-6 cursor-pointer">
            <div>
              <h2 className="text-xl font-semibold">
                #{agent.rank} {agent.agentName}
              </h2>

              <div className="flex items-center gap-4 mt-2 text-sm opacity-90">
                <span>🧾 {agent.totalDeals} deals</span>
                <span>💰 Rs. {Number(agent.totalSales).toFixed(2)}</span>
              </div>
            </div>

            <ChevronDown className="transition-transform duration-300 " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
