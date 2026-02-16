import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldQuestion, Plus, Trash2, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: number;
  label: string;
  answer: string;
}

const Firewalls = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, label: "", answer: "" },
  ]);
  const [saved, setSaved] = useState(false);

  const addQuestion = () => {
    if (questions.length >= 3) return;
    setQuestions([...questions, { id: Date.now(), label: "", answer: "" }]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, field: "label" | "answer", value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Verification Firewalls</h2>
        <p className="text-muted-foreground mt-1">Add up to 3 questions only the original creator can answer.</p>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <motion.div key={q.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ShieldQuestion className="h-4 w-4 text-primary" />
                  Question {i + 1}
                </CardTitle>
                {questions.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeQuestion(q.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Question label (e.g. What camera was this taken on?)"
                  value={q.label}
                  onChange={(e) => updateQuestion(q.id, "label", e.target.value)}
                />
                <Input
                  placeholder="Expected answer"
                  value={q.answer}
                  onChange={(e) => updateQuestion(q.id, "answer", e.target.value)}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {questions.length < 3 && (
          <Button variant="outline" onClick={addQuestion} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Question
          </Button>
        )}
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Firewalls
        </Button>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-lg bg-success/10 px-4 py-3 text-sm text-success"
          >
            <CheckCircle className="h-4 w-4" />
            Firewalls saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Firewalls;
