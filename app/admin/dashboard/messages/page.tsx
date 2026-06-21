"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, Loader2, Mail, MailOpen, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { messagesApi } from "@/services/api";
import type { Message } from "@/types";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await messagesApi.getAll();
      setMessages(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      try {
        await messagesApi.markAsRead(message._id);
        setMessages(messages.map((m) => (m._id === message._id ? { ...m, read: true } : m)));
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await messagesApi.delete(id);
      toast.success("Message deleted successfully");
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

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
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Contact form submissions
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-primary">{unreadCount} unread</Badge>
            )}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Messages from your contact form will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-colors hover:bg-accent/50 ${!message.read ? "border-primary/50 bg-primary/5" : ""}`}
                onClick={() => handleView(message)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="shrink-0">
                    {message.read ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Mail className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium truncate ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.name}
                      </h3>
                      {!message.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.subject || "No subject"}</p>
                    <p className="text-xs text-muted-foreground/70 truncate mt-1">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message._id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject || "Message"}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
              <div className="border-t pt-4">
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message"}`}>
                    Reply via Email
                  </a>
                </Button>
                <Button variant="destructive" onClick={() => { handleDelete(selectedMessage._id); }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
