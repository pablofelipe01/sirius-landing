import { ArrowRight } from "./icons";
import { PerspectiveFlipCard } from "./ui/perspective-flip-card";

// Misión / Visión: el nombre al frente, el texto completo al girar (misma tarjeta 3D del inicio)
export function MissionVisionCard({
  label,
  text,
  front,
  back,
  accent,
}: {
  label: string;
  text: string;
  front: string;
  back: string;
  accent: string;
}) {
  return (
    <PerspectiveFlipCard
      className="min-h-80 w-full cursor-pointer sm:min-h-96"
      frontClassName={front}
      backClassName={back}
      front={
        <div className="flex size-full flex-col justify-between p-8 [transform-style:preserve-3d] sm:p-10">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase opacity-60 [transform:translateZ(40px)]">Somos Sirius</span>
          <h3 className="font-display text-5xl font-semibold sm:text-6xl [transform:translateZ(70px)]">{label}</h3>
          <span className="flex items-center gap-2 text-sm font-semibold opacity-70 [transform:translateZ(50px)]">
            Gira la tarjeta para leer <ArrowRight className="size-4" />
          </span>
        </div>
      }
      back={
        <div className="flex size-full flex-col justify-center p-8 [transform-style:preserve-3d] sm:p-10">
          <h3 className={`font-display text-2xl font-semibold [transform:translateZ(70px)] ${accent}`}>{label}</h3>
          <p className="mt-4 text-lg leading-relaxed text-white/90 [transform:translateZ(50px)]">{text}</p>
        </div>
      }
    />
  );
}
