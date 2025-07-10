import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Play, X, Youtube, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  url: string;
  title: string;
  type: 'video' | 'short';
}

export const VideoSection = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Elite Cards Demo - See The Magic',
      type: 'video'
    },
    {
      id: '2', 
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'Keyword Search Feature',
      type: 'short'
    }
  ]);
  
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const convertYouTubeUrl = (url: string) => {
    // Convert various YouTube URL formats to embed format
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    
    return url;
  };

  const addVideo = () => {
    if (newVideoUrl.trim()) {
      const embedUrl = convertYouTubeUrl(newVideoUrl.trim());
      const isShort = newVideoUrl.includes('/shorts/');
      
      const newVideo: Video = {
        id: Date.now().toString(),
        url: embedUrl,
        title: `${isShort ? 'Short' : 'Video'} ${videos.length + 1}`,
        type: isShort ? 'short' : 'video'
      };
      
      setVideos([...videos, newVideo]);
      setNewVideoUrl('');
    }
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            <Youtube className="w-4 h-4 mr-2" />
            Video Library
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">See</span>
            <span className="gradient-text"> Elite Cards</span>
            <br />
            <span className="text-foreground">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch real professionals demonstrate the power of Elite Contact Cards
          </p>
        </div>

        {/* Admin Video Management */}
        <div className={`mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <Card className="glass-effect max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Paste YouTube URL here..."
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addVideo()}
                />
                <Button 
                  onClick={addVideo}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supports YouTube videos, shorts, and various URL formats
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Card 
              key={video.id}
              className={`group glass-effect hover-glow overflow-hidden ${
                isVisible ? 'animate-scale-in' : 'opacity-0 scale-75'
              }`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <CardContent className="p-0 relative">
                {/* Video Container */}
                <div className={`relative ${video.type === 'short' ? 'aspect-[9/16]' : 'aspect-video'} bg-muted`}>
                  {activeVideo === video.id ? (
                    <iframe
                      src={video.url}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                      title={video.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 cursor-pointer"
                         onClick={() => setActiveVideo(video.id)}>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform animate-pulse-glow">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                        <p className="text-foreground font-medium">{video.title}</p>
                        <Badge variant="outline" className="mt-2">
                          {video.type === 'short' ? 'YouTube Short' : 'Full Video'}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground truncate">{video.title}</h3>
                    <div className="flex gap-2">
                      {activeVideo === video.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveVideo(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeVideo(video.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {activeVideo !== video.id && (
                    <Button 
                      className="w-full mt-3 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                      variant="outline"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <Card className="glass-effect max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Networking?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of professionals who've revolutionized their connection game
              </p>
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full hover-glow"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Schedule Your Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};