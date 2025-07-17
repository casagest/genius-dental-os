import React, { useState } from 'react';
import { Palette, Calendar, TrendingUp, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const SocialMediaAI = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const socialStats = [
    { platform: 'Instagram', followers: 3254, growth: '+12%', engagement: 4.8, posts: 24 },
    { platform: 'Facebook', followers: 2187, growth: '+8%', engagement: 3.2, posts: 18 },
    { platform: 'TikTok', followers: 1876, growth: '+25%', engagement: 6.1, posts: 15 },
    { platform: 'LinkedIn', followers: 892, growth: '+15%', engagement: 2.9, posts: 12 }
  ];

  const scheduledPosts = [
    {
      platform: 'Instagram',
      content: 'Transformarea completă a zâmbetului cu implanturile All-on-X! 🦷✨',
      type: 'Reel',
      date: '2024-01-18 10:00',
      status: 'scheduled',
      expectedReach: 1200
    },
    {
      platform: 'Facebook',
      content: 'Sfaturi pentru îngrijirea dentară de iarnă. Thread educațional important!',
      type: 'Post educațional',
      date: '2024-01-18 14:30',
      status: 'scheduled',
      expectedReach: 800
    },
    {
      platform: 'TikTok',
      content: 'POV: Când îți faci implant și îți revine încrederea în zâmbet 😍',
      type: 'Video viral',
      date: '2024-01-18 18:00',
      status: 'scheduled',
      expectedReach: 2500
    },
    {
      platform: 'LinkedIn',
      content: 'Inovațiile în stomatologia digitală și impactul asupra pacienților',
      type: 'Articol profesional',
      date: '2024-01-19 09:00',
      status: 'draft',
      expectedReach: 400
    }
  ];

  const contentSuggestions = [
    {
      type: 'Înainte/După',
      description: 'Cazuri de succes cu transformări dramatice',
      engagement: 'Foarte mare',
      platforms: ['Instagram', 'Facebook'],
      priority: 'high'
    },
    {
      type: 'Educațional',
      description: 'Sfaturi pentru îngrijirea dentară zilnică',
      engagement: 'Mare',
      platforms: ['Facebook', 'LinkedIn'],
      priority: 'medium'
    },
    {
      type: 'Behind the Scenes',
      description: 'O zi în viața echipei din clinică',
      engagement: 'Mare',
      platforms: ['Instagram', 'TikTok'],
      priority: 'high'
    },
    {
      type: 'Testimoniale',
      description: 'Recenzii video de la pacienți mulțumiți',
      engagement: 'Foarte mare',
      platforms: ['Toate platformele'],
      priority: 'high'
    }
  ];

  const trendingTopics = [
    { topic: '#ZâmbetulPerfect', volume: 15420, trend: '+18%' },
    { topic: '#StomatologieDigitală', volume: 8760, trend: '+25%' },
    { topic: '#ÎngrijireDentară', volume: 12340, trend: '+12%' },
    { topic: '#ImplanturiDentare', volume: 6890, trend: '+22%' }
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Facebook': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'TikTok': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'LinkedIn': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'published': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Social Media AI</h1>
              <p className="text-muted-foreground">Automatizare postări și engagement</p>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {socialStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getPlatformColor(stat.platform)}>
                    {stat.platform}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">{stat.growth}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.followers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">urmăritori</p>
                  <div className="flex justify-between text-xs">
                    <span>Engagement: {stat.engagement}%</span>
                    <span>{stat.posts} posturi/lună</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="content">Conținut AI</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
            <TabsTrigger value="trends">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Postări Programate
                </CardTitle>
                <CardDescription>Calendar automat cu conținut optimizat AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={getPlatformColor(post.platform)}>
                            {post.platform}
                          </Badge>
                          <div>
                            <p className="font-medium">{post.type}</p>
                            <p className="text-sm text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status === 'scheduled' ? 'Programat' : 
                           post.status === 'draft' ? 'Draft' : 'Publicat'}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3 p-3 bg-muted/20 rounded-lg">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Reach estimat: {post.expectedReach.toLocaleString()} persoane
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Editează
                          </Button>
                          <Button size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Publică Acum
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sugestii Conținut AI</CardTitle>
                <CardDescription>Idei generate automat bazate pe tendințe și performanță</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentSuggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{suggestion.type}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                        </div>
                        <Badge className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority === 'high' ? 'Prioritate Mare' : 
                           suggestion.priority === 'medium' ? 'Prioritate Medie' : 'Prioritate Mică'}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Platforme: </span>
                          <span className="font-medium">{suggestion.platforms.join(', ')}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Engagement: </span>
                          <span className="font-medium text-green-600">{suggestion.engagement}</span>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Palette className="w-4 h-4 mr-2" />
                        Generează Conținut
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performanță Săptămânală</CardTitle>
                  <CardDescription>Metrici de engagement pe platforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Likes</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">2,847</p>
                        <p className="text-xs text-green-600">+15%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Comentarii</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">423</p>
                        <p className="text-xs text-green-600">+22%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Share-uri</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">186</p>
                        <p className="text-xs text-green-600">+8%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Reach</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">18,567</p>
                        <p className="text-xs text-green-600">+12%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cele Mai Bune Posturi</CardTitle>
                  <CardDescription>Top conținut din ultima săptămână</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-pink-100 text-pink-800 border-pink-200">Instagram</Badge>
                        <span className="text-xs text-green-600">+847 likes</span>
                      </div>
                      <p className="text-sm">Transformare implant All-on-X complet</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">TikTok</Badge>
                        <span className="text-xs text-green-600">+1.2k views</span>
                      </div>
                      <p className="text-sm">"Când îți faci dinții și..."</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">Facebook</Badge>
                        <span className="text-xs text-green-600">+312 shares</span>
                      </div>
                      <p className="text-sm">Sfaturi îngrijire dentară pentru copii</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hashtag-uri Trending</CardTitle>
                  <CardDescription>Cele mai populare hashtag-uri în nișă</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trendingTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-sm text-muted-foreground">{topic.volume.toLocaleString()} utilizări</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-green-600">{topic.trend}</span>
                          <div className="mt-1">
                            <Button variant="outline" size="sm">Folosește</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendarul Optimal</CardTitle>
                  <CardDescription>Orele de vârf pentru fiecare platformă</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-pink-800">Instagram</span>
                        <span className="text-sm text-pink-600">19:00 - 21:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Cel mai bun engagement: Marți, Joi</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-800">Facebook</span>
                        <span className="text-sm text-blue-600">13:00 - 15:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Cel mai bun engagement: Miercuri, Vineri</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-purple-800">TikTok</span>
                        <span className="text-sm text-purple-600">18:00 - 20:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Cel mai bun engagement: Sâmbătă, Duminică</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-800">LinkedIn</span>
                        <span className="text-sm text-green-600">09:00 - 11:00</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Cel mai bun engagement: Marți, Miercuri</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialMediaAI;