import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/nammabus-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <img src={logo} alt="Namma Bus" className="h-36 w-auto drop-shadow-lg" />

        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Namma Bus
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track Tamil Nadu local buses in real-time
          </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => navigate("/route")}
        className="mt-12 flex h-14 w-full max-w-xs items-center justify-center gap-3 rounded-2xl bg-primary font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.97]"
      >
        Explore
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </div>
  );
};

export default Welcome;
