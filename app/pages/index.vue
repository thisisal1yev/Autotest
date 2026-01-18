<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: [],
});

const howItWorksSteps = [
  {
    title: "Create your school space",
    description:
      "Set up your dedicated workspace in under 5 minutes. Get instant access to a fully configured platform with role-based access for admins, instructors, and students — no technical expertise required.",
    icon: "i-lucide-building-2",
  },
  {
    title: "Build tests & tutorials",
    description:
      "Create comprehensive question banks with images, videos, and detailed explanations. Design custom tests tailored to your curriculum and local traffic regulations. Publish interactive tutorials that connect seamlessly with your test content.",
    icon: "i-lucide-file-text",
  },
  {
    title: "Invite students",
    description:
      "Onboard students with a single click. They instantly gain access to practice sessions, official exams, and real-time progress tracking. Watch engagement soar as students practice anytime, anywhere.",
    icon: "i-lucide-user-plus",
  },
  {
    title: "Track results & analytics",
    description:
      "Get deep insights into student performance with real-time analytics. Identify knowledge gaps, measure group effectiveness, and optimize your curriculum based on data-driven decisions. See pass rates improve by up to 40%.",
    icon: "i-lucide-chart-line",
  },
];

const features = [
  {
    title: "Multi-tenant architecture",
    description:
      "One powerful platform serving multiple driving schools with complete data isolation. Each school operates in its own secure environment while you maintain centralized control.",
    icon: "i-lucide-shield-check",
  },
  {
    title: "Advanced question bank",
    description:
      "Manage thousands of questions with rich metadata, categories, images, and reusable templates. Build comprehensive question libraries that grow with your needs.",
    icon: "i-lucide-database",
  },
  {
    title: "Practice & exam modes",
    description:
      "Offer unlimited practice sessions with instant feedback or strict exam conditions with timers. Students build confidence through practice, then prove mastery in exam mode.",
    icon: "i-lucide-clipboard-check",
  },
  {
    title: "Interactive tutorials",
    description:
      "Publish structured learning paths with video tutorials, interactive content, and progress tracking. Connect tutorials directly to tests for comprehensive preparation.",
    icon: "i-lucide-video",
  },
  {
    title: "Real-time analytics",
    description:
      "Track student progress, identify struggling topics, measure group performance, and optimize your curriculum. Make data-driven decisions that improve outcomes.",
    icon: "i-lucide-trending-up",
  },
  {
    title: "Role-based dashboards",
    description:
      "Customized interfaces for superadmins, school owners, instructors, and students. Everyone sees exactly what they need, when they need it, keeping focus sharp and productivity high.",
    icon: "i-lucide-layout-dashboard",
  },
];

const personas = [
  {
    title: "Driving school owners",
    description:
      "Increase pass rates by 40% and standardize exams across all branches. Control question quality, monitor business-wide performance, and scale operations effortlessly.",
    icon: "i-lucide-briefcase",
    highlight: "40% pass rate increase",
  },
  {
    title: "Instructors",
    description:
      "Assign targeted tests, track class progress in real-time, and prepare students for official exams. Identify knowledge gaps instantly and tailor lessons accordingly.",
    icon: "i-lucide-graduation-cap",
    highlight: "Real-time insights",
  },
  {
    title: "Students",
    description:
      "Practice anytime, anywhere, on any device. Get instant feedback, detailed explanations, and build confidence. Pass your theory exam on the first attempt.",
    icon: "i-lucide-user",
    highlight: "Pass on first try",
  },
];

const stats = [
  {
    label: "Questions ready to use",
    value: "500+",
    icon: "i-lucide-help-circle",
  },
  {
    label: "Practice tests completed",
    value: "10k+",
    icon: "i-lucide-check-circle-2",
  },
  {
    label: "Driving schools supported",
    value: "Multi-tenant",
    icon: "i-lucide-building",
  },
];

const benefits = [
  {
    title: "Zero Configuration",
    description:
      "Start managing your driving school immediately. No complex setup, no technical knowledge required. Everything works out of the box.",
    icon: "i-lucide-zap",
  },
  {
    title: "Real-time Analytics",
    description:
      "Monitor student performance, test results, and school metrics in real-time. Make data-driven decisions that improve outcomes.",
    icon: "i-lucide-chart-no-axes-combined",
  },
  {
    title: "Enterprise Security",
    description:
      "Your data is protected with enterprise-grade encryption. Complete data isolation ensures each school's information remains private and secure.",
    icon: "i-lucide-lock",
  },
  {
    title: "Mobile First",
    description:
      "Students can practice and take tests from any device — smartphone, tablet, or computer. Learn anywhere, anytime, at their own pace.",
    icon: "i-lucide-smartphone",
  },
];

const testimonials = [
  {
    name: "Alexandra Petrov",
    role: "School Owner",
    school: "City Driving Academy",
    content:
      "EDU Autotest completely transformed how we manage exams. Our students love the practice mode, and we've seen a remarkable 40% improvement in pass rates. The analytics dashboard gives us insights we never had before.",
    avatar: "AP",
  },
  {
    name: "Michael Chen",
    role: "Instructor",
    school: "Highway Driving School",
    content:
      "The analytics dashboard is a game-changer. I can instantly see which topics students struggle with most, allowing me to tailor my lessons more effectively. Student engagement has never been higher.",
    avatar: "MC",
  },
  {
    name: "Sarah Johnson",
    role: "Student",
    school: "Metro Driving School",
    content:
      "Practicing on EDU Autotest helped me pass my theory exam on the first try. The instant feedback and detailed explanations are incredibly helpful. I felt confident and well-prepared.",
    avatar: "SJ",
  },
];

const faqs = [
  {
    label: "How quickly can we get started?",
    content:
      "You can set up your driving school workspace in under 5 minutes. Simply sign up, create your first test, and invite students. No technical knowledge required — everything is intuitive and works immediately after registration. Our onboarding process guides you through every step.",
  },
  {
    label: "Can we customize tests for our curriculum?",
    content:
      "Absolutely! You have complete control over your question bank, test structure, time limits, and passing scores. Create tests that perfectly match your local requirements and standards. Add images, videos, and detailed explanations to every question. Build reusable templates to save time.",
  },
  {
    label: "Is our data secure?",
    content:
      "Yes, your data is fully protected. We use enterprise-grade encryption and follow strict data protection protocols. Each driving school's data is completely isolated in our multi-tenant architecture. Regular automated backups ensure your information is always safe and recoverable.",
  },
  {
    label: "What support do you provide?",
    content:
      "We offer comprehensive documentation, email support, and for Enterprise plans, priority support with a dedicated account manager. Our team is always ready to help you maximize the platform's potential. We also provide training sessions and best practices guides.",
  },
  {
    label: "How much does it cost?",
    content:
      "We offer flexible pricing plans for driving schools of all sizes. Start with our free plan to explore the platform, or choose from our paid plans with advanced features. Contact us for a personalized quote tailored to your school's needs and student volume.",
  },
  {
    label: "Can we integrate with our existing systems?",
    content:
      "Yes! We provide a robust API for integration with your existing management systems. This allows you to synchronize student data, test results, and other information seamlessly. Our technical team can help you set up the integration quickly and efficiently.",
  },
];
</script>

