import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { AnalysisResult } from './gpt-analysis.service';

/**
 * Interface defining the structure of the resume comparison result
 * Contains the match score and detailed skills comparison
 */
export interface ResumeComparisonResult {
  matchScore: number;
  skillsComparison: {
    required: string[];
    matching: string[];
    missing: string[];
  };
}

/**
 * Service responsible for comparing resumes against job descriptions
 * Uses OpenAI's GPT API to perform the comparison analysis
 */
@Injectable({
  providedIn: 'root'
})
export class ResumeComparisonService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    console.log('=== Resume Comparison Service Initialization ===');
    console.log('Environment:', environment.production ? 'Production' : 'Development');
    console.log('API Key exists:', !!environment.openaiApiKey);
    console.log('API Key length:', environment.openaiApiKey?.length);
    console.log('API Key starts with:', environment.openaiApiKey?.substring(0, 7));
    
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.openaiApiKey}`
    });
    
    console.log('Headers set:', this.headers.has('Authorization'));
  }

  /**
   * Compares a resume against a job description using GPT analysis
   * @param resumeText - The text content of the resume
   * @param jobDescription - The text content of the job description
   * @returns Observable<ResumeComparisonResult> - Analysis results including match score and skills comparison
   */
  compareResumes(resumeText: string, jobDescription: string): Observable<ResumeComparisonResult> {
    const comparisonPrompt = `
IMPORTANT: Return only a valid JSON object.

Analyze this job description and resume to create a skills-based comparison:

Job Description:
${jobDescription}

Candidate Resume:
${resumeText}

Required Response Format:
{
  "matchScore": number (0-100),
  "skillsComparison": {
    "required": [
      "List all required skills from job description",
      "Include technical skills, tools, frameworks"
    ],
    "matching": [
      "List skills found in both job and resume",
      "Include variations/similar technologies"
    ],
    "missing": [
      "List required skills not found in resume",
      "Note critical missing qualifications"
    ]
  }
}

Analysis Guidelines:
- Focus on technical skills, tools, frameworks
- Include soft skills only if specifically required
- Consider similar/equivalent technologies
- Weight core requirements more heavily
- Consider years of experience with technologies`;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS system that extracts and compares technical skills between job descriptions and resumes. Focus on accurate skill matching and identifying core requirements.'
        },
        {
          role: 'user',
          content: comparisonPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    };

    console.log('Request Payload:', payload);
    console.log('Headers being sent:', this.headers.keys());

    return this.http.post<any>(this.apiUrl, payload, { headers: this.headers })
      .pipe(
        map(response => {
          try {
            const content = response.choices[0].message.content.trim();
            return JSON.parse(content);
          } catch (error) {
            console.error('Error parsing resume comparison response:', error);
            throw new Error('Failed to parse resume comparison results');
          }
        })
      );
  }
} 