import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";


export default async function PhyPresnt() {
  let phypresent =[];
  try{
    const res = await api.get(`/present/phy`, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
    phypresent = res.data;
  }catch(err){
    console.log(err)
  }

  return (
    <PresentDisplay presents={phypresent} title={"Physics Lab Attendance"} />
  );
}