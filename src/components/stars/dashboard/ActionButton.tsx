import { motion } from "framer-motion";

interface ActionButtonProps {
    // style?: React.CSSProperties;
    style: { opacity: number; y: number };
    cardRef?: (el: HTMLDivElement | null) => void;
}

export default function ActionButton({ style, cardRef }: ActionButtonProps) {
    return (
        <motion.div
            className="col-span-3 bg-white rounded-2xl shadow-md p-6 flex items-center justify-center text-md md:text-4xl sm:text-2xl font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer my-2"
            whileHover={{ y: -8 }}
            animate={style}
            style={style}
            ref={cardRef}
            onClick={() => window.fullpage_api?.moveSectionUp()}
        >
            돌아가기 ↑
        </motion.div>
    );
}
