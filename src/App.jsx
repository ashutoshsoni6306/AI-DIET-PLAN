import { useState } from 'react'
import './App.css'

/* ─── Data ─────────────────────────────────────────────────────────────── */

const MEALS = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    title: 'Avocado Toast',
    kcal: 320,
    time: '10 min',
    progress: 'w-[45%]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2HzH1WfXvz3aX1Kxqfr9ENv38ISvIt6lcCyBCrtRKuhlxsMGhCzLsp2XH3OdTuIIJvIqevBLmdl-KwCgQxytFAHbXHs8-1sSob-AYXqPbbTjDEmreo_-RO58divI3iOGzHPbTHwm7dWOx6fX8TMCMu4Zqqg1sidYVQzD7_mFpOzIOkVOAU9wCme3FmqAcrk6IM4PN7TZ2e6IIsGdTGx8mLeZcc5F4OgGA7KFNmkVqKZkjLQq4irmiYcmNSCq4tAaw_uXI5bgNZ9o',
    alt: 'Avocado Toast on sourdough',
  },
  {
    id: 'lunch',
    label: 'Lunch',
    title: 'Quinoa Salad',
    kcal: 450,
    time: '15 min',
    progress: 'w-[70%]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtEOxWKyGAyCMoV3AwZmp2rBjmIHc4ElCaCRfY1BB0GWSsnhuM-K4zkMf8opgWtEEEoN5DVfYFgA69RlGs4E4veqJI_24Ks_URjJCUCWfsOqJeA01PQuy6ZOgX7hDDo4nGMrBv2_GOf6653U0cXhisfx0RSg6F9W5Jdhpn2FwFaymAKlJEDdV7GxIw6-2UBkydirVsF3kYT1eNRpzUyL173zMOBxqTiPFro16WSiCdKC4BTbT8OGNpcZD_60F1RvgL-THTAuTSk0',
    alt: 'Quinoa Salad with fresh vegetables',
  },
  {
    id: 'dinner',
    label: 'Dinner',
    title: 'Grilled Salmon',
    kcal: 580,
    time: '25 min',
    progress: 'w-[90%]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdZNeN1I3enA1DhOMvsIE4J_SAnf2IR1uGtbeCLTmHmgT1stcfkwE4hwpsIr4-yXc9XEhY_pBzUyAGkBUjTRIdK2D9Yq_7FnpxQrAKgJA4SzNkU7s1D_VVM0PuSQ_0fA-ZeXFg4Xlb7TF7DFc_4OiP9ghX4Z_cizaDVDv6gb0FQKkEBPhNuc7wSeUJE7suppEtD9EwzCQnO7oNDF2jhgDunJ0fkTW_3_cfMJAQb_eKlwNBrTqWyTfg3x7AmZkPfHSabaH2GRtRMCM',
    alt: 'Grilled Salmon with asparagus',
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    quote: '"Lumina completely changed how I view food. It\'s no longer about restriction, but about nourishment and energy."',
    name: 'Sarah J.',
    tag: 'Lost 15lbs in 3 months',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkdkvMTAnHybKeFAN_EIbOygQ9NOHGIPdt5EFDLO-0FTScYQnagbHZJOe934h0CG6RYuxL00IOcNbV6vNguNSn5Fo78w8GA7WebcZ265SXrUp7QoLF_yr5BHiLkQQva4hW9AP8bORJYvb5eHT_Qv4SMubmnp7EnXt8b-LuuWJWOUJ0_gQAK0UDh2NmexJSxW92PFzc8a-M6YoJ9vb-0ag5DhGSG501RXBXIVpnXLeslNoaW3kaAPiHVK7wxeiprT-eJelJVDDCUyg',
    alt: 'Sarah J.',
  },
  {
    id: 2,
    quote: '"The personalized meal plans are so easy to follow. I finally have the energy to play with my kids after work."',
    name: 'David M.',
    tag: 'Better energy levels',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy-gIm0PlJDw0msEvOo_H73z8Atc9-kEKvCrr2bNgj7jPykCRJ-08iTLAY5z7ak9-KgbHLBjxfKdZNzaB4Q6A98brycQTDcsSuRaBIYN8vMQH9kmWFCtvoy5sfGBUcWp_A1Tz4UsqfrWA1oxZAb-MnTl7-A53a1JNcZe3hIMe_nkfl-1HKo3la2vLAO4VoZeL6fX1YQot_r-eTHpMuv9PSozHJxQV9eloXBd_WZBe-odm_-uyYClf_z6m_lNo3RMIw0Aya4ckVD6A',
    alt: 'David M.',
  },
  {
    id: 3,
    quote: '"I love the non-judgmental approach. Tracking my macros feels like a game now, not a chore."',
    name: 'Elena R.',
    tag: 'Consistent habit builder',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRa6IPh9Y8tsQZIl_Ohblv5XTfKl9C-G54GjNycj1uKdjMDVpa7vqgnHdtIsEBnk9eoJQLr9va5mxR6R1tpdoGSkyTv6okSx5ijgXXTn8G-1n5VqDkSOPi3DH_1UHSauA5PjHOT1B4eGhxO7vu5AZFBbpuVzrEIHZb5S9SimxN5HUWSMSqz3UpNB-0S6QopS2qMrFCskEHQykKwQZ4P-BQYgkcXsrmLDaO8z7frpXSu2il9SQl9SJmkYerpBJhSE4bq58eLZWBdGc',
    alt: 'Elena R.',
  },
]

