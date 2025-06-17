import { motion } from "motion/react";
interface SeatCircleProps {
    layoutId: string;
    color: string;
    partyCode: string;
    dunCode: string;
}

export default function SeatCircle(props: SeatCircleProps) {
    const { layoutId, color, partyCode, dunCode } = props;

    return <motion.button
        className={`rounded-full h-24 w-24 flex text-neutral-100`}


        layout
        layoutId={layoutId}
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
        style={{ borderColor: color || "#fff", borderWidth: "8px" }}
    >
        <div className="m-auto flex flex-col">
            <div>{partyCode === "WARISAN" ? "WRSN" : partyCode}</div>
            <div>{dunCode}</div>
        </div>
    </motion.button>;
}