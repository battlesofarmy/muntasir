// "use client";

// import { useEffect, useState } from "react";
import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";

export default async function PhyPresnt() {
  // const [phypresent, setPhyPresent] = useState([]);

  // useEffect(() => {
  //     api.get("/present/phy")
  //     .then((res)=>setPhyPresent(res.data))
  //     .catch((err)=> console.log(err))
  // }, []);
  let phypresent =[];
  try{
    const res = await api.get(`/present/phy`);
    phypresent = res.data;
    
  }catch(err){
    console.log(err)
  }
  console.log(phypresent);

  return (
    <PresentDisplay presents={phypresent} title={"Physics Lab Attendance"} />
  );
}