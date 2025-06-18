"use client";

import { DunDetails, PilihanRayaNegeriDetails } from "@/data";
import { Fragment, useEffect, useState } from "react";
import SeatCircle from "./seatCircle";
import DetailCard from "./detailCard";

interface DisplayProps {
    data: PilihanRayaNegeriDetails;
}

interface Filters {
    parties: string[];
}
interface ViewDetail {
    i: number,
    displaySeq: number,
    dunName: string;
}

const CHUNK_SIZE = 4;

export default function Display(props: DisplayProps) {
    const [displayedDunDetails, setDisplayedData] = useState<DunDetails[]>(props.data.dunList);
    const [viewDetail, setViewDetail] = useState<ViewDetail>({
        i: -1,
        displaySeq: -1,
        dunName: ""
    });

    const allParties = Object.keys(props.data.parties);

    const [filters, setFilters] = useState<Filters>({
        parties: []
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
        setViewDetail({ i: -1, displaySeq: -1, dunName: "" });
    }

    useEffect(() => {
        updateDisplayedData();
    }, [filters]);


    return <div className="flex flex-col gap-4">
        <div className="h-4 flex">
            <div className="w-1/2 bg-red-500"></div>
            <div className="w-1/2 bg-blue-500"></div>
        </div>

        <div className="flex gap-4 col-span-6 mx-auto w-full overflow-x-auto">
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
        <div className="flex flex-col gap-2 mx-auto">
            {[...Array(Math.ceil(displayedDunDetails.length / CHUNK_SIZE))].map((_, row) => {
                const start = row * CHUNK_SIZE;
                const end = start + CHUNK_SIZE;

                const showDetails = viewDetail.displaySeq >= start && viewDetail.displaySeq < end;
                return <Fragment key={row}>
                    <div className="grid grid-cols-4">
                        {displayedDunDetails.slice(start, end).map((val, col) => {
                            const winnerCandidate = val.candidates[val.winnnerCandidateSequence];
                            const winnerPartyCode = winnerCandidate.partyCode;
                            const winnerPartyDetails = props.data.parties[winnerPartyCode];

                            const displaySeq = start + col;
                            const isSelected = viewDetail.displaySeq === start + col;

                            return <div
                                key={val.dunName}
                                className="flex flex-col"
                            >
                                <SeatCircle
                                    color={winnerPartyDetails.color}
                                    dunCode={val.dunCode}
                                    layoutId={val.dunName}
                                    partyCode={winnerPartyCode}
                                    onClick={() => {
                                        if (val.dunName === viewDetail.dunName)
                                            setViewDetail({ i: -1, displaySeq: -1, dunName: "" });
                                        else
                                            setViewDetail(
                                                {
                                                    i: row,
                                                    displaySeq: displaySeq,
                                                    dunName: val.dunName,
                                                }
                                            );
                                    }}
                                    isSelected={isSelected}
                                />
                                {/* {showDetails && !isSelected && <div className="w-full border-2"></div>} */}
                            </div>;
                        })}
                    </div>

                    {showDetails && <DetailCard
                        dunDetails={displayedDunDetails[viewDetail.displaySeq]}

                    />}
                </Fragment>;
            })}
        </div>

    </div>;
}