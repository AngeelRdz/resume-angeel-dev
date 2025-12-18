import { Badge } from "@/presentation/components/atoms/Badge";
import { Heading } from "@/presentation/components/atoms/Heading";
import { Text } from "@/presentation/components/atoms/Text";

type SkillGroupProps = {
  title: string;
  description: string;
  items: string[];
};

export function SkillGroup({ title, description, items }: SkillGroupProps) {
  return (
    <div className="rounded-3xl border border-foreground/10 p-6">
      <Heading as={4}>{title}</Heading>
      <Text variant="muted" className="mt-2">
        {description}
      </Text>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} tone="accent">{item}</Badge>
        ))}
      </div>
    </div>
  );
}