/* ─── Diet Plan Modal ──────────────────────────────────────────────────── */

function DietPlanModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '', goal: '', activity: '',
  })
  const [plan, setPlan] = useState(null)

  const goals = ['Lose Weight', 'Build Muscle', 'Maintain Weight', 'Improve Energy']
  const activities = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']

  const calorieMap = {
    'Lose Weight': -500, 'Build Muscle': +300,
    'Maintain Weight': 0, 'Improve Energy': +100,
  }
  const activityFactor = {
    'Sedentary': 1.2, 'Lightly Active': 1.375,
    'Moderately Active': 1.55, 'Very Active': 1.725,
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function generatePlan() {
    const bmr = 10 * Number(form.weight) + 6.25 * Number(form.height) - 5 * Number(form.age) + 5
    const tdee = Math.round(bmr * (activityFactor[form.activity] || 1.375))
    const target = tdee + (calorieMap[form.goal] || 0)
    const protein = Math.round(Number(form.weight) * 1.8)
    const fat = Math.round((target * 0.25) / 9)
    const carbs = Math.round((target - protein * 4 - fat * 9) / 4)
    setPlan({ target, protein, fat, carbs })
    setStep(3)
  }

  const step1Valid = form.name && form.age && form.weight && form.height
  const step2Valid = form.goal && form.activity

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#434840] hover:text-[#334f2b] transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Step indicator */}
        {step < 3 && (
          <div className="flex gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-[#334f2b]' : 'bg-[#c3c8bd]'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step 1 — Personal info */}
        {step === 1 && (
          <>
            <h3 className="font-[Montserrat] text-2xl font-bold text-[#334f2b] mb-1">Let's get started</h3>
            <p className="text-[#434840] text-sm font-[Inter] mb-6">Tell us a bit about yourself.</p>
            <div className="space-y-4">
              {[
                { label: 'Your Name', name: 'name', type: 'text', placeholder: 'e.g. Alex' },
                { label: 'Age', name: 'age', type: 'number', placeholder: 'e.g. 28' },
                { label: 'Weight (kg)', name: 'weight', type: 'number', placeholder: 'e.g. 72' },
                { label: 'Height (cm)', name: 'height', type: 'number', placeholder: 'e.g. 175' },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-[#434840] uppercase tracking-wider mb-1 font-[Inter]">
                    {label}
                  </label>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    min={type === 'number' ? 1 : undefined}
                    className="w-full px-4 py-3 rounded-xl border border-[#c3c8bd] focus:outline-none focus:ring-2 focus:ring-[#334f2b] font-[Inter] text-[#191c1a]"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="mt-6 w-full bg-[#334f2b] text-white py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue
            </button>
          </>
        )}

        {/* Step 2 — Goals */}
        {step === 2 && (
          <>
            <h3 className="font-[Montserrat] text-2xl font-bold text-[#334f2b] mb-1">Your Goals</h3>
            <p className="text-[#434840] text-sm font-[Inter] mb-6">What are you working towards?</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#434840] uppercase tracking-wider mb-2 font-[Inter]">
                  Primary Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm((p) => ({ ...p, goal: g }))}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold font-[Inter] transition-all ${
                        form.goal === g
                          ? 'border-[#334f2b] bg-[#cdebc5] text-[#334f2b]'
                          : 'border-[#c3c8bd] text-[#434840] hover:border-[#334f2b]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#434840] uppercase tracking-wider mb-2 font-[Inter]">
                  Activity Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {activities.map((a) => (
                    <button
                      key={a}
                      onClick={() => setForm((p) => ({ ...p, activity: a }))}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold font-[Inter] transition-all ${
                        form.activity === a
                          ? 'border-[#334f2b] bg-[#cdebc5] text-[#334f2b]'
                          : 'border-[#c3c8bd] text-[#434840] hover:border-[#334f2b]'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-[#334f2b] text-[#334f2b] py-4 rounded-full font-bold hover:bg-[#cdebc5]/30 transition-all"
              >
                Back
              </button>
              <button
                onClick={generatePlan}
                disabled={!step2Valid}
                className="flex-1 bg-[#334f2b] text-white py-4 rounded-full font-bold hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Get My Plan
              </button>
            </div>
          </>
        )}

        {/* Step 3 — Results */}
        {step === 3 && plan && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#cdebc5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#334f2b] text-3xl">check_circle</span>
              </div>
              <h3 className="font-[Montserrat] text-2xl font-bold text-[#334f2b]">
                Your Plan, {form.name}!
              </h3>
              <p className="text-[#434840] text-sm font-[Inter] mt-1">
                Goal: <span className="font-semibold">{form.goal}</span>
              </p>
            </div>
            <div className="bg-[#f1f4f0] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#434840] font-[Inter] text-sm">Daily Calories</span>
                <span className="font-[Montserrat] text-xl font-bold text-[#334f2b]">{plan.target} kcal</span>
              </div>
              {[
                { label: 'Protein', value: `${plan.protein}g`, color: 'bg-[#334f2b]', pct: Math.round((plan.protein * 4 / plan.target) * 100) },
                { label: 'Carbs', value: `${plan.carbs}g`, color: 'bg-[#4b6547]', pct: Math.round((plan.carbs * 4 / plan.target) * 100) },
                { label: 'Fat', value: `${plan.fat}g`, color: 'bg-[#afd0a1]', pct: Math.round((plan.fat * 9 / plan.target) * 100) },
              ].map(({ label, value, color, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-[Inter] mb-1">
                    <span className="text-[#434840]">{label}</span>
                    <span className="font-semibold text-[#191c1a]">{value}</span>
                  </div>
                  <div className="w-full bg-[#c3c8bd]/30 h-2 rounded-full overflow-hidden">
                    <div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-[#334f2b] text-white py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-all"
            >
              Start My Journey
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Sub-components ───────────────────────────────────────────────────── */

function NavBar() {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#f7faf5]/70 backdrop-blur-lg border-b border-[#c3c8bd]">
      <nav className="flex justify-between items-center h-20 px-5 md:px-16 max-w-[1200px] mx-auto">
        <div className="font-[Montserrat] text-2xl font-bold text-[#334f2b] tracking-tight cursor-pointer">
          Lumina Wellness
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <a className="text-[#334f2b] font-bold border-b-2 border-[#334f2b] transition-all duration-300" href="#">Plan</a>
          <a className="text-[#434840] hover:text-[#334f2b] transition-all duration-300" href="#">Tips</a>
          <a className="text-[#434840] hover:text-[#334f2b] transition-all duration-300" href="#">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-[#334f2b] font-bold px-4 py-2 hover:bg-[#cdebc5]/50 rounded-lg transition-all duration-300">
            Login
          </button>
          <button className="bg-[#334f2b] text-white px-6 py-3 rounded-full font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-300">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  )
}

function HeroSection({ onOpenModal }) {
  return (
    <section className="relative min-h-[819px] flex items-center overflow-hidden px-5 md:px-16">
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left copy */}
        <div className="space-y-6">
          <span className="bg-[#cdebc5] text-[#516b4d] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest font-[Inter]">
            Mindful Nutrition
          </span>
          <h1 className="font-[Montserrat] text-4xl md:text-5xl font-bold text-[#334f2b] leading-tight">
            Your Smart Diet Planner for a{' '}
            <span className="text-gradient">Healthier Life</span>
          </h1>
          <p className="text-lg text-[#434840] max-w-lg font-[Inter] leading-relaxed">
            Personalized nutrition plans, expert tips, and progress tracking all
            in one place. Discover a calmer, non-judgmental approach to your
            wellness journey.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onOpenModal}
              className="bg-[#334f2b] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.05] shadow-lg transition-all">
              Get Your Diet Plan
            </button>
            <button className="border-2 border-[#334f2b] text-[#334f2b] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#cdebc5]/30 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">play_circle</span>
              Watch How It Works
            </button>
          </div>
        </div>
        {/* Right image card */}
        <div className="relative hidden md:block">
          <div className="glass-card rounded-[2rem] p-4 relative overflow-hidden shadow-2xl rotate-2">
            <img
              className="rounded-xl w-full h-[500px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwV26loGOSv_mG6p4n7glKA-xdgjCRF_wy6ErsryKaIQTeVfgj1LthMjQ25mdznShZ_1MakevRtBBmO3ep-STekVQ28R7Fj5-5N_yPPyDbn2jcs7emnt51t2_iSrliXQMMjUhe-CZz5SHh8d-p0XCmys4Vaf3tIlvyY5tT1cavEO1-dpWrr0a6nj-NHilkUUk70HJ7_JnnWCbQYVXLrt1RLH6KDJlOdC9vSafNTPklNdZEvbbe4k7CdoOAhNxbTYW2E9r8DQVCD7o"
              alt="Healthy nutrition app and fresh foods"
            />
            <div className="absolute bottom-10 -left-8 glass-card p-6 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-4">
                <div className="bg-[#334f2b] text-white p-2 rounded-lg">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#434840] font-[Inter]">Daily Score</p>
                  <p className="text-xl font-bold text-[#334f2b] font-[Montserrat]">94/100</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#cdebc5]/40 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  )
}

function MealCard({ meal }) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
      <div className="h-64 relative overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={meal.img}
          alt={meal.alt}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-[#334f2b] font-[Inter]">
          {meal.label}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-2">
          {meal.title}
        </h3>
        <div className="flex items-center gap-4 text-[#434840]">
          <span className="flex items-center gap-1 text-sm">
            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            {meal.kcal} kcal
          </span>
          <span className="flex items-center gap-1 text-sm">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            {meal.time}
          </span>
        </div>
        <div className="mt-4 w-full bg-[#c3c8bd]/30 h-1 rounded-full overflow-hidden">
          <div className={`bg-[#334f2b] h-full ${meal.progress}`} />
        </div>
      </div>
    </div>
  )
}

function MealSection() {
  return (
    <section className="bg-[#ecefea] py-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-[Montserrat] text-2xl font-semibold text-[#334f2b]">
              Today's Mindful Menu
            </h2>
            <p className="text-[#434840] font-[Inter] mt-2">
              Curated for your goals &amp; energy needs.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-[#c3c8bd] rounded-full hover:bg-[#f7faf5] transition-colors" aria-label="Previous">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 border border-[#c3c8bd] rounded-full hover:bg-[#f7faf5] transition-colors" aria-label="Next">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEALS.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TipsSection() {
  return (
    <section className="py-12 max-w-[1200px] mx-auto px-5 md:px-16">
      <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold text-[#334f2b] mb-10 text-center">
        Nourish Your Mind
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
        {/* Large image card */}
        <div className="md:col-span-8 group relative rounded-3xl overflow-hidden glass-card cursor-pointer">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsuYl-1k2MguFCJJqjEciAn64tP5RLBYdNCfw60-apB4PfKAzLm1JOwf-wI1c_bn_cD_8yJf-ZyoFH4VF0gbnF7cUU8Y6tYdwgi8lLHtfmH1f8nu599R4RAyoU8rAT-h2eT4ef51TnPNXjSQajL7zSS3St0KPbrfyDfm4A7smT2gwdnsaMNaOKEl-lNipQiCcMjfSG1sKxHXzwY3NrWs2miMF0DVGVxjSoJnRv2b-ND_qPcctBIbyMjxiC2aP8wSWcRz4J-TToqok"
            alt="Morning wellness habits"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#334f2b]/80 to-transparent p-8 flex flex-col justify-end">
            <span className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-2 font-[Inter]">
              Expert Article
            </span>
            <h3 className="text-white font-[Montserrat] text-2xl font-semibold max-w-md">
              5 Morning Habits for Metabolism That Actually Work
            </h3>
          </div>
        </div>
        {/* Text card */}
        <div className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-card cursor-pointer">
          <div className="p-8 h-full flex flex-col justify-center bg-[#cdebc5]/20">
            <span className="material-symbols-outlined text-[#334f2b] text-4xl mb-4">timer</span>
            <h3 className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-3">
              The Truth About Intermittent Fasting
            </h3>
            <p className="text-[#434840] text-sm font-[Inter] line-clamp-3">
              Separating science from myths in the world of time-restricted eating and weight management.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[#334f2b] font-bold">
              Read More <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
        </div>
        {/* Dark card */}
        <div className="md:col-span-4 group relative rounded-3xl overflow-hidden glass-card cursor-pointer">
          <div className="p-8 h-full flex flex-col justify-between bg-[#334f2b] text-white">
            <span className="material-symbols-outlined text-4xl">psychology</span>
            <div>
              <h3 className="font-[Montserrat] text-xl font-semibold mb-2">Mindful Eating 101</h3>
              <p className="text-[#c2e4b4] text-sm font-[Inter]">
                Learn how to listen to your body's true hunger signals.
              </p>
            </div>
          </div>
        </div>
        {/* Second large image */}
        <div className="md:col-span-8 group relative rounded-3xl overflow-hidden glass-card cursor-pointer">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXhqAgZKpLleR72rf6canUDeWP0Rl-Fc1--YFFCUFenfUlrExRQvrnGhV2JCFLC9-epzT4vsS9nd-YTFaaPV-jsNTjF7NREuS2W_jwFnKKwb_Rb1JJ9g4e5Hs0lmge-csYVGJnbtrDnMjUyRA_8Ap6DPHQRcVuysw-gWkdVExjFVKf3Nxul8pRpPK-Ms0BpiDJPYmcPsPSjAeYpLcwVFhHStl8TeeDyW6R04H8XCHAQiZJO9rjxq8vUR1FYm3jKyx1gqGFmSPC9CA"
            alt="Fresh vegetables and greens at market"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl">
            <h3 className="font-[Montserrat] text-xl font-semibold text-[#334f2b]">
              Hidden Nutrients: What Your Body Is Missing
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
        <img className="w-full h-full object-cover" src={t.img} alt={t.alt} />
      </div>
      <p className="font-[Inter] text-[#434840] italic mb-6">{t.quote}</p>
      <div>
        <h4 className="font-[Montserrat] text-xl font-semibold text-[#334f2b]">{t.name}</h4>
        <p className="text-xs font-semibold text-[#434840] uppercase tracking-widest font-[Inter]">
          {t.tag}
        </p>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  return (
    <section className="bg-[#f7faf5] py-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-16 relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-[Montserrat] text-2xl font-semibold text-[#334f2b]">Success Stories</h2>
          <p className="text-[#434840] font-[Inter] text-lg mt-2">
            Real people, real transformations, mindful results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#334f2b]/5 rounded-full blur-3xl" />
    </section>
  )
}

function CtaSection() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-16 py-12">
      <div className="relative bg-[#334f2b] rounded-[3rem] p-12 md:p-20 overflow-hidden text-center text-white">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-[Montserrat] text-4xl md:text-5xl font-bold mb-4">
            Start Your Journey to Balance
          </h2>
          <p className="text-[#c2e4b4] font-[Inter] text-lg mb-8 opacity-90">
            Join 50,000+ members who have transformed their lives with mindful nutrition tracking.
          </p>
          <form
            className="flex flex-col md:flex-row gap-4 justify-center items-stretch"
            onSubmit={handleSubmit}
          >
            <input
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#cdebc5] min-w-[300px]"
              placeholder="Enter your email"
              type="email"
              required
            />
            <button
              type="submit"
              className="bg-[#cdebc5] text-[#092009] px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
            >
              Get Started Free
            </button>
          </form>
          <p className="mt-6 text-[#c2e4b4] text-xs font-semibold uppercase tracking-widest opacity-70 font-[Inter]">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full mt-12 bg-[#ecefea] border-t border-[#c3c8bd]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-16 py-12 max-w-[1200px] mx-auto">
        <div className="md:col-span-1">
          <div className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-4">
            Lumina Wellness
          </div>
          <p className="text-[#434840] text-sm font-[Inter]">
            Mindful nutrition for a balanced life. Transform your habits with our smart planning ecosystem.
          </p>
        </div>
        <div>
          <h5 className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-4">Company</h5>
          <ul className="space-y-2 font-[Inter]">
            <li><a className="text-[#434840] hover:text-[#334f2b] transition-colors" href="#">About Us</a></li>
            <li><a className="text-[#434840] hover:text-[#334f2b] transition-colors" href="#">Newsletter</a></li>
            <li><a className="text-[#434840] hover:text-[#334f2b] transition-colors" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-4">Legal</h5>
          <ul className="space-y-2 font-[Inter]">
            <li><a className="text-[#434840] hover:text-[#334f2b] transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-[#434840] hover:text-[#334f2b] transition-colors" href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-[Montserrat] text-xl font-semibold text-[#334f2b] mb-4">Connect</h5>
          <div className="flex gap-4">
            <a className="text-[#334f2b] hover:scale-110 transition-all" href="#" aria-label="Website">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-[#334f2b] hover:scale-110 transition-all" href="#" aria-label="Email">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-16 py-8 border-t border-[#c3c8bd]/30 text-center">
        <p className="text-[#434840] text-sm font-[Inter]">
          © 2024 Lumina Wellness. Mindful nutrition for a balanced life.
        </p>
      </div>
    </footer>
  )
}

/* ─── Root App ─────────────────────────────────────────────────────────── */

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <NavBar />
      <main>
        <HeroSection onOpenModal={() => setShowModal(true)} />
        <MealSection />
        <TipsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      {showModal && <DietPlanModal onClose={() => setShowModal(false)} />}
    </>
  )
}
