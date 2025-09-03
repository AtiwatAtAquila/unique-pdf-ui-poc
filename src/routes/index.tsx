import { createFileRoute } from '@tanstack/react-router'
import DesignerApp from './designer'

export const Route = createFileRoute("/")({
  component: DesignerApp,
})

