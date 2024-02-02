<script setup lang="ts">
import { BookOpen, Github, Home, Loader2, Mail, Linkedin } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()
const { $trpc } = useNuxtApp()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    description: z.string().optional(),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const emailAlreadySent = computed(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('emailSent') === 'true'
  }

  return false
})

const emailDialogisOpen = ref(false)
const submitting = ref(false)

const sendEmail = handleSubmit(async (values) => {
  try {
    submitting.value = true

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('emailSent') === 'true') {
        submitting.value = false
        return
      }
    }

    await $trpc.user.resend.sendEmail.query({
      email: values.email,
      description: values.description,
    })

    if (typeof window !== 'undefined') {
      localStorage.setItem('emailSent', 'true')
    }

    submitting.value = false
    emailDialogisOpen.value = false

    toast({
      title: 'Email inviata',
      description: 'Grazie per avermi contattato, ti risponderò al più presto!',
    })
  }
  catch (e: any) {
    toast({
      title: '❌Error',
      description: e.message,
    })
  }
})
</script>

<template>
  <div>
    <main class="flex flex-col justify-between min-h-screen">
      <nav
        class="sticky top-0 z-50 flex items-center justify-between w-full max-w-6xl p-5 mx-auto backdrop-blur-md bg-opacity-40">
        <div>
          <ul class="flex items-center gap-8">
            <li>
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-200 dark:bg-neutral-800/70': isExactActive }" @click="navigate">
                  <Home :size="20" :stroke-width="2.2" />
                  <span class="hidden sm:inline-block">
                    Home
                  </span>
                </Button>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/blog">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-200 dark:bg-neutral-800/70': isExactActive }" @click="navigate">
                  <BookOpen :size="20" :stroke-width="2.2" />
                  <span class="hidden sm:inline-block">
                    Blog
                  </span>
                </Button>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <ToggleLightDarkButton />
        </div>
      </nav>

      <div class="flex flex-col justify-center flex-1 px-4 sm:px-8">
        <slot />
      </div>

      <footer class="flex justify-center py-5 z-10">
        <div>
          <Dialog :open="emailDialogisOpen">
            <DialogTrigger>
              <Button variant="ghost" class="w-fit mx-auto mt-10" @click="emailDialogisOpen = true">
                <Mail :size="20" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contatto</DialogTitle>
                <DialogDescription>
                  <template v-if="!emailAlreadySent">
                    Scrivi la un mail alla quale vuoi essere ricontattato e specifica in poche parole il motivo (bastano
                    2-5 parole)
                  </template>
                  <template v-else>
                    Grazie per avermi contattato, ti risponderò al più presto!
                  </template>
                </DialogDescription>
              </DialogHeader>

              <template v-if="!emailAlreadySent">
                <form class="space-y-6" @submit="sendEmail">
                  <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Inserisci la tua email" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                      <FormLabel>Motivo (opzionale)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Breve motivo" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </Form>
              </template>
              <DialogFooter as-child class="flex gap-2">
                <Button v-if="!emailAlreadySent" type="submit" @click="sendEmail">
                  <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="[submitting ? '' : 'hidden']" />
                  Invia
                </Button>
                <Button variant="ghost" class="w-fit mx-auto mt-10" @click="emailDialogisOpen = false">
                  Chiudi
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" class="w-fit mx-auto mt-10" as-child>
            <a href="https://www.github.com/Teygeta" target="_blank">
              <Github :size="20" />
            </a>
          </Button>

          <Button variant="ghost" class="w-fit mx-auto mt-10" as-child>
            <a href="https://www.linkedin.com/in/vittorio-gioda" target="_blank">
              <Linkedin :size="20" />
            </a>
          </Button>
        </div>
      </footer>
    </main>
  </div>
</template>
