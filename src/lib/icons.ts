import {
  Blocks,
  Brain,
  Code2,
  Crown,
  Database,
  Globe,
  Palette,
  Rocket,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { IconName } from '../data/profile'

export const iconMap: Record<IconName, LucideIcon> = {
  code: Code2,
  globe: Globe,
  database: Database,
  wrench: Wrench,
  palette: Palette,
  sparkles: Sparkles,
  crown: Crown,
  rocket: Rocket,
  blocks: Blocks,
  brain: Brain,
}
