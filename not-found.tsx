import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-primary-500" />
      </div>
      <h1 className="text-6xl font-bold text-gray-900 mb-3">404</h1>
      <p className="text-xl text-gray-600 mb-2">Page not found</p>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/courses" className="btn-secondary">Browse Courses</Link>
      </div>
    </div>
  );
}
