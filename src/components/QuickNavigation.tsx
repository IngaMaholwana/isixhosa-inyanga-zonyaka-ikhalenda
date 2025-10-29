import { Button } from "@/components/ui/button";
import { xhosaTerms } from "@/utils/xhosaTranslations";
import { Calendar, Clock } from "lucide-react";

interface QuickNavigationProps {
  onToday: () => void;
  onYesterday: () => void;
  onTomorrow: () => void;
}

export const QuickNavigation = ({ onToday, onYesterday, onTomorrow }: QuickNavigationProps) => {
  return (
    <div className="mt-8 p-6 bg-card rounded-2xl shadow-soft border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Khawuleza Uhambe (Quick Navigation)
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={onYesterday}
          className="w-full justify-start hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {xhosaTerms.yesterday}
        </Button>
        
        <Button
          variant="default"
          onClick={onToday}
          className="w-full justify-start bg-gradient-warm hover:opacity-90 transition-all shadow-soft"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {xhosaTerms.today}
        </Button>
        
        <Button
          variant="outline"
          onClick={onTomorrow}
          className="w-full justify-start hover:bg-secondary hover:text-secondary-foreground transition-all"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {xhosaTerms.tomorrow}
        </Button>
      </div>
    </div>
  );
};
