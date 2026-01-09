<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

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

const benefits = [
  {
    title: "Zero Configuration",
    description:
      "Start managing your driving school immediately — no complex setup required.",
    icon: "⚡",
  },
  {
    title: "Real-time Analytics",
    description:
      "Monitor student performance, test results, and school metrics in real time.",
    icon: "📊",
  },
  {
    title: "Secure & Reliable",
    description:
      "Built with security in mind. Your data is protected with enterprise-grade encryption.",
    icon: "🔒",
  },
  {
    title: "Mobile Friendly",
    description:
      "Students can practice and take tests from any device, anywhere, anytime.",
    icon: "📱",
  },
];

const testimonials = [
  {
    name: "Alexandra Petrov",
    role: "School Owner",
    school: "City Driving Academy",
    content:
      "EDU Autotest transformed how we manage exams. Our students love the practice mode, and we've seen a 40% improvement in pass rates.",
  },
  {
    name: "Michael Chen",
    role: "Instructor",
    school: "Highway Driving School",
    content:
      "The analytics dashboard helps me identify which topics students struggle with most. I can now tailor my lessons more effectively.",
  },
  {
    name: "Sarah Johnson",
    role: "Student",
    school: "Metro Driving School",
    content:
      "Practicing on EDU Autotest helped me pass my theory exam on the first try. The instant feedback and explanations are incredibly helpful.",
  },
];

const items = [
  {
    label: "Is Nuxt UI free to use?",
    content:
      "Yes! Nuxt UI is completely free and open source under the MIT license. All 125+ components are available to everyone.",
  },
  {
    label: "Can I use Nuxt UI with Vue without Nuxt?",
    content:
      "Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the installation guide to get started.",
  },
  {
    label: "Will Nuxt UI work with other CSS frameworks like UnoCSS?",
    content:
      "No. Nuxt UI is designed exclusively for Tailwind CSS. UnoCSS support would require significant architecture changes due to different class naming conventions.",
  },
  {
    label: "How does Nuxt UI handle accessibility?",
    content:
      "Through Reka UI integration, Nuxt UI provides automatic ARIA attributes, keyboard navigation, focus management, and screen reader support. While offering a strong foundation, testing in your specific use case remains important.",
  },
  {
    label: "How is Nuxt UI tested?",
    content:
      "Nuxt UI ensures reliability with 1000+ Vitest tests covering core functionality and accessibility.",
  },
  {
    label: "Is Nuxt UI production-ready?",
    content:
      "Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.",
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
});
</script>

<template>
  <section
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
  >
    <div class="grid gap-12 lg:grid-cols-2 items-center">
      <div class="space-y-8">
        <div class="space-y-6">
          <p
            class="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-900/30 px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-200 ring-1 ring-primary-100 dark:ring-primary-900/60"
          >
            EDU Autotest · Multi-tenant driving school platform
          </p>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            The Full-Stack
            <span class="block text-primary-600 dark:text-primary-400">
              Testing Platform
            </span>
          </h1>

          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
          >
            Build fast, production-ready testing systems for driving schools.
            Question banks, exams, analytics, and tutorials — all configured out
            of the box.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <UButton to="/login" size="lg"> Get started </UButton>

          <UButton variant="ghost" size="lg" color="primary" to="#how-it-works">
            Learn how it works
          </UButton>
        </div>
      </div>
    </div>
  </section>

  <section
    id="benefits"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything you need, nothing you don't
        </h2>

        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          EDU Autotest handles the complexity so you can focus on teaching.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="relative group"
        >
          <div
            class="absolute -inset-0.5 bg-linear-to-r from-primary-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          />
          <div
            class="relative rounded-2xl bg-white dark:bg-gray-900/60 p-6 border border-gray-200 dark:border-gray-800 h-full"
          >
            <div class="text-3xl mb-4">{{ benefit.icon }}</div>
            <h3 class="text-lg font-semibold mb-2">
              {{ benefit.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <USeparator />

  <section
    id="how-it-works"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
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

  <section
    id="features"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
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
        <UCard v-for="feature in features" :key="feature.title" class="h-full">
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

  <section
    id="personas"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
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

  <section
    id="testimonials"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Trusted by driving schools worldwide
        </h2>
        
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See what school owners, instructors, and students are saying about EDU
          Autotest.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <UCard
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="h-full"
        >
          <template #header>
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold"
              >
                {{ firstLetter(testimonial.name) }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ testimonial.role }}
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500">
                  {{ testimonial.school }}
                </p>
              </div>
            </div>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400 italic">
            "{{ testimonial.content }}"
          </p>
        </UCard>
      </div>
    </div>
  </section>

  <USeparator />

  <section class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

  <section
    id="faq"
    class="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about EDU Autotest.
        </p>
      </div>

      <div class="space-y-4">
        <UAccordion
          type="single"
          :items="items"
          :unmount-on-hide="false"
          :default-value="['3']"
          :ui="{
            trigger: 'text-base',
            body: 'text-base text-muted',
          }"
        >
          <template #body="{ item }">
            <p>{{ item.content }}</p>
          </template>
        </UAccordion>
      </div>
    </div>
  </section>

  <USeparator />

  <section
    id="get-started"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
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

  <footer class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© {{ new Date().getFullYear() }} EDU Autotest. All rights reserved.</p>

      <span> Multi-tenant platform for driving schools. </span>
    </div>
  </footer>
</template>
