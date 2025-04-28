'use client';

import React, { useState, useEffect } from 'react';


export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [problem, setProblem] = useState('');
  const [software, setSoftware] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | string[]>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const jobRoles = [
    "Real Estate Agent",
    "Broker / Team Leader",
    "Marketing Specialist",
    "Operations Manager",
    "Property Manager",
    "Investor",
    "Mortgage Advisor",
    "Transaction Coordinator",
    "Founder / Owner"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Validar campos requeridos, INCLUYENDO software de nuevo
    if (!firstName || !lastName || !jobRole || !email || !problem || !software) { 
      setMessage('Please fill in all required fields before submitting.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, jobRole, email, problem, software }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setMessage([
          'Check your email in 45 seconds.',
          'You are already 75% ahead of competition.',
          'See you there.'
        ]);
        setFirstName('');
        setLastName('');
        setJobRole('');
        setEmail('');
        setProblem('');
        setSoftware('');
      } else {
        setMessage('There was an error. Please try again.');
      }
    } catch (error) {
      setMessage('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Validaciones...
    if (currentStep === 0) {
      if (!firstName || !lastName) {
        setMessage('Please fill in both your first and last name before proceeding.');
        return;
      }
    } else if (currentStep === 1) {
      if (!problem) {
        setMessage('Please describe your problem before proceeding.');
        return;
      }
    } else if (currentStep === 2) {
      if (!jobRole) {
        setMessage('Please enter your job role before proceeding.');
        return;
      }
    } else if (currentStep === 3) { 
      if (!software) {
        setMessage('Please specify the software you use before proceeding.');
        return;
      }
    } else if (currentStep === 4) {
      if (!email) {
        setMessage('Please enter your email address before submitting.');
        return;
      }
    }

    setIsFading(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsFading(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentStep === 0 && firstName && lastName) {
        nextStep();
      } else if (currentStep === 1 && problem) {
        nextStep();
      } else if (currentStep === 2 && jobRole) {
        nextStep();
      } else if (currentStep === 3 && software) {
        nextStep();
      } else if (currentStep === 4 && email) {
        handleSubmit(e);
      }
    }
  };

  // Define el número total de pasos (0-indexado, así que 5 pasos son 0, 1, 2, 3, 4)
  const totalSteps = 5; 

  // Calcula el porcentaje de progreso
  // Sumamos 1 a currentStep porque es 0-indexado
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-xl bg-white/10 backdrop-blur-sm shadow-2xl transition-shadow duration-300 hover:shadow-xl">
      {/* --- El código de la barra de progreso ya NO va aquí --- */}

      {isSubmitted ? (
        <div className="text-center text-green-400 transition-opacity duration-500 ease-in-out space-y-2">
          {Array.isArray(message) ? (
            message.map((line, index) => (
              <p key={index} className="font-bold">{line}</p>
            ))
          ) : (
            <p className="font-bold">{message}</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`space-y-6`} onKeyDown={handleKeyDown}>
          <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
            {currentStep === 0 && (
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-4">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setMessage('');
                    }}
                    onBlur={() => {
                      if (firstName) {
                        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                        setFirstName(formattedName);
                      }
                    }}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                    placeholder="Your First Name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-4">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setMessage('');
                    }}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                    placeholder="Your Last Name"
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <label htmlFor="problem" className="block text-base font-bold text-white mb-4">
                {firstName ? `${firstName}, what is ` : 'What is '}the biggest challenge or bottleneck you're currently facing in your business?
                </label>
                <textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                    setMessage('');
                  }}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                  placeholder="Describe your problem..."
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <label htmlFor="jobRole" className="block text-base font-bold text-white mb-4">
                  {firstName ? `${firstName}, to make ` : 'To make '}sure you get the perfect solution, please type your current job role as accurately as possible.
                </label>
                <input
                  type="text"
                  id="jobRole"
                  value={jobRole}
                  onChange={(e) => {
                    setJobRole(e.target.value);
                    setMessage('');
                  }}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                  placeholder="Owner, Real Estate Agent, Property Developer, Operations Manager…"
                />
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <label htmlFor="software" className="block text-base font-bold text-white mb-4">
                Please share the name of any software you currently use in your business. If you don't use any, simply type 'none'.
                </label>
                <input
                  type="text"
                  id="software"
                  value={software}
                  onChange={(e) => {
                    setSoftware(e.target.value);
                    setMessage('');
                  }}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                  placeholder="Example: CRM, marketing tools..."
                />
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <label htmlFor="email" className="block text-base font-bold text-white mb-4">
                Where should we send your personalized solution? <br>
                </br> Type your best email below.
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage('');
                  }}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/20 shadow-md focus:outline-none focus:ring-2 focus:ring-[#3533cd]"
                  placeholder="your@email.com"
                />
              </div>
            )}
          </div>

          {/* --- Sección de Botones --- */}
          <div className="flex justify-between">
            {currentStep < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3 px-4 text-white font-bold tracking-wider rounded-lg shadow-lg
                           bg-gradient-to-r from-[#3533cd] to-[#000000]
                           hover:from-[#1a18ab] hover:to-[#1a18ab]
                           transform hover:scale-105
                           transition-[background-image,transform] duration-300 ease-in-out"
              >
                Next
              </button>
            )}
            {currentStep === 4 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#3533cd] to-[#000000] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Get Solution'}
              </button>
            )}
          </div>

          {/* --- Pega la Barra de Progreso AQUÍ --- */}
          {!isSubmitted && ( // Oculta la barra si el formulario ya se envió
            <div className="mt-14"> {/* Margen superior para separar de los botones */}
              {/* Opcional: Texto de progreso */}
              <div className="flex justify-between mb-1 text-white/80 text-sm">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(progressPercentage)}% to a New World</span>
              </div>
              {/* Contenedor de la barra */}
              <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden"> 
                {/* Barra de relleno */}
                <div 
                  className="bg-[#3533cd] h-full rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }} 
                ></div>
              </div>
            </div>
          )}
          {/* --- Fin Barra de Progreso --- */}

          {/* --- Mensaje de Error/Validación --- */}
          {message && !isSubmitted && typeof message === 'string' && (
            <p className={`text-center ${message.includes('error') ? 'text-red-400' : 'text-green-400'} mt-4`}> 
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
} 