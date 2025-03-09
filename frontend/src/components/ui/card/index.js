import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const Card = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class) }, slots)
  },
})

const CardHeader = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn('flex flex-col space-y-1.5 p-6', props.class) }, slots)
  },
})

const CardTitle = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
    as: {
      type: String,
      default: 'h3',
    },
  },
  setup(props, { slots }) {
    return () => h(props.as, { class: cn('text-2xl font-semibold leading-none tracking-tight', props.class) }, slots)
  },
})

const CardDescription = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h('p', { class: cn('text-sm text-muted-foreground', props.class) }, slots)
  },
})

const CardContent = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn('p-6 pt-0', props.class) }, slots)
  },
})

const CardFooter = defineComponent({
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots }) {
    return () => h('div', { class: cn('flex items-center p-6 pt-0', props.class) }, slots)
  },
})

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } 