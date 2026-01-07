<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { getRoleRoute } from "~/utils/constants";

definePageMeta({
  layout: "default",
  middleware: [],
});

const authStore = useAuthStore();

const howItWorksSteps = [
  {
    title: "Create your school space",
    description:
      "Set up a dedicated workspace for your driving school in minutes, with separate access for admins, instructors, and students.",
  },
  {
    title: "Build tests & tutorials",
    description:
      "Create question banks, tests, and learning tutorials tailored to your curriculum and local traffic rules.",
  },
  {
    title: "Invite students",
    description:
      "Onboard students to your school portal so they can practice, take exams, and track their own progress online.",
  },
  {
    title: "Track results & analytics",
    description:
      "Monitor performance with rich analytics across schools, groups, and individual students in real time.",
  },
];

const features = [
  {
    title: "Multi-tenant architecture",
    description:
      "Serve many driving schools from one platform while keeping data strictly isolated between tenants.",
  },
  {
    title: "Powerful question bank",
    description:
      "Manage hundreds of questions with rich metadata, categories, and reusable templates.",
  },
  {
    title: "Practice & exam modes",
    description:
      "Simulate real exam conditions or run unlimited practice sessions with instant feedback.",
  },
  {
    title: "Built-in tutorials",
    description:
      "Publish structured tutorials and learning paths that connect directly to your test content.",
  },
  {
    title: "Real-time analytics",
    description:
      "Understand where students struggle, measure group performance, and improve your curriculum with data.",
  },
  {
    title: "Role-based access",
    description:
      "Separate dashboards for superadmins, school admins, instructors, and students keep everyone focused.",
  },
];

const personas = [
  {
    title: "Driving school owners",
    description:
      "Standardize exams across branches, control question quality, and see business-wide performance at a glance.",
  },
  {
    title: "Instructors",
    description:
      "Assign targeted tests and tutorials, track class progress, and prepare students for official exams.",
  },
  {
    title: "Students",
    description:
      "Practice anytime, see detailed explanations, and build confidence before your driving theory exam.",
  },
];

const stats = [
  {
    label: "Questions ready to use",
    value: "500+",
  },
  {
    label: "Practice tests completed",
    value: "10k+",
  },
  {
    label: "Driving schools supported",
    value: "Multi-tenant",
  },
];

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    try {
      await authStore.fetchUser();
    } catch {
      return;
    }
  }

  if (authStore.isAuthenticated && authStore.user) {
    const route = getRoleRoute(authStore.user.role);
    await navigateTo(route);
  }
});
</script>

<template>
  <div class="min-h-screen text-gray-900 dark:text-gray-100">
    <!-- Landing header -->
    <header
      class="border-b sticky z-50 top-0 border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/80 backdrop-blur"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6"
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-600 text-xs font-semibold text-white"
          >
            EDU
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold"> EDU Autotest </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              Driving school testing platform
            </span>
          </div>
        </NuxtLink>

        <nav
          class="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300"
        >
          <NuxtLink
            to="#how-it-works"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            How it works
          </NuxtLink>
          <NuxtLink
            to="#features"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Features
          </NuxtLink>
          <NuxtLink
            to="#personas"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            For schools
          </NuxtLink>
          <NuxtLink
            to="#get-started"
            class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Get started
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <UButton to="/login" size="sm" variant="ghost"> Pricing </UButton>
          <UButton to="/login" size="sm"> Sign in </UButton>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="w-full max-w-7xl mx-auto px-4 my-24">
      <div class="grid gap-12 lg:grid-cols-2 items-center">
        <div class="space-y-6">
          <p
            class="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-200 ring-1 ring-primary-100 dark:ring-primary-900/60"
          >
            EDU Autotest · Multi-tenant driving school platform
          </p>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Modern testing platform
            <span class="block text-primary-600 dark:text-primary-400">
              for driving schools
            </span>
          </h1>

          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
          >
            Centralize theory exams, practice tests, and learning content for
            all of your driving schools in one powerful platform.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <UButton to="/login" size="lg"> Sign in to your school </UButton>

            <UButton
              variant="ghost"
              size="lg"
              color="primary"
              to="#how-it-works"
            >
              Learn how it works
            </UButton>
          </div>
        </div>

        <div class="relative">
          <div
            class="absolute -inset-4 rounded-3xl bg-linear-to-tr from-primary-500/10 via-emerald-500/5 to-transparent blur-2xl"
          />
          <UCard
            class="relative overflow-hidden bg-gray-900/95 border border-gray-800 shadow-xl shadow-black/40"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-sm font-medium text-gray-400">
                    Today&apos;s overview
                  </p>
                  <p class="text-lg font-semibold text-white">
                    EDU Autotest dashboard
                  </p>
                </div>
                <span
                  class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                >
                  Stable
                </span>
              </div>
              <dl class="grid grid-cols-3 gap-4 text-sm">
                <div class="rounded-xl bg-slate-800/80 p-3">
                  <dt class="text-slate-300/80">Active tests</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">24</dd>
                </div>
                <div class="rounded-xl bg-slate-800/80 p-3">
                  <dt class="text-slate-300/80">Students today</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">180</dd>
                </div>
                <div class="rounded-xl bg-slate-800/80 p-3">
                  <dt class="text-slate-300/80">Avg. score</dt>
                  <dd class="mt-1 text-xl font-semibold text-white">82%</dd>
                </div>
              </dl>
              <div
                class="mt-2 rounded-xl border border-dashed border-slate-700 bg-slate-900/80 p-4 text-xs text-slate-200/80"
              >
                Preview of the admin analytics dashboard for your schools.
                Actual data is available after you sign in.
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- How it works -->
    <section id="how-it-works" class="w-full max-w-7xl mx-auto px-4 my-24">
      <div class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
            How EDU Autotest works
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
            From onboarding to analytics, the platform mirrors the way modern
            driving schools operate, while keeping setup simple.
          </p>
        </div>

        <ol class="grid gap-6 md:grid-cols-2">
          <li
            v-for="(step, index) in howItWorksSteps"
            :key="step.title"
            class="relative flex gap-4 rounded-2xl bg-white dark:bg-gray-900/60 p-5 shadow-sm"
          >
            <div
              class="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white"
            >
              {{ index + 1 }}
            </div>
            <div class="space-y-1.5">
              <h3 class="text-base font-semibold">
                {{ step.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <USeparator />

    <!-- Features / benefits -->
    <section id="features" class="w-full max-w-7xl mx-auto px-4 my-24">
      <div class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for serious training and exams
          </h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
            EDU Autotest brings together everything you need to design, deliver,
            and monitor high-quality driving theory training.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="feature in features"
            :key="feature.title"
            class="h-full"
          >
            <template #header>
              <p class="text-base font-semibold">
                {{ feature.title }}
              </p>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Personas -->
    <section id="personas" class="w-full max-w-7xl mx-auto px-4 my-24">
      <div class="space-y-6">
        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
            One platform, tailored experiences
          </h2>

          <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
            EDU Autotest serves every role in your organization with focused,
            role-based views and permissions.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="persona in personas"
            :key="persona.title"
            class="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-5"
          >
            <h3 class="text-base font-semibold">
              {{ persona.title }}
            </h3>

            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {{ persona.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Stats strip -->
    <section class="w-full max-w-7xl mx-auto px-4 my-24">
      <div
        class="rounded-2xl bg-primary-600 text-white px-6 py-8 sm:px-8 sm:py-10"
      >
        <div
          class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 class="text-2xl font-bold tracking-tight">
              Ready for production workloads
            </h2>
            <p class="mt-2 text-sm sm:text-base text-primary-50/90">
              Designed for multi-tenant deployments and real driving school
              operations from day one.
            </p>
          </div>
          <dl class="grid flex-1 gap-4 sm:grid-cols-3">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-xl bg-primary-500/20 px-4 py-3 text-sm"
            >
              <dt class="text-primary-100/90">
                {{ stat.label }}
              </dt>
              <dd class="mt-1 text-lg font-semibold">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Bottom CTA -->
    <section id="get-started" class="w-full max-w-7xl mx-auto px-4 my-24">
      <div>
        <div
          class="flex flex-col items-start justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div class="space-y-2 max-w-xl">
            <h2 class="text-2xl font-bold tracking-tight">
              Start running exams with EDU Autotest
            </h2>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Sign in to your existing account or contact your platform
              administrator to get access for your driving school.
            </p>
          </div>
          <UButton to="/login" size="lg"> Sign in </UButton>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Footer -->
    <footer class="w-full max-w-7xl mx-auto px-4 my-8">
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400"
      >
        <p>
          © {{ new Date().getFullYear() }} EDU Autotest. All rights reserved.
        </p>

        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/login"
            class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Sign in
          </NuxtLink>

          <span class="hidden sm:inline text-gray-300"> · </span>

          <span> Multi-tenant platform for driving schools. </span>
        </div>
      </div>
    </footer>
  </div>
</template>
