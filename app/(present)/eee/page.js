import PresentDisplay from "../components/PresentDisplay";
import api from "@/utils/AxiosConfig";

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