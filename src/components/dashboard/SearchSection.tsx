/**
 * SearchSection Component - Controlled search interface with realistic placeholders
 * Replaces generic search with role-specific, functional search capabilities
 */

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import MockDataService from "./MockDataService";

interface SearchSectionProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
}

interface SearchFilters {
  category: string;
  status: string;
  dateRange: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading = false }) => {
  const { currentRole } = useRole();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'toate',
    status: 'toate',
    dateRange: 'all'
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Role-specific search placeholders
  const getSearchPlaceholder = () => {
    const placeholders = {
      medic: "Caută pacient, tratament sau diagnostic...",
      asistent: "Caută programări, materiale sau proceduri...", 
      receptie: "Caută pacient, telefon sau programare...",
      tehnician: "Caută comandă lab, tip lucrare sau pacient...",
      ceo: "Caută în KPI, rapoarte sau analize...",
      marketing: "Caută campanii, lead-uri sau metrici..."
    };
    return placeholders[currentRole] || "Caută în întreaga bază de date...";
  };

  // Role-specific category options
  const getCategoryOptions = () => {
    const categories = {
      medic: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'pacient', label: 'Pacienți' },
        { value: 'tratament', label: 'Tratamente' },
        { value: 'diagnostic', label: 'Diagnostice' },
        { value: 'imagistica', label: 'Imagistică' }
      ],
      asistent: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'programari', label: 'Programări' },
        { value: 'materiale', label: 'Materiale' },
        { value: 'sterilizare', label: 'Sterilizare' },
        { value: 'urgente', label: 'Urgențe' }
      ],
      receptie: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'pacient', label: 'Pacienți' },
        { value: 'programari', label: 'Programări' },
        { value: 'plati', label: 'Plăți' },
        { value: 'facturi', label: 'Facturi' }
      ],
      tehnician: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'comenzi', label: 'Comenzi lab' },
        { value: 'coroana', label: 'Coroane' },
        { value: 'proteza', label: 'Proteze' },
        { value: 'implant', label: 'Implanturi' }
      ],
      ceo: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'financiar', label: 'Financiar' },
        { value: 'performanta', label: 'Performanță' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'resurse', label: 'Resurse umane' }
      ],
      marketing: [
        { value: 'toate', label: 'Toate categoriile' },
        { value: 'campanii', label: 'Campanii' },
        { value: 'leaduri', label: 'Lead-uri' },
        { value: 'conversii', label: 'Conversii' },
        { value: 'social', label: 'Social Media' }
      ]
    };
    return categories[currentRole] || categories.medic;
  };

  const statusOptions = MockDataService.getStatusOptions();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Trigger search on every keystroke for real-time results
    onSearch(value, filters);
  };

  const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Count active filters
    const activeCount = Object.values(newFilters).filter(val => val !== 'toate' && val !== 'all').length;
    setActiveFiltersCount(activeCount);
    
    onSearch(searchQuery, newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: 'toate',
      status: 'toate', 
      dateRange: 'all'
    };
    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    setSearchQuery('');
    onSearch('', clearedFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">🔍 Căutare Avansată</h3>
          <p className="text-sm text-muted-foreground">
            Găsește rapid informațiile de care ai nevoie
          </p>
        </div>
        
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {activeFiltersCount} filtre active
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Resetează
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* Main search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11 text-base"
            disabled={isLoading}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Advanced filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Categorie</label>
            <Select 
              value={filters.category} 
              onValueChange={(value) => handleFilterChange('category', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectează categoria" />
              </SelectTrigger>
              <SelectContent>
                {getCategoryOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectează statusul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toate">Toate statusurile</SelectItem>
                {statusOptions.treatments.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Perioadă</label>
            <Select 
              value={filters.dateRange} 
              onValueChange={(value) => handleFilterChange('dateRange', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectează perioada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate perioadele</SelectItem>
                <SelectItem value="today">Astăzi</SelectItem>
                <SelectItem value="week">Această săptămână</SelectItem>
                <SelectItem value="month">Această lună</SelectItem>
                <SelectItem value="quarter">Acest trimestru</SelectItem>
                <SelectItem value="year">Acest an</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick search suggestions */}
        {searchQuery.length === 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Sugestii rapide:</p>
            <div className="flex flex-wrap gap-2">
              {MockDataService.getSearchSuggestions().slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearchChange(suggestion.replace('Caută după ', '').replace('...', ''))}
                  className="text-xs h-7"
                  disabled={isLoading}
                >
                  {suggestion.replace('Caută după ', '').replace('...', '')}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Caută...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Caută
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchSection;