import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Send, Star, Zap, Users } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
  plan: string;
}

export const LeadCaptureModal = ({ isOpen, onClose, selectedPlan = '' }: LeadCaptureModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: '',
    plan: selectedPlan
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // This will be replaced with actual webhook URL
      const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Elite Cards Landing Page'
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Redirect to Calendly after 2 seconds
        setTimeout(() => {
          window.open('https://calendly.com/elitecardpro', '_blank');
        }, 2000);
      } else {
        console.error('Failed to submit form');
        // Fallback: still redirect to Calendly
        window.open('https://calendly.com/elitecardpro', '_blank');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Fallback: redirect to Calendly
      window.open('https://calendly.com/elitecardpro', '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-effect animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground mb-6">
              Your information has been received. You're being redirected to schedule your consultation with Nic.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-accent">
              <Zap className="w-4 h-4" />
              <span>Redirecting to Calendly...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 custom-scrollbar overflow-y-auto">
      <Card className="w-full max-w-2xl glass-effect my-8 animate-scale-in">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Users className="w-4 h-4 mr-2" />
              Join 10,000+ Professionals
            </Badge>
            <CardTitle className="text-3xl font-bold">
              <span className="gradient-text">Get Your Elite Card</span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Schedule your consultation with Nic and start networking like never before
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {selectedPlan && (
            <div className="mb-6 p-4 glass-effect rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="font-semibold">Selected Plan: {selectedPlan}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-foreground">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Business Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company" className="text-foreground">Company/Organization</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <Label htmlFor="industry" className="text-foreground">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., Real Estate, Insurance"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-foreground">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Tell us about your networking goals..."
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl hover-glow group"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <>
                  Schedule Consultation with Nic
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to be contacted by our team. 
              Your information is secure and will never be shared.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};