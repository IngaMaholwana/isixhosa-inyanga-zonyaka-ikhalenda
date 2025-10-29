import { getDayName } from "@/utils/xhosaTranslations";
import { cn } from "@/lib/utils";
import { Event } from "@/types/event";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  events: Event[];
}

export const CalendarGrid = ({ currentDate, selectedDate, onDateSelect, events }: CalendarGridProps) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  const today = new Date();
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const hasEvents = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.some(event => event.date === dateStr);
  };

  const days = [];
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isTodayDate = isToday(date);
    const isSelectedDate = isSelected(date);
    const dateHasEvents = hasEvents(date);
    
    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(date)}
        className={cn(
          "aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all hover:scale-105 relative",
          "hover:bg-primary hover:text-primary-foreground hover:shadow-soft",
          isTodayDate && "bg-gradient-warm text-primary-foreground shadow-warm font-bold",
          isSelectedDate && !isTodayDate && "bg-secondary text-secondary-foreground ring-2 ring-primary",
          !isTodayDate && !isSelectedDate && "bg-card hover:bg-muted"
        )}
      >
        {day}
        {dateHasEvents && (
          <div className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
        )}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
          <div
            key={dayIndex}
            className="text-center text-sm font-bold text-primary py-2"
          >
            {getDayName(dayIndex)}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
};
