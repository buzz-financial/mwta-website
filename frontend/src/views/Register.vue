<template>
  <div class="register-page">
    <!-- Success Screen -->
    <div v-if="step === 'success'" class="success-screen">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h2>Registration Submitted!</h2>
        <p>
          Thank you, <strong>{{ form.firstName }} {{ form.lastName }}</strong>! Your registration for
          <strong>{{ selectedProgram?.name }}</strong> has been received.
        </p>
        <div class="success-summary">
          <div class="summary-row">
            <span>Program</span>
            <strong>{{ selectedProgram?.name }}</strong>
          </div>
          <div class="summary-row">
            <span>Days</span>
            <strong>{{ selectedDaysLabels }}</strong>
          </div>
          <div v-if="form.programType === 'junior' && form.participants.length > 1" class="summary-row">
            <span>Players</span>
            <strong>{{ form.participants.map(p => p.name).join(', ') }}</strong>
          </div>
          <div v-else class="summary-row">
            <span>Player</span>
            <strong>{{ form.participants[0]?.name }}</strong>
          </div>
          <div class="summary-row">
            <span>Monthly Price</span>
            <strong>${{ totalMonthlyPrice.toFixed(2) }}</strong>
          </div>
          <div v-if="totalProratedAmount < totalMonthlyPrice" class="summary-row highlight">
            <span>First Payment (prorated)</span>
            <strong>${{ totalProratedAmount.toFixed(2) }}</strong>
          </div>
          <div class="summary-row">
            <span>Next Billing Date</span>
            <strong>{{ nextBillingDate }}</strong>
          </div>
        </div>

        <div v-if="selectedProgram?.groupmeUrl" class="groupme-banner">
          <div class="groupme-icon">💬</div>
          <div>
            <p class="groupme-label">Join your group chat</p>
            <a :href="selectedProgram.groupmeUrl" target="_blank" rel="noopener" class="groupme-link">
              Join {{ selectedProgram.name }} GroupMe →
            </a>
          </div>
        </div>

        <p class="success-note">
          You'll receive a confirmation email shortly. Your payment has been processed and monthly billing is set up
          to run on the 1st of each month.
          Questions? <RouterLink to="/contact">Contact us</RouterLink>.
        </p>

        <div class="success-actions">
          <RouterLink class="btn-primary-lg" to="/">Back to Home</RouterLink>
          <button class="btn-ghost-lg" @click="resetForm">Register Another</button>
        </div>
      </div>
    </div>

    <!-- Registration Wizard -->
    <template v-else>
      <div class="wizard-header">
        <div class="wizard-header__inner">
          <RouterLink to="/" class="back-link">← Back</RouterLink>
          <h1 class="wizard-title">Register for a Program</h1>
          <div class="progress-steps">
            <div
              v-for="(s, i) in steps"
              :key="s.id"
              class="progress-step"
              :class="{ active: currentStepIndex >= i, done: currentStepIndex > i }"
            >
              <div class="step-dot">{{ currentStepIndex > i ? "✓" : i + 1 }}</div>
              <span class="step-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="wizard-body">
        <!-- Step 1: Choose Program Type -->
        <div v-if="step === 'type'" class="wizard-step">
          <h2 class="step-title">What are you signing up for?</h2>
          <div class="type-grid">
            <button
              v-for="t in programTypes"
              :key="t.id"
              class="type-card"
              :class="{ selected: form.programType === t.id }"
              @click="selectType(t.id)"
            >
              <div class="type-icon">{{ t.icon }}</div>
              <h3>{{ t.name }}</h3>
              <p>{{ t.desc }}</p>
            </button>
          </div>
        </div>

        <!-- Step 2: Choose Program -->
        <div v-if="step === 'program'" class="wizard-step">
          <h2 class="step-title">Choose your program</h2>
          <p class="step-subtitle">Select the level that best fits your player.</p>
          <div class="program-grid">
            <button
              v-for="p in availablePrograms"
              :key="p.id"
              class="program-option"
              :class="{ selected: form.program === p.id }"
              @click="selectProgram(p)"
            >
              <div class="program-option__top">
                <h3>{{ p.name }}</h3>
                <span class="schedule-chip">{{ p.schedule }}</span>
              </div>
              <p class="program-option__desc">{{ p.description }}</p>
              <div class="program-option__price">
                From <strong>${{ Object.values(p.prices)[0].toFixed(2) }}</strong>/mo
              </div>
              <div v-if="p.requiresPermission" class="permission-note">
                Requires coach permission to register
              </div>
            </button>
          </div>
          <div class="step-nav">
            <button class="btn-back" @click="step = 'type'">← Back</button>
          </div>
        </div>

        <!-- Step 3: Choose Days -->
        <div v-if="step === 'days'" class="wizard-step">
          <h2 class="step-title">Select your training days</h2>
          <p class="step-subtitle">
            <span v-if="selectedProgram?.allowedDayCounts">
              {{ selectedProgram.name }} offers
              {{ selectedProgram.allowedDayCounts.join(" or ") }} day options.
            </span>
            <span v-else>
              Choose {{ selectedProgram?.minDays }}–{{ selectedProgram?.maxDays }} days per week.
            </span>
          </p>

          <div class="days-grid">
            <label
              v-for="day in allDays"
              :key="day.id"
              class="day-card"
              :class="{
                selected: form.days.includes(day.id),
                disabled: !selectedProgram?.availableDays.includes(day.id),
              }"
            >
              <input
                type="checkbox"
                :value="day.id"
                v-model="form.days"
                :disabled="!selectedProgram?.availableDays.includes(day.id)"
                @change="onDayChange"
              />
              <span class="day-name">{{ day.label }}</span>
            </label>
          </div>

          <div v-if="daysError" class="error-banner">{{ daysError }}</div>

          <div v-if="form.days.length > 0 && !daysError" class="price-preview">
            <div class="price-preview__inner">
              <div class="price-preview__label">
                {{ form.days.length }} day{{ form.days.length !== 1 ? "s" : "" }} / week
              </div>
              <div class="price-preview__price">${{ monthlyPrice.toFixed(2) }}<span>/mo per player</span></div>
              <div v-if="proratedAmount < monthlyPrice" class="price-preview__prorate">
                First payment: ${{ proratedAmount.toFixed(2) }} (prorated — billed today, then ${{
                  monthlyPrice.toFixed(2)
                }}/mo per player starting {{ nextBillingDate }})
              </div>
            </div>
          </div>

          <div class="step-nav">
            <button class="btn-back" @click="step = 'program'">← Back</button>
            <button class="btn-next" :disabled="!canAdvanceFromDays" @click="step = 'info'">
              Continue →
            </button>
          </div>
        </div>

        <!-- Step 4: Personal Information -->
        <div v-if="step === 'info'" class="wizard-step">
          <h2 class="step-title">Your information</h2>
          <p class="step-subtitle">Please fill out the registration form below.</p>

          <form @submit.prevent="step = 'review'" class="info-form">
            <div class="form-section">
              <h3 class="form-section-title">
                {{ form.programType === 'junior' ? 'Children / Players' : 'Participant' }}
              </h3>

              <div
                v-for="(participant, idx) in form.participants"
                :key="idx"
                class="participant-row"
              >
                <div class="form-row">
                  <div class="form-group">
                    <label>
                      {{ form.programType === 'junior' ? `Child ${idx + 1} Full Name *` : "Participant's Full Name *" }}
                    </label>
                    <input
                      v-model="participant.name"
                      type="text"
                      required
                      placeholder="Full name of the player"
                    />
                  </div>
                  <button
                    v-if="form.programType === 'junior' && form.participants.length > 1"
                    type="button"
                    class="btn-remove-participant"
                    @click="removeParticipant(idx)"
                    title="Remove this child"
                  >✕</button>
                </div>
              </div>

              <button
                v-if="form.programType === 'junior'"
                type="button"
                class="btn-add-participant"
                @click="addParticipant"
              >
                + Add Another Child
              </button>

              <div v-if="form.programType === 'junior' && form.participants.length > 1" class="multi-child-price-note">
                {{ form.participants.length }} children × ${{ monthlyPrice.toFixed(2) }}/mo =
                <strong>${{ totalMonthlyPrice.toFixed(2) }}/mo total</strong>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section-title">Responsible Party / Account Holder</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>First Name *</label>
                  <input v-model="form.firstName" type="text" required placeholder="First name" />
                </div>
                <div class="form-group">
                  <label>Last Name *</label>
                  <input v-model="form.lastName" type="text" required placeholder="Last name" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Email Address *</label>
                  <input v-model="form.email" type="email" required placeholder="email@example.com" />
                </div>
                <div class="form-group">
                  <label>Phone Number *</label>
                  <input v-model="form.phone" type="tel" required placeholder="(555) 555-5555" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section-title">Address</h3>
              <div class="form-row full">
                <div class="form-group">
                  <label>Street Address *</label>
                  <input v-model="form.address" type="text" required placeholder="123 Main St" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>City *</label>
                  <input v-model="form.city" type="text" required placeholder="City" />
                </div>
                <div class="form-group">
                  <label>State *</label>
                  <input v-model="form.state" type="text" required placeholder="CA" maxlength="2" />
                </div>
                <div class="form-group">
                  <label>Zip *</label>
                  <input v-model="form.zip" type="text" required placeholder="90210" maxlength="10" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Country</label>
                  <input v-model="form.country" type="text" placeholder="United States" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3 class="form-section-title">Cancellation Policy *</h3>
              <p class="policy-text">
                A 30-day written notice is required to cancel your enrollment. Your monthly billing will continue
                until notice is received. Cancellations sent after the 1st of the month will take effect the
                following month.
              </p>
              <label class="checkbox-row">
                <input type="checkbox" v-model="form.cancelPolicyAgreed" required />
                <span>I understand and agree to the 30-day cancellation policy</span>
              </label>
            </div>

            <div class="step-nav">
              <button type="button" class="btn-back" @click="step = 'days'">← Back</button>
              <button type="submit" class="btn-next" :disabled="!canAdvanceFromInfo">
                Review Registration →
              </button>
            </div>
          </form>
        </div>

        <!-- Step 5: Review & Submit -->
        <div v-if="step === 'review'" class="wizard-step">
          <h2 class="step-title">Review & Submit</h2>
          <p class="step-subtitle">Confirm your registration details before submitting.</p>

          <div class="review-card">
            <div class="review-section">
              <h3>Program</h3>
              <div class="review-row">
                <span>Type</span>
                <strong>{{ form.programType === "junior" ? "Junior Program" : "Adult Clinic" }}</strong>
              </div>
              <div class="review-row">
                <span>Program</span>
                <strong>{{ selectedProgram?.name }}</strong>
              </div>
              <div class="review-row">
                <span>Schedule</span>
                <strong>{{ selectedProgram?.schedule }}</strong>
              </div>
              <div class="review-row">
                <span>Days Selected</span>
                <strong>{{ selectedDaysLabels }}</strong>
              </div>
            </div>

            <div class="review-section">
              <h3>{{ form.programType === 'junior' && form.participants.length > 1 ? 'Players' : 'Participant' }}</h3>
              <div v-for="(participant, idx) in form.participants" :key="idx" class="review-row">
                <span>{{ form.programType === 'junior' && form.participants.length > 1 ? `Child ${idx + 1}` : 'Player Name' }}</span>
                <strong>{{ participant.name }}</strong>
              </div>
              <div class="review-row">
                <span>Account Holder</span>
                <strong>{{ form.firstName }} {{ form.lastName }}</strong>
              </div>
              <div class="review-row">
                <span>Email</span>
                <strong>{{ form.email }}</strong>
              </div>
              <div class="review-row">
                <span>Phone</span>
                <strong>{{ form.phone }}</strong>
              </div>
              <div class="review-row">
                <span>Address</span>
                <strong>{{ form.address }}, {{ form.city }}, {{ form.state }} {{ form.zip }}</strong>
              </div>
            </div>

            <div class="review-section billing-section">
              <h3>Billing Summary</h3>
              <div v-if="form.programType === 'junior' && form.participants.length > 1" class="review-row">
                <span>Per-Child Rate</span>
                <strong>${{ monthlyPrice.toFixed(2) }}/mo</strong>
              </div>
              <div class="review-row">
                <span>Monthly Rate{{ form.programType === 'junior' && form.participants.length > 1 ? ` (× ${form.participants.length} children)` : '' }}</span>
                <strong>${{ totalMonthlyPrice.toFixed(2) }}/mo</strong>
              </div>
              <div v-if="totalProratedAmount < totalMonthlyPrice" class="review-row prorate-row">
                <span>First Payment (prorated — {{ prorateDetails }})</span>
                <strong class="prorate-amount">${{ totalProratedAmount.toFixed(2) }}</strong>
              </div>
              <div v-else class="review-row">
                <span>First Payment</span>
                <strong>${{ totalMonthlyPrice.toFixed(2) }}</strong>
              </div>
              <div class="review-row">
                <span>Recurring On</span>
                <strong>1st of each month</strong>
              </div>
              <div class="review-row">
                <span>Next Full Billing</span>
                <strong>{{ nextBillingDate }}</strong>
              </div>
              <div class="billing-note">
                Monthly subscription — recurring until cancelled. 30-day cancellation notice required.
              </div>
            </div>
          </div>

          <div class="step-nav">
            <button class="btn-back" @click="step = 'info'">← Edit</button>
            <button class="btn-submit" @click="step = 'payment'">Continue to Payment →</button>
          </div>
        </div>

        <!-- Step 6: Payment -->
        <div v-if="step === 'payment'" class="wizard-step">
          <h2 class="step-title">Payment Details</h2>
          <p class="step-subtitle">
            Your card will be charged
            <strong>${{ totalProratedAmount.toFixed(2) }}</strong> today, then
            <strong>${{ totalMonthlyPrice.toFixed(2) }}/mo</strong> on the 1st of each month.
          </p>

          <div class="payment-form">
            <div class="form-section">
              <h3 class="form-section-title">Card Information</h3>
              <div class="form-row full">
                <div class="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    v-model="card.name"
                    type="text"
                    placeholder="Name as it appears on card"
                    autocomplete="cc-name"
                  />
                </div>
              </div>
              <div class="form-row full">
                <div class="form-group">
                  <label>Card Number *</label>
                  <input
                    :value="card.number"
                    type="text"
                    inputmode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    autocomplete="cc-number"
                    @input="formatCardNumber"
                  />
                </div>
              </div>
              <div class="form-row card-expiry-row">
                <div class="form-group">
                  <label>Exp. Month *</label>
                  <input
                    v-model="card.expMonth"
                    type="text"
                    inputmode="numeric"
                    placeholder="MM"
                    maxlength="2"
                    autocomplete="cc-exp-month"
                  />
                </div>
                <div class="form-group">
                  <label>Exp. Year *</label>
                  <input
                    v-model="card.expYear"
                    type="text"
                    inputmode="numeric"
                    placeholder="YYYY"
                    maxlength="4"
                    autocomplete="cc-exp-year"
                  />
                </div>
                <div class="form-group">
                  <label>CVC *</label>
                  <input
                    v-model="card.cvc"
                    type="password"
                    inputmode="numeric"
                    placeholder="•••"
                    maxlength="4"
                    autocomplete="cc-csc"
                  />
                </div>
              </div>
            </div>

            <div class="secure-badge">🔒 Payments securely processed by Troute</div>

            <div v-if="paymentError" class="error-banner">{{ paymentError }}</div>

            <div class="step-nav">
              <button class="btn-back" @click="step = 'review'" :disabled="paying">← Back</button>
              <button class="btn-submit" @click="processPayment" :disabled="paying || !canPay">
                {{ paying ? "Processing…" : `Pay $${totalProratedAmount.toFixed(2)} & Complete` }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabase";

const route = useRoute();

// ─── Products config ────────────────────────────────────────────────────────
const JUNIOR_PROGRAMS = {
  peewees: {
    id: "peewees",
    name: "Pee-Wees",
    description: "Perfect for beginners ages 5–10. Fun fundamentals, coordination, and learning to rally.",
    schedule: "Mon & Wed  4:30–5:30pm",
    availableDays: ["monday", "wednesday"],
    minDays: 1,
    maxDays: 2,
    prices: { 1: 71.07, 2: 128.75 },
    groupmeUrl: "", // add GroupMe invite link here
  },
  champions: {
    id: "champions",
    name: "Champions",
    description: "For developing players (up to age 12) ready to train consistently. Technique and match drills.",
    schedule: "Mon–Thurs  4:30–6:00pm",
    availableDays: ["monday", "tuesday", "wednesday", "thursday"],
    minDays: 1,
    maxDays: 4,
    prices: { 1: 132.87, 2: 204.97, 3: 297.67, 4: 400.67 },
    groupmeUrl: "",
  },
  elite: {
    id: "elite",
    name: "Elite",
    description: "High-school aged players working toward or playing varsity. High-intensity competitive training.",
    schedule: "Mon–Thurs  5:00–7:00pm",
    availableDays: ["monday", "tuesday", "wednesday", "thursday"],
    minDays: 1,
    maxDays: 4,
    prices: { 1: 204.97, 2: 277.07, 3: 400.67, 4: 513.97 },
    groupmeUrl: "",
  },
  collegeprep: {
    id: "collegeprep",
    name: "College Prep",
    description: "Invitation only. Active tournament players. Strategy, video feedback, fitness, and match play.",
    schedule: "Mon–Fri  3:00–5:00pm",
    availableDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    allowedDayCounts: [3, 5],
    prices: { 3: 360.50, 5: 515.00 },
    groupmeUrl: "",
    requiresPermission: true,
  },
};

const ADULT_PROGRAMS = {
  adultsessions: {
    id: "adultsessions",
    name: "Adult Clinic",
    description: "Structured coaching for all levels. Groundstrokes, volleys, serves, movement, and point play.",
    schedule: "See schedule on Adult page",
    availableDays: ["monday", "tuesday", "wednesday", "thursday"],
    minDays: 1,
    maxDays: 4,
    prices: { 1: 85.00, 2: 160.00, 3: 225.00, 4: 280.00 },
    groupmeUrl: "",
  },
};

const allDays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
];

