import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, tap, catchError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface AnalysisResult {
  programmingLanguages: string[];
  frameworks: string[];
  databaseTools: string[];
  cloudTech: string[];
  devOpsTools: string[];
  preferredTech: string[];
  yearsOfExperience: string;
  salaryRange: string;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  jobType: string;
  notes: string;
  description: string;
  idealCandidate: {
    profile: {
      summary: string;
      keyStrengths: string[];
    };
    education: {
      degree: string;
      field: string;
      level: string;
    };
    experience: {
      totalYears: string;
      requiredExperience: string[];
      preferredExperience: string[];
    };
    skills: {
      technical: string[];
      soft: string[];
    };
  };
}

/**
 * Service handling the GPT-based analysis of job descriptions
 * Extracts key information and generates ideal candidate profiles
 */
@Injectable({
  providedIn: 'root'
})
export class GptAnalysisService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    console.log('=== GPT Analysis Service Initialization ===');
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

  analyzeJobDescription(jobDescription: string): Observable<AnalysisResult> {
    console.log('=== Starting Job Analysis ===');
    console.log('Job Description Length:', jobDescription.length);
    
    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at converting job descriptions into structured candidate profiles. Return only valid JSON. Do not use markdown formatting or code blocks. The response should be a raw JSON object only.'
        },
        {
          role: 'user',
          content: `
Analyze this job description and extract key info as valid JSON only. 
Format as a complete candidate profile matching this exact structure.
Use double quotes for all strings and properties.

Job Description:
${jobDescription}

Return only valid JSON matching this structure (no additional text):
{
  "programmingLanguages": [],
  "frameworks": [],
  "databaseTools": [],
  "cloudTech": [],
  "devOpsTools": [],
  "preferredTech": [],
  "yearsOfExperience": "",
  "salaryRange": "",
  "jobTitle": "",
  "companyName": "",
  "jobLocation": "",
  "jobType": "",
  "notes": "",
  "description": "",
  "idealCandidate": {
    "profile": {
      "summary": "",
      "keyStrengths": []
    },
    "education": {
      "degree": "",
      "field": "",
      "level": ""
    },
    "experience": {
      "totalYears": "",
      "requiredExperience": [],
      "preferredExperience": []
    },
    "skills": {
      "technical": [],
      "soft": []
    }
  }
}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    };

    console.log('Request Payload:', payload);
    console.log('Headers being sent:', this.headers.keys());

    return this.http.post<any>(this.apiUrl, payload, { headers: this.headers }).pipe(
      map(response => {
        console.log('Raw API Response:', response);
        
        if (!response.choices?.[0]?.message?.content) {
          throw new Error('Invalid API response format');
        }

        const content = response.choices[0].message.content.trim();
        console.log('Parsed Content:', content);

        try {
          const parsed = JSON.parse(content);
          
          // Validate the parsed response has required structure
          if (!parsed.idealCandidate?.profile) {
            console.error('Missing required profile structure:', parsed);
            throw new Error('Invalid response structure');
          }
          
          console.log('Successfully parsed analysis:', parsed);
          return parsed as AnalysisResult;
        } catch (error) {
          console.error('Error parsing analysis response:', error);
          console.error('Problematic content:', content);
          throw new Error('Failed to parse analysis results');
        }
      }),
      catchError(error => {
        console.error('Analysis Error:', error);
        throw error;
      })
    );
  }

  private generateIdealProfile(jobData: AnalysisResult): Observable<AnalysisResult> {
    const resumePrompt = `
IMPORTANT: Return only a valid JSON object. Do not use markdown formatting or code blocks.
Generate an ideal candidate's profile matching this structure exactly.
Format as a professional resume showcasing the perfect candidate for this role.
- Use double quotes for all strings and properties
- Escape all newlines with "\\n"
- Do not add any text or formatting outside the JSON object
- Ensure all JSON is properly escaped and valid

Base the profile on this job data:
${JSON.stringify(jobData, null, 2)}

Required format:
{
  ... (keep all job data fields) ...,
  "idealCandidate": {
    "profile": {
      "summary": "2-3 powerful sentences highlighting expertise and impact. Focus on achievements and value delivered.",
      "keyStrengths": [
        "Each strength should be 1-2 specific sentences with metrics",
        "Focus on concrete achievements and quantifiable results",
        "Include technology expertise and business impact"
      ]
    },
    "education": {
      "degree": "Specific degree title",
      "field": "Field of study",
      "level": "Education level"
    },
    "experience": {
      "totalYears": "Total years of experience",
      "requiredExperience": [
        "Senior Software Engineer\\nTech Company | 2020-2023\\n• Achievement with metrics using specific tech\\n• Achievement with metrics using specific tech\\n• Achievement with metrics using specific tech"
      ],
      "preferredExperience": [
        "Similar format to required experience"
      ]
    },
    "skills": {
      "technical": [
        "Programming Languages: Lang1, Lang2",
        "Frameworks: Framework1, Framework2",
        "Database Tools: DB1, DB2",
        "Cloud Technologies: Cloud1, Cloud2",
        "DevOps Tools: Tool1, Tool2"
      ],
      "soft": [
        "One clear sentence about collaboration/teamwork",
        "One clear sentence about problem-solving/analytical skills",
        "One clear sentence about communication/leadership"
      ]
    }
  }
}

Guidelines:
1. Summary: Focus on candidate's proven expertise and impact
2. Key Strengths: Each should be a clear, specific achievement with metrics
3. Experience: Format job entries exactly as shown, with company, dates, and bullet points
4. Skills: Group technical skills by category, one category per line
5. Soft Skills: Make each a complete, specific sentence about the candidate's abilities`;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You create detailed candidate profiles from job requirements. Return only valid JSON. Do not use markdown formatting or code blocks. The response should be a raw JSON object only.'
        },
        {
          role: 'user',
          content: resumePrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.5,
      frequency_penalty: 0.3
    };

    return this.http.post<any>(this.apiUrl, payload, { headers: this.headers }).pipe(
      map((response) => {
        let content = response.choices[0].message.content.trim();
        
        // Remove any markdown formatting if present
        if (content.startsWith('```json')) {
          content = content.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (content.startsWith('```')) {
          content = content.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        // Additional cleanup
        content = content.trim();

        try {
          const parsed = JSON.parse(content);
          console.log('Successfully parsed profile:', parsed);
          return parsed;
        } catch (error) {
          console.error('Error parsing profile generation response:', error);
          console.error('Problematic content:', content);
          throw new Error('Failed to generate ideal profile - invalid JSON format');
        }
      })
    );
  }
}