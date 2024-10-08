import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Download,
  Printer,
  Share2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/cards/feature-card';

export default function Home() {
  return (
    <main className="relative min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Background Image */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
        }}
      >
        {/* Add an overlay to darken the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#cc005f] to-[#990047] z-0 dark:from-transparent dark:via-[#990047] dark:to-[#cc005f]"></div>
 
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-white text-5xl font-bold mb-8 custom-text--shadow">
              Create Your Perfect Resume with AI
            </h1>
            <p className="text-white mb-5 max-w-2xl mx-auto">
              Our Google Gemini-powered resume builder helps you create professional, eye-catching resumes in seconds. 
              It's free, easy to use, and designed to help you stand out!
            </p>
            <Link href="/resume/create">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started for Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
 
      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#cc005f] dark:text-white mb-20">
            Why Choose Our Free AI Resume Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-12 h-12 text-[#cc005f] dark:text-blue-500" />}
              title="AI-Powered Content"
              description="Our AI generates tailored content based on your experience and the job you're applying for, making it very easy to use."
            />
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-[#cc005f] dark:text-green-500" />}
              title="Create Unlimited Resumes"
              description="Build as many resumes as you need, completely free. Perfect for applying to multiple jobs or industries."
            />
            <FeatureCard
              icon={<ArrowRight className="w-12 h-12 text-[#cc005f] dark:text-purple-500" />}
              title="Easy Customization"
              description="Easily customize your resume with our intuitive interface. It's so simple, anyone can create a professional resume in minutes."
            />
          </div>
        </div>
      </section>
 
      {/* Call-to-Action Section */}
      <section className="bg-[#cc005f] text-white py-20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Download, Print, or Share Your Resume in Minutes
          </h2>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex flex-col items-center">
              <Download className="w-12 h-12 mb-2" />
              <span>Download</span>
            </div>
            <div className="flex flex-col items-center">
              <Printer className="w-12 h-12 mb-2" />
              <span>Print</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="w-12 h-12 mb-2" />
              <span>Share</span>
            </div>
          </div>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their
            dream jobs using our free, easy-to-use AI-powered resume builder.
            Create unlimited resumes and choose how to use them!
          </p>
          <Link href="/resume/create">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Create Your Free Resume Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

