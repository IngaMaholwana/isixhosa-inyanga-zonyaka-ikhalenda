import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Event } from "@/types/event";
import { xhosaTerms } from "@/utils/xhosaTranslations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface EventFormProps {
  selectedDate: Date | null;
  onAddEvent: (event: Omit<Event, "id">) => void;
  syncToGoogle: boolean;
}

export const EventForm = ({ selectedDate, onAddEvent, syncToGoogle }: EventFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!selectedDate) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const eventData = {
      date: selectedDate.toISOString().split("T")[0],
      title: title.trim(),
      description: description.trim() || undefined,
      time: time || undefined,
    };

    onAddEvent(eventData);

    // Sync to Google Calendar if connected
    if (syncToGoogle) {
      try {
        setIsSyncing(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { error } = await supabase.functions.invoke('google-calendar-sync', {
            body: eventData,
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });

          if (error) throw error;

          toast({
            title: "Synced to Google Calendar!",
            description: "Event added and you'll receive notifications",
          });
        }
      } catch (error) {
        console.error('Error syncing to Google Calendar:', error);
        toast({
          title: "Sync failed",
          description: "Event saved locally, but couldn't sync to Google Calendar",
          variant: "destructive",
        });
      } finally {
        setIsSyncing(false);
      }
    }

    setTitle("");
    setDescription("");
    setTime("");
    setShowForm(false);
  };

  return (
    <Card className="mt-4 p-4 bg-gradient-earth border-border shadow-warm">
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yongeza Isicwangciso (Add Event)
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Yongeza Isicwangciso (Add Event)
            </h3>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Isihloko (Title) *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title..."
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Ixesha (Time)
            </label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Inkcazo (Description)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isSyncing}>
              {isSyncing ? "Saving..." : "Gcina (Save)"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setTitle("");
                setDescription("");
                setTime("");
              }}
            >
              Rhoxisa (Cancel)
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};
