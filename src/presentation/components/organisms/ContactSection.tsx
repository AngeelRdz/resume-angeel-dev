import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";
import { SocialIcon } from "@/presentation/components/atoms/SocialIcon";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

type ContactSectionProps = {
  data: HomeViewModel["contact"];
};

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <section className="rounded-4xl border border-foreground/10 bg-linear-to-br from-background via-background to-foreground/5 p-10 shadow-lg">
      <Heading as={2}>{data.title}</Heading>
      <Text className="mt-4 text-lg">{data.subtitle}</Text>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-foreground/10 p-6">
          <Text variant="caption">{data.emailLabel}</Text>
          <Text variant="body" className="mt-2 text-lg font-semibold">
            <a
              href={`mailto:${data.email}`}
              className="underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link"
              style={{ color: "var(--link-color)" }}
            >
              {data.email}
            </a>
          </Text>
        </div>
        {data.socials.length > 0 && (
          <div className="rounded-3xl border border-foreground/10 p-6">
            <Text variant="caption">{data.socialLabel}</Text>
            <ul className="mt-2 space-y-3">
              {data.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("tel:") ? undefined : "_blank"}
                    rel={social.url.startsWith("tel:") ? undefined : "noreferrer"}
                    className="flex items-center gap-3 text-sm font-medium transition-colors hover:opacity-80"
                    style={{ color: "var(--link-color)" }}
                  >
                    <div 
                      className="flex-shrink-0"
                      style={{ color: "var(--link-color)" }}
                    >
                      <SocialIcon type={social.id} size="sm" variant="icon-only" />
                    </div>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}


