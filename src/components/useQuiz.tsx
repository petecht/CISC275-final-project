import { useState } from 'react';
import { ChatMessage } from '../pages/Results';
import OpenAI from 'openai';

export interface QuestionAnswer {
  questionId: number;
  answer: string;
}

export function useQuiz(totalSteps: number) {
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [results, setResults] = useState<ChatMessage[]>([]);

  const handleOptionSelect = (questionId: number, answer: string) => {
    setAnswers(prev => {
      const updated = [...prev];
      const idx = updated.findIndex((a: QuestionAnswer) => a.questionId === questionId);
      if (idx >= 0) updated[idx].answer = answer;
      else updated.push({ questionId, answer });
      return updated;
    });
  };

  const isOptionSelected = (questionId: number, answer: string) =>
    answers.some((a: QuestionAnswer) => a.questionId === questionId && a.answer === answer);

  const getOptionClass = (questionId: number, answer: string) =>
    isOptionSelected(questionId, answer)
      ? 'option-button selected'
      : 'option-button';

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    const saveKey = 'MYKEY';
    const storedKey = localStorage.getItem(saveKey);
    const apiKey = storedKey ? JSON.parse(storedKey) : null;
  
    if (!apiKey) {
      alert("OpenAI API key not found in local storage.");
      return;
    }
  
    const answersText = answers.map((a, i) => `Q${i + 1}: ${a.answer}`).join('\n');
    const userMessage: ChatMessage = {
      role: 'user',
      content: `Based on these answers, give me a short career summary:\n${answersText}`,
    };
    setResults(prev => [...prev, userMessage]);
  
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [userMessage],
      });
  
      const reply = completion.choices?.[0]?.message?.content;
  
      if (reply) {
        setResults(prev => [...prev, { role: 'assistant', content: reply }]);
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
      alert("Failed to get a response from OpenAI.");
    }
  };
  

  return {
    answers,
    currentStep,
    results,
    totalSteps,
    handleOptionSelect,
    isOptionSelected,
    getOptionClass,
    handleNext,
    handlePrevious,
    handleSubmit,
  };
}
