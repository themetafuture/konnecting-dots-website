import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/konnecting-dots-logo.jpg"
                alt="Konnecting Dots Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-balance">Konnecting Dots</span>
            </Link>
            <p className="text-gray-300 leading-relaxed text-pretty">
              Empowering minds and transforming lives through world-class NLP, Hypnosis, and Corporate Training
              programs.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Facebook className="h-5 w-5 flex-shrink-0" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Twitter className="h-5 w-5 flex-shrink-0" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Instagram className="h-5 w-5 flex-shrink-0" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Linkedin className="h-5 w-5 flex-shrink-0" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Youtube className="h-5 w-5 flex-shrink-0" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-balance">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Training Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-balance">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/one-on-one-coaching" className="text-gray-300 hover:text-white transition-colors">
                  ONE on ONE Coaching
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-training" className="text-gray-300 hover:text-white transition-colors">
                  Corporate Training
                </Link>
              </li>
              <li>
                <Link href="/services/dei-training" className="text-gray-300 hover:text-white transition-colors">
                  DEI Training
                </Link>
              </li>
              <li>
                <Link href="/services/train-the-trainer" className="text-gray-300 hover:text-white transition-colors">
                  Train the Trainer
                </Link>
              </li>
              <li>
                <Link href="/services/practitioner-master" className="text-gray-300 hover:text-white transition-colors">
                  NLP Practitioner
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Free Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-balance">Stay Connected</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">info@konnectingdots.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">Miami, FL</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-balance">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4 text-pretty">Get the latest insights and updates</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Konnecting Dots. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
