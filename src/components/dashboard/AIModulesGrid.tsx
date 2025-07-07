import React from 'react';
import { Calendar, MessageSquare, Clock, Search, Mic, DollarSign } from "lucide-react";
import ModuleCard from "./ModuleCard";
import { useLanguage } from "@/contexts/LanguageContext";

const AIModulesGrid = () => {
  const { t } = useLanguage();

  const modules = [
    {
      title: t('modules.allonx'),
      description: t('modules.allonxDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-indigo-500",
      link: "/allonx"
    },
    {
      title: t('modules.genius'),
      description: t('modules.geniusDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <Mic className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: t('modules.labsync'),
      description: t('modules.labsyncDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/labsync"
    },
    {
      title: t('modules.inventory'),
      description: t('modules.inventoryDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <Search className="w-6 h-6" />,
      color: "bg-orange-500",
      link: "/inventory"
    },
    {
      title: t('modules.clinical'),
      description: t('modules.clinicalDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/clinical"
    },
    {
      title: t('modules.marketing'),
      description: t('modules.marketingDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-indigo-500",
      link: "/marketing"
    },
    {
      title: t('modules.cfo'),
      description: t('modules.cfoDesc'),
      status: t('status.live'),
      progress: 100,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-emerald-500",
      link: "/cfo"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {modules.map((module, index) => (
        <ModuleCard key={index} {...module} />
      ))}
    </div>
  );
};

export default AIModulesGrid;