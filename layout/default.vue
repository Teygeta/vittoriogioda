<template>
  <main class="flex flex-col min-h-screen">
    <nav
      class="sticky top-0 flex items-center justify-between w-full max-w-6xl p-5 mx-auto backdrop-blur-md bg-opacity-40">
      <div>
        <ul class="flex items-center gap-10">
          <li
            class="rounded border border-transparent px-2.5 py-1.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30">
            <nuxt-link to="/">🏠 Home</nuxt-link>
          </li>
          <li
            class="rounded border border-transparent px-2.5 py-1.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30">
            <nuxt-link to="/tools">🛠 Tools</nuxt-link>
          </li>
        </ul>
      </div>

      <div>
        Black/White
      </div>
    </nav>

    <div class="flex flex-col justify-center flex-1 px-4 sm:px-8">
      <slot />
    </div>

    <footer>
      footer
    </footer>
  </main>
</template>
