"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { experienceApi } from "@/services/api";
import type { Experience } from "@/types";

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    technologies: [] as string[],
  });

  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await experienceApi.getAll();
      setExperiences(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: [],
    });
    setTechInput("");
    setEditingExperience(null);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location || "",
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      current: experience.current,
      description: experience.description,
      technologies: experience.technologies || [],
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submitData = {
      ...formData,
      endDate: formData.current ? undefined : formData.endDate,
    };

    try {
      if (editingExperience) {
        await experienceApi.update(editingExperience._id, submitData);
        toast.success("Experience updated successfully");
      } else {
        await experienceApi.create(submitData);
        toast.success("Experience created successfully");
      }
      fetchExperiences();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingExperience ? "Failed to update experience" : "Failed to create experience");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await experienceApi.delete(id);
      toast.success("Experience deleted successfully");
      fetchExperiences();
    } catch (error) {
      toast.error("Failed to delete experience");
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({ ...formData, technologies: formData.technologies.filter((t) => t !== tech) });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingExperience ? "Edit Experience" : "Add New Experience"}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Full Stack Developer"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="current"
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({ ...formData, current: checked, endDate: checked ? "" : formData.endDate })}
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" variant="outline" onClick={addTechnology}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTechnology(tech)}>
                      {tech} &times;
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingExperience ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No experience entries yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{experience.title}</h3>
                        {experience.current && <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Current</Badge>}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {experience.company}
                        </span>
                        {experience.location && <span>{experience.location}</span>}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(experience.startDate)} - {experience.current ? "Present" : formatDate(experience.endDate || "")}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{experience.description}</p>
                      {experience.technologies && experience.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {experience.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(experience)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(experience._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
