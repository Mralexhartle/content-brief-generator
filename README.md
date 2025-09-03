# Content Brief Generator MVP

A modern AI-powered content brief generator that creates detailed, SEO-optimized content briefs in seconds. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### ✨ Core Features
- **AI-Powered Content Analysis**: Analyzes top-performing content automatically
- **Structured Brief Generation**: Creates detailed content outlines with word counts
- **SEO Optimization**: Provides keyword suggestions and optimization recommendations
- **Competitor Insights**: Shows what works in your niche
- **PDF Export**: Export briefs as professional PDF documents
- **User Authentication**: Sign up and manage your account

### 🎯 Target Users
- Content creators and bloggers
- Small business owners
- Marketing agencies
- SEO specialists

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Auth)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **State Management**: React hooks
- **Styling**: Tailwind CSS with responsive design
- **IDE Integration**: Cursor MCP (Model Context Protocol)

## Supabase MCP Configuration

The `.cursor/mcp.json` file enables Cursor IDE integration with Supabase, providing AI-powered assistance for database operations and development.

### Getting Your Supabase Credentials:

1. **Access Token**: Go to [Supabase Dashboard](https://supabase.com/dashboard) > Settings > Access Tokens
2. **Project ID**: Found in your project URL (e.g., `your-project-id.supabase.co`)

### MCP Configuration Steps:

1. Copy the example file:
```bash
cp .cursor/mcp.example.json .cursor/mcp.json
```

2. Edit `.cursor/mcp.json` and replace:
   - `your_supabase_access_token_here` with your actual access token
   - `your_project_id_here` with your Supabase project ID

3. Restart Cursor IDE to activate the MCP integration

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Create a GitHub repository:**
```bash
# Go to GitHub and create a new repository called "content-brief-generator"
# Then add it as remote:
git remote add origin https://github.com/YOUR_USERNAME/content-brief-generator.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import the `content-brief-generator` repository
   - Vercel will automatically detect it's a Next.js app
   - Add your environment variables (see below)
   - Deploy!

### Option 2: Manual Deployment

1. **Set up Supabase:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Go to Settings > API
   - Copy your URL and anon key
   - Go to SQL Editor and run:
   ```sql
   -- Create briefs table
   CREATE TABLE briefs (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     topic TEXT NOT NULL,
     title TEXT NOT NULL,
     description TEXT,
     keywords TEXT[],
     outline JSONB,
     seo_recommendations JSONB,
     competitor_insights JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;

   -- Create policy for users to access their own briefs
   CREATE POLICY "Users can access their own briefs" ON briefs
     FOR ALL USING (auth.uid() = user_id);
   ```

2. **Configure Environment Variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

3. **Deploy anywhere that supports Node.js:**
   - Railway, Render, DigitalOcean App Platform, etc.
   - Just make sure to set the environment variables

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- npm or yarn
- Cursor IDE (for MCP integration)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/content-brief-generator.git
cd content-brief-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase MCP configuration:
```bash
# Copy the MCP configuration
cp ../.cursor/mcp.example.json ../.cursor/mcp.json

# Edit the MCP configuration with your Supabase credentials
# You'll need your Supabase access token and project ID
```

4. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Generating a Content Brief

1. **Enter Your Topic**: Type any topic you want to create content about
2. **Generate Brief**: Click "Generate Content Brief" to start the AI analysis
3. **Review Results**: Get a complete brief with:
   - Content structure and outline
   - Target keywords
   - SEO recommendations
   - Competitor insights
4. **Export**: Download as PDF or copy sections

### Authentication

- **Sign Up**: Create a free account to track your briefs
- **Free Trial**: 10 free briefs per month
- **Premium**: Upgrade for unlimited briefs and advanced features

## Pricing

- **Free**: 10 briefs/month
- **Individual**: $19/month - Unlimited briefs
- **Team**: $49/month - 3 users, unlimited briefs
- **Agency**: $149/month - 10 users, unlimited briefs

## MVP Limitations

This is a functional MVP with mock data. In production, you would integrate:

- Real AI services (OpenAI, Claude, etc.)
- Web scraping for competitor analysis
- Database for user accounts and brief history
- Real-time content analysis
- Advanced SEO tools

## Project Structure

```
content-brief-generator/
├── app/
│   ├── components/
│   │   ├── AuthModal.tsx          # User authentication
│   │   ├── BriefResults.tsx       # Generated brief display
│   │   ├── ContentBriefGenerator.tsx # Main app component
│   │   ├── Header.tsx             # Navigation header
│   │   ├── LoadingSpinner.tsx     # Loading states
│   │   └── TopicInput.tsx         # Topic input form
│   ├── utils/
│   │   └── pdfExport.ts          # PDF generation utility
│   └── page.tsx                   # Main page
├── package.json
└── README.md
```

## Competitor Analysis

### Direct Competitors
- **Frase.io**: $45/month - Complex interface, expensive
- **MarketMuse**: $500+/month - Enterprise-focused
- **Clearscope**: More accessible but limited features

### Competitive Advantages
- **Price**: $19/month vs $45-500+ competitors
- **Simplicity**: Focus only on brief generation
- **Speed**: Generate briefs in under 2 minutes
- **Templates**: Industry-specific brief formats

## Development Roadmap

### Phase 1 ✅ (Current)
- Basic topic analysis
- Simple brief generation
- PDF export functionality
- User authentication

### Phase 2 (Next)
- Advanced competitor analysis
- Real web scraping integration
- SEO optimization suggestions
- Template library

### Phase 3 (Future)
- Team collaboration features
- Advanced analytics
- API for third-party integrations
- Mobile app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team.

---

**Built with ❤️ for content creators worldwide**