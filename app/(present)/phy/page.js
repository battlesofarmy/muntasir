import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";

export const revalidate = 0; // This disables caching and sets "Cache-Control: no-store"

export default async function PhyPresnt() {
  let phypresent =[];
  try{
    const res = await api.get(`/present/phy`);
    phypresent = res.data;
  }catch(err){
    console.log(err)
  }

  return (
    <PresentDisplay presents={phypresent} title={"Physics Lab Attendance"} />
  );
}