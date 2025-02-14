import '../components/table.css';
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/utils/AxiosConfig";

export default async function PresentDisplay({ title, presents }) {


  let students =[];
  try{
    const res = await api.get(`/student`);
    students = res.data;
  }catch(err){
    console.log(err)
  }

  return (
    <section className="py-10">
      <div className="md:container px-2">
        <h3 className="text-2xl mb-6 border-l-blue-800 border-l-4 pl-3">{title}</h3>
        <table>
          <thead>
            <tr className="text-center">
              <td>Id</td>
              <td>Name</td>
              {presents?.map(ele => (
                <td key={ele.date.month}>
                  <p className="capitalize">{ele.date.day}</p>
                  <p className="text-xs">{ele.date.month}</p>
                </td>
              ))}
              <td>
                <p>Total</p>
                <p className="text-xs">Outof {presents.length}</p>
              </td>
              <td>
                <p>Marks</p>
                <p className="text-xs">10%</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {students?.map((ele, i) => (
              <tr
                key={ele.name}
                style={{
                  backgroundColor:
                    presents.reduceRight(
                      (acc, data) => {
                        if (acc.stopped) return acc;
                        if (data.present[i] === "p") acc.stopped = true;
                        else if (data.present[i] === "a") acc.count++;
                        return acc;
                      },
                      { count: 0, stopped: false }
                    ).count > 2 && "#521010",
                }}
              >
                <td>{students[i].id}</td>
                <td width={150} className="text-left">
                  {students[i].name}
                </td>
                {presents?.map((data, j) => (
                  <td key={data.name}>
                    {presents[j]?.present[i] === "p" ? (
                      <FaRegCheckCircle className="text-green-600 mx-auto" />
                    ) : (
                      <RxCross2 className="text-red-600 mx-auto" />
                    )}
                  </td>
                ))}
                <td>
                  {presents
                    ?.reverse()
                    .filter((data) => data.present[i] === "p").length}
                </td>
                <td>
                  {Math.ceil(
                    (presents
                      ?.reverse()
                      .filter((data) => data.present[i] === "p")
                      .length /
                      presents.length) *
                      10
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          {
            students.length===0 && 
            <div className="flex flex-col py-10">
              <Skeleton className="h-[50vh] w-full rounded-xl bg-primary" />
            </div>
          }
      </div>
    </section>
  );
}