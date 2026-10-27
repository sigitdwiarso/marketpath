"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Moon, Sun, Menu, TrendingUp } from "lucide-react";
import { MODULE_META, MODULE_ORDER, useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const NAV_LINKS = MODULE_ORDER.slice(0, 6).map((id) => ({ id, ...MODULE_META[id] }));

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle light and dark theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </Button>
  );
}

export function Nav() {
  const { completed } = useProgress();
  const pct = Math.round((completed.length / MODULE_ORDER.length) * 100);
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold" aria-label="MarketPath home">
          <span className="bg-volt flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <TrendingUp className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="font-heading text-lg tracking-tight">
            Market<span className="text-volt">Path</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-0.5 lg:flex" aria-label="Lessons">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors"
            >
              {l.title}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="hidden w-36 items-center gap-2 sm:flex" title="Learning progress">
            <Progress value={pct} className="h-1.5" aria-label={`Learning progress ${pct}%`} />
            <span className="tnum text-xs text-muted-foreground">{pct}%</span>
          </div>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open lessons menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-heading">Lessons</SheetTitle>
              <nav className="mt-2 flex flex-col gap-1" aria-label="Lessons">
                {NAV_LINKS.map((l, i) => (
                  <a
                    key={l.id}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="hover:bg-muted flex items-center justify-between rounded-lg px-3 py-2.5 text-sm"
                  >
                    <span>
                      <span className="tnum mr-2 text-xs text-muted-foreground">{i + 1}</span>
                      {l.title}
                    </span>
                    {completed.includes(l.id) && <span className="text-bull h-2 w-2 rounded-full bg-bull" />}
                  </a>
                ))}
                <a
                  href="#glossary"
                  onClick={() => setOpen(false)}
                  className="hover:bg-muted rounded-lg px-3 py-2.5 text-sm"
                >
                  Glossary & FAQ
                </a>
              </nav>
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs text-muted-foreground">Learning progress</p>
                <Progress value={pct} className="h-2" />
                <p className="tnum mt-1.5 text-xs text-muted-foreground">
                  {completed.length} of {MODULE_ORDER.length} lessons completed
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
