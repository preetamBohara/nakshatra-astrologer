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