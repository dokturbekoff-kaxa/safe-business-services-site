"use client";

import { serviceDetails, services } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { cn, whatsappLink, whatsappUrl } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Layers3,
  MessageCircle,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ComponentType } from "react";
import { useRef } from "react";

type ServiceDetail = (typeof serviceDetails)[number];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-80px" };

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const serviceCard = services.find((item) => item.slug === service.slug);
  const Icon = serviceCard?.icon ?? Layers3;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f6fb] text-[#101114]">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-10rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-orange-400/20 blur-3xl"
          animate={{ x: [0, 70, 20], y: [0, 45, 10], scale: [1, 1.12, 0.96] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-8rem] top-[16rem] h-[34rem] w-[34rem] rounded-full bg-cyan-300/22 blur-3xl"
          animate={{ x: [0, -60, 10], y: [0, 70, 10], scale: [1, 0.9, 1.08] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="premium-grid absolute inset-0 opacity-45" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="/#services" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            К услугам
          </a>
          <a href="/" className="hidden text-sm font-black tracking-tight text-white sm:block">
            Safe Business Services
          </a>
          <Button asChild className="h-9 bg-white px-4 text-xs text-black hover:bg-white/90">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Консультация
            </a>
          </Button>
        </div>
      </header>

      <section ref={heroRef} className="relative z-10 overflow-hidden bg-[#050506] px-4 pb-24 pt-28 text-white sm:px-6 lg:pt-32">
        <div className={cn("absolute inset-x-0 bottom-0 h-40 bg-gradient-to-r opacity-25 blur-3xl", service.accent)} />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.75 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-xs font-bold text-white/70 backdrop-blur-xl">
              <Icon className="h-4 w-4 text-cyan-200" />
              {service.badge}
            </div>
            <h1 className="mt-7 max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {service.title}: что входит, кому подходит и сколько занимает
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/60">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-premium-gradient text-black shadow-orange-glow hover:scale-[1.02]">
                <a
                  href={whatsappLink(`Здравствуйте, хочу заказать ${service.shortTitle.toLowerCase()}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Обсудить {service.shortTitle.toLowerCase()}
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#details">
                  Смотреть детали
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div style={{ y: mockupY, scale: mockupScale }}>
            <ServiceMockup service={service} Icon={Icon} />
          </motion.div>
        </div>
      </section>

      <section id="details" className="relative z-10 bg-[#f4f6fb] px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <InfoMetric icon={Clock3} label="Срок подготовки" value={service.time} />
          <InfoMetric icon={Target} label="Фокус" value="заявки, доверие, продажи" />
          <InfoMetric icon={Workflow} label="Формат" value="под бизнес-задачу" />
        </div>
      </section>

      <DetailGrid service={service} />
      <ProcessTimeline service={service} />
      <FormatsNavigator currentSlug={service.slug} />
      <FinalCTA service={service} />
    </main>
  );
}

function ServiceMockup({
  service,
  Icon,
}: {
  service: ServiceDetail;
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className={cn("absolute inset-8 rounded-full bg-gradient-to-br blur-3xl", service.accent, "opacity-25")} />
      <motion.div
        initial={{ opacity: 0, rotateX: 10, y: 34 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[8px] border border-white/16 bg-white/[0.08] p-4 shadow-[0_44px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      >
        <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#0a0a0c]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
            </div>
            <span className="text-xs font-bold text-white/40">service.detail</span>
          </div>
          <div className="relative overflow-hidden p-5">
            <div className={cn("absolute right-[-6rem] top-[-6rem] h-56 w-56 rounded-full bg-gradient-to-br blur-2xl", service.accent, "opacity-30")} />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/70">
                  {service.badge}
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">{service.shortTitle}</h2>
              </div>
              <div className={cn("grid h-14 w-14 place-items-center rounded-[8px] bg-gradient-to-br text-black shadow-orange-glow", service.accent)}>
                <Icon className="h-7 w-7" />
              </div>
            </div>
            <div className="relative mt-6 grid grid-cols-3 gap-2">
              {["Brief", "Design", "Launch"].map((item, index) => (
                <motion.div
                  key={item}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.6, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-[8px] bg-white/[0.08] p-3 text-center"
                >
                  <div className="mx-auto h-2 w-10 rounded-full bg-white/30" />
                  <p className="mt-3 text-[11px] font-black uppercase tracking-[0.12em] text-white/50">{item}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              {service.includes.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item}
                  animate={{ x: [0, 7, 0] }}
                  transition={{ duration: 4, delay: index * 0.24, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.055] px-4 py-3"
                >
                  <Check className="h-4 w-4 text-cyan-200" />
                  <span className="text-sm font-bold text-white/75">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-[8px] bg-premium-gradient p-5 text-black">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Срок</p>
              <div className="mt-2 text-3xl font-black tracking-[-0.04em]">{service.time}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      className="rounded-[8px] border border-black/5 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)]"
    >
      <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#101114] text-white">
        <Icon className="h-5 w-5 text-cyan-200" />
      </div>
      <p className="mt-8 text-sm font-black uppercase tracking-[0.16em] text-black/40">{label}</p>
      <p className="mt-3 text-2xl font-black tracking-[-0.035em] text-black">{value}</p>
    </motion.article>
  );
}

function DetailGrid({ service }: { service: ServiceDetail }) {
  return (
    <section className="relative z-10 px-4 py-16 sm:px-6">
      <div className={cn("absolute inset-x-0 top-10 h-72 bg-gradient-to-r opacity-20 blur-3xl", service.accent)} />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <DetailList title="Кому подходит" items={service.idealFor} accent="text-cyan-500" tone="cyan" />
        <DetailList title="Что входит" items={service.includes} accent="text-orange-500" tone="orange" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={reveal}
        className={cn("mx-auto mt-6 max-w-7xl overflow-hidden rounded-[8px] bg-gradient-to-br p-1 shadow-[0_24px_90px_rgba(15,23,42,0.12)]", service.accent)}
      >
        <div className="rounded-[7px] bg-white p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-black/40">Результат</p>
          <p className="mt-4 text-2xl font-black leading-9 tracking-[-0.035em] text-black/80">
            {service.result}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function DetailList({
  title,
  items,
  accent,
  tone,
}: {
  title: string;
  items: string[];
  accent: string;
  tone: "cyan" | "orange";
}) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reveal}
      className={cn(
        "rounded-[8px] border border-black/5 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)] sm:p-8",
        tone === "cyan" ? "shadow-cyan-900/10" : "shadow-orange-900/10",
      )}
    >
      <h2 className="text-3xl font-black tracking-[-0.04em] text-black">{title}</h2>
      <div className="mt-8 grid gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ delay: index * 0.04 }}
            className={cn(
              "flex gap-3 rounded-[8px] border p-4",
              tone === "cyan" ? "border-cyan-100 bg-cyan-50" : "border-orange-100 bg-orange-50",
            )}
          >
            <Sparkles className={cn("mt-0.5 h-4 w-4 shrink-0", accent)} />
            <span className="text-sm font-bold leading-6 text-black/70">{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function ProcessTimeline({ service }: { service: ServiceDetail }) {
  return (
    <section className="relative z-10 overflow-hidden bg-[#101114] px-4 py-24 text-white sm:px-6">
      <div className={cn("absolute left-0 top-0 h-80 w-full bg-gradient-to-r opacity-30 blur-3xl", service.accent)} />
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-200/75">Процесс</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Как готовим {service.shortTitle.toLowerCase()}
          </h2>
        </motion.div>
        <div className="relative mt-12 grid gap-4">
          <div className="absolute left-5 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-orange-300 via-cyan-300 to-violet-300 sm:block" />
          {service.process.map((step, index) => (
            <motion.article
              key={step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: index * 0.05 }}
              className="relative overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.08] p-5 pl-5 backdrop-blur-xl sm:pl-16"
            >
              <div className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", service.accent)} />
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-premium-gradient text-sm font-black text-black sm:absolute sm:left-0 sm:top-5 sm:mb-0">
                {index + 1}
              </span>
              <p className="text-lg font-black leading-7 text-white/80">{step}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormatsNavigator({ currentSlug }: { currentSlug: string }) {
  return (
    <section className="relative z-10 bg-[#f4f6fb] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500/80">3 формата</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-black sm:text-6xl">
            Посмотреть другие виды сайтов
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {serviceDetails.map((item, index) => (
            <motion.a
              key={item.slug}
              href={`/services/${item.slug}`}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={reveal}
              transition={{ delay: index * 0.035 }}
              className={cn(
                "group rounded-[8px] border p-5 shadow-[0_14px_50px_rgba(15,23,42,0.07)] transition hover:-translate-y-1",
                item.slug === currentSlug
                  ? "border-cyan-300 bg-white"
                  : "border-black/5 bg-white hover:border-orange-200",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em] text-black">{item.shortTitle}</h3>
                  <p className="mt-2 text-sm font-bold text-black/50">{item.time}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-black/30 transition group-hover:translate-x-1 group-hover:text-orange-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ service }: { service: ServiceDetail }) {
  return (
    <section className="relative z-10 bg-[#f4f6fb] px-4 py-20 sm:px-6 sm:pb-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={reveal}
        className={cn("mx-auto max-w-6xl rounded-[8px] bg-gradient-to-br p-8 text-center text-black shadow-[0_28px_110px_rgba(15,23,42,0.14)] sm:p-12", service.accent)}
      >
        <h2 className="mx-auto max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
          Хотите понять, подходит ли вам {service.shortTitle.toLowerCase()}?
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-black/60">
          Напишите в WhatsApp — разберём вашу нишу, задачу, сроки и предложим правильный формат сайта без лишнего функционала.
        </p>
        <Button asChild size="lg" className="mt-8 bg-premium-gradient text-black shadow-orange-glow hover:scale-[1.02]">
          <a
            href={whatsappLink(`Здравствуйте, хочу заказать ${service.shortTitle.toLowerCase()}.`)}
            target="_blank"
            rel="noreferrer"
          >
            Написать в WhatsApp
            <MessageCircle className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
