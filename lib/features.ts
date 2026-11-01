// Sections parked by LEARNING-164. The code and routes stay; set the env var to "on" to bring one back.
export const features = {
  caseStudies: process.env.NEXT_PUBLIC_FEATURE_CASE_STUDIES === "on",
  lab: process.env.NEXT_PUBLIC_FEATURE_LAB === "on",
};
