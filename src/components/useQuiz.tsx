import { useState } from 'react';
import { ChatMessage } from '../pages/Results';
import OpenAI from 'openai';

//Format for each quiz question
export interface QuestionAnswer {
  questionId: number;
  answer: string;
}

//Structure for the detailed quiz results
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

//Now the structure for the basic quiz results
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
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]); //answers to quiz
  const [currentStep, setCurrentStep] = useState<number>(1); //current question in quiz
  const [results, setResults] = useState<ChatMessage[]>([]); //results for the quiz
  const [careerReport, setCareerReport] = useState<CareerReport | null>(null); //detailed report
  const [basicCareerReport, setBasicCareerReport] = useState<BasicCareerReport | null>(null); //basic report
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
  // Checks if a specific option is already selected
  const isOptionSelected = (questionId: number, answer: string) =>
    answers.some((a: QuestionAnswer) => a.questionId === questionId && a.answer === answer);

  const getOptionClass = (questionId: number, answer: string) =>
    isOptionSelected(questionId, answer)
      ? 'option-button selected'
      : 'option-button';

  // Advances to the next step in the quiz
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  //previous step in the quiz
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  //submits quiz answers to source for answers
  const handleSubmit = async () => {
    const saveKey = 'MYKEY';
    const storedKey = localStorage.getItem(saveKey);
    const apiKey = storedKey ? JSON.parse(storedKey) : null;
  
    if (!apiKey) {
      alert("OpenAI API key not found in local storage.");
      return;
    }
    
    //Loading image is turned on once submitted
    setIsLoading(true);
  
    const answersText = answers.map((a, i) => `Q${i + 1}: ${a.answer}`).join('\n');
    
    let userMessageContent = '';
    
    //Prepare the prompt depending on Quiz Type
    if (quizType === 'Detailed') {
      userMessageContent = `Based on these DETAILED quiz answers, generate a comprehensive career report in JSON format. 

For the analysis:
1. Provide 3-5 recommended careers based on the personality traits indicated by the answers
2. For each career, include detailed salary information with concrete numbers (min/max/median) for better visualization
3. For job outlook, provide clear growth percentages when possible (e.g., "15% growth expected over next decade")
4. Include education paths with real cost estimates and timeframes
5. For institutions, list actual universities and colleges that offer the relevant programs (do not include online programs)

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
      "institutions": ["University of California, Berkeley", "Stanford University", "Massachusetts Institute of Technology"],
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

Make sure all numeric values are actual numbers, not strings, and that all descriptions are detailed enough to be genuinely helpful. For institutions, list actual universities and colleges that offer the relevant programs, and do not include online programs.`;
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
    
    //save the prompt to the user results history
    setResults(prev => [...prev, userMessage]);
  
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", //use GPT-4o for the output
        messages: [userMessage],
        response_format: { type: "json_object" } //structured JSON format
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
          
          //notify the user that results were successfully generated
          setResults(prev => [...prev, { 
            role: 'assistant', 
            content: "Career report generated successfully!" 
          }]);
        } catch (parseError) {
          //shows raw LLM output if it does not work
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
      setIsLoading(false); //hide loading image again
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
