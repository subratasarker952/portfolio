"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { skillsApi } from "@/services/api";
import type { Skill } from "@/types";

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Tools"
  | "Other";

const categoryColors: Record<string, string> = {
  frontend: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  backend: "bg-green-500/10 text-green-500 border-green-500/20",
  database: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  devops: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  tools: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    icon: string;
    category: SkillCategory;
    proficiency: number;
  }>({
    name: "",
    icon: "",
    category: "Frontend",
    proficiency: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await skillsApi.getAll();
      setSkills(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      icon: "",
      category: "Frontend",
      proficiency: 80,
    });
    setEditingSkill(null);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      icon: skill.icon,
      category: skill.category,
      proficiency: skill.proficiency,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingSkill) {
        await skillsApi.update(editingSkill._id, formData);
        toast.success("Skill updated successfully");
      } else {
        await skillsApi.create(formData);
        toast.success("Skill created successfully");
      }
      fetchSkills();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingSkill ? "Failed to update skill" : "Failed to create skill");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      await skillsApi.delete(id);
      toast.success("Skill deleted successfully");
      fetchSkills();
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your technical skills</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Lucide icon name or emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., Code, Database, Server"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value: SkillCategory) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Devops">DevOps</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proficiency">Proficiency ({formData.proficiency}%)</Label>
                <Input
                  id="proficiency"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingSkill ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No skills yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold capitalize mb-3">{category}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`border ${categoryColors[category] || categoryColors.other}`}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center text-lg">
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{skill.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(skill._id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
