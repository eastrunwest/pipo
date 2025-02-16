"use client";
import React, { useEffect, useState } from "react";

const messages = [
  "搜索你感兴趣的议题",
  "好看的皮囊还是有趣的灵魂",
  "川普是否会当选总统？",
  "你会选择你爱的人还是爱你的人结婚？",
  "你更喜欢狗还是更喜欢猫？",
  "2k人民币大于3k美金吗？",
];

export default function SearchAnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFade(true);
      }, 500); 
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const gradientClass =
    currentIndex === 0
      ? "text-gradient-1"
      : currentIndex === 1
      ? "text-gradient-2"
      : "text-gradient-3";

  return (
    <div className="mt-6 text-center animate-fadeIn">
      <p
        className={`text-3xl md:text-4xl font-extrabold transition-all duration-500 ${
          gradientClass
        } ${fade ? "opacity-100" : "opacity-0"}`}
      >
        {messages[currentIndex]}
      </p>
    </div>
  );
}
