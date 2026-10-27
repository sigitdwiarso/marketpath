"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SectionShell, Takeaway } from "./shared";
import { QUIZZES, type QuizQuestion } from "@/lib/education-data";
import { MODULE_META, MODULE_ORDER, useProgress, type ModuleId } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Award, CheckCircle2, XCircle, Lightbulb, RotateCcw, ArrowRight } from "lucide-react";

function QuizRunner({ moduleId, questions }: { moduleId: ModuleId; questions: QuizQuestion[] }) {
  const { recordQuiz, quizScores } = useProgress();
  const [step, setStep] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [showHint, setShowHint] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [justWrong, setJustWrong] = React.useState(false);

  const q = questions[step];
  const meta = MODULE_META[moduleId];
  const saved = quizScores[moduleId];
  const isLast = step === questions.length - 1;

  const answer = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setCorrectCount((c) => c + 1);
      setJustWrong(false);
    } else {
      setJustWrong(true);
    }
  };

  const next = () => {
    if (isLast) {
      recordQuiz(moduleId, correctCount, questions.length);
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setPicked(null);
      setShowHint(false);
      setJustWrong(false);
    }
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setShowHint(false);
    setCorrectCount(0);
    setDone(false);
    setJustWrong(false);
  };

  if (done) {
    const perfect = correctCount === questions.length;
    return (
      <div className="bg-card rounded-xl border border-border p-6 text-center">
        <div className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-full", perfect ? "bg-bull/15 text-bull" : "bg-volt/15 text-volt")}>
          <Award className="h-6 w-6" aria-hidden />
        </div>
        <p className="font-heading mt-3 text-lg font-semibold">
          {correctCount} / {questions.length} on {meta.title}
        </p>
        <p className="text-muted-foreground mx-auto mt-1.5 max-w-md text-sm leading-relaxed">
          {perfect
            ? "Perfect score! Your understanding here is solid — move on to the next lesson."
            : "Good effort. Revisit the lesson above whenever you like, then try again — repetition is how this stuff sticks."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <Button variant="outline" onClick={restart}>
            <RotateCcw className="mr-1.5 h-4 w-4" /> Try again
          </Button>
          {moduleId !== "practice" && (
            <Button asChild className="bg-volt text-white hover:bg-volt/85">
              <a href={MODULE_META[MODULE_ORDER[MODULE_ORDER.indexOf(moduleId) + 1]]?.href ?? "#practice"}>
                Next lesson <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-muted-foreground">
          {meta.title} · Question {step + 1} of {questions.length}
        </p>
        {saved && <Badge variant="outline" className="text-xs">Best: {saved.correct}/{saved.total}</Badge>}
      </div>
      <Progress value={(step / questions.length) * 100} className="mt-2 h-1.5" />

      <p className="font-heading mt-4 text-base font-semibold sm:text-lg">{q.question}</p>

      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answer;
          const isPicked = picked === i;
          const revealed = picked !== null;
          return (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={revealed}
              className={cn(
                "rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                !revealed && "hover:border-volt hover:bg-volt/5 border-border",
                revealed && isAnswer && "border-bull bg-bull/10 text-foreground",
                revealed && isPicked && !isAnswer && "border-bear bg-bear/10",
                revealed && !isPicked && !isAnswer && "border-border opacity-55"
              )}
            >
              <span className="tnum mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>
              {opt}
              {revealed && isAnswer && <CheckCircle2 className="text-bull ml-2 inline h-4 w-4" aria-hidden />}
              {revealed && isPicked && !isAnswer && <XCircle className="text-bear ml-2 inline h-4 w-4" aria-hidden />}
            </button>
          );
        })}
      </div>

      {picked === null && !showHint && (
        <Button variant="ghost" size="sm" className="mt-3 text-gold" onClick={() => setShowHint(true)}>
          <Lightbulb className="mr-1.5 h-4 w-4" /> Need a hint?
        </Button>
      )}
      {picked === null && showHint && (
        <p className="mt-3 rounded-md bg-gold/10 p-3 text-xs leading-relaxed text-gold">{q.hint}</p>
      )}

      {picked !== null && (
        <div className={cn("mt-4 rounded-lg p-3.5 text-xs leading-relaxed", justWrong ? "bg-bear/10" : "bg-bull/10")}>
          <p className={cn("font-semibold", justWrong ? "text-bear" : "text-bull")}>
            {justWrong ? "Not quite — here's why the right answer works:" : "Correct!"}
          </p>
          <p className="text-muted-foreground mt-1">{q.explanation}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <p className="tnum text-xs text-muted-foreground">
          Score so far: {correctCount} correct
        </p>
        <Button onClick={next} disabled={picked === null} className="bg-volt text-white hover:bg-volt/85">
          {isLast ? "Finish quiz" : "Next question"} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function Practice() {
  const { badges, completed, resetAll, quizScores } = useProgress();
  const quizModules = MODULE_ORDER.filter((m) => QUIZZES[m]?.length);

  return (
    <SectionShell
      id="practice"
      moduleId="practice"
      number={7}
      title="Practice & Knowledge Checks"
      intro={
        <>
          Every lesson has a short quiz waiting here — with optional hints and honest explanations for
          every answer. Your progress and badges are stored privately in your own browser, so you can
          leave and come back anytime.
        </>
      }
    >
      {/* Badges + overview */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <div className="bg-card h-fit rounded-xl border border-border p-5">
          <h3 className="font-heading flex items-center gap-2 text-lg font-semibold">
            <Award className="text-gold h-5 w-5" aria-hidden /> Your achievements
          </h3>
          <div className="mt-2 text-xs text-muted-foreground">
            {completed.length} / {MODULE_ORDER.length} lessons completed ·{" "}
            {Object.keys(quizScores).length} quizzes attempted
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No badges yet — complete any lesson to earn your first one.
              </p>
            ) : (
              badges.map((b) => (
                <Badge key={b} className="bg-gold/15 text-gold hover:bg-gold/15">
                  {b}
                </Badge>
              ))
            )}
          </div>
          <Button variant="ghost" size="sm" className="mt-4 text-muted-foreground" onClick={resetAll}>
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> Reset all progress
          </Button>
        </div>
        <div className="space-y-5">
          {quizModules.map((m) => (
            <QuizRunner key={m} moduleId={m} questions={QUIZZES[m]} />
          ))}
        </div>
      </div>

      <Takeaway>
        You&apos;ve covered markets, stocks, crypto, charts, simulation and risk. Financial literacy is
        a marathon: reread lessons, replay scenarios, and keep asking &ldquo;what could go wrong?&rdquo;
        — that question is worth more than any hot tip.
      </Takeaway>
    </SectionShell>
  );
}
