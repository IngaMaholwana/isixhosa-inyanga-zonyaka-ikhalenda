import { useState, useEffect } from "react";
import { CalendarHeader } from "@/components/CalendarHeader";
import { CalendarGrid } from "@/components/CalendarGrid";
import { QuickNavigation } from "@/components/QuickNavigation";
import { SelectedDateInfo } from "@/components/SelectedDateInfo";
import { EventForm } from "@/components/EventForm";
import { GoogleCalendarConnect } from "@/components/GoogleCalendarConnect";
import { Event } from "@/types/event";
import { xhosaTerms } from "@/utils/xhosaTranslations";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("xhosa-calendar-events");
    if (stored) {
      try {
        setEvents(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load events", e);
      }
    }

    // Check if Google Calendar is connected
    checkGoogleConnection();
  }, []);

  useEffect(() => {
    localStorage.setItem("xhosa-calendar-events", JSON.stringify(events));
  }, [events]);

  const checkGoogleConnection = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data } = await supabase
        .from('google_calendar_tokens')
        .select('id')
        .eq('user_id', session.user.id)
        .single();
      
      setIsGoogleConnected(!!data);
    }
  };

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

  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: `${Date.now()}-${Math.random()}`,
    };
    setEvents([...events, newEvent]);
    toast({
      title: "Isicwangciso songezelelwe (Event added)",
      description: eventData.title,
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    toast({
      title: "Isicwangciso sicinyiwe (Event deleted)",
      variant: "destructive",
    });
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
            events={events}
          />

          <QuickNavigation
            onToday={handleToday}
            onYesterday={handleYesterday}
            onTomorrow={handleTomorrow}
          />

          <GoogleCalendarConnect 
            isConnected={isGoogleConnected}
            onConnectionChange={setIsGoogleConnected}
          />

          <EventForm 
            selectedDate={selectedDate} 
            onAddEvent={handleAddEvent}
            syncToGoogle={isGoogleConnected}
          />

          <SelectedDateInfo 
            date={selectedDate} 
            events={events}
            onDeleteEvent={handleDeleteEvent}
          />
        </main>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>Ulwimi lwesiXhosa • isiXhosa Language Calendar</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