const programTypes = [
  { id: "junior", icon: "🎾", name: "Junior Program", desc: "Pee-Wees, Champions, Elite, or College Prep" },
  { id: "adult", icon: "🏆", name: "Adult Clinic", desc: "Group coaching for beginners through advanced" },
];

const steps = [
  { id: "type", label: "Program Type" },
  { id: "program", label: "Program" },
  { id: "days", label: "Days" },
  { id: "info", label: "Your Info" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" },
];

// ─── State ───────────────────────────────────────────────────────────────────
const step = ref("type");
const paying = ref(false);
const paymentError = ref("");
const card = ref({ name: "", number: "", expMonth: "", expYear: "", cvc: "" });

const form = ref({
  programType: "",
  program: "",
  days: [],
  participants: [{ name: "" }],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "CA",
  zip: "",
  country: "United States",
  cancelPolicyAgreed: false,
});

// ─── Computed ────────────────────────────────────────────────────────────────
const availablePrograms = computed(() => {
  const map = form.value.programType === "junior" ? JUNIOR_PROGRAMS : ADULT_PROGRAMS;
  return Object.values(map);
});

const selectedProgram = computed(() => {
  if (!form.value.program) return null;
  const map = form.value.programType === "junior" ? JUNIOR_PROGRAMS : ADULT_PROGRAMS;
  return map[form.value.program] || null;
});

const currentStepIndex = computed(() => steps.findIndex((s) => s.id === step.value));

const monthlyPrice = computed(() => {
  if (!selectedProgram.value || form.value.days.length === 0) return 0;
  const p = selectedProgram.value;
  const count = form.value.days.length;
  return p.prices[count] ?? 0;
});

const proratedAmount = computed(() => {
  if (monthlyPrice.value === 0) return 0;
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayOfMonth = today.getDate();
  if (dayOfMonth === 1) return monthlyPrice.value;
  const remaining = daysInMonth - dayOfMonth + 1;
  return Math.round((monthlyPrice.value / daysInMonth) * remaining * 100) / 100;
});

const nextBillingDate = computed(() => {
  const today = new Date();
  const next = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
});

const totalMonthlyPrice = computed(() => monthlyPrice.value * form.value.participants.length);
const totalProratedAmount = computed(() => proratedAmount.value * form.value.participants.length);

const prorateDetails = computed(() => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dayOfMonth = today.getDate();
  const remaining = daysInMonth - dayOfMonth + 1;
  return `${remaining} of ${daysInMonth} days remaining`;
});

