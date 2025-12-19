"use client"

import { useState } from "react"
import type { ProductFAQ } from "@/lib/products"
import { ChevronDown } from "lucide-react"

interface ProductFAQsProps {
  faqs: ProductFAQ[]
}

export function ProductFAQs({ faqs }: ProductFAQsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
