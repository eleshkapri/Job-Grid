import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-950 text-white font-sans gradient-bg-animated">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
}
