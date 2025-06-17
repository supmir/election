"use client";
import { motion } from "motion/react";

import { DunDetails, PilihanRayaNegeriDetails } from "@/data";
import { useEffect, useState } from "react";

interface DisplayProps {
    data: PilihanRayaNegeriDetails;
}

interface Filters {
    parties: string[];
}

export default function Display(props: DisplayProps) {
    const [displayedDunDetails, setDisplayedData] = useState<DunDetails[]>(props.data.dunList);
    const allParties = Object.keys(props.data.parties);

    const [filters, setFilters] = useState<Filters>({
        parties: allParties
    });


    function updateDisplayedData() {
        console.log("Update displayed data");
        console.log(filters);

        let newDisplayedData: DunDetails[] = [];
        if (filters.parties.length > 0)
            filters.parties.forEach(party => {
                newDisplayedData = [...newDisplayedData, ...props.data.dunList.filter((val) => {
                    return val.candidates[val.winnnerCandidateSequence].partyCode === party;
                })];
            });
        else
            newDisplayedData = [...props.data.dunList];

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

        <div className="flex gap-4 col-span-6 mx-auto">
            <div className="my-auto">Filters</div>
            {allParties.map((partyCode, i) => <button key={i}
                className={`ring-2 p-2 rounded-xl ${filters.parties.includes(partyCode) && "bg-white text-black"}`}
                onClick={() => {
                    let parties = [...filters.parties];
                    const index = parties.indexOf(partyCode);
                    console.log(index);

                    if (parties.length === allParties.length) {
                        parties = parties.splice(index, 1);
                    } else {
                        if (index === -1) {
                            parties = [partyCode, ...parties];
                        } else {
                            parties.splice(index, 1);
                        }
                    }
                    setFilters({
                        ...filters,
                        parties: parties
                    });
                }}
            >
                {partyCode}
            </button>)}
        </div>
        <div className="grid grid-cols-6 gap-2 mx-auto">

            {displayedDunDetails.map((val) => {
                const winnerCandidate = val.candidates[val.winnnerCandidateSequence];
                const winnerPartyCode = winnerCandidate.partyCode;
                const winnerPartyDetails = props.data.parties[winnerPartyCode];

                return <motion.button
                    key={val.dunCode}
                    className={`rounded-full h-24 w-24 flex text-neutral-100`}


                    layout
                    layoutId={val.dunName}
                    initial={
                        { scale: 0 }
                    }
                    animate={{ scale: 1 }}
                    transition={
                        {
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                        }

                    }
                    style={{ borderColor: winnerPartyDetails.color || "#fff", borderWidth: "8px" }}
                >
                    <div className="m-auto flex flex-col">
                        <div>{winnerPartyCode === "WARISAN" ? "WRSN" : winnerPartyCode}</div>
                        <div>{val.dunCode}</div>
                    </div>
                </motion.button>;
            })}
        </div>
    </div>;
}