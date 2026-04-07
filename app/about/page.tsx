"use client";

import { useState } from "react";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";
import Image from "next/image";
import Link from "next/link";

type Milestone = {
  date: string;
  title: string;
  description: string;
  image: string;
  cta?: {
    label: string;
    href: string;
  };
};

type TeamMember = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const milestones: Milestone[] = [
  {
    date: "December 2021",
    title: "First Wangala",
    description: "Liquid launched its first product through Wangala.",
    image: "/about/wangala.jpg",
  },
  {
    date: "December 2021",
    title: '"Boom! Ganna Goes Viral!"',
    description: "Ganna T-shirt became a signature.",
    image: "/gallery/model_3.jpg",
  },
  {
    date: "November 2023",
    title: "Collaboration with Artists",
    description: "Liquid x the rabuga",
    image: "/rabuga/rabuga_team.jpg",
  },
  {
    date: "October 2024",
    title: "Landing an investment",
    description: "We got our first landing investment for Liquid.",
    image: "/about/investment.jpg",
  },
  {
    date: "Today",
    title: "Fashion Brand",
    description: "Setting home in a limited cloud.",
    image: "/gallery/model_4.jpg",
    cta: {
      label: "Shop with Purpose",
      href: "/shop",
    },
  },
];

const team: TeamMember[] = [
  {
    name: "Dingjan Chisim",
    role: "Founder & Operations Manager",
    quote: "Love to create.",
    image: "/about/dingjan.jpg",
  },
  {
    name: "Ullas Ignatius Sku",
    role: "Creative Consultant",
    quote:
      "Somehow it feels like I just got my very first pokemon and am about to start the epic journey to catch 'em all.",
    image: "/about/ullas.jpg",
  },
  {
    name: "Rackshi Ritchil",
    role: "Idea & Planning",
    quote:
      "Once you embrace the beauty of simplicity know that you have reached the wisdom of your life.",
    image: "/about/rackshi_ritchil.jpg",
  },
];

function SectionDivider() {
  return <div className="w-full border-t border-white/10" />;
}

