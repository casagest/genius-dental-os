import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Phone, Video, Clock, CheckCircle, User, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  sender: 'patient' | 'doctor' | 'staff' | 'ai';
  content: string;
  timestamp: string;
  read: boolean;
  urgent?: boolean;
}

interface Conversation {
  id: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  participants: string[];
  status: 'active' | 'closed' | 'urgent';
}

export function CommunicationSystem() {
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      subject: 'Post-Surgery Follow-up',
      lastMessage: 'How are you feeling after the procedure?',
      lastMessageTime: '2024-01-20T10:30:00Z',
      unreadCount: 2,
      participants: ['Dr. Smith', 'You'],
      status: 'active'
    },
    {
      id: '2',
      subject: 'Appointment Rescheduling',
      lastMessage: 'I can accommodate Tuesday at 2 PM instead',
      lastMessageTime: '2024-01-19T16:45:00Z',
      unreadCount: 0,
      participants: ['Reception Staff', 'You'],
      status: 'active'
    },
    {
      id: '3',
      subject: 'Treatment Plan Questions',
      lastMessage: 'Thank you for the detailed explanation',
      lastMessageTime: '2024-01-18T14:20:00Z',
      unreadCount: 0,
      participants: ['Dr. Johnson', 'You'],
      status: 'closed'
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: '1-1',
        sender: 'doctor',
        content: 'Good morning! I hope you\'re recovering well from yesterday\'s procedure. How are you feeling today?',
        timestamp: '2024-01-20T09:00:00Z',
        read: true
      },
      {
        id: '1-2',
        sender: 'patient',
        content: 'Thank you for checking in! I\'m feeling much better today. The pain has subsided significantly.',
        timestamp: '2024-01-20T09:15:00Z',
        read: true
      },
      {
        id: '1-3',
        sender: 'doctor',
        content: 'That\'s excellent news! Please remember to take your antibiotics as prescribed and avoid hard foods for the next few days.',
        timestamp: '2024-01-20T09:20:00Z',
        read: true
      },
      {
        id: '1-4',
        sender: 'ai',
        content: 'AI Reminder: Your next check-up is scheduled for January 25th at 2:00 PM. Would you like to confirm your attendance?',
        timestamp: '2024-01-20T10:00:00Z',
        read: false
      },
      {
        id: '1-5',
        sender: 'doctor',
        content: 'How are you feeling after the procedure? Any concerns or questions?',
        timestamp: '2024-01-20T10:30:00Z',
        read: false,
        urgent: true
      }
    ],
    '2': [
      {
        id: '2-1',
        sender: 'staff',
        content: 'Hi! I see you need to reschedule your appointment for next week. What dates work best for you?',
        timestamp: '2024-01-19T15:30:00Z',
        read: true
      },
      {
        id: '2-2',
        sender: 'patient',
        content: 'Tuesday or Wednesday afternoon would be ideal if possible.',
        timestamp: '2024-01-19T16:00:00Z',
        read: true
      },
      {
        id: '2-3',
        sender: 'staff',
        content: 'I can accommodate Tuesday at 2 PM instead. Does that work for you?',
        timestamp: '2024-01-19T16:45:00Z',
        read: true
      }
    ]
  });

  const sendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: `${activeConversation}-${Date.now()}`,
      sender: 'patient',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMsg]
    }));

    setNewMessage('');
  };

  const getSenderName = (sender: string) => {
    switch (sender) {
      case 'patient': return 'You';
      case 'doctor': return 'Dr. Smith';
      case 'staff': return 'Reception Staff';
      case 'ai': return 'AI Assistant';
      default: return sender;
    }
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'patient': return <User className="h-4 w-4" />;
      case 'doctor': return <User className="h-4 w-4" />;
      case 'staff': return <User className="h-4 w-4" />;
      case 'ai': return <Bot className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getConversationStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'status-critical';
      case 'active': return 'status-optimal';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold medical-gradient">Communication System</h2>
          <p className="text-muted-foreground">Chat with your dental team</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call Office
          </Button>
          <Button variant="outline">
            <Video className="w-4 h-4 mr-2" />
            Video Call
          </Button>
        </div>
      </div>

      <Tabs value="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors ${
                        activeConversation === conv.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setActiveConversation(conv.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium truncate">{conv.subject}</h4>
                        <div className="flex items-center gap-2">
                          {conv.unreadCount > 0 && (
                            <Badge variant="secondary">{conv.unreadCount}</Badge>
                          )}
                          <Badge className={getConversationStatusColor(conv.status)}>
                            {conv.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {conv.participants.join(', ')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conv.lastMessageTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="medical-card lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {activeConversation 
                    ? conversations.find(c => c.id === activeConversation)?.subject 
                    : 'Select a conversation'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-96">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 border border-border/50 rounded-lg">
                  {activeConversation && messages[activeConversation]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'patient' ? 'order-2' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender !== 'patient' && getSenderIcon(message.sender)}
                          <span className="text-xs font-medium">{getSenderName(message.sender)}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.urgent && <Badge className="status-critical">Urgent</Badge>}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === 'patient'
                              ? 'bg-primary text-primary-foreground'
                              : message.sender === 'ai'
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="flex-1">
                  <p className="font-medium">Appointment Confirmed</p>
                  <p className="text-sm text-muted-foreground">Your appointment for Jan 25th has been confirmed</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <p className="font-medium">Medication Reminder</p>
                  <p className="text-sm text-muted-foreground">Time to take your prescribed antibiotics</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help with any questions or concerns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Describe your issue or question..." rows={4} />
              <div className="flex gap-2">
                <Button>Send Message</Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}