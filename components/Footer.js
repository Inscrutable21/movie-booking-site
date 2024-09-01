import React, { useEffect, useRef } from 'react';

export default function Footer() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const setupSketchfab = () => {
      if (window.Sketchfab) {
        const client = new window.Sketchfab('1.12.1', iframeRef.current);
        client.init('5ef4a0ebf5bd4008976f8ef88c306b3e', {
          autostart: 1,
          preload: 1,
          ui_controls: 0,
          ui_infos: 0,
          ui_stop: 0,
          ui_watermark: 0,
          ui_watermark_link: 0,
          ui_ar: 0,
          ui_help: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_fullscreen: 0,
          ui_animations: 0,
          ui_hint: 0,
          transparent: 1,
          autospin: 0.2,
          annotation_tooltip_visible: 0,
          scrollwheel: 0,
          orbit_constraint_pan: 1,
          orbit_constraint_zoom_in: 0.5,
          orbit_constraint_zoom_out: 1.5,
          camera: 0,
          success: function (api) {
            api.addEventListener('viewerready', function() {
              api.setBackground({ color: [0, 0, 0, 0] });
              api.setCameraEasing('easeInOutQuad');
              
              // Hide annotations
              api.getAnnotationList(function(err, annotations) {
                if (!err) {
                  annotations.forEach(function(annotation) {
                    api.hideAnnotation(annotation.id);
                  });
                }
              });
              
              // Hide all UI elements, including the video timer
              api.getSceneGraph(function(err, result) {
                if (err) {
                  console.log('Error getting scene graph', err);
                  return;
                }
                
                // Recursive function to find and hide UI overlay
                function hideUIOverlay(node) {
                  if (node.type === 'UIOverlay') {
                    api.hide(node.instanceID);
                    return true;
                  }
                  if (node.children) {
                    for (let child of node.children) {
                      if (hideUIOverlay(child)) {
                        return true;
                      }
                    }
                  }
                  return false;
                }

                // Start the recursive search from the root
                hideUIOverlay(result);
              });
            });
          },
          error: function () {
            console.error('Sketchfab API error');
          }
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
    script.async = true;
    script.onload = setupSketchfab;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/2 lg:w-2/3 mb-8 md:mb-0">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold mb-4 text-red-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>CineStream</h3>
                <p className="text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>Bringing cinema magic to your fingertips.</p>
              </div>
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-4 text-red-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/movies" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>Movies</a></li>
                  <li><a href="/theatres" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>Theatres</a></li>
                  <li><a href="/about" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>About Us</a></li>
                  <li><a href="/contact" className="hover:text-red-400 transition-colors duration-300" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-red-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-red-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-2xl hover:text-red-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-2xl hover:text-red-400 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '300px' }}>
              <iframe
                ref={iframeRef}
                title="3D Turtle"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; xr-spatial-tracking"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>&copy; 2024 CineStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}