'use client';

export default function ClaimsProcess() {
  const steps = [
    {
      step: "1",
      title: "Report Your Claim",
      description: "Call our 24/7 claims hotline or submit online. Provide basic information about the incident.",
      icon: "ri-phone-line"
    },
    {
      step: "2", 
      title: "Document the Damage",
      description: "Take photos of damaged items and gather any relevant documentation like receipts or appraisals.",
      icon: "ri-camera-line"
    },
    {
      step: "3",
      title: "Claims Investigation",
      description: "Our claims specialist will review your case and may schedule an inspection if needed.",
      icon: "ri-search-line"
    },
    {
      step: "4",
      title: "Receive Payment",
      description: "Once approved, receive your settlement payment quickly via check or direct deposit.",
      icon: "ri-money-dollar-circle-line"
    }
  ];

  const faqs = [
    {
      question: "How quickly will my claim be processed?",
      answer: "Most claims are processed within 5-7 business days. Complex claims may take up to 14 days."
    },
    {
      question: "What documentation do I need for a claim?",
      answer: "Photos of damage, receipts or proof of value, police report (for theft), and completed claim form."
    },
    {
      question: "Is there a deductible on my protection plan?",
      answer: "No, all our protection plans come with zero deductible for your convenience."
    },
    {
      question: "Can I file a claim online?",
      answer: "Yes, you can file claims online 24/7 through our customer portal or mobile app."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Claims Process</h2>
          <p className="text-xl text-gray-600">Filing a claim is easy with our streamlined 4-step process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${step.icon} text-2xl text-blue-600 w-8 h-8 flex items-center justify-center`}></i>
              </div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Need to File a Claim?</h3>
              <p className="text-lg text-gray-700 mb-6">
                Our claims specialists are available 24/7 to help you through the process. Get started now or contact us for assistance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="ri-phone-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-lg font-semibold">1-800-CLAIMS-1</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-mail-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
                  <span className="text-lg">claims@hughestownselfstorage.com</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img
  src="/images/tenant/claims.jpg"
  alt="Claims Support"
  className="w-full rounded-lg shadow-lg object-cover h-[350px]"
/>
              <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 whitespace-nowrap cursor-pointer">
                File Claim Online
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}