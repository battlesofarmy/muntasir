"use client";

import { useEffect, useState } from "react";
import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";

export default function PhyPresnt() {
  const [phypresent, setPhyPresent] = useState([]);

  useEffect(() => {
      api.get("/present/phy")
      .then((res)=>setPhyPresent(res.data))
      .catch((err)=> console.log(err))
  }, []);

  return (
    <PresentDisplay presents={phypresent} title={"Physics Lab Attendance"} />
  );
}