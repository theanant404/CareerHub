// Enhanced opportunities service with bookmark integration
export interface Opportunity {
  id: number;
  title: string;
  company: string;
  type: "job" | "internship" | "scholarship";
  location: string;
  salary?: string;
  deadline?: string;
  description: string;
  tags: string[];
  postedDate?: string;
  applicationUrl?: string;
}

export class OpportunityService {
  private static OPPORTUNITIES_KEY = 'allOpportunities';

  // Get all opportunities (from localStorage and external sources)
  static getAllOpportunities(): Opportunity[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(this.OPPORTUNITIES_KEY);
    const storedOpportunities = stored ? JSON.parse(stored) : [];
    
    // Get company posted jobs
    const companyJobs = this.getCompanyPostedJobs();
    
    // Combine and deduplicate
    const allOpportunities = [...storedOpportunities, ...companyJobs];
    return this.deduplicateOpportunities(allOpportunities);
  }

  // Get company posted jobs from localStorage
  private static getCompanyPostedJobs(): Opportunity[] {
    const savedJobs = localStorage.getItem("postedJobs");
    if (!savedJobs) return [];
    
    try {
      const parsedJobs = JSON.parse(savedJobs);
      return parsedJobs.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        type: job.type,
        location: job.location,
        salary: job.salary,
        description: job.description,
        tags: job.requirements || [],
        postedDate: job.postedDate || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error parsing company jobs:", error);
      return [];
    }
  }

  // Remove duplicate opportunities based on ID
  private static deduplicateOpportunities(opportunities: Opportunity[]): Opportunity[] {
    const seen = new Set();
    return opportunities.filter(opp => {
      if (seen.has(opp.id)) return false;
      seen.add(opp.id);
      return true;
    });
  }

  // Search opportunities
  static searchOpportunities(query: string, type?: string): Opportunity[] {
    const opportunities = this.getAllOpportunities();
    const searchTerm = query.toLowerCase();
    
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(searchTerm) ||
                           opp.company.toLowerCase().includes(searchTerm) ||
                           opp.description.toLowerCase().includes(searchTerm) ||
                           opp.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      
      const matchesType = !type || type === 'all' || opp.type === type;
      
      return matchesSearch && matchesType;
    });
  }

  // Get opportunity by ID
  static getOpportunityById(id: number): Opportunity | null {
    const opportunities = this.getAllOpportunities();
    return opportunities.find(opp => opp.id === id) || null;
  }

  // Get opportunities by type
  static getOpportunitiesByType(type: "job" | "internship" | "scholarship"): Opportunity[] {
    const opportunities = this.getAllOpportunities();
    return opportunities.filter(opp => opp.type === type);
  }

  // Get recent opportunities
  static getRecentOpportunities(limit: number = 10): Opportunity[] {
    const opportunities = this.getAllOpportunities();
    return opportunities
      .sort((a, b) => new Date(b.postedDate || '').getTime() - new Date(a.postedDate || '').getTime())
      .slice(0, limit);
  }
}