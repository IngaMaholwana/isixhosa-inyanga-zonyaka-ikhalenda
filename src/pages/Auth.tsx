import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Nceda ugcwalise zonke iindawo (Please fill all fields)",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "I-password kufuneka ibe namagama angama-6 ubuncinci (Password must be at least 6 characters)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Impazamo (Error)",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Impumelelo! (Success!)",
        description: "I-akhawunti yenziwe. Ungangena ngoku. (Account created. You can now sign in.)",
      });
      navigate("/");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Nceda ugcwalise zonke iindawo (Please fill all fields)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Impazamo yokungena (Sign in error)",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Wamkelekile! (Welcome!)",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-background shadow-warm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-2">
            Ikhalenda YesiXhosa
          </h1>
          <p className="text-muted-foreground">
            Ngena okanye yenza i-akhawunti (Sign in or create account)
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin">Ngena (Sign In)</TabsTrigger>
            <TabsTrigger value="signup">Bhalisisa (Sign Up)</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  I-imeyile (Email)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  I-password (Password)
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iyalayisha... (Loading...)" : "Ngena (Sign In)"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  I-imeyile (Email)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  I-password (Password)
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ubuncinci amagama ama-6 (At least 6 characters)
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Iyalayisha... (Loading...)" : "Bhalisisa (Sign Up)"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;