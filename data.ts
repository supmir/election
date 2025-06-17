import { cleanedData } from "./secretData";

export type ColorMap = { [namaSingkatan: string]: string; };

export interface PilihanRayaNegeriDetails {
    pilihanRayaName: string;
    pilihanRayaDate: string;
    dunList: DunDetails[];
    parties: PartyDetailsMap;
}

export interface DunDetails {
    dunName: string;
    dunShortName: string;
    parliamentCode: string;
    dunCode: string;
    winnnerCandidateSequence: number;
    candidates: CandidateMap;
}

export interface CandidateMap {
    [candidateSequence: number]: Candidate;
}

export interface Candidate {
    candidateName: string;
    votes: number;
    partyCode: string;
}

export interface PartyDetails {
    partiName: string;
    color: string;
}
export type PartyDetailsMap = {
    [partyCode: string]: PartyDetails;
};


export const data: PilihanRayaNegeriDetails = cleanedData;