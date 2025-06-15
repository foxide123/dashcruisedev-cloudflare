// src/features/admin/OverviewTab.tsx
"use client";
import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion"; //:contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
import { useFormState } from "react-dom";
import { inviteUserAction } from "@/app/actions/admin/inviteUser";

const initialState = { success: false, message: '' };

export default function OverviewTab() {
  // Simulate real stats
  const [counts] = useState({ orders: 124, clients: 32, revenue: 45200 });
  const [state, formAction] = useFormState(inviteUserAction, initialState);
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-2xl shadow-2xl border"
      >
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {[
            { label: "Total Orders", value: counts.orders },
            { label: "Active Clients", value: counts.clients },
            { label: "Revenue ($)", value: counts.revenue },
          ].map(({ label, value }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.03 }}
              className="flex-1 p-6 bg-gradient-to-tr from-indigo-50 to-indigo-100 rounded-xl shadow-lg"
            >
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className="text-4xl font-bold text-indigo-700">
                <CountUp end={value} delay={1.5} />
              </h2>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer p-4 bg-white rounded-xl border border-gray-200 shadow"
            >
              <h3 className="font-semibold">Order #{1000 + i}</h3>
              <p className="text-gray-500">Client: Acme Corp</p>
              <p className="mt-2 text-sm text-green-600">Completed</p>
            </motion.div>
          ))}
        </div>
        <form
          action={formAction}
          className="flex flex-col items-start gap-4 mt-10"
        >
          <label htmlFor="email_invitation">Invite User By Email</label>
          <input
            placeholder="User Email"
            type="email"
            id="email"
            name="email"
            className="border-1 border-black p-2"
          />
          <button
            type="submit"
            className="border-1 border-black px-4 py-2 rounded-xl cursor-pointer"
          >
            Add
          </button>
        </form>
        {state.message && (
          <p
            className={`mt-10 text-sm ${
              state.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </motion.section>
    </div>
  );
}
