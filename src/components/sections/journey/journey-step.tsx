import { CountUp } from "@/components/common/count-up";
import { editorialIndexLine } from "@/constants/surface-classes";

export interface JourneyStepProps {
  number: string;
  title: string;
  description: string;
}

export function JourneyStep({ number, title, description }: JourneyStepProps) {
  return (
    <article className="group ease-luxury relative flex flex-col gap-6 ps-10 transition-transform duration-700 hover:-translate-y-1 lg:ps-0 lg:pt-10">
      <span
        aria-hidden="true"
        className="border-gold-500/40 bg-background absolute start-1.5 top-1 size-3 rounded-full border lg:start-0 lg:top-0 lg:-translate-y-1/2"
      />

      <p className="flex items-center gap-4">
        <CountUp
          value={number}
          className="font-heading text-heading-md text-gold-700 italic transition-colors duration-700 group-hover:text-gold-600"
        />
        <span aria-hidden="true" className={editorialIndexLine} />
      </p>

      <div className="flex flex-col gap-4">
        <h3 className="font-body text-heading-xl sm:text-display-sm tracking-tight text-neutral-950">{title}</h3>
        <p className="text-body-md text-foreground-muted max-w-[36ch] leading-[1.75]">{description}</p>
      </div>
    </article>
  );
}
