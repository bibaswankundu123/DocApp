import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {  FiCalendar, FiPieChart, FiBarChart2, FiFilter, FiRefreshCw } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ReactApexChart from "react-apexcharts";
import { format, subMonths, startOfDay, endOfDay } from "date-fns";

const Reports = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const [dateRange, setDateRange] = useState([
    {
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
      key: "selection"
    }
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeRange, setTimeRange] = useState("last30days");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  const timeRanges = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last7days", label: "Last 7 Days" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "custom", label: "Custom Range" }
  ];

  const applyFilters = async () => {
    setIsLoading(true);
    try {
      await getDashData();
      let result = dashData?.latestAppointments || [];

      if (timeRange === "custom") {
        result = result.filter(item => {
          const appointmentDate = new Date(item.date);
          return (
            appointmentDate >= dateRange[0].startDate &&
            appointmentDate <= dateRange[0].endDate
          );
        });
      } else {
        const now = new Date();
        let startDate, endDate;

        switch (timeRange) {
          case "today":
            startDate = startOfDay(now);
            endDate = endOfDay(now);
            break;
          case "yesterday":
            startDate = startOfDay(new Date(now.setDate(now.getDate() - 1)));
            endDate = endOfDay(new Date(now.setDate(now.getDate())));
            break;
          case "last7days":
            startDate = new Date(now.setDate(now.getDate() - 7));
            endDate = now;
            break;
          case "last30days":
            startDate = new Date(now.setDate(now.getDate() - 30));
            endDate = now;
            break;
          default:
            break;
        }

        if (startDate && endDate) {
          result = result.filter(item => {
            const appointmentDate = new Date(item.date);
            return (
              appointmentDate >= startDate &&
              appointmentDate <= endDate
            );
          });
        }
      }

      setFilteredData(result);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (aToken) {
      applyFilters();
    }
  }, [aToken, timeRange, dateRange]);

  const prepareChartData = () => {
    if (!dashData?.monthWiseReport) return { series: [], categories: [] };

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    const currentYearData = Array(12).fill(0);
    dashData.monthWiseReport
      .filter(item => item.year === currentYear)
      .forEach(item => {
        currentYearData[item.month - 1] = item.total;
      });

    const lastYearData = Array(12).fill(0);
    dashData.monthWiseReport
      .filter(item => item.year === lastYear)
      .forEach(item => {
        lastYearData[item.month - 1] = item.total;
      });

    return {
      series: [
        { name: currentYear, data: currentYearData },
        { name: lastYear, data: lastYearData }
      ],
      categories: months
    };
  };

  const chartData = prepareChartData();

  const chartOptions = {
    chart: {
      type: chartType,
      height: 350,
      toolbar: { show: true }
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" }
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: "Amount (₹)" } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val;
        }
      }
    },
    colors: ["#4f46e5", "#10b981"]
  };

  const summaryCards = [
    {
      title: "Total Collection",
      value: `₹${dashData?.totalCollection || 0}`,
      icon: <FaRupeeSign  className="text-2xl" />,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Today's Collection",
      value: `₹${dashData?.todaysCollection || 0}`,
      icon: <FiCalendar className="text-2xl" />,
      change: "+5%",
      trend: "up"
    },
    {
      title: "Active Appointments",
      value: dashData?.appointments || 0,
      icon: <FiPieChart className="text-2xl" />,
      change: "-3%",
      trend: "down"
    },
    {
      title: "Total Patients",
      value: dashData?.patients || 0,
      icon: <FiBarChart2 className="text-2xl" />,
      change: "+8%",
      trend: "up"
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports Dashboard</h1>
          <p className="text-gray-600">Analyze your clinic's performance</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={applyFilters}
        >
          <FiRefreshCw className={`${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter className="text-gray-500" />
          <h3 className="font-medium">Filter by Date</h3>
        </div>
        <div className="relative">
          <select
            className="w-full md:w-48 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              if (e.target.value !== "custom") {
                setShowDatePicker(false);
              }
            }}
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        {timeRange === "custom" && (
          <div className="mt-4 relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <FiCalendar />
              {format(dateRange[0].startDate, "MMM d, yyyy")} - {format(dateRange[0].endDate, "MMM d, yyyy")}
            </button>
            {showDatePicker && (
              <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
                <DateRangePicker
                  ranges={dateRange}
                  onChange={item => {
                    setDateRange([item.selection]);
                    setShowDatePicker(false);
                  }}
                  staticRanges={[]}
                  inputRanges={[]}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <p className={`text-sm mt-2 ${card.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {card.change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                className={`px-3 py-1 rounded-lg ${chartType === "bar" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100"}`}
                onClick={() => setChartType("bar")}
              >
                Bar
              </button>
              <button
                className={`px-3 py-1 rounded-lg ${chartType === "line" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100"}`}
                onClick={() => setChartType("line")}
              >
                Line
              </button>
              <button
                className={`px-3 py-1 rounded-lg ${chartType === "area" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100"}`}
                onClick={() => setChartType("area")}
              >
                Area
              </button>
            </div>
          </div>
          <div className="h-80">
            <ReactApexChart
              options={chartOptions}
              series={chartData.series}
              type={chartType}
              height="100%"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Month-wise Collection</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {dashData?.monthWiseReport?.length > 0 ? (
              <>
                <div className="grid grid-cols-3 p-4 bg-gray-50 font-semibold text-gray-700">
                  <p>Month</p>
                  <p>Year</p>
                  <p className="text-right">Total Collection</p>
                </div>
                {dashData.monthWiseReport.map((item, index) => (
                  <div
                    className="grid grid-cols-3 p-4 hover:bg-gray-50 transition-colors duration-200"
                    key={index}
                  >
                    <p>{new Date(2000, item.month - 1).toLocaleString('default', { month: 'long' })}</p>
                    <p>{item.year}</p>
                    <p className="text-right font-medium">₹{item.total}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="py-10 text-center text-gray-500">
                No collection data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;