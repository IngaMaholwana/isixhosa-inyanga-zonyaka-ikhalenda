import { useState } from "react";
import { CalendarHeader } from "@/components/CalendarHeader";
import { CalendarGrid } from "@/components/CalendarGrid";
import { QuickNavigation } from "@/components/QuickNavigation";
import { SelectedDateInfo } from "@/components/SelectedDateInfo";
import { xhosaTerms } from "@/utils/xhosaTranslations";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setCurrentDate(yesterday);
    setSelectedDate(yesterday);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCurrentDate(tomorrow);
    setSelectedDate(tomorrow);
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-3">
            Ikhalenda YesiXhosa
          </h1>
          <p className="text-lg text-muted-foreground">
            isiXhosa Calendar Application
          </p>
        </header>

        <main className="bg-background rounded-3xl shadow-warm p-6 md:p-10 border border-border">
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
          />

          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />

          <QuickNavigation
            onToday={handleToday}
            onYesterday={handleYesterday}
            onTomorrow={handleTomorrow}
          />

          <SelectedDateInfo date={selectedDate} />
        </main>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Ulwimi lwesiXhosa • isiXhosa Language Calendar</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
