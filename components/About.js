import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const embedVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="w-full bg-gray-900 py-24">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12" variants={itemVariants}>
            <motion.h2 
              className="text-6xl font-extrabold text-red-600 mb-8 font-serif text-center"
              variants={textVariants}
            >
              About Us
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-xl leading-relaxed mb-6 font-sans"
              variants={textVariants}
            >
              Welcome to our cinematic universe! We are passionate about bringing the magic of movies to life. Our state-of-the-art theaters and curated selection of films ensure an unforgettable experience for every movie lover.
            </motion.p>
            <motion.p 
              className="text-gray-300 text-xl leading-relaxed font-sans"
              variants={textVariants}
            >
              From blockbuster premieres to indie gems, we're dedicated to showcasing the best of cinema. Join us in celebrating the art of storytelling on the big screen!
            </motion.p>
          </motion.div>
          <motion.div className="lg:w-1/2" variants={embedVariants}>
            <div className="sketchfab-embed-wrapper">
              <iframe
                title="Metamons - Stage - Moscow"
                frameBorder="0"
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/1ffdc4741b4d44d4bc9124fe4d44294a/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0"
                className="w-full aspect-video rounded-lg shadow-2xl"
              />
            </div>
            <motion.p 
              className="text-100 text-gray-400 mt-4 text-center font-sans"
              variants={textVariants}
            >
              <a href="https://sketchfab.com/3d-models/metamons-stage-moscow-1ffdc4741b4d44d4bc9124fe4d44294a" target="_blank" rel="nofollow" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Metamons - Stage - Moscow
              </a> by <a href="https://sketchfab.com/.sebastian." target="_blank" rel="nofollow" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Sebastian Irmer
              </a> on <a href="https://sketchfab.com" target="_blank" rel="nofollow" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                Sketchfab
              </a>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;