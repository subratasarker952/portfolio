"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, User, Mail, MapPin, Phone, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { aboutApi } from "@/services/api";
import type { About } from "@/types";

export default function AboutAdminPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    subtitle: "",
    description: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
    footerDescription: "",
    footerConnectText: "",
    resume: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    highlights: [] as string[],
  });

  const [highlightInput, setHighlightInput] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await aboutApi.get();
      if (res.data) {
        setAbout(res.data);
        setFormData({
          name: res.data.name || "",
          title: res.data.title || "Full-Stack Web Developer",
          subtitle: res.data.subtitle || 'Building Scalable MERN Applications',
          description: res.data.description || "I'm a passionate Full-Stack Web Developer with over 2 years of hands on project experience in building modern, scalable web applications. My expertise lies in the MERN stack (MongoDB, Express.js, React, Node.js), and I'm constantly exploring new technologies to deliver cutting-edge solutions.I believe in writing clean, maintainable code and following best practices. My approach combines technical excellence with a deep understanding of user needs, resulting in applications that are both powerful and intuitive.When I'm not coding, you'll find me contributing to open-source projects, writing technical articles, or mentoring aspiring developers.",
          email: res.data.email || "",
          phone: res.data.phone || "",
          location: res.data.location || "",
          avatar: res.data.avatar || "",
          footerDescription: res.data.footerDescription || "",
          footerConnectText: res.data.footerConnectText || "",
          resume: res.data.resume || "",
          socialLinks: {
            github: res.data.socialLinks?.github || "",
            linkedin: res.data.socialLinks?.linkedin || "",
            twitter: res.data.socialLinks?.twitter || "",
            website: res.data.socialLinks?.website || "",
          },
          highlights: res.data.highlights || [],
        });
      }
    } catch (error) {
      // No about data yet, that's okay
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await aboutApi.update(formData);
      setAbout(res.data || null);
      toast.success("About information saved successfully");
    } catch (error) {
      toast.error("Failed to save about information");
    } finally {
      setSubmitting(false);
    }
  };

  const addHighlight = () => {
    if (highlightInput.trim() && !formData.highlights.includes(highlightInput.trim())) {
      setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
      setHighlightInput("");
    }
  };

  const removeHighlight = (highlight: string) => {
    setFormData({ ...formData, highlights: formData.highlights.filter((h) => h !== highlight) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-muted-foreground">Manage your personal information and bio</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your basic profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Full Stack Developer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Full Stack Developer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Write a short bio about yourself..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
               
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="New York, USA"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume URL</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="resume"
                      value={formData.resume}
                      onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                      placeholder="https://..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerDescription">Footer Description</Label>
                  <Textarea
                    id="footerDescription"
                    value={formData.footerDescription}
                    onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
                    placeholder="Write a short Footer Description"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerDescription">Footer Connect Text</Label>
                  <Textarea
                    id="footerConnectText"
                    value={formData.footerConnectText}
                    onChange={(e) => setFormData({ ...formData, footerConnectText: e.target.value })}
                    placeholder="Write a short Footer connect text"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Links
                </CardTitle>
                <CardDescription>Your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.socialLinks.github}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={formData.socialLinks.website}
                    onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, website: e.target.value } })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Career Highlights</CardTitle>
                <CardDescription>Key achievements and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    placeholder="e.g., 5+ years experience, 50+ projects completed"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                  />
                  <Button type="button" variant="outline" onClick={addHighlight}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((highlight) => (
                    <Badge
                      key={highlight}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive/20"
                      onClick={() => removeHighlight(highlight)}
                    >
                      {highlight} &times;
                    </Badge>
                  ))}
                </div>
                {formData.highlights.length === 0 && (
                  <p className="text-sm text-muted-foreground">No highlights added yet. Add some key achievements!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}



// socialLinks: {
//   github: { type: String },
//   linkedin: { type: String },
//   website: { type: String },
// },
// highlights: [String],
