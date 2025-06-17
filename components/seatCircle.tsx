import { motion } from "motion/react";
interface SeatCircleProps {
    layoutId: string;
    color: string;
    partyCode: string;
    dunCode: string;
    onClick: () => void;
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
        className="h-24 w-24"
        onClick={onClick}
    >
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ borderColor: color || "#fff", borderWidth: "8px" }}
            className={`rounded-full h-24 w-24 flex text-neutral-100`}
        >

            <div className="m-auto flex flex-col">
                <div>{partyCode === "WARISAN" ? "WRSN" : partyCode}</div>
                <div>{dunCode}</div>
            </div>
        </motion.button>
    </motion.div>;
}