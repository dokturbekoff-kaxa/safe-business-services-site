"use client";

import {
  advantages,
  cases,
  developmentChecklist,
  extraServices,
  faqItems,
  footerContacts,
  heroStats,
  navItems,
  pricingPlans,
  processSteps,
  services,
} from "@/data/site-content";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, whatsappLink, whatsappMessages, whatsappUrl } from "@/lib/utils";
import { ArrowRight, Check, ChevronRight, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const viewport = { once: true, margin: "-90px" };
const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0 },
};

function useAdaptiveHeaderTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      const probeY = Math.min(112, window.innerHeight - 1);
      let element = document.elementFromPoint(window.innerWidth / 2, probeY) as HTMLElement | null;

      while (element && element !== document.body) {
        const sectionTheme = element.dataset.headerTheme;

        if (sectionTheme === "light" || sectionTheme === "dark") {
          setTheme(sectionTheme);
          return;
        }

        element = element.parentElement;
      }

      setTheme("light");
    };

    updateTheme();
    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  return theme;
}

export function LandingPage() {
  return (
    <main className="bg-[#f5f5f7] text-[#1d1d1f]">
      <SiteHeader />
      <HeroSection />
      <HighlightsSection />
      <StickySystemSection />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <CasesSection />
      <PricingSection />
      <ExtrasSection />
      <FAQSection />
      <FinalCTASection />
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerTheme = useAdaptiveHeaderTheme();
  const onDark = headerTheme === "dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-300",
        onDark ? "border-white/10 bg-black/60 text-white" : "border-black/10 bg-white/80 text-black",
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className={cn("grid h-7 w-7 place-items-center rounded-full transition-colors", onDark ? "bg-white text-black" : "bg-black text-white")}>
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          Safe Business Services
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs font-medium transition-colors",
                onDark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          className={cn(
            "hidden h-8 px-4 text-xs md:inline-flex",
            onDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/80",
          )}
        >
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Консультация
          </a>
        </Button>
        <button
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full transition-colors md:hidden",
            onDark ? "bg-white text-black" : "bg-black text-white",
          )}
          onClick={() => setOpen((value) => !value)}
          aria-label="Меню"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "grid gap-1 border-t px-4 py-3 md:hidden",
            onDark ? "border-white/10 bg-black text-white" : "border-black/10 bg-white text-black",
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-[8px] px-3 py-3 text-sm font-semibold transition-colors",
                onDark ? "text-white/75 hover:bg-white/[0.08]" : "text-black/70 hover:bg-black/[0.04]",
              )}
            >
              {item.label}
            </a>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mockupScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.84], [1, 0]);

  return (
    <section id="home" ref={ref} data-header-theme="light" className="relative min-h-[128vh] overflow-hidden px-4 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mx-auto max-w-6xl text-center"
      >
        <p className="text-sm font-bold text-black/56">Safe Business Services</p>
        <h1 className="mx-auto mt-4 max-w-7xl text-balance text-[4.2rem] font-black leading-[0.82] tracking-[-0.075em] sm:text-[8.5rem] lg:text-[12rem] xl:text-[14rem]">
          Разработка
          <br className="hidden sm:block" /> сайтов
        </h1>
        <p className="mx-auto mt-7 max-w-4xl text-balance text-xl font-bold leading-8 text-black/62 sm:text-2xl">
          Создаём сайты, которые не просто выглядят красиво — а продают. Лендинги,
          корпоративные сайты и интернет-магазины для бизнеса.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-[#0071e3] text-white hover:bg-[#0077ed]">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              Обсудить проект
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="text-[#0066cc] hover:bg-transparent hover:text-[#004f9f]">
            <a href="#services">
              Посмотреть услуги
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div style={{ scale: mockupScale, y: mockupY, opacity: mockupOpacity }} className="sticky top-20 mx-auto -mt-4 max-w-6xl">
        <ProductMockup />
      </motion.div>
    </section>
  );
}

