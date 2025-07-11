import React from 'react';
import ModuleCard from "./ModuleCard";
import { useRole } from "@/contexts/RoleContext";

const AIModulesGrid = () => {
  const { getRoleModules, currentRole, getRoleConfig } = useRole();
  const modules = getRoleModules();
  const roleConfig = getRoleConfig();

  return (
    <div className="space-y-6">
      {/* Role-specific header */}
      <div className="text-center">
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${roleConfig.gradientFrom} ${roleConfig.gradientTo} text-white font-semibold text-sm shadow-lg`}>
          🎯 Module pentru {roleConfig.name}
        </div>
        <p className="text-muted-foreground mt-2 text-sm">
          {roleConfig.description}
        </p>
      </div>

      {/* Modules grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <ModuleCard {...module} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIModulesGrid;