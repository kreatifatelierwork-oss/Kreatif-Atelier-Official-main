import { Section } from "@/components/design/Section";
import { SectionHeader } from "@/components/design/SectionHeader";
import { clients } from "@/content/home";

/**
 * We serve clients in three time zones: the relief world map in a raised card, with a pulsing gold pin
 * at each place and its UTC offset beside it. The legend under the map carries the same facts as text
 * (and is what phones and screen readers use); the pins are decorative.
 */
export function ClientsNeu() {
  const id = `${clients.id}-heading`;
  return (
    <Section id={clients.id} labelledBy={id}>
      <SectionHeader id={id} label={clients.marker} headline={clients.headline} />
      <figure data-reveal className="tz-map neu-card mt-[var(--ds-space-7)]">
        <div className="tz-map__frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={clients.map.src} srcSet={`${clients.map.src} 1200w, ${clients.map.srcLarge} 2400w`} sizes="(min-width: 1280px) 1240px, 100vw" alt={clients.map.alt} width={clients.map.width} height={clients.map.height} loading="lazy" decoding="async" className="tz-map__img" />
          {clients.places.map((place) => (
            <span
              key={place.city}
              aria-hidden="true"
              data-label={place.label}
              data-home={"home" in place || undefined}
              className="tz-pin"
              // The pin's place on the map is data, so it is set here; everything else is in timezones.css.
              style={{ left: `${place.x}%`, top: `${place.y}%` }}
            >
              <span className="tz-pin__ring" />
              <span className="tz-pin__dot" />
              <span className="tz-pin__label">
                <span className="tz-pin__city">{place.city}</span>
                <span className="tz-pin__utc">{place.utc}</span>
              </span>
            </span>
          ))}
        </div>
        <figcaption>
          <ul className="tz-legend">
            {clients.places.map((place) => (
              <li key={place.city}>
                <span aria-hidden="true" className="tz-legend__dot" />
                <span className="font-semibold text-ds-text">
                  {place.city}, {place.country}
                </span>
                <span className="ds-label">
                  {place.utc}
                  {"note" in place && ` (${place.note})`}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </Section>
  );
}
