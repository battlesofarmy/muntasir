import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";

export const revalidate = 0; // This disables caching and sets "Cache-Control: no-store"

export default async function EEEpresent() {

  let eeepresent =[];
  try{
    const res = await api.get(`/present/eee`);
    eeepresent = res.data;
  }catch(err){
    console.log(err)
  }

  return <PresentDisplay presents={eeepresent} title={"EEE Lab Attendance"} />;
}