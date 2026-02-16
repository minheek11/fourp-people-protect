import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImageIcon, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Verify = () => {
  const [uploaded, setUploaded] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<null | { match: boolean; confidence: number }>(null);

  const handleUpload = () => {
    setUploaded(true);
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setVerifying(false);
      setResult({ match: Math.random() > 0.4, confidence: Math.floor(60 + Math.random() * 38) });
    }, 1500);
  };

  const handleReset = () => {
    setUploaded(false);
    setVerifying(false);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Verify a Copy</h2>
        <p className="text-muted-foreground mt-1">Upload a suspected image to check against originals in the vault.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 p-10 text-center cursor-pointer"
            onClick={handleUpload}
          >
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              {uploaded ? "Image uploaded — click to re-upload" : "Click to upload a suspected copy"}
            </p>
            <Button variant="outline" size="sm" className="mt-4 gap-2">
              <Upload className="h-4 w-4" />
              {uploaded ? "Re-upload" : "Choose File"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {verifying && (
          <motion.div key="verifying" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Scanning vault for matches…</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {result && (
          <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className={result.match ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  {result.match ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Match Found
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-destructive" />
                      No Match
                    </>
                  )}
                  <Badge variant={result.match ? "default" : "destructive"} className="ml-auto text-xs">
                    {result.confidence}% confidence
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Confidence</p>
                  <Progress value={result.confidence} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {result.match
                    ? "This image matches an original in the vault. The owner has been notified."
                    : "No matching original was found. This image may not be registered."}
                </p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Verify Another
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verify;