const selectedDaysLabels = computed(() =>
  form.value.days.map((d) => allDays.find((x) => x.id === d)?.label).join(", ")
);

const daysError = computed(() => {
  const p = selectedProgram.value;
  if (!p || form.value.days.length === 0) return "";
  if (p.allowedDayCounts && !p.allowedDayCounts.includes(form.value.days.length)) {
    return `${p.name} only offers ${p.allowedDayCounts.join(" or ")} day options. Please select ${p.allowedDayCounts.join(" or ")} days.`;
  }
  if (p.maxDays && form.value.days.length > p.maxDays) {
    return `${p.name} allows a maximum of ${p.maxDays} days. Please deselect ${form.value.days.length - p.maxDays} day(s).`;
  }
  return "";
});

const canAdvanceFromDays = computed(() => {
  if (!selectedProgram.value || form.value.days.length === 0) return false;
  if (daysError.value) return false;
  if (monthlyPrice.value === 0) return false;
  return true;
});

const canAdvanceFromInfo = computed(() => {
  const f = form.value;
  const allParticipantsNamed = f.participants.length > 0 && f.participants.every((p) => p.name.trim());
  return (
    allParticipantsNamed &&
    f.firstName &&
    f.lastName &&
    f.email &&
    f.phone &&
    f.address &&
    f.city &&
    f.state &&
    f.zip &&
    f.cancelPolicyAgreed
  );
});

const canPay = computed(() => {
  const c = card.value;
  const digits = c.number.replace(/\s/g, "");
  return c.name.trim() && digits.length >= 15 && c.expMonth && c.expYear && c.cvc.length >= 3;
});

// ─── Methods ─────────────────────────────────────────────────────────────────
const selectType = (typeId) => {
  form.value.programType = typeId;
  form.value.program = "";
  form.value.days = [];
  form.value.participants = [{ name: "" }];
  step.value = "program";
};

const selectProgram = (p) => {
  form.value.program = p.id;
  form.value.days = [];
  step.value = "days";
};

const onDayChange = () => {
  // no-op: validation handled by daysError computed
};

const addParticipant = () => {
  form.value.participants.push({ name: "" });
};

const removeParticipant = (idx) => {
  form.value.participants.splice(idx, 1);
};

const formatCardNumber = (e) => {
  const val = e.target.value.replace(/\D/g, "").slice(0, 16);
  card.value.number = val.replace(/(.{4})/g, "$1 ").trim();
};

const saveRegistration = async (paymentResult = {}) => {
  const basePayload = {
    program_type: form.value.programType,
    program_name: form.value.program,
    program_display_name: selectedProgram.value?.name,
    days_selected: form.value.days,
    monthly_price: monthlyPrice.value,
    prorated_first_payment: proratedAmount.value,
    first_name: form.value.firstName,
    last_name: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    address: form.value.address,
    city: form.value.city,
    state: form.value.state,
    zip: form.value.zip,
    country: form.value.country,
    responsible_party: `${form.value.firstName} ${form.value.lastName}`,
    cancellation_policy_agreed: form.value.cancelPolicyAgreed,
    status: "active",
    troute_customer_id: paymentResult.troute_customer_id || null,
    troute_payment_id: paymentResult.troute_payment_id || null,
  };

  const rows = form.value.participants.map((p) => ({
    ...basePayload,
    participant_name: p.name,
  }));

  const { error } = await supabase.from("registrations").insert(rows);
  if (error) throw error;
};

