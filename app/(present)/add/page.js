"use client";

import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton"
import '../components/table.css';
import api from "@/utils/AxiosConfig";
import { AuthContext } from "@/utils/AuthProvider";

export default function ClickTracker() {
  const [students, setStudents] = useState([]); // Initialize as an empty array
  const [clickCounts, setClickCounts] = useState([]); // Initialize as an empty array
  const [date, setDate] = useState("");
  const [dayName, setDayName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [courseName, setCourseName] = useState("");
  const {user} = useState(AuthContext);


  // Fetch students from the API
  useEffect(() => {
    api.get("/student")
      .then((res) => {
        setStudents(res.data); // Set fetched students
        setClickCounts(Array(res.data.length).fill("a")); // Initialize attendance as "a"
      })
      .catch((err) => console.error("Error fetching students. You might not a logged user!", err));
  }, []);

  // Handle click to mark attendance
  const handleClick = (index) => {
    const updatedCounts = [...clickCounts];
    updatedCounts[index] = (updatedCounts[index] === "p") ?  "a" : "p"; // Mark as present
    setClickCounts(updatedCounts);
  };

  const handleDateChange = (e) => {
    const targetDate = e.target.value;


    const date = new Date(targetDate).toLocaleDateString("en-US", {
        day: "2-digit",    // Day number with two digits (e.g., "21")
        month: "short" ,    // Abbreviated month name (e.g., "Jan")
      });
    setDate(date);
    
    const day = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",  // Day name (e.g., "Fri")
    });
    setDayName(day);
  };

  
  // Submit attendance (example function)
  const handleAddPresents = () => {
    setErrorMsg("");
    setSuccessMsg("");

    // if(!user?.email){
    //   setErrorMsg("Login as a Admin to submit Attendence");
    //   console.log(user)
    //   return;
    // }

    if(!courseName){
      setErrorMsg("Select a Course Name");
      return;
    }
    
    if(!dayName){
      setErrorMsg("Choice the Attendance Date");
      return;
    }
    console.log(clickCounts); // Log the attendance array

    const presentObj = {
      "course" : courseName,
      "date" : {
        // "day" : dayName.slice(0,3),
        // "month": dayName.slice(5),
        "day" : dayName,
        "month": date,
      }
    }

    presentObj.present = clickCounts;

    api.post("/present", presentObj, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setSuccessMsg("Successfully Attendence taken")
      })
      .catch((err) => setErrorMsg("Error fetching students: ", err));
  };
  

  return (
    <section className="py-10">
      <div className="container">
      
       {/* Header  */}
      <div className="flex justify-between items-center mb-4">
          <h3 className='md:text-2xl text-lg border-l-blue-800 border-l-4 pl-2'>Attendence Sheet</h3>
            <select
                id="course"
                className="border rounded-md md:px-4 px-0 py-1 md:text-sm text-xs bg-primary"
                value={courseName} // Bind the value to state
                onChange={(e)=> setCourseName(e.target.value)}
              >
                <option value="" disabled>
                  Course
                </option>
                <option value="phy">Phy</option>
                <option value="eee">EEE</option>
            </select>

          {/* Hidden but focusable input */}
          <div className="flex gap-0 items-center">

          <div className="bg-orange text-xs mr-1 font-medium text-center">
            <p> {date}</p>
            <p> {dayName}</p>
          </div>

            <input
              type="date"
              id="date"
              className="absolute top-0 left-0 w-10 opacity-0 pointer-events-none"
              onChange={handleDateChange}
            />
            {/* Calendar icon as button */}
            <button
              onClick={() => document.getElementById("date").showPicker()} // Use showPicker for better compatibility
              className="border rounded-md px-2 py-2 text-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <FaRegCalendarDays/>
            </button>
          </div>
      </div>

      {/* Body  */}
       <table>
        {students?.map((student, index) => (
            <tr
              key={student.id} // Use a unique key (like student.id)
              className="cursor-pointer"
              onClick={() => handleClick(index)}
              style={{backgroundColor:  clickCounts[index] === "p" && "#2a4038" }}
            >
            <td>{student.id}</td>
            <td className="text-left md:text-center pl-4">{student.name}</td>
            <td>
                {
                   clickCounts[index] === "p" ? 
                   <button className="bg-green-600 px-3 py-1  text-white text-[13px]">Present</button>
                   :
                   <button className="bg-red-600  px-3 py-1 text-white text-xs">Absent</button>
                }
            </td>
            </tr>
          ))
          }
         
         {
             students.length===0 && 
             <div className="flex flex-col py-10">
                <Skeleton className="h-[50vh] w-[100wh] rounded-xl bg-primary" />
            </div>
         }

          <tr>
            <td></td>
            <td></td>
            <td>
              Total Presents: {clickCounts.filter(ele=> ele === "p").length} 
            </td>
          </tr>
       </table>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-right"
          onClick={handleAddPresents}
        >
          Submit Attendance
        </button>

      <div>
      {
        errorMsg&& <p className="text-red-600 mt-2">{errorMsg}</p>
      }
      {
        successMsg&& <p className="text-green-600 mt-2">{successMsg}</p>
      }
      </div>


      </div>
    </section>
  );
}