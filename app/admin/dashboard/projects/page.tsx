"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { projectsApi } from "@/services/api";
import type { Project } from "@/types";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    image: "",
    images: [] as string[],
    technologies: [] as string[],
    category: "web",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    status: "completed",
  });

  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAll();
      setProjects(res.data || []); // ✅ FIX HERE 
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      image: "",
      images: [],
      technologies: [],
      category: "web",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      status: "completed",
    });
    setTechInput("");
    setImageInput("");
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      description: project.description,
      longDescription: project.longDescription || "",
      image: project.image,
      images: project.images || [],
      technologies: project.technologies,
      category: project.category,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      status: project.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingProject) {
        await projectsApi.update(editingProject._id, formData);
        toast.success("Project updated successfully");
      } else {
        await projectsApi.create(formData);
        toast.success("Project created successfully");
      }
      fetchProjects();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingProject ? "Failed to update project" : "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectsApi.delete(id);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
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

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
      setImageInput("");
    }
  };

  const removeImage = (img: string) => {
    setFormData({ ...formData, images: formData.images.filter((i) => i !== img) });
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, slug });
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
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <DialogDescription></DialogDescription>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateSlug}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Long Description</Label>
                <Textarea
                  id="longDescription"
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Main Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Images</Label>
                <div className="flex gap-2">
                  <Input
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="Image URL"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" variant="outline" onClick={addImage}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, i) => (
                    <Badge key={i} variant="secondary" className="cursor-pointer" onClick={() => removeImage(img)}>
                      Image {i + 1} &times;
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="desktop">Desktop App</SelectItem>
                      <SelectItem value="api">API / Backend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "completed" | "in-progress" | "planned") => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingProject ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          (projects as any[]).map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-20 w-32 rounded-lg bg-muted overflow-hidden shrink-0">
                    {project?.images && (
                      <img src={project?.images[0]} alt={project.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      {project.featured && <Badge>Featured</Badge>}
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project?.technologies?.slice(0, 5).map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project?.technologies?.length > 5 && (
                        <Badge variant="secondary" className="text-xs">+{project.technologies.length - 5}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.liveUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
