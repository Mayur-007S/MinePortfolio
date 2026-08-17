import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Mail, MapPin, Clock, Send, Github, Linkedin, Twitter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5 text-[#f0883e]" />,
    label: 'Email',
    value: 'mayurmyana111@gmai.com',
    href: 'mailto:mayurmyana111@gmai.com',
  },
  {
    icon: <MapPin className="w-5 h-5 text-[#f0883e]" />,
    label: 'Location',
    value: 'Ahilyanagar, Maharashtra, India, 414001',
    href: null,
  },
  {
    icon: <Clock className="w-5 h-5 text-[#f0883e]" />,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

const socials = [
  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com' },
  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: 'https://twitter.com' },
];

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      // Sending email via EmailJS (Google Email Service)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_GMAIL_SERVICE_ID',
          template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
          user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
          template_params: {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'mayurmyana111@gmai.com' // Explicitly where you want it
          }
        }),
      });

      if (response.ok) {
        toast.success(`Thanks ${data.name}! I'll get back to you soon.`);
        reset();
      } else {
        const errText = await response.text();
        toast.error(errText || 'Something went wrong processing your email request!');
      }
    } catch (error) {
      toast.error('Failed to send message via Google. Please try again later.');
    }
  };

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Header />

      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 border-b border-[#30363d]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 max-w-2xl"
            >
              <span className="text-[#f0883e] text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
              <h1 className="font-heading text-5xl font-bold text-[#e6edf3]">Let's Talk</h1>
              <p className="text-[#8b949e] text-lg leading-relaxed">
                Have a project, opportunity, or just want to connect? Drop me a message and I'll respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-10"
            >
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-semibold text-[#e6edf3]">Contact Info</h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
                      <div className="w-10 h-10 rounded-lg bg-[#f0883e]/10 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[#8b949e] text-xs uppercase tracking-wide mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#e6edf3] text-sm font-medium hover:text-[#f0883e] transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[#e6edf3] text-sm font-medium">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-heading text-xl font-semibold text-[#e6edf3]">Find Me Online</h2>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#f0883e]/40 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#f0883e]/10 border border-[#f0883e]/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[#e6edf3] text-sm font-semibold">Currently Available</span>
                </div>
                <p className="text-[#8b949e] text-sm leading-relaxed">
                  Open to freelance projects, consulting, and full-time senior engineering roles.
                </p>
              </div>
            </motion.aside>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6 p-8 rounded-2xl bg-[#161b22] border border-[#30363d]"
              >
                <h2 className="font-heading text-2xl font-semibold text-[#e6edf3]">Send a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-[#8b949e] text-sm font-medium">
                      Full Name <span className="text-[#f0883e]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm placeholder:text-[#8b949e]/60 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 focus:border-[#f0883e]/40 transition-all duration-200"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[#8b949e] text-sm font-medium">
                      Email Address <span className="text-[#f0883e]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register('email')}
                      className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm placeholder:text-[#8b949e]/60 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 focus:border-[#f0883e]/40 transition-all duration-200"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-[#8b949e] text-sm font-medium">
                    Subject <span className="text-[#f0883e]">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project inquiry, collaboration, etc."
                    {...register('subject')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm placeholder:text-[#8b949e]/60 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 focus:border-[#f0883e]/40 transition-all duration-200"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-[#8b949e] text-sm font-medium">
                    Message <span className="text-[#f0883e]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project or what you're looking for..."
                    {...register('message')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm placeholder:text-[#8b949e]/60 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 focus:border-[#f0883e]/40 transition-all duration-200 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#f0883e] text-[#0d1117] font-semibold hover:bg-[#f0883e]/90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0d1117]/30 border-t-[#0d1117] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;