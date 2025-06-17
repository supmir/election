"use client";

import { DunDetails, PilihanRayaNegeriDetails } from "@/data";
import { Fragment, useEffect, useState } from "react";
import SeatCircle from "./seatCircle";

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
        <div className="flex flex-col gap-2 mx-auto">
            {[...Array(Math.ceil(displayedDunDetails.length / 6))].map((_, i) => {
                return <Fragment key={i}>

                    <div className="grid grid-cols-6 gap-2">
                        {displayedDunDetails.slice(i * 6, (i + 1) * 6).map((val, j) => {
                            const winnerCandidate = val.candidates[val.winnnerCandidateSequence];
                            const winnerPartyCode = winnerCandidate.partyCode;
                            const winnerPartyDetails = props.data.parties[winnerPartyCode];

                            return <SeatCircle
                                key={val.dunName}
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
                                                i: i,
                                                displaySeq: i * 6 + j,
                                                dunName: val.dunName,
                                            }
                                        );
                                }}

                            />;
                        })}
                    </div>
                    {viewDetail.displaySeq >= i * 6 && viewDetail.displaySeq < (i + 1) * 6 && <div>
                        <div className="flex flex-col gap-4 py-4">
                            <div className="gap-2 flex">
                                <span className="text-xl font-bold">{displayedDunDetails[viewDetail.displaySeq].dunCode}</span>
                                <span className="text-lg">
                                    {displayedDunDetails[viewDetail.displaySeq].dunShortName}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {Object.keys(displayedDunDetails[viewDetail.displaySeq].candidates).map((key, i) => {
                                    const candidateDetails = displayedDunDetails[viewDetail.displaySeq].candidates[key];
                                    return <div key={i} className="flex justify-between">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-sm">{candidateDetails.candidateName}</div>
                                            <div className="font-bold">{candidateDetails.partyCode}</div>
                                        </div>
                                        <div>{candidateDetails.votes}</div>
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>}
                </Fragment>;
            })}

        </div>

    </div>;
}