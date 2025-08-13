import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Healthcare Translation</h1>
              <p className="text-sm text-gray-600">Real-time multilingual communication</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link 
              href="/privacy" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/help" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Help
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