function ProductMockup() {
  return (
    <div className="relative mx-auto aspect-[1.45] max-h-[620px] w-full max-w-6xl">
      <div className="absolute inset-x-[8%] bottom-[2%] h-[18%] rounded-[50%] bg-black/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 26, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 rounded-[34px] border border-black/10 bg-[#111] p-[1.2%] shadow-[0_50px_160px_rgba(0,0,0,0.28)]"
      >
        <div className="h-full overflow-hidden rounded-[26px] bg-[#fbfbfd]">
          <div className="grid h-full grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between bg-[#f5f5f7] p-6 sm:p-10">
              <div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <h2 className="mt-10 text-4xl font-black tracking-[-0.045em] text-black sm:text-6xl">
                  Business
                  <br />
                  website
                </h2>
                <p className="mt-5 max-w-sm text-lg font-bold leading-7 text-black/52">
                  Упаковка, доверие, заявки и аналитика в одной системе.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {heroStats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="rounded-[18px] bg-white p-4 shadow-sm">
                    <div className="text-2xl font-black tracking-[-0.04em]">
                      {stat.value.toLocaleString("ru-RU")}
                      {stat.suffix}
                    </div>
                    <div className="mt-1 text-xs text-black/45">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden bg-black p-5 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,113,227,0.44),transparent_34%),radial-gradient(circle_at_84%_78%,rgba(255,149,0,0.34),transparent_32%)]" />
              <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-4">
                <div className="flex items-center justify-between rounded-[22px] bg-white/10 p-4 text-white backdrop-blur-xl">
                  <span className="text-sm font-bold">Live dashboard</span>
                  <span className="rounded-full bg-[#34c759] px-3 py-1 text-xs font-black text-black">online</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white p-5 text-black">
                    <p className="text-sm font-bold text-black/45">Заявки</p>
                    <div className="mt-3 text-5xl font-black tracking-[-0.05em]">+42</div>
                    <div className="mt-6 h-3 rounded-full bg-black/10">
                      <motion.div
                        className="h-3 rounded-full bg-[#0071e3]"
                        animate={{ width: ["42%", "86%", "64%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <div className="rounded-[24px] bg-white/12 p-5 text-white backdrop-blur-xl">
                    <p className="text-sm font-bold text-white/50">Сценарии</p>
                    <div className="mt-4 grid gap-3">
                      {["WhatsApp", "Форма заявки", "Аналитика"].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded-full bg-white/10 px-4 py-3">
                          <span className="text-sm">{item}</span>
                          <Check className="h-4 w-4 text-[#34c759]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-end gap-2 rounded-[24px] bg-white/10 p-5 backdrop-blur-xl">
                  {[40, 56, 48, 74, 62, 92, 80].map((height, index) => (
                    <motion.div
                      key={index}
                      className="rounded-full bg-gradient-to-t from-[#ff9500] to-[#5ac8fa]"
                      animate={{ height: [height * 0.7, height, height * 0.82] }}
                      transition={{ duration: 3.8, delay: index * 0.08, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HighlightsSection() {
  const items = [
    ["Маркетинговая структура", "Каждый блок ведёт к заявке: оффер, доверие, доказательства, сценарии и CTA.", "bg-[#0071e3]"],
    ["Премиальный UI/UX", "Не шаблон, а визуальная система, которая показывает уровень компании с первых секунд.", "bg-[#ff9500]"],
    ["Система продаж", "WhatsApp, формы заявок и аналитика подключаются как единый поток.", "bg-white"],
  ] as const;

  return (
    <section data-header-theme="dark" className="bg-black px-4 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Highlights" title="Всё, что должно продавать, собрано в одном сайте." dark />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map(([title, text, color], index) => (
            <motion.article
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={reveal}
              transition={{ delay: index * 0.08 }}
              className="min-h-[430px] overflow-hidden rounded-[32px] bg-[#1d1d1f] p-7"
            >
              <div className={cn("mb-16 h-16 w-16 rounded-full", color)} />
              <h3 className="text-3xl font-black tracking-[-0.04em]">{title}</h3>
              <p className="mt-5 text-lg font-bold leading-8 text-white/58">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickySystemSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.04, 0.93]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section ref={ref} data-header-theme="light" className="relative min-h-[150vh] bg-[#f5f5f7] px-4 py-24">
      <div className="sticky top-20 mx-auto max-w-6xl">
        <motion.div style={{ scale, rotate }} className="rounded-[40px] bg-white p-5 shadow-[0_40px_120px_rgba(0,0,0,0.12)]">
          <div className="overflow-hidden rounded-[30px] bg-black text-white">
            <div className="grid min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#5ac8fa]">Strategy first</p>
                <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">
                  Не страница.
                  <br />
                  Бизнес-инструмент.
                </h2>
                <p className="mt-7 text-xl font-bold leading-8 text-white/58">
                  Сайт работает 24/7: объясняет, вызывает доверие, собирает заявки,
                  помогает рекламе и ведёт клиента к понятному действию.
                </p>
              </div>
              <div className="relative flex items-center justify-center overflow-hidden p-8">
                <div className="absolute h-[32rem] w-[32rem] rounded-full bg-[#0071e3]/30 blur-3xl" />
                <div className="relative grid w-full max-w-xl gap-4">
                  {developmentChecklist.slice(0, 6).map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 70 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-4 rounded-[22px] bg-white/12 p-4 backdrop-blur-xl"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-black">
                        {index + 1}
                      </span>
                      <span className="font-bold">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" data-header-theme="light" className="bg-white px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Услуги" title="Выберите формат. Мы соберём систему под задачу." />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={reveal}
              transition={{ delay: index * 0.04 }}
              className="group min-h-[300px] rounded-[30px] bg-[#f5f5f7] p-7 transition duration-300 hover:-translate-y-1 hover:bg-[#ececf0]"
            >
              <service.icon className="h-8 w-8 text-[#0071e3]" />
              <h3 className="mt-16 text-3xl font-black tracking-[-0.045em]">{service.title}</h3>
              <p className="mt-4 text-lg font-bold leading-7 text-black/55">{service.text}</p>
              <a href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#0066cc]">
                Подробнее
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section data-header-theme="light" className="bg-[#f5f5f7] px-4 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-black/42">Почему нужен сайт</p>
          <h2 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-7xl">
            Instagram и WhatsApp помогают. Сайт усиливает.
          </h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="rounded-[34px] bg-white p-8 shadow-sm sm:p-12">
          <p className="text-2xl font-bold leading-10 text-black/66">
            Сайт собирает заявки, показывает уровень компании, объясняет продукт и работает
            24/7. Клиенту проще принять решение, а реклама ведёт не просто в чат, а в
            продуманную презентацию бизнеса.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {advantages.slice(0, 6).map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-full bg-[#f5f5f7] px-4 py-3">
                <item.icon className="h-4 w-4 text-[#0071e3]" />
                <span className="text-sm font-bold text-black/68">{item.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" data-header-theme="dark" className="bg-black px-4 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Процесс" title="Пять шагов. Без хаоса. С понятной логикой запуска." dark />
        <div className="mt-14 grid gap-5">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              className="grid gap-6 rounded-[30px] bg-[#1d1d1f] p-7 md:grid-cols-[120px_1fr] md:p-10"
            >
              <div className="text-6xl font-black tracking-[-0.06em] text-white/18">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-3xl font-black tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-3 text-xl font-bold leading-8 text-white/55">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesSection() {
  return (
    <section id="cases" data-header-theme="light" className="bg-[#f5f5f7] px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Кейсы" title="Три примера сайтов, которые можно открыть и посмотреть." />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={reveal}
          className="mt-8 overflow-hidden rounded-[30px] bg-black p-[1px] shadow-[0_24px_90px_rgba(15,23,42,0.14)]"
        >
          <div className="relative rounded-[29px] bg-black px-6 py-7 text-white sm:px-8">
            <div className="absolute inset-0 rounded-[29px] bg-[radial-gradient(circle_at_18%_20%,rgba(90,200,250,0.34),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,149,0,0.28),transparent_30%),radial-gradient(circle_at_74%_86%,rgba(191,90,242,0.26),transparent_36%)]" />
            <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Не ограничиваемся шаблонами</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] sm:text-4xl">
                  Делаем любой формат: от простого сайта до многофункциональной digital-системы.
                </h3>
              </div>
              <p className="text-sm font-bold leading-7 text-white/62 sm:text-base">
                Лендинги, корпоративные сайты, интернет-магазины, CRM, веб-приложения, личные кабинеты, AI-ассистенты и мобильные приложения — под задачу бизнеса, рекламу и рост.
              </p>
            </div>
          </div>
        </motion.div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cases.map((item) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={reveal}
              className="group overflow-hidden rounded-[34px] bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(15,23,42,0.12)]"
            >
              <div className={cn("relative h-72 overflow-hidden bg-gradient-to-br p-4", item.accent)}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.28),transparent_36%)]" />
                <div className="relative h-full overflow-hidden rounded-[26px] border border-white/40 bg-white/20 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-700 group-hover:scale-[1.035]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-white/8" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full bg-black/54 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                    <span>{item.type}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="p-7 sm:p-9">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0071e3]">{item.type}</p>
                <h3 className="text-3xl font-black tracking-[-0.045em]">{item.title}</h3>
                <CaseLine label="Задача" text={item.task} />
                <CaseLine label="Решение" text={item.solution} />
                <CaseLine label="Результат" text={item.result} />
                <Button asChild className="mt-7 w-full bg-black text-white hover:bg-black/85">
                  <a href={item.href}>
                    Посмотреть
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" data-header-theme="light" className="bg-white px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Тарифы" title="Стоимость рассчитывается после обсуждения проекта." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className={cn("flex min-h-[560px] flex-col rounded-[34px] bg-[#f5f5f7] p-7", plan.highlighted && "bg-black text-white")}>
              <p className={cn("text-sm font-black uppercase tracking-[0.18em] text-black/42", plan.highlighted && "text-white/42")}>{plan.name}</p>
              <h3 className="mt-5 text-4xl font-black tracking-[-0.05em]">{plan.caption}</h3>
              <p className={cn("mt-5 text-lg font-bold leading-8 text-black/55", plan.highlighted && "text-white/58")}>
                Стоимость рассчитывается после обсуждения проекта
              </p>
              <ul className="mt-9 grid gap-4">
                {plan.features.map((feature) => (
                  <li key={feature} className={cn("flex gap-3 text-sm font-bold text-black/68", plan.highlighted && "text-white/70")}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0071e3]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className={cn("mt-auto", plan.highlighted ? "bg-white text-black hover:bg-white/90" : "bg-[#0071e3] text-white hover:bg-[#0077ed]")}>
                <a
                  href={whatsappLink(`${whatsappMessages.price} Формат: ${plan.caption}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Узнать стоимость
                </a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExtrasSection() {
  return (
    <section data-header-theme="light" className="bg-[#f5f5f7] px-4 py-24">
      <div className="mx-auto max-w-6xl rounded-[38px] bg-white p-8 shadow-sm sm:p-12">
        <SectionTitle eyebrow="Digital-система" title="Дополнительно усилим сайт рекламой и автоматизацией." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {extraServices.map((item) => (
            <div key={item.title} className="rounded-full bg-[#f5f5f7] px-5 py-4 text-sm font-black text-black/68">
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" data-header-theme="light" className="bg-white px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionTitle eyebrow="FAQ" title="Ответы на частые вопросы." />
        <div className="mt-10 rounded-[30px] bg-[#f5f5f7] px-6">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-black/10">
                <AccordionTrigger className="text-black hover:text-black/70">{item.question}</AccordionTrigger>
                <AccordionContent className="text-black/58">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section data-header-theme="dark" className="bg-black px-4 py-24 text-white sm:py-32">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal} className="mx-auto max-w-5xl text-center">
        <h2 className="text-balance text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">
          Хотите сайт, который выглядит дорого и помогает продавать?
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-xl font-bold leading-8 text-white/58">
          Напишите нам в WhatsApp — разберём вашу нишу, предложим структуру сайта и
          подскажем, какой формат подойдёт вашему бизнесу.
        </p>
        <Button asChild size="lg" className="mt-9 bg-white text-black hover:bg-white/90">
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Написать в WhatsApp
            <MessageCircle className="h-4 w-4" />
          </a>
        </Button>
      </motion.div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-black px-4 pb-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-white/12 pt-8 text-sm text-white/52 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-bold text-white">Safe Business Services</div>
          <p className="mt-2">Разработка сайтов и digital-систем для бизнеса</p>
        </div>
        <div className="grid gap-2 md:text-right">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-white">
            WhatsApp: {footerContacts.whatsapp}
          </a>
          <a href="https://instagram.com/dokturbekoff" target="_blank" rel="noreferrer" className="hover:text-white">
            Instagram: {footerContacts.instagram}
          </a>
          <a href={`mailto:${footerContacts.email}`} className="hover:text-white">
            Email: {footerContacts.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={reveal}>
      <p className={cn("text-sm font-black uppercase tracking-[0.18em]", dark ? "text-white/42" : "text-black/42")}>{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-7xl">
        {title}
      </h2>
    </motion.div>
  );
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <p className="mt-4 text-base font-bold leading-7 text-black/58">
      <span className="text-black">{label}: </span>
      {text}
    </p>
  );
}
