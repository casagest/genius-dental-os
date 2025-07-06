import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Mic, 
  Mail, 
  Phone, 
  MessageSquare, 
  BarChart3,
  Star,
  Calendar,
  Zap,
  Heart,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Settings,
  Brain,
  Megaphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIMarketing = () => {
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [voiceAdScript, setVoiceAdScript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const leadScores = [
    { name: "Maria Popescu", email: "maria.p@email.com", phone: "0743123456", score: 95, status: "Hot", lastActivity: "Vizita programată", source: "Facebook Ads" },
    { name: "Ion Georgescu", email: "ion.g@email.com", phone: "0744567890", score: 87, status: "Warm", lastActivity: "Descărcat broșură", source: "Google Ads" },
    { name: "Ana Mihăilescu", email: "ana.m@email.com", phone: "0745678901", score: 76, status: "Warm", lastActivity: "Vizualizat prețuri", source: "Website" },
    { name: "Radu Popa", email: "radu.p@email.com", phone: "0746789012", score: 65, status: "Cold", lastActivity: "Contactat telefonic", source: "Referral" },
    { name: "Elena Dobre", email: "elena.d@email.com", phone: "0747890123", score: 58, status: "Cold", lastActivity: "Newsletter subscribe", source: "Instagram" }
  ];

  const campaigns = [
    { 
      id: 1, 
      name: "Campanie Coroane Dentare", 
      type: "Email + Voice", 
      status: "Active", 
      leads: 247, 
      conversions: 23, 
      budget: "2,500 RON",
      roi: "340%"
    },
    { 
      id: 2, 
      name: "Implanturi Premium", 
      type: "Voice Ads", 
      status: "Active", 
      leads: 156, 
      conversions: 18, 
      budget: "3,200 RON",
      roi: "285%"
    },
    { 
      id: 3, 
      name: "Ortodonție Invizibilă", 
      type: "Multi-channel", 
      status: "Paused", 
      leads: 89, 
      conversions: 7, 
      budget: "1,800 RON",
      roi: "195%"
    }
  ];

  const voiceAds = [
    { id: 1, name: "Implant Promo", duration: "30s", plays: 1247, clicks: 89, voice: "Voce feminină profesională" },
    { id: 2, name: "Urgențe Dentare", duration: "20s", plays: 2156, clicks: 156, voice: "Voce masculină calmă" },
    { id: 3, name: "Coroane Zirconiu", duration: "25s", plays: 876, clicks: 67, voice: "Voce feminină prietenoasă" }
  ];

  const handleStartVoiceAd = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Înregistrare oprită" : "Înregistrare pornită",
      description: isRecording ? "Voice ad salvat și procesat de AI" : "Începe să vorbești pentru voice ad nou",
    });
  };

  const handleCampaignAction = (action: string, campaignName: string) => {
    toast({
      title: `${action} campanie`,
      description: `"${campaignName}" - ${action.toLowerCase()} cu succes`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Hot': 'bg-red-100 text-red-800',
      'Warm': 'bg-orange-100 text-orange-800',
      'Cold': 'bg-blue-100 text-blue-800',
      'Active': 'bg-green-100 text-green-800',
      'Paused': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-xl">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">AI Marketing Hub</h1>
                <p className="text-slate-600">Lead Scoring + Campaigns + Voice Ads Automatizate</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                LIVE & AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Lead Scoring</span>
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Campanii</span>
            </TabsTrigger>
            <TabsTrigger value="voice-ads" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Voice Ads</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Lead Scoring Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Total Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">1,247</div>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +23% vs luna trecută
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-600" />
                    Hot Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">156</div>
                  <p className="text-sm text-orange-600 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    Score 80+
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-purple-600" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">12.8%</div>
                  <p className="text-sm text-purple-600 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +2.1% vs media
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">47</div>
                  <p className="text-sm text-blue-600">
                    Acțiuni sugerate
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                  AI Lead Scoring - Top Prospects
                </CardTitle>
                <CardDescription>
                  AI analizează comportamentul și prioritizează lead-urile automat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadScores.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{lead.name}</h4>
                          <p className="text-sm text-slate-600">{lead.email}</p>
                          <p className="text-xs text-slate-500">{lead.lastActivity} • {lead.source}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusBadge(lead.status)}>
                          {lead.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Campanii Active</h2>
                <p className="text-slate-600">Automatizate cu AI pentru rezultate optime</p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Target className="w-4 h-4 mr-2" />
                Campanie Nouă
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <Badge className={getStatusBadge(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <CardDescription>{campaign.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Leads Generate</p>
                        <p className="font-semibold text-slate-800">{campaign.leads}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Conversii</p>
                        <p className="font-semibold text-slate-800">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Budget</p>
                        <p className="font-semibold text-slate-800">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">ROI</p>
                        <p className="font-semibold text-green-600">{campaign.roi}</p>
                      </div>
                    </div>
                    
                    <Progress value={(campaign.conversions / campaign.leads) * 100} className="h-2" />
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCampaignAction(campaign.status === 'Active' ? 'Pausă' : 'Pornește', campaign.name)}
                      >
                        {campaign.status === 'Active' ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                        {campaign.status === 'Active' ? 'Pausă' : 'Pornește'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Voice Ads Tab */}
          <TabsContent value="voice-ads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mic className="w-5 h-5 mr-2 text-purple-600" />
                    Creator Voice Ads AI
                  </CardTitle>
                  <CardDescription>
                    Generează voice ads personalizate cu AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="voice-script">Script Voice Ad</Label>
                    <Textarea
                      id="voice-script"
                      placeholder="Introdu textul pentru voice ad sau lasă AI să genereze..."
                      value={voiceAdScript}
                      onChange={(e) => setVoiceAdScript(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="voice-type">Tipul Vocii</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Alege vocea" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female-professional">Feminină Profesională</SelectItem>
                          <SelectItem value="male-calm">Masculină Calmă</SelectItem>
                          <SelectItem value="female-friendly">Feminină Prietenoasă</SelectItem>
                          <SelectItem value="male-energetic">Masculină Energică</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="duration">Durata</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Durata" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 secunde</SelectItem>
                          <SelectItem value="30">30 secunde</SelectItem>
                          <SelectItem value="45">45 secunde</SelectItem>
                          <SelectItem value="60">60 secunde</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={handleStartVoiceAd}
                      className={`flex-1 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      {isRecording ? 'Stop Înregistrare' : 'Începe Înregistrare'}
                    </Button>
                    <Button variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voice Ads Active</CardTitle>
                  <CardDescription>
                    Ads-urile tale vocale și performanța lor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {voiceAds.map((ad) => (
                      <div key={ad.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold text-slate-800">{ad.name}</h4>
                          <p className="text-sm text-slate-600">{ad.voice} • {ad.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">{ad.plays} plays</p>
                          <p className="text-sm text-green-600">{ad.clicks} clicks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Cost per Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">47 RON</div>
                  <p className="text-sm text-green-600 flex items-center">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    -12% vs luna trecută
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Customer Lifetime Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">2,840 RON</div>
                  <p className="text-sm text-purple-600 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +8% vs media
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">Voice Ad CTR</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">4.7%</div>
                  <p className="text-sm text-blue-600 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    Above industry avg
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-600">AI Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">87%</div>
                  <p className="text-sm text-indigo-600">
                    Eficiență algoritm
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                  Analiza completă a campaniilor de marketing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg">
                  <div className="text-center text-slate-600">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                    <p>Grafice interactive de performanță</p>
                    <p className="text-sm">Charts vor fi integrate cu date reale</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIMarketing;