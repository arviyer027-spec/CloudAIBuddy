import React, { useState, useEffect, useMemo } from 'react';
import { Search, Flame, Star, Eye, Code, Zap, TrendingUp, Filter, Download, ExternalLink, Github, Twitter } from 'lucide-react';

const CloudAIBuddy = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('score');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    interests: [],
    useCase: 'learning',
    expertiseLevel: 'intermediate'
  });

  // Curated Database (Static for MVP - will be replaced with Firestore)
  const servicesDatabase = [
    // AI Services
    {
      id: 'claude-3.5',
      category: 'ai',
      name: 'Claude 3.5 Sonnet',
      description: 'Advanced AI assistant with extended thinking and vision capabilities',
      logo: '🤖',
      website: 'https://claude.ai',
      platforms: ['web', 'api'],
      tags: ['llm', 'coding', 'analysis', 'multimodal'],
      launchDate: new Date('2024-11-01'),
      score: 98,
      tier: 'trending',
      metadata: {
        gitHubStars: 0,
        productHuntVotes: 2500,
        downloads: 'N/A',
        monthlyUsers: 5000000
      },
      sources: {
        github: 'https://github.com/anthropics/anthropic-sdk-python',
        twitter: 'https://twitter.com/AnthropicAI',
        discord: 'https://discord.gg/anthropic'
      },
      updatedAt: new Date()
    },
    {
      id: 'gpt-4o',
      category: 'ai',
      name: 'GPT-4O',
      description: 'Multimodal AI model with enhanced reasoning and speed',
      logo: '🔮',
      website: 'https://openai.com/gpt-4o',
      platforms: ['web', 'api', 'mobile'],
      tags: ['llm', 'vision', 'reasoning', 'production'],
      launchDate: new Date('2024-05-13'),
      score: 95,
      tier: 'trending',
      metadata: {
        gitHubStars: 0,
        productHuntVotes: 3200,
        downloads: 'N/A',
        monthlyUsers: 8000000
      },
      sources: {
        github: 'https://github.com/openai',
        twitter: 'https://twitter.com/openai',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'deepseek-r1',
      category: 'ai',
      name: 'DeepSeek R1',
      description: 'Open-source reasoning model with impressive benchmarks',
      logo: '🧠',
      website: 'https://huggingface.co/deepseek-ai',
      platforms: ['open-source', 'api'],
      tags: ['llm', 'open-source', 'reasoning', 'efficient'],
      launchDate: new Date('2024-12-20'),
      score: 92,
      tier: 'trending',
      metadata: {
        gitHubStars: 15000,
        productHuntVotes: 2800,
        downloads: 5000000,
        monthlyUsers: 500000
      },
      sources: {
        github: 'https://github.com/deepseek-ai/DeepSeek-R1',
        twitter: 'https://twitter.com/deepseek_ai',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'notebooklm',
      category: 'ai',
      name: 'NotebookLM',
      description: 'AI notebook for research with audio note generation',
      logo: '📓',
      website: 'https://notebooklm.google.com',
      platforms: ['web'],
      tags: ['research', 'audio', 'productivity', 'learning'],
      launchDate: new Date('2024-01-15'),
      score: 85,
      tier: 'must_try',
      metadata: {
        gitHubStars: 0,
        productHuntVotes: 1500,
        downloads: 'N/A',
        monthlyUsers: 2000000
      },
      sources: {
        github: null,
        twitter: 'https://twitter.com/googleresearch',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'midjourney-v7',
      category: 'ai',
      name: 'Midjourney v7',
      description: 'Advanced AI image generation with improved photorealism',
      logo: '🎨',
      website: 'https://midjourney.com',
      platforms: ['discord', 'web'],
      tags: ['image-generation', 'creative', 'design', 'ai-art'],
      launchDate: new Date('2024-10-01'),
      score: 88,
      tier: 'must_try',
      metadata: {
        gitHubStars: 0,
        productHuntVotes: 2100,
        downloads: 'N/A',
        monthlyUsers: 3000000
      },
      sources: {
        github: null,
        twitter: 'https://twitter.com/midjourney',
        discord: 'https://discord.gg/midjourney'
      },
      updatedAt: new Date()
    },
    {
      id: 'replit-agent',
      category: 'ai',
      name: 'Replit Agent',
      description: 'AI coding agent that builds full applications automatically',
      logo: '⚙️',
      website: 'https://replit.com/agent',
      platforms: ['web'],
      tags: ['coding', 'automation', 'development', 'productivity'],
      launchDate: new Date('2024-11-20'),
      score: 90,
      tier: 'trending',
      metadata: {
        gitHubStars: 8500,
        productHuntVotes: 2200,
        downloads: 'N/A',
        monthlyUsers: 1500000
      },
      sources: {
        github: 'https://github.com/replit',
        twitter: 'https://twitter.com/replit',
        discord: 'https://discord.gg/replit'
      },
      updatedAt: new Date()
    },

    // Cloud Services
    {
      id: 'claude-api',
      category: 'cloud',
      name: 'Anthropic API',
      description: 'Production-grade API for Claude with batch processing',
      logo: '☁️',
      website: 'https://console.anthropic.com',
      platforms: ['api'],
      tags: ['serverless', 'api', 'ai-infrastructure', 'production'],
      launchDate: new Date('2024-02-01'),
      score: 94,
      tier: 'trending',
      metadata: {
        gitHubStars: 5000,
        productHuntVotes: 1800,
        downloads: 'N/A',
        monthlyUsers: 50000
      },
      sources: {
        github: 'https://github.com/anthropics',
        twitter: 'https://twitter.com/AnthropicAI',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'vercel-v0',
      category: 'cloud',
      name: 'Vercel v0',
      description: 'AI-powered frontend generation with instant deployment',
      logo: '⚡',
      website: 'https://vercel.com/products/v0',
      platforms: ['web'],
      tags: ['deployment', 'frontend', 'ai-generation', 'devops'],
      launchDate: new Date('2024-03-15'),
      score: 87,
      tier: 'must_try',
      metadata: {
        gitHubStars: 12000,
        productHuntVotes: 2500,
        downloads: 'N/A',
        monthlyUsers: 500000
      },
      sources: {
        github: 'https://github.com/vercel',
        twitter: 'https://twitter.com/vercel',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'railway',
      category: 'cloud',
      name: 'Railway',
      description: 'Infrastructure platform for modern app deployment',
      logo: '🚂',
      website: 'https://railway.app',
      platforms: ['web', 'cli'],
      tags: ['deployment', 'infrastructure', 'database', 'devops'],
      launchDate: new Date('2023-06-01'),
      score: 82,
      tier: 'must_try',
      metadata: {
        gitHubStars: 9200,
        productHuntVotes: 1600,
        downloads: 'N/A',
        monthlyUsers: 250000
      },
      sources: {
        github: 'https://github.com/railwayapp',
        twitter: 'https://twitter.com/Railway',
        discord: 'https://discord.gg/railway'
      },
      updatedAt: new Date()
    },
    {
      id: 'wiz-io',
      category: 'cloud',
      name: 'Wiz',
      description: 'Cloud security platform for multi-cloud environments',
      logo: '🔒',
      website: 'https://www.wiz.io',
      platforms: ['saas'],
      tags: ['security', 'cloud', 'compliance', 'enterprise'],
      launchDate: new Date('2020-01-01'),
      score: 81,
      tier: 'must_try',
      metadata: {
        gitHubStars: 0,
        productHuntVotes: 800,
        downloads: 'N/A',
        monthlyUsers: 100000
      },
      sources: {
        github: null,
        twitter: 'https://twitter.com/wiz_io',
        discord: null
      },
      updatedAt: new Date()
    },
    {
      id: 'minio',
      category: 'cloud',
      name: 'MinIO',
      description: 'High-performance S3-compatible object storage',
      logo: '📦',
      website: 'https://min.io',
      platforms: ['open-source', 'enterprise'],
      tags: ['storage', 'open-source', 'infrastructure', 'data'],
      launchDate: new Date('2017-01-01'),
      score: 79,
      tier: 'worth_watching',
      metadata: {
        gitHubStars: 45000,
        productHuntVotes: 1200,
        downloads: 10000000,
        monthlyUsers: 500000
      },
      sources: {
        github: 'https://github.com/minio/minio',
        twitter: 'https://twitter.com/minio_io',
        discord: 'https://discord.gg/minio'
      },
      updatedAt: new Date()
    },
    {
      id: 'fly-io',
      category: 'cloud',
      name: 'Fly.io',
      description: 'Global edge computing platform for distributed apps',
      logo: '🛸',
      website: 'https://fly.io',
      platforms: ['web', 'cli'],
      tags: ['edge-computing', 'deployment', 'global', 'devops'],
      launchDate: new Date('2021-04-01'),
      score: 83,
      tier: 'must_try',
      metadata: {
        gitHubStars: 8000,
        productHuntVotes: 1400,
        downloads: 'N/A',
        monthlyUsers: 150000
      },
      sources: {
        github: 'https://github.com/superfly',
        twitter: 'https://twitter.com/flydotio',
        discord: 'https://discord.gg/fly'
      },
      updatedAt: new Date()
    }
  ];

  // Filter & Sort Logic
  const filteredAndSortedServices = useMemo(() => {
    let filtered = servicesDatabase.filter(service => {
      const matchesCategory = service.category === activeTab;
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTier = selectedTier === 'all' || service.tier === selectedTier;
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => service.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTier && matchesTags;
    });

    // Sort
    return filtered.sort((a, b) => {
      switch(sortBy) {
        case 'score':
          return b.score - a.score;
        case 'recent':
          return b.launchDate - a.launchDate;
        case 'popularity':
          return (b.metadata.productHuntVotes || 0) - (a.metadata.productHuntVotes || 0);
        default:
          return 0;
      }
    });
  }, [activeTab, searchQuery, selectedTier, selectedTags, sortBy]);

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    servicesDatabase.forEach(s => {
      if (s.category === activeTab) {
        s.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [activeTab]);

  // Tier Badge Component
  const TierBadge = ({ tier }) => {
    const tierConfig = {
      trending: { icon: Flame, color: 'bg-red-500', label: '🔥 Trending' },
      must_try: { icon: Star, color: 'bg-yellow-500', label: '⭐ Must Try' },
      worth_watching: { icon: Eye, color: 'bg-blue-500', label: '👀 Worth Watching' },
      building: { icon: Code, color: 'bg-purple-500', label: '📌 Building' }
    };
    const config = tierConfig[tier];
    return (
      <span className={`${config.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {config.label}
      </span>
    );
  };

  // Service Card Component
  const ServiceCard = ({ service }) => {
    const daysSinceLaunch = Math.floor((Date.now() - service.launchDate) / (1000 * 60 * 60 * 24));
    const isNewLaunch = daysSinceLaunch < 30;

    return (
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden">
        {isNewLaunch && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            NEW
          </div>
        )}
        
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{service.logo}</div>
            <TierBadge tier={service.tier} />
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

          {/* Score Display */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">CloudAI Score</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {service.score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${service.score}%` }}
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            {service.metadata.productHuntVotes > 0 && (
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500">PH Votes</div>
                <div className="font-bold text-gray-900">{(service.metadata.productHuntVotes / 1000).toFixed(1)}k</div>
              </div>
            )}
            {service.metadata.gitHubStars > 0 && (
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500">GitHub ⭐</div>
                <div className="font-bold text-gray-900">{(service.metadata.gitHubStars / 1000).toFixed(1)}k</div>
              </div>
            )}
            {service.metadata.monthlyUsers > 0 && (
              <div className="bg-gray-50 p-2 rounded-lg">
                <div className="text-xs text-gray-500">Users</div>
                <div className="font-bold text-gray-900">{(service.metadata.monthlyUsers / 1000000).toFixed(1)}M</div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
            {service.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                +{service.tags.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            {service.website && (
              <a 
                href={service.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition-all text-center text-sm"
              >
                Visit
              </a>
            )}
            {service.sources?.github && (
              <a 
                href={service.sources.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300 transition-all text-center text-sm flex items-center justify-center gap-1"
              >
                <Github size={16} /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-lg">
                ☁️
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  CloudAIBuddy
                </h1>
                <p className="text-xs text-slate-400">Your AI & Cloud Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
            >
              {showRecommendations ? '← Back' : '✨ Get Recommendations'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search AI/Cloud services, tools, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2">
            {['ai', 'cloud'].map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedTier('all');
                  setSelectedTags([]);
                }}
                className={`px-6 py-2 font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab === 'ai' ? '🤖 AI' : '☁️ Cloud'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showRecommendations ? (
          <>
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Filter className="text-slate-400" size={18} />
                <span className="text-slate-300 font-semibold">Tier:</span>
                {['all', 'trending', 'must_try', 'worth_watching', 'building'].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                      selectedTier === tier
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tier === 'all' ? 'All' : tier.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-start">
                <TrendingUp className="text-slate-400 mt-1" size={18} />
                <span className="text-slate-300 font-semibold">Sort:</span>
                {['score', 'recent', 'popularity'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                      sortBy === sort
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sort === 'score' ? 'Best Score' : sort === 'recent' ? 'Newest' : 'Most Popular'}
                  </button>
                ))}
              </div>

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="flex flex-wrap gap-2 items-start">
                  <Zap className="text-slate-400 mt-1" size={18} />
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-6 text-slate-300 font-semibold">
              Found <span className="text-cyan-400">{filteredAndSortedServices.length}</span> amazing {activeTab === 'ai' ? 'AI' : 'Cloud'} services
            </div>

            {/* Services Grid */}
            {filteredAndSortedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl text-slate-300 font-semibold mb-2">No services found</p>
                <p className="text-slate-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        ) : (
          /* Recommendations Section */
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Personalized Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">What are you interested in?</label>
                <div className="space-y-2">
                  {['ML', 'Web Dev', 'DevOps', 'Data', 'Security'].map(interest => (
                    <label key={interest} className="flex items-center text-slate-300 hover:text-white cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={userPreferences.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserPreferences({...userPreferences, interests: [...userPreferences.interests, interest]});
                          } else {
                            setUserPreferences({...userPreferences, interests: userPreferences.interests.filter(i => i !== interest)});
                          }
                        }}
                        className="mr-2"
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Your expertise level</label>
                <select
                  value={userPreferences.expertiseLevel}
                  onChange={(e) => setUserPreferences({...userPreferences, expertiseLevel: e.target.value})}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg"
                >
                  <option>beginner</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Primary use case</label>
                <select
                  value={userPreferences.useCase}
                  onChange={(e) => setUserPreferences({...userPreferences, useCase: e.target.value})}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg"
                >
                  <option value="learning">Learning</option>
                  <option value="production">Production</option>
                  <option value="prototyping">Prototyping</option>
                  <option value="hobby">Hobby Project</option>
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg p-6">
              <p className="text-slate-300">
                Based on your preferences (<strong>{userPreferences.interests.join(', ') || 'General'}</strong>, 
                <strong> {userPreferences.expertiseLevel}</strong> level, 
                <strong> {userPreferences.useCase}</strong>), we recommend checking out the 
                <strong> top 3 highest-scoring services</strong> that match your interests. 
                <br /><br />
                Our algorithm considers: Launch recency (25%), Innovation (25%), Adoption metrics (25%), and Community activity (25%).
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p className="mb-4">
            CloudAIBuddy - Your Real-time AI & Cloud Innovation Tracker
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span>Last updated: {new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>Data refreshed every 6 hours</span>
            <span>•</span>
            <span><a href="#" className="text-cyan-400 hover:text-cyan-300">Report Issue</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CloudAIBuddy;
