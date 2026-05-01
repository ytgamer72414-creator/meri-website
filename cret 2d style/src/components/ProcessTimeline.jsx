import React, { useEffect, useRef } from 'react';
import './ProcessTimeline.css';

export default function ProcessTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    let scriptEl = document.createElement('script');
    scriptEl.innerHTML = `
      ${scripts}
    `;
    document.body.appendChild(scriptEl);

    return () => {
      document.body.removeChild(scriptEl);
      // Clean up gsap scroll triggers
      if (window.ScrollTrigger) {
         window.ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <div className="process-timeline-wrapper" ref={containerRef} dangerouslySetInnerHTML={{ __html: `<section class="timeline-tree-section" id="process">
                <header class="timeline-header"
                    style="text-align:center; max-width: 800px; margin: 0 auto; margin-bottom: 2rem; position:relative; z-index:20;">
                    <h2 class="text-large"
                        style="background: var(--gradient-title); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
                        Human <br><span class="serif-italic"
                            style="-webkit-text-fill-color: var(--text-primary);">Process</span></h2>
                    <p class="chapter-desc">A seamless, meticulously engineered workflow from concept to cinematic
                        delivery.</p>
                </header>

                <div class="timeline-container" id="vertical-timeline">
                    <!-- Global Webbing SVG Canvas -->
                    <svg class="weaving-canvas" viewBox="0 0 1000 1200" preserveAspectRatio="none">
                        <!-- Threads map: [Start X, Y] C [Control1 X, Y] [Control2 X, Y] [End X, Y] -->
                        <path class="weaving-path thread-1" d="M -100,50 C 400,200 600,400 500,1100" />
                        <path class="weaving-path thread-2" d="M 1100,150 C 600,300 400,600 500,1100" />
                        <path class="weaving-path thread-3" d="M -100,500 C 400,600 600,800 500,1100" />
                        <path class="weaving-path thread-4" d="M 1100,700 C 600,800 400,1000 500,1100" />
                    </svg>

                    <!-- Row 1 -->
                    <div class="timeline-row">
                        <div class="timeline-node node-left">
                            <div class="connection-dot"></div>
                            <div class="node-card">
                                <div
                                    style="width: 56px; height: 56px; border-radius: 14px; background: rgba(233, 30, 140, 0.15); border: 1px solid rgba(233, 30, 140, 0.5); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(233,30,140,0.3); margin-bottom: 1rem;">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                        stroke="var(--logo-accent)" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        style="filter: drop-shadow(0 0 4px var(--logo-accent));">
                                        <path d="M12 2v4"></path>
                                        <path d="M12 18v4"></path>
                                        <path d="M4.93 4.93l2.83 2.83"></path>
                                        <path d="M16.24 16.24l2.83 2.83"></path>
                                        <path d="M2 12h4"></path>
                                        <path d="M18 12h4"></path>
                                        <path d="M4.93 19.07l2.83-2.83"></path>
                                        <path d="M16.24 7.76l2.83-2.83"></path>
                                    </svg>
                                </div>
                                <span class="t-step">01 Concept</span>
                                <h3 class="t-title">Strategy</h3>
                                <p class="t-desc">We discuss your vision, audit your brand, and determine the exact
                                    retention mechanisms required.</p>
                            </div>
                        </div>
                        <div class="timeline-empty node-right"></div>
                    </div>

                    <!-- Row 2 -->
                    <div class="timeline-row" style="margin-top: -4rem;">
                        <div class="timeline-empty node-left"></div>
                        <div class="timeline-node node-right">
                            <div class="connection-dot"></div>
                            <div class="node-card">
                                <div
                                    style="width: 56px; height: 56px; border-radius: 14px; background: rgba(233, 30, 140, 0.15); border: 1px solid rgba(233, 30, 140, 0.5); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(233,30,140,0.3); margin-bottom: 1rem;">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                        stroke="var(--logo-accent)" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        style="filter: drop-shadow(0 0 4px var(--logo-accent));">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="3" y1="9" x2="21" y2="9"></line>
                                        <line x1="9" y1="21" x2="9" y2="9"></line>
                                    </svg>
                                </div>
                                <span class="t-step">02 Design</span>
                                <h3 class="t-title">Blueprint</h3>
                                <p class="t-desc">Creating the visual blueprint. We map out storyboards, pacing charts,
                                    and exact sound design cues.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Row 3 -->
                    <div class="timeline-row" style="margin-top: -4rem;">
                        <div class="timeline-node node-left">
                            <div class="connection-dot"></div>
                            <div class="node-card">
                                <div
                                    style="width: 56px; height: 56px; border-radius: 14px; background: rgba(233, 30, 140, 0.15); border: 1px solid rgba(233, 30, 140, 0.5); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(233,30,140,0.3); margin-bottom: 1rem;">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                        stroke="var(--logo-accent)" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        style="filter: drop-shadow(0 0 4px var(--logo-accent));">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                                <span class="t-step">03 Edit</span>
                                <h3 class="t-title">Precision</h3>
                                <p class="t-desc">Pure human craft. Frame-by-frame 2D/3D integration, elite color
                                    grading, and hyper-kinetic motion.</p>
                            </div>
                        </div>
                        <div class="timeline-empty node-right"></div>
                    </div>

                    <!-- Row 4 -->
                    <div class="timeline-row" style="margin-top: -4rem;">
                        <div class="timeline-empty node-left"></div>
                        <div class="timeline-node node-right">
                            <div class="connection-dot"></div>
                            <div class="node-card">
                                <div
                                    style="width: 56px; height: 56px; border-radius: 14px; background: rgba(233, 30, 140, 0.15); border: 1px solid rgba(233, 30, 140, 0.5); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(233,30,140,0.3); margin-bottom: 1rem;">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                        stroke="var(--logo-accent)" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        style="filter: drop-shadow(0 0 4px var(--logo-accent));">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 8l4 4-4 4"></path>
                                        <path d="M8 12h8"></path>
                                    </svg>
                                </div>
                                <span class="t-step">04 Delivery</span>
                                <h3 class="t-title">Final Product</h3>
                                <p class="t-desc">Polished, perfectly encoded, and delivered to you within 24 hours.
                                    Ready to dominate algorithms.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>` }} />
  );
}
