import React from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { NativeFeaturesDemo } from '@/components/native/NativeFeaturesDemo';

const NativeFeatures = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="pt-20">
        <NativeFeaturesDemo />
      </main>
    </div>
  );
};

export default NativeFeatures;