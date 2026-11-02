import type { CategoryId } from "@/lib/categories";
import { getCategoryKoobiqIcon, getToolKoobiqIcon } from "@/lib/koobiq-tool-icons";

type Props = {
  slug: string;
  category: CategoryId;
  className?: string;
};

export function ToolIcon({ slug, category, className = "w-5 h-5" }: Props) {
  const Icon = getToolKoobiqIcon(slug, category);
  return <Icon className={className} aria-hidden />;
}

type CategoryProps = {
  category: CategoryId;
  className?: string;
};

export function CategoryIcon({ category, className = "w-5 h-5" }: CategoryProps) {
  const Icon = getCategoryKoobiqIcon(category);
  return <Icon className={className} aria-hidden />;
}
