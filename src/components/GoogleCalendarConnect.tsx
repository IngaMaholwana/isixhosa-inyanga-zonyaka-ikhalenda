import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface GoogleCalendarConnectProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

export const GoogleCalendarConnect = ({ isConnected, onConnectionChange }: GoogleCalendarConnectProps) => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Nceda ungene (Please sign in)",
          description: "Kufuneka ungene ukuze uqhagamshele neGoogle Calendar (You need to sign in to connect Google Calendar)",
          variant: "destructive",
        });
        setIsConnecting(false);
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('google-calendar-oauth', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.authUrl) {
        // Open OAuth flow in new window
        window.open(data.authUrl, '_blank', 'width=600,height=700');
        
        // Poll for connection status
        const checkInterval = setInterval(async () => {
          const { data: tokenData } = await supabase
            .from('google_calendar_tokens')
            .select('id')
            .eq('user_id', session.user.id)
            .single();

          if (tokenData) {
            clearInterval(checkInterval);
            onConnectionChange(true);
            toast({
              title: "Connected!",
              description: "Google Calendar connected successfully",
            });
            setIsConnecting(false);
          }
        }, 2000);

        // Stop checking after 2 minutes
        setTimeout(() => {
          clearInterval(checkInterval);
          setIsConnecting(false);
        }, 120000);
      }
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      toast({
        title: "Connection failed",
        description: "Failed to connect to Google Calendar. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  return (
    <Card className="p-4 bg-gradient-earth border-border shadow-soft mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Google Calendar Sync</h3>
            <p className="text-sm text-muted-foreground">
              {isConnected 
                ? "Events will sync to your Google Calendar with notifications" 
                : "Connect to sync events and receive notifications"}
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Connected</span>
          </div>
        ) : (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            variant="outline"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        )}
      </div>
    </Card>
  );
};