function MilestoneGallery({ milestones }: { milestones: Milestone[] }) {
  const [activeMilestone, setActiveMilestone] = useState(0);

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden">
        <div
          className="whitespace-nowrap text-[180px] font-black italic leading-none tracking-tighter text-white/[0.03] opacity-0 transition-all duration-1000 ease-in-out md:text-[320px] md:opacity-100"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            filter: "blur(2px)",
            transform: `translate(${-50 + activeMilestone * -5}%, -50%)`,
          }}
        >
          {milestones[activeMilestone].date.split(" ").slice(-1)[0]}
        </div>
      </div>

      <div className="relative z-10 grid h-auto grid-cols-1 items-stretch gap-8 lg:h-[560px] lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.05fr_0.95fr]">
        <div className="scroller-hide relative overflow-y-auto rounded-l-[8px] border-l border-white/5 bg-neutral-950/20">
          <style jsx>{`
            .scroller-hide::-webkit-scrollbar {
              display: none;
            }
            .scroller-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>

          {milestones.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveMilestone(index)}
              className={`group relative cursor-pointer border-b border-white/5 px-6 py-7 transition-all duration-500 md:px-7 md:py-8 ${activeMilestone === index
                  ? "bg-white/[0.02]"
                  : "hover:bg-white/[0.01]"
                }`}
            >
              <div
                className={`absolute bottom-0 left-0 top-0 w-[2px] bg-[#2f7ea1] transition-all duration-500 ${activeMilestone === index
                    ? "scale-y-100 opacity-100"
                    : "scale-y-0 opacity-0"
                  }`}
              />

              <div className="flex flex-col gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-500 ${activeMilestone === index
                      ? "text-[#2f7ea1]"
                      : "text-white/20"
                    }`}
                >
                  {item.date}
                </span>

                <h4
                  className={`max-w-[520px] text-[20px] font-black leading-[1.02] tracking-tight transition-all duration-500 md:text-[28px] xl:text-[32px] ${activeMilestone === index
                      ? "translate-x-3 text-white"
                      : "text-white/40 group-hover:text-white/60"
                    }`}
                >
                  {item.title}
                </h4>
              </div>

              <div
                className={`max-w-[500px] overflow-hidden transition-all duration-700 ease-out ${activeMilestone === index
                    ? "mt-5 max-h-[220px] translate-x-3 opacity-100"
                    : "max-h-0 translate-x-0 opacity-0"
                  }`}
              >
                <p className="text-[14px] leading-relaxed text-white/50 md:text-[15px]">
                  {item.description}
                </p>

                {item.cta && (
                  <Link
                    href={item.cta.href}
                    className="group/link mt-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2f7ea1] transition-all hover:text-white"
                  >
                    <span>{item.cta.label}</span>
                    <div className="h-px w-8 bg-[#2f7ea1] transition-all duration-300 group-hover/link:w-12" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden h-full lg:block">
          <div className="group/image relative h-full w-full overflow-hidden rounded-[8px] border border-white/10 bg-neutral-950 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            {milestones.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${activeMilestone === index
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-8 scale-[1.06] opacity-0"
                  }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain bg-neutral-950 transition-transform duration-[1800ms] group-hover/image:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent opacity-60" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 px-2 lg:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[8px] border border-white/10 bg-neutral-950">
            <Image
              src={milestones[activeMilestone].image}
              alt={milestones[activeMilestone].title}
              fill
              className="object-contain bg-neutral-950 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  useGsapAnimations();

  return (
    <div className="flex flex-col bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] min-h-[400px] w-full items-center justify-center overflow-hidden border-b border-white/5 bg-neutral-950">
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            src="/pattern.jpg"
            alt="Indigenous Patterns Background"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-neutral-950" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 text-center">
          <div className="hero-fade mb-6 inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            Crafting Identity
          </div>

          <h1 className="hero-fade mb-8 text-4xl font-black leading-[0.9] tracking-tighter md:text-7xl">
            THE FABRIC <br />
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
              OF OUR ROOTS.
            </span>
          </h1>

          <p className="hero-fade mx-auto max-w-2xl text-base font-medium leading-relaxed text-neutral-400 md:text-lg">
            Where indigenous traditions flow into fashion.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 md:py-14">
        {/* Story Section */}
        <section className="py-6 md:py-8">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative min-h-[520px] overflow-hidden rounded-[4px] border border-white/10 order-1">
              <Image
                src="/about/about-us.jpg"
                alt="The Beginning of Liquid"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center order-2">
              <div>
                <h2 className="text-[30px] font-semibold leading-[1.05] tracking-tight text-white md:text-[42px]">
                  From Thought to Thread: The Beginning of Liquid
                </h2>

                <div className="mt-6 space-y-4 text-[13px] leading-6 text-white/70 md:text-[14px]">
                  <p>
                    It all began during COVID — just me and a book on garo traditions. As I read, I started noticing
                    contradictions and, more troublingly, factual inaccuracies. It was a wake up call. I realized if
                    our generation fails to preserve the correct cultural knowledge then it will be lost from the face
                    of the earth. It grew a deep sense of responsibility inside me. I knew I had to do something – that’s
                    when the concept of “Liquid” was born.
                  </p>
                  <p>
                    I know I can’t do everything — preserving and promoting an entire culture isn’t a one-person task.
                    But what I can do is start from where I am, and do my part to preserve and promote it in my own way.
                    at’s when <span className="text-white">"Liquid"</span>{" "} is created as a platform for cultural
                    preservation via fashion and storytelling.
                  </p>
                  <p>
                    So, I started small — designing sourcing from indigenous artisans, blending modern silhouettes with
                    ancestral soul. Every thread told a story. Every garment became a bridge between the past and the present.
                  </p>
                  <p>
                    Today, I look back with gratitude — and forward with vision — as we continue to dress the world in stories that matter.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-[13px] leading-6 text-white/80">
                <p className="font-medium text-white">Dingjan Chisim</p>
                <p className="text-white/50">Founder</p>
              </div>
            </div>
          </div>
        </section>

        <div className="my-10 md:my-14">
          <SectionDivider />
        </div>

        {/* Journey Title */}
        <section className="py-2 text-center">
          <h3 className="text-[20px] font-medium tracking-tight text-white/90 md:text-[28px]">
            Here&apos;s what we&apos;ve accomplished together so far:
          </h3>
        </section>

        <div className="my-10 md:my-14">
          <SectionDivider />
        </div>

        {/* Timeline Section */}
        <MilestoneGallery milestones={milestones} />

        <div className="my-10 md:my-14">
          <SectionDivider />
        </div>

        {/* Team Title */}
        <section className="py-2 text-center">
          <h3 className="text-[24px] font-medium tracking-tight text-white md:text-[36px]">
            Team Liquid
          </h3>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col group text-center">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[4px] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                </div>

                <div className="mt-8 flex flex-col items-center text-center px-2">
                  <h4 className="text-[22px] font-bold tracking-tight text-white">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[#2f7ea1]">
                    {member.role}
                  </p>
                  <div className="mt-4 h-px w-8 bg-white/20" />
                  <p className="mt-5 text-[14px] leading-relaxed text-white/60 font-medium italic">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}