const processPayment = async () => {
  paying.value = true;
  paymentError.value = "";
  try {
    const res = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardNumber: card.value.number,
        cardExpMonth: card.value.expMonth,
        cardExpYear: card.value.expYear,
        cardCvc: card.value.cvc,
        cardName: card.value.name,
        program_type: form.value.programType,
        program_name: form.value.program,
        program_display_name: selectedProgram.value?.name,
        days_selected: form.value.days,
        monthly_price: monthlyPrice.value,
        prorated_first_payment: proratedAmount.value,
        total_monthly_price: totalMonthlyPrice.value,
        total_prorated_amount: totalProratedAmount.value,
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        city: form.value.city,
        state: form.value.state,
        zip: form.value.zip,
        country: form.value.country,
        participants: form.value.participants,
        cancellation_policy_agreed: form.value.cancelPolicyAgreed,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Payment failed. Please try again.");
    await saveRegistration(data);
    step.value = "success";
  } catch (err) {
    console.error("Payment error:", err);
    paymentError.value = err.message || "Payment failed. Please try again or contact us directly.";
  } finally {
    paying.value = false;
  }
};

const resetForm = () => {
  form.value = {
    programType: "",
    program: "",
    days: [],
    participants: [{ name: "" }],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "CA",
    zip: "",
    country: "United States",
    cancelPolicyAgreed: false,
  };
  step.value = "type";
  card.value = { name: "", number: "", expMonth: "", expYear: "", cvc: "" };
  paying.value = false;
  paymentError.value = "";
};

