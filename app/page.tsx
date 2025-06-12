"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Download,
  ExternalLink,
  ChevronDown,
  Code,
  Database,
  Zap,
  Menu,
  X,
} from "lucide-react"
import BlockchainAnimation from "@/components/ui/blockchain-animation"; // Import the animation component

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const sections = ["hero", "projects", "about", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <BlockchainAnimation /> {/* Add the animation component here */}
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Muhammad Waleed
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id ? "text-blue-400" : "text-gray-300 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-800"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === item.id ? "text-blue-400" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Profile Image Placeholder */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden" // Added overflow-hidden
          >
            
            <img
              src="/pfp.jpeg" 
              alt="Muhammad Waleed"
              className="w-full h-full object-cover" // Ensures the image covers the div and maintains aspect ratio
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Muhammad Waleed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 font-mono"
          >
            Blockchain & Web Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-blue-400 mb-8 font-semibold"
          >
            Smart Contracts. AI-Powered Tools. Decentralized Ideas.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Second-year Computer Science student at NUST, passionate about Blockchain, Decentralized Systems, and AI.
            Currently building smart contract projects and no-code tools that empower users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="comic-button bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-bold rounded-xl border-4 border-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:shadow-[0_0_30px_rgba(251,191,36,0.9)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              View My Work
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-gray-400"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="space-y-16">
            {/* Project 1: Donation Raffle Smart Contract */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-blue-500 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-8 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Zap className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        </motion.div>
                        <div className="text-sm font-mono text-gray-400">Smart Contract</div>
                        <div className="text-lg font-semibold text-white mt-2">Ethereum Raffle</div>
                      </div>
                    </motion.div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Donation Raffle Smart Contract</h3>
                      <p className="text-gray-400 mb-4">
                        Ethereum-based smart contract for donation-based raffles with Chainlink VRF integration for
                        provably fair randomness and secure Ether handling.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-blue-900/50 text-blue-300">
                          Solidity
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                          Chainlink VRF
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          Ethereum
                        </Badge>
                      </div>
                      <a href="https://github.com/Muhammad-Waleed381/DonationRaffleSmartContract" target="_blank" rel="noopener noreferrer">
                        <Button className="comic-button border-4 border-cyan-300 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 2: Giraph */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-green-500 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-green-900/30 to-blue-900/30 p-8 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Database className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        </motion.div>
                        <div className="text-sm font-mono text-gray-400">No-Code Tool</div>
                        <div className="text-lg font-semibold text-white mt-2">Data Analysis</div>
                      </div>
                    </motion.div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Giraph – No-Code Data Analysis Tool</h3>
                      <p className="text-gray-400 mb-4">
                        A Power BI alternative for non-technical users. Built with Next.js, React, MongoDB, and ECharts.
                        Users upload CSVs/Excels and chat with data to generate insights and charts.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-blue-900/50 text-blue-300">
                          Next.js
                        </Badge>
                        <Badge variant="secondary" className="bg-green-900/50 text-green-300">
                          MongoDB
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                          ECharts
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-900/50 text-orange-300">
                          AI Backend
                        </Badge>
                      </div>
                       <a href="https://github.com/Muhammad-Waleed381/Giraph" target="_blank" rel="noopener noreferrer">
                        <Button className="comic-button border-4 border-lime-300 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 hover:from-lime-500 hover:via-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(163,230,53,0.6)] hover:shadow-[0_0_25px_rgba(163,230,53,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project 3: Price Alert DApp */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-orange-500 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-8 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Code className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                        </motion.div>
                        <div className="text-sm font-mono text-gray-400">DApp</div>
                        <div className="text-lg font-semibold text-white mt-2">Price Alerts</div>
                        <Badge className="mt-2 bg-orange-600 text-white">In Progress</Badge>
                      </div>
                    </motion.div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Chainlink-Powered Price Alert DApp</h3>
                      <p className="text-gray-400 mb-4">
                        Users can set price thresholds for ETH/BTC with automated notifications. Uses Chainlink Price
                        Feeds and Keepers for reliable automation.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-blue-900/50 text-blue-300">
                          Chainlink
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
                          Web3.js
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                          React
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-900/50 text-orange-300">
                          Automation
                        </Badge>
                      </div>
                      <a href="https://github.com/Muhammad-Waleed381/OraclePing" target="_blank" rel="noopener noreferrer">
                        <Button className="comic-button border-4 border-orange-300 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 hover:from-orange-500 hover:via-red-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(251,146,60,0.6)] hover:shadow-[0_0_25px_rgba(251,146,60,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            I'm a driven computer science student at NUST with strong interests in Blockchain, Smart Contracts, and
            AI/ML. I'm actively building smart contract-based tools, full-stack dApps, and no-code data solutions. I
            believe in creating with purpose, decentralization, and clean design.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Tech Stack
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Solidity",
              "Chainlink",
              "Ethereum",
              "React",
              "Next.js",
              "TypeScript",
              "MongoDB",
              "ECharts.js",
              "Python",
              "Scikit-learn",
              "TensorFlow",
              "Git",
              "Web3.js",
              "Ethers.js",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center hover:border-blue-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <span className="text-white font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Let's Connect
          </motion.h2>

          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <a href="https://github.com/Muhammad-Waleed381/" target="_blank" rel="noopener noreferrer">
              <Button className="comic-button border-4 border-purple-300 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(196,181,253,0.6)] hover:shadow-[0_0_25px_rgba(196,181,253,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-waleed-a799581b5/" target="_blank" rel="noopener noreferrer">
              <Button className="comic-button border-4 border-blue-300 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(147,197,253,0.6)] hover:shadow-[0_0_25px_rgba(147,197,253,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </a>
            <a href="mailto:mwaleed.bscs23seecs@seecs.edu.pk" target="_blank" rel="noopener noreferrer">
              <Button className="comic-button border-4 border-pink-300 bg-gradient-to-r from-pink-400 via-rose-500 to-red-600 hover:from-pink-500 hover:via-rose-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(249,168,212,0.6)] hover:shadow-[0_0_25px_rgba(249,168,212,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </Button>
            </a>
            <a href="https://x.com/0xDevDegen" target="_blank" rel="noopener noreferrer">
              <Button className="comic-button border-4 border-teal-300 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 hover:from-teal-500 hover:via-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-[0_0_15px_rgba(94,234,212,0.6)] hover:shadow-[0_0_25px_rgba(94,234,212,0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            
            <a href="" target="_blank" rel="noopener noreferrer" download>
              <Button className="comic-button border-4 border-yellow-300 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(253,224,71,0.6)] hover:shadow-[0_0_30px_rgba(253,224,71,0.9)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-300">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </a>
          </motion.div>

        </div>
      </section>

      
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-500 font-mono"
          >
            © 2025 Muhammad Waleed. Built with Next.js & passion for Web3.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
