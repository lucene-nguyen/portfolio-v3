// Sections parked by LEARNING-164 (themes: LEARNING-184). The code and routes stay; set the env var to "on" to bring one back.
export const features = {
  caseStudies: process.env.NEXT_PUBLIC_FEATURE_CASE_STUDIES === "on",
  lab: process.env.NEXT_PUBLIC_FEATURE_LAB === "on",
  // LEARNING-184: off = Night terminal only (no switcher; ?theme= and saved choices ignored).
  themes: process.env.NEXT_PUBLIC_FEATURE_THEMES === "on",
};
