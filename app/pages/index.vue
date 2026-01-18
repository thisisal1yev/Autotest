<script setup lang="ts">
definePageMeta({
  layout: "default",
});

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface FAQ {
  label: string;
  content: string;
}

const STATS: Stat[] = [
  { value: "1000+", label: "Questions", icon: "i-lucide-help-circle" },
  { value: "99%", label: "Accuracy", icon: "i-lucide-target" },
  { value: "24/7", label: "Access", icon: "i-lucide-clock" },
];

const FEATURES: Feature[] = [
  {
    icon: "i-lucide-book-open",
    title: "Learning Mode",
    description: "Study questions by category with detailed explanations for every answer.",
  },
  {
    icon: "i-lucide-trophy",
    title: "Exam Mode",
    description: "Real YXQBB exam simulation with timer and strict conditions.",
  },
  {
    icon: "i-lucide-flame",
    title: "Marathon Mode",
    description: "Go through all questions sequentially to reinforce your knowledge.",
  },
  {
    icon: "i-lucide-bar-chart-3",
    title: "Statistics",
    description: "Track your progress and analyze your weak points.",
  },
  {
    icon: "i-lucide-rotate-ccw",
    title: "Error Review",
    description: "Practice only the questions you got wrong.",
  },
  {
    icon: "i-lucide-smartphone",
    title: "Mobile Ready",
    description: "Study anywhere, anytime, on any device.",
  },
];

const STEPS: Step[] = [
  {
    icon: "i-lucide-user-plus",
    title: "Sign Up",
    description: "Create your account in 30 seconds",
  },
  {
    icon: "i-lucide-book-open",
    title: "Learn",
    description: "Study theory by categories",
  },
  {
    icon: "i-lucide-brain",
    title: "Practice",
    description: "Solve tests and reinforce knowledge",
  },
  {
    icon: "i-lucide-badge-check",
    title: "Pass",
    description: "Ace your exam on the first try",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alisher M.",
    role: "Passed on first attempt",
    content: "Thanks to Autotest, I prepared for the exam in just one week. All questions were familiar!",
    avatar: "AM",
  },
  {
    name: "Dilnoza K.",
    role: "Student",
    content: "Convenient to study on the go. The error review mode especially helped me improve.",
    avatar: "DK",
  },
  {
    name: "Rustam T.",
    role: "Driving Instructor",
    content: "I recommend Autotest to all my students. The pass rate has significantly increased.",
    avatar: "RT",
  },
];

const FAQS: FAQ[] = [
  {
    label: "How many questions are in the database?",
    content: "Our database contains over 1000 questions that fully cover the theoretical driving exam in Uzbekistan. Questions are regularly updated according to current traffic regulations.",
  },
  {
    label: "Can I use it on my phone?",
    content: "Yes! Autotest works perfectly on any device — smartphone, tablet, or computer. Study anywhere, anytime.",
  },
  {
    label: "How does exam mode differ from learning mode?",
    content: "Exam mode fully simulates real exam conditions: timer, limited attempts, and no hints. Learning mode lets you study questions by category with detailed explanations.",
  },
  {
    label: "Is there a free version?",
    content: "Yes, we offer a free plan with access to basic features. Premium plans unlock all learning modes and detailed analytics.",
  },
];
</script>

<template>
  <section class="relative w-full overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <UBadge color="primary" variant="subtle" size="lg" class="mb-6">
          <UIcon name="i-lucide-car" class="mr-1.5 size-4" />
          Driving Theory Exam Preparation
        </UBadge>

        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Pass Your Driving Exam
          <span class="block text-primary">On the First Try</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted">
          1000+ real exam questions, multiple learning modes, and detailed progress tracking.
          Everything you need to ace your YXQBB theory test.
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-8">
          <div v-for="stat in STATS" :key="stat.label" class="flex items-center gap-2">
            <UIcon :name="stat.icon" class="size-5 text-primary" />
            <span class="text-2xl font-bold">{{ stat.value }}</span>
            <span class="text-muted">{{ stat.label }}</span>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <UButton to="/auth" size="xl" icon="i-lucide-rocket">
            Start Learning Free
          </UButton>

          <UButton to="#features" variant="outline" size="xl" icon="i-lucide-arrow-down">
            Learn More
          </UButton>
        </div>
      </div>
    </div>
  </section>

  <section id="features" class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Everything You Need to Succeed
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">
        Comprehensive tools designed to help you pass your theory exam with confidence.
      </p>
    </div>

    <UPageGrid class="mt-16 lg:grid-cols-3">
      <UPageCard v-for="feature in FEATURES" :key="feature.title" :icon="feature.icon" :title="feature.title"
        :description="feature.description" variant="outline" spotlight spotlight-color="primary" />
    </UPageGrid>
  </section>

  <USeparator />

  <section id="how-it-works" class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        How It Works
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">
        Four simple steps to exam success.
      </p>
    </div>

    <div class="relative mt-16">
      <div
        class="absolute left-0 right-0 top-12 hidden h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent lg:block" />

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(step, index) in STEPS" :key="step.title" class="relative text-center">
          <div class="relative mx-auto mb-4 flex size-24 items-center justify-center">
            <div class="absolute inset-0 rounded-full bg-primary/10" />

            <div class="relative flex size-16 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <UIcon :name="step.icon" class="size-7" />
            </div>

            <div
              class="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-white text-sm font-bold text-primary shadow ring-2 ring-primary dark:bg-gray-900">
              {{ index + 1 }}
            </div>
          </div>

          <h3 class="text-lg font-semibold">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-muted">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <USeparator />

  <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        What Our Users Say
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">
        Join thousands of successful students.
      </p>
    </div>

    <UPageGrid class="mt-16 lg:grid-cols-3">
      <UCard v-for="testimonial in TESTIMONIALS" :key="testimonial.name">
        <div class="flex items-start gap-4">
          <div
            class="user">
            {{ testimonial.avatar }}
          </div>

          <div class="min-w-0 flex-1">
            <p class="font-semibold">{{ testimonial.name }}</p>
            <p class="text-sm text-muted">{{ testimonial.role }}</p>
          </div>
        </div>

        <p class="mt-4 text-muted italic">"{{ testimonial.content }}"</p>
      </UCard>
    </UPageGrid>
  </section>

  <USeparator />

  <section id="faq" class="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Frequently Asked Questions
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-lg text-muted">
        Got questions? We've got answers.
      </p>
    </div>

    <UAccordion :items="FAQS" class="mt-12" />
  </section>

  <USeparator />

  <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <UCard class="bg-primary/5 dark:bg-primary/10">
      <div class="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <div class="flex-1">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to Pass Your Exam?
          </h2>

          <p class="mt-2 text-muted">
            Start practicing today and join thousands of successful drivers.
          </p>
        </div>

        <div class="flex shrink-0 gap-3">
          <UButton to="/auth" size="lg" icon="i-lucide-rocket">
            Get Started Free
          </UButton>

          <UButton to="/auth" variant="outline" size="lg" icon="i-lucide-log-in">
            Sign In
          </UButton>
        </div>
      </div>
    </UCard>
  </section>

  <footer class="border-t border-default">
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Autotest. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <UButton to="https://github.com/thisisal1yev" target="_blank" variant="ghost" color="neutral"
            icon="i-simple-icons-github" size="sm">
            GitHub
          </UButton>

          <UButton to="https://t.me/thisisaliyev" target="_blank" variant="ghost" color="neutral"
            icon="i-simple-icons-telegram" size="sm">
            Telegram
          </UButton>
        </div>
      </div>
    </div>
  </footer>
</template>