<<<<<<< HEAD
﻿import DashboardHomeContent from "@/components/dashboardComponents/DashboardHomeContent";
import React from "react";

const page = () => {
  return <DashboardHomeContent />;
};

export default page;
=======
import ChatRequest from '@/components/dashboardComponents/ChatRequest'
import EarningOverview from '@/components/dashboardComponents/EarningOverview'
import Earnings from '@/components/dashboardComponents/Earnings'
import Greeting from '@/components/dashboardComponents/Greeting'
import Performance from '@/components/dashboardComponents/Performance'
import RecentPayouts from '@/components/dashboardComponents/RecentPayouts'
import React from 'react'

const page = () => {
  return (
    <>
      <Greeting/>
      <ChatRequest/>
      <Performance/>
      <Earnings/>
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecentPayouts/>
        <EarningOverview/>
      </section>
    </>
  )
}

export default page
>>>>>>> 2f614ca440eee91178a05d50113f8481184eecff
