import { useState } from "react";
import { Download, Mail, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentRequests = [
  { id: 1, email: "alice@studio.com", file: "portrait_v3.png", date: "Feb 14, 2026", status: "approved" },
  { id: 2, email: "bob@agency.co", file: "brand_logo.svg", date: "Feb 13, 2026", status: "pending" },
  { id: 3, email: "carol@press.org", file: "event_photo.jpg", date: "Feb 12, 2026", status: "denied" },
  { id: 4, email: "dave@client.io", file: "product_shot.png", date: "Feb 11, 2026", status: "approved" },
];

const blockedAttempts = [
  { id: 1, ip: "192.168.1.***", action: "Screenshot attempt", date: "Feb 14, 2026", file: "portrait_v3.png" },
  { id: 2, ip: "10.0.0.***", action: "Unauthorized download", date: "Feb 13, 2026", file: "brand_logo.svg" },
  { id: 3, ip: "172.16.0.***", action: "Bulk scraping detected", date: "Feb 10, 2026", file: "Multiple files" },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-success/15 text-success border-0 gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
    case "denied":
      return <Badge className="bg-destructive/15 text-destructive border-0 gap-1"><XCircle className="h-3 w-3" />Denied</Badge>;
    default:
      return <Badge variant="secondary" className="gap-1"><Mail className="h-3 w-3" />Pending</Badge>;
  }
};

const Dashboard = () => {
  const [digest, setDigest] = useState(true);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadProof = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your content protection activity.</p>
        </div>
        <Button onClick={handleDownloadProof} className="gap-2">
          <Download className="h-4 w-4" />
          {downloaded ? "Downloaded!" : "Download Proof Card"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Files Protected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">8</p>
              <p className="text-xs text-muted-foreground">Approved Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">3</p>
              <p className="text-xs text-muted-foreground">Blocked Attempts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRequests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.email}</TableCell>
                  <TableCell className="text-muted-foreground">{r.file}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>{statusBadge(r.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blocked Attempts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Blocked Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blockedAttempts.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-sm">{b.ip}</TableCell>
                  <TableCell className="text-muted-foreground">{b.action}</TableCell>
                  <TableCell className="text-muted-foreground">{b.file}</TableCell>
                  <TableCell className="text-muted-foreground">{b.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Digest Toggle */}
      <Card>
        <CardContent className="pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Monthly Digest Email</p>
            <p className="text-xs text-muted-foreground">Receive a summary of activity each month</p>
          </div>
          <Switch checked={digest} onCheckedChange={setDigest} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
