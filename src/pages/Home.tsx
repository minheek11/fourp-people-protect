import { motion } from "framer-motion";
import { Upload, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">
          Protect Your Originals
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Upload, watermark, and control who accesses your creative work — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="gap-2 text-base px-8"
            onClick={() => navigate("/protect")}
          >
            <Upload className="h-5 w-5" />
            Upload Original
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 text-base px-8"
            onClick={() => navigate("/verify")}
          >
            <CheckCircle className="h-5 w-5" />
            Verify a Copy
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
