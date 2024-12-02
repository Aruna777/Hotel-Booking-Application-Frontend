import React, { useState } from "react";

const Home = () => {
  const [guestDetails, setGuestDetails] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dates, setDates] = useState({ checkin: "", checkout: "" });
  const [error, setError] = useState("");
  const [destination, setDestination] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const cities = [
    "New York",
    "miami",
    "orlando",
    "maine",
    "oregon",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "San Francisco",
    "Charlotte",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington",
    "Boston",
  ];

  const handleGuestChange = (field, value) => {
    setGuestDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDateChange = (field, value) => {
    setDates((prev) => {
      const newDates = { ...prev, [field]: value };

      if (
        newDates.checkin &&
        newDates.checkout &&
        new Date(newDates.checkout) <= new Date(newDates.checkin)
      ) {
        setError("Check-out date must be after check-in date.");
      } else {
        setError("");
      }

      return newDates;
    });
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setDestination(city);
    setFilteredCities([]);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-transparent bg-opacity-50 mt-16">
      <div className="flex flex-col items-center justify-center h-full w-full px-4 bg-transparent bg-opacity-50">
        <p className="text-white text-7xl mb-8 font-calligraphy ">
          Where comfort meets tranquility
        </p>
        <div className="flex flex-wrap items-center justify-between bg-transparent mt-16 m-4 mb-72 shadow-lg p-6 gap-4 w-full max-w-6xl border border-white rounded-xl">
          {/* Destination Search */}
          <div className="flex flex-col relative">
            <label
              htmlFor="destination"
              className="text-white font-medium mb-1"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Where are you going?"
              className="border border-gray-300 rounded-lg px-4 py-2 placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredCities.length > 0 && (
              <div className="absolute  text-black bg-white border rounded-lg shadow-lg mt-2 w-full max-w-xs z-50 overflow-y-auto">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className="cursor-pointer p-2 hover:bg-blue-100"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Check-in Date */}
          <div className="flex flex-col">
            <label htmlFor="checkin" className="text-white font-medium mb-1">
              Check-in
            </label>
            <input
              type="date"
              id="checkin"
              value={dates.checkin}
              onChange={(e) => handleDateChange("checkin", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Check-out Date */}
          <div className="flex flex-col">
            <label htmlFor="checkout" className="text-white font-medium mb-1">
              Check-out
            </label>
            <input
              type="date"
              id="checkout"
              value={dates.checkout}
              onChange={(e) => handleDateChange("checkout", e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Guests and Rooms Dropdown */}
          <div className="relative dropdown">
            <label htmlFor="guests" className="text-white font-medium mb-1">
              Guests & Rooms
            </label>
            <div
              onClick={toggleDropdown}
              className="border text-black bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {guestDetails.adults} Adults, {guestDetails.children} Children,{" "}
              {guestDetails.rooms} Rooms
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white border rounded-lg shadow-lg p-4 mt-2 z-50 w-64">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black">Adults</span>
                  <input
                    type="number"
                    min="1"
                    value={guestDetails.adults}
                    onChange={(e) =>
                      handleGuestChange("adults", +e.target.value)
                    }
                    className="border border-gray-300 rounded-lg w-16 px-2 py-1 text-center focus:outline-none"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black">Children</span>
                  <input
                    type="number"
                    min="0"
                    value={guestDetails.children}
                    onChange={(e) =>
                      handleGuestChange("children", +e.target.value)
                    }
                    className="border border-gray-300 rounded-lg w-16 px-2 py-1 text-center focus:outline-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black">Rooms</span>
                  <input
                    type="number"
                    min="1"
                    value={guestDetails.rooms}
                    onChange={(e) =>
                      handleGuestChange("rooms", +e.target.value)
                    }
                    className="border border-gray-300 rounded-lg w-16 px-2 py-1 text-center focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Search Button */}
          <div className="flex flex-col justify-end">
            {error && (
              <p className=" bg-white text-red-500 text-sm mb-2">{error}</p>
            )}
            <button
              className="bg-gray-700 text-white font-bold px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              disabled={
                !!error || !dates.checkin || !dates.checkout || !destination
              }
            >
              Search
            </button>
          </div>
        </div>
        {/* Additional Content */}
        <div className="bg-gray-800 text-white w-full py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Our Company</h3>
                <ul className="space-y-2">
                  <li>About Serene Stays</li>
                  <li>Careers</li>
                  <li>Investor Relations</li>
                  <li>News</li>
                  <li>CEO Tony Capuano’s Blog</li>
                  <li>Our Stories</li>
                  <li>Digital Accessibility</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Find Help</h3>
                <ul className="space-y-2">
                  <li>Help & Contact Us</li>
                  <li>Look Up Reservation</li>
                  <li>Global Reservation Phone Numbers</li>
                  <li>Book Here, Benefit Now</li>
                  <li>Best Rate Guarantee Form</li>
                  <li>Missing Stay Form</li>
                  <li>Site Map</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Top Destinations</h3>
                <ul className="space-y-2">
                  <li>Bahamas Hotels</li>
                  <li>Boston Hotels</li>
                  <li>Charleston Hotels</li>
                  <li>Chicago Hotels</li>
                  <li>Denver Hotels</li>
                  <li>Island of Hawaii Hotels</li>
                  <li>Las Vegas Hotels</li>
                </ul>
                <p className="mt-4 underline">View All Hotels</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
