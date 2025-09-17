'use client';

import { useTheme } from '../../../contexts/ThemeContext';
import ThemeColorPicker from '../../../components/ThemeColorPicker';

export default function AgricultureContent() {
  // Custom color palette for pixel-perfect match
  const PRIMARY = '#5fd02e';
  const DARK = '#111';
  const FOOTER_BG = 'bg-[#111]';
  const PRIMARY_BG = 'bg-white';
  const PRIMARY_TEXT = 'text-primary';
  const PRIMARY_BORDER = 'border-primary';

  const { theme, setTheme } = useTheme();
  
  // Debug: Log context
  console.log('ThemeContext:', { theme, setTheme });
  return (
    <div className="w-full">
      {/* DEBUG: Test button for client interactivity */}
      <button onClick={() => alert('Button works!')} style={{position:'fixed',top:10,right:10,zIndex:1000}}>Test Button</button>
      {/* DEBUG: Error message if setTheme is missing */}
      {!setTheme && <div style={{color:'red',fontWeight:'bold'}}>ERROR: setTheme is undefined. ThemeProvider/context may be broken.</div>}
      {/* Theme Color Picker */}

      
      {/* Header with DO logo */}
      <header className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm tracking-widest">1 2 3 4 5 6</span>
              <div className="flex items-center ml-8">
                <span className="text-3xl font-black text-white">DO</span>
                <span className="text-sm text-white ml-1 border-b border-white uppercase tracking-widest">jobs</span>
              </div>
              <span className="text-white text-sm ml-8">CALL +1</span>
            </div>
          </div>
          <div className="flex space-x-8 text-white text-base font-semibold uppercase mt-4 md:mt-0">
            <a href="#" className="hover:underline">Sign Up</a>
            <a href="#" className="hover:underline">Login</a>
            <a href="#" className="hover:underline">RSS</a>
            <a href="#" className="hover:underline">YouTube</a>
            <a href="#" className="hover:underline">Admin</a>
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="bg-white py-4 shadow">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <button className="bg-black text-white px-6 py-2 rounded font-bold uppercase tracking-widest mb-2 md:mb-0">Home</button>
          <div className="flex space-x-8 text-white font-bold uppercase text-sm tracking-widest">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Help</a>
          </div>
        </div>
      </nav>

      {/* Theme Color Palette Selector */}
      <section className="w-full bg-white py-4 flex flex-col items-center border-b border-gray-100">
        <label className="mb-2 font-semibold text-gray-700">Choose Theme Color</label>
        <div className="flex space-x-4">
          {['#5fd02e', '#007bff', '#ff6b6b', '#f9ca24', '#00b894', '#6c5ce7'].map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${color}`}
              onClick={() => { console.log('Color swatch clicked:', color); setTheme({ ...theme, primary: color }); }}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all relative ${theme.theme?.primary === color ? 'border-black scale-110' : 'border-gray-300'}`}
              style={{ backgroundColor: color }}
            >
              {theme.theme?.primary === color && (
                <span className="absolute text-white text-lg font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Section with job search */}
      <section className="bg-cover bg-center py-28 relative" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80)'}}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-12 text-center uppercase tracking-widest drop-shadow-lg">Find Job, Employment and<br />Career Opportunities</h1>
            <div className="w-full max-w-2xl">
              <form className="flex bg-white rounded-lg overflow-hidden shadow-2xl border-2 border-primary">
                <input type="text" placeholder="Enter Keyword..." className="flex-1 px-6 py-4 outline-none text-lg" />
                <button type="submit" className="bg-white text-white px-10 py-4 font-extrabold text-lg uppercase tracking-widest">Search</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos */}
      <section className="bg-white py-5">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-10 grayscale opacity-60">
            {["https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", "https://upload.wikimedia.org/wikipedia/commons/9/93/Wordpress_Blue_logo.png", "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", "https://seeklogo.com/images/D/dxc-technology-logo-2B8E6A9B1D-seeklogo.com.png", "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg", "https://upload.wikimedia.org/wikipedia/commons/2/2e/Salesforce_logo.svg"].map((src, i) => (
              <img key={i} src={src} alt="logo" className="h-10 w-auto object-contain" />
            ))}
          </div>
        </div>
      </section>

      {/* Browse Jobs By Category */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-700 text-center uppercase mb-12 tracking-widest">Browse Jobs By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Agriculture", count: "(14)", icon: "🌱" },
              { title: "Education", count: "(22)", icon: "🎓" },
              { title: "Government", count: "(35)", icon: "🏛️" },
              { title: "Sales & Marketing", count: "(48)", icon: "📊" },
              { title: "Healthcare", count: "(12)", icon: "⚕️" },
              { title: "Insurance", count: "(8)", icon: "🛡️" },
              { title: "Technology", count: "(78)", icon: "💻" },
              { title: "Consulting", count: "(26)", icon: "📝" },
            ].map((category, i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 flex flex-col items-center rounded-lg shadow hover:shadow-xl transition">
                <div className="text-5xl mb-3 drop-shadow-lg" style={{ color: 'var(--color-primary)' }}>{category.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{category.title}</h3>
                <p className="text-base font-semibold" style={{ color: 'var(--color-primary)' }}>{category.count}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button style={{ backgroundColor: 'var(--color-primary)' }} className=" text-white px-6 py-2 font-bold uppercase">View All Categories</button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 bg-primary flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4 uppercase">Watch Our Video</h2>
        <button className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
          <div className="text-accent text-2xl">▶</div>
        </button>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-700 text-center uppercase mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Create An Account", icon: "👤", desc: "Register and setup your profile with all your information" },
              { title: "Search Jobs", icon: "🔍", desc: "Browse and filter through thousands of listings" },
              { title: "Send a Reply", icon: "✉️", desc: "Send your application with an optional cover letter" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-4xl mb-2" style={{ color: 'var(--color-primary)' }}>{step.icon}</div>
                <h3 className="font-semibold text-gray-700 mb-2">{step.title}</h3>
                <p className="text-center text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-10">
            <button style={{ backgroundColor: 'var(--color-primary)' }} className=" text-white px-6 py-2 font-bold uppercase">Get Started</button>
            <button className="bg-secondary text-white px-6 py-2 font-bold uppercase">Learn More</button>
          </div>
        </div>
      </section>

      {/* Companies with Apply buttons */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { logo: "G", name: "XTZ Services", location: "New York", jobTitle: "Jr UI Designer" },
              { logo: "G", name: "ABC Tech", location: "San Francisco", jobTitle: "Marketing" },
              { logo: "A", name: "Media Inc", location: "Austin", jobTitle: "Project Manager" },
              { logo: "A", name: "Digital Agency", location: "Dallas", jobTitle: "Content Writer" },
              { logo: "O", name: "Expert Solutions", location: "Chicago", jobTitle: "UI/UX Designer" },
              { logo: "O", name: "Global Systems", location: "Houston", jobTitle: "Web Developer" },
            ].map((company, i) => (
              <div key={i} className="flex items-center p-4 border border-gray-200 rounded">
                <div className="mr-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-600 font-bold">
                    {company.logo}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-700">{company.name}</h3>
                  <p className="text-gray-500 text-sm">{company.location}</p>
                </div>
                <div className="mr-4">
                  <h4 className="font-semibold text-gray-700">{company.jobTitle}</h4>
                </div>
                <button style={{ backgroundColor: 'var(--color-primary)' }} className=" text-white px-4 py-1 rounded text-sm font-bold">Apply</button>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5, 6].map((page, i) => (
                <button key={i} className={`w-8 h-8 flex items-center justify-center rounded ${page === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-12 bg-primary flex">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase">Download Our Best Apps</h2>
            <p className="text-white mb-6">Get the best job hunting experience with our mobile app. Search jobs, track applications, and get notified about new opportunities anytime, anywhere.</p>
            <div className="flex space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2">
                <span>📱</span>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2">
                <span>🤖</span>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="w-48 h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <span className="text-2xl font-bold">DO</span>
              <span className="text-xs ml-1 border-b border-white">jobs</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" style={{ backgroundColor: 'var(--color-primary)' }} className=" w-8 h-8 rounded-full flex items-center justify-center">f</a>
              <a href="#" style={{ backgroundColor: 'var(--color-primary)' }} className=" w-8 h-8 rounded-full flex items-center justify-center">t</a>
              <a href="#" style={{ backgroundColor: 'var(--color-primary)' }} className=" w-8 h-8 rounded-full flex items-center justify-center">in</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-8">
            <div>
              <h4 className="font-bold mb-4 uppercase">Menu Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">Home</a></li>
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Jobs</a></li>
                <li><a href="#" className="hover:text-primary">Employers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase">All Sectors</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">Agriculture</a></li>
                <li><a href="#" className="hover:text-primary">Healthcare</a></li>
                <li><a href="#" className="hover:text-primary">Technology</a></li>
                <li><a href="#" className="hover:text-primary">Education</a></li>
                <li><a href="#" className="hover:text-primary">Government</a></li>
                <li><a href="#" className="hover:text-primary">Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase">All Locations</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary">New York</a></li>
                <li><a href="#" className="hover:text-primary">San Francisco</a></li>
                <li><a href="#" className="hover:text-primary">Chicago</a></li>
                <li><a href="#" className="hover:text-primary">Los Angeles</a></li>
                <li><a href="#" className="hover:text-primary">Boston</a></li>
                <li><a href="#" className="hover:text-primary">Seattle</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase">Contact Us</h4>
              <form>
                <input type="email" placeholder="Email" className="bg-gray-700 w-full p-2 mb-2 rounded text-white" />
                <button style={{ backgroundColor: 'var(--color-primary)' }} className=" text-white w-full p-2 rounded font-bold">Submit</button>
              </form>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-700">
            &copy; {new Date().getFullYear()} DO Jobs. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
