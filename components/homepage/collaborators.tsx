"use client";

import Image from "next/image";

const bandCollabs = [
  {
    bandName: "The Rabuga",
    logo: "/the_rabuga.png",
    members: [
      { name: "Donald", role: "Jani Na", img: "/rabuga/rabuga_donald.jpg" },
      { name: "Sondip", role: "Jani Na", img: "/rabuga/rabuga_sondip.jpg" },
      { name: "Sobuj", role: "Jani Na", img: "/rabuga/rabuga_sobuj.jpg" },
      { name: "Unknown", role: "Jani Na", img: "/rabuga/rabuga_unknown.jpg" },
    ],
  },
  // {
  //   bandName: "Sacrament",
  //   logo: "/srcrament.png",
  //   members: [
  //     { name: "Member 1", role: "Jani Na", img: "/rabuga/rabuga_donald.jpg" },
  //     { name: "Member 2", role: "Jani Na", img: "/rabuga/rabuga_sondip.jpg" },
  //     { name: "Member 3", role: "Jani Na", img: "/rabuga/rabuga_sobuj.jpg" },
  //     { name: "Member 4", role: "Jani Na", img: "/rabuga/rabuga_unknown.jpg" },
  //   ],
  // },
];

export default function BandCollaboration() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10">
      {/* Header */}
      <div className="mb-12 border-l-4 border-sky-600 pl-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Band Collaborations</p>
        <h3 className="mt-2 text-3xl font-bold md:text-5xl uppercase tracking-tighter italic">
          The Lineup
        </h3>
      </div>

      {bandCollabs.map((band) => (
        <div key={band.bandName} className="mb-24 last:mb-0">
          {/* Band Logo & Divider */}
          <div className="mb-10 flex items-center gap-8">
            <div className="relative h-14 w-32 md:h-20 md:w-52 flex-shrink-0">
              <Image 
                src={band.logo} 
                alt={band.bandName} 
                fill 
                className="object-contain opacity-90 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* Members Grid - Mobile-e 2ti, Desktop-e 4ti */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {band.members.map((member, idx) => (
              <div 
                key={`${band.bandName}-${member.name}-${idx}`} 
                className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition-all duration-500 hover:border-sky-500/40"
              >
                {/* Photo with Grayscale to Color (Pure Tailwind) */}
                <div className="relative h-full w-full grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-w: 768px) 50vw, 25vw"
                  />
                </div>
                  
                {/* Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                {/* Text Content inside Image */}
                <div className="absolute inset-x-4 bottom-4 z-10 md:inset-x-6 md:bottom-6">
                  <h5 className="text-base font-bold text-white md:text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                    {member.name}
                  </h5>
                  <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white/50 md:text-xs md:tracking-[0.2em] transition-all duration-300 group-hover:text-sky-500 group-hover:-translate-y-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}