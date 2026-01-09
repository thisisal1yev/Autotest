<script lang="ts" setup>
const tiers = ref([
  {
    id: "standard",
    title: "Standard",
    price: "$99",
    description: "For small driving schools",
    billingCycle: "/month",
    button: {
      label: "Get started",
      variant: "outline" as const,
    },
  },
  {
    id: "premium",
    title: "Premium",
    price: "$249",
    description: "For growing driving schools",
    billingCycle: "/month",
    button: {
      label: "Get started",
      variant: "subtle" as const,
    },
  },
  {
    id: "enterprise",
    title: "Enterprise",
    price: "Custom",
    description: "For driving school networks",
    button: {
      label: "Contact sales",
      color: "primary" as const,
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
          standard: "Up to 50",
          premium: "Up to 200",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Tests",
        tiers: {
          standard: "Up to 10",
          premium: "Up to 50",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Question bank",
        tiers: {
          standard: "Up to 500",
          premium: "Up to 2,000",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Administrators",
        tiers: {
          standard: "1",
          premium: "Up to 5",
          enterprise: "Unlimited",
        },
      },
      {
        title: "Instructors",
        tiers: {
          standard: "Up to 3",
          premium: "Up to 15",
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
          standard: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "Exam tests",
        tiers: {
          standard: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "Tutorials & learning",
        tiers: {
          standard: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "Basic analytics",
        tiers: {
          standard: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "Advanced analytics",
        tiers: {
          standard: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "Report export",
        tiers: {
          standard: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: "API access",
        tiers: {
          standard: false,
          premium: false,
          enterprise: true,
        },
      },
      {
        title: "Priority support",
        tiers: {
          standard: false,
          premium: false,
          enterprise: true,
        },
      },
    ],
  },
]);
</script>

<template>
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

  <section
    class="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12"
  >
    <UPageCard
      title="Free plan"
      description="Explore our platform"
      icon="i-lucide-gift"
      orientation="horizontal"
      spotlight
      spotlight-color="primary"
      class="p-6"
      leadingIcon="i-lucide-present"
    >
      <UButton
        size="lg"
        variant="outline"
        label="Start for free"
        class="ml-auto"
      />
    </UPageCard>
  </section>

  <section class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <UPricingTable :tiers="tiers" :sections="sections" />
  </section>
</template>
