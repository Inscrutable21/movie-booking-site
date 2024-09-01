import React, { useState } from 'react';
import { motion } from 'framer-motion';

const decades = ['1950', '1960', '1970', '1980', '1990', '2000', '2010','2020'];

const movieData = {
  '1950': {
    image: 'c.jpg',
    title: 'Seven Samurai',
    genre: 'samurai epic/drama',
    description: 'Set in 16th-century Japan, "Seven Samurai" follows a village of farmers who, threatened by bandits, hire seven masterless samurai (ronin) to protect them. The film explores themes of honor, sacrifice, and the social dynamics between the warriors and the villagers. It is renowned for its deep character development, innovative action scenes, and its exploration of the human spirit under dire circumstances.'
  },
  '1960': {
    image: 'b.jpeg',
    title: 'Lawrence of Arabia',
    genre: ' Epic Historical Drama',
    description: 'Directed by David Lean, this film chronicles the true-life adventures of T.E. Lawrence, a British officer who unites Arab tribes against the Ottoman Empire during World War I. Its known for its sweeping cinematography, grand scale, and complex portrayal of Lawrence enigmatic character.'
  },
  '1970': {
    image: 'd.jpeg',
    title: 'The Godfather',
    genre: 'Crime Drama',
    description: 'Directed by Francis Ford Coppola, this iconic film follows the powerful Corleone mafia family as they navigate power struggles, betrayal, and the complexities of organized crime in post-war America. The film is a deep exploration of family loyalty, power, and the dark side of the American Dream.'
  },
  '1980': {
    image: 'e.jpeg',
    title: 'Blade Runner',
    genre: 'Neo-Noir Science Fiction',
    description: 'Directed by Ridley Scott, this visually stunning film is set in a dystopian future where a blade runner, played by Harrison Ford, is tasked with hunting down bioengineered beings known as replicants. The film raises profound questions about identity, humanity, and morality.'
  },
  '1990': {
    image: 'pulp fiction.jpeg',
    title: 'Pulp Fiction',
    genre: 'Crime Drama / Black Comedy',
    description: 'Directed by Quentin Tarantino, "Pulp Fiction" weaves together multiple interconnected stories of crime and redemption in Los Angeles. With its sharp dialogue, non-linear narrative, and eclectic soundtrack, the film became a cultural phenomenon and redefined modern cinema.'
  },
  '2000': {
    image: 'dark.avif',
    title: 'The Dark Knight',
    genre: 'Superhero / Crime Thriller',
    description: 'Directed by Christopher Nolan, this film is a dark, complex exploration of heroism and villainy in Gotham City. Christian Bale stars as Batman, facing off against Heath Ledger unforgettable portrayal of the Joker, a chaotic force that challenges Batman moral code.'
  },
  '2010': {
    image: 'f.jpeg',
    title: 'Inception',
    genre: 'Science Fiction / Thriller',
    description: 'Directed by Christopher Nolan, "Inception" is a mind-bending thriller about a team of thieves who enter people dreams to steal or plant ideas. The film explores the nature of reality, memory, and the subconscious, featuring stunning visual effects and a multi-layered narrative.'
  },
  '2020': {
    image: 'allatonece.jpg',
    title: 'Everything Everywhere All at Once',
    genre: 'Science Fiction / Fantasy / Action-Comedy',
    description: 'Directed by Daniel Kwan and Daniel Scheinert, this genre-bending film follows a Chinese-American woman who discovers that she can access the multiverse and must use her newfound abilities to save it. The movie combines action, humor, and existential themes, offering a unique and emotional cinematic experience.'
  },
  // Add data for other decades...
};
export default function MovieTimeline() {
  const [selectedDecade, setSelectedDecade] = useState('1950');
  const [flipped, setFlipped] = useState(false);

  const handleDecadeChange = (decade) => {
    setFlipped(true);
    setTimeout(() => {
      setSelectedDecade(decade);
      setFlipped(false);
    }, 300); // Half of the animation duration
  };

  return (
    <div className="w-full bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between mb-8">
          {decades.map((decade) => (
            <button
              key={decade}
              onClick={() => handleDecadeChange(decade)}
              className={`text-lg font-semibold ${selectedDecade === decade ? 'text-white' : 'text-gray-400'}`}
            >
              {decade}
            </button>
          ))}
        </div>
        <div className="h-0.5 bg-gray-900 relative mb-12">
          <motion.div
            className="absolute top-0 w-2 h-2 bg-red-600 rounded-full"
            initial={false}
            animate={{
              left: `${(decades.indexOf(selectedDecade) / (decades.length - 1)) * 100}%`
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="perspective-1000">
          <motion.div
            className="flex flex-col md:flex-row items-center"
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={movieData[selectedDecade].image}
                  alt={movieData[selectedDecade].title}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2 text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h3 className="text-xl text-gray-400 mb-3 font-serif">{movieData[selectedDecade].genre}</h3>
              <h2 className="text-4xl text-red-600 font-bold mb-6 font-sans">{movieData[selectedDecade].title}</h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">{movieData[selectedDecade].description}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}