// Pre-select from query params (e.g. /register?type=junior&program=peewees)
onMounted(() => {
  const t = route.query.type;
  const p = route.query.program;
  if (t === "junior" || t === "adult") {
    form.value.programType = t;
    step.value = "program";
    if (p) {
      const map = t === "junior" ? JUNIOR_PROGRAMS : ADULT_PROGRAMS;
      if (map[p]) {
        form.value.program = p;
        step.value = "days";
      }
    }
  }
});
</script>

<style scoped>
/* ── Page shell ──────────────────────────────────────────────────────────── */
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
}

/* ── Wizard header ───────────────────────────────────────────────────────── */
.wizard-header {
  background: #fff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 5rem 2rem 1.5rem;
}

.wizard-header__inner {
  max-width: 860px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #3452a3;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.wizard-title {
  font-size: clamp(1.6rem, 3vw, 2.25rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
}

.progress-steps {
  display: flex;
  gap: 0;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 700;
}

.progress-step:not(:last-child)::after {
  content: "→";
  margin: 0 0.5rem;
  color: #cbd5e1;
}

.progress-step.active {
  color: #3452a3;
}

.progress-step.done {
  color: #22c55e;
}

.step-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  font-weight: 900;
  flex-shrink: 0;
}

.progress-step.active .step-dot {
  background: #3452a3;
  color: #fff;
}