<template>
  <section
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden"
  >
    <div>
      <div class="space-y-8">
        <div class="space-y-6">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            class="inline-flex"
          >
            EDU Autotest · Multi-tenant driving school platform
          </UBadge>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Increase Pass Rates
            <span class="block text-primary-600 dark:text-primary-400">
              by 40% in Your First Month
            </span>
          </h1>

          <p
            class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
          >
            The only platform that combines test creation, student practice, and
            detailed analytics. Start improving your driving school's results
            today with zero technical setup.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <UButton to="/login" size="lg" icon="i-lucide-rocket">
            Get started free
          </UButton>

          <UButton
            variant="ghost"
            size="lg"
            color="primary"
            to="#how-it-works"
            icon="i-lucide-play-circle"
          >
            See how it works
          </UButton>
        </div>
      </div>
    </div>
  </section>

  <section
    id="benefits"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12 relative">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Everything you need for success
        </h2>

        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          EDU Autotest handles all the complexity so you can focus on what
          matters most — teaching and improving student outcomes.
        </p>
      </div>

      <UPageGrid class="lg:grid-cols-4 gap-6">
        <UPageCard
          v-for="benefit in benefits"
          :key="benefit.title"
          :icon="benefit.icon"
          :title="benefit.title"
          spotlight
          spotlight-color="primary"
          variant="subtle"
        >
          <p class="text-sm text-muted mt-2">
            {{ benefit.description }}
          </p>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>

  <USeparator />

  <section
    id="how-it-works"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-6 relative">
      <div class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
          How EDU Autotest works
        </h2>

        <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
          From registration to detailed analytics — the platform mirrors how
          modern driving schools operate, making setup incredibly simple.
        </p>
      </div>

      <UPageGrid class="md:grid-cols-2 gap-6">
        <UPageCard
          v-for="(step, index) in howItWorksSteps"
          :key="step.title"
          :icon="step.icon"
          :title="step.title"
          variant="subtle"
          class="relative"
        >
          <div
            class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white"
          >
            {{ index + 1 }}
          </div>
          <p class="text-sm text-muted mt-2">
            {{ step.description }}
          </p>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>

  <USeparator />

  <section
    id="features"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-6 relative">
      <div class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
          Built for serious training and exams
        </h2>

        <p class="text-gray-600 dark:text-gray-400 max-w-2xl">
          EDU Autotest brings together everything you need to design, deliver,
          and monitor high-quality driving theory training.
        </p>
      </div>

      <UPageGrid class="md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPageCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          variant="subtle"
        >
          <p class="text-sm text-muted mt-2">
            {{ feature.description }}
          </p>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>

  <USeparator />

  <section
    id="testimonials"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12 relative">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Trusted by driving schools worldwide
        </h2>

        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See what school owners, instructors, and students are saying about EDU
          Autotest.
        </p>
      </div>

      <UPageGrid class="md:grid-cols-3 gap-6">
        <UCard
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="h-full"
        >
          <template #header>
            <div class="flex items-start gap-4">
              <div
                class="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold"
              >
                {{ testimonial.avatar }}
              </div>

              <div class="flex-1 min-w-0">
                <p class="font-semibold">{{ testimonial.name }}</p>
                <p class="text-sm text-muted">
                  {{ testimonial.role }}
                </p>
                <p class="text-xs text-muted">
                  {{ testimonial.school }}
                </p>
              </div>
            </div>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400 italic">
            "{{ testimonial.content }}"
          </p>
        </UCard>
      </UPageGrid>
    </div>
  </section>

  <USeparator />

  <section
    id="faq"
    class="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <div class="space-y-12 relative">
      <div class="text-center space-y-4">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about EDU Autotest.
        </p>
      </div>

      <UAccordion
        type="single"
        :items="faqs"
        :ui="{
          trigger: 'text-base font-semibold',
          body: 'text-sm text-muted',
        }"
      >
        <template #body="{ item }">
          <p>{{ item.content }}</p>
        </template>
      </UAccordion>
    </div>
  </section>

  <USeparator />

  <section
    id="get-started"
    class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
  >
    <UCard class="relative">
      <div
        class="flex flex-col items-start justify-between gap-6 sm:items-center sm:flex-row"
      >
        <div class="space-y-2 max-w-xl">
          <h2 class="text-2xl font-bold tracking-tight">
            Start running exams with EDU Autotest
          </h2>
          <p class="text-sm sm:text-base text-muted">
            Sign in to your existing account or contact your platform
            administrator to get access for your driving school.
          </p>
        </div>
        <UButton to="/login" size="lg" icon="i-lucide-log-in">
          Sign in
        </UButton>
      </div>
    </UCard>
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
