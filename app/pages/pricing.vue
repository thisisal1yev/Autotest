<script lang="ts" setup>
const tiers = ref([
  {
    id: "starter",
    title: "Starter",
    price: "$99",
    description: "For small driving schools",
    billingCycle: "/month",
    button: {
      label: "Get started",
      variant: "subtle" as const,
    },
  },
  {
    id: "professional",
    title: "Professional",
    price: "$249",
    description: "For growing driving schools",
    billingCycle: "/month",
    button: {
      label: "Get started",
    },
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: "Custom",
    description: "For driving school networks",
    button: {
      label: "Contact sales",
      color: "neutral" as const,
    },
  },
]);

const sections = ref([
  {
    title: "Platform limits",
    features: [
      {
        title: "Students",
        tiers: {
          starter: "Up to 50",
          professional: "Up to 200",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Tests",
        tiers: {
          starter: "Up to 10",
          professional: "Up to 50",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Question bank",
        tiers: {
          starter: "Up to 500",
          professional: "Up to 2,000",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Administrators",
        tiers: {
          starter: "1",
          professional: "Up to 5",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Instructors",
        tiers: {
          starter: "Up to 3",
          professional: "Up to 15",
          enterprise: "Unlimited",
        },
      },
    ],
  },
  {
    title: "Features",
    features: [
      {
        title: "Practice tests",
        tiers: {
          starter: true,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "Exam tests",
        tiers: {
          starter: true,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "Tutorials & learning",
        tiers: {
          starter: true,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "Basic analytics",
        tiers: {
          starter: true,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "Advanced analytics",
        tiers: {
          starter: false,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "Report export",
        tiers: {
          starter: false,
          professional: true,
          enterprise: true,
        },
      },
      {
        title: "API access",
        tiers: {
          starter: false,
          professional: false,
          enterprise: true,
        },
      },
      {
        title: "Priority support",
        tiers: {
          starter: false,
          professional: false,
          enterprise: true,
        },
      },
    ],
  },
]);
</script>

<template>
  <div
    class="min-h-screen text-gray-900 dark:text-gray-100 relative overflow-hidden"
  >
    <svg
      viewBox="0 0 1440 181"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none absolute w-full -top-px transition-all text-primary shrink-0 -z-10 duration-400ms"
    >
      <mask id="path-1-inside-1_414_5526" fill="white">
        <path d="M0 0H1440V181H0V0Z"></path>
      </mask>
      <path
        d="M0 0H1440V181H0V0Z"
        fill="url(#paint0_linear_414_5526)"
        fill-opacity="0.22"
      ></path>
      <path
        d="M0 2H1440V-2H0V2Z"
        fill="url(#paint1_linear_414_5526)"
        mask="url(#path-1-inside-1_414_5526)"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_414_5526"
          x1="720"
          y1="0"
          x2="720"
          y2="181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="currentColor"></stop>
          <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_414_5526"
          x1="0"
          y1="90.5"
          x2="1440"
          y2="90.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="currentColor" stop-opacity="0"></stop>
          <stop offset="0.395" stop-color="currentColor"></stop>
          <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>

    <!-- Gradient background -->
    <div
      class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl"
      />
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl"
      />
    </div>

    <!-- Hero section -->
    <section
      class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12"
    >
      <div class="text-center space-y-6 max-w-3xl mx-auto">
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
        >
          Simple, transparent
          <span class="block text-primary-600 dark:text-primary-400">
            pricing
          </span>
        </h1>
        <p
          class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Choose the plan that fits your driving school. All plans include core
          features with no hidden fees.
        </p>
      </div>
    </section>

    <!-- Pricing table -->
    <section
      class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
    >
      <UPricingTable :tiers="tiers" :sections="sections" />
    </section>
  </div>
</template>
