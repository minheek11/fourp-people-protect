import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Eye, ShieldCheck, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Protect = () => {
  const [aiWatermark, setAiWatermark] = useState(true);
  const [antiCopy, setAntiCopy] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [protected_, setProtected] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleApply = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setProtected(true);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Protect Your Content</h2>
        <p className="text-muted-foreground mt-1">Upload an original file and apply protection layers.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 p-10 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Drag & drop your file here, or click to browse</p>
            <Button variant="outline" size="sm" className="mt-4 gap-2">
              <Upload className="h-4 w-4" />
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Protection Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">AI-only watermark (invisible)</p>
              <p className="text-xs text-muted-foreground">Embedded metadata only detectable by AI</p>
            </div>
            <Switch checked={aiWatermark} onCheckedChange={setAiWatermark} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Anti-copy layer (experimental)</p>
              <p className="text-xs text-muted-foreground">Prevents screenshots and screen recordings</p>
            </div>
            <Switch checked={antiCopy} onCheckedChange={setAntiCopy} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">AI-only message</label>
            <Input
              className="mt-1.5"
              placeholder="e.g. This image belongs to @creator"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
            />
          </div>
          <Button className="w-full gap-2" onClick={handleApply} disabled={uploading}>
            {uploading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Applying…
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                Apply Protection
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {protected_ && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Eye className="h-4 w-4 text-primary" />
                  Protected Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-xl bg-muted overflow-hidden">
                  <div className="h-48 w-full bg-gradient-to-br from-muted to-secondary blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">
                      Original stored in vault
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Protection applied: {aiWatermark && "AI watermark"}{aiWatermark && antiCopy && " + "}{antiCopy && "Anti-copy layer"}
                  {aiMessage && ` • Message: "${aiMessage}"`}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Protect;
