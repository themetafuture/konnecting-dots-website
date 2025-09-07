"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Search } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import BookingModal from "./booking-modal"
import SearchModal from "./search-modal"

export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/konnecting-dots-logo.jpg"
              alt="Konnecting Dots Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-gray-900">Konnecting Dots</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="space-y-3">
                      <Link href="/services/one-on-one-coaching" className="block p-3 rounded-lg hover:bg-gray-50">
                        <h4 className="font-semibold text-gray-900">ONE on ONE Coaching</h4>
                        <p className="text-sm text-gray-600">Personalized NLP and Hypnosis sessions</p>
                      </Link>
                      <Link href="/services/corporate-training" className="block p-3 rounded-lg hover:bg-gray-50">
                        <h4 className="font-semibold text-gray-900">Corporate Training Programs</h4>
                        <p className="text-sm text-gray-600">Transform your organization</p>
                      </Link>
                      <Link href="/services/dei-training" className="block p-3 rounded-lg hover:bg-gray-50">
                        <h4 className="font-semibold text-gray-900">Diversity, Equity & Inclusion Training</h4>
                        <p className="text-sm text-gray-600">Build inclusive workplaces</p>
                      </Link>
                      <Link href="/services/train-the-trainer" className="block p-3 rounded-lg hover:bg-gray-50">
                        <h4 className="font-semibold text-gray-900">Train the Trainer</h4>
                        <p className="text-sm text-gray-600">Become a certified trainer</p>
                      </Link>
                      <Link href="/services/practitioner-master" className="block p-3 rounded-lg hover:bg-gray-50">
                        <h4 className="font-semibold text-gray-900">Practitioner & Master Practitioner</h4>
                        <p className="text-sm text-gray-600">NLP certification programs</p>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Resources
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/testimonials" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Success Stories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/events" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <SearchModal>
              <Button variant="outline" size="icon" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                <Search className="h-4 w-4" />
              </Button>
            </SearchModal>
            <Link href="/login">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent">
                Student Login
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Admin Login
              </Button>
            </Link>
            <BookingModal>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Book Session</Button>
            </BookingModal>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/images/konnecting-dots-logo.jpg"
                    alt="Konnecting Dots"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <span className="text-xl font-bold">Konnecting Dots</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="space-y-4">
                <Link
                  href="/"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <div className="space-y-2">
                  <p className="py-2 px-4 text-lg font-medium text-gray-900">Services</p>
                  <Link
                    href="/services/one-on-one-coaching"
                    className="block py-2 px-6 text-base text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    ONE on ONE Coaching
                  </Link>
                  <Link
                    href="/services/corporate-training"
                    className="block py-2 px-6 text-base text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Corporate Training Programs
                  </Link>
                  <Link
                    href="/services/dei-training"
                    className="block py-2 px-6 text-base text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    DEI Training
                  </Link>
                  <Link
                    href="/services/train-the-trainer"
                    className="block py-2 px-6 text-base text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Train the Trainer
                  </Link>
                  <Link
                    href="/services/practitioner-master"
                    className="block py-2 px-6 text-base text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Practitioner & Master Practitioner
                  </Link>
                </div>
                <Link
                  href="/resources"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Resources
                </Link>
                <Link
                  href="/about"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/testimonials"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Success Stories
                </Link>
                <Link
                  href="/events"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link
                  href="/blog"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                <div className="pt-6 space-y-3">
                  <SearchModal>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
                      onClick={() => setIsOpen(false)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </SearchModal>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent"
                    >
                      Student Login
                    </Button>
                  </Link>
                  <Link href="/admin-login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      Admin Login
                    </Button>
                  </Link>
                  <BookingModal>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Book Session
                    </Button>
                  </BookingModal>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
