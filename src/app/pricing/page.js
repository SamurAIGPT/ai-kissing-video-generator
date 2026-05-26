"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { FaCheck, FaHeart } from "react-icons/fa";

export default function PricingPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (planId) => {
    if (!session) {
      signIn("google");
      return;
    }

    try {
      setLoading(planId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!res.ok) throw new Error("Failed to create checkout");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout error. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      id: "basic",
      name: "Basic Kiss Pack",
      price: "$5.00",
      credits: 1000,
      description: "Ideal for trying out AI kiss generation with your loved one.",
      features: [
        "2 ultra-cinematic Veo 3.1 generations (500 Hearts each)",
        "Or up to 7 fast Wan 2.7 generations at standard parameters",
        "Editable romantic custom prompts",
        "Multiple aspect ratio supports (16:9 / 9:16)",
        "Secure storage for creations history",
        "Download output videos in HD"
      ],
      tag: "Starter"
    },
    {
      id: "standard",
      name: "Sweetheart Pack",
      price: "$10.00",
      credits: 2000,
      description: "Perfect for regular romance scene creations & experimenting.",
      features: [
        "4 ultra-cinematic Veo 3.1 generations (500 Hearts each)",
        "Or up to 15 fast Wan 2.7 generations at standard parameters",
        "Or 6 cohesive Gemini Omni generations (300 Hearts each)",
        "Editable romantic custom prompts",
        "Priority high-speed generation queue",
        "Secure storage for creations history",
        "Download output videos in HD"
      ],
      tag: "Sweetheart"
    },
    {
      id: "pro",
      name: "Romance Pro Pack",
      price: "$20.00",
      credits: 4000,
      description: "Get 4,000 Hearts for creative power-users to generate high-fidelity kisses.",
      features: [
        "8 ultra-cinematic Veo 3.1 generations (500 Hearts each)",
        "Or up to 30 fast Wan 2.7 generations at standard parameters",
        "Or 13 cohesive Gemini Omni generations (300 Hearts each)",
        "Priority high-speed generation queue",
        "Premium support with rapid email handling",
        "Multiple aspect ratio supports (16:9 / 9:16)",
        "Download output videos in HD"
      ],
      tag: "Best Deal"
    },
    {
      id: "business",
      name: "Cupid Elite Pack",
      price: "$50.00",
      credits: 10000,
      description: "Ultimate pack for agencies, creators, and large catalogs.",
      features: [
        "20 ultra-cinematic Veo 3.1 generations (500 Hearts each)",
        "Or up to 76 fast Wan 2.7 generations at standard parameters",
        "Or 33 cohesive Gemini Omni generations (300 Hearts each)",
        "Unrestricted priority generation queue",
        "24/7 VIP Dedicated Account Manager",
        "Early access to premium new models",
        "Download output videos in HD"
      ],
      tag: "Elite"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-xs font-semibold text-rose-300 mb-4 animate-bounce">
          <FaHeart className="text-rose-500 text-[10px]" />
          <span>Romantic Deals</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-pink-300 via-rose-400 to-rose-600 bg-clip-text text-transparent">
          Simple, Credit-Based Pricing
        </h1>
        <p className="mt-3 text-zinc-400 max-w-md mx-auto text-sm">
          Top up your account with Hearts to generate ultra-realistic kissing videos. Try different models with separate Heart rates.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col justify-between bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl transition-all hover:border-rose-500/20 hover:shadow-2xl hover:shadow-rose-950/5 relative overflow-hidden group"
          >
            {/* Ambient background glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/15 transition-all duration-500" />
            
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">{plan.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
                  {plan.tag}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-3xl font-extrabold tracking-tight text-white">{plan.price}</span>
                <span className="ml-1 text-sm text-zinc-500">/ one-time</span>
              </div>

              <div className="mt-6 py-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-300">Hearts Included</span>
                <span className="text-lg font-bold text-rose-400 flex items-center gap-1">
                  <FaHeart className="text-xs animate-pulse text-rose-500" />
                  {plan.credits} Hearts
                </span>
              </div>

              <ul className="mt-6 space-y-3.5 border-t border-zinc-800/80 pt-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-zinc-300">
                    <FaCheck className="mt-0.5 text-rose-500 flex-shrink-0 text-[10px]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan.id)}
              disabled={loading !== null}
              className="mt-8 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg transition-all cursor-pointer shadow-lg shadow-rose-500/10 hover:scale-[1.01]"
            >
              {loading === plan.id ? "Redirecting..." : `Purchase ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
