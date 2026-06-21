"use client"

import React from "react"

import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar role="teacher" />
      <main className="flex-1 overflow-y-auto bg-muted/30">
        {children}
      </main>
    </div>
  )
}
