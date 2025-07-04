import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Book, FileText, CheckCircle, ExternalLink, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotionDatabase {
  id: string;
  title: Array<{
    plain_text: string;
  }>;
  description: Array<{
    plain_text: string;
  }>;
  properties: { [key: string]: any };
}

interface NotionPage {
  id: string;
  properties: { [key: string]: any };
  created_time: string;
  last_edited_time: string;
}

const NotionIntegration: React.FC = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('notion_api_key') || '');
  const [isConnected, setIsConnected] = useState(false);
  const [databases, setDatabases] = useState<NotionDatabase[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const notionBaseUrl = 'https://api.notion.com/v1';

  const connectToNotion = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Eroare",
        description: "Introduceți API key-ul Notion",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Test connection cu search pentru databases
      const response = await fetch(`${notionBaseUrl}/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          filter: {
            property: 'object',
            value: 'database'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('API key invalid sau lipsă permisiuni');
      }

      const data = await response.json();
      setDatabases(data.results);
      
      localStorage.setItem('notion_api_key', apiKey);
      setIsConnected(true);

      toast({
        title: "Conectat cu succes",
        description: "Notion a fost conectat la sistemul medical",
      });
      
    } catch (error) {
      console.error('Notion connection error:', error);
      toast({
        title: "Eroare conexiune",
        description: "Verificați API key-ul Notion și permisiunile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPagesFromDatabase = async (databaseId: string) => {
    if (!isConnected) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`${notionBaseUrl}/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          page_size: 20
        }),
      });

      if (!response.ok) {
        throw new Error('Nu s-au putut obține paginile');
      }

      const data = await response.json();
      setPages(data.results);

    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: "Eroare sincronizare",
        description: "Nu s-au putut obține datele din Notion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPatientRecord = async (patientData: {
    name: string;
    phone: string;
    email?: string;
    service: string;
    notes?: string;
  }) => {
    if (!isConnected || !selectedDatabase) return;

    try {
      const pageData = {
        parent: { database_id: selectedDatabase },
        properties: {
          "Nume Pacient": {
            title: [
              {
                text: {
                  content: patientData.name
                }
              }
            ]
          },
          "Telefon": {
            phone_number: patientData.phone
          },
          "Email": {
            email: patientData.email || ''
          },
          "Serviciu": {
            rich_text: [
              {
                text: {
                  content: patientData.service
                }
              }
            ]
          },
          "Status": {
            select: {
              name: "Programat"
            }
          },
          "Data Programare": {
            date: {
              start: new Date().toISOString().split('T')[0]
            }
          }
        }
      };

      if (patientData.notes) {
        pageData.properties["Notițe"] = {
          rich_text: [
            {
              text: {
                content: patientData.notes
              }
            }
          ]
        };
      }

      const response = await fetch(`${notionBaseUrl}/pages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        toast({
          title: "Pacient adăugat",
          description: "Datele pacientului au fost salvate în Notion",
        });
        fetchPagesFromDatabase(selectedDatabase);
      }

    } catch (error) {
      console.error('Error creating patient record:', error);
      toast({
        title: "Eroare creare",
        description: "Nu s-au putut salva datele în Notion",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (apiKey) {
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    if (selectedDatabase) {
      fetchPagesFromDatabase(selectedDatabase);
    }
  }, [selectedDatabase]);

  const getDatabaseTitle = (database: NotionDatabase) => {
    return database.title?.[0]?.plain_text || 'Fără nume';
  };

  const getPageTitle = (page: NotionPage) => {
    // Încearcă să găsească proprietatea title
    const titleProperty = Object.values(page.properties).find(
      (prop: any) => prop.type === 'title'
    );
    
    if (titleProperty && titleProperty.title?.[0]?.plain_text) {
      return titleProperty.title[0].plain_text;
    }
    
    return 'Pagină fără nume';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Book className="w-5 h-5" />
            <span>Integrare Notion</span>
            {isConnected && <CheckCircle className="w-4 h-4 text-green-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  API Key Notion
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="secret_..."
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Creați integrarea din Settings → Connections → Develop or manage integrations
                </p>
              </div>
              <Button 
                onClick={connectToNotion}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Se conectează...' : 'Conectare Notion'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Conectat la Notion</span>
              </div>

              {databases.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Selectați baza de date pentru pacienți
                  </label>
                  <select
                    value={selectedDatabase}
                    onChange={(e) => setSelectedDatabase(e.target.value)}
                    className="mt-1 w-full p-2 border border-slate-300 rounded-md"
                  >
                    <option value="">Selectați database...</option>
                    {databases.map((database) => (
                      <option key={database.id} value={database.id}>
                        {getDatabaseTitle(database)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button 
                onClick={() => setIsConnected(false)}
                variant="outline"
                size="sm"
              >
                Deconectare
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && selectedDatabase && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Date Pacienți</span>
              <Badge variant="outline">{pages.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Se încarcă datele...</div>
            ) : pages.length > 0 ? (
              <div className="space-y-3">
                {pages.slice(0, 10).map((page) => (
                  <div 
                    key={page.id}
                    className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-900">
                          {getPageTitle(page)}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Ultima modificare: {new Date(page.last_edited_time).toLocaleDateString('ro-RO')}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Deschide
                      </Button>
                    </div>
                  </div>
                ))}
                
                {pages.length > 10 && (
                  <div className="text-center text-sm text-slate-500 pt-3">
                    ... și încă {pages.length - 10} înregistrări
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nu există date în baza selectată</p>
                <p className="text-sm">Adăugați pagini în database-ul Notion</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotionIntegration;