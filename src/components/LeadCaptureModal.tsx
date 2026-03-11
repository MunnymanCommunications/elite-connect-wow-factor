import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Send, ArrowRight } from 'lucide-react';

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
    firstName: '', lastName: '', email: '', phone: '',
    company: '', industry: '', message: '', plan: selectedPlan,
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
      const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString(), source: 'Elite Cards Landing Page' }),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => window.open('https://calendly.com/elitecardpro', '_blank'), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg liquid-glass rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full gradient-gold-bg flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground mb-4">Redirecting to schedule your consultation with Nic...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Get Your Elite Card</h3>
                  <p className="text-sm text-muted-foreground">Schedule a consultation with Nic</p>
                  {selectedPlan && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1 text-sm font-medium">
                      {selectedPlan}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">First Name</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="mt-1 rounded-xl border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last Name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="mt-1 rounded-xl border-border/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1 rounded-xl border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="mt-1 rounded-xl border-border/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Company</Label>
                      <Input id="company" name="company" value={formData.company} onChange={handleInputChange} className="mt-1 rounded-xl border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="industry" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Industry</Label>
                      <Input id="industry" name="industry" value={formData.industry} onChange={handleInputChange} className="mt-1 rounded-xl border-border/50" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Message (Optional)</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} className="mt-1 rounded-xl border-border/50" rows={2} />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl py-5 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 group">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Schedule Consultation
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
