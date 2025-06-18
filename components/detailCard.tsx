import { DunDetails } from "@/data";
import { motion } from "motion/react";


interface DunDetailCardProps {
    dunDetails: DunDetails;

}

export default function DunDetailCard(props: DunDetailCardProps) {
    const { dunDetails } = props;
    const { candidates } = dunDetails;

    const sortedCandidates = Object.values(candidates)
        .sort((a, b) => b.votes - a.votes);






    return <motion.div
        layout
        layoutId={"DetailCard"}
        transition={
            {
                type: "spring",
                damping: 20,
                stiffness: 300,
            }

        }

    >
        <div className="flex flex-col gap-4 py-4">
            <div className="gap-2 flex">
                <span className="text-xl font-bold">{dunDetails.dunCode}</span>
                <span className="text-lg">
                    {dunDetails.dunShortName}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                {sortedCandidates.map((candidateDetails, i) => {
                    return <div key={i} className="flex justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="text-sm">{candidateDetails.candidateSequence}. {candidateDetails.candidateName}</div>
                            <div className="font-bold">{candidateDetails.partyCode}</div>
                        </div>
                        <div>{candidateDetails.votes}</div>
                    </div>;
                })}
            </div>
        </div>
    </motion.div>;
}