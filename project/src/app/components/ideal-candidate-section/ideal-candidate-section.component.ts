// ideal-candidate-section.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisResult } from '../../services/gpt-analysis.service';

@Component({
  selector: 'app-ideal-candidate-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="analysis" class="py-8 sm:py-12 bg-white">
      <div class="container mx-auto px-4 sm:px-14">
        <div class="bg-white p-6 sm:p-10 rounded-lg shadow-lg max-w-[1400px] mx-auto">
          <h2 class="text-[28px] xl:text-[36px] font-bold mb-2 text-[#2c2c2c]">Ideal Candidate Profile</h2>
          <p class="text-[18px] text-[#2c2c2c] mb-8">Detailed analysis of the perfect candidate for this role</p>
          
          <div class="space-y-8">
            <!-- Profile -->
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-[24px] font-semibold mb-4 text-[#2c2c2c]">Profile Overview</h3>
              <div class="space-y-6">
                <p class="text-[16px] text-[#2c2c2c] leading-[27px]">
                  {{ analysis.idealCandidate.profile.summary }}
                </p>
                <div>
                  <h4 class="text-[20px] font-semibold mb-4 text-[#2c2c2c]">Key Strengths</h4>
                  <ul class="list-disc pl-6 space-y-4">
                    <li *ngFor="let strength of analysis.idealCandidate.profile.keyStrengths" 
                        class="text-[16px] text-[#2c2c2c] leading-[27px]">
                      {{ strength }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Education -->
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-[24px] font-semibold mb-4 text-[#2c2c2c]">Education Requirements</h3>
              <div class="space-y-3">
                <p class="text-[18px] font-medium text-[#2c2c2c]">
                  {{ analysis.idealCandidate.education.degree }}
                </p>
                <p class="text-[16px] text-[#2c2c2c] leading-[27px]">
                  Field: {{ analysis.idealCandidate.education.field }}
                </p>
                <p class="text-[16px] text-[#2c2c2c] leading-[27px]">
                  Level: {{ analysis.idealCandidate.education.level }}
                </p>
              </div>
            </div>

            <!-- Experience -->
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-[24px] font-semibold mb-4 text-[#2c2c2c]">Experience Requirements</h3>
              <div class="space-y-8">
                <div>
                  <h4 class="text-[20px] font-semibold mb-4 text-[#2c2c2c]">Required Experience</h4>
                  <div class="space-y-6">
                    <div *ngFor="let exp of analysis.idealCandidate.experience.requiredExperience">
                      <div class="text-[16px] text-[#2c2c2c] leading-[27px] whitespace-pre-line">{{ exp }}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="text-[20px] font-semibold mb-4 text-[#2c2c2c]">Preferred Experience</h4>
                  <div class="space-y-6">
                    <div *ngFor="let exp of analysis.idealCandidate.experience.preferredExperience">
                      <div class="text-[16px] text-[#2c2c2c] leading-[27px] whitespace-pre-line">{{ exp }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-[24px] font-semibold mb-4 text-[#2c2c2c]">Required Skills</h3>
              <div class="space-y-6">
                <div>
                  <h4 class="text-[20px] font-semibold mb-4 text-[#2c2c2c]">Technical Skills</h4>
                  <div class="space-y-3">
                    <p *ngFor="let skill of analysis.idealCandidate.skills.technical"
                       class="text-[16px] text-[#2c2c2c] leading-[27px]">
                      <span class="font-medium">{{ getSkillCategory(skill) }}:</span>
                      {{ getSkillItems(skill) }}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 class="text-[20px] font-semibold mb-4 text-[#2c2c2c]">Soft Skills</h4>
                  <ul class="list-disc pl-6 space-y-3">
                    <li *ngFor="let skill of analysis.idealCandidate.skills.soft"
                        class="text-[16px] text-[#2c2c2c] leading-[27px]">
                      {{ skill }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class IdealCandidateSectionComponent {
  @Input() analysis?: AnalysisResult | null;

  /* Mock data commented out as requested
  private mockData: AnalysisResult = {
    programmingLanguages: ["Python", "Java", "C++"],
    frameworks: ["React", "Spring Boot", "Flask"],
    databaseTools: ["MySQL", "MongoDB", "DynamoDB"],
    cloudTech: ["AWS", "GCP", "Azure"],
    devOpsTools: ["Docker", "Kubernetes", "Jenkins"],
    preferredTech: ["RESTful APIs", "GraphQL"],
    yearsOfExperience: "5",
    salaryRange: "$100k - $150k",
    jobTitle: "Senior Software Engineer",
    companyName: "Top Tech Company",
    jobLocation: "San Francisco, CA",
    jobType: "Full-Time",
    notes: "Looking for a highly skilled engineer.",
    description: "Responsible for developing scalable software solutions.",
    idealCandidate: {
      profile: {
        summary: "Innovative and highly motivated Computer Science graduate with strong foundations in algorithms, data structures, and scalable system design. Experience includes impactful internships at FAANG companies and startups, delivering production-grade software and optimizing performance in high-traffic environments. Passionate about building solutions that bridge technology and user needs.",
        keyStrengths: [
          "Proven ability to lead cross-functional teams in developing scalable applications, resulting in a 30% increase in system efficiency.",
          "Expertise in modern web frameworks and cloud technologies, enabling the deployment of robust and reliable services.",
          "Strong problem-solving skills with a track record of identifying and mitigating performance bottlenecks."
        ]
      },
      education: {
        degree: "Bachelor of Science in Computer Science",
        field: "Computer Science",
        level: "Undergraduate"
      },
      experience: {
        totalYears: "5",
        requiredExperience: [
          "Senior Software Engineer\nGoogle | 2020-2023\n• Developed scalable microservices using Java and Spring Boot, increasing system efficiency by 40%\n• Optimized database queries reducing latency by 30%\n• Implemented CI/CD pipelines using Jenkins, accelerating deployment time by 50%"
        ],
        preferredExperience: [
          "Backend Engineer\nMeta | 2018-2020\n• Contributed to backend services powering Facebook Messenger, improving message delivery speed by 15%\n• Implemented monitoring tools with Prometheus and Grafana to ensure uptime for services with 99.99% SLA\n• Used Hack (PHP), MySQL, and GraphQL for database optimization and API design"
        ]
      },
      skills: {
        technical: [
          "Programming Languages: Python, Java, C++, JavaScript, SQL",
          "Frameworks: React, Spring Boot, Flask, Node.js",
          "Database Tools: MySQL, MongoDB, DynamoDB, PostgreSQL",
          "Cloud Technologies: AWS (S3, Lambda, EC2), GCP, Azure",
          "DevOps Tools: Docker, Kubernetes, Jenkins, Terraform, Git",
          "Preferred Tech: RESTful APIs, GraphQL, TensorFlow, PyTorch, CI/CD, Agile methodologies"
        ],
        soft: [
          "Strong collaboration and communication in cross-functional teams",
          "Detail-oriented with a proven ability to debug and optimize complex systems",
          "Enthusiastic about learning and adapting to new technologies"
        ]
      }
    }
  };
  */

  getSkillCategory(skill: string): string {
    const [category] = skill.split(':');
    return category ? category.trim() : '';
  }

  getSkillItems(skill: string): string {
    const parts = skill.split(':');
    return parts.length > 1 ? parts[1].trim() : '';
  }
}