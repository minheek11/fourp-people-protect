import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ImageIcon, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Approval = () => {
  const [email, setEmail] = useState("viewer@example.com");
  const [status, setStatus] = useState<"pending" | "approved" | "denied">("pending");

  const handleApprove = () => setStatus("approved");
  const handleDeny = () => setStatus("denied");
  const handleReset = () => {
    setStatus("pending");
    setEmail("viewer@example.com");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Approval Queue</h2>
        <p className="text-muted-foreground mt-1">Review and respond to download requests.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Requester Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Requested: landscape_final_v2.png • 2.4 MB
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {status === "pending" && (
              <motion.div
                key="actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <Button onClick={handleApprove} className="flex-1 gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
                <Button onClick={handleDeny} variant="outline" className="flex-1 gap-2 border-destructive/30 text-destructive hover:bg-destructive/10">
                  <XCircle className="h-4 w-4" />
                  Deny
                </Button>
              </motion.div>
            )}

            {status === "approved" && (
              <motion.div
                key="approved"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
                  <CheckCircle className="h-4 w-4" />
                  Approved — one-time link generated
                </div>
                <p className="text-xs text-muted-foreground">
                  A secure download link has been sent to {email}. It expires in 24 hours.
                </p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Review Another
                </Button>
              </motion.div>
            )}

            {status === "denied" && (
              <motion.div
                key="denied"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <XCircle className="h-4 w-4" />
                  Denied — access blocked
                </div>
                <p className="text-xs text-muted-foreground">
                  {email} has been notified that access was denied.
                </p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Review Another
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Approval;
