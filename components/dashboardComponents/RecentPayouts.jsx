import React from 'react'
import EmptyState from '@/components/common/EmptyState'

function PayoutEmptyIcon() {
  return (
    <svg className="h-5 w-5" width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v9A2.5 2.5 0 0 1 18.5 18h-13A2.5 2.5 0 0 1 3 15.5v-9Zm2 0v9c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5v-9c0-.3-.2-.5-.5-.5h-13c-.3 0-.5.2-.5.5Zm2.5 2.5h9v2h-9V9Zm0 3.5h6v2h-6v-2Z" />
    </svg>
  )
}

const RecentPayouts = () => {
  return (
    <section className="flex min-h-[220px] flex-col rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-[#1a1a1a]">Recent payouts</h2>
      <EmptyState
        className="mt-4"
        title="No payouts available"
        text="Completed payout requests and transfers will appear in this section."
        icon={<PayoutEmptyIcon />}
      />
    </section>
  )
}

export default RecentPayouts
