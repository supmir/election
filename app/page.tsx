import { data } from "@/data";

const color_map: { [key: string]: string; } = {
  "PBS": "#f00",
  "WARISAN": "#0f0",
  "BN": "#00f",
  "BEBAS": "#ff0",
  "PN": "#0ff",
  "PKR": "#fff",
  "UPKO": "#fff",
};

export default async function Home() {
  return <div className="flex flex-col">


    <div className="h-4 flex">
      <div className="w-1/2 bg-red-500"></div>
      <div className="w-1/2 bg-blue-500"></div>
    </div>
    <div className="grid grid-cols-6 gap-2 mx-auto">
      {data.map((val, i) => {

        return <div key={i} className={`rounded-full h-24 w-24 flex`}

          style={{ backgroundColor: color_map[val.penamaanMenang.parti.NamaSingkatan] }}>
          <div className="m-auto">{val.penamaanMenang.parti.NamaSingkatan}</div>
        </div>;
      })} </div>
  </div>;
}


