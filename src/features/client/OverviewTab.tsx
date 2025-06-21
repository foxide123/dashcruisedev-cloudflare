// src/features/admin/OverviewTab.tsx
"use client";
import { useState, useActionState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion"; //:contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
import { inviteUserAction } from "@/app/actions/admin/inviteUser";
/* import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; */

//eslint-disable-next-line
const data = [
  {
    date: '20 June',
    views: 100
  },
  {
    data: '21 June',
    views: 50
  }
];

const initialState = { success: false, message: "" };

export default function OverviewTab() {
  // Simulate real stats
  const [counts] = useState({ views: 124, websites: 1, articles: 0 });
  //eslint-disable-next-line
  const [state, formAction] = useActionState(inviteUserAction, initialState);
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
            { label: "Total Views", value: counts.views },
            { label: "Active Websites", value: counts.websites },
            { label: "Articles Published", value: counts.articles },
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
          {Array.from({ length: 1 }).map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer p-4 bg-white rounded-xl border border-gray-200 shadow"
            >
              <p className="text-gray-500 absolute top-5 right-5">Website #{i + 1}</p>
              <h3 className="font-semibold">Nitra Solutions</h3>
              <p className="mt-2 text-sm text-blue-600">In Progress</p>
            </motion.div>
          ))}
        </div>
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
