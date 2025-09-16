"use client";

import React from "react";

import WidgetBox from "@/components/widget/WidgetBox";
import "./page.css";

export default function Page() {



  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Let&apos;s grab something</h1>
     <section>
 
        <WidgetBox storeType="Food and Drink" maxResult={3}>
        </WidgetBox>


      </section>
    </main>

  )
}
