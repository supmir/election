"use client";

import { DunDetails, PilihanRayaNegeriDetails } from "@/utils/data";
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
    const allParties = props.data.parties;
    const allPartyKeys = Object.keys(allParties);

    const coalitions: Record<string, string[]> = {
        GRS: [
            "PCS",
            "PPRS",
            "PBS",
            "ANAK NEGERI",
            "HARAPAN RAKYAT",
        ],
        PH: [
            "WARISAN",
            "PKR",
            "PN",
        ],
        BN: [
            "BN",
            "USNO",
            "GAGASAN",
            "UPKO",
            "LDP",
        ],
        "Lain-Lain": [
            "BEBAS",
            "PKS",
        ]


    };

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
        Total seats: {props.data.dunList.length}
        <div className="flex">
            {

                allPartyKeys.map((partyKey) => {
                    const wonSeats = props.data.dunList.reduce((prev, curr) => {
                        return prev + (curr.candidates[curr.winnnerCandidateSequence].partyCode == partyKey ? 1 : 0);
                    }, 0);
                    const percentage = wonSeats / props.data.dunList.length * 100;
                    return { partyKey, wonSeats, percentage };

                }).sort((a, b) => (b.wonSeats - a.wonSeats)).map(({ partyKey, wonSeats, percentage }) =>
                    <div
                        style={{
                            width: percentage + "%"
                        }}
                        className="overflow-hidden"
                    >
                        <div className="font-bold text-4xl">

                            {wonSeats}
                        </div>
                        {/* <span
                            className="text-xl overflow-ellipsis text-nowrap"
                        >
                            {allParties[partyKey].partiName.slice(0, allParties[partyKey].partiName.indexOf(" ("))}{" "}
                        </span> */}
                        <div
                            className="overflow-hidden text-2xl"
                        >
                            {partyKey}
                        </div>

                        <div className="h-8" style={{ backgroundColor: props.data.parties[partyKey].color }}>

                        </div>
                    </div>)
            }

        </div>
        <div className="flex flex-wrap">
            <div className="gap-4 max-w-sm px-2">
                <div className="my-auto">Filters</div>
                <input className="my-auto ring px-2" placeholder="Search..." onChange={(e) => {
                    const key = e.currentTarget.value;
                    setFilters({
                        ...filters,
                        parties: allPartyKeys.filter((party) => {
                            return party.toLowerCase().includes(key.toLowerCase()) || allParties[party].partiName.toLowerCase().includes(key.toLowerCase());
                        })
                    });

                }} />
                {Object.keys(coalitions).map((coalition, i) => {
                    return <details key={i}>
                        <summary className="font-black text-lg">
                            <button>{coalition}</button>
                        </summary>
                        <div className="flex flex-col">
                            {coalitions[coalition].map((k, j) => {
                                const partyCode = allPartyKeys.filter((partyCode) => {
                                    return partyCode === k;
                                })[0];
                                if (partyCode) {
                                    return <button key={j}

                                        className={`ml-8 text-left ${filters.parties.includes(partyCode) ? "font-bold" : ""}`}

                                        onClick={() => {
                                            let parties = [...filters.parties];
                                            const index = parties.indexOf(partyCode);
                                            console.log(index);

                                            if (parties.length === allPartyKeys.length) {
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
                                    </button>;
                                }
                            })}
                        </div>
                    </details>;
                })}
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

        </div>

    </div>;
}