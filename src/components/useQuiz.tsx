import { useState } from 'react';
import { ChatMessage } from '../pages/Results';
import OpenAI from 'openai';

export interface QuestionAnswer {
  questionId: number;
  answer: string;
}

export interface CareerReport {
  careers: {
    title: string;
    description: string;
    requiredEducation: string[];
    salaryRange: { min: number; max: number; median: number; };
    jobOutlook: { growth: string; demand: string; };
  }[];
  educationPaths: {
    degree: string;
    description: string;
    timeToComplete: string;
    institutions: string[];
    cost: { min: number; max: number; average: number; };
  }[];
  personalityInsights: string[];
  recommendedResources: string[];
}

export interface BasicCareerReport {
  topCareers: {
    title: string;
    description: string;
    requiredEducation: string[];
    keySkills: string[];
    fitScore: number;
  }[];
  strengths: string[];
  workEnvironmentPreferences: string[];
  learningPathways: string[];
}

export function useQuiz(totalSteps: number, quizType: string) {
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [results, setResults] = useState<ChatMessage[]>([]);
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null);
  const [basicCareerReport, setBasicCareerReport] = useState<BasicCareerReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    setIsLoading(true);
  
    const answersText = answers.map((a, i) => `Q${i + 1}: ${a.answer}`).join('\n');
    
    let userMessageContent = '';
    
    if (quizType === 'Detailed') {
      userMessageContent = `Based on these DETAILED quiz answers, generate a comprehensive career report in JSON format. 

For the analysis:
1. Provide 3-5 recommended careers based on the personality traits indicated by the answers
2. For each career, include detailed salary information with concrete numbers (min/max/median) for better visualization
3. For job outlook, provide clear growth percentages when possible (e.g., "15% growth expected over next decade")
4. Include education paths with real cost estimates and timeframes

Format the response as valid JSON exactly matching this structure:
{
  "careers": [
    {
      "title": "Career Title",
      "description": "Detailed description of what this career entails, day-to-day responsibilities, and why it matches the quiz answers",
      "requiredEducation": ["Bachelor's in XYZ", "Certification in ABC"],
      "salaryRange": { 
        "min": 45000, 
        "max": 120000, 
        "median": 75000 
      },
      "jobOutlook": { 
        "growth": "15% growth expected over the next decade", 
        "demand": "High demand across industries X, Y and Z" 
      }
    }
  ],
  "educationPaths": [
    {
      "degree": "Bachelor of Science in XYZ",
      "description": "This program focuses on developing skills in...",
      "timeToComplete": "4 years full-time",
      "institutions": ["University A", "College B", "Online Program C"],
      "cost": { 
        "min": 10000, 
        "max": 80000, 
        "average": 35000 
      }
    }
  ],
  "personalityInsights": [
    "You appear to be highly analytical with strong problem-solving skills",
    "You value creativity and innovation in your work environment",
    "You prefer collaborative settings over independent work"
  ],
  "recommendedResources": [
    "Book/Website: 'Career Path Guide for XYZ Field'",
    "Professional Association: XYZ Organization",
    "Online Course: 'Introduction to ABC' on platform XYZ"
  ]
}

Make sure all numeric values are actual numbers, not strings, and that all descriptions are detailed enough to be genuinely helpful.`;
    } else {
      // Basic quiz format
      userMessageContent = `Based on these BASIC quiz answers, generate a simplified career report in JSON format.

This should be more focused on general career directions rather than specific details:
1. Provide 3-4 top career matches based on the personality traits and preferences shown
2. Include key strengths derived from answers
3. Suggest work environment preferences
4. Suggest general learning pathways

Format the response as valid JSON exactly matching this structure:
{
  "topCareers": [
    {
      "title": "Career Field",
      "description": "Brief overview of what this career involves and why it matches the quiz taker",
      "requiredEducation": ["General education path 1", "General education path 2"],
      "keySkills": ["Skill 1", "Skill 2", "Skill 3"],
      "fitScore": 85
    }
  ],
  "strengths": [
    "You seem to be good at working with people",
    "You show creative problem-solving abilities",
    "You value structure and organization"
  ],
  "workEnvironmentPreferences": [
    "You might thrive in collaborative settings",
    "You appear to prefer a balance between creativity and structure",
    "A moderate-paced environment may suit you best"
  ],
  "learningPathways": [
    "Consider exploring courses in interpersonal communication",
    "Look into both creative and analytical fields",
    "Explore opportunities that balance independence with teamwork"
  ]
}

Make sure the fitScore is a number between 0-100 representing how well the career matches the quiz answers.`;
    }
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: `${userMessageContent}
      
Here are the quiz answers:
${answersText}`,
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
        response_format: { type: "json_object" }
      });
  
      const reply = completion.choices?.[0]?.message?.content;
  
      if (reply) {
        try {
          if (quizType === 'Detailed') {
            const parsedReport = JSON.parse(reply) as CareerReport;
            setCareerReport(parsedReport);
          } else {
            const parsedReport = JSON.parse(reply) as BasicCareerReport;
            setBasicCareerReport(parsedReport);
          }
          
          setResults(prev => [...prev, { 
            role: 'assistant', 
            content: "Career report generated successfully!" 
          }]);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          setResults(prev => [...prev, { 
            role: 'assistant', 
            content: reply 
          }]);
        }
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
      alert("Failed to get a response from OpenAI.");
    } finally {
      setIsLoading(false);
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
    careerReport,
    basicCareerReport,
    isLoading,
    quizType
  };
}
