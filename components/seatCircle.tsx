import { bestTextColor } from "@/utils/colors";
import { motion } from "motion/react";
interface SeatCircleProps {
    layoutId: string;
    color: string;
    partyCode: string;
    dunCode: string;
    onClick: () => void;
    isSelected: boolean;
}

export default function SeatCircle(props: SeatCircleProps) {
    const { layoutId, color, partyCode, dunCode, onClick } = props;

    return <motion.div
        layout
        layoutId={layoutId}
        transition={
            {
                type: "spring",
                damping: 20,
                stiffness: 300,
            }

        }
        // style={{ borderColor: isSelected ? "#fff" : "#000" }}
        className="h-24 w-24 text-sm sm:h-30 sm:w-30 sm:text-base p-1"
        // className="rounded-t-full border-b-0 border-4 h-30 w-30 p-1 border-dashed"
        onClick={onClick}
    >
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ backgroundColor: color || "#000", color: bestTextColor(color) }}
            className={`rounded-4xl h-full w-full flex`}
        >

            <div className="m-auto flex flex-col">
                {/* <div>{partyCode === "WARISAN" ? "WRSN" : partyCode}</div> */}
                <div className="text-2xl font-bold">{dunCode}</div>
            </div>
        </motion.button>
    </motion.div>;
}