.progress-step.done .step-dot {
  background: #22c55e;
  color: #fff;
}

/* ── Wizard body ─────────────────────────────────────────────────────────── */
.wizard-body {
  max-width: 860px;
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
}

.wizard-step {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.4rem;
}

.step-subtitle {
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 2rem;
}

/* ── Step 1: Type ────────────────────────────────────────────────────────── */
.type-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.type-card {
  background: #fff;
  border: 2px solid rgba(15, 23, 42, 0.1);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);
}

.type-card:hover {
  border-color: #3452a3;
  transform: translateY(-2px);
}

.type-card.selected {
  border-color: #3452a3;
  background: rgba(52, 82, 163, 0.04);
}

.type-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.type-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.2rem;
  font-weight: 950;
  color: #0f172a;
}

.type-card p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* ── Step 2: Program ─────────────────────────────────────────────────────── */
.program-grid {
  display: grid;
  gap: 1rem;
}

.program-option {
  background: #fff;
  border: 2px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  padding: 1.4rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

.program-option:hover {
  border-color: #3452a3;
  transform: translateY(-1px);
}

.program-option.selected {
  border-color: #3452a3;
  background: rgba(52, 82, 163, 0.04);
}

.program-option__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.program-option__top h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 950;
  color: #0f172a;
}

