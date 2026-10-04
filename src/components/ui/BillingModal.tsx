import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileCheck2,
  Lock
} from 'lucide-react';
import { PlanType, BillingStatus } from '../../types';

export const BillingModal: React.FC = () => {
  const {
    isBillingModalOpen,
    closeBillingModal,
    billing,
    billingTargetJobId,
    selectedBillingPlan,
    setSelectedBillingPlan,
    upgradePlan,
    jobs
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'plans' | 'checkout' | 'processing' | 'failed' | 'success'>('plans');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [promoCode, setPromoCode] = useState('');

  if (!isBillingModalOpen) return null;

  const targetJob = billingTargetJobId ? jobs.find(j => j.id === billingTargetJobId) : undefined;

  const handleStartCheckout = (plan: PlanType) => {
    setSelectedBillingPlan(plan);
    setCheckoutStep('checkout');
  };

  const handleSimulatePayment = (fail = false) => {
    setCheckoutStep('processing');
    setTimeout(() => {
      if (fail) {
        setCheckoutStep('failed');
      } else {
        upgradePlan(selectedBillingPlan, billingTargetJobId);
        setCheckoutStep('success');
      }
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="billing-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-stone-200 shadow-2xl relative p-5 sm:p-7">
        {/* Close Button */}
        <button
          onClick={closeBillingModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP: PLANS SELECTION */}
        {checkoutStep === 'plans' && (
          <div>
            <div className="text-center max-w-lg mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Personal Federal Career Intelligence</span>
              </div>
              <h2 id="billing-modal-title" className="text-2xl font-bold text-stone-900 tracking-tight">
                {targetJob ? `Analyze ${targetJob.title}` : 'Choose Your Federal Intelligence Plan'}
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1">
                Evidence-driven matching and rigorous USAJOBS preparation. No fabricated claims, no generic AI summaries.
              </p>

              {/* Free tier remaining indicator */}
              <div className="mt-3 inline-block px-3.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600">
                Current allowance: <strong className="text-stone-900">{billing.remainingFreeAnalyses} detailed analyses remaining</strong> this month
              </div>
            </div>

            {/* Target Job Highlight if triggered from a job */}
            {targetJob && (
              <div className="bg-orange-50/60 border border-orange-200/80 rounded-2xl p-3.5 mb-5 text-xs text-orange-950 flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck2 className="w-4 h-4 text-orange-700" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{targetJob.title} — {targetJob.grade}</p>
                  <p className="text-stone-600">{targetJob.agency} • Announcement #{targetJob.announcementNumber}</p>
                  <p className="text-orange-900 mt-1 font-medium">
                    Unlock requirement-by-requirement evidence mapping, gap identification, and application readiness.
                  </p>
                </div>
              </div>
            )}

            {/* Pricing Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Option 1: Single Job Analysis ($9.99) */}
              <div
                onClick={() => setSelectedBillingPlan('job_analysis')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedBillingPlan === 'job_analysis'
                    ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-400/40'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Single Job</span>
                    {selectedBillingPlan === 'job_analysis' && (
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-stone-900">$9.99</span>
                    <span className="text-stone-500 text-xs ml-1">/ job</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mb-3">
                    One-time deep analysis of a specific federal announcement.
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-700 mb-4">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Full requirement mapping</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Evidence coverage audit</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Application prep checklist</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleStartCheckout('job_analysis')}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Single Job
                </button>
              </div>

              {/* Option 2: Career Pass ($39.99 / 3 months) - FEATURED */}
              <div
                onClick={() => setSelectedBillingPlan('career_pass')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between shadow-sm ${
                  selectedBillingPlan === 'career_pass'
                    ? 'border-orange-500 bg-white ring-2 ring-orange-500'
                    : 'border-orange-300 bg-white hover:border-orange-400'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-2xs">
                  Most Popular
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 mt-1">
                    <span className="text-xs font-bold text-orange-950">Career Pass</span>
                    <span className="text-[10px] font-medium text-stone-500">3 Months</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-extrabold text-stone-900">$39.99</span>
                    <span className="text-stone-500 text-xs ml-1">/ 3 months</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mb-3">
                    For candidates actively searching and applying for federal jobs.
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-700 mb-4">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-semibold text-stone-900">Unlimited job analyses</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Advanced evidence mapping</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Eligibility assessments</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Application prep & tracker</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Priority job alerts</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleStartCheckout('career_pass')}
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Get Career Pass
                </button>
              </div>

              {/* Option 3: Monthly ($19.99 / month) */}
              <div
                onClick={() => setSelectedBillingPlan('monthly')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedBillingPlan === 'monthly'
                    ? 'border-orange-500 bg-orange-50/30 ring-2 ring-orange-400/40'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Monthly</span>
                    {selectedBillingPlan === 'monthly' && (
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-stone-900">$19.99</span>
                    <span className="text-stone-500 text-xs ml-1">/ month</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mb-3">
                    For continuous federal job search and power users.
                  </p>
                  <ul className="space-y-1.5 text-xs text-stone-700 mb-4">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Unlimited job analyses</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Continuous application tracker</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => handleStartCheckout('monthly')}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Monthly
                </button>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Clear Guarantee:</span> GOVMATCH never inflates match probabilities or fabricates evidence. USAJOBS remains the official destination for application submission.
            </div>
          </div>
        )}

        {/* STEP: CHECKOUT / PAYMENT FORM */}
        {checkoutStep === 'checkout' && (
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setCheckoutStep('plans')}
              className="text-xs text-stone-500 hover:text-stone-800 mb-4 inline-flex items-center gap-1 cursor-pointer"
            >
              ← Back to plans
            </button>

            <h3 className="text-xl font-bold text-stone-900 mb-1">Confirm Order</h3>
            <p className="text-xs text-stone-500 mb-5">
              Secure checkout for {selectedBillingPlan === 'career_pass' ? 'Career Pass (3 Months)' : selectedBillingPlan === 'monthly' ? 'Monthly Access' : 'Single Job Analysis'}.
            </p>

            {/* Order Summary Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-5 space-y-2 text-xs">
              <div className="flex justify-between font-medium text-stone-700">
                <span>
                  {selectedBillingPlan === 'career_pass'
                    ? 'GOVMATCH Career Pass (3 Months Access)'
                    : selectedBillingPlan === 'monthly'
                    ? 'GOVMATCH Monthly Subscription'
                    : `Single Federal Job Analysis (${targetJob ? targetJob.title : 'Selected Job'})`}
                </span>
                <span className="font-bold text-stone-900">
                  {selectedBillingPlan === 'career_pass'
                    ? '$39.99'
                    : selectedBillingPlan === 'monthly'
                    ? '$19.99'
                    : '$9.99'}
                </span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Taxes & Fees</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-sm text-stone-900">
                <span>Total Due Today</span>
                <span className="text-orange-600">
                  {selectedBillingPlan === 'career_pass'
                    ? '$39.99'
                    : selectedBillingPlan === 'monthly'
                    ? '$19.99'
                    : '$9.99'}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-5">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedPaymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50/50 text-stone-900'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    selectedPaymentMethod === 'apple_pay'
                      ? 'border-orange-500 bg-orange-50/50 text-stone-900'
                      : 'border-stone-200 bg-white text-stone-600'
                  }`}
                >
                  Apple Pay / GPay
                </button>
              </div>

              {selectedPaymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue="Morgan Vance"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 4242"
                      className="w-full px-3 py-2 text-xs font-mono border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-stone-600 block mb-1">Expires</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 text-xs font-mono border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-600 block mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-3 py-2 text-xs font-mono border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleSimulatePayment(false)}
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Complete Order</span>
              </button>

              <button
                onClick={() => handleSimulatePayment(true)}
                className="w-full py-1.5 text-stone-500 hover:text-stone-700 text-[11px] underline cursor-pointer"
              >
                (Test simulated payment decline / failure)
              </button>
            </div>
          </div>
        )}

        {/* STEP: PROCESSING */}
        {checkoutStep === 'processing' && (
          <div className="text-center py-12 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">Authorizing Payment</h3>
            <p className="text-xs text-stone-600">
              Connecting with secure billing gateway... Your entitlement will unlock immediately.
            </p>
          </div>
        )}

        {/* STEP: FAILED */}
        {checkoutStep === 'failed' && (
          <div className="text-center py-8 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">Payment Could Not Be Completed</h3>
            <p className="text-xs text-stone-600 mb-5">
              The card authorization was declined or timed out. Your card has not been billed. Please check the details or select another method.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 cursor-pointer"
              >
                Try Again
              </button>
              <button
                onClick={closeBillingModal}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-200 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* STEP: SUCCESS */}
        {checkoutStep === 'success' && (
          <div className="text-center py-8 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">Access Unlocked!</h3>
            <p className="text-xs text-stone-600 mb-5">
              Your entitlement is active. You can now examine full requirement-by-requirement mappings and readiness workflows.
            </p>
            <button
              onClick={closeBillingModal}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Continue to Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
