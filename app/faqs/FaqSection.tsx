'use client';

import { useState } from 'react';

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "General Information",
      questions: [
        {
          question: "What are your operating hours?",
          answer: "Our office is open Monday through Saturday from 8:30 AM to 5:30 PM. Gate access to storage units is available from 6:00 AM to 10:00 PM every day."
        },
        {
          question: "Where are you located?",
          answer: "We're located at 133 New Street, Hughestown, PA 18640. We serve the greater Northeast Pennsylvania area."
        },
        {
          question: "Do I need to make an appointment to rent a unit?",
          answer: "No appointment is necessary! You can rent online 24/7 or visit us during office hours. We also offer tours of our facility anytime during gate access hours."
        },
        {
          question: "What forms of payment do you accept?",
          answer: "We accept cash, check, credit cards (Visa, MasterCard, American Express, Discover), and automatic bank transfers for monthly payments."
        }
      ]
    },
    {
      category: "Storage Units & Pricing",
      questions: [
        {
          question: "What sizes of storage units do you offer?",
          answer: "We offer various unit sizes from small 5x5 units perfect for closet storage to large 10x30 units that can hold the contents of a 4-bedroom home. Check our Storage Size Guide for detailed information."
        },
        {
          question: "How much does storage cost?",
          answer: "Pricing varies by unit size and availability. Small units start around $45/month, while larger units can range up to $180/month. Contact us for current pricing and availability."
        },
        {
          question: "Are there any additional fees?",
          answer: "There's a one-time administrative fee of $25 when you first rent a unit. We also require a security deposit equal to one month's rent, which is refundable when you move out."
        },
        {
          question: "Do you offer discounts?",
          answer: "Yes! We offer discounts for military personnel, seniors, and students. We also have promotional rates for new customers and discounts for long-term rentals."
        }
      ]
    },
    {
      category: "Access & Security",
      questions: [
        {
          question: "How do I access my storage unit?",
          answer: "Each tenant receives a unique access code for our electronic gate system. You can access your unit anytime between 6:00 AM and 10:00 PM using your personalized code."
        },
        {
          question: "Is the facility secure?",
          answer: "Absolutely! Our facility features 24/7 video surveillance, electronic gate access, individual unit alarms, and on-site management. We take security very seriously."
        },
        {
          question: "Can I give someone else access to my unit?",
          answer: "Yes, you can authorize additional people to access your unit by adding them to your rental agreement. They'll need to provide valid ID and sign our access authorization form."
        }
      ]
    },
    {
      category: "Moving & Storage Tips",
      questions: [
        {
          question: "Do you sell moving supplies?",
          answer: "Yes! We carry a full line of moving supplies including boxes, tape, bubble wrap, furniture covers, and locks. Visit our Moving Supplies page for a complete list."
        },
        {
          question: "Can you recommend a moving company?",
          answer: "We work with several reputable local moving companies and can provide recommendations based on your specific needs and budget."
        },
        {
          question: "What items cannot be stored?",
          answer: "Prohibited items include hazardous materials, flammable liquids, perishable food, live animals, illegal items, and anything with strong odors. See your rental agreement for a complete list."
        },
        {
          question: "Do you offer climate-controlled units?",
          answer: "While our standard units are not climate-controlled, we do offer climate-controlled document storage for sensitive papers and files."
        }
      ]
    },
    {
      category: "Rental Terms & Policies",
      questions: [
        {
          question: "What is the minimum rental period?",
          answer: "We require a minimum 30-day rental period. After that, rentals are month-to-month with no long-term commitment required."
        },
        {
          question: "How much notice do I need to give when moving out?",
          answer: "We require 10 days written notice before the end of your rental period. You can provide notice in person, by phone, email, or through our online portal."
        },
        {
          question: "What happens if I'm late with my payment?",
          answer: "Rent is due on the 1st of each month with a 10-day grace period. After that, a $25 late fee applies. If payment is 30 days overdue, we may restrict access and begin the lien process."
        },
        {
          question: "Do you offer insurance for stored items?",
          answer: "We offer tenant protection plans starting at $9/month that cover your belongings against theft, fire, and other covered perils. You can also use your homeowner's or renter's insurance."
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = categoryIndex * 100 + questionIndex;
                const isOpen = openItems.includes(globalIndex);
                
                return (
                  <div key={questionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleItem(globalIndex)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="font-semibold text-gray-800">{faq.question}</span>
                      <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-xl text-gray-600`}></i>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-purple-50 rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our friendly staff is here to help!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 whitespace-nowrap cursor-pointer">
              Contact Us
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white whitespace-nowrap cursor-pointer">
              Call (570) 362-6150
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}