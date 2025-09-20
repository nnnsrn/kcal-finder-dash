import { Brain, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-12 px-4" style={{ backgroundColor: '#0a2342' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-8 w-8" style={{ color: 'var(--calorie-teal)' }} />
              <h3 className="text-xl text-white" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                CalorieVision
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced deep learning for food detection and calorie estimation. 
              Built with YOLOv8 and computer vision technologies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white mb-4" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Features
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/detect" className="hover:text-white transition-colors">Food Detection</Link></li>
              <li><Link to="/calculator" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-300">
          <p>&copy; 2025 CalorieVision. Built for deep learning course final project.</p>
        </div>
      </div>
    </footer>
  );
}