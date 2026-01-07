"use client";

import { useState, useEffect } from "react";
import { Menu, User, Briefcase, Building2, Bookmark, GraduationCap, Award, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle section scrolling
  /* ---------------------------
   * Smooth scroll
   * --------------------------- */
  const handleSectionClick = (hash: string) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${hash}`;
    }
    setIsOpen(false);
  };

  const LINKS = [
    { name: "Browse", href: "/browse", icon: Briefcase },
    { name: "Companies", href: "/companies", icon: Building2 },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
    { name: "Assessments", href: "/assessments", icon: GraduationCap },
    { name: "Success Stories", hash: "testimonials", icon: Award },
    { name: "Plans", hash: "pricing", icon: CreditCard },
  ];

  const renderLink = (link: typeof LINKS[number], mobile = false) => {
    const Icon = link.icon;
    const baseClasses = mobile
      ? "block w-full rounded-lg px-4 py-3 text-base font-medium text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors duration-200"
      : "relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200";
      ? "group w-full rounded-xl px-4 py-3.5 text-base font-medium text-left flex items-center gap-3 text-foreground/70 hover:text-foreground hover:bg-primary/10 transition-all duration-200"
      : "group relative px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground flex items-center gap-2 transition-all duration-200 rounded-lg hover:bg-primary/5";

    if (link.href) {
      return (
        <Link
          key={link.name}
          href={link.href}
          className={baseClasses}
          onClick={() => mobile && setIsOpen(false)}
        >
          {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
          {link.name}
          {!mobile && (
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300"></span>
          )}
        </Link>
      );
    }

    return (
      <button
        key={link.name}
        className={baseClasses}
        onClick={() => handleSectionClick(link.hash!)}
      >
        {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
        {link.name}
        {!mobile && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 group-hover:w-full transition-all duration-300"></span>
        )}
      </button>
    );
  };

  const renderCTA = (mobile = false) => {
    const wrapperClass = mobile 
      ? "flex flex-col gap-3 w-full" 
      : "flex items-center gap-2";

    return (
      <div className={wrapperClass}>
        <Link href="/company/login" className={mobile ? "w-full" : ""}>
          <Button 
            className={mobile ? "w-full" : ""} 
            variant="outline"
            size={mobile ? "default" : "sm"}
          >
            Company Login
          </Button>
        </Link>

        <Link href="/login" className={mobile ? "w-full" : ""}>
          <Button 
            className={mobile ? "w-full" : ""} 
            variant="outline"
            size={mobile ? "default" : "sm"}
          >
            Student Login
    const wrapperClass = mobile
      ? "w-full flex flex-col gap-2.5"
      : "flex items-center gap-2";

    if (isAuthenticated) {
      return (
        <div className={wrapperClass}>
          <Link href="/dashboard" className={mobile ? "w-full" : ""}>
            <Button className={`${mobile ? "w-full" : ""} flex items-center justify-center gap-2 glassmorphic-button-primary shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
              <Sparkles className="w-4 h-4" />
              {mobile ? "Dashboard" : "Dashboard"}
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className={wrapperClass}>

        <Link href="/login" className={mobile ? "w-full" : ""}>
          <Button className={`${mobile ? "w-full justify-center" : "justify-center"}`} variant="outline">
            <User className="w-4 h-4 mr-1.5" />
            {mobile ? "Login" : "Login"}
          </Button>
        </Link>

        <Link href="/signup" className={mobile ? "w-full" : ""}>
          <Button 
            className={`${mobile ? "w-full" : ""} glassmorphic-button-primary`}
            size={mobile ? "default" : "sm"}
          >
            Sign Up
          <Button className={`${mobile ? "w-full justify-center" : "justify-center"} glassmorphic-button-primary shadow-lg hover:shadow-xl transition-all hover:scale-105`}>
            <Sparkles className="w-4 h-4 mr-1.5" />
            {mobile ? "Sign Up" : "Join"}
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              C
            </div>
            <span className="hidden font-bold sm:inline-block">CareerHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {LINKS.map((link) => renderLink(link))}
          </nav>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {renderCTA()}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-border/40 shadow-lg">
            <div className="flex h-full flex-col">
              {/* Navigation Links */}
              <div className="flex-1 space-y-1 px-4 py-6">
                {LINKS.map((link) => renderLink(link, true))}
              </div>
              
              {/* CTA Buttons */}
              <div className="border-t border-border/40 px-4 py-6">
                {renderCTA(true)}
              </div>
              
              {/* Theme Toggle */}
              <div className="border-t border-border/40 px-4 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    <header className="sticky top-0 z-50 h-16 glassmorphic border-b backdrop-blur-md bg-background/80">
      <nav className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center font-bold text-primary-foreground shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
            C
          </div>
          <span className="font-bold text-lg hidden sm:block group-hover:text-primary transition-colors">CareerHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 items-center">
          {LINKS.map((l) => renderLink(l))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <div className="w-px h-6 bg-border"></div>
          {renderCTA()}
        </div>

        {/* Mobile Toggle */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-lg hover:bg-foreground/10 hover:scale-105 transition-all"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[400px] flex flex-col">
            <SheetHeader className="text-left space-y-3 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center font-bold text-primary-foreground shadow-lg">
                  C
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold">CareerHub</SheetTitle>
                  <p className="text-xs text-muted-foreground">Your career companion</p>
                </div>
              </div>
            </SheetHeader>

            <Separator className="my-2" />

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 py-4">
                <div className="space-y-1">
                  <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Navigation
                  </p>
                  <div className="space-y-1">
                    {LINKS.map((l) => renderLink(l, true))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 px-2">
                  <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </p>
                  {renderCTA(true)}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t mt-auto">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
