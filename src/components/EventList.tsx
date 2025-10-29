import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Trash2 } from "lucide-react";

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: string) => void;
}

export const EventList = ({ events, onDeleteEvent }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        Akukho zicwangciso kulo suku (No events for this day)
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id} className="p-4 bg-card border-border shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{event.title}</h4>
              
              {event.time && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
              )}
              
              {event.description && (
                <div className="flex items-start gap-1 text-sm text-muted-foreground mt-2">
                  <FileText className="h-3 w-3 mt-0.5" />
                  <p className="flex-1">{event.description}</p>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteEvent(event.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
