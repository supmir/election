"use client";
import { ColorMap, PilihanRayaDetails } from "@/data";
import { useEffect, useState } from "react";

interface DisplayProps {
    data: PilihanRayaDetails[];
    colorMap: ColorMap;
}

interface Filters {
    colors: string[];
}

export default function Display(props: DisplayProps) {
    const [displayedData, setDisplayedData] = useState(props.data);
    const { colorMap } = props;
    const [filters, setFilters] = useState<Filters>({
        colors: Object.keys(colorMap)
    });


    function updateDisplayedData() {
        console.log("Update displayed data");
        console.log(filters);

        const newDisplayedData = props.data.filter((val) => {
            return filters.colors.includes(val.penamaanMenang.parti.NamaSingkatan);
        });
        setDisplayedData(newDisplayedData);
    }

    useEffect(() => {
        updateDisplayedData();
    }, [filters]);


    return <div className="flex flex-col gap-4">
        <div className="h-4 flex">
            <div className="w-1/2 bg-red-500"></div>
            <div className="w-1/2 bg-blue-500"></div>
        </div>

        <div className="grid grid-cols-6 gap-2 mx-auto">

            <div className="flex gap-4 col-span-6">
                <div className="my-auto">Filters</div>
                {Object.keys(colorMap).map((val, i) => <div key={i}
                    className={`ring-2 p-2 rounded-xl ${filters.colors.includes(val) && "bg-white text-black"}`}
                    onClick={() => {
                        const index = filters.colors.indexOf(val);
                        let colors = [...filters.colors];
                        console.log(index);

                        if (index === -1) {
                            console.log("Push " + val);
                            colors.push(val);
                        } else {
                            console.log("Remove  " + val);
                            colors = colors.splice(index, 1);
                        }

                        setFilters({
                            ...filters,
                            colors: colors
                        });
                    }}
                >
                    {val}
                </div>)}
            </div>
            {displayedData.map((val, i) => {

                return <div key={i} className={`rounded-full h-24 w-24 flex`}

                    style={{ backgroundColor: val.penamaanMenang.parti.WarnaParti || "#fff" }}>
                    <div className="m-auto">{val.penamaanMenang.parti.NamaSingkatan}</div>
                </div>;
            })} </div>
    </div>;
}