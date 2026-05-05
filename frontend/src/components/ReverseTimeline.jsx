import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './timeline.css';

const ReverseTimeline = () => {
    const [events, setEvents] = useState([]);
    const timelineRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Use relative path or base URL from env
                const res = await axios.get('http://localhost:5000/api/timeline');
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching timeline:', err);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            // Scroll to the bottom to start with "The Result"
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [events]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, [events]);

    return (
        <section className="reverse-timeline-section" ref={timelineRef}>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                
                <div className="timeline-header-top">
                    <h2 className="neon-text">How It Started</h2>
                </div>

                {events.map((event, index) => (
                    <div 
                        key={event._id} 
                        className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                    >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content glass">
                            <div className="event-date">{event.date}</div>
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-desc">{event.description}</p>
                            {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-image" />}
                        </div>
                    </div>
                ))}

                <div className="timeline-header-bottom" ref={bottomRef}>
                    <h1 className="result-title glitch" data-text="THE RESULT">THE RESULT</h1>
                    <div className="scroll-indicator-up">
                        <span>Scroll Up to See the Journey</span>
                        <div className="arrow-up"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReverseTimeline;
