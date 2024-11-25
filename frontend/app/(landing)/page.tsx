'use client'
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
export default function Home() {
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);  // новое состояние для контроля анимации курсора

  const phrases = [
    "Connect.",
    "Share.",
    "Inspire.",
    "Create.",
    "Explore your world.",
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let typingSpeed = isDeleting ? 80 : 120;

    const typeEffect = () => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1)); 
      } else {
        setText((prev) => currentPhrase.slice(0, prev.length + 1)); 
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }

      if (!isDeleting && text === currentPhrase) {
        setIsTyping(false);  
        setTimeout(() => {
          setIsDeleting(true);
          setIsTyping(true);  
        }, 2000); 
      }
    };

    const typingTimeout = setTimeout(typeEffect, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, currentPhraseIndex]);

  return (
    <div className="relative flex pt-20 justify-center h-screen">
      <div className="text-center z-10">
        <h1 className="text-6xl font-extrabold">
          Welcome to <span className="text-violet-500">Gwalla</span>
        </h1>
        <div className="text-4xl font-medium mt-4">
          <span className="typewriter">{text}</span>
          <span className={isTyping ? "" : "blinking-cursor"}>|</span> {/* Курсор не мигает, пока идет набор текста */}
        </div>
        <p className="mt-8 text-lg max-w-3xl mx-auto font-semibold">
          Your one-stop platform to connect with friends, share your journey, and 
          inspire others. Build a community, create content, and explore the 
          vibrant digital world. Start your journey now!
        </p>
        <div className="mt-12">
          <Button
            href="/register"
            className="px-6 py-3 bg-violet-500 text-white font-semibold rounded-xl shadow-mdtransition-transform transform hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
