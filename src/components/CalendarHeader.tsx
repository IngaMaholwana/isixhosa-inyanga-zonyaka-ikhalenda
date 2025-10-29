import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMonthName, getSeasonForMonth, xhosaTerms } from "@/utils/xhosaTranslations";

interface CalendarHeaderProps {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarHeader = ({ currentDate, onPreviousMonth, onNextMonth }: CalendarHeaderProps) => {
  const monthName = getMonthName(currentDate.getMonth());
  const year = currentDate.getFullYear();
  const season = getSeasonForMonth(currentDate.getMonth());

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousMonth}
          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            {monthName}
          </h2>
          <p className="text-lg text-muted-foreground mt-1">
            {xhosaTerms.year}: {year}
          </p>
          {season && (
            <p className="text-sm text-accent font-medium mt-2">
              {season.xhosa} ({season.english})
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
