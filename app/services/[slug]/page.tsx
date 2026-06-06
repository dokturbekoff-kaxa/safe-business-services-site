import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceDetails } from "@/data/site-content";
import { ServiceDetailPage } from "@/sections/service-detail-page";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Услуга не найдена | Safe Business Services",
    };
  }

  return {
    title: `${service.title} | Safe Business Services`,
    description: `${service.intro} Срок подготовки: ${service.time}.`,
    openGraph: {
      title: `${service.title} | Safe Business Services`,
      description: `${service.intro} Срок подготовки: ${service.time}.`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