.schedule-chip {
  font-size: 0.82rem;
  font-weight: 800;
  color: #3452a3;
  background: rgba(52, 82, 163, 0.08);
  border: 1px solid rgba(52, 82, 163, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  white-space: nowrap;
}

.program-option__desc {
  margin: 0 0 0.75rem;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.6;
}

.program-option__price {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 800;
}

.permission-note {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: #d97706;
  font-weight: 700;
}

/* ── Step 3: Days ────────────────────────────────────────────────────────── */
.days-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.day-card {
  position: relative;
  background: #fff;
  border: 2px solid rgba(15, 23, 42, 0.1);
  border-radius: 14px;
  padding: 1.1rem 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.day-card input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.day-card:not(.disabled):hover {
  border-color: #3452a3;
}

.day-card.selected {
  border-color: #3452a3;
  background: rgba(52, 82, 163, 0.07);
}

.day-card.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.day-name {
  font-weight: 900;
  color: #0f172a;
  font-size: 0.9rem;
}

.day-card.selected .day-name {
  color: #3452a3;
}

.price-preview {
  margin-top: 1.5rem;
}

.price-preview__inner {
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.price-preview__label {
  font-size: 0.9rem;
  font-weight: 800;
  opacity: 0.85;
}

.price-preview__price {
  font-size: 1.8rem;
  font-weight: 950;
  letter-spacing: -0.02em;
}

.price-preview__price span {
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.8;
}

.price-preview__prorate {
  font-size: 0.82rem;
  opacity: 0.85;
  line-height: 1.5;
  flex: 1;
  min-width: 200px;
}

/* ── Step 4: Info Form ───────────────────────────────────────────────────── */
.info-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
}

.form-section-title {
  margin: 0 0 1.25rem;
  font-size: 1rem;
  font-weight: 950;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.85rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-row.full {
  grid-template-columns: 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 800;
  color: #334155;
}

.form-group input {
  padding: 0.75rem 0.9rem;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 10px;
  font-size: 0.95rem;
  color: #0f172a;
  transition: border-color 0.15s;
  background: #fff;
  width: 100%;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #3452a3;
  box-shadow: 0 0 0 3px rgba(52, 82, 163, 0.1);
}

.policy-text {
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0 0 1rem;
  background: rgba(52, 82, 163, 0.04);
  border: 1px solid rgba(52, 82, 163, 0.1);
  border-radius: 10px;
  padding: 0.9rem 1rem;
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
}

.checkbox-row input[type="checkbox"] {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: #3452a3;
}

/* ── Step 5: Review ──────────────────────────────────────────────────────── */
.review-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.review-section {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.07);
}

.review-section:last-child {
  border-bottom: none;
}

.review-section h3 {
  margin: 0 0 1rem;
  font-size: 0.82rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.review-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.45rem 0;
  font-size: 0.9rem;
}

.review-row span {
  color: #475569;
  font-weight: 700;
}

.review-row strong {
  color: #0f172a;
  font-weight: 900;
  text-align: right;
}

.billing-section {
  background: rgba(52, 82, 163, 0.03);
}

.prorate-row .prorate-amount {
  color: #3452a3;
  font-size: 1rem;
}

.billing-note {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(15, 23, 42, 0.04);
  border-radius: 8px;
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.5;
}

/* ── Navigation buttons ──────────────────────────────────────────────────── */
.step-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.btn-back {
  padding: 0.85rem 1.4rem;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  font-weight: 800;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-back:hover {
  border-color: #3452a3;
  color: #3452a3;
}

.btn-next {
  padding: 0.85rem 1.8rem;
  background: linear-gradient(135deg, #dfff4f, #c8e526);
  border: none;
  border-radius: 12px;
  font-weight: 950;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow: 0 8px 20px rgba(200, 229, 38, 0.3);
}

.btn-next:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-next:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-submit {
  padding: 0.95rem 2.2rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  border: none;
  border-radius: 12px;
  font-weight: 950;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.15s;
  box-shadow: 0 10px 28px rgba(52, 82, 163, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ── Error banner ────────────────────────────────────────────────────────── */
.error-banner {
  margin-top: 1rem;
  padding: 0.9rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 700;
}

/* ── Success screen ──────────────────────────────────────────────────────── */
.success-screen {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 6rem 2rem 4rem;
}

.success-card {
  max-width: 580px;
  width: 100%;
  background: #fff;
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.1);
  text-align: left;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  font-size: 1.8rem;
  font-weight: 900;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin-bottom: 1.25rem;
}

.success-card h2 {
  font-size: 1.8rem;
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
}

.success-card > p {
  color: #475569;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

.success-summary {
  background: rgba(52, 82, 163, 0.04);
  border: 1px solid rgba(52, 82, 163, 0.12);
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 0;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row span {
  color: #64748b;
  font-weight: 700;
}

.summary-row strong {
  color: #0f172a;
  font-weight: 900;
}

.summary-row.highlight strong {
  color: #3452a3;
}

.groupme-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.groupme-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.groupme-label {
  margin: 0 0 0.2rem;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #16a34a;
}

.groupme-link {
  font-weight: 900;
  color: #15803d;
  text-decoration: none;
  font-size: 0.95rem;
}

.groupme-link:hover {
  text-decoration: underline;
}

.success-note {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0 0 1.75rem;
}

.success-note a {
  color: #3452a3;
  font-weight: 700;
}

.success-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary-lg {
  flex: 1;
  min-width: 160px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.4rem;
  background: linear-gradient(135deg, #3452a3, #4a63b3);
  color: #fff;
  border-radius: 12px;
  font-weight: 950;
  text-decoration: none;
  transition: transform 0.15s;
}

.btn-primary-lg:hover {
  transform: translateY(-1px);
}

.btn-ghost-lg {
  flex: 1;
  min-width: 160px;
  padding: 0.95rem 1.4rem;
  background: #fff;
  border: 1.5px solid rgba(15, 23, 42, 0.14);
  border-radius: 12px;
  font-weight: 950;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-ghost-lg:hover {
  border-color: #3452a3;
  color: #3452a3;
}

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .wizard-header {
    padding: 4.5rem 1rem 1.25rem;
  }

  .wizard-body {
    padding: 1.75rem 1rem 3rem;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }

  .days-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .progress-step .step-label {
    display: none;
  }

  .price-preview__inner {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .days-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ── Step 6: Payment ─────────────────────────────────────────────────────── */
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-expiry-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.secure-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: #475569;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  width: fit-content;
}

/* ── Multi-participant ───────────────────────────────────────────────────── */
.participant-row .form-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}

.btn-remove-participant {
  flex-shrink: 0;
  background: none;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.4rem 0.65rem;
  margin-bottom: 0.1rem;
  transition: border-color 0.15s, color 0.15s;
}

.btn-remove-participant:hover {
  border-color: #f87171;
  color: #ef4444;
}

.btn-add-participant {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  background: none;
  border: 1.5px dashed #3452a3;
  border-radius: 8px;
  color: #3452a3;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.55rem 1rem;
  transition: background 0.15s;
}

.btn-add-participant:hover {
  background: rgba(52, 82, 163, 0.06);
}

.multi-child-price-note {
  margin-top: 0.85rem;
  padding: 0.65rem 0.9rem;
  background: #f0f4ff;
  border-radius: 8px;
  font-size: 0.88rem;
  color: #3452a3;
}
</style>
