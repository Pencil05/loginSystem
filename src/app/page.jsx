"use client"
import Image from "next/image";
import Link from 'next/link'
import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {

  const {data:session} = useSession();
  // if(session) redirect("/welcome");

  return (
    <Navbar session={session}/>
  );
}
