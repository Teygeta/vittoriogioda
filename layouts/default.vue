<template>
  <main class="flex flex-col min-h-screen">
    <nav
      class="z-50 sticky top-0 flex items-center justify-between w-full max-w-6xl p-5 mx-auto backdrop-blur-md bg-opacity-40">
      <div>
        <ul class="flex items-center gap-8">
          <li>
            <nuxt-link
              class="rounded border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/">🏠 Home</nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="rounded border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/tools">🛠 Tools</nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="rounded border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/blog">📰 Blog</nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="rounded border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/blog">📸 Photos</nuxt-link>
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

    <footer>

    </footer>
  </main>
</template>
