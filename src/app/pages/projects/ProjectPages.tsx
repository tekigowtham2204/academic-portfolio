import { useParams, Navigate } from "react-router";
import CaseStudyLayout from "../CaseStudyLayout";
import { projects } from "../../data/portfolio-data";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return <CaseStudyLayout project={project} />;
}

export function SyncgazePlatformsPage() {
  const project = projects.find((p) => p.slug === "syncgaze-platforms")!;
  return <CaseStudyLayout project={project} />;
}

export function SpiritPlatformPage() {
  const project = projects.find((p) => p.slug === "spirit-platform")!;
  return <CaseStudyLayout project={project} />;
}

export function StuvioraPage() {
  const project = projects.find((p) => p.slug === "stuviora")!;
  return <CaseStudyLayout project={project} />;
}

export function KisanMitraPage() {
  const project = projects.find((p) => p.slug === "kisanmitra")!;
  return <CaseStudyLayout project={project} />;
}
