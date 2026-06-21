"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { testimonialsApi } from "@/services/api";
import type { Testimonial } from "@/types";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialsApi.getAll();
      setTestimonials(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      image: "",
      rating: 5,
    });
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company || "",
      content: testimonial.content,
      image: testimonial.image || "",
      rating: testimonial.rating,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingTestimonial) {
        await testimonialsApi.update(editingTestimonial._id, formData);
        toast.success("Testimonial updated successfully");
      } else {
        await testimonialsApi.create(formData);
        toast.success("Testimonial created successfully");
      }
      fetchTestimonials();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingTestimonial ? "Failed to update testimonial" : "Failed to create testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await testimonialsApi.delete(id);
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
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
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials and reviews</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Position</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="CEO"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write what the client said about your work..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingTestimonial ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {testimonials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No testimonials yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Testimonial
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.image} />
                        <AvatarFallback>{testimonial.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial._id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                    <p className="text-sm text-muted-foreground pl-5 line-clamp-4">{testimonial.content}</p>
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
