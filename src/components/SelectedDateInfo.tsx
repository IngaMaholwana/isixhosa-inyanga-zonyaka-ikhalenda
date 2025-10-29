import { getDayName, getMonthName, xhosaTerms } from "@/utils/xhosaTranslations";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface SelectedDateInfoProps {
  date: Date | null;
}

export const SelectedDateInfo = ({ date }: SelectedDateInfoProps) => {
  if (!date) return null;

  const dayName = getDayName(date.getDay());
  const monthName = getMonthName(date.getMonth());
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <Card className="mt-8 p-6 bg-gradient-earth border-border shadow-warm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {xhosaTerms.day} Okhethiweyo (Selected Day)
          </h3>
          <p className="text-2xl font-bold text-foreground">
            {dayName}
          </p>
          <p className="text-lg text-muted-foreground mt-1">
            {dayNumber} {monthName}, {year}
          </p>
        </div>
      </div>
    </Card>
  );
};
