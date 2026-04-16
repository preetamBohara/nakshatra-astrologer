import React from 'react'

const EarningOverview = () => {
  return (
    <section className="flex min-h-[220px] flex-col rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#1a1a1a]">Earing Overview</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[#555]">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>Via Call</span>
              <span className="font-semibold text-[#1a1a1a]">₹2</span>
            </div>
            <div className="flex items-center gap-2 text-[#555]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F1E54A]" />
              <span>Via Chat</span>
              <span className="font-semibold text-[#1a1a1a]">₹1</span>
            </div>
          </div>
        </div>

        <div className="relative mt-1 h-36 w-36 shrink-0">
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "conic-gradient(#E66344 0deg 240deg, #F1E54A 240deg 360deg)",
            }}
          />
          <div className="absolute inset-5 flex items-center justify-center rounded-full bg-white text-center">
            <div>
              <p className="text-sm text-[#555]">Total</p>
              <p className="text-3xl font-bold text-[#1a1a1a]">₹3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-[#ECE7EF] pt-4 text-sm">
        <div className="flex items-center justify-between py-1 text-[#3A3A3A]">
          <span>Gross Earnings</span>
          <span>₹3</span>
        </div>
        <div className="flex items-center justify-between py-1 text-[#3A3A3A]">
          <span>Deductions</span>
          <span className="text-[#B55A52]">-₹1.06</span>
        </div>
        <div className="flex items-center justify-between py-1 font-semibold text-[#1a1a1a]">
          <span>Net Earnings</span>
          <span className="text-[#189D41]">₹1.94</span>
        </div>
      </div>
    </section>
  )
}

export default EarningOverview
