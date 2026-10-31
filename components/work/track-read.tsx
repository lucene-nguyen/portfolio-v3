"use client";

import { useEffect } from "react";
import { recordCaseStudyRead } from "@/lib/achievements";

export function TrackCaseStudyRead() {
  useEffect(recordCaseStudyRead, []);
  return null